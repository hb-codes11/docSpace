import { test, expect } from '@playwright/test';

test('the production browser policy blocks requests to unlisted origins', async ({ page }) => {
  const outgoing = [];
  page.on('request', request => {
    if (request.url().startsWith('https://example.invalid/')) outgoing.push(request.url());
  });
  await page.goto('/');
  const blocked = await page.evaluate(async () => {
    const violation = new Promise(resolve => {
      document.addEventListener('securitypolicyviolation', event => {
        if (event.effectiveDirective === 'connect-src') resolve(event.blockedURI);
      });
    });
    await fetch('https://example.invalid/docspace-policy-check').catch(() => {});
    return violation;
  });
  expect(blocked).toMatch(/^https:\/\/example\.invalid/);
  expect(outgoing).toEqual([]);
});
