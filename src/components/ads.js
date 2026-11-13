// src/components/ads.js - Clean, policy-compliant Google AdSense placement manager

const env = import.meta.env;
const clientId = /^ca-pub-\d+$/.test(env.VITE_ADSENSE_CLIENT_ID ?? '') ? env.VITE_ADSENSE_CLIENT_ID : '';
const slotTop = env.VITE_ADSENSE_SLOT_TOP;
const slotBottom = env.VITE_ADSENSE_SLOT_BOTTOM;

let adsLoaded = false;

export function initAdSense() {
  if (!clientId || adsLoaded) return;
  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    adsLoaded = true;
  } catch {
    // Fail silently
  }
}

export function renderAdSlot({ position = 'top', slotId = slotTop, format = 'auto' } = {}) {
  if (!clientId || !/^\d+$/.test(slotId ?? '')) return '';

  return `
    <div class="ad-container ad-${position}" aria-label="Advertisement">
      <span class="ad-badge">Advertisement</span>
      <div class="ad-wrapper">
        <ins class="adsbygoogle" style="display:block"
             data-ad-client="${clientId}" data-ad-slot="${slotId}"
             data-ad-format="${format}" data-full-width-responsive="true"></ins>
      </div>
    </div>
  `;
}

export function pushAds() {
  if (!clientId) return;
  try {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    }
  } catch {
    // Ad blocker or script not ready
  }
}

