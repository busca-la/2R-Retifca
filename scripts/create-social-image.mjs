// Optional asset export. Requires sharp; not part of the production build.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const require = createRequire(import.meta.url);
let sharp;
try { sharp = require('sharp'); }
catch { sharp = require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'sharp')); }
const root = fileURLToPath(new URL('../', import.meta.url));
const logo = await sharp(path.join(root, 'public/logo-2r.svg')).resize({ width: 330 }).png().toBuffer();
const photo = await sharp(path.join(root, 'src/assets/2r/bloque-cilindros-06.webp')).resize(800, 600, { fit: 'inside' }).toBuffer();
const size = await sharp(photo).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#050505' } })
  .composite([{ input: photo, left: 400 + Math.round((800 - size.width) / 2), top: Math.round((630 - size.height) / 2) }, { input: logo, left: 35, top: 193 }])
  .jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(root, 'public/og-2r.jpg'));
const icon = await sharp(logo).resize(170, 155, { fit: 'inside' }).png().toBuffer();
const iconSize = await sharp(icon).metadata();
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#050505' } })
  .composite([{ input: icon, left: Math.round((180-iconSize.width)/2), top: Math.round((180-iconSize.height)/2) }])
  .png().toFile(path.join(root, 'public/apple-touch-icon.png'));
