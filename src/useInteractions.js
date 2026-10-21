import { useEffect, useRef, useState } from 'react';
import { navigation } from './siteData';

export function useScrollNavigation(header) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = navigation.map(item => ({ href: item.href, element: document.querySelector(item.href) }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      const offset = (header.current?.offsetHeight || 88) + Math.min(150, window.innerHeight * .2);
      let current = '';
      for (const section of sections) {
        if (section.element && section.element.getBoundingClientRect().top <= offset) current = section.href;
      }
      header.current?.style.setProperty('--reading-progress', progress);
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [header]);
  return active;
}

export function usePhotoMotion() {
  const ref = useRef(null);
  useEffect(() => {
    const photo = ref.current;
    if (!photo) return;
    const media = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let bounds = null;
    let x = 0, y = 0;
    const enter = () => { bounds = photo.getBoundingClientRect(); };
    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      bounds = null;
      photo.style.removeProperty('--tilt-x');
      photo.style.removeProperty('--tilt-y');
    };
    const move = event => {
      if (!media.matches || event.pointerType !== 'mouse') return;
      if (!bounds) enter();
      x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      if (!frame) frame = window.requestAnimationFrame(() => {
        frame = 0;
        photo.style.setProperty('--tilt-x', (-y * 1.5).toFixed(2) + 'deg');
        photo.style.setProperty('--tilt-y', (x * 1.5).toFixed(2) + 'deg');
      });
    };
    const configure = () => {
      reset();
      photo.classList.toggle('hero-photo-interactive', media.matches);
    };
    configure();
    photo.addEventListener('pointerenter', enter);
    photo.addEventListener('pointermove', move, { passive: true });
    photo.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    media.addEventListener('change', configure);
    return () => {
      reset();
      photo.classList.remove('hero-photo-interactive');
      photo.removeEventListener('pointerenter', enter);
      photo.removeEventListener('pointermove', move);
      photo.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      media.removeEventListener('change', configure);
    };
  }, []);
  return ref;
}
