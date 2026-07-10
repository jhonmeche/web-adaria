# Auditoría de código — calidad, componentes, rendimiento y seguridad

Fecha: 2026-07-10
Autor: Arquitecto (Claude, según CLAUDE.md)
Alcance: `src/` completo, `package.json`, `tsconfig.json`,
`astro.config.mjs`, `content.config.ts`, `config/seo.ts`, y una build de
producción real (`npm run build`) para medir bundle/CSS/JS/HTML con datos
verificados, no estimados. Complementa `01-diseno-frontend.md` (UX/visual/
accesibilidad) y `02-estructura.md` (IA/navegación); donde un hallazgo
técnico ya tiene consecuencia de UX o IA documentada ahí, se referencia sin
repetirse.

## Resumen

El código es de buena calidad de base: TypeScript en modo `strict`
(`tsconfig.json:2`), cero dependencias de UI framework (Astro puro + JS
vanilla), validación de esquema con Zod para el contenido del blog,
`package-lock.json` commiteado, y ningún uso de `any`, `@ts-ignore` ni
`set:html` sobre contenido no confiable. La build de producción es rápida
(37 páginas en ~2s) y el peso de imágenes ya está resuelto (confirmado en
`SEO_AUDIT.md`).

El problema principal no es de corrección sino de **duplicación**: el mismo
bloque de hero+breadcrumb se repite copiado en 4 páginas, el mismo bloque de
cierre "cross-sell + CTA" se repite en 2, la misma regla CSS de animación de
entrada (`.js [data-reveal].card`) está copiada y pegada en 12 archivos
distintos, y los mismos dos íconos SVG (check y flecha) aparecen sin
componentizar 12 y 20 veces en el código fuente — lo que, ya renderizado,
produce **96 `<svg>` inline solo en la home**, un 18% del peso de su HTML.
Nada de esto rompe el sitio hoy, pero es exactamente el tipo de deuda que
hace cara la siguiente sesión de cambios: tocar el hover de un ícono o el
timing de una animación implica editar el mismo fragmento en una docena de
archivos y confiar en no olvidar ninguno.

En seguridad no hay hallazgos críticos: es un sitio estático sin backend
propio, sin secretos en el repo, con las únicas dos variables de entorno
correctamente prefijadas `PUBLIC_` (seguras para exponerse al cliente). Los
hallazgos son de "falta reforzar" (cabeceras de seguridad, protección
antispam del formulario), no de vulnerabilidad activa.

## 1. Calidad del código

### 1.1 [MENOR] No hay linter, formateador ni test runner configurado

`package.json:6-12` — solo `dev`, `start`, `build`, `preview`, `astro`. No
hay `eslint`, `prettier`, `vitest` ni ningún script de `lint`/`typecheck`,
tal como ya señalaba `SEO_IMPLEMENTATION.md` ("El proyecto no define
scripts `lint` ni `typecheck`"). `tsconfig.json` sí extiende
`astro/tsconfigs/strict`, así que `astro check` (disponible vía `npx astro
check`, aunque no está expuesto como script) validaría tipos si se
ejecutara — hoy nada lo ejecuta automáticamente ni en CI.

**Recomendación:** agregar `"check": "astro check"` a los scripts como
mínimo viable, y considerar Prettier con el plugin oficial de Astro para
que el formato deje de depender de la disciplina manual (que, a juzgar por
el código leído, hoy es alta — pero no es sostenible sin herramienta a
medida que el equipo de desarrollo crezca o cambie).

### 1.2 [MENOR] Comentarios de diseño que quedan desactualizados con el código

Ya documentado en detalle en `02-estructura.md` (nota en "Nosotros": el
comentario de `data/equipo.ts:3-4` dice que los fundadores son
"PLACEHOLDERS" cuando los tres ya tienen nombre, bio, foto y LinkedIn
reales) y en `01-diseno-frontend.md` (2.2: comentarios de orden de
secciones que no coinciden con `index.astro`). Es un patrón recurrente en
el código: los componentes están *muy* bien documentados con comentarios de
intención, pero nada obliga a mantenerlos sincronizados cuando el contenido
o el orden cambian. No es un defecto de código en sí, pero vale la pena
nombrarlo aquí como hábito a vigilar: un comentario incorrecto es peor que
ningún comentario, porque el siguiente desarrollador (o Claude) confía en
él en vez de verificar el código real.

### 1.3 [Correcto — fortaleza] Tipado estricto sin escapes

No se encontró ningún `any`, `@ts-ignore`, `@ts-nocheck` ni `as any` en
`src/`. El único `set:html` sobre datos dinámicos (no estáticos) es
`JSON.stringify(...)` para JSON-LD en 7 archivos — patrón seguro y estándar
para Astro. El único `set:html` sobre un string crudo
(`PartnerTecnologico.astro:144`, `set:html={c.svg}`) usa contenido 100%
hardcodeado en el propio componente (`capacidades[].svg`, definido en las
líneas 24-57 del mismo archivo), no contenido de usuario ni de una fuente
externa — no es una superficie de XSS real.

## 2. Organización de componentes y patrones

### 2.1 [IMPORTANTE] El mismo bloque de "hero + breadcrumb" está copiado en 4 páginas

`src/pages/productos/[slug].astro:62-103`,
`src/pages/servicios/[slug].astro:60-103`,
`src/pages/sectores/[slug].astro:60-107`, `src/pages/nosotros.astro:82-112`.

Los cuatro archivos repiten, con variaciones mínimas de contenido, la misma
estructura: `<section class="relative isolate overflow-hidden bg-ink...">`
→ `tech-grid` → `<nav aria-label="Ruta">` con el mismo patrón de breadcrumb
→ badge/ícono → `h1` con `text-display` → tagline → intro → dos `Button`.
Es exactamente el tipo de bloque que un componente `LandingHero.astro`
(con slots o props para breadcrumb, ícono, título, tagline y CTAs)
resolvería en un solo lugar. Hoy, cualquier ajuste al breadcrumb (por
ejemplo, para resolver el hallazgo 2.1 de `02-estructura.md` sobre
breadcrumbs que apuntan a anclas en vez de hubs) exige tocar 4 archivos de
forma idéntica y confiar en no desviarlos entre sí.

### 2.2 [IMPORTANTE] El cierre "cross-sell + CTA" está copiado entre producto y servicio

`src/pages/productos/[slug].astro:327-376` y
`src/pages/servicios/[slug].astro:225-274`.

Misma estructura: sección oscura con `tech-grid`, `Eyebrow` ("Un solo
aliado" / "Un equipo integral"), grid de tarjetas de cross-sell hacia los
otros productos/servicios, y una tarjeta de cierre con CTA. La única
diferencia real es el texto y el array que se itera (`otros` de productos
vs. de servicios). Es un segundo candidato claro a extraer como componente
(`CrossSellCierre.astro`, recibiendo el array de items y los textos como
props).

### 2.3 [IMPORTANTE] La animación de entrada `[data-reveal].card` está duplicada, carácter por carácter, en 12 archivos

Confirmado por búsqueda exacta del selector `.js [data-reveal].card {`:
aparece en `Contacto.astro`, `Sectores.astro` (como `.sector-card`, variante
del mismo patrón), `Servicios.astro`, `productos/[slug].astro`,
`servicios/[slug].astro`, `sectores/[slug].astro`, `nosotros.astro`,
`conceptos.astro`, `RiesgoUrbano.astro`, `PorQue.astro`, `Problema.astro`,
`Stack.astro` — 12 bloques `<style>` con exactamente las mismas 10 líneas
de CSS (mismo `cubic-bezier`, mismos `0.7s`/`22px`, mismas propiedades)
copiadas y pegadas. `global.css:141-152` ya define una regla general
`.js [data-reveal]` con fade + `translateY(14px)` — la versión "`.card`"
solo cambia el desplazamiento a `22px` y agrega `translate`/`box-shadow`/
`border-color` a la transición. Es una regla de utilidad, no algo
específico de cada componente; debería vivir una sola vez en `global.css`
(por ejemplo como `.js [data-reveal].card` global) en vez de repetirse.

**Impacto real:** no es solo mantenibilidad — cada copia se compila en el
CSS del *chunk* de esa página (ver §4.2), así que la duplicación de código
fuente también duplica bytes en el CSS final entregado al navegador.

### 2.4 [IMPORTANTE] Los íconos SVG de trazo (check ✓ y flecha →) no están componentizados

Confirmado por búsqueda del `path` exacto: el ícono de check
(`M4 10.5 8 14l8-8.5`) aparece pegado 12 veces en 7 archivos, y el de
flecha (`M4 10h12m0 0-5-5m5 5-5 5`) aparece pegado 20 veces en 17 archivos
— siempre con el mismo `viewBox`, `stroke-width` y atributos, solo
cambiando la clase de color/tamaño según el contexto. No existe un
componente `Icon.astro` ni `CheckIcon`/`ArrowIcon` reutilizable; cada
sección vuelve a escribir el mismo `<svg><path d="...">` a mano.

Esto no es solo un problema de "código feo": ver §4.3 para el impacto
medido en peso de página (96 SVG inline solo en la home).

**Recomendación (2.1–2.4):** extraer `LandingHero.astro`,
`CrossSellCierre.astro`, mover la regla `[data-reveal].card` a
`global.css`, y crear `Icon.astro` (o al menos `CheckIcon.astro` /
`ArrowIcon.astro`) para los dos trazos más repetidos. Los otros
componentes (`Section`, `Eyebrow`, `Button`, `Viewfinder`) ya demuestran que
el equipo sabe extraer bien cuando lo hace — este es el mismo patrón
aplicado de forma incompleta.

### 2.5 [Correcto — fortaleza] Patrón de datos + presentación bien separado

`data/productos.ts`, `data/servicios.ts` y `data/sectores.ts` centralizan
contenido tipado que alimenta tanto la home como las landings dedicadas sin
duplicar texto — ya reconocido en `02-estructura.md`. La organización de
carpetas (`components/{layout,ui,seo,sections,blog,conceptos,servicios}`)
separa correctamente componentes de presentación general (`ui/`) de
secciones específicas de página (`sections/`) y de diagramas de una sola
landing (`conceptos/`, `servicios/`).

### 2.6 [Correcto — fortaleza] Progressive enhancement consistente

El patrón `<html class="js">` (activado solo si hay JS,
`BaseLayout.astro:96-98`) + `[data-reveal]` visible por defecto es
consistente en todo el sitio: si JavaScript falla o está deshabilitado, no
hay contenido oculto permanentemente (a diferencia de un patrón común y más
frágil de "oculto por defecto, JS lo muestra"). El `IntersectionObserver`
para reveals y contadores está centralizado una sola vez en
`BaseLayout.astro:115-174` — el JS, a diferencia del CSS del punto 2.3, sí
está bien deduplicado.

## 3. Seguridad

### 3.1 [Correcto — fortaleza] Sin secretos ni backend propio expuesto

No hay archivos `.env` commiteados (`.gitignore:12-13` los excluye
correctamente), no hay claves ni tokens hardcodeados en `src/`. Las únicas
dos variables de entorno usadas (`import.meta.env.PUBLIC_ALLOW_INDEX` en
`BaseHead.astro:35` y `import.meta.env.PUBLIC_FORM_ENDPOINT` en
`Contacto.astro:15`) siguen correctamente la convención de Vite/Astro de
prefijo `PUBLIC_` para variables seguras de exponer en el cliente — no hay
ningún caso de una variable sin ese prefijo usada del lado del navegador
que pudiera filtrar un valor pensado como privado. Al ser un sitio 100%
estático (sin servidor propio en producción), no existe superficie de
inyección SQL, deserialización insegura ni endpoints propios que validar.

### 3.2 [Correcto — fortaleza] Contenido de terceros validado en build, no en runtime

`content.config.ts:9-33` valida el frontmatter de cada artículo del blog
con un esquema Zod (`z.object({...})`) en tiempo de build: un `.md` con
`pubDate` inválido o sin `title` rompe el build antes de llegar a
producción, en vez de fallar silenciosamente o renderizar datos corruptos
en el sitio publicado.

### 3.3 [IMPORTANTE] No hay cabeceras de seguridad configuradas en el repositorio

No existe `public/_headers` (Netlify), `vercel.json` ni configuración
equivalente para el proveedor de hosting elegido. El sitio no define
`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` ni `Permissions-Policy` en ningún archivo del repo, así
que su presencia en producción depende enteramente de los valores por
defecto del hosting (no confirmados en esta auditoría). No es una
vulnerabilidad activa, pero es una capa de defensa habitual antes de
publicar un sitio B2B que recoge datos de contacto en un formulario.

**Recomendación:** definir cabeceras explícitas según el hosting final
(Netlify `_headers`, Vercel `vercel.json` o equivalente) antes del
despliegue a producción — ítem natural para sumar al checklist ya existente
en `SEO_IMPLEMENTATION.md`.

### 3.4 [MENOR] El formulario de contacto no tiene ninguna protección antispam

`src/components/sections/Contacto.astro:83-128` (marcado) y `163-221`
(script).

El formulario valida en cliente (`checkValidity()`/`reportValidity()`,
correcto para UX) pero no incluye ningún mecanismo antibot: no hay campo
honeypot, no hay verificación de tiempo mínimo de llenado, ni integración
con un captcha. Si `PUBLIC_FORM_ENDPOINT` se configura en producción
apuntando a un servicio tipo Formspree, ese endpoint queda expuesto en el
HTML público (`FORM_ENDPOINT` viaja a través de `define:vars` al script del
cliente, `Contacto.astro:163`) y puede recibir envíos automatizados sin
ninguna fricción de por medio del lado de AdariA (más allá de lo que el
propio servicio externo filtre).

**Recomendación:** agregar un campo honeypot simple (input oculto que un
bot rellena y un humano no ve) antes de conectar `PUBLIC_FORM_ENDPOINT` a
un endpoint real — no requiere backend propio y reduce buena parte del
spam automatizado.

### 3.5 [MENOR] No existe `.env.example`

No hay ningún archivo `.env.example`/`.env.sample` en el repo que documente
qué variables de entorno existen (`PUBLIC_ALLOW_INDEX`,
`PUBLIC_FORM_ENDPOINT`) ni sus valores esperados. Un desarrollador nuevo
solo puede descubrirlas leyendo `BaseHead.astro` y `Contacto.astro`
directamente. No es un riesgo de seguridad en sí, pero la ausencia del
archivo también significa que no hay un lugar central que documente que
estas variables son opcionales y qué pasa si no están definidas (el propio
código sí maneja bien ambos casos con `?? ''` y `!== 'false'`, ver
`Contacto.astro:15` y `BaseHead.astro:35`).

### 3.6 [Correcto — fortaleza] Higiene de la cadena de suministro

`package-lock.json` está commiteado (`git ls-files` lo confirma) y
`package.json:20-25` define un `allowScripts` explícito que limita qué
paquetes pueden ejecutar scripts de instalación (`esbuild`, `sharp`) — un
allowlist deliberado en vez de confiar por defecto en todo el árbol de
dependencias. El set de dependencias de producción es mínimo: `astro`,
`@astrojs/sitemap`, `tailwindcss`, `@tailwindcss/vite`, `sharp` — sin
ningún framework de UI (React/Vue/Svelte) ni librería de utilidades de
propósito general, lo que reduce la superficie de ataque y el bundle a la
vez.

## 4. Rendimiento

Medido sobre una build real (`npm run build`, 37 páginas en ~2s) para
evitar estimaciones — resultados exactos, no aproximados.

### 4.1 [IMPORTANTE] No se usa `astro:assets` ni `<Image>` pese a tener `sharp` instalado

No hay ningún `import` de `astro:assets`, `getImage` ni el componente
`<Image>` en todo `src/` (verificado por búsqueda). `sharp` está en
`package.json:17` pero, según ya documenta `SEO_AUDIT.md`, se usó para una
conversión manual y puntual de PNG a WebP — no está integrado al pipeline
de build. Consecuencias concretas:

- **Sin `srcset`/`sizes` responsivo:** todas las imágenes (`Hero.astro:67-77`,
  tarjetas de sector, capturas de blog) se sirven al mismo tamaño fijo
  (ej. `width="1672" height="941"` en el hero) sin importar si el visitante
  está en un teléfono de 375px o un monitor de 2560px. Un móvil descarga la
  misma imagen de escritorio.
- **Sin generación automática de variantes AVIF/WebP:** cualquier imagen
  nueva que se agregue tendrá que optimizarse y convertirse a mano, con el
  mismo riesgo que ya señala `SEO_AUDIT.md` sobre los PNG originales que
  quedaron huérfanos en `public/`.

No es un problema de peso *hoy* (los WebP ya están bien comprimidos, 56KB–
132KB cada uno, según medido en esta auditoría), sino de que no hay
garantía de que se mantenga así a medida que se agreguen más imágenes sin
pasar por `astro:assets`.

### 4.2 [MENOR] Un único bundle CSS compartido de 89KB para todo el sitio, más chunks pequeños por página

Medido en `dist/_astro/`: `BaseLayout.Cq1VxQD6.css` (89.2KB) se carga en
**todas** las páginas (incluye `global.css` + todos los estilos con
`<style>` con ámbito de componente de todo el sitio, incluidos los que solo
se usan en una sola landing), más un chunk adicional específico por página
cuando existe (`index.KfB3493H.css`, 8.4KB, solo en home;
`conceptos.Ba1hYWKD.css`, 19.2KB, solo en `/conceptos`). Es un trade-off
razonable — un solo archivo grande se cachea una vez y sirve para las 37
páginas en la misma visita — pero significa que cualquier página individual
descarga (la primera vez) CSS de componentes que nunca usa (por ejemplo, la
home carga las reglas del `mock-shimmer` de la galería de productos que
solo aparecen en `/productos/[slug]`). Con Tailwind 4 generando solo las
clases utilizadas, el CSS ya está razonablemente podado; el peso extra que
queda es sobre todo el resultado de la duplicación del punto 2.3.

### 4.3 [IMPORTANTE] 96 SVG inline en el HTML de la home — ~18% de su peso total

Medido directamente sobre `dist/index.html` (158.5KB): 96 bloques `<svg>`
suman ~29.2KB, el 18.4% del HTML de la página. Es la consecuencia medible
del punto 2.4 (íconos no componentizados): cada tarjeta que itera sobre un
array (sectores, servicios, pasos, beneficios, valores) vuelve a incrustar
el `<path>` completo del ícono en vez de reutilizar un símbolo. HTML no se
cachea entre páginas como sí lo hace un CSS/JS externo, así que este peso
se repite en cada una de las 37 páginas, no solo en la home.

**Recomendación:** un componente `Icon.astro` no reduce el HTML por sí solo
(Astro igual expande el `<svg>` en el output), pero si el volumen de
íconos repetidos crece, vale la pena evaluar un sprite SVG
(`<symbol>`/`<use>`) servido una sola vez y cacheado, en vez de inline
en cada instancia — especialmente para los dos íconos que por sí solos ya
representan 32 de las 96 apariciones typical por página.

### 4.4 [MENOR] Scripts inline sin extraer a archivos cacheables

La build no generó ningún archivo `.js` en `dist/_astro/` — los 8 bloques
`<script>` de la home (5 `type="module"`, 3 planos) quedaron inline en el
HTML, sumando ~7.4KB. Es un volumen pequeño y, al no haber enrutamiento de
cliente (cada navegación es una carga de página completa), el beneficio de
extraerlos a un archivo cacheable es menor que en una SPA — pero sí implica
que ese ~7.4KB de JS se vuelve a descargar y parsear en cada una de las 37
páginas en lugar de reutilizarse desde caché como si ocurre con
`BaseLayout.Cq1VxQD6.css`.

### 4.5 [Correcto — fortaleza] Cero JavaScript de framework, imágenes ya optimizadas

No hay React, Vue, Svelte, ni ninguna librería de UI de terceros en el
bundle — todo el comportamiento interactivo (menú, carrusel, reveals,
scroll-to-top, formulario) está escrito en JS vanilla sin dependencias. Las
imágenes activas del hero y de sectores ya están en WebP y con `width`/
`height` explícitos para evitar *layout shift* (confirmado en
`SEO_AUDIT.md` y verificado de nuevo aquí: 56KB–132KB por imagen). La build
completa de 37 páginas toma menos de 2 segundos.

## Priorización

### Importante
- 2.1 — Bloque de hero+breadcrumb duplicado en 4 páginas.
- 2.2 — Bloque de cierre cross-sell+CTA duplicado en producto y servicio.
- 2.3 — Regla CSS `[data-reveal].card` copiada en 12 archivos en vez de
  vivir una sola vez en `global.css`.
- 2.4 — Íconos de check y flecha sin componentizar (12 y 20 repeticiones
  en código fuente).
- 3.3 — Sin cabeceras de seguridad (`CSP`, `X-Frame-Options`, etc.)
  configuradas para el hosting.
- 4.1 — Sin `astro:assets`/`<Image>` pese a tener `sharp` instalado: sin
  `srcset` responsivo ni pipeline automático de optimización.
- 4.3 — 96 SVG inline miden ~18% del HTML de la home (consecuencia medida
  del punto 2.4).

### Menor
- 1.1 — Sin linter, formateador ni `astro check` en los scripts de
  `package.json`.
- 1.2 — Comentarios de diseño que quedan desactualizados con el código.
- 3.4 — Formulario de contacto sin honeypot ni protección antispam básica.
- 3.5 — Sin `.env.example` que documente las variables opcionales.
- 4.2 — Bundle CSS único de 89KB compartido por todas las páginas
  (trade-off razonable, pero infla con la duplicación del punto 2.3).
- 4.4 — Scripts inline no extraídos a archivos cacheables entre páginas.

### Fortalezas verificadas (mantener)
- TypeScript `strict`, sin `any`/`@ts-ignore`, sin `set:html` sobre
  contenido no confiable.
- Esquema Zod que valida el contenido del blog en build.
- Modelo de datos tipado compartido entre home y landings, sin duplicar
  texto.
- Progressive enhancement consistente y `IntersectionObserver` centralizado
  en `BaseLayout.astro` (a diferencia del CSS, el JS de reveals sí está
  bien deduplicado).
- Sin secretos en el repo; variables de entorno correctamente prefijadas
  `PUBLIC_`.
- `package-lock.json` commiteado y `allowScripts` explícito en
  `package.json`.
- Cero dependencias de framework de UI; build de 37 páginas en ~2s;
  imágenes activas ya optimizadas a WebP con dimensiones explícitas.
