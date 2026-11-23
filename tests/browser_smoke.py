"""Run against a local production build. Set CHROMIUM_PATH for system Chromium."""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

origin = os.environ.get("REVIEW_ORIGIN", "http://127.0.0.1:3198")
screens = os.environ.get("REVIEW_SCREENSHOTS")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"))
    for width, javascript in [(1440, True), (320, True), (320, False)]:
        page = browser.new_page(viewport={"width": width, "height": 900},
                                java_script_enabled=javascript, reduced_motion="reduce")
        for path in ["/", "/work", "/work/cefa", "/work/ai-job-scraper", "/contact"]:
            page.goto(origin + path)
            page.locator("h1").wait_for()
            assert page.locator("h1").count() == 1
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (path, width)
            if screens and javascript and path in ["/", "/work/cefa", "/work/ai-job-scraper"]:
                name = path.strip("/").replace("/", "-") or "home"
                page.screenshot(path=Path(screens) / f"{name}-{width}.png")
        if width == 320 and javascript:
            page.get_by_role("button", name="Menu").click()
            page.locator("#menu").get_by_role("link", name="Engineering lab").click()
            page.wait_for_url("**/work#lab")
        page.close()
    browser.close()
print("Passed 15 responsive route checks and mobile lab navigation.")
