"""Run against a local production build. Set CHROMIUM_PATH for system Chromium."""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

origin = os.environ.get("REVIEW_ORIGIN", "http://127.0.0.1:3198")
screens = os.environ.get("REVIEW_SCREENSHOTS")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
    for width, javascript in [(w, True) for w in (320, 375, 390, 768, 1024, 1366, 1440, 1920)] + [(320, False)]:
        page = browser.new_page(viewport={"width": width, "height": 900},
                                java_script_enabled=javascript, reduced_motion="reduce")
        for path in ["/", "/work", "/work/cefa", "/work/ai-job-scraper", "/contact", "/resume"]:
            response = page.goto(origin + path, wait_until="domcontentloaded", timeout=45000)
            assert response is not None and response.status == 200, (path, width)
            page.locator("h1").wait_for()
            assert page.locator("h1").count() == 1
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (path, width)
            if path == "/":
                assert page.locator(".v2-hero").get_attribute("data-motion") == "static"
                assert page.locator(".v2-scene-photo").count() == 1
                assert page.locator(".v2-project").count() == 6
                assert page.locator(".v2-project[open]").count() == 1
                assert page.get_by_role("link", name="Explore my work").get_attribute("href") == "#v2-work"
                assert page.locator(".v2-hero .v2-button").first.evaluate("el => getComputedStyle(el).backgroundColor") == "rgb(255, 255, 255)"
                assert page.locator("header:visible").count() == 1
                assert page.locator(".v2-adoption").count() == 1
                if javascript:
                    page.locator(".v2-project summary").nth(1).click()
                    assert page.locator(".v2-project").nth(1).get_attribute("open") is not None
                    assert page.locator(".v2-project[open]").count() == 1
            if path == "/work":
                assert page.locator(".work-index-card").count() == 17
                assert page.locator(".work-index-card img").count() == 13
            if path in ("/work/cefa", "/work/ai-job-scraper"):
                assert page.locator("[data-case-hero] img").count() == 1
                assert page.get_by_role("navigation", name="Case-study chapters").count() == 1
                assert page.locator(".case-title-word").count() >= 2
                assert page.get_by_role("link", name="Challenge").get_attribute("href") == "#case-challenge"
                assert page.get_by_role("link", name="Outcome").get_attribute("href") == "#case-results"
                assert page.get_by_role("link", name="Visual record").get_attribute("href") == "#case-visual-evidence"
                assert page.locator(".case-cinema-chapter").count() == 1
                assert page.locator(".case-cinema-response li").count() >= 2
                assert page.locator(".case-cinema-verification-row").count() >= 1
                if javascript and width == 375:
                    page.locator('.case-chapter-nav-link[href="#case-system"]').click()
                    assert page.url.endswith("#case-system")
            if path == "/work/cefa":
                assert page.get_by_text("Verified operating snapshot", exact=True).count() == 1
                for number in ("127", "10", "113"):
                    assert page.locator('[aria-label="Verified project metrics"]').get_by_text(number, exact=True).count() == 1
            if path == "/work/cefa" and javascript and width == 375:
                opener = page.locator(".evidence-image-link").first
                opener.click()
                viewer = page.locator(".evidence-theatre-dialog")
                assert viewer.is_visible(), "Evidence theatre did not open"
                assert viewer.get_by_role("button", name="Close image viewer").evaluate("el => el === document.activeElement"), "Close must receive initial focus"
                assert viewer.get_attribute("aria-labelledby") == "evidence-dialog-heading"
                assert viewer.locator("#evidence-dialog-description").inner_text().strip()
                assert "01" in viewer.locator(".evidence-theatre-dialog-count").inner_text()
                page.keyboard.press("ArrowRight")
                assert "02" in viewer.locator(".evidence-theatre-dialog-count").inner_text()
                page.keyboard.press("Escape")
                assert not viewer.is_visible(), "Escape did not close image theatre"
                assert opener.evaluate("el => el === document.activeElement"), "Focus must return to opening image"
            if path == "/work/cefa" and not javascript:
                assert page.locator(".evidence-image-link").first.get_attribute("href").endswith("learning-portal-sign-in.jpg")
                assert page.locator(".evidence-theatre-index-link").count() == 4
            if path == "/work/ai-job-scraper":
                assert page.locator(".evidence-panel").count() == 4
                assert page.get_by_role("link", name="Open original").count() == 3
                assert page.locator('img[src*="job-intelligence-workflow"]').count() >= 1
                if javascript and width in (320, 1440):
                    opener = page.locator("#case-evidence-figure-4 .evidence-image-link")
                    opener.click()
                    viewer = page.locator(".evidence-theatre-dialog")
                    assert viewer.locator(".evidence-theatre-dialog-count").inner_text().strip() == "FIG 04 / 04"
                    assert viewer.get_by_role("button", name="Close image viewer").evaluate("el => el === document.activeElement")
                    page.keyboard.press("ArrowLeft")
                    assert viewer.locator(".evidence-theatre-dialog-count").inner_text().strip() == "FIG 02 / 04"
                    page.keyboard.press("Escape")
                    assert not viewer.is_visible()
                    assert opener.evaluate("el => el === document.activeElement")
            assert page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
            assert not page.locator("html.lenis").count()
            # Evaluate one DOM snapshot; a closing evidence dialog can remove
            # its image between locator enumeration and indexed lookup.
            assert page.locator("main img:not([alt])").count() == 0, (path, width)
            if screens and width in (320, 768, 1440) and javascript and path in ["/", "/work", "/work/cefa", "/work/ai-job-scraper"]:
                name = path.strip("/").replace("/", "-") or "home"
                if path == "/":
                    page.evaluate("window.scrollTo(0, 0)")
                    page.wait_for_timeout(120)
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
    # Full project-catalog route coverage supplements the viewport checks.
    # Keep slugs explicit so a rename requires an intentional test update.
    slugs = [
        "cefa", "whatsapp-ordering-system", "web-ordering-and-payments",
        "elion-sales-command-centre", "security-workforce-operations",
        "b2b-revenue-engine", "elion-homes", "leadreach",
        "foc-inc-operations", "ai-job-scraper", "lead-capture-crm-sync",
        "smartbook-ai", "lead-intelligence-pipeline", "voice-booking-agent",
        "christ-heart-foundation", "academy-platform", "leadreach-prospect-intelligence"
    ]
    page = browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    for slug in slugs:
        response = page.goto(origin + "/work/" + slug, wait_until="domcontentloaded", timeout=45000)
        assert response is not None and response.status == 200, slug
        assert page.locator("main h1").count() == 1, slug
        assert page.get_by_role("heading", name="The work at a glance.").count() == 1, slug
        assert page.get_by_role("navigation", name="Case study contact options").get_by_role("link", name="Discuss a project").get_attribute("href") == "/contact", slug
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), slug
    page.close()
    # Static motion is a first-class path, including the screenshot's 1366x635 viewport.
    # A clipped sticky frame must never hide the evidence disclaimer or case-study link.
    for width, height in ((1366, 635), (1440, 900)):
        static_page = browser.new_page(
            viewport={"width": width, "height": height},
            reduced_motion="reduce", java_script_enabled=False
        )
        resp = static_page.goto(origin, wait_until="domcontentloaded", timeout=45000)
        assert resp is not None and resp.status == 200
        assert static_page.locator(".v2-hero").get_attribute("data-motion") == "static"
        assert static_page.get_by_role("link", name="Explore my work").is_visible()
        assert static_page.get_by_role("heading", level=1).is_visible()
        assert static_page.locator(".v2-project").count() == 6
        assert static_page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        static_page.close()
    # On a cold case-study visit, recordings must remain click-to-play.
    page = browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    video_requests = []
    page.on("request", lambda request: video_requests.append(request.url) if request.url.split("?")[0].endswith(".mp4") else None)
    page.goto(origin + "/work/ai-job-scraper", wait_until="load", timeout=45000)
    page.locator("video").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    assert page.locator("video").get_attribute("preload") == "none"
    assert not video_requests, "Unexpected video transfer before playback"
    page.close()

    for width, js in ((320, False), (390, True), (768, True), (1366, True), (1440, True)):
        preview = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="reduce", java_script_enabled=js)
        response = preview.goto(origin + "/design-preview", wait_until="domcontentloaded", timeout=45000)
        assert response is not None and response.status == 200
        assert preview.get_by_role("heading", level=1).count() == 1
        assert preview.locator(".v2-project").count() == 6
        assert preview.locator(".v2-hero").get_attribute("data-motion") == "static"
        assert preview.locator("meta[name=robots]").get_attribute("content") == "noindex, nofollow"
        assert preview.evaluate("document.documentElement.scrollWidth <= innerWidth"), width
        assert preview.locator(".v2-project img:not([alt])").count() == 0
        assert preview.locator(".v2-scene-photo").count() == 1
        assert preview.locator(".v2-project[open]").count() == 1
        assert preview.locator(".v2-hero .v2-button").first.evaluate("el => getComputedStyle(el).backgroundColor") == "rgb(255, 255, 255)"
        if js:
            preview.locator(".v2-project summary").nth(1).click()
            assert preview.locator(".v2-project").nth(1).get_attribute("open") is not None
            assert preview.locator(".v2-project[open]").count() == 1
            assert preview.locator(".v2-project").nth(1).locator(".v2-product-scene").is_visible()
        if js and width == 390:
            menu = preview.locator(".v2-menu summary")
            menu.click()
            assert preview.locator(".v2-menu").get_attribute("open") is not None
            preview.keyboard.press("Escape")
            assert preview.locator(".v2-menu").get_attribute("open") is None
            assert menu.evaluate("el => el === document.activeElement")
        if screens and width in (390,1440):
            preview.screenshot(path=Path(screens) / f"v2-static-{width}.png", full_page=True)
        preview.close()
    browser.close()
print("Passed responsive portfolio checks, studio interaction, 17 case routes, reduced-motion and mobile keyboard navigation.")
