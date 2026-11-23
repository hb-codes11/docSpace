import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { MotionConfig } from 'motion/react';
import TechText from './react-bits/TechText.jsx';
import FuseButton from './react-bits/FuseButton.jsx';
import JellyRadio from './react-bits/JellyRadio.jsx';
import { icons, iconMarkup } from '../icons.js';
import sun from 'lucide-static/icons/sun.svg?raw';
import moon from 'lucide-static/icons/moon.svg?raw';
import monitor from 'lucide-static/icons/monitor.svg?raw';
import './interactions.css';

function Icon({ svg }) {
  return <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconMarkup(svg) }} />;
}

function useTheme(select) {
  const read = () => ({ preference: select.value, dark: document.documentElement.dataset.theme === 'dark' });
  const [theme, setTheme] = useState(read);
  useEffect(() => {
    const sync = () => setTheme(read());
    select.addEventListener('change', sync);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      select.removeEventListener('change', sync);
      observer.disconnect();
    };
  }, [select]);
  return theme;
}

function ThemeControl({ select }) {
  const { preference, dark } = useTheme(select);
  const choose = value => {
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  };
  return (
    <div className="theme-control" role="group" aria-label="Appearance">
      <div className="theme-pill" data-dark={dark}>
        <span className="theme-thumb" aria-hidden="true" />
        <button type="button" aria-label="Light theme" title="Light theme" aria-pressed={!dark} onClick={() => choose('light')}>
          <Icon svg={sun} />
        </button>
        <button type="button" aria-label="Dark theme" title="Dark theme" aria-pressed={dark} onClick={() => choose('dark')}>
          <Icon svg={moon} />
        </button>
      </div>
      <button className="theme-system" type="button" aria-label="Use device theme" title="Follow device theme" aria-pressed={preference === 'system'} onClick={() => choose('system')}>
        <Icon svg={monitor} />
      </button>
    </div>
  );
}

function Wordmark({ select }) {
  const { dark } = useTheme(select);
  return (
    <TechText text="docSpace" fontFamily="Bricolage Grotesque" fontWeight={600} fontSize={116}
      letterSpacing={-0.04} align="left" color="currentColor" accentColor={dark ? '#a5c0ff' : '#235cda'}
      labels={false} guides={false} specks={0} sweep={false} reach={140} draggable bounce={0.2} />
  );
}

function ImageFormat({ select, disabled }) {
  const [value, setValue] = useState(select.value);
  useEffect(() => {
    const sync = () => setValue(select.value);
    select.addEventListener('change', sync);
    return () => select.removeEventListener('change', sync);
  }, [select]);
  return (
    <JellyRadio ariaLabel="Image format" items={[{ value: 'image/png', label: 'PNG' }, { value: 'image/jpeg', label: 'JPG' }]}
      value={value} disabled={disabled} size="lg" radius={10} gap={12} swell={0.08} barge={3} jelly={0.4} bounce={0.15}
      chipColor="var(--surface-raised)" activeColor="var(--accent)" textColor="var(--muted)" activeTextColor="var(--on-accent)"
      onChange={next => {
        select.value = next;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }} />
  );
}

export function mountInteractions({ themeSelect, imageSelect, clearFiles, undoClear, expireClear }) {
  const theme = createRoot(document.getElementById('theme-controls'));
  const wordmark = createRoot(document.getElementById('hero-wordmark'));
  const format = createRoot(document.getElementById('image-format-control'));
  const clear = createRoot(document.getElementById('clear-files-control'));
  flushSync(() => {
    theme.render(<MotionConfig reducedMotion="user"><ThemeControl select={themeSelect} /></MotionConfig>);
    wordmark.render(<Wordmark select={themeSelect} />);
  });
  return {
    update({ busy, canClear, resetKey }) {
      format.render(<MotionConfig reducedMotion="user"><ImageFormat select={imageSelect} disabled={busy} /></MotionConfig>);
      clear.render(
        <FuseButton key={resetKey} label="Clear files" undoLabel="Undo clear" doneLabel="Files cleared" radius={8}
          icon={<Icon svg={icons.remove} />} color="var(--muted)" background="var(--surface-raised)" fuseColor="var(--accent)"
          undoWindow={8000} pauseOnHover disabled={busy || !canClear}
          onCommit={clearFiles} onUndo={undoClear} onFuseEnd={expireClear} />
      );
    },
  };
}
