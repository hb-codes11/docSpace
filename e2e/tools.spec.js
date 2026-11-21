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
  expect(download.suggestedFilename()).toBe(name);
  return readFile(await download.path());
}

test('merge honors file order without sending documents', async ({ page }) => {
  const unexpected = [];
  page.on('request', request => {
    const url = new URL(request.url());
    if (url.protocol === 'blob:') return;
    if (url.origin !== 'http://127.0.0.1:4173' || request.method() !== 'GET') unexpected.push(request.url());
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
  await expect(page.getByRole('button', { name: 'Page 3', exact: true })).toBeVisible();
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

test.describe('missing asset recovery', () => {
  test.use({ serviceWorkers: 'block' });

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
});

test('adds watermark and numbering through a continuous PDF workflow', async ({ page }) => {
  await page.goto('/#/watermark-pdf');
  await page.locator('#picker').setInputFiles(await fixture('source.pdf', [300, 300], 'Original text'));
  await page.getByLabel('Watermark text').fill('DRAFT');
  await page.getByLabel('Pages to keep').fill('2');
  await page.locator('#process').click();
  await result(page, 'watermarked.pdf');
  await page.getByLabel('Continue with this PDF').selectOption('numbers');
  await page.getByRole('button', { name: 'Open tool', exact: true }).click();
  await page.getByLabel('Start numbering at').fill('7');
  await page.locator('#process').click();
  await result(page, 'numbered.pdf');
  await page.getByLabel('Continue with this PDF').selectOption('word');
  await page.getByRole('button', { name: 'Open tool', exact: true }).click();
  await page.locator('#process').click();
  const zip = await JSZip.loadAsync(await result(page, 'converted.docx'));
  const xml = await zip.file('word/document.xml').async('string');
  expect(xml.match(/DRAFT/g)).toHaveLength(1);
  expect(xml).toContain('Original text');
  expect(xml).toMatch(/>7</);
  expect(xml).toMatch(/>8</);
});

test('scans two photos offline and downloads a named PDF on a phone layout', async ({ page, context }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const manifestResponse = await page.request.get('/manifest.webmanifest');
  const manifest = await manifestResponse.json();
  expect(manifest.display).toBe('standalone');
  expect(manifest.icons.map(icon => icon.sizes)).toContain('512x512');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  await page.goto('/#/scan-document');
  await page.reload();
  await expect(page.locator('#tool-title')).toHaveText('Document scanner');
  await expect(page.locator('#camera-picker')).toHaveAttribute('capture', 'environment');

  const image = await readFile(new URL('../public/icons/icon-192.png', import.meta.url));
  await page.locator('#camera-picker').setInputFiles({ name: 'camera.png', mimeType: 'image/png', buffer: image });
  await page.locator('#picker').setInputFiles({ name: 'gallery.png', mimeType: 'image/png', buffer: image });
  await expect(page.locator('.scan-thumbnail')).toHaveCount(2);
  await page.getByLabel('Grayscale').check();
  await page.getByRole('button', { name: 'Create scanned PDF' }).click();
  await page.getByLabel('Save as').fill('Lecture notes.pdf');
  const pdf = await PDFDocument.load(await result(page, 'Lecture notes.pdf'));
  expect(pdf.getPages().map(p => p.getSize())).toEqual([{ width: 595, height: 842 }, { width: 595, height: 842 }]);
});

test('follows the device theme and remembers a manual selection', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Color theme').selectOption('light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Color theme').selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('crops and rotates a scanner page before PDF export', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#/scan-document');
  const png = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#cc3044';
    ctx.fillRect(0, 0, 400, 600);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    for (const [x, y] of [[80, 90], [325, 72], [360, 534], [48, 543]]) ctx.lineTo(x, y);
    ctx.fill();
    return canvas.toDataURL('image/png').split(',')[1];
  });
  await page.locator('#picker').setInputFiles({ name: 'angled-page.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
  await page.getByRole('button', { name: 'Edit page 1' }).click();
  const dialog = page.getByRole('dialog', { name: 'Crop and straighten' });
  for (const [name, direction, times] of [
    ['Top left corner', 'Right', 5], ['Top left corner', 'Down', 4],
    ['Top right corner', 'Left', 5], ['Top right corner', 'Down', 4],
    ['Bottom right corner', 'Left', 3], ['Bottom right corner', 'Up', 3],
    ['Bottom left corner', 'Right', 4], ['Bottom left corner', 'Up', 3],
  ]) {
    const corner = dialog.getByRole('button', { name });
    for (let i = 0; i < times; i++) await corner.press('Shift+Arrow' + direction);
  }
  await dialog.getByRole('button', { name: 'Rotate 90°' }).click();
  const preview = dialog.locator('canvas');
  await expect(preview).toBeVisible();
  const shape = await preview.evaluate(canvas => ({ width: canvas.width, height: canvas.height }));
  expect(shape.width).toBeGreaterThan(shape.height);
  expect(shape.height).toBeLessThan(250);
  const pixel = await preview.evaluate(canvas => [...canvas.getContext('2d').getImageData(2, 2, 1, 1).data]);
  expect(pixel).toEqual([255, 255, 255, 255]);
  await dialog.getByRole('button', { name: 'Apply edits' }).click();
  await page.getByRole('button', { name: 'Create scanned PDF' }).click();
  const pdf = await PDFDocument.load(await result(page, 'scan.pdf'));
  expect(pdf.getPages().map(p => p.getSize())).toEqual([{ width: 842, height: 595 }]);
});

test('signs, sanitizes, and redacts a confidential document', async ({ page }) => {
  await page.goto('/#/sign-pdf');
  await expect(page.locator('#sign-options')).toBeHidden();

  const doc = await PDFDocument.create();
  doc.addPage([500, 500]);
  doc.setTitle('Confidential Financial Agreement');
  doc.setAuthor('Internal Executive');
  const buffer = Buffer.from(await doc.save());

  await page.locator('#picker').setInputFiles({ name: 'contract.pdf', mimeType: 'application/pdf', buffer });
  await expect(page.locator('#sign-options')).toBeVisible();

  // Try to sign without drawing
  await page.getByRole('button', { name: 'Apply signature' }).click();
  await expect(page.locator('#status')).toContainText('Please draw your signature');

  // Draw signature on canvas
  const box = await page.locator('#signature-pad').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.down();
  await page.mouse.move(box.x + 100, box.y + 80);
  await page.mouse.up();

  // Apply signature
  await page.getByRole('button', { name: 'Apply signature' }).click();
  const signedBuffer = await result(page, 'signed.pdf');
  const signedPdf = await PDFDocument.load(signedBuffer);
  expect(signedPdf.getPageCount()).toBe(1);

  // Switch to Sanitize PDF
  await page.getByRole('button', { name: /Sanitize & Strip Metadata/i }).click();
  await page.locator('#picker').setInputFiles({ name: 'contract.pdf', mimeType: 'application/pdf', buffer });
  await page.getByRole('button', { name: 'Sanitize PDF' }).click();
  const sanitizedBuffer = await result(page, 'sanitized.pdf');
  const sanitizedPdf = await PDFDocument.load(sanitizedBuffer);
  expect(sanitizedPdf.getTitle()).toBe('');
  expect(sanitizedPdf.getAuthor()).toBe('');

  // Switch to Redact PDF
  await page.getByRole('button', { name: /Redact & Blackout/i }).click();
  await page.locator('#picker').setInputFiles({ name: 'contract.pdf', mimeType: 'application/pdf', buffer });
  await page.locator('#watermark-text').fill('[REDACTED]');
  await page.getByRole('button', { name: 'Blackout sensitive areas' }).click();
  const redactedBuffer = await result(page, 'redacted.pdf');
  const redactedPdf = await PDFDocument.load(redactedBuffer);
  expect(redactedPdf.getTitle()).toBe('');
});

