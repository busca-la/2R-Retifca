# Medios publicados

Fuente: paquete `2R-midia-atualizada-site.zip` y fotografías originales provistas por el cliente. No se generaron escenas, piezas o instalaciones.

| Archivo | Uso |
| --- | --- |
| `file_000000004b04820ead1217610fcb4e60.png` | Archivo suministrado que utiliza la hero actual. Se conserva como fuente; no se importa al bundle. |
| `hero-motor-{640,960,1448}.{avif,webp}` | Variantes de la misma hero, sin cambiar composición ni fondo. AVIF preferido, WebP de respaldo. |
| `bloque-cilindros-06.webp` | Primer plano de la galería; corresponde al original `11339.jpg`. |
| `*-480.webp` / `*-800.webp` | Previsualizaciones de la galería y fotografía de servicios. Los originales de 709px no se amplían a 800px. El visor mantiene el archivo completo. |
| `tapa-rectificada-01.webp` | Galería, superficie completa de una tapa. |
| `tapa-rectificada-03.webp` | Galería y Sobre 2R, tapa colocada en una máquina. |
| `tapa-terminada-04.webp` | Galería, vista horizontal de una tapa. |
| `cepillado-tapa-02.webp` | Galería, componente bajo la máquina. El nombre de archivo no se usa como afirmación comercial. |
| `cepillado-tapa-07.webp` | Galería, vista de la tapa en la máquina. |
| `cabezal-terminado-05.webp` | Servicio y galería, cámaras y válvulas. |
| `proceso-cepillado-01.mp4` | Video vertical, 480×854, 6,13 s, H.264, sin pista de audio. |
| `proceso-cepillado-02.mp4` | Video horizontal, 854×480, 3,33 s, H.264, sin pista de audio. |
| `proceso-cepillado-01.jpg` / `proceso-cepillado-02.jpg` | Capas de los respectivos videos. |

La hero actual conserva el PNG suministrado; este registro describe su origen en el repositorio y no acredita su proceso fotográfico anterior. Las fotografías de la galería y los videos conservan los archivos originales del taller.

El PNG fuente ocupa 2.062.665 bytes. La misma hero en AVIF ocupa 20.341 bytes a 640px, 38.853 bytes a 960px y 73.628 bytes a 1448px. El navegador elige una variante; los WebP de respaldo no se descargan además del AVIF. Los videos suman aproximadamente 1,57 MB, se insertan al solicitar “Ver videos del taller” y se descargan al reproducirlos, con `preload="none"`.

Regeneración: `scripts/optimize-images.mjs` usa sharp como herramienta opcional, fuera de las dependencias de producción. Ver comandos en README.

Las importaciones son explícitas en `src/media.js`: si falta un archivo, el build falla de forma visible en lugar de ocultar la galería.
