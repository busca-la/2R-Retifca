import heroSmall from './assets/2r/hero-motor-640.webp';
import heroMedium from './assets/2r/hero-motor-960.webp';
import heroFull from './assets/2r/hero-motor-1448.webp';
import heroAvifSmall from './assets/2r/hero-motor-640.avif';
import heroAvifMedium from './assets/2r/hero-motor-960.avif';
import heroAvifFull from './assets/2r/hero-motor-1448.avif';
import block from './assets/2r/bloque-cilindros-06.webp';
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
import blockSmall from './assets/2r/bloque-cilindros-06-480.webp';
import blockMedium from './assets/2r/bloque-cilindros-06-800.webp';
import headOneSmall from './assets/2r/tapa-rectificada-01-480.webp';
import headOneMedium from './assets/2r/tapa-rectificada-01-800.webp';
import headThreeSmall from './assets/2r/tapa-rectificada-03-480.webp';
import headThreeMedium from './assets/2r/tapa-rectificada-03-800.webp';
import headFourSmall from './assets/2r/tapa-terminada-04-480.webp';
import headFourMedium from './assets/2r/tapa-terminada-04-800.webp';
import headFiveSmall from './assets/2r/cabezal-terminado-05-480.webp';
import headFiveMedium from './assets/2r/cabezal-terminado-05-800.webp';
import processTwoSmall from './assets/2r/cepillado-tapa-02-480.webp';
import processSevenSmall from './assets/2r/cepillado-tapa-07-480.webp';

// Missing customer files must fail the build rather than silently hide the gallery.
// Gallery originals remain separate from the supplied hero and its variants.
export const heroPhoto = { url: heroFull, srcSet: `${heroSmall} 640w, ${heroMedium} 960w, ${heroFull} 1448w`, avifSrcSet: `${heroAvifSmall} 640w, ${heroAvifMedium} 960w, ${heroAvifFull} 1448w`, width: 1448, height: 1086 };
export const servicePhoto = { url: headFive, srcSet: `${headFiveSmall} 480w, ${headFiveMedium} 800w, ${headFive} 1250w`, width: 1250, height: 938 };
export const photos = [
  { url: block, title: 'Bloque de motor', alt: 'Bloque de cuatro cilindros sobre una mesa de trabajo en 2R', width: 1250, height: 938, layout: 'wide' },
  { url: headOne, title: 'Superficie de la tapa', alt: 'Vista completa de una tapa de motor sobre la mesa de una máquina', width: 1050, height: 1400, layout: 'portrait' },
  { url: headThree, title: 'Cada detalle, de cerca', alt: 'Tapa de motor vista en diagonal sobre una máquina del taller', width: 1050, height: 1400, layout: 'portrait' },
  { url: headFour, title: 'Componentes del motor', alt: 'Tapa de motor apoyada sobre una mesa, con sus cámaras a la vista', width: 1250, height: 938, layout: 'wide' },
  { url: processTwo, title: 'En la máquina', alt: 'Tapa de motor colocada bajo el cabezal de una máquina', width: 709, height: 1273, layout: 'portrait' },
  { url: processSeven, title: 'Trabajo en el taller', alt: 'Vista completa de una tapa de motor montada en la maquinaria de 2R', width: 709, height: 1250, layout: 'portrait' },
  { url: headFive, title: 'Cámaras y válvulas', alt: 'Detalle de las cámaras y válvulas de una tapa de motor', width: 1250, height: 938, layout: 'wide' }
];
// Grid cards use smaller files; the dialog retains each full-resolution original.
const previews = [
  [blockSmall, blockMedium], [headOneSmall, headOneMedium],
  [headThreeSmall, headThreeMedium], [headFourSmall, headFourMedium],
  [processTwoSmall], [processSevenSmall], [headFiveSmall, headFiveMedium]
];
photos.forEach((photo, index) => {
  photo.preview = previews[index][0];
  photo.srcSet = [`${photo.preview} 480w`, ...(previews[index][1] ? [`${previews[index][1]} 800w`] : []), `${photo.url} ${photo.width}w`].join(', ');
});
export const videos = [
  { url: videoOne, poster: posterOne, title: 'Trabajo sobre un bloque', width: 480, height: 854, duration: '0:06' },
  { url: videoTwo, poster: posterTwo, title: 'Los cilindros, de cerca', width: 854, height: 480, duration: '0:03' }
];
