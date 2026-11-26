"""Exercise the mobile storyboard in WebKit (not a physical iPhone)."""
import os
from playwright.sync_api import sync_playwright
origin=os.environ.get("REVIEW_ORIGIN","http://127.0.0.1:3198")
with sync_playwright() as p:
    browser=p.webkit.launch()
    for width,height in ((320,480),(375,667),(390,844)):
        page=browser.new_page(viewport={"width":width,"height":height},is_mobile=True,has_touch=True,device_scale_factor=2,reduced_motion="no-preference")
        errors=[]
        failed=[]
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.on("requestfailed",lambda req:failed.append((req.url,req.failure)))
        page.on("console",lambda msg:errors.append(msg.text) if msg.type=="error" else None)
        page.goto(origin,wait_until="domcontentloaded")
        try:
            page.wait_for_function("() => document.querySelector('.v2-principle').dataset.storyProgress !== undefined", timeout=20000)
        except Exception:
            print("WebKit startup diagnostics", width, height, errors, failed, page.evaluate("""() => { const r=document.querySelector('[data-v2-root]'), s=document.querySelector('.v2-principle'), stage=s.querySelector('.v2-story-stage');return {viewport:[innerWidth,innerHeight], mode:r.dataset.motionMode, story:{...s.dataset}, stageHeight:stage.clientHeight, stagePosition:getComputedStyle(stage).position, textHeight:s.querySelector('.v2-story-first').getBoundingClientRect().height, media:matchMedia('(max-width:1023px)').matches, reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}}"""))
            raise
        story=page.locator(".v2-principle")
        assert story.locator(".v2-story-stage").evaluate("el => getComputedStyle(el).position")=="sticky"
        def phase(f):
            story.evaluate("""(el,f)=>{const stage=el.querySelector('.v2-story-stage');const h=stage.clientHeight;const lead=Math.min(180,h*.28);window.scrollTo(0,scrollY+el.getBoundingClientRect().top-64-lead+f*(el.offsetHeight-h+lead))}""",f)
            page.wait_for_function("f=>Math.abs(Number(document.querySelector('.v2-principle').dataset.storyProgress)-f)<.04",arg=f)
        phase(.4)
        assert story.locator(".v2-story-stage").evaluate("el=>Math.abs(el.getBoundingClientRect().top-64)<3"), (width,height)
        assert story.locator(".v2-story-first .v2-word").last.evaluate("el=>Number(getComputedStyle(el).opacity)")>.95
        phase(.94)
        assert story.locator(".v2-story-resolution").evaluate("el=>Number(getComputedStyle(el).opacity)")>.95
        phase(.15)
        assert story.locator(".v2-story-resolution").evaluate("el=>Number(getComputedStyle(el).opacity)")<.05
        assert page.locator(".v2-mobile-project:visible").count()==6
        assert page.locator(".v2-mobile-story-bridge a").is_visible()
        scene=page.locator(".v2-mobile-scene").first
        scene.scroll_into_view_if_needed()
        page.wait_for_function("()=>document.querySelector('.v2-mobile-scene').dataset.playing==='true'")
        assert scene.locator(".v2-mobile-visual").evaluate("el=>getComputedStyle(el).animationPlayState")=="running"
        assert scene.locator(".v2-mobile-visual img").evaluate("el=>el.getBoundingClientRect().width>0")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert not errors,errors
        page.close()
    # The static path is also part of the release contract.
    for js in (True,False):
        page=browser.new_page(viewport={"width":320,"height":480},is_mobile=True,has_touch=True,reduced_motion="reduce",java_script_enabled=js)
        page.goto(origin,wait_until="domcontentloaded")
        assert page.locator(".v2-principle").get_attribute("data-motion")=="static"
        assert page.locator(".v2-fragment-icon:visible").count()==0
        assert page.locator(".v2-fragment-label:visible").count()==6
        assert page.locator(".v2-fragment-label").evaluate_all("els=>els.every(el=>el.clientWidth>24 && el.scrollWidth<=el.clientWidth+1)")
        page.close()
    browser.close()
print("WebKit mobile storyboard checks passed")
