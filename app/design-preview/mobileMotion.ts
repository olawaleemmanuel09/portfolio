// Mobile-only, reference-led narrative. Native scroll drives a bounded sticky
// story, not the hero. Explicit transforms avoid reliance on CSS math support
// or CSS scroll timelines on older iOS/WebKit.
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const segment = (v: number, a: number, b: number) => clamp((v-a)/(b-a));
const smooth = (v: number) => v*v*(3-2*v);
export function startMobileMotion(root: HTMLElement, hero: HTMLElement, story: HTMLElement) {
  hero.dataset.motion = "mobile";
  const stage = story.querySelector<HTMLElement>(".v2-story-stage");
  const first = story.querySelector<HTMLElement>(".v2-story-first");
  const resolution = story.querySelector<HTMLElement>(".v2-story-resolution");
  if (!stage || !first || !resolution || typeof IntersectionObserver === "undefined") {
    return () => { hero.dataset.motion = "static"; story.dataset.motion = "static"; };
  }
  const firstWords = Array.from(first.querySelectorAll<HTMLElement>(".v2-word"));
  const lastWords = Array.from(resolution.querySelectorAll<HTMLElement>(".v2-word"));
  const fragments = Array.from(story.querySelectorAll<HTMLElement>(".v2-fragment"));
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(".v2-mobile-project-copy, [data-v2-reveal]"));
  const reveals = new IntersectionObserver(entries => {
    for (const entry of entries) (entry.target as HTMLElement).dataset.mobileReveal =
      String(entry.isIntersecting && entry.intersectionRatio >= .10);
  }, { threshold: .10 });
  nodes.forEach(el => reveals.observe(el));
  // Enable sticky only where the full copy can fit. A very short landscape
  // viewport remains a readable normal-flow narrative.
  const eligible = window.matchMedia("(max-width: 1023px) and (min-height: 480px), (any-pointer: coarse) and (not (any-pointer: fine)) and (min-height: 480px)");
  let active = false, frame = 0, disposed = false, pinned = false, last = -1;
  let anchors: { x: number; y: number }[] = [];
  let stageWidth = 0, stageHeight = 0;
  const clear = () => {
    [first,resolution,...firstWords,...lastWords,...fragments].forEach(el => {
      el.style.removeProperty("transform"); el.style.removeProperty("opacity");
    });
    delete story.dataset.storyProgress; delete story.dataset.storyPhase;
  };
  function revealWords(words: HTMLElement[], p: number) {
    for (let i=0; i<words.length; i++) {
      const q=smooth(clamp(p*2-i/Math.max(1,words.length-1)));
      words[i].style.transform = `translate3d(0,${((1-q)*105).toFixed(1)}%,0)`;
      words[i].style.opacity = q.toFixed(2);
    }
  }
  function render() {
    frame = 0;
    if (disposed || !pinned) return;
    const h = stageHeight || stage!.clientHeight;
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight-h);
    // Start revealing on entry, then hold the composition under the header.
    const lead = Math.min(180, h*.28);
    const p = clamp((64+lead-rect.top)/(travel+lead));
    if (Math.abs(p-last)<.0005) return;
    last=p;
    const firstIn = segment(p,0,.30);
    const firstOut = smooth(segment(p,.49,.64));
    const lastIn = segment(p,.63,.85);
    first!.style.opacity = (1-firstOut).toFixed(3);
    first!.style.transform = `translate3d(0,${-firstOut*24}px,0)`;
    resolution!.style.opacity = smooth(segment(p,.61,.69)).toFixed(3);
    resolution!.style.transform = `translate3d(0,${(1-smooth(lastIn))*12}px,0)`;
    revealWords(firstWords,firstIn);
    revealWords(lastWords,lastIn);
    // Each item has its own entrance, then moves towards the actual scene centre.
    // Geometry is cached on resize, so the scroll frame does not read each item.
    const gather=smooth(segment(p,.49,.66));
    const w=stageWidth || stage!.clientWidth;
    fragments.forEach((el,i)=>{
      const enter=smooth(segment(p,.09+i*.012,.29+i*.012));
      const side=i%2===0?-1:1;
      const vertical=i<2?-1:i>=4?1:0;
      const anchor=anchors[i] ?? {x:w/2,y:h/2};
      const x=side*(1-enter)*w*.23+gather*(w/2-anchor.x);
      const y=vertical*(1-enter)*45+gather*(h/2-anchor.y);
      el.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${(.82+.18*enter-gather*.62).toFixed(3)})`;
      el.style.opacity=(enter*(1-gather)).toFixed(3);
    });
    story.dataset.storyProgress=p.toFixed(3);
    story.dataset.storyPhase=p<.34?"problem-reveal":p<.48?"problem-hold":p<.66?"converge":"solution";
  }
  function schedule() { if (!disposed && !frame && pinned) frame=requestAnimationFrame(render); }
  function configure() {
    const next=eligible.matches;
    if (next!==pinned) {
      pinned=next;last=-1;
      story.dataset.motion=next?"mobile":"static";
      if (!next) clear();
    }
    if (pinned) {
      stageWidth=stage!.clientWidth;stageHeight=stage!.clientHeight;
      anchors=fragments.map(el=>({x:el.offsetLeft+el.offsetWidth/2,y:el.offsetTop+el.offsetHeight/2}));
      // Zoomed text must not be clipped inside the bounded story.
      if (first!.scrollHeight > stageHeight*.72 || resolution!.scrollHeight > stageHeight*.72) {
        pinned=false;story.dataset.motion="static";clear();
      }
      last=-1;
    }
    schedule();
  }
  function onScroll() { if(active) schedule(); }
  const watcher=new IntersectionObserver(([entry])=>{
    active=entry.isIntersecting;schedule();
  },{rootMargin:"200px 0px 200px 0px"});
  watcher.observe(story);
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",configure,{passive:true});
  const onPageShow=()=>{last=-1;schedule();};
  window.addEventListener("pageshow",onPageShow);
  eligible.addEventListener("change",configure);
  configure();
  return ()=>{
    disposed=true;cancelAnimationFrame(frame);
    window.removeEventListener("scroll",onScroll);
    window.removeEventListener("resize",configure);
    window.removeEventListener("pageshow",onPageShow);
    eligible.removeEventListener("change",configure);
    reveals.disconnect();watcher.disconnect();
    nodes.forEach(el=>delete el.dataset.mobileReveal);
    clear();
    hero.dataset.motion="static";story.dataset.motion="static";
  };
}
