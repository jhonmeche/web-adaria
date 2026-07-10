# Auditoría SEO técnica

Fecha: 2026-07-08

## Resumen

El sitio usa Astro 7 con salida estática (SSG), Tailwind CSS 4 y contenido de blog
en colecciones Markdown. La arquitectura es favorable para SEO: el contenido se
entrega como HTML, no depende de renderizado cliente y el build genera 37 páginas.

La auditoría se realizó sobre el código y sobre el HTML de producción generado en
`dist/`. Después de la implementación, todas las páginas indexables tienen un H1,
title, description, canonical, robots, Open Graph y Twitter Card.

## Stack detectado

- Astro 7.0.6, salida `static`.
- Tailwind CSS 4 mediante Vite.
- Astro Content Layer para 17 artículos Markdown.
- `@astrojs/sitemap` para sitemap automático.
- Sharp disponible para procesamiento de imágenes.
- JavaScript progresivo para navegación, carrusel, animaciones y formulario.

## Páginas y rutas

- `/`: inicio y hub principal de soluciones, productos, servicios y contacto.
- `/nosotros/`: compañía y equipo.
- `/conceptos/`: glosario de Industria 4.0.
- `/blog/`: listado de artículos.
- `/blog/[slug]/`: 17 artículos.
- `/productos/[slug]/`: 3 páginas de producto.
- `/servicios/[slug]/`: 7 páginas de servicio.
- `/sectores/[slug]/`: 5 páginas sectoriales.
- `/404.html`: página de error personalizada.

No existen hubs independientes en `/productos/`, `/servicios/` y `/sectores/`;
esas categorías se presentan como secciones ancladas de la página de inicio.

## Hallazgos por área

### Indexabilidad

- Corregido: la página 404 era indexable; ahora usa `noindex, nofollow`.
- Correcto: las páginas públicas son HTML estático rastreable.
- Correcto: `robots.txt` permite el rastreo y declara el índice de sitemaps.
- Correcto: el sitemap excluye la 404 y contiene las 36 URLs indexables.
- Correcto: los canonical se normalizan con HTTPS y barra final.
- Pendiente de despliegue: confirmar códigos HTTP 404 y redirecciones de
  `http`/`www` en el proveedor de hosting.

### Metadatos

- Corregido: robots explícito, canonical normalizado y metadata social completa.
- Corregido: alt y dimensiones de imagen Open Graph cuando se conocen.
- Corregido: los artículos usan tipo Open Graph `article` y fechas editoriales.
- Corregido: las descripciones para snippets se limitan a 160 caracteres sin
  modificar el contenido visible.
- Correcto: titles y descriptions son únicos en el HTML generado.
- Observación: algunos titulares editoriales superan 60 caracteres. No es un
  error de indexación, pero Google puede truncarlos según la consulta.
- Pendiente: no existe un usuario corporativo de X/Twitter confirmado para
  `twitter:site`.

### Encabezados y semántica

- Correcto: exactamente un H1 en cada página indexable.
- Correcto: la jerarquía principal continúa con H2/H3 y usa landmarks
  `header`, `nav`, `main`, `section`, `article` y `footer`.
- Correcto: breadcrumbs visibles y `BreadcrumbList` en landings dinámicas.
- Observación menor: los títulos de columnas del footer empiezan en H3; no
  afecta indexación, pero puede revisarse en una auditoría WCAG específica.

### Contenido y arquitectura

- Correcto: productos, servicios y sectores se enlazan desde header, footer,
  home y páginas relacionadas; no se detectan páginas huérfanas.
- Correcto: cada landing tiene contenido diferenciado y enlaces cruzados.
- Riesgo medio: depender de anclas en la home limita la capacidad de posicionar
  páginas hub para consultas amplias como "servicios de Industria 4.0".
- Pendiente editorial: mantener fuentes primarias y fechas de actualización en
  artículos con cifras, regulación o tecnología cambiante.
- No se detectó contenido duplicado exacto en titles o descriptions.

### Imágenes y rendimiento

- Corregido: las 7 imágenes activas del hero pasan de 11.34 MB en PNG a 0.50 MB
  en WebP, una reducción aproximada del 95.6%.
- Corregido: 4 imágenes sectoriales pasan de 7.92 MB a 0.40 MB, una reducción
  aproximada del 95%.
- Corregido: las imágenes renderizadas conocidas reservan `width` y `height`.
- Correcto: la imagen LCP usa `fetchpriority="high"` y las secundarias lazy load.
- Correcto: el sitio entrega poco JavaScript y no usa un runtime SPA.
- Riesgo medio: las fuentes dependen de Google Fonts y de una hoja CSS externa.
- Riesgo bajo: permanecen PNG fuente sin referencias dentro de `public/`; no
  afectan la carga de página, pero sí aumentan el tamaño del artefacto desplegado.
- Pendiente de datos reales: medir LCP, CLS e INP en producción con CrUX y
  PageSpeed Insights; el build local no reproduce red, CDN ni dispositivo real.

### Accesibilidad relacionada con SEO

- Correcto: existe enlace para saltar al contenido.
- Correcto: formulario con labels, tipos y autocompletado.
- Correcto: botones y enlaces usan elementos semánticos.
- Correcto: imágenes de contenido tienen alt; SVG decorativos están ocultos.
- Correcto: animaciones respetan `prefers-reduced-motion`.
- Riesgo medio: el carrusel automático se pausa por foco y puntero, pero una
  revisión WCAG puede requerir un control visible de pausa/reanudación.
- Pendiente: ejecutar auditoría de contraste y teclado sobre el sitio desplegado.

### Datos estructurados

Implementados:

- `Organization` sin dirección ni perfiles inventados.
- `WebSite`.
- `WebPage`.
- `AboutPage`.
- `Service`.
- `Product`.
- `BreadcrumbList`.
- `BlogPosting`.

No implementados de forma intencional:

- `LocalBusiness`: no hay ciudad ni dirección comercial confirmada.
- `FAQPage`: no hay bloques de preguntas frecuentes visibles.
- `Review`, `AggregateRating`, `Offer`: no existen datos reales.
- `ContactPoint` detallado: falta confirmar tipo de atención y datos corporativos.

### Archivos técnicos

- Correcto: `robots.txt`.
- Correcto: sitemap dinámico en build (`sitemap-index.xml` y `sitemap-0.xml`).
- Correcto: favicon SVG.
- Correcto: imagen Open Graph por defecto de 1200 x 630.
- Añadido: `manifest.webmanifest`.
- Añadidos: iconos 192, 512 y Apple Touch.
- Añadido: configuración SEO central en `src/config/seo.ts`.

## Información pendiente del propietario

- `[PENDIENTE_CORREO]`
- `[PENDIENTE_DIRECCION_FISICA]`
- `[PENDIENTE_CIUDAD]`
- `[PENDIENTE_REDES_SOCIALES_CORPORATIVAS]`
- `[PENDIENTE_TEXTO_POLITICA_PRIVACIDAD]`
- Confirmar si `https://adariasystems.com` es el dominio canónico definitivo.
- Confirmar que el WhatsApp `+57 313 853 7266` puede publicarse como teléfono
  corporativo en datos estructurados.

## Priorización

### Crítica

- Ninguna incidencia crítica pendiente en el código.

### Alta

- Publicar una política de privacidad revisada legalmente y enlazarla desde el
  formulario antes de captar datos personales.
- Configurar redirección única a HTTPS y al host canónico en producción.
- Verificar el dominio y enviar el sitemap en Google Search Console.

### Media

- Crear hubs con contenido propio para `/productos/`, `/servicios/` y
  `/sectores/` si esas categorías son objetivos orgánicos prioritarios.
- Añadir control visible de pausa al carrusel si la auditoría WCAG lo exige.
- Autohospedar o servir de forma más eficiente la fuente Inter.
- Añadir imágenes Open Graph específicas para landings comerciales clave.
- Incorporar `lastmod` al sitemap cuando exista una fuente fiable de actualización.

### Baja

- Retirar del artefacto público las imágenes PNG fuente que ya no se consumen.
- Añadir feed RSS al blog.
- Revisar títulos editoriales largos según datos reales de Search Console.

