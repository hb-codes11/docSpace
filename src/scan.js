import { cropSize, pageProjection, validCrop } from './scan-geometry.js';

const MAX_SIDE = 2400;

export async function readScanImage(url) {
  const image = new Image();
  image.src = url;
  await image.decode();
  return image;
}

function surface(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('This browser cannot prepare the scan.');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  return { canvas, context };
}

async function straighten(source, context, corners, signal) {
  if (!validCrop(corners)) throw new Error('Move the corners so the page edges form a rectangle or trapezoid.');
  const { width, height } = source;
  const [w, h] = cropSize(corners, width, height).map(size => Math.max(1, size));
  const output = surface(w, h);
  const pixels = context.getImageData(0, 0, width, height).data;
  const image = output.context.createImageData(w, h);
  const { a, b, c, d, e, f, g, h: k } = pageProjection(corners);
  for (let row = 0; row < h; row++) {
    if (row % 96 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
      signal.throwIfAborted();
    }
    const v = (row + .5) / h;
    for (let col = 0; col < w; col++) {
      const u = (col + .5) / w;
      const z = g * u + k * v + 1;
      const x = Math.min(width - 1, Math.max(0, (a * u + b * v + c) / z * width - .5));
      const y = Math.min(height - 1, Math.max(0, (d * u + e * v + f) / z * height - .5));
      const x0 = Math.floor(x), y0 = Math.floor(y);
      const right = Math.min(x0 + 1, width - 1);
      const bottom = Math.min(y0 + 1, height - 1);
      const blendX = x - x0, blendY = y - y0;
      const dest = (row * w + col) * 4;
      for (let channel = 0; channel < 3; channel++) {
        const top = pixels[(y0 * width + x0) * 4 + channel] * (1 - blendX)
          + pixels[(y0 * width + right) * 4 + channel] * blendX;
        const lower = pixels[(bottom * width + x0) * 4 + channel] * (1 - blendX)
          + pixels[(bottom * width + right) * 4 + channel] * blendX;
        image.data[dest + channel] = top * (1 - blendY) + lower * blendY;
      }
      image.data[dest + 3] = 255;
    }
  }
  output.context.putImageData(image, 0, 0);
  return output;
}

export async function renderScan(image, edit, grayscale, signal, maxSide = MAX_SIDE) {
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const source = surface(Math.round(image.naturalWidth * scale), Math.round(image.naturalHeight * scale));
  source.context.drawImage(image, 0, 0, source.canvas.width, source.canvas.height);
  let page = source;
  try {
    if (edit?.corners) page = await straighten(source.canvas, source.context, edit.corners, signal);
    const angle = edit?.rotation ?? 0;
    if (angle) {
      const { width, height } = page.canvas;
      const turned = angle % 180 !== 0;
      const rotated = surface(turned ? height : width, turned ? width : height);
      rotated.context.translate(rotated.canvas.width / 2, rotated.canvas.height / 2);
      rotated.context.rotate(angle * Math.PI / 180);
      rotated.context.drawImage(page.canvas, -width / 2, -height / 2);
      page.canvas.width = page.canvas.height = 0;
      page = rotated;
    }
    if (grayscale) {
      const pixels = page.context.getImageData(0, 0, page.canvas.width, page.canvas.height);
      for (let i = 0; i < pixels.data.length; i += 4) {
        const shade = .213 * pixels.data[i] + .715 * pixels.data[i + 1] + .072 * pixels.data[i + 2];
        pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = shade;
      }
      page.context.putImageData(pixels, 0, 0);
    }
    return page.canvas;
  } catch (error) {
    page.canvas.width = page.canvas.height = 0;
    throw error;
  } finally {
    if (page !== source) source.canvas.width = source.canvas.height = 0;
  }
}

export async function prepareScanPages(files, edits, grayscale, signal, onPage) {
  const pages = [];
  for (const [index, file] of files.entries()) {
    signal.throwIfAborted();
    onPage(index + 1);
    const url = URL.createObjectURL(file);
    let canvas;
    try {
      let image;
      try {
        image = await readScanImage(url);
      } catch {
        throw new Error('Page ' + (index + 1) + ' could not open. Retake the photo or choose a JPG or PNG.');
      }
      signal.throwIfAborted();
      canvas = await renderScan(image, edits[index], grayscale, signal);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .9));
      if (blob?.type !== 'image/jpeg') throw new Error('Could not prepare page ' + (index + 1) + '.');
      pages.push(blob);
    } finally {
      URL.revokeObjectURL(url);
      if (canvas) canvas.width = canvas.height = 0;
    }
  }
  signal.throwIfAborted();
  return pages;
}
