// Optional maintenance tool, not a build dependency. See README for sharp setup.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = fileURLToPath(new URL('../', import.meta.url));
const media = path.join(root, 'src/assets/2r');
const hero = path.join(root, 'file_000000004b04820ead1217610fcb4e60.png');

// Resize/encode only: preserve the supplied image, framing and original files.
for (const width of [640, 960, 1448]) {
  await sharp(hero).resize({ width, withoutEnlargement: true }).webp({ quality: 86 })
    .toFile(path.join(media, `hero-motor-${width}.webp`));
  await sharp(hero).resize({ width, withoutEnlargement: true }).avif({ quality: 60, effort: 5 })
    .toFile(path.join(media, `hero-motor-${width}.avif`));
}

for (const name of ['bloque-cilindros-06', 'tapa-rectificada-01', 'tapa-rectificada-03', 'tapa-terminada-04', 'cepillado-tapa-02', 'cepillado-tapa-07', 'cabezal-terminado-05']) {
  for (const width of [480, 800]) {
    const source = path.join(media, `${name}.webp`);
    // The narrow originals do not need a second, upscaled variant.
    if ((await sharp(source).metadata()).width < width) continue;
    await sharp(source).resize({ width }).webp({ quality: 84 })
      .toFile(path.join(media, `${name}-${width}.webp`));
  }
}
