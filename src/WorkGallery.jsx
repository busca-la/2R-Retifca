import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Expand, Play, X } from 'lucide-react';
import { photos, videos } from './media';
import { whatsappUrl } from './siteData';
import './WorkGallery.css';

export default function WorkGallery() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    if (selected === null) return;
    const modal = dialog.current;
    modal?.showModal();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      modal?.close();
      document.body.style.overflow = originalOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);
  return <section className="work-section section-space" id="trabajos" aria-labelledby="work-heading">
    <div className="site-container">
      <div className="work-heading reveal"><div><p className="section-label"><span className="label-dash" aria-hidden="true" />02 / NUESTRO TRABAJO</p><h2 id="work-heading">El trabajo real.<br /><em>De cerca.</em></h2></div><p className="section-intro">Una mirada a las piezas, las superficies y los procesos de Rectificadora 2R.</p></div>
      <div className="work-grid">
        {photos.map((entry, index) => <figure className={'work-card work-' + entry.layout} key={entry.url}>
          <button className="work-image-button" type="button" aria-label={'Ampliar foto: ' + entry.title} onClick={event => { opener.current = event.currentTarget; setSelected(index); }}>
            <img src={entry.url} alt={entry.alt} width={entry.width} height={entry.height} loading="lazy" decoding="async" />
            <span className="work-expand"><Expand size={18} aria-hidden="true" /><span>Ampliar</span></span>
          </button>
          <figcaption><span>{entry.title}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
        </figure>)}
      </div>
      <div className="work-video-area" id="procesos">
        <div className="work-video-heading reveal"><div><p className="section-label"><Play size={15} aria-hidden="true" />EN EL TALLER</p><h3>El proceso, en movimiento.</h3></div><p>Reproducí los videos para ver el trabajo sobre los componentes.</p></div>
        <div className="work-video-grid">
          {videos.map((entry, index) => <figure className={'work-video-card' + (entry.height > entry.width ? ' video-portrait' : '')} key={entry.url}>
            <video src={entry.url} controls playsInline preload="none" poster={entry.poster} width={entry.width} height={entry.height} aria-label={entry.title}>
              <p>Tu navegador no puede reproducir el video. <a href={entry.url}>Abrir video</a>.</p>
            </video>
            <figcaption><span><small>PROCESO {String(index + 1).padStart(2, '0')}</small>{entry.title}</span><span>{entry.duration}</span></figcaption>
          </figure>)}
        </div>
      </div>
      <div className="work-bottom"><p>Contanos qué pieza o motor necesitás consultar.</p><a className="text-link" href={whatsappUrl()}>HACER UNA CONSULTA <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </div>
    {selected !== null && <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-dialog-title" onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="photo-dialog-inner"><button className="photo-dialog-close" type="button" autoFocus aria-label="Cerrar fotografía" onClick={() => setSelected(null)}><X size={24} aria-hidden="true" /></button><img src={photos[selected].url} alt={photos[selected].alt} width={photos[selected].width} height={photos[selected].height} /><p id="photo-dialog-title">{photos[selected].title}</p></div>
    </dialog>}
  </section>;
}
