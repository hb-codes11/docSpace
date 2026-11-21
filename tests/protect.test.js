import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { sanitizePdf, signPdf, redactPdf } from '../src/protect.js';
import { checkClientRateLimit, resetClientRateLimit } from '../src/rate-limiter.js';

test('sanitizePdf strips metadata, author, and keywords', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([400, 400]);
  pdf.setTitle('Confidential Quarterly Results');
  pdf.setAuthor('John Doe');
  pdf.setKeywords(['internal', 'restricted']);

  const sanitizedBytes = await sanitizePdf(pdf);
  const reloaded = await PDFDocument.load(sanitizedBytes);

  assert.equal(reloaded.getTitle(), '');
  assert.equal(reloaded.getAuthor(), '');
  assert.deepEqual(reloaded.getKeywords(), '');
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

test('redactPdf applies blackout area and scrubs metadata', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([500, 600]);
  pdf.setTitle('Top Secret Government Report');

  const redactedBytes = await redactPdf(pdf, '1', '[CLASSIFIED]');
  const reloaded = await PDFDocument.load(redactedBytes);

  assert.equal(reloaded.getTitle(), '');
  assert.equal(reloaded.getPageCount(), 1);
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
