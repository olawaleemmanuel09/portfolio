"""Exercise the mobile storyboard in WebKit (not a physical iPhone)."""
import os
from playwright.sync_api import sync_playwright
origin=os.environ.get("REVIEW_ORIGIN","http://127.0.0.1:3198")
with sync_playwright() as p:
    browser=p.webkit.launch()
    for width,height in ((320,480),(375,667),(390,844)):
        page=browser.new_page(viewport={"width":width,"height":height},is_mobile=True,has_touch=True,device_scale_factor=2,reduced_motion="no-preference")
        errors=[]
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.goto(origin,wait_until="domcontentloaded")
        page.wait_for_function("() => document.querySelector('.v2-principle').dataset.storyProgress !== undefined")
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
    browser.close()
print("WebKit mobile storyboard checks passed")
