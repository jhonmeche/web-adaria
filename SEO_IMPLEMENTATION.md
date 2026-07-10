# Implementación SEO

Fecha: 2026-07-08

## Cambios realizados

- Se centralizaron nombre, URL, idioma, región, imagen social, logo, color y
  WhatsApp en `src/config/seo.ts`.
- Se normalizaron canonical con HTTPS y barra final.
- Se añadió robots explícito para páginas públicas y `noindex, nofollow` para 404.
- Se completaron Open Graph y Twitter Card con URL absoluta, alt, dimensiones y
  metadata editorial para artículos.
- Se añadieron `WebPage`, `WebSite`, `Organization` y `BlogPosting`.
- Se mantuvieron y alinearon los schemas `Product`, `Service`, `AboutPage` y
  `BreadcrumbList`.
- Se añadieron manifest, iconos PWA y Apple Touch.
- Se acortaron plantillas de title redundantes y se limitaron descriptions de
  snippets a 160 caracteres.
- Se convirtieron a WebP las imágenes activas del hero y de sectores.
- Se añadieron dimensiones intrínsecas a imágenes de blog, hero, sectores y partner.
- Se conservó el diseño, contenido visible, rutas y comportamiento actual.

## Archivos principales modificados

- `src/config/seo.ts`
- `src/components/seo/BaseHead.astro`
- `src/layouts/BaseLayout.astro`
- `src/pages/404.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/productos/[slug].astro`
- `src/pages/servicios/[slug].astro`
- `src/pages/sectores/[slug].astro`
- `src/pages/nosotros.astro`
- Componentes de imágenes, contacto y WhatsApp.
- `public/manifest.webmanifest`
- `public/icons/*`
- Variantes WebP en `public/hero/` y `public/sectores/`.

## Decisiones técnicas

- Se mantuvo SSG de Astro porque entrega contenido completo y rápido a buscadores.
- No se instalaron dependencias nuevas.
- No se implementó `LocalBusiness` sin dirección y ciudad confirmadas.
- No se añadieron reviews, ofertas, precios, FAQ ni perfiles sociales inexistentes.
- Las descripciones visibles permanecen completas; solo el snippet se resume.
- Los PNG originales se conservaron como fuentes para evitar una eliminación
  irreversible; las páginas consumen las variantes WebP.
- No se creó una política de privacidad con texto genérico, porque requiere
  validación del propietario y revisión legal.

## Pendientes del propietario

- Confirmar dominio final y variantes que deben redirigir.
- Facilitar correo, ciudad, dirección y perfiles corporativos.
- Confirmar uso público del teléfono/WhatsApp en schema.
- Proporcionar política de privacidad aprobada.
- Decidir si productos, servicios y sectores necesitan páginas hub independientes.
- Facilitar imágenes Open Graph específicas para campañas o landings prioritarias.

## Checklist antes de publicar

- [ ] Confirmar que `https://adariasystems.com` es la URL canónica final.
- [ ] Definir `PUBLIC_ALLOW_INDEX=true` en producción o dejarla sin definir.
- [ ] No desplegar una preview privada con indexación habilitada.
- [ ] Configurar redirección HTTP a HTTPS y host alternativo al canónico.
- [ ] Confirmar que rutas inexistentes responden HTTP 404.
- [ ] Publicar y enlazar la política de privacidad del formulario.
- [ ] Revisar el número de WhatsApp y el endpoint real del formulario.
- [ ] Ejecutar build de producción sin errores.
- [ ] Verificar `/robots.txt`, `/sitemap-index.xml` y `/manifest.webmanifest`.
- [ ] Comprobar que las 36 URLs del sitemap responden 200.
- [ ] Revisar una muestra de landings en móvil y escritorio.
- [ ] Validar consentimiento y tratamiento de datos con asesoría legal.

## Pruebas posteriores al despliegue

1. Google Search Console: verificar propiedad, cobertura y enviar sitemap.
2. Rich Results Test: probar home, producto, servicio, sector y artículo.
3. Schema Markup Validator: revisar todos los grafos JSON-LD.
4. PageSpeed Insights: medir home, artículo y landing comercial en móvil.
5. Lighthouse: SEO, rendimiento, accesibilidad y buenas prácticas.
6. Validación manual de `robots.txt` y sitemap.
7. Rastreo de enlaces internos con Screaming Frog, Sitebulb o equivalente.
8. Open Graph Debugger y LinkedIn Post Inspector.
9. Navegación completa con teclado y lector de pantalla.
10. Search Console durante 4 a 8 semanas: consultas, CTR, canonical elegida y CWV.

## Comandos de validación

```bash
npm run build
```

El proyecto no define scripts `lint` ni `typecheck`; no se inventaron comandos ni
se instalaron herramientas adicionales para esta entrega.

## Resultado de validación local

- `npm run build`: correcto, 37 páginas generadas.
- Sitemap: 36 URLs indexables; la 404 no está incluida.
- Metadata/H1: 0 incidencias.
- Titles y descriptions duplicados: 0.
- Descriptions superiores a 160 caracteres: 0.
- JSON-LD con sintaxis inválida: 0.
- Enlaces internos rotos: 0.
- Imágenes referenciadas inexistentes: 0.
- `robots.txt` referencia correctamente `sitemap-index.xml`.
- La inspección visual automatizada no se pudo ejecutar porque el navegador
  integrado no estuvo disponible en la sesión; queda como prueba manual previa
  a publicación.
