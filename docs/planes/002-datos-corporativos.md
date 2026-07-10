# Plan 002 — Datos corporativos, LocalBusiness y política de privacidad

**Estado: APROBADO** — aprobado por Jhon Meche el 2026-07-10. Listo para
IMPLEMENTAR (CLAUDE.md, "Ciclo de trabajo").

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: datos confirmados por el propietario (correo, dirección, ciudad,
redes sociales — ver §3), `SEO_AUDIT.md` ("No implementado de forma
intencional: `LocalBusiness`: no hay ciudad ni dirección comercial
confirmada" y "Alta: Publicar una política de privacidad revisada
legalmente y enlazarla desde el formulario antes de captar datos
personales"), `docs/auditorias/01-diseno-frontend.md` (hallazgo 1.5 —
formulario sin enlace a política de privacidad; hallazgo 1.6 — footer sin
correo/teléfono corporativo visible).

## 1. Objetivo

Incorporar al sitio los datos corporativos que el propietario ya confirmó
y que las auditorías previas dejaron pendientes por falta de esa
información:

1. Centralizar correo, dirección y ciudad en `src/config/seo.ts`.
2. Añadir el schema `LocalBusiness` a los datos estructurados (antes
   omitido intencionalmente por falta de estos datos).
3. Mostrar correo y ciudad en el footer.
4. Añadir íconos de LinkedIn, TikTok e Instagram en el footer (con
   `href="#"` como placeholder — las URL reales aún no están confirmadas).
5. Crear `/politica-privacidad` como página nueva, con contenido
   estructural marcado explícitamente como borrador pendiente de revisión
   legal.
6. Enlazar esa página desde el formulario de contacto.

## 2. Fuera de alcance (explícitamente)

- No se activa la indexación de `/politica-privacidad` en buscadores
  todavía — la página se publica con `noindex` mientras el contenido no
  tenga validación de un abogado (ver §7, "Casos borde").
- No se agrega `sameAs` (perfiles sociales) al JSON-LD de `Organization` —
  las URL de redes sociales son `#` (no confirmadas); publicar `sameAs`
  con URLs placeholder sería peor que no publicarlo (Google intentaría
  asociar la organización con enlaces que no llevan a ningún perfil real).
  Mismo criterio que ya aplicó `SEO_IMPLEMENTATION.md`: "No se añadieron...
  perfiles sociales inexistentes".
- No se agregan `geo`, `openingHoursSpecification` ni `priceRange` al
  schema `LocalBusiness` — no hay datos confirmados para ninguno de los
  tres y no se inventan (mismo criterio de `SEO_IMPLEMENTATION.md`).
- No se redacta el texto legal definitivo de la política de privacidad —
  esa responsabilidad es de un abogado. Este plan solo crea el armazón
  estructural con las secciones que toda política de tratamiento de datos
  en Colombia necesita, para que el propietario tenga algo concreto que
  llevar a revisión, no un documento vacío.
- No se toca el formulario de Formspree/`PUBLIC_FORM_ENDPOINT` ni su
  lógica de envío — solo se añade un enlace de texto cerca del disclaimer
  existente.

## 3. Datos confirmados por el propietario (fuente única de verdad de este plan)

| Dato | Valor |
|---|---|
| Correo | `info@adariasystems.com` |
| Dirección | `Cra 20 # 11-94` |
| Ciudad | Cumaral |
| Departamento | Meta |
| País | Colombia (`CO`) |
| LinkedIn | pendiente de confirmar — placeholder `#` |
| TikTok | pendiente de confirmar — placeholder `#` |
| Instagram | pendiente de confirmar — placeholder `#` |

## 4. Especificación de cambios por archivo

### 4.1 `src/config/seo.ts`

Reemplazar el bloque de comentario `// Datos no publicados o no
confirmados...` (líneas 17-21) y añadir los campos nuevos al objeto
`siteConfig`:

```ts
export const siteConfig = {
  name: 'AdariA Systems',
  url: 'https://adariasystems.com',
  locale: 'es_CO',
  language: 'es-CO',
  country: 'Colombia',
  regionLabel: 'Colombia y Latinoamérica',
  description:
    'Soluciones de Industria 4.0 con visión artificial, IoT/LoRa, software y hardware a la medida para convertir datos operativos en decisiones auditables.',
  defaultImage: '/og/og-default.jpg',
  defaultImageAlt: 'AdariA Systems, soluciones tecnológicas para la Industria 4.0',
  logo: '/icons/icon-512.png',
  themeColor: '#101418',
  whatsappNumber: '573138537266',
  email: 'info@adariasystems.com',
  address: {
    street: 'Cra 20 # 11-94',
    city: 'Cumaral',
    region: 'Meta',
    countryCode: 'CO',
  },
  /** URLs reales pendientes de confirmar. Mientras sean '#', no se
   *  publican en JSON-LD (`sameAs`) — solo se usan para los íconos del
   *  footer. Reemplazar cuando el propietario las confirme. */
  social: {
    linkedin: '#',
    tiktok: '#',
    instagram: '#',
  },
} as const;

// Redes sociales: URLs reales pendientes de confirmar (ver siteConfig.social).
```

No se modifican `absoluteUrl`, `canonicalPath` ni `metaDescription` — el
plan solo añade datos al objeto, no cambia ninguna función.

### 4.2 `src/layouts/BaseLayout.astro` — schema `LocalBusiness`

En el objeto `homeJsonLd` (líneas 46-74), el nodo `Organization` (líneas
49-63) cambia de `'@type': 'Organization'` a un array de tipos que combina
`Organization` y `LocalBusiness` sobre la misma entidad — es el patrón que
recomienda Schema.org para no duplicar el nodo, y evita crear un segundo
`@id` que compita con el ya existente (`${siteConfig.url}/#organization`,
referenciado desde `WebSite.publisher` y desde el `BlogPosting.publisher`
de cada artículo — cambiar ese `@id` rompería esas referencias).

```ts
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(siteConfig.logo),
        width: 512,
        height: 512,
      },
      description: siteConfig.description,
      telephone: `+${siteConfig.whatsappNumber}`,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.countryCode,
      },
      areaServed: [siteConfig.country, 'Latinoamérica'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { '@id': `${siteConfig.url}/#organization` },
    },
  ],
};
```

Único cambio: el nodo `Organization` gana `'@type': ['Organization',
'LocalBusiness']`, `email` y `address`. El resto del archivo
(`pageJsonLd`, el `<script>` que lo renderiza, el flag `isHome`) no
cambia.

### 4.3 `src/components/layout/Footer.astro` — correo, ciudad e íconos sociales

Import nuevo: `import { siteConfig } from '../../config/seo';` (junto a
los imports existentes de `sectores`/`productos`/`servicios`).

Reemplazar la línea 19 (`<p class="mt-4 text-sm text-muted-dark">Colombia
· Latinoamérica</p>`) por ciudad + correo + fila de íconos sociales:

```astro
<p class="mt-4 text-sm text-muted-dark">
  {siteConfig.address.city}, {siteConfig.address.region} · {siteConfig.country}
</p>
<a
  href={`mailto:${siteConfig.email}`}
  class="mt-1 inline-block text-sm text-muted-dark transition-colors hover:text-on-dark"
>
  {siteConfig.email}
</a>

<div class="mt-5 flex items-center gap-3">
  <!-- TODO: reemplazar href="#" por la URL real cuando el propietario la confirme (ver siteConfig.social). -->
  <a
    href={siteConfig.social.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="AdariA Systems en LinkedIn"
    class="footer-social"
  >
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
  </a>
  <a
    href={siteConfig.social.instagram}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="AdariA Systems en Instagram"
    class="footer-social"
  >
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.87 5.87 0 0 0-2.13 1.38A5.87 5.87 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.78.72 1.44 1.38 2.13.69.66 1.35 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.13-1.38 5.87 5.87 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.13A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z"/></svg>
  </a>
  <a
    href={siteConfig.social.tiktok}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="AdariA Systems en TikTok"
    class="footer-social"
  >
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"/></svg>
  </a>
</div>
```

CSS nuevo en el `<style>` con ámbito de `Footer.astro` (junto a
`.footer-title`/`.footer-link`):

```css
.footer-social {
  @apply flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-dark transition-colors hover:border-white/25 hover:text-on-dark;
}
```

**Nota de implementación:** los tres `path` de arriba son glifos
genéricos reconocibles de cada red (el de LinkedIn ya se usa hoy en
`nosotros.astro` para los perfiles del equipo — se reutiliza el mismo
`path` para no introducir un cuarto dibujo distinto de un ícono que el
sitio ya tiene). No se garantiza que reproduzcan al pixel el asset de
marca oficial de cada red; antes de dar el paso por terminado, abrir
`/` en el navegador y confirmar visualmente que los tres íconos se leen
con nitidez a 20px. Si alguno se ve distorsionado, es preferible
sustituirlo por el SVG oficial de la librería de marca correspondiente
antes que forzar el `path` a mano.

**Además (fuera de la petición original, agregado por ser el lugar
estándar donde se espera este enlace y de bajo riesgo — revertir si no se
quiere):** añadir un enlace "Política de privacidad" a la fila inferior de
utilidades del footer (línea 53-56, junto a Nosotros/Conceptos/Blog):

```astro
<a href="/politica-privacidad" class="footer-link">Política de privacidad</a>
```

### 4.4 `src/pages/politica-privacidad.astro` — página nueva

Página estática, sin `getStaticPaths` (no es dinámica). Reutiliza
`LandingHero` (creado en el plan 001) para el hero y `.prose-adaria`
(definida en `global.css`, hoy usada por el blog) para el cuerpo del
documento — así el texto largo con encabezados, listas y párrafos hereda
la tipografía de lectura que ya existe en el sitio sin escribir CSS nuevo.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LandingHero from '../components/landing/LandingHero.astro';
import { siteConfig } from '../config/seo';

const title = 'Política de privacidad | AdariA Systems';
const description =
  'Política de tratamiento de datos personales de AdariA Systems, conforme a la Ley 1581 de 2012 de Colombia.';
---
<BaseLayout title={title} description={description} noindex={true}>
  <LandingHero
    breadcrumb={[{ label: 'Inicio', href: '/' }, { label: 'Política de privacidad' }]}
    useEyebrowComponent={true}
    eyebrowLabel="Legal"
    title="Política de privacidad"
    intro="Tratamiento de datos personales de AdariA Systems, conforme a la Ley 1581 de 2012 de Colombia."
    ctaPrimaryLabel="Hable con un experto"
    ctaPrimaryHref="/#contacto"
    gridCols="1fr"
  />

  <section class="bg-light py-16 sm:py-20">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
      <div class="rounded-2xl border border-crit/30 bg-crit/10 p-5 text-sm leading-relaxed text-on-light">
        <strong class="block text-base font-semibold text-crit">
          BORRADOR — PENDIENTE DE REVISIÓN LEGAL
        </strong>
        <p class="mt-2">
          Este documento es un armazón estructural, no el texto definitivo.
          No debe publicarse ni activarse su indexación en buscadores sin
          la validación de un abogado. Mientras este aviso esté presente,
          la página se mantiene fuera del índice de buscadores
          (<code>noindex</code>).
        </p>
      </div>

      <div class="prose-adaria mt-10">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          <strong>{siteConfig.name}</strong>, con domicilio en{' '}
          {siteConfig.address.street}, {siteConfig.address.city},{' '}
          {siteConfig.address.region}, Colombia, es responsable del
          tratamiento de los datos personales que los titulares
          suministran a través de los canales de contacto de este sitio
          web (formulario de contacto y WhatsApp).
        </p>
        <p>
          Correo de contacto para asuntos de protección de datos:{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <h2>2. Datos que se recolectan</h2>
        <p>
          A través del formulario de contacto del sitio se recolectan:
          nombre, empresa, cargo (opcional), sector, correo electrónico y
          el mensaje que el titular decida escribir. No se recolectan
          datos sensibles ni datos de menores de edad de forma deliberada.
        </p>

        <h2>3. Finalidad del tratamiento</h2>
        <p>Los datos suministrados se usan exclusivamente para:</p>
        <ul>
          <li>Responder solicitudes comerciales y de información sobre productos y servicios de AdariA Systems.</li>
          <li>Contactar al titular para agendar demostraciones o reuniones comerciales.</li>
          <li>Enviar propuestas, cotizaciones o información relacionada con la solicitud del titular.</li>
        </ul>
        <p>
          AdariA Systems no vende, alquila ni comparte los datos personales
          de los titulares con terceros para fines distintos a los aquí
          descritos, salvo obligación legal.
        </p>

        <h2>4. Derechos del titular (Ley 1581 de 2012)</h2>
        <p>
          Conforme a la Ley 1581 de 2012 y sus decretos reglamentarios, todo
          titular de datos personales tiene derecho a:
        </p>
        <ul>
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
          <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
          <li>Revocar la autorización y/o solicitar la supresión del dato, cuando no exista un deber legal o contractual que lo impida.</li>
          <li>Acceder de forma gratuita a sus datos personales tratados.</li>
        </ul>

        <h2>5. Procedimiento para ejercer estos derechos</h2>
        <p>
          El titular puede ejercer los derechos descritos en la sección
          anterior enviando una solicitud al correo{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>,
          indicando su nombre completo, el derecho que desea ejercer y una
          descripción clara de su solicitud.
        </p>
        <p>
          [BORRADOR — pendiente de confirmar con el abogado el plazo exacto
          de respuesta a consultas y reclamos conforme a la Ley 1581 de
          2012 y el Decreto 1377 de 2013.]
        </p>

        <h2>6. Vigencia</h2>
        <p>
          Esta política aplica desde su fecha de publicación y podrá
          actualizarse cuando cambien las condiciones de tratamiento de
          datos de AdariA Systems. [BORRADOR — pendiente de fecha de
          publicación definitiva tras la revisión legal.]
        </p>
      </div>
    </div>
  </section>
</BaseLayout>
```

### 4.5 `src/components/sections/Contacto.astro` — enlace a la política

Reemplazar el párrafo de disclaimer (líneas 125-127):

```astro
<p class="text-center text-xs text-muted-dark">
  Al enviar acepta que le contactemos sobre su solicitud.
</p>
```

por:

```astro
<p class="text-center text-xs text-muted-dark">
  Al enviar acepta que le contactemos sobre su solicitud, conforme a
  nuestra{' '}
  <a
    href="/politica-privacidad"
    class="font-medium text-brand-400 underline underline-offset-2 hover:text-brand-300"
  >
    política de privacidad
  </a>.
</p>
```

No se cambia nada más de `Contacto.astro` — ni el `<form>`, ni el script
de envío, ni `FORM_ENDPOINT`.

## 5. Pasos atómicos

1. Actualizar `src/config/seo.ts` con `email`, `address` y `social` (§4.1).
   Verificar que `npm run build` sigue pasando (el cambio es solo de
   datos, no debería afectar ninguna página todavía).
2. Actualizar `BaseLayout.astro` para que el nodo `Organization` del
   `homeJsonLd` incluya `LocalBusiness`, `email` y `address` (§4.2).
   Verificar en `npm run dev` → `/` → inspeccionar el
   `<script type="application/ld+json">` en el HTML y confirmar que el
   JSON es válido (sin comas colgantes, backticks bien cerrados).
3. Actualizar `Footer.astro`: ciudad + correo + 3 íconos sociales + enlace
   a política de privacidad (§4.3). Verificar visualmente en escritorio y
   móvil que los íconos se ven nítidos y alineados, y que el `mailto:`
   abre el cliente de correo del sistema al hacer clic.
4. Crear `src/pages/politica-privacidad.astro` (§4.4). Verificar
   `/politica-privacidad`: hero con breadcrumb correcto, aviso de borrador
   visible de inmediato al cargar la página (sin scroll), las 6 secciones
   con la tipografía `.prose-adaria`.
5. Actualizar `Contacto.astro` con el enlace a la política (§4.5).
   Verificar en `/` → sección de contacto → el enlace "política de
   privacidad" lleva a `/politica-privacidad`.
6. `npm run build` completo. Verificar que genera 41 páginas (40
   anteriores + `/politica-privacidad`).
7. Verificar que `/politica-privacidad` **no** aparece en
   `dist/sitemap-0.xml` (por el `noindex`, ver §7).
8. Verificar el `<meta name="robots">` de
   `dist/politica-privacidad/index.html`: debe decir
   `noindex, nofollow`.
9. Verificar el JSON-LD de `dist/index.html`: el nodo con
   `"@id":".../#organization"` debe incluir `"@type":["Organization",
   "LocalBusiness"]`, `"email":"info@adariasystems.com"` y el objeto
   `"address"` completo. Confirmar que **no** existe ninguna clave
   `"sameAs"` en ese nodo (decisión deliberada, ver §2).
10. Grep final sobre `dist/`: `Cumaral`, `info@adariasystems.com` y
    `Cra 20 # 11-94` deben aparecer al menos en `index.html` (footer) y en
    `politica-privacidad/index.html`.

## 6. Criterios de aceptación

- [ ] `npm run build` genera 41 páginas sin errores.
- [ ] `src/config/seo.ts` centraliza correo, dirección y redes sociales;
      ningún otro archivo tiene estos datos hardcodeados por fuera de
      `siteConfig`.
- [ ] El JSON-LD de la home incluye `LocalBusiness` con `address` y
      `email`, sin `sameAs` (URLs de redes sociales no confirmadas).
- [ ] El footer muestra ciudad, departamento, correo (con `mailto:`
      funcional) y 3 íconos sociales con `href="#"`, cada uno con
      `aria-label` describiendo la red.
- [ ] `/politica-privacidad` existe, con el aviso de borrador visible sin
      necesidad de scroll y las 6 secciones especificadas en §4.4.
- [ ] `/politica-privacidad` tiene `noindex, nofollow` y **no** aparece en
      el sitemap.
- [ ] El formulario de contacto enlaza a `/politica-privacidad` desde el
      texto de consentimiento existente.
- [ ] Ninguna otra sección del sitio, formulario ni comportamiento
      existente cambia (regresión cero fuera de los 5 archivos listados en
      §4).

## 7. Casos borde

### `noindex` deliberado en `/politica-privacidad`
La página se publica con `noindex={true}` mientras conserve el aviso de
borrador. Es una decisión explícita, no un olvido: el propio contenido de
la página dice "no publicar sin validación de un abogado", así que no
tiene sentido que Google la indexe y la muestre en resultados de búsqueda
como si fuera la política vigente de la empresa. Consecuencia directa: la
página **no aparecerá** en `sitemap-0.xml` (mismo mecanismo ya usado por
`/404`, confirmado en `docs/revisiones/001.md` y `SEO_AUDIT.md` — 
`@astrojs/sitemap` excluye automáticamente cualquier página con
`noindex` sin configuración adicional). **Pendiente para cuando el
abogado apruebe el texto:** quitar el aviso de borrador, quitar
`noindex={true}` de `politica-privacidad.astro`, y volver a correr
`npm run build` para confirmar que la página entra al sitemap.

### `sameAs` no se agrega a `Organization`/`LocalBusiness`
Ver §2. Las 3 URLs de redes sociales son placeholders (`#`). Publicarlas
en `sameAs` sería peor que omitirlas: Google intentaría verificar esos
enlaces como perfiles oficiales de la organización y encontraría un
`href="#"` sin destino real. **Pendiente:** en cuanto el propietario
confirme las 3 URLs reales, (1) actualizar `siteConfig.social` en
`config/seo.ts`, y (2) en ese mismo momento agregar `sameAs:
[siteConfig.social.linkedin, siteConfig.social.instagram,
siteConfig.social.tiktok]` al nodo `Organization`/`LocalBusiness` de
`BaseLayout.astro` — no antes.

### Tipo de schema: `LocalBusiness` genérico, no un subtipo más específico
Schema.org ofrece subtipos más específicos de `LocalBusiness` (por
ejemplo `ProfessionalService`). Este plan usa el tipo genérico
`LocalBusiness` porque es el que pidió explícitamente el encargo y el que
ya estaba referenciado como pendiente en `SEO_AUDIT.md` — no se introduce
una decisión de clasificación de negocio que no fue pedida. Si en el
futuro se decide que un subtipo más específico describe mejor a AdariA,
es un cambio de una sola palabra en `BaseLayout.astro` (`'@type':
['Organization', 'ProfessionalService']`, por ejemplo) y no afecta nada
más de este plan.

### Reutilización del `@id` existente de `Organization`
El nodo `Organization` actual (`${siteConfig.url}/#organization`) ya está
referenciado desde `WebSite.publisher` (`BaseLayout.astro`) y desde
`BlogPosting.publisher` en cada uno de los 17 artículos del blog
(`src/pages/blog/[...slug].astro`). Por eso el plan combina
`LocalBusiness` en el **mismo** nodo (`'@type': ['Organization',
'LocalBusiness']`) en vez de crear un nodo `LocalBusiness` aparte con su
propio `@id` — un nodo nuevo dejaría esas referencias apuntando solo a la
mitad de los datos de la empresa.

### Página nueva fuera de la navegación principal
`/politica-privacidad` no se agrega al `Header` (ni desktop ni acordeón
móvil) — no lo pidió el encargo y no es una página de navegación primaria,
es un documento legal de referencia. Queda enlazada desde el formulario de
contacto (§4.5, pedido explícitamente) y desde el footer (§4.3, agregado
por ser el lugar estándar donde se espera — ver nota de esa sección).

### Envío del formulario no depende de la política de privacidad
El enlace a `/politica-privacidad` es informativo — no se agrega un
checkbox de aceptación obligatoria ni se bloquea el envío del formulario
si el titular no visita la página. El encargo no pidió ese cambio de
comportamiento, y agregarlo unilateralmente sería una decisión legal (qué
tan explícito debe ser el consentimiento) que le corresponde al abogado
que revise la política, no a este plan.

## 8. Pendiente para un plan futuro (no bloquea este)

- Activar la indexación de `/politica-privacidad` (quitar `noindex`)
  cuando el abogado apruebe el texto definitivo.
- Agregar `sameAs` al JSON-LD cuando se confirmen las URLs reales de
  LinkedIn, TikTok e Instagram.
- Evaluar si conviene un subtipo de `LocalBusiness` más específico
  (`ProfessionalService`) una vez definida la estrategia de SEO local.
- Considerar `LocalBusiness.geo` si en algún momento se confirman
  coordenadas exactas de la oficina.
- Publicar términos y condiciones (si el negocio los requiere más
  adelante) siguiendo el mismo patrón de este plan (armazón + aviso de
  borrador + revisión legal antes de indexar).
