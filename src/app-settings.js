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
  const nativeButton = help.querySelector('#install-native');
  const feedback = help.querySelector('#install-status');
  const instructions = help.querySelector('#install-instructions');
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const platform = ios ? 'ios' : /Android/i.test(navigator.userAgent) ? 'android' : 'desktop';
  let deferredPrompt;
  let installed = false;
  let prompting = false;

  for (const guide of help.querySelectorAll('[data-install-platform]')) {
    guide.hidden = guide.dataset.installPlatform !== platform;
  }

  function update() {
    button.hidden = installed || standalone.matches || navigator.standalone === true;
    button.disabled = prompting;
    nativeButton.hidden = !deferredPrompt;
    nativeButton.disabled = prompting;
    instructions.hidden = Boolean(deferredPrompt);
    if (button.hidden && help.open) help.close();
  }

  function showHelp(message) {
    feedback.textContent = message || 'Use your browser menu to add docSpace to this device.';
    update();
    if (!button.hidden && !help.open) help.showModal();
  }

  async function install() {
    if (prompting || button.hidden) return;
    if (!deferredPrompt) {
      showHelp();
      return;
    }
    const event = deferredPrompt;
    deferredPrompt = undefined;
    prompting = true;
    update();
    try {
      // Call synchronously from the click handler to preserve browser user activation.
      const choice = await event.prompt();
      if (choice?.outcome === 'accepted' && help.open) help.close();
      if (choice?.outcome === 'dismissed') {
        feedback.textContent = 'You can install docSpace later from your browser menu.';
      }
    } catch {
      showHelp('The install prompt could not open. Use your browser menu to install docSpace.');
    } finally {
      prompting = false;
      update();
    }
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    feedback.textContent = 'docSpace is ready to install on this device.';
    update();
  });
  window.addEventListener('appinstalled', () => {
    installed = true;
    deferredPrompt = undefined;
    prompting = false;
    update();
  });
  standalone.addEventListener('change', update);
  button.onclick = nativeButton.onclick = install;
  update();

  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(error => console.warn('Offline setup failed', error));
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }
}
