"""Run against a local production build. Set CHROMIUM_PATH for system Chromium."""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

origin = os.environ.get("REVIEW_ORIGIN", "http://127.0.0.1:3198")
screens = os.environ.get("REVIEW_SCREENSHOTS")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
    for width, javascript in [(w, True) for w in (320, 375, 768, 1024, 1440)] + [(320, False)]:
        page = browser.new_page(viewport={"width": width, "height": 900},
                                java_script_enabled=javascript, reduced_motion="reduce")
        for path in ["/", "/work", "/work/cefa", "/work/ai-job-scraper", "/contact", "/resume"]:
            page.goto(origin + path)
            page.locator("h1").wait_for()
            assert page.locator("h1").count() == 1
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (path, width)
            if path == "/":
                assert page.locator(".hero-statement").count() == 1
                assert page.get_by_role("figure", name="Illustrative AI systems architecture").count() == 1
                assert page.locator(".featured-case-card").count() == 6
                if width == 320:
                    assert page.locator(".featured-artboard").first.evaluate("el => el.getBoundingClientRect().height >= 200")
                assert page.locator(".featured-case-card img").count() == 6
                assert page.get_by_role("link", name="Explore selected work").get_attribute("href") == "#work"
                assert page.get_by_role("link", name="Explore selected work").evaluate("el => getComputedStyle(el).color") == "rgb(255, 255, 255)"
                assert page.locator(".system-canvas svg[role='img']").count() == 1
                assert page.locator(".system-canvas-mobile").is_visible() == (width < 640), width
                assert page.locator(".system-canvas-mobile").get_attribute("aria-hidden") is None
                assert page.locator(".system-canvas-mobile li").count() == 5
                assert page.locator(".featured-case-card").first.get_by_role("link").count() == 1
            if path == "/work":
                assert page.locator(".work-index-card").count() == 16
                assert page.locator(".work-index-card img").count() == 13
            if path in ("/work/cefa", "/work/ai-job-scraper"):
                assert page.locator("[data-case-hero] img").count() == 1
            if path == "/work/ai-job-scraper":
                assert page.locator(".evidence-panel").count() == 3
                assert page.get_by_role("link", name="Open original").count() == 3
                assert page.locator('img[src*="job-intelligence-workflow"]').count() >= 1
            assert page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
            assert not page.locator("html.lenis").count()
            for img in page.locator("main img").all():
                assert img.get_attribute("alt") is not None
            if screens and width in (320, 768, 1440) and javascript and path in ["/", "/work", "/work/cefa", "/work/ai-job-scraper"]:
                name = path.strip("/").replace("/", "-") or "home"
                page.screenshot(path=Path(screens) / f"{name}-{width}.png", full_page=(path in ("/", "/work")))
        if width == 320 and javascript:
            toggle = page.get_by_role("button", name="Menu")
            toggle.focus()
            page.keyboard.press("Enter")
            assert page.evaluate("document.querySelector('#menu').contains(document.activeElement)")
            for _ in range(12):
                page.keyboard.press("Tab")
                assert not page.evaluate("document.querySelector('main').contains(document.activeElement)")
            page.keyboard.press("Escape")
            assert toggle.evaluate("el => el === document.activeElement")
            toggle.click()
            page.locator("#menu").get_by_role("link", name="Engineering lab").click()
            page.wait_for_url("**/work#lab")
        page.close()
    # Full project-catalog route coverage supplements the 36 viewport checks.
    # Keep slugs explicit so a rename requires an intentional test update.
    slugs = [
        "cefa", "whatsapp-ordering-system", "web-ordering-and-payments",
        "elion-sales-command-centre", "security-workforce-operations",
        "b2b-revenue-engine", "elion-homes", "leadreach",
        "foc-inc-operations", "ai-job-scraper", "lead-capture-crm-sync",
        "smartbook-ai", "lead-intelligence-pipeline", "voice-booking-agent",
        "christ-heart-foundation", "academy-platform"
    ]
    page = browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    for slug in slugs:
        response = page.goto(origin + "/work/" + slug, wait_until="domcontentloaded")
        assert response is not None and response.status == 200, slug
        assert page.locator("main h1").count() == 1, slug
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), slug
    page.close()
    browser.close()
print("Passed 36 responsive route checks, all 16 project routes, reduced-motion and mobile keyboard navigation.")
