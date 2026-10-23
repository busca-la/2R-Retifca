import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, Play, X } from 'lucide-react';
import { photos, videos } from './media';
import { whatsappUrl } from './siteData';
import './WorkGallery.css';

export default function WorkGallery() {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [playing, setPlaying] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const thumbnails = useRef(null);
  const touchStart = useRef(null);
  const videoElements = useRef([]);
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    modal?.showModal();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      touchStart.current = null;
      modal?.close();
      document.body.style.overflow = originalOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEffect(() => {
    const strip = thumbnails.current;
    const thumbnail = strip?.children[selected];
    if (thumbnail) strip.scrollLeft = thumbnail.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumbnail.offsetWidth) / 2;
  }, [selected]);
  const movePhoto = direction => setSelected(index => (index + direction + photos.length) % photos.length);
  const onPhotoKey = event => {
    if (event.key === 'Tab') {
      const items = [...event.currentTarget.querySelectorAll('button, a[href]')].filter(element => element.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setSelected(event.key === 'Home' ? 0 : photos.length - 1);
    }
  };
  const startSwipe = event => {
    if (event.pointerType !== 'touch') return;
    touchStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const endSwipe = event => {
    if (!touchStart.current) return;
    const x = event.clientX - touchStart.current.x;
    const y = event.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y) * 1.3) movePhoto(x < 0 ? 1 : -1);
  };
  return <section className="work-section section-space" id="trabajos" aria-labelledby="work-heading">
    <div className="site-container">
      <div className="work-heading reveal"><div><p className="section-label"><span className="label-dash" aria-hidden="true" />02 / TRABAJOS REALES</p><h2 id="work-heading">Nuestro trabajo.<br /><em>De cerca.</em></h2></div></div>
      <div className={"work-grid " + (showAll ? "work-grid-expanded" : "work-grid-compact")}>
        {photos.slice(0, showAll ? photos.length : 4).map((entry, index) => <figure className={'work-card reveal work-' + entry.layout} key={entry.url}>
          <button className="work-image-button" type="button" aria-label={'Ampliar foto: ' + entry.title} onClick={event => { opener.current = event.currentTarget; setSelected(index); }}>
            <img src={entry.url} alt={entry.alt} width={entry.width} height={entry.height} loading="lazy" decoding="async" />
            <span className="work-expand"><Expand size={18} aria-hidden="true" /><span>Ampliar</span></span>
          </button>
          <figcaption><span>{entry.title}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
        </figure>)}
      </div>
      <div className="work-show-controls">
        <button type="button" className="work-toggle" aria-expanded={showAll} onClick={() => setShowAll(value => !value)}>{showAll ? 'VER MENOS FOTOS' : 'VER TODAS LAS FOTOS'} <ArrowUpRight size={17} aria-hidden="true" /></button>
        <button type="button" className="work-toggle" aria-expanded={showVideos} onClick={() => setShowVideos(value => !value)}>{showVideos ? 'OCULTAR VIDEOS' : 'VER VIDEOS DEL TALLER'} <Play size={16} aria-hidden="true" /></button>
      </div>
      {showVideos && <div className="work-video-area" id="procesos">
        <div className="work-video-heading"><div><p className="section-label"><Play size={15} aria-hidden="true" />EN EL TALLER</p><h3>Videos del taller.</h3></div></div>
        <div className="work-video-grid">
          {videos.map((entry, index) => <figure className={'work-video-card reveal' + (entry.height > entry.width ? ' video-portrait' : '') + (playing === index ? ' is-playing' : '')} key={entry.url}>
            <video ref={element => { videoElements.current[index] = element; }} src={entry.url} controls playsInline preload="none" poster={entry.poster} width={entry.width} height={entry.height} aria-label={entry.title}
              onPlay={event => videoElements.current.forEach(video => { if (video && video !== event.currentTarget) video.pause(); })}
              onPlaying={() => setPlaying(index)}
              onPause={() => setPlaying(current => current === index ? null : current)}
              onEnded={() => setPlaying(current => current === index ? null : current)}>
              <p>Tu navegador no puede reproducir el video. <a href={entry.url}>Abrir video</a>.</p>
            </video>
            <figcaption><span><small>PROCESO {String(index + 1).padStart(2, '0')}</small>{entry.title}</span><span className="video-state" aria-live="polite">{playing === index ? 'Reproduciendo' : entry.duration}</span></figcaption>
          </figure>)}
        </div>
      </div>}
    </div>
    {isOpen && <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-dialog-title" aria-describedby="photo-dialog-help" onKeyDown={onPhotoKey} onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="photo-dialog-inner">
        <div className="photo-dialog-top"><span>TRABAJOS REALES / 2R</span><button className="photo-dialog-close" type="button" autoFocus aria-label="Cerrar fotografía" onClick={() => setSelected(null)}><X size={24} aria-hidden="true" /></button></div>
        <div className="photo-dialog-stage" onPointerDown={startSwipe} onPointerUp={endSwipe} onPointerCancel={() => { touchStart.current = null; }}>
          <img src={photos[selected].url} alt={photos[selected].alt} width={photos[selected].width} height={photos[selected].height} draggable="false" />
        </div>
        <div className="photo-dialog-caption">
          <p id="photo-dialog-title" aria-live="polite" aria-atomic="true">{photos[selected].title}<span>{String(selected + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span></p>
          <div className="photo-dialog-controls" role="group" aria-label="Navegar fotografías">
            <button type="button" aria-label="Fotografía anterior" onClick={() => movePhoto(-1)}><ChevronLeft size={22} aria-hidden="true" /></button>
            <button type="button" aria-label="Fotografía siguiente" onClick={() => movePhoto(1)}><ChevronRight size={22} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="photo-thumbnails" ref={thumbnails} role="group" aria-label="Todas las fotografías">
          {photos.map((photo, index) => <button type="button" key={photo.url} aria-label={'Ver fotografía ' + (index + 1) + ': ' + photo.title} aria-pressed={selected === index} onClick={() => setSelected(index)}><img src={photo.url} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" /></button>)}
        </div>
        <div className="photo-dialog-bottom"><p id="photo-dialog-help">Usá las flechas o deslizá para ver más.</p><a className="text-link" href={whatsappUrl('Hola, 2R. Estoy viendo la fotografía «' + photos[selected].title + '». Quisiera hacer una consulta sobre mi motor o componente: ')}>CONSULTAR ESTE TRABAJO <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </div>
    </dialog>}
  </section>;
}
