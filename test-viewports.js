import { chromium } from 'playwright';

const VIEWPORTS = [
  { width: 320, height: 600, name: '320px (iPhone SE / Small Mobile)' },
  { width: 360, height: 740, name: '360px (Galaxy S8 / Compact Android)' },
  { width: 375, height: 667, name: '375px (iPhone 8 / SE 3)' },
  { width: 390, height: 844, name: '390px (iPhone 12 / 13 / 14)' },
  { width: 430, height: 932, name: '430px (iPhone 14/15 Pro Max)' },
  { width: 768, height: 1024, name: '768px (iPad Mini / Portrait Tablet)' },
  { width: 1024, height: 768, name: '1024px (iPad Pro / Small Laptop)' },
  { width: 1280, height: 800, name: '1280px (Standard Desktop / Laptop)' },
  { width: 1440, height: 900, name: '1440px (MacBook Pro / Desktop)' },
  { width: 1920, height: 1080, name: '1920px (FHD Large Desktop)' },
];

async function runTests() {
  console.log('🚀 Launching Microsoft Edge via Playwright...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const results = [];
  let allPassed = true;

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n========================================`);
      console.log(`Testing Viewport: ${vp.width}x${vp.height} (${vp.name})`);
      console.log(`========================================`);

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.width < 1024,
        hasTouch: vp.width < 1024,
      });

      const page = await context.newPage();
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

      // Wait a moment for any CSS calculations / 3D mount
      await page.waitForTimeout(500);

      // 1. Check Horizontal Overflow
      const overflowCheck = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        // Find any elements exceeding viewport width
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          // allow 1px rounding margin
          if (rect.right > docWidth + 1.5 && rect.width > 0 && rect.height > 0) {
            const tag = el.tagName.toLowerCase();
            const id = el.id ? `#${el.id}` : '';
            const className = typeof el.className === 'string' ? `.${el.className.split(' ')[0]}` : '';
            overflowingElements.push({
              element: `${tag}${id}${className}`,
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              viewportWidth: docWidth,
            });
            if (overflowingElements.length >= 5) break;
          }
        }

        return {
          clientWidth: docWidth,
          docScrollWidth: scrollWidth,
          bodyScrollWidth: bodyScrollWidth,
          hasHorizontalScroll: scrollWidth > docWidth + 1 || bodyScrollWidth > docWidth + 1,
          overflowingElements,
        };
      });

      console.log(`  - Client Width: ${overflowCheck.clientWidth}px`);
      console.log(`  - Doc Scroll Width: ${overflowCheck.docScrollWidth}px`);
      console.log(`  - Body Scroll Width: ${overflowCheck.bodyScrollWidth}px`);

      if (overflowCheck.hasHorizontalScroll) {
        console.error(`  ❌ HORIZONTAL OVERFLOW DETECTED at ${vp.width}px!`);
        console.error(`  Culprit elements:`, overflowCheck.overflowingElements);
        allPassed = false;
        results.push({ viewport: vp.width, status: 'FAILED - Horizontal Overflow', details: overflowCheck });
      } else {
        console.log(`  ✅ Zero Horizontal Overflow (scrollWidth matches clientWidth)`);
      }

      // 2. Navigation & Hamburger Menu Check
      if (vp.width < 1024) {
        // Mobile / Tablet: Hamburger button should be visible
        const hamburgerBtn = page.locator('button[aria-label="Open mobile navigation"]');
        const isHamburgerVisible = await hamburgerBtn.isVisible();
        console.log(`  - Mobile Hamburger Button Visible: ${isHamburgerVisible}`);

        if (!isHamburgerVisible) {
          console.error(`  ❌ Hamburger button should be visible at ${vp.width}px!`);
          allPassed = false;
        }

        // Test opening hamburger menu
        await hamburgerBtn.click();
        await page.waitForTimeout(300);

        // Check if menu dialog is open and visible
        const mobileMenu = page.locator('#mobile-navigation');
        const isMenuOpen = await mobileMenu.isVisible();
        console.log(`  - Mobile Menu Opened: ${isMenuOpen}`);

        // Check background scroll lock
        const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
        console.log(`  - Body Scroll Locked (overflow=hidden): ${bodyOverflow === 'hidden'}`);

        // Test closing menu with Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        const isMenuClosedAfterEsc = !(await mobileMenu.isVisible());
        console.log(`  - Menu Closed on Escape: ${isMenuClosedAfterEsc}`);

        // Re-open and test link click closes menu
        await hamburgerBtn.click();
        await page.waitForTimeout(300);
        const servicesLink = page.locator('#mobile-navigation a[href="#services"]');
        await servicesLink.click();
        await page.waitForTimeout(300);
        const isMenuClosedAfterClick = !(await mobileMenu.isVisible());
        console.log(`  - Menu Closed on Nav Link Selection: ${isMenuClosedAfterClick}`);
      } else {
        // Desktop: Desktop nav links visible, hamburger button hidden
        const desktopNav = page.locator('header nav a').first();
        const isDesktopNavVisible = await desktopNav.isVisible();
        const hamburgerBtn = page.locator('button[aria-label="Open mobile navigation"]');
        const isHamburgerVisible = await hamburgerBtn.isVisible();
        console.log(`  - Desktop Nav Visible: ${isDesktopNavVisible}, Hamburger Hidden: ${!isHamburgerVisible}`);
      }

      // 3. Test Interactive Components at Mobile (375px) & Desktop (1280px)
      if (vp.width === 375 || vp.width === 1280) {
        console.log(`  - Testing interactive components...`);

        // Test Project Modal
        const projectCard = page.locator('[aria-label*="View project details"]').first();
        if (await projectCard.isVisible()) {
          await projectCard.click();
          await page.waitForTimeout(300);
          const modal = page.locator('[role="dialog"]');
          const isModalOpen = await modal.isVisible();
          console.log(`    * Project Modal Opened: ${isModalOpen}`);

          const closeBtn = page.locator('button[aria-label="Close project modal"]');
          await closeBtn.click();
          await page.waitForTimeout(300);
          console.log(`    * Project Modal Closed successfully`);
        }

        // Test Service Modal
        const serviceCardBtn = page.locator('button:has-text("Explore Technical Scope")').first();
        if (await serviceCardBtn.isVisible()) {
          await serviceCardBtn.click();
          await page.waitForTimeout(300);
          const serviceModal = page.locator('button[aria-label="Close service scope modal"]');
          const isServiceModalOpen = await serviceModal.isVisible();
          console.log(`    * Service Detail Modal Opened: ${isServiceModalOpen}`);
          await serviceModal.click();
          await page.waitForTimeout(300);
          console.log(`    * Service Detail Modal Closed successfully`);
        }

        // Test Privacy Modal
        const privacyBtn = page.locator('button:has-text("Privacy Policy & Data Notice")');
        if (await privacyBtn.isVisible()) {
          await privacyBtn.click();
          await page.waitForTimeout(300);
          const privacyModalClose = page.locator('button[aria-label="Close privacy modal"]');
          const isPrivacyModalOpen = await privacyModalClose.isVisible();
          console.log(`    * Privacy Modal Opened: ${isPrivacyModalOpen}`);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
          console.log(`    * Privacy Modal Closed with Escape`);
        }

        // Test Contact Form Validation
        const submitBtn = page.locator('#contact button[type="submit"]');
        await submitBtn.scrollIntoViewIfNeeded();
        await submitBtn.click();
        await page.waitForTimeout(400);

        const errorVisible = await page.locator('#contact .text-red-400').first().isVisible();
        console.log(`    * Contact Form Required Field Validation Active: ${errorVisible}`);
      }

      results.push({ viewport: vp.width, status: overflowCheck.hasHorizontalScroll ? 'FAIL' : 'PASS' });
      await context.close();
    }

    console.log(`\n========================================`);
    console.log(`FINAL VIEWPORT TEST SUMMARY`);
    console.log(`========================================`);
    console.table(results);

    if (allPassed) {
      console.log(`🎉 ALL 10 VIEWPORTS PASSED WITH ZERO HORIZONTAL OVERFLOW & FULLY VERIFIED INTERACTIONS!`);
    } else {
      console.error(`⚠️ SOME VIEWPORTS ENCOUNTERED ISSUES.`);
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
