const MAX_SIDE = 2400;

export async function prepareScanPages(files, grayscale, signal) {
  const pages = [];
  for (const [index, file] of files.entries()) {
    signal.throwIfAborted();
    const url = URL.createObjectURL(file);
    const image = new Image();
    const canvas = document.createElement('canvas');
    try {
      image.src = url;
      try {
        await image.decode();
      } catch {
        throw new Error('Page ' + (index + 1) + ' could not open. Retake the photo or choose a JPG or PNG.');
      }
      signal.throwIfAborted();
      const scale = Math.min(1, MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d', { alpha: false });
      if (!context) throw new Error('This browser cannot prepare the scan.');
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      if (grayscale) {
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < pixels.data.length; i += 4) {
          const shade = .213 * pixels.data[i] + .715 * pixels.data[i + 1] + .072 * pixels.data[i + 2];
          pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = shade;
        }
        context.putImageData(pixels, 0, 0);
      }
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .9));
      if (!blob || blob.type !== 'image/jpeg') throw new Error('Could not prepare page ' + (index + 1) + '.');
      pages.push(blob);
    } finally {
      URL.revokeObjectURL(url);
      canvas.width = canvas.height = 0;
    }
  }
  signal.throwIfAborted();
  return pages;
}
