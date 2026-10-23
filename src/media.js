import block from './assets/2r/bloque-cilindros-06.webp';
import blockSmall from './assets/2r/bloque-cilindros-06-640.webp';
import headOne from './assets/2r/tapa-rectificada-01.webp';
import headThree from './assets/2r/tapa-rectificada-03.webp';
import headFour from './assets/2r/tapa-terminada-04.webp';
import headFive from './assets/2r/cabezal-terminado-05.webp';
import processTwo from './assets/2r/cepillado-tapa-02.webp';
import processSeven from './assets/2r/cepillado-tapa-07.webp';
import videoOne from './assets/2r/proceso-cepillado-01.mp4';
import videoTwo from './assets/2r/proceso-cepillado-02.mp4';
import posterOne from './assets/2r/proceso-cepillado-01.jpg';
import posterTwo from './assets/2r/proceso-cepillado-02.jpg';

// Missing customer files must fail the build rather than silently hide the gallery.
// The AI-edited workshop-background image is intentionally not included.
export const heroPhoto = { url: '/file_000000004b04820ead1217610fcb4e60.png', small: '/file_000000004b04820ead1217610fcb4e60.png', width: 1536, height: 1152 };
export const servicePhoto = { url: headFive, width: 1250, height: 938 };
export const aboutPhoto = { url: headThree, width: 1050, height: 1400 };
export const photos = [
  { url: block, title: 'Bloque de motor', alt: 'Bloque de cuatro cilindros sobre una mesa de trabajo en 2R', width: 1250, height: 938, layout: 'wide' },
  { url: headOne, title: 'Superficie de la tapa', alt: 'Vista completa de una tapa de motor sobre la mesa de una máquina', width: 1050, height: 1400, layout: 'portrait' },
  { url: headThree, title: 'Cada detalle, de cerca', alt: 'Tapa de motor vista en diagonal sobre una máquina del taller', width: 1050, height: 1400, layout: 'portrait' },
  { url: headFour, title: 'Componentes del motor', alt: 'Tapa de motor apoyada sobre una mesa, con sus cámaras a la vista', width: 1250, height: 938, layout: 'wide' },
  { url: processTwo, title: 'En la máquina', alt: 'Tapa de motor colocada bajo el cabezal de una máquina', width: 709, height: 1273, layout: 'portrait' },
  { url: processSeven, title: 'Trabajo en el taller', alt: 'Vista completa de una tapa de motor montada en la maquinaria de 2R', width: 709, height: 1250, layout: 'portrait' },
  { url: headFive, title: 'Cámaras y válvulas', alt: 'Detalle de las cámaras y válvulas de una tapa de motor', width: 1250, height: 938, layout: 'wide' }
];
export const videos = [
  { url: videoOne, poster: posterOne, title: 'Trabajo sobre un bloque', width: 480, height: 854, duration: '0:06' },
  { url: videoTwo, poster: posterTwo, title: 'Los cilindros, de cerca', width: 854, height: 480, duration: '0:03' }
];
