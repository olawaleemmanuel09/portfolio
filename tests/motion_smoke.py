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
        expected = "ready" if width == 1440 else "static"
        page.wait_for_function("(expected) => document.querySelector('.v2-hero')?.dataset.motion === expected", arg=expected, timeout=20000)
        assert page.get_by_role("heading", level=1).count() == 1
        assert page.locator(".v2-scene-photo").count() == 1
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
            arg="ready" if width == 1440 else "static", timeout=20000
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
    page.close()
    for width, save in ((390, False), (1440, True)):
        page = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="no-preference")
        if save:
            page.add_init_script("Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } })")
        page.goto(origin + "/design-preview", wait_until="domcontentloaded", timeout=45000)
        assert page.locator(".v2-hero").get_attribute("data-motion") == "static"
        assert page.get_by_role("heading", level=1).is_visible()
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        page.close()
    browser.close()
print("Normal-motion home and case-study browser checks passed.")
