import { getDocument, GlobalWorkerOptions, AnnotationMode } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { MAX_PAGES } from './limits.js';

GlobalWorkerOptions.workerSrc = workerUrl;

export async function withPdf(bytes, signal, use) {
  signal.throwIfAborted();
  const task = getDocument({
    data: new Uint8Array(bytes),
    isEvalSupported: false,
    useWasm: false,
    stopAtErrors: true,
  });
  let cleanup;
  const destroy = () => { cleanup ??= task.destroy().catch(() => {}); };
  signal.addEventListener('abort', destroy, { once: true });
  try {
    const pdf = await task.promise;
    if (!pdf.numPages || pdf.numPages > MAX_PAGES) throw new Error('Choose a PDF with 1 to 500 pages.');
    return await use(pdf);
  } finally {
    signal.removeEventListener('abort', destroy);
    destroy();
    await cleanup;
  }
}

export async function pageImage(pdf, index, size, signal, type = 'image/png', quality = .9) {
  signal.throwIfAborted();
  const page = await pdf.getPage(index + 1);
  signal.throwIfAborted();
  const original = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: size / Math.max(original.width, original.height) });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(viewport.width));
  canvas.height = Math.max(1, Math.ceil(viewport.height));
  const task = page.render({ canvas, viewport, annotationMode: AnnotationMode.DISABLE });
  const cancel = () => task.cancel();
  signal.addEventListener('abort', cancel, { once: true });
  try {
    await task.promise;
    return await new Promise((resolve, reject) => {
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not render the page.')), type, quality);
    });
  } finally {
    signal.removeEventListener('abort', cancel);
    canvas.width = canvas.height = 0;
    page.cleanup();
  }
}
