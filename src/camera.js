const MAX_CAPTURE_SIDE = 2400;

async function captureFrame(video) {
  const scale = Math.min(1, MAX_CAPTURE_SIDE / Math.max(video.videoWidth, video.videoHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
  canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
  try {
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Camera capture unavailable');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .93));
  } finally {
    canvas.width = canvas.height = 0;
  }
}

export function bindCamera({ dialog, openButton, devicePicker, galleryPicker, addPhoto }) {
  const video = dialog.querySelector('video');
  const stage = dialog.querySelector('.camera-stage');
  const shutter = dialog.querySelector('#capture-frame');
  const status = dialog.querySelector('#camera-status');
  const count = dialog.querySelector('#camera-page-count');
  let session;
  let receivedPhoto = false;

  function releaseCamera() {
    if (!session) return;
    const { stream } = session;
    session = undefined;
    stream?.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    stage.hidden = true;
    shutter.disabled = true;
  }

  function unavailable(message) {
    releaseCamera();
    status.textContent = message;
  }

  function updateCount(total) {
    count.textContent = total ? total + (total === 1 ? ' page added' : ' pages added') : '';
  }

  function acceptPhoto(photo) {
    if (!photo?.size) {
      status.textContent = 'No photo was captured. Try again or choose a photo.';
      return;
    }
    const total = addPhoto(photo);
    if (total === false) {
      status.textContent = 'The scan is full. You can keep up to 50 photos and 100 MB per scan.';
      return;
    }
    if (total) {
      updateCount(total);
      status.textContent = session?.stream ? 'Page added. Capture another page or select Done.' : 'Page added. Use the device camera again or select Done.';
    }
  }

  openButton.onclick = async () => {
    if (dialog.open) return;
    releaseCamera();
    const current = { stream: null, capturing: false };
    session = current;
    updateCount(0);
    shutter.disabled = true;
    stage.hidden = true;
    status.textContent = 'Starting the camera…';
    dialog.showModal();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1440 } },
      });
      if (!dialog.open || session !== current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      current.stream = stream;
      for (const track of stream.getVideoTracks()) {
        track.addEventListener('ended', () => {
          if (session === current) unavailable('The camera stopped. Use the device camera or choose a photo.');
        }, { once: true });
      }
      video.srcObject = stream;
      stage.hidden = false;
      await video.play();
      if (session === current && dialog.open) ready();
    } catch {
      if (session === current && dialog.open) {
        unavailable('Live camera unavailable. Check your camera permission, or use the device camera or photo library.');
      }
    }
  };

  function ready() {
    if (!dialog.open || !session?.stream || session.capturing || !video.videoWidth || video.readyState < 2) return;
    stage.style.setProperty('--camera-ratio', video.videoWidth / video.videoHeight);
    shutter.disabled = false;
    if (status.textContent === 'Starting the camera…') status.textContent = 'Fit the full page in the frame, then take a photo.';
  }
  video.addEventListener('loadeddata', ready);
  video.addEventListener('resize', ready);

  shutter.onclick = async () => {
    const current = session;
    if (!current || current.capturing || !video.videoWidth || video.readyState < 2) return;
    current.capturing = true;
    shutter.disabled = true;
    try {
      const blob = await captureFrame(video);
      if (session === current && dialog.open) {
        acceptPhoto(blob && new File([blob], 'Scan ' + new Date().toISOString().replace(/[:.]/g, '-') + '.jpg', { type: blob.type }));
      }
    } catch {
      if (session === current && dialog.open) acceptPhoto(null);
    } finally {
      current.capturing = false;
      if (session === current) ready();
    }
  };

  devicePicker.onclick = () => {
    devicePicker.value = '';
    receivedPhoto = false;
    unavailable('Confirm the photo in your camera app to add it here.');
  };
  const receivePhoto = () => {
    if (!dialog.open || receivedPhoto || !devicePicker.files.length) return;
    receivedPhoto = true;
    acceptPhoto(devicePicker.files[0]);
  };
  devicePicker.addEventListener('input', receivePhoto);
  devicePicker.addEventListener('change', receivePhoto);
  dialog.querySelector('#camera-gallery').onclick = () => {
    releaseCamera();
    dialog.close();
    galleryPicker.click();
  };
  dialog.addEventListener('close', () => {
    if (!dialog.open) {
      releaseCamera();
      devicePicker.value = '';
    }
  });
  window.addEventListener('pagehide', () => {
    releaseCamera();
    if (dialog.open) dialog.close();
  });
}
