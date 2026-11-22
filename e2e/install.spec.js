import { test, expect } from '@playwright/test';

async function offerInstall(page, outcome = 'dismissed') {
  await page.evaluate(outcome => {
    const event = new Event('beforeinstallprompt', { cancelable: true });
    event.prompt = async () => {
      window.installPromptCalls = (window.installPromptCalls || 0) + 1;
      window.installHadUserActivation = navigator.userActivation.isActive;
      if (outcome === 'error') throw new Error('Prompt unavailable');
      return { outcome };
    };
    window.dispatchEvent(event);
    window.installDefaultPrevented = event.defaultPrevented;
  }, outcome);
}

test('opens the native prompt on click and consumes each offer only once', async ({ page }) => {
  await page.goto('/');
  await offerInstall(page);
  expect(await page.evaluate(() => window.installDefaultPrevented)).toBe(true);
  await page.getByRole('button', { name: 'Install app', exact: true }).click();
  expect(await page.evaluate(() => window.installPromptCalls)).toBe(1);
  expect(await page.evaluate(() => window.installHadUserActivation)).toBe(true);
  await expect(page.locator('#install-dialog')).not.toBeVisible();

  await page.getByRole('button', { name: 'Install app', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Install docSpace' })).toBeVisible();
  await expect(page.locator('#install-native')).toBeHidden();
  expect(await page.evaluate(() => window.installPromptCalls)).toBe(1);
});

test('enables installation if the browser becomes ready while help is open', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Install app', exact: true }).click();
  await expect(page.locator('#install-instructions')).toBeVisible();
  await offerInstall(page, 'accepted');
  await expect(page.locator('#install-status')).toContainText('ready to install');
  await expect(page.locator('#install-instructions')).toBeHidden();
  await page.getByRole('button', { name: 'Install now', exact: true }).click();
  await expect(page.locator('#install-dialog')).not.toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new Event('appinstalled')));
  await expect(page.locator('#install')).toBeHidden();
});

test('shows a usable fallback if a native prompt fails', async ({ page }) => {
  await page.goto('/');
  await offerInstall(page, 'error');
  await page.getByRole('button', { name: 'Install app', exact: true }).click();
  await expect(page.locator('#install-dialog')).toBeVisible();
  await expect(page.locator('#install-status')).toContainText('could not open');
  await expect(page.locator('#install-instructions')).toBeVisible();
  await expect(page.locator('#install')).toBeEnabled();
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await expect(page.locator('#install')).toBeFocused();
});

test('hides the install action when launched as an installed app', async ({ page }) => {
  await page.addInitScript(() => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = query => {
      const media = original(query);
      if (query === '(display-mode: standalone)') Object.defineProperty(media, 'matches', { value: true });
      return media;
    };
  });
  await page.goto('/');
  await expect(page.locator('#install')).toBeHidden();
});

test.describe('iPhone installation', () => {
  test.use({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',
  });
  test('shows Safari home-screen instructions with no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Install app', exact: true }).click();
    await expect(page.locator('[data-install-platform="ios"]')).toBeVisible();
    await expect(page.locator('[data-install-platform="android"]')).toBeHidden();
    await expect(page.locator('#install-instructions')).toContainText('Add to Home Screen');
    const dialog = await page.locator('#install-dialog').boundingBox();
    expect(dialog.x).toBeGreaterThanOrEqual(0);
    expect(dialog.x + dialog.width).toBeLessThanOrEqual(375);
    expect(await page.locator('#install-dialog').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  });
});

test.describe('Android installation', () => {
  test.use({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36',
  });
  test('shows Android guidance and switches to the available browser prompt', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Install app', exact: true }).click();
    await expect(page.locator('[data-install-platform="android"]')).toBeVisible();
    await expect(page.locator('[data-install-platform="ios"]')).toBeHidden();
    await offerInstall(page);
    await page.getByRole('button', { name: 'Install now', exact: true }).click();
    expect(await page.evaluate(() => window.installPromptCalls)).toBe(1);
    await expect(page.locator('#install-status')).toContainText('install docSpace later');
    await expect(page.locator('#install-instructions')).toBeVisible();
  });
});
