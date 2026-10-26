# 2R — dirección de arte V2

Referencias inspeccionadas el 21/10/2026 a 1440×960 y 390×844, antes de cambiar la aplicación. Se capturaron la primera composición y un bloque posterior de cada referencia. Las capturas externas son material de análisis; no se incorporan al sitio.

| Referencia | Observación visual concreta | Aplicación en 2R |
| --- | --- | --- |
| [BRABUS](https://www.brabus.com/en-int/cars/supercars.html) | El objeto conserva escala y protagonismo; el texto ocupa una zona definida. En mobile cambia el encuadre. | Hero de dos columnas 52/48, fotografía original completa a la derecha. Mobile apila título, CTA y fotografía. |
| [Porsche Motorsport](https://racing.porsche.com/) | Una escena mecánica domina la primera pantalla; el texto se coloca fuera de los detalles del objeto. | Piezas visibles y sin filtros. Galería que alterna un plano horizontal con detalles verticales. |
| [Rimac Technology](https://www.rimac-technology.com/) | Cada área técnica combina imagen, nombre corto y una explicación separada. La imagen sigue siendo importante en mobile. | Una categoría confirmada: rectificación de motores. Fotografía relacionada y orientación concreta para consultar. |
| [Rottler](https://www.rottlermfg.com/) | Categorías técnicas con aplicación breve y acción de presupuesto cercana. | Lista práctica: marca/modelo, componente, descripción del trabajo. WhatsApp después del servicio. |
| [Linear](https://linear.app/) | Navegación contenida, bordes sutiles, alineación común y jerarquía entre descripción e imagen. | Contenedor de 1200px, superficies #111/#191919, separación coherente, foco visible y controles consistentes. |
| [Apple Mac Studio](https://www.apple.com/mac-studio/) | Un elemento principal por composición; la escala y el espacio cambian entre bloques. | H1 industrial fuerte; H2 más controlados; fotografía institucional acompañada por dos párrafos cortos. |

## Problemas de la versión anterior

- Hero sin fotografía: la carpeta de medios estaba vacía.
- Galería oculta por falta de archivos.
- Logo como sustituto de una fotografía institucional.
- Tres tarjetas genéricas; "consultas técnicas" presentada como servicio.
- Marcas de fabricantes sin confirmación de atención o vínculo.
- Grandes títulos repetidos y franja de texto en movimiento infinito.
- CTA principal dirigido al final de la página.
- Fuentes externas: su ausencia modificaba las medidas del texto.

## Decisiones implementadas

- Se conserva React/Vite, el símbolo de `public/logo-2r.svg`, el amarillo #f6d21b y los canales oficiales.
- La hero actual conserva el archivo suministrado `file_000000004b04820ead1217610fcb4e60.png`, mediante variantes AVIF/WebP con el mismo encuadre. La galería mantiene `bloque-cilindros-06.webp`, correspondiente a la fotografía original `11339.jpg`. El registro histórico de referencias anterior no sustituye una auditoría actual de esas páginas.
- Siete fotografías sin cambio de fondo, sin filtros y sin recortes de la pieza. Los archivos conservan sus proporciones; se pueden ampliar con teclado y cerrar con Escape.
- Los dos videos muestran bloques de motor; no se les atribuye una operación específica no confirmada. Controles nativos, `playsInline`, sin autoplay, sin loop y `preload="none"`.
- No se agregan servicios detallados, certificaciones, estadísticas, equipos o testimonios.
- Las marcas sin respaldo se ocultan. Las reseñas se consultan en Google; no se publica una puntuación inventada.
- Los horarios específicos se sustituyen por una confirmación directa: el README anterior documentaba una discrepancia entre Google y WhatsApp Business.
- Fuentes locales, imagen pequeña para la hero mobile, dimensiones reservadas, cargas diferidas y movimiento reducido.

## Pendientes de información comercial

Confirmar con 2R los servicios específicos, marcas atendidas y horario definitivo. El archivo original de la marca no estaba identificado de forma independiente; el SVG existente se conserva sin modificar. No se bloquea la consulta comercial por estas pendientes.
