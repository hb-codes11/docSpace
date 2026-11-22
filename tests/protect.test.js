import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument, PDFName, PDFString } from 'pdf-lib';
import { sanitizePdf, signPdf } from '../src/protect.js';
import { checkClientRateLimit, resetClientRateLimit } from '../src/rate-limiter.js';

test('sanitizePdf strips metadata, author, and keywords', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([400, 400]);
  pdf.setTitle('Confidential Quarterly Results');
  pdf.setAuthor('John Doe');
  pdf.setKeywords(['internal', 'restricted']);

  pdf.context.lookup(pdf.context.trailerInfo.Info).set(PDFName.of('InternalOwner'), PDFString.of('Private customer'));
  const xmp = pdf.context.register(pdf.context.stream('<private>Owner</private>'));
  pdf.catalog.set(PDFName.of('Metadata'), xmp);
  const sanitizedBytes = await sanitizePdf(pdf);
  const reloaded = await PDFDocument.load(sanitizedBytes, { updateMetadata: false });

  assert.equal(reloaded.context.trailerInfo.Info, undefined);
  assert.equal(reloaded.getTitle(), undefined);
  assert.equal(reloaded.getAuthor(), undefined);
  assert.equal(reloaded.getKeywords(), undefined);
  assert.equal(reloaded.context.lookup(reloaded.context.trailerInfo.Info).has(PDFName.of('InternalOwner')), false);
  assert.equal(reloaded.catalog.has(PDFName.of('Metadata')), false);
});

test('signPdf embeds handwritten signature on specified page', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([500, 700]);
  pdf.addPage([500, 700]);

  // Valid 1x1 black pixel PNG data URL
  const testPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  
  const signedBytes = await signPdf(pdf, testPng, 1, 'bottom-right');
  assert(signedBytes.byteLength > 0);

  const reloaded = await PDFDocument.load(signedBytes);
  assert.equal(reloaded.getPageCount(), 2);
});

test('signPdf rejects empty or malformed signature data URL', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([400, 400]);

  await assert.rejects(signPdf(pdf, 'invalid-signature-url', 0), /valid handwritten signature/);
});

test('signPdf rejects out-of-range pages instead of signing another page', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([400, 400]);
  for (const index of [-1, 1, 1.5, NaN]) {
    await assert.rejects(signPdf(pdf, 'unused', index), /Choose a page from 1 to 1/);
  }
});

test('checkClientRateLimit allows operations under quota and halts bursts', () => {
  resetClientRateLimit();
  
  for (let i = 0; i < 35; i++) {
    const status = checkClientRateLimit();
    assert(typeof status.remaining === 'number');
  }

  // 36th operation in burst should be rate-limited
  assert.throws(() => checkClientRateLimit(), /Rate limit exceeded/);

  resetClientRateLimit();
});
