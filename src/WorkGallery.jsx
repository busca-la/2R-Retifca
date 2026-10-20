import React from 'react';
import { ArrowUpRight, Play, Images } from 'lucide-react';
import './WorkGallery.css';

// Vite loads the actual customer-provided media files when they exist in this folder.
// Until files are added, the component stays hidden rather than showing broken photos.
const imageFiles = import.meta.glob('./assets/2r/*.webp', {
  eager: true,
  query: '?url',
  import: 'default'
});
const videoFiles = import.meta.glob('./assets/2r/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default'
});
const posterFiles = import.meta.glob('./assets/2r/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default'
});

const entries = [
  {
    file: 'hero-bloque-2r.webp',
    title: 'BLOQUE DE MOTOR',
    description: 'Bloque de cuatro cilindros en ambiente de taller',
    layout: 'landscape'
  },
  {
    file: 'tapa-rectificada-01.webp',
    title: 'TRABAJO EN TAPA DE MOTOR',
    description: 'Superficie y componentes de una tapa de motor',
    layout: 'portrait'
  },
  {
    file: 'cepillado-tapa-02.webp',
    title: 'CEPILLADO DE TAPA',
    description: 'Proceso de trabajo sobre una tapa de motor',
    layout: 'portrait'
  },
  {
    file: 'tapa-rectificada-03.webp',
    title: 'PRECISIÓN EN CADA DETALLE',
    description: 'Vista de un cabezal trabajado',
    layout: 'portrait'
  },
  {
    file: 'tapa-terminada-04.webp',
    title: 'SUPERFICIES DE MOTOR',
    description: 'Trabajo sobre componentes de motor',
    layout: 'landscape'
  },
  {
    file: 'cabezal-terminado-05.webp',
    title: 'TAPA DE MOTOR',
    description: 'Detalle de cámaras y válvulas',
    layout: 'landscape'
  },
  {
    file: 'bloque-cilindros-06.webp',
    title: 'BLOQUE DE MOTOR',
    description: 'Vista de los cilindros de un bloque',
    layout: 'landscape'
  },
  {
    file: 'cepillado-tapa-07.webp',
    title: 'MECANIZADO DE TAPA',
    description: 'Tapa de motor montada en maquinaria',
    layout: 'portrait'
  }
];
const videos = [
  { file: 'proceso-cepillado-01.mp4', poster: 'proceso-cepillado-01.jpg', label: 'PROCESO / 01' },
  { file: 'proceso-cepillado-02.mp4', poster: 'proceso-cepillado-02.jpg', label: 'BLOQUE DE MOTOR / 02' }
];

export default function WorkGallery() {
  const photos = entries.map((entry) => ({
    ...entry, url: imageFiles['./assets/2r/' + entry.file]
  })).filter((entry) => Boolean(entry.url));
  const actualVideos = videos.map((entry) => ({
    ...entry,
    url: videoFiles['./assets/2r/' + entry.file],
    posterUrl: posterFiles['./assets/2r/' + entry.poster]
  })).filter((entry) => Boolean(entry.url));

  if (!photos.length && !actualVideos.length) return null;

  return (
    <section className="work-section" id="trabajos" aria-labelledby="work-heading">
      <div className="site-container">
        <div className="work-heading">
          <div>
            <p className="work-eyebrow"><span /> NUESTRO TRABAJO / 2R</p>
            <h2 id="work-heading">TRABAJOS<br/><em>REALES.</em></h2>
          </div>
          <p className="work-intro">
            Una mirada a los trabajos y componentes de motor, con fotografías y videos compartidos por 2R.
          </p>
        </div>
        {photos.length > 0 && (
          <div className="work-grid" aria-label="Fotografías de trabajos realizados">
            {photos.map((entry, index) => (
              <figure className={'work-card work-' + entry.layout} key={entry.file}>
                <div className="work-image-wrap">
                  <img src={entry.url} alt={entry.description} loading="lazy" decoding="async" />
                  <span className="work-photo-index">{String(index + 1).padStart(2, '0')} / FOTO REAL</span>
                </div>
                <figcaption><span>{entry.title}</span><ArrowUpRight size={17} aria-hidden="true" /></figcaption>
              </figure>
            ))}
          </div>
        )}
        {actualVideos.length > 0 && (
          <div className="work-video-area">
            <div className="work-video-heading"><Play size={19} aria-hidden="true" /> PROCESOS EN VIDEO <span>{String(actualVideos.length).padStart(2,'0')}</span></div>
            <div className="work-video-grid">
              {actualVideos.map((entry) => (
                <figure key={entry.file} className="work-video-card">
                  <video
                    src={entry.url}
                    controls
                    playsInline
                    preload="none"
                    poster={entry.posterUrl || undefined}
                    aria-label={'Video de trabajo de motor: ' + entry.label}
                  >
                    Tu navegador no puede reproducir el video.
                  </video>
                  <figcaption>{entry.label}<span>RECTIFICADORA 2R</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
        <div className="work-bottom">
          <span><Images size={17} aria-hidden="true" /> IMÁGENES DE TRABAJOS REALES</span>
          <a href="#contacto">CONSULTANOS POR TU MOTOR <ArrowUpRight size={17}/></a>
        </div>
      </div>
    </section>
  );
}
