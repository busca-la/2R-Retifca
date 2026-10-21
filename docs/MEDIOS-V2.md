# Medios publicados

Fuente: paquete `2R-midia-atualizada-site.zip` y fotografías originales provistas por el cliente. No se generaron escenas, piezas o instalaciones.

| Archivo | Uso |
| --- | --- |
| `bloque-cilindros-06.webp` | Hero y primer plano de la galería; corresponde al original `11339.jpg`. |
| `bloque-cilindros-06-640.webp` | Versión reducida para la hero; misma fotografía y encuadre. |
| `tapa-rectificada-01.webp` | Galería, superficie completa de una tapa. |
| `tapa-rectificada-03.webp` | Galería y Sobre 2R, tapa colocada en una máquina. |
| `tapa-terminada-04.webp` | Galería, vista horizontal de una tapa. |
| `cepillado-tapa-02.webp` | Galería, componente bajo la máquina. El nombre de archivo no se usa como afirmación comercial. |
| `cepillado-tapa-07.webp` | Galería, vista de la tapa en la máquina. |
| `cabezal-terminado-05.webp` | Servicio y galería, cámaras y válvulas. |
| `proceso-cepillado-01.mp4` | Video vertical, 480×854, 6,13 s, H.264, sin pista de audio. |
| `proceso-cepillado-02.mp4` | Video horizontal, 854×480, 3,33 s, H.264, sin pista de audio. |
| `proceso-cepillado-01.jpg` / `proceso-cepillado-02.jpg` | Capas de los respectivos videos. |

`hero-bloque-2r.webp` se excluye por el fondo editado. Los medios públicos importados suman aproximadamente 2,2 MB, de los cuales 1,57 MB corresponden a videos que solo se descargan al reproducirlos. La variante de hero de 640px ocupa aproximadamente 37 KB.

Las importaciones son explícitas en `src/media.js`: si falta un archivo, el build falla de forma visible en lugar de ocultar la galería.
