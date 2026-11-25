"""Lab simulation of a constrained Android connection; not a physical device."""
import os
from playwright.sync_api import sync_playwright

origin = os.environ.get("REVIEW_ORIGIN", "http://127.0.0.1:3198")
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
    page = browser.new_page(viewport={"width": 360, "height": 720}, is_mobile=True, has_touch=True, device_scale_factor=2)
    page.add_init_script("Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true, effectiveType: '2g' } })")
    session = page.context.new_cdp_session(page)
    session.send("Network.enable")
    session.send("Network.setCacheDisabled", {"cacheDisabled": True})
    session.send("Network.emulateNetworkConditions", {"offline": False, "latency": 300, "downloadThroughput": 62500, "uploadThroughput": 31250})
    session.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(origin, wait_until="domcontentloaded", timeout=90000)
    page.locator(".v2-scene-photo").evaluate("el => el.decode()")
    assert page.get_by_role("heading", level=1).is_visible()
    assert page.locator(".v2-hero").get_attribute("data-motion") == "static"
    assert page.locator("[data-v2-root]").get_attribute("data-motion-loaded") is None
    assert page.locator("html.lenis").count() == 0
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    # Dispatch an explicit finger-down/move/up sequence to the page rather
    # than relying on the headless synthetic gesture helper to hit the scroller.
    assert page.evaluate("document.scrollingElement.scrollHeight > innerHeight * 2")
    for direction in (1, -1, 1, -1):
        previous = page.evaluate("scrollY")
        start = 500 if direction == 1 else 210
        session.send("Input.dispatchTouchEvent", {"type":"touchStart","touchPoints":[{"x":180,"y":start}]})
        for step in range(1, 13):
            session.send("Input.dispatchTouchEvent", {"type":"touchMove","touchPoints":[{"x":180,"y":start - direction * step * 20}]})
            page.wait_for_timeout(35)
        session.send("Input.dispatchTouchEvent", {"type":"touchEnd","touchPoints":[]})
        page.wait_for_function("([previous,direction]) => (scrollY-previous)*direction > 20", arg=[previous,direction], timeout=10000)
        page.wait_for_timeout(700)
    assert not any(".mp4" in u or ".webm" in u for u in requests), "Unexpected video request"
    print("Throttled mobile native gestures completed; resource entries:", page.evaluate("performance.getEntriesByType('resource').length"))
    print("Transferred bytes observed:", page.evaluate("performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0)"))
    page.close()
    browser.close()
