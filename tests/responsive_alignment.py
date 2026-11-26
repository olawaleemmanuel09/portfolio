"""Post-launch layout audit: baseline alignment and measured viewport bounds.
No snapshot-only checks. Test the same numbers on both the home and CEFA case.
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

origin=os.environ.get("REVIEW_ORIGIN","http://127.0.0.1:3198")
screens=os.environ.get("REVIEW_SCREENSHOTS")
sizes=((320,480),(360,640),(375,667),(390,844),(393,852),(430,932),(768,1024),(900,700),(1023,768),(1024,768),(1280,720),(1366,635),(1440,900),(1920,1080))

def metrics(page, selector):
    grid=page.locator(selector)
    grid.scroll_into_view_if_needed()
    data=grid.evaluate("""el => {
      const cols=[...el.children];
      const rect=e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width}};
      return {grid:rect(el),cols:cols.map(c=>({col:rect(c),label:rect(c.querySelector('dt')),value:rect(c.querySelector('dd')),text:c.querySelector('dd').textContent.trim(),fits:c.scrollWidth<=c.clientWidth+1}))};
    }""")
    cols=data["cols"]
    assert [c["text"] for c in cols]==["127","10","113"],data
    for key in ("top","bottom"):
        assert max(c["value"][key] for c in cols)-min(c["value"][key] for c in cols)<=1.5,(selector,key,data)
    assert max(c["col"]["width"] for c in cols)-min(c["col"]["width"] for c in cols)<=1.5,data
    assert all(c["fits"] and c["value"]["top"]>=c["label"]["bottom"]-1 for c in cols),data
    assert all(c["col"]["left"]>=data["grid"]["left"]-1 and c["col"]["right"]<=data["grid"]["right"]+1 for c in cols),data
    return data

def viewport(page,path,width):
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"),(width,path,"horizontal overflow")
    assert page.locator("main h1").count()==1,(width,path,"heading")
    # Check visible navigation/control bounding boxes, not intentional clipped
    # hero camera artwork, running marquees or horizontally scrollable chapters.
    elements=page.locator(".v2-header-inner > :visible, .v2-interior-header-inner > :visible, .portfolio-v2 .v2-button:visible")
    overflow=elements.evaluate_all("""els=>els.filter(el=>{const r=el.getBoundingClientRect();return r.width>0 && (r.left < -1 || r.right > innerWidth+1)}).map(el=>el.textContent.trim())""")
    assert not overflow,(width,path,overflow)

with sync_playwright() as p:
    for name in ("chromium","webkit"):
        browser=getattr(p,name).launch(**({"executable_path":os.environ["CHROMIUM_PATH"]} if name=="chromium" and os.environ.get("CHROMIUM_PATH") else {}))
        for width,height in sizes:
            page=browser.new_page(viewport={"width":width,"height":height},is_mobile=width<768,has_touch=width<768,reduced_motion="reduce")
            for path in ("/","/work/cefa","/work","/about","/contact","/resume"):
                response=page.goto(origin+path,wait_until="domcontentloaded",timeout=45000)
                assert response and response.status==200,(name,width,path)
                page.evaluate("document.fonts.ready")
                viewport(page,path,width)
                if path=="/contact":
                    company=page.get_by_label("Company (optional)",exact=True)
                    assert company.count()==1 and company.is_visible()
                    assert company.get_attribute("required") is None
                    assert company.get_attribute("autocomplete")=="organization"
                if path in ("/","/work/cefa"):
                    selector=".v2-adoption dl" if path=="/" else ".case-cinema-metrics-list"
                    metrics(page,selector)
                    if screens and width in (320,393,768,1366,1440):
                        page.locator(selector).screenshot(path=Path(screens)/f"aligned-{name}-{width}-{'home' if path=='/' else 'cefa'}.png")
            page.close()
        # A second normal-motion pass validates that the alignment holds with
        # the approved story/desktop camera active; existing motion suites
        # exercise the actual timeline, reverse scroll and resource gating.
        for width,height in ((393,852),(1366,635)):
            page=browser.new_page(viewport={"width":width,"height":height},is_mobile=width<768,has_touch=width<768,reduced_motion="no-preference")
            page.goto(origin,wait_until="domcontentloaded")
            page.wait_for_function("()=>['mobile','cinematic'].includes(document.querySelector('[data-v2-root]').dataset.motionMode)",timeout=20000)
            page.evaluate("document.fonts.ready")
            metrics(page,".v2-adoption dl")
            page.close()
        # Verify blank company is accepted by the actual client submission
        # path, using a mocked endpoint (no external email or provider quota).
        for width,height in ((393,852),(1440,900)):
            page=browser.new_page(viewport={"width":width,"height":height},is_mobile=width<768,has_touch=width<768,reduced_motion="reduce")
            submitted=[]
            def accept(route):
                submitted.append(route.request.post_data_json)
                route.fulfill(status=200,content_type="application/json",body='{"ok":true}')
            page.route("**/api/contact",accept)
            page.goto(origin+"/contact",wait_until="domcontentloaded")
            page.get_by_label("Name",exact=True).fill("Portfolio QA")
            page.get_by_label("Email",exact=True).fill("qa@example.com")
            page.get_by_label("Message",exact=True).fill("Synthetic contact form regression test.")
            assert page.get_by_label("Company (optional)",exact=True).input_value()==""
            page.get_by_role("button",name="Send message").click()
            page.get_by_text("Message received.",exact=True).wait_for()
            assert len(submitted)==1 and submitted[0].get("company","")=="",submitted
            page.close()
        browser.close()
        print(f"{name}: responsive alignment audit passed")
