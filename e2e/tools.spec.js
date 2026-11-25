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
  const workerPolicy = page.waitForResponse(response => /\/assets\/processor-[\w-]+\.js$/.test(response.url()));
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
  expect((await workerPolicy).headers()['content-security-policy']).toContain("connect-src 'none'");
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
  await expect(page.locator('#status')).toContainText('no selectable text');
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
  const workerPolicy = page.waitForResponse(response => /\/assets\/pdf\.worker\.min-[\w-]+\.mjs$/.test(response.url()));
  await page.goto('/');
  await page.getByRole('button', { name: /PDF to images/ }).click();
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210, 220], 'An image'));
  await page.getByRole('button', { name: 'Page 2', exact: true }).click();
  await expect(page.getByLabel('Pages to keep')).toHaveValue('2');
  expect((await workerPolicy).headers()['content-security-policy']).toContain("connect-src 'none'");
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
  await page.getByRole('button', { name: 'Open camera', exact: true }).click();
  await page.locator('#camera-picker').setInputFiles({ name: 'camera.png', mimeType: 'image/png', buffer: image });
  await expect(page.locator('#camera-page-count')).toHaveText('1 page added');
  await page.getByRole('button', { name: 'Done', exact: true }).click();
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
  await page.getByRole('button', { name: 'Light theme', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Use device theme', exact: true }).click();
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
  const firstCorner = dialog.getByRole('button', { name: 'Top left corner' });
  await firstCorner.waitFor();
  const handle = await firstCorner.boundingBox();
  expect(handle.width).toBeGreaterThanOrEqual(44);
  const initialCorner = await firstCorner.getAttribute('style');
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(handle.x + handle.width / 2 + 24, handle.y + handle.height / 2 + 24);
  await page.mouse.up();
  expect(await firstCorner.getAttribute('style')).not.toBe(initialCorner);
  await dialog.getByRole('button', { name: 'Reset', exact: true }).click();
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
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/#/sign-pdf');
  await expect(page.locator('#sign-options')).toBeHidden();

  const doc = await PDFDocument.create();
  const sourcePage = doc.addPage([500, 500]);
  sourcePage.drawText('CONFIDENTIAL-ACCOUNT-12345', { x: 50, y: 440, size: 12 });
  sourcePage.drawText('Public report', { x: 50, y: 300, size: 12 });
  doc.setTitle('Confidential Financial Agreement');
  doc.setAuthor('Internal Executive');
  const buffer = Buffer.from(await doc.save());

  await page.locator('#picker').setInputFiles({ name: 'contract.pdf', mimeType: 'application/pdf', buffer });
  await expect(page.locator('#sign-options')).toBeVisible();

  // Try to sign without drawing
  await page.getByRole('button', { name: 'Apply signature' }).click();
  await expect(page.locator('#status')).toContainText('Please draw your signature');

  await expect(page.locator('#signature-pad')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  // Scroll the actual drawing surface into view before using viewport coordinates.
  await page.locator('#signature-pad').scrollIntoViewIfNeeded();
  const box = await page.locator('#signature-pad').boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.down();
  await page.mouse.move(box.x + 100, box.y + 80);
  await page.mouse.up();

  await page.getByLabel('Page number', { exact: true }).fill('2');
  await page.getByRole('button', { name: 'Apply signature' }).click();
  await expect(page.locator('#status')).toContainText('Choose a page from 1 to 1');
  await page.getByLabel('Page number', { exact: true }).fill('1');

  // Apply signature
  await page.getByRole('button', { name: 'Apply signature' }).click();
  const signedBuffer = await result(page, 'signed.pdf');
  const signedPdf = await PDFDocument.load(signedBuffer);
  expect(signedPdf.getPageCount()).toBe(1);

  await page.locator('#picker').setInputFiles({ name: 'different-contract.pdf', mimeType: 'application/pdf', buffer });
  await page.getByRole('button', { name: 'Apply signature' }).click();
  await expect(page.locator('#status')).toContainText('Please draw your signature');

  // Switch to Sanitize PDF
  await page.getByRole('button', { name: /Sanitize & Strip Metadata/i }).click();
  await page.locator('#picker').setInputFiles({ name: 'contract.pdf', mimeType: 'application/pdf', buffer });
  await page.getByRole('button', { name: 'Sanitize PDF' }).click();
  const sanitizedBuffer = await result(page, 'sanitized.pdf');
  const sanitizedPdf = await PDFDocument.load(sanitizedBuffer, { updateMetadata: false });
  expect(sanitizedPdf.getTitle()).toBeUndefined();
  expect(sanitizedPdf.getAuthor()).toBeUndefined();

  // Switch to Redact PDF
  await page.getByRole('button', { name: /Redact & Blackout/i }).click();
  await page.locator('#picker').setInputFiles({ name: 'contract.pdf', mimeType: 'application/pdf', buffer });
  await page.locator('#watermark-text').fill('[REDACTED]');
  await page.getByRole('button', { name: 'Blackout sensitive areas' }).click();
  const redactedBuffer = await result(page, 'redacted.pdf');
  const redactedPdf = await PDFDocument.load(redactedBuffer, { updateMetadata: false });
  expect(redactedPdf.getTitle()).toBeUndefined();
  const renderingModule = await page.evaluate(() => performance.getEntriesByType('resource').find(entry => /\/view-pdf-[^/]+\.js/.test(entry.name)).name);
  const inspected = await page.evaluate(async ({ moduleUrl, data }) => {
    const { withPdf, pageImage } = await import(moduleUrl);
    const signal = new AbortController().signal;
    return withPdf(new Uint8Array(data), signal, async pdf => {
      const pdfPage = await pdf.getPage(1);
      const text = await pdfPage.getTextContent();
      const blob = await pageImage(pdf, 0, 500, signal);
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 500;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();
      return { text: text.items.map(item => item.str).join(''), coveredPixel: [...ctx.getImageData(55, 55, 1, 1).data] };
    });
  }, { moduleUrl: renderingModule, data: [...redactedBuffer] });
  expect(inspected.text).toBe('');
  expect(inspected.coveredPixel).toEqual([20, 20, 31, 255]);
});


test('keeps every tool reachable with consistent icons on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const toolButtons = page.locator('.tools [data-mode]');
  const modes = await toolButtons.evaluateAll(buttons => buttons.map(button => button.dataset.mode));
  expect(modes).toHaveLength(14);
  for (const mode of modes) {
    const button = page.locator(`[data-mode="${mode}"]`);
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    const bounds = await button.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
    await expect(button.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('#tool-title')).toHaveText(await button.getAttribute('aria-label'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  }
  await page.getByRole('button', { name: 'Install app', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Install docSpace' })).toBeVisible();
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await page.getByRole('link', { name: 'Privacy Policy', exact: true }).click();
  await expect(page.locator('#legal-dialog')).toBeVisible();
  await page.locator('#close-legal').click();
  expect(errors).toEqual([]);
});

test('exports JPG images and recovers from an invalid file and page range', async ({ page }) => {
  await page.goto('/#/pdf-to-images');
  await page.locator('#picker').setInputFiles({ name: 'invalid.pdf', mimeType: 'application/pdf', buffer: Buffer.from('Not a PDF') });
  await page.locator('#process').click();
  await expect(page.locator('#status')).toHaveClass(/error/);
  await expect(page.locator('#save-options')).toBeHidden();
  await page.locator('#picker').setInputFiles(await fixture('valid.pdf', [300], 'JPEG output'));
  await page.getByLabel('Pages to keep').fill('2');
  await page.locator('#process').click();
  await expect(page.locator('#status')).toContainText('within pages');
  await page.getByLabel('Pages to keep').fill('1');
  await page.getByRole('radio', { name: 'JPG', exact: true }).click();
  await page.locator('#process').click();
  await page.getByLabel('Save as').fill('My export.zip.zip');
  const zip = await JSZip.loadAsync(await result(page, 'My export.zip'));
  expect(Object.keys(zip.files)).toEqual(['page-001.jpg']);
  const jpg = await zip.file('page-001.jpg').async('nodebuffer');
  expect([...jpg.subarray(0, 2)]).toEqual([255, 216]);
});

test.describe('cancellation', () => {
  test.use({ serviceWorkers: 'block' });
  test('discards a canceled export and allows a fresh attempt', async ({ page }) => {
    let release;
    let handled;
    const requestHandled = new Promise(resolve => { handled = resolve; });
    const gate = new Promise(resolve => { release = resolve; });
    await page.route('**/assets/pdf-images-*.js', async route => {
      await gate;
      await route.continue();
      handled();
    });
    await page.goto('/#/pdf-to-images');
    await page.locator('#picker').setInputFiles(await fixture('valid.pdf', [300], 'Cancelable'));
    await page.locator('#process').click();
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(page.locator('#status')).toHaveText('Processing canceled.');
    await expect(page.locator('#save-options')).toBeHidden();
    release();
    await requestHandled;
    await page.unroute('**/assets/pdf-images-*.js');
    await page.locator('#process').click();
    await result(page, 'page-images.zip');
  });
});

test('keeps signatures upright and at the displayed bottom right on rotated cropped pages', async ({ page }) => {
  const { degrees } = await import('pdf-lib');
  const source = await PDFDocument.create();
  for (const angle of [0, 90, 180, 270]) {
    const pdfPage = source.addPage([400, 500]);
    pdfPage.setCropBox(20, 30, 340, 420);
    pdfPage.setRotation(degrees(angle));
  }
  let buffer = Buffer.from(await source.save());
  await page.goto('/#/sign-pdf');
  for (let index = 0; index < 4; index++) {
    await page.locator('#picker').setInputFiles({ name: 'rotated.pdf', mimeType: 'application/pdf', buffer });
    await page.locator('#signature-pad').scrollIntoViewIfNeeded();
    const box = await page.locator('#signature-pad').boundingBox();
    await page.mouse.move(box.x + 30, box.y + 40);
    await page.mouse.down();
    await page.mouse.move(box.x + 180, box.y + 100, { steps: 6 });
    await page.mouse.up();
    await page.getByLabel('Page number', { exact: true }).fill(String(index + 1));
    await page.locator('#process').click();
    buffer = await result(page, 'signed.pdf');
  }
  await page.getByRole('button', { name: 'Split PDF', exact: true }).click();
  await page.locator('#picker').setInputFiles({ name: 'signed.pdf', mimeType: 'application/pdf', buffer });
  await expect(page.locator('#page-grid img[src]')).toHaveCount(4);
  const moduleUrl = await page.evaluate(() => performance.getEntriesByType('resource').find(entry => /\/view-pdf-[^/]+\.js/.test(entry.name)).name);
  const inkCounts = await page.evaluate(async ({ moduleUrl, data }) => {
    const { withPdf, pageImage } = await import(moduleUrl);
    const signal = new AbortController().signal;
    return withPdf(new Uint8Array(data), signal, async pdf => {
      const counts = [];
      for (let index = 0; index < 4; index++) {
        const blob = await pageImage(pdf, index, 840, signal);
        const image = await createImageBitmap(blob);
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        image.close();
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let correct = 0;
        let outside = 0;
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            if (pixels[i] > 100 || pixels[i + 1] > 100 || pixels[i + 2] > 100) continue;
            if (x > canvas.width * .35 && y > canvas.height * .55) correct++;
            else outside++;
          }
        }
        counts.push({ correct, outside });
      }
      return counts;
    });
  }, { moduleUrl, data: [...buffer] });
  for (const count of inkCounts) {
    expect(count.correct).toBeGreaterThan(20);
    expect(count.outside).toBe(0);
  }
});

test('shares the renamed result through the browser file-sharing interface', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'canShare', { configurable: true, value: () => true });
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async ({ files }) => {
        window.sharedDocument = { name: files[0].name, type: files[0].type, size: files[0].size };
      },
    });
  });
  await page.goto('/#/split-pdf');
  await page.locator('#picker').setInputFiles(await fixture('source.pdf', [300]));
  await page.locator('#process').click();
  await page.getByLabel('Save as').fill('My notes.pdf');
  await page.getByRole('button', { name: 'Share file', exact: true }).click();
  const shared = await page.evaluate(() => window.sharedDocument);
  expect(shared.name).toBe('My notes.pdf');
  expect(shared.type).toBe('application/pdf');
  expect(shared.size).toBeGreaterThan(0);
});

test('accepts repeated photos through the scanner camera control', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#/scan-document');
  const buffer = await readFile(new URL('../public/icons/icon-192.png', import.meta.url));
  await page.getByRole('button', { name: 'Open camera', exact: true }).click();
  for (let count = 1; count <= 2; count++) {
    const [chooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.getByLabel('Use device camera', { exact: true }).click(),
    ]);
    await chooser.setFiles({ name: 'capture.png', mimeType: 'image/png', buffer });
    await expect(page.locator('#camera-page-count')).toHaveText(count === 1 ? '1 page added' : '2 pages added');
  }
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await page.getByRole('button', { name: 'Create scanned PDF' }).click();
  const pdf = await PDFDocument.load(await result(page, 'scan.pdf'));
  expect(pdf.getPageCount()).toBe(2);
});

test('captures consecutive frames from a live camera stream and releases it', async ({ page, context, browserName }) => {
  if (browserName === 'webkit') await context.grantPermissions(['camera']);
  else await page.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = async ({ audio, video }) => {
      if (audio !== false || video.facingMode.ideal !== 'environment') throw new Error('Unexpected media constraints');
      const source = document.createElement('canvas');
      source.width = 240;
      source.height = 320;
      const ctx = source.getContext('2d');
      const stream = source.captureStream(12);
      window.cameraTestTrack = stream.getVideoTracks()[0];
      let frame = 0;
      const timer = setInterval(() => {
        if (window.cameraTestTrack.readyState === 'ended') return clearInterval(timer);
        ctx.fillStyle = frame++ % 2 ? '#fff' : '#eee';
        ctx.fillRect(0, 0, 240, 320);
        ctx.fillStyle = '#232831';
        ctx.fillRect(35, 60, 170, 15);
      }, 70);
      return stream;
    };
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#/scan-document');
  await page.getByRole('button', { name: 'Open camera' }).click();
  const dialog = page.getByRole('dialog', { name: 'Scan with camera' });
  const shutter = dialog.getByRole('button', { name: 'Take photo', exact: true });
  await shutter.click();
  await dialog.locator('video').evaluate(video => {
    window.capturedTrack = video.srcObject.getVideoTracks()[0];
  });
  await expect(dialog.locator('#camera-page-count')).toHaveText('1 page added');
  await shutter.click();
  await expect(dialog.locator('#camera-page-count')).toHaveText('2 pages added');
  await dialog.getByRole('button', { name: 'Done' }).click();
  await expect.poll(() => page.evaluate(() => window.capturedTrack.readyState)).toBe('ended');
  await expect(page.locator('.scan-thumbnail')).toHaveCount(2);
  await page.getByRole('button', { name: 'Create scanned PDF' }).click();
  expect((await PDFDocument.load(await result(page, 'scan.pdf'))).getPageCount()).toBe(2);
});

test('offers the photo library and device camera if live permission is denied', async ({ page }) => {
  await page.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = async () => { throw new DOMException('Denied', 'NotAllowedError'); };
  });
  await page.goto('/#/scan-document');
  await page.getByRole('button', { name: 'Open camera' }).click();
  const dialog = page.getByRole('dialog', { name: 'Scan with camera' });
  await expect(dialog.getByRole('status')).toContainText('Live camera unavailable');
  await expect(dialog.getByLabel('Use device camera')).toBeVisible();
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    dialog.getByRole('button', { name: 'Choose photos' }).click(),
  ]);
  await chooser.setFiles(new URL('../public/icons/icon-192.png', import.meta.url).pathname);
  await expect(dialog).toBeHidden();
  await expect(page.locator('.scan-thumbnail')).toHaveCount(1);
});

test('reverses and rotates all PDF pages and restores a removed page with undo', async ({ page }) => {
  await page.goto('/#/organize-pdf');
  await page.locator('#picker').setInputFiles(await fixture('pages.pdf', [210, 220, 230]));
  const actions = page.getByRole('group', { name: 'Batch page actions' });
  await expect(actions).toContainText('3 pages');
  await actions.getByRole('button', { name: 'Reverse order' }).click();
  await actions.getByRole('button', { name: 'Rotate all' }).click();
  await page.getByRole('button', { name: 'Remove page 2' }).click();
  await expect(actions).toContainText('2 pages');
  await actions.getByRole('button', { name: 'Undo edit' }).click();
  await expect(actions).toContainText('3 pages');
  await page.locator('#process').click();
  const pdf = await PDFDocument.load(await result(page, 'organized.pdf'));
  expect(pdf.getPages().map(item => [item.getWidth(), item.getRotation().angle])).toEqual([[230, 90], [220, 90], [210, 90]]);
});
