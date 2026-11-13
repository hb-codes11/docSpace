import { test, expect } from '@playwright/test';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';

async function fixture(name, widths, content = '') {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  for (const width of widths) {
    const page = pdf.addPage([width, 200]);
    if (content) page.drawText(content, { x: 12, y: 110, size: 12, font });
  }
  return { name, mimeType: 'application/pdf', buffer: Buffer.from(await pdf.save()) };
}

async function result(page, name) {
  const link = page.getByRole('link', { name: 'Download ' + name });
  await expect(link).toBeVisible({ timeout: 20000 });
  const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
  return readFile(await download.path());
}

test('merge honors file order without sending documents', async ({ page }) => {
  const unexpected = [];
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4173/') || request.method() !== 'GET') unexpected.push(request.url());
  });
  await page.goto('/');
  await page.locator('#picker').setInputFiles([await fixture('first.pdf', [210]), await fixture('second.pdf', [310])]);
  await page.getByRole('button', { name: 'Move up second.pdf' }).click();
  await page.locator('#process').click();
  const pdf = await PDFDocument.load(await result(page, 'merged.pdf'));
  expect(pdf.getPages().map(item => item.getWidth())).toEqual([310, 210]);
  expect(unexpected).toEqual([]);
});

test('extracts a range and exports a split ZIP on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: /Split PDF/ }).click();
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210, 220, 230]));
  await page.getByLabel('Pages to keep').fill('3, 1');
  await page.locator('#process').click();
  const pdf = await PDFDocument.load(await result(page, 'extracted.pdf'));
  expect(pdf.getPages().map(item => item.getWidth())).toEqual([230, 210]);
  await page.getByLabel('Save each selected page separately in a ZIP').check();
  await page.locator('#process').click();
  const zip = await JSZip.loadAsync(await result(page, 'split-pages.zip'));
  expect(Object.keys(zip.files).sort()).toEqual(['page-001.pdf', 'page-003.pdf']);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);
});

test('converts text to DOCX and reports image-only pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /PDF to Word/ }).click();
  await page.locator('#picker').setInputFiles(await fixture('letter.pdf', [320, 320], 'Hello docSpace'));
  await page.locator('#process').click();
  const zip = await JSZip.loadAsync(await result(page, 'converted.docx'));
  const document = await zip.file('word/document.xml').async('string');
  expect(document.match(/Hello docSpace/g)).toHaveLength(2);
  expect(document).toContain('pageBreakBefore');
  await page.locator('#picker').setInputFiles(await fixture('blank.pdf', [320]));
  await page.locator('#process').click();
  await expect(page.getByRole('status').first()).toContainText('no selectable text');
});

test('organizes pages by reordering, rotating and removing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Organize PDF/ }).click();
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210, 220, 230], 'Preview'));
  await expect(page.locator('#page-grid img[src]').first()).toBeVisible();
  await page.getByRole('button', { name: 'Move earlier page 2' }).click();
  await page.getByRole('button', { name: 'Rotate clockwise page 2' }).click();
  await page.getByRole('button', { name: 'Remove page 3' }).click();
  await page.locator('#process').click();
  const pdf = await PDFDocument.load(await result(page, 'organized.pdf'));
  expect(pdf.getPages().map(item => item.getWidth())).toEqual([220, 210]);
  expect(pdf.getPage(0).getRotation().angle).toBe(90);
});

test('exports a selected page as PNG and combines images back into a PDF', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /PDF to images/ }).click();
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210, 220], 'An image'));
  await page.getByRole('button', { name: 'Page 2', exact: true }).click();
  await expect(page.getByLabel('Pages to keep')).toHaveValue('2');
  await page.locator('#process').click();
  const zip = await JSZip.loadAsync(await result(page, 'page-images.zip'));
  expect(Object.keys(zip.files)).toEqual(['page-002.png']);
  const png = await zip.file('page-002.png').async('nodebuffer');
  expect(png.subarray(1, 4).toString()).toBe('PNG');

  await page.getByRole('button', { name: /Images to PDF/ }).click();
  await page.locator('#picker').setInputFiles({ name: 'page.png', mimeType: 'image/png', buffer: png });
  await page.locator('#process').click();
  const pdf = await PDFDocument.load(await result(page, 'images.pdf'));
  expect(pdf.getPageCount()).toBe(1);
});

test('exports DOCX text and makes a smaller PDF from a large scan', async ({ page }) => {
  const docx = new JSZip();
  docx.file('word/document.xml', '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Document studio</w:t></w:r></w:p></w:body></w:document>');
  await page.goto('/');
  await page.getByRole('button', { name: /Word to PDF/ }).click();
  await page.locator('#picker').setInputFiles({
    name: 'document.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    buffer: await docx.generateAsync({ type: 'nodebuffer' }),
  });
  await page.locator('#process').click();
  const output = await result(page, 'document.pdf');
  expect((await PDFDocument.load(output)).getPageCount()).toBe(1);

  const base = await fixture('scan.pdf', [220], 'Scanned PDF fixture');
  const scan = await PDFDocument.load(base.buffer);
  await scan.attach(Buffer.alloc(200_000, 1), 'fixture.bin');
  const bytes = Buffer.from(await scan.save({ useObjectStreams: false }));
  const padded = Buffer.concat([bytes, Buffer.alloc(100_000, 32)]);
  await page.getByRole('button', { name: /Compress scan/ }).click();
  await page.locator('#picker').setInputFiles({ ...base, buffer: padded });
  await page.locator('#process').click();
  const compressed = await result(page, 'compressed-scan.pdf');
  expect(compressed.length).toBeLessThan(padded.length);
  expect((await PDFDocument.load(compressed)).getPageCount()).toBe(1);
});

test('tool links survive reload and browser back on static hosting', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tools [data-mode="split"]').click();
  await expect(page).toHaveURL(/#\/split-pdf$/);
  await page.reload();
  await expect(page.locator('#tool-title')).toHaveText('Split PDF');
  await page.locator('.tools [data-mode="merge"]').click();
  await page.goBack();
  await expect(page.locator('#tool-title')).toHaveText('Split PDF');
  await expect(page.locator('.ad-container')).toHaveCount(0);
});

test('offers a reload when the image export module is unavailable', async ({ page }) => {
  await page.route('**/assets/pdf-images-*.js', route => route.fulfill({ status: 404 }));
  await page.goto('/#/pdf-to-images');
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210]));
  await page.locator('#process').click();
  await expect(page.locator('#status')).toContainText('Reload docSpace, then select your file again.');
  const reload = page.getByRole('button', { name: 'Reload docSpace' });
  await expect(reload).toBeFocused();
  await page.unroute('**/assets/pdf-images-*.js');
  await reload.click();
  await expect(page.locator('#tool-title')).toHaveText('PDF to images');
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210]));
  await page.locator('#process').click();
  await result(page, 'page-images.zip');
});
