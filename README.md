# Rectificadora de Motores 2R

Sitio institucional en español para Ciudad del Este, Paraguay. React + Vite, sobre el repositorio existente.

## Ejecutar y validar

Instalar con `npm ci`, ejecutar `npm run dev`, probar con `npm test` y compilar con `npm run build`. La salida de producción es `dist`.

## Canales oficiales

- WhatsApp / teléfono: +595 984 225745.
- Google Maps: Place ID `ChIJtX38HK6F9pQRcd5ZZhw4uOY`.
- Reseñas: https://search.google.com/local/writereview?placeid=ChIJtX38HK6F9pQRcd5ZZhw4uOY
- Facebook: https://www.facebook.com/share/1E6ahNBk5X/
- Zona publicada: Calle Estrella / Blas Garay, Ciudad del Este.
- El horario específico requiere confirmación con la empresa: la información previa de Google y WhatsApp Business no coincidía. El sitio invita a consultar antes de visitar.

El formulario valida nombre y consulta, prepara el mensaje y abre WhatsApp en la misma pestaña. El cliente confirma el envío; no hay un envío automático ni almacenamiento en un servidor. Las fotos adicionales pueden adjuntarse después en WhatsApp.

## Medios e identidad

Siete fotografías originales, dos videos reales y sus capas. Se preservan los fondos de taller y las proporciones de las piezas. La imagen con fondo editado no se utiliza. La galería puede ampliarse y cerrarse con Escape.

El visor permite avanzar y retroceder con botones, flechas del teclado, miniaturas o un deslizamiento horizontal en pantallas táctiles. Home y End van a la primera y última fotografía; Escape cierra y devuelve el foco al botón original. Cada fotografía tiene una consulta contextual por WhatsApp. Al reproducir un video se pausa el anterior.

La navegación señala la sección actual y muestra el avance de lectura. La fotografía de la hero responde suavemente al mouse en escritorio. Las entradas se ejecutan una sola vez; la preferencia de movimiento reducido desactiva los desplazamientos, incluso si cambia con la página abierta. No hay dependencias nuevas ni animaciones decorativas continuas.

El archivo `public/logo-2r.svg` se conserva sin cambios. Las fuentes Barlow Condensed y DM Sans se sirven localmente; se incluyen sus licencias OFL. La imagen social y el icono Apple se exportan desde el mismo logo y la fotografía original, sin reconstruir el símbolo.

## Contenido comercial

Se publica la categoría general confirmada de rectificación de motores. No se publican especializaciones, marcas atendidas, equipos, años de experiencia ni valoraciones numéricas sin confirmación.

Consultar [dirección de arte](docs/DIRECCION-DE-ARTE-V2.md) y [medios](docs/MEDIOS-V2.md).

La [adaptación para Paraguay](docs/PUBLICO-PARAGUAY.md) documenta las fuentes del INE y RAE/ASALE y su aplicación comercial. El documento usa `es-PY`, consultas preparadas por WhatsApp y acceso móvil a llamada y mapa. La barra de contacto aparece después de la hero y se oculta durante el uso del menú, el visor o el formulario.

## Configuración

Se conservan las variables opcionales de `.env.example` para contacto. Los valores oficiales están incluidos como respaldo. Si se cambia el número, ubicación o dominio, actualizar también los datos estructurados de `index.html`, el sitemap y los metadatos sociales.

El proyecto existente de Vercel publica desde la rama principal. La validación de GitHub usa el lockfile, ejecuta los tests y compila.

## Optimización de imágenes

Las variantes de la hero (AVIF y WebP) y las previsualizaciones WebP de la galería están versionadas. `npm ci` y el build no necesitan un procesador de imágenes. Se conservan el PNG suministrado y las fotografías originales; el visor sigue mostrando las fotografías completas.

Para regenerar las variantes, instalar la herramienta opcional fuera del proyecto y ejecutar desde la raíz:

```bash
npm install --prefix /tmp/2r-media-tools --no-save --package-lock=false sharp@0.35.5
NODE_PATH=/tmp/2r-media-tools/node_modules node scripts/optimize-images.mjs
```

La hero mantiene el mismo encuadre. El preload en `index.html` y el `picture` en `src/main.jsx` deben conservar los mismos candidatos y tamaños; así no se descargan variantes duplicadas. AVIF tiene fallback WebP. No se oculta la fotografía principal durante una animación de entrada.

Los horarios siguen pendientes de confirmación: no se publican horas específicas en la página ni en los datos estructurados. La consulta de horario abre WhatsApp.

`vercel.json` declara una CSP para recursos del propio sitio. Si se incorpora un servicio externo, revisar su necesidad y los destinos de la política antes de habilitarlo. Validar los headers reales en una revisión de despliegue; `vite preview` no aplica la configuración de Vercel.
