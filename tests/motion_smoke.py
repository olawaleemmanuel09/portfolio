"""Motion acceptance at normal preference, independent of reduced-motion static QA."""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

origin = os.environ.get("REVIEW_ORIGIN", "http://127.0.0.1:3198")
screens = os.environ.get("REVIEW_SCREENSHOTS")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
    # Approved homepage, not obsolete editorial layout.
    for width in (390, 1440):
        page = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="no-preference")
        page.goto(origin, wait_until="domcontentloaded", timeout=45000)
        expected = "ready" if width == 1440 else "mobile"
        page.wait_for_function("(expected) => document.querySelector('.v2-hero')?.dataset.motion === expected", arg=expected, timeout=20000)
        assert page.get_by_role("heading", level=1).count() == 1
        assert page.locator(".v2-scene-photo").count() == 1
        page.locator(".v2-scene-photo").evaluate("el => el.decode()")
        assert page.locator(".v2-scene-photo").evaluate("el => [el.naturalWidth, el.naturalHeight]") == ([1024, 1536] if width == 1440 else [512, 768])
        assert page.locator(".v2-scene-photo").evaluate("el => el.currentSrc").endswith("workstation-full.webp" if width == 1440 else "workstation-preview.webp")
        assert page.locator("html.lenis").count() == 0
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        if screens:
            page.screenshot(path=Path(screens) / f"motion-hero-{width}.png")
        page.close()

    # Reproduce a realistic narrow-height laptop on an estimated 3G link.
    # Network type is not a motion preference: the loaded desktop scene must work.
    page = browser.new_page(viewport={"width": 1366, "height": 550}, reduced_motion="no-preference")
    page.add_init_script("Object.defineProperty(navigator, 'connection', {configurable:true, value:Object.assign(new EventTarget(), {effectiveType:'3g', saveData:false})})")
    page.goto(origin, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_function("() => document.querySelector('[data-v2-root]')?.dataset.motionMode === 'cinematic'", timeout=20000)
    hero = page.locator(".v2-hero")
    assert hero.get_attribute("data-motion") == "ready"
    assert page.locator(".v2-principle").get_attribute("data-motion") == "ready"
    assert page.locator(".v2-hero-copy").evaluate("el => el.getBoundingClientRect().bottom <= document.querySelector('.v2-hero-foot').getBoundingClientRect().top + 1")
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    plane = page.locator(".v2-camera-plane")
    initial = plane.evaluate("el => getComputedStyle(el).transform")
    page.mouse.wheel(0, 700)
    page.wait_for_function("() => scrollY > 400")
    page.wait_for_timeout(1000)
    assert plane.evaluate("el => getComputedStyle(el).transform") != initial
    page.evaluate("() => { navigator.connection.effectiveType = '2g'; navigator.connection.dispatchEvent(new Event('change')); }")
    assert hero.get_attribute("data-motion") == "ready"
    page.mouse.wheel(0, -900)
    page.wait_for_function("() => scrollY < 5")
    page.wait_for_timeout(1000)
    assert page.locator(".v2-hero-copy").evaluate("el => Number(getComputedStyle(el).opacity)") > .95
    if screens:
        page.screenshot(path=Path(screens) / "v2-laptop-3g-1366x550.png")
    page.close()

    # Case studies must have motion *with* JavaScript and keep every evidence
    # qualifier readable without any animation dependency.
    for width in (390, 1440):
        page = browser.new_page(viewport={"width": width, "height": 900},
                                reduced_motion="no-preference")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        resp = page.goto(origin + "/work/ai-job-scraper", wait_until="domcontentloaded", timeout=45000)
        assert resp is not None and resp.status == 200
        page.wait_for_function(
            "(expected) => document.querySelector('[data-case-study]')?.dataset.caseMotion === expected",
            arg="ready" if width == 1440 else "mobile", timeout=20000
        )
        page.wait_for_timeout(1450)
        assert page.locator(".case-title-word").count() >= 2
        assert page.locator("[data-case-hero] img").count() == 1
        assert page.get_by_role("navigation", name="Case-study chapters").count() == 1
        assert page.locator(".evidence-panel").count() == 4
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert not errors, (width, errors)
        if screens:
            page.screenshot(path=Path(screens) / f"motion-case-hero-{width}.png")
        if width == 1440:
            page.locator("#case-challenge").scroll_into_view_if_needed()
            page.wait_for_timeout(700)
            assert page.locator(".case-cinema-chapter-intro h2").is_visible()
            if screens:
                page.screenshot(path=Path(screens) / "motion-case-challenge-1440.png")
        page.close()

    # Save-Data must avoid the Lenis loop and opening animations even when
    # reduced-motion is not explicitly enabled.
    page = browser.new_page(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
    page.add_init_script("Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } })")
    page.goto(origin, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_function("() => document.querySelector('.v2-hero')?.dataset.motion === 'static'")
    assert page.locator("html.lenis").count() == 0
    assert page.get_by_role("heading", level=1).is_visible()
    page.goto(origin + "/work/ai-job-scraper", wait_until="domcontentloaded", timeout=45000)
    page.wait_for_function("() => document.querySelector('[data-case-study]')?.dataset.caseMotion === 'static'")
    assert page.locator("html.lenis").count() == 0
    page.close()

    # Photo-based camera: initial desk crop, monitor reveal, screen-filling
    # zoom, white handoff and reverse scroll. Native scroll, not Lenis.
    page = browser.new_page(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(origin + "/design-preview", wait_until="domcontentloaded", timeout=45000)
    page.wait_for_function("() => document.querySelector('.v2-hero')?.dataset.motion === 'ready'", timeout=20000)
    page.locator(".v2-scene-photo").evaluate("el => el.decode()")
    assert page.locator("html.lenis").count() == 0
    plane = page.locator(".v2-camera-plane")
    initial = plane.evaluate("el => getComputedStyle(el).transform")
    assert page.locator(".v2-hero .v2-button").first.evaluate("el => getComputedStyle(el).backgroundColor") == "rgb(255, 255, 255)"
    assert page.locator(".v2-monitor-screen").bounding_box()["y"] + page.locator(".v2-monitor-screen").bounding_box()["height"] <= 2
    for progress, name in ((0, "desk"), (0.56, "monitor"), (0.89, "zoom"), (0.998, "handoff")):
        page.evaluate("(p) => window.scrollTo(0, (document.querySelector('.v2-hero').offsetHeight - innerHeight) * p)", progress)
        page.wait_for_timeout(1100)
        if progress == 0.89:
            assert plane.evaluate("el => getComputedStyle(el).transform") != initial
            screen = page.locator(".v2-monitor-screen").bounding_box()
            assert screen is not None and screen["width"] >= 1440 and screen["height"] >= 900, screen
            assert page.locator("[data-v2-root]").get_attribute("data-light") == "true"
        if progress == 0.998:
            assert page.locator(".v2-handoff").evaluate("el => Number(getComputedStyle(el).opacity)") > 0.9
            assert page.locator("[data-v2-root]").get_attribute("data-light") == "true"
            page.locator(".v2-hero .v2-actions a").first.evaluate("el => el.focus({preventScroll:true})")
            assert page.locator(".v2-hero-inner").evaluate("el => Number(getComputedStyle(el).zIndex)") > 5
            page.locator(".v2-brand").evaluate("el => el.focus({preventScroll:true})")
        if screens:
            page.screenshot(path=Path(screens) / f"v2-film-{name}-1440.png")
    page.evaluate("window.scrollTo(0, document.querySelector('.v2-principle').offsetTop + 0.85 * (document.querySelector('.v2-principle').offsetHeight - innerHeight))")
    page.wait_for_timeout(1100)
    assert page.locator(".v2-story-resolution").evaluate("el => Number(getComputedStyle(el).opacity)") > 0.9
    if screens:
        page.screenshot(path=Path(screens) / "v2-story-resolution-1440.png")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(1200)
    assert page.locator(".v2-hero-copy").evaluate("el => Number(getComputedStyle(el).opacity)") > 0.9
    assert page.locator("[data-v2-root]").get_attribute("data-light") == "false"
    assert not errors, errors
    page.locator(".v2-project summary").nth(1).click()
    assert page.locator(".v2-project").nth(1).locator(".v2-product-capture").is_visible()
    page.wait_for_timeout(600)
    assert page.locator(".v2-project").nth(1).locator(".v2-product-capture").evaluate("el => Number(getComputedStyle(el).opacity)") > .95
    assert page.locator(".v2-system-index a").count() == 3
    page.locator(".v2-project[open] summary").click()
    assert page.locator(".v2-project[open]").count() == 1
    assert page.locator(".v2-project").nth(1).get_attribute("open") is not None
    page.locator(".v2-project").nth(1).locator(".v2-product-window").scroll_into_view_if_needed()
    page.wait_for_function("() => document.querySelector('.v2-project[open] .v2-product-window')?.dataset.playing === 'true'")
    assert page.locator(".v2-project[open] .v2-primary-capture").evaluate("el => getComputedStyle(el).animationName") == "v2-evidence-drift"
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_function("() => document.querySelector('.v2-tools-marquee')?.dataset.playing === 'true'")
    assert page.locator(".v2-tools-track").evaluate("el => getComputedStyle(el).animationName") == "v2-tools-flow"
    page.wait_for_function("() => document.querySelector('.v2-project[open] .v2-product-window')?.dataset.playing === 'false'")
    assert page.locator(".v2-project[open] .v2-primary-capture").evaluate("el => getComputedStyle(el).animationPlayState") == "paused"
    page.locator(".v2-project[open] .v2-product-window").scroll_into_view_if_needed()
    page.wait_for_function("() => document.querySelector('.v2-project[open] .v2-product-window')?.dataset.playing === 'true'")
    assert page.locator(".v2-project[open] .v2-primary-capture").evaluate("el => getComputedStyle(el).animationPlayState") == "running"
    # Observe the route wipe before navigation: no delay or lock is introduced.
    page.evaluate("""() => { window.projectPhases = []; const el = document.querySelector('[data-project-transition]'); new MutationObserver(() => window.projectPhases.push(el.dataset.phase)).observe(el, {attributes:true,attributeFilter:['data-phase']}); }""")
    page.locator(".v2-project[open] .v2-project-link").click()
    page.wait_for_url("**/work/*")
    page.wait_for_function("() => window.projectPhases?.includes('cover')", timeout=5000)
    page.wait_for_function("() => document.querySelector('[data-project-transition]')?.dataset.phase === 'idle'")
    assert page.locator(".case-cinema-hero-grid").count() == 1
    page.close()
    for width, save in ((390, False), (1440, True)):
        page = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="no-preference")
        if save:
            page.add_init_script("Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } })")
        page.goto(origin + "/design-preview", wait_until="domcontentloaded", timeout=45000)
        page.wait_for_function("(expected) => document.querySelector('.v2-hero')?.dataset.motion === expected", arg="static" if save else "mobile")
        assert page.get_by_role("heading", level=1).is_visible()
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        page.close()
    # Mobile reference flow: real touch context, no pinned hero, all six
    # demonstrations available, animated narrative and reversible playback.
    for width,height in ((320,480),(390,844),(430,932)):
        page = browser.new_page(viewport={"width":width,"height":height}, is_mobile=True, has_touch=True, reduced_motion="no-preference")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(origin, wait_until="domcontentloaded")
        page.wait_for_function("() => document.querySelector('[data-v2-root]')?.dataset.motionMode === 'mobile'")
        assert page.locator(".v2-stage").evaluate("el => getComputedStyle(el).position") == "relative"
        assert page.locator(".v2-handoff").is_hidden()
        assert page.locator(".v2-hero-copy").evaluate("el => Number(getComputedStyle(el).opacity)") == 1
        assert page.locator(".v2-mobile-project:visible").count() == 6
        assert page.locator(".v2-showcase").is_hidden()
        page.locator(".v2-tools-marquee").scroll_into_view_if_needed()
        page.wait_for_function("() => document.querySelector('.v2-tools-marquee')?.dataset.playing === 'true'")
        assert page.locator(".v2-tools-track").evaluate("el => getComputedStyle(el).animationPlayState") == "running"
        assert page.locator(".v2-tools-marquee").evaluate("el => el.getBoundingClientRect().bottom <= innerHeight + 1")
        page.locator(".v2-story-first").scroll_into_view_if_needed()
        page.wait_for_function("() => document.querySelector('.v2-story-first')?.dataset.mobileReveal === 'true'")
        assert page.locator(".v2-fragment:visible").count() == 6
        # Verify measured scroll-linked transforms rather than animation names alone.
        page.evaluate("""() => {const el=document.querySelector('.v2-story-first');window.scrollTo(0,scrollY+el.getBoundingClientRect().top-innerHeight*.82)}""")
        page.wait_for_timeout(180)
        word = page.locator(".v2-story-first .v2-word").last
        early = word.evaluate("el => getComputedStyle(el).transform")
        page.evaluate("""() => {const el=document.querySelector('.v2-story-first');window.scrollTo(0,scrollY+el.getBoundingClientRect().top-innerHeight*.35)}""")
        page.wait_for_timeout(180)
        late = word.evaluate("el => getComputedStyle(el).transform")
        assert early != late, (width, early, late)
        page.evaluate("""() => {const el=document.querySelector('.v2-story-first');window.scrollTo(0,scrollY+el.getBoundingClientRect().top-innerHeight*.82)}""")
        page.wait_for_timeout(180)
        assert word.evaluate("el => getComputedStyle(el).transform") != late
        assert page.locator(".v2-story-stage").evaluate("el => el.offsetHeight < 2 * innerHeight")
        scene = page.locator(".v2-mobile-scene").first
        scene.scroll_into_view_if_needed()
        page.wait_for_function("() => document.querySelector('.v2-mobile-scene')?.dataset.playing === 'true'")
        assert scene.locator(".v2-mobile-visual").evaluate("el => getComputedStyle(el).animationPlayState") == "running"
        scene.locator(".v2-mobile-visual img").evaluate("el => el.decode()")
        visual = scene.locator(".v2-mobile-visual")
        t1 = visual.evaluate("el => getComputedStyle(el).transform")
        page.wait_for_timeout(900)
        assert visual.evaluate("el => getComputedStyle(el).transform") != t1
        page.wait_for_function("() => document.querySelector('.v2-mobile-scene .v2-mobile-detail')?.dataset.ready === 'true'", timeout=20000)
        detail = scene.locator(".v2-mobile-detail")
        assert detail.evaluate("el => getComputedStyle(el).animationPlayState") == "running"
        page.wait_for_function("() => Number(getComputedStyle(document.querySelector('.v2-mobile-scene .v2-mobile-detail')).opacity) > .5", timeout=8000)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_function("() => document.querySelector('.v2-mobile-scene')?.dataset.playing === 'false'")
        assert scene.locator(".v2-mobile-visual").evaluate("el => getComputedStyle(el).animationPlayState") == "paused"
        scene.scroll_into_view_if_needed()
        page.wait_for_function("() => document.querySelector('.v2-mobile-scene')?.dataset.playing === 'true'")
        assert page.locator(".v2-extra-capture img").count() == 0
        assert page.locator(".v2-mobile-project img[src*='real-estate-website-mobile-poster']").count() == 1
        assert page.locator("[data-v2-root]").get_attribute("data-motion-loaded") is None
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert not errors, errors
        if screens:
            page.screenshot(path=Path(screens) / f"v2-mobile-project-{width}.png")
        page.close()
    browser.close()
print("Normal-motion home and case-study browser checks passed.")
