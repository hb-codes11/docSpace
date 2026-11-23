import { test, expect } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';
import { readFile } from 'node:fs/promises';

async function fixture(name, widths = [210, 220, 230]) {
  const pdf = await PDFDocument.create();
  for (const width of widths) pdf.addPage([width, 300]);
  return { name, mimeType: 'application/pdf', buffer: Buffer.from(await pdf.save()) };
}

async function downloadPdf(page, filename) {
  const link = page.getByRole('link', { name: 'Download ' + filename });
  await expect(link).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
  return PDFDocument.load(await readFile(await download.path()));
}

test('sun and moon controls preserve manual and device theme preferences', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Dark theme', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Use device theme' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Light theme', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Use device theme' })).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Use device theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Jelly Radio supports keyboard selection and updates the actual export format', async ({ page }) => {
  await page.goto('/#/pdf-to-images');
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf'));
  const png = page.getByRole('radio', { name: 'PNG', exact: true });
  const jpg = page.getByRole('radio', { name: 'JPG', exact: true });
  await expect(png).toHaveAttribute('aria-checked', 'true');
  await png.focus();
  await png.press('ArrowRight');
  await expect(jpg).toHaveAttribute('aria-checked', 'true');
  await expect(jpg).toBeFocused();
  await expect(page.locator('#image-format')).toHaveValue('image/jpeg');
  await jpg.press('Home');
  await expect(png).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('#image-format')).toHaveValue('image/png');
});

test('Fuse Button undo restores organized page order, rotation, and removals', async ({ page }) => {
  await page.goto('/#/organize-pdf');
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf'));
  await expect(page.locator('#page-grid li')).toHaveCount(3);
  await page.getByRole('button', { name: 'Move earlier page 2' }).click();
  await page.getByRole('button', { name: 'Rotate clockwise page 2' }).click();
  await page.getByRole('button', { name: 'Remove page 3' }).click();
  await page.getByRole('button', { name: 'Clear files', exact: true }).click();
  await expect(page.locator('#queue')).toBeHidden();
  await page.getByRole('button', { name: 'Undo clear', exact: true }).click();
  await expect(page.locator('#page-grid li')).toHaveCount(2);
  await page.locator('#process').click();
  const pdf = await downloadPdf(page, 'organized.pdf');
  expect(pdf.getPages().map(item => item.getWidth())).toEqual([220, 210]);
  expect(pdf.getPage(0).getRotation().angle).toBe(90);
});

test('clear undo expires and cannot overwrite newly selected files', async ({ page }) => {
  await page.goto('/');
  await page.locator('#picker').setInputFiles(await fixture('old.pdf', [210]));
  await page.getByRole('button', { name: 'Clear files', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Undo clear', exact: true })).toBeVisible();
  await page.locator('#picker').setInputFiles(await fixture('new.pdf', [220]));
  await expect(page.getByRole('button', { name: 'Undo clear', exact: true })).toHaveCount(0);
  await expect(page.locator('#queue')).toContainText('new.pdf');
  await expect(page.locator('#queue')).not.toContainText('old.pdf');
  await page.getByRole('button', { name: 'Clear files', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Undo clear', exact: true })).toBeVisible();
  await page.locator('.fuse-button__rim rect').evaluate(element => {
    for (const animation of element.getAnimations()) animation.finish();
  });
  await expect(page.locator('#queue-toolbar')).toBeHidden();
  await page.locator('#picker').setInputFiles(await fixture('third.pdf', [230]));
  await expect(page.getByRole('button', { name: 'Clear files', exact: true })).toBeEnabled();
});

test('restores scanner rotation through Clear files and keyboard undo', async ({ page }) => {
  await page.goto('/#/scan-document');
  await page.locator('#picker').setInputFiles('public/icons/icon-192.png');
  await page.getByRole('button', { name: 'Edit page 1' }).click();
  await page.getByRole('button', { name: 'Rotate 90°' }).click();
  await page.getByRole('button', { name: 'Apply edits' }).click();
  await page.getByRole('button', { name: 'Clear files', exact: true }).click();
  const undo = page.getByRole('button', { name: 'Undo clear', exact: true });
  await expect(undo).toBeFocused();
  await undo.press('Escape');
  await expect(page.getByRole('button', { name: 'Edit page 1' })).toContainText('Edited');
  await page.getByRole('button', { name: 'Create scanned PDF' }).click();
  await downloadPdf(page, 'scan.pdf');
});

test('wordmark and controls remain usable with reduced motion on a small phone', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/');
  await expect(page.locator('#hero-wordmark canvas')).toBeVisible();
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.theme-thumb')).toHaveCSS('transition-duration', '0s');
  await page.locator('#picker').setInputFiles(await fixture('small.pdf', [210]));
  await page.getByRole('button', { name: 'Clear files', exact: true }).click();
  await page.getByRole('button', { name: 'Undo clear', exact: true }).click();
  await expect(page.locator('#queue li')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});
