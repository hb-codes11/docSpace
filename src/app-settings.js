export function bindTheme(select, onChange) {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  try {
    const saved = localStorage.getItem('docspace-theme');
    if (['system', 'light', 'dark'].includes(saved)) select.value = saved;
  } catch {
    // Theme selection still works when storage is unavailable.
  }
  const apply = () => {
    const dark = select.value === 'dark' || (select.value === 'system' && system.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#121b27' : '#f3f6fa';
    onChange(dark);
  };
  select.onchange = () => {
    try { localStorage.setItem('docspace-theme', select.value); } catch { /* Session only. */ }
    apply();
  };
  system.addEventListener('change', apply);
  apply();
}

export function bindInstall(button, help) {
  const standalone = matchMedia('(display-mode: standalone)');
  let prompt;
  function update() {
    button.hidden = standalone.matches || navigator.standalone === true;
  }
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    prompt = event;
    update();
  });
  window.addEventListener('appinstalled', () => { prompt = undefined; update(); });
  standalone.addEventListener('change', update);
  button.onclick = async () => {
    if (!prompt) {
      help.showModal();
      return;
    }
    const event = prompt;
    prompt = undefined;
    try { await event.prompt(); } catch { help.showModal(); }
  };
  update();
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(error => console.warn('Offline setup failed', error));
    });
  }
}
