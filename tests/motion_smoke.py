"""Motion acceptance at normal preference, independent of reduced-motion static QA."""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

origin = os.environ.get("REVIEW_ORIGIN", "http://127.0.0.1:3198")
screens = os.environ.get("REVIEW_SCREENSHOTS")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
    for width in (390, 1440):
        page = browser.new_page(viewport={"width": width, "height": 900},
                                reduced_motion="no-preference")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        response = page.goto(origin, wait_until="domcontentloaded", timeout=45000)
        assert response is not None and response.status == 200
        page.wait_for_function(
            "() => document.querySelector('.cinematic-hero')?.dataset.motion === 'ready'",
            timeout=20000
        )
        page.wait_for_timeout(2000)
        assert page.get_by_role("heading", level=1).count() == 1
        assert page.locator(".cinematic-line-inner").count() == 3
        assert page.locator(".cinematic-image-frame img").count() == 1
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), width
        for el in page.locator(".cinematic-line-inner").all():
            assert el.is_visible(), (width, el.inner_text())
        assert not errors, (width, errors)
        if screens:
            page.screenshot(path=Path(screens) / f"motion-hero-{width}.png")
        if width == 1440:
            depth = page.locator(".cinematic-image-depth")
            initial = depth.evaluate("el => getComputedStyle(el).transform")
            # Scroll with a native wheel event; Lenis is the single scroll driver.
            page.mouse.wheel(0, 700)
            page.wait_for_timeout(1200)
            assert page.evaluate("window.scrollY > 150")
            moved = depth.evaluate("el => getComputedStyle(el).transform")
            assert moved != initial, (initial, moved)
            if screens:
                page.screenshot(path=Path(screens) / "motion-hero-scroll-1440.png")
            page.locator(".cinematic-manifesto").scroll_into_view_if_needed()
            page.wait_for_timeout(600)
            assert page.locator(".cinematic-manifesto .cinematic-word").count() == 15
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
            "() => document.querySelector('[data-case-study]')?.dataset.caseMotion === 'ready'",
            timeout=20000
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
    page.wait_for_function("() => document.querySelector('.cinematic-hero')?.dataset.motion === 'static'")
    assert page.locator("html.lenis").count() == 0
    assert page.get_by_role("heading", level=1).is_visible()
    page.goto(origin + "/work/ai-job-scraper", wait_until="domcontentloaded", timeout=45000)
    page.wait_for_function("() => document.querySelector('[data-case-study]')?.dataset.caseMotion === 'static'")
    assert page.locator("html.lenis").count() == 0
    page.close()
    browser.close()
print("Normal-motion home and case-study browser checks passed.")
