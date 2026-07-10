# Plan 001 — Hubs de navegación (Productos / Servicios / Sectores)

**Estado: APROBADO** — aprobado por Jhon Meche el 2026-07-10. Listo para
IMPLEMENTAR (CLAUDE.md, "Ciclo de trabajo").

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `docs/auditorias/01-diseno-frontend.md` (hallazgos 1.1, 1.2, 2.1),
`docs/auditorias/02-estructura.md` (hallazgos 2.1, 2.2), `docs/auditorias/
03-codigo.md` (hallazgos 2.1, 2.2), `SEO_AUDIT.md` ("Riesgo medio: depender
de anclas en la home limita la capacidad de posicionar páginas hub"),
`SEO_IMPLEMENTATION.md` (pendiente: "Decidir si productos, servicios y
sectores necesitan páginas hub independientes").

## 1. Objetivo

Cerrar la brecha de arquitectura de información que señalan las cuatro
auditorías: el sitio promete una jerarquía de 3 niveles (Home → categoría →
detalle) vía breadcrumbs y dropdown, pero el nivel 2 ("categoría") no existe
como página real — solo como ancla dentro de la home. Este plan:

1. Crea `/productos`, `/servicios` y `/sectores` como páginas reales,
   reutilizando las cards que ya existen en `Stack.astro`, `Servicios.astro`
   y `Sectores.astro`.
2. Reemplaza el menú móvil plano por un acordeón que liste las mismas
   landings individuales que ya ofrece el dropdown de escritorio.
3. Repunta breadcrumbs, dropdown de escritorio, footer y los CTA "ver
   todos" de las anclas de home (`/#productos`, `/#servicios`,
   `/#sectores`) a las páginas hub reales.
4. Extrae `LandingHero.astro` (hoy duplicado en 4 archivos) y
   `CrossSellCierre.astro` (hoy duplicado en 2), y de paso —porque el punto
   1 lo exige— extrae el grid de cards de cada uno de los tres archivos de
   origen a un subcomponente reutilizable por la home y por el hub nuevo.

## 2. Fuera de alcance (explícitamente, para no crecer el plan)

- No se rediseña el contenido de la home ni se elimina ninguna sección
  existente (`Stack`, `Servicios`, `Sectores` siguen renderizándose en
  `index.astro` exactamente igual que hoy, visualmente).
- No se corrige `aria-expanded`/cierre con Escape del dropdown de
  escritorio (hallazgos 4.1/4.2 de `01-diseno-frontend.md`) — queda para un
  plan de accesibilidad aparte.
- No se mueve la regla CSS `[data-reveal].card` a `global.css` (hallazgo
  2.3 de `03-codigo.md`) más allá de lo que la extracción de componentes
  arrastre de forma natural — no es objetivo de este plan limpiar esa
  duplicación en el resto del sitio.
- No se toca `Ciudades inteligentes` como posible sector (nota de
  arquitectura del `CLAUDE.md` §4) — en el hub de servicios se lista como
  un servicio más, igual que hoy.
- No se añade paginación, filtro por categoría/sector, ni buscador a los
  hubs — son páginas de listado simple, mismo nivel de interactividad que
  las secciones de home de las que provienen.

## 3. Especificación de componentes nuevos

### 3.1 `src/components/sections/ProductosGrid.astro`

Extrae el bloque de cards de `Stack.astro:22-67` (el `<div class="mt-16
grid items-stretch gap-6 lg:grid-cols-3">{productos.map(...)}</div>`
completo, tal cual, sin cambiar clases ni markup) a un componente propio.

```ts
// Sin props: importa `productos` directamente de `data/productos.ts`,
// igual que ya hace Stack.astro hoy.
```

- `Stack.astro` pasa a importar y renderizar `<ProductosGrid />` en el
  lugar donde estaba el bloque extraído. El resto de `Stack.astro`
  (`Section`, `Eyebrow`, título, intro, párrafo final "¿Necesita algo
  distinto?") no cambia.
- El nuevo `src/pages/productos/index.astro` también renderiza
  `<ProductosGrid />` (ver §4.1).

### 3.2 `src/components/sections/ServiciosGrid.astro`

Extrae el bloque de cards de "Capacidades" de `Servicios.astro:44-73` (el
`<div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{...map...}
</div>`). **No** extrae la sección oscura de "Cómo trabajamos/Metodología"
(`Servicios.astro:76-131`) — esa sigue siendo exclusiva de la home.

```ts
interface Props {
  /** Servicios a listar. Por defecto, TODOS (incluye Ciudades inteligentes). */
  items?: Servicio[]; // importar el tipo desde '../../data/servicios.ts'
}
const { items = servicios } = Astro.props; // `servicios` importado del mismo data file
```

- `Servicios.astro` (home) sigue excluyendo "Ciudades inteligentes" del
  grid de la home — pasa explícitamente
  `<ServiciosGrid items={serviciosHome} />` (reutiliza la constante
  `serviciosHome` que ya existe en `Servicios.astro:17`).
- El nuevo `src/pages/servicios/index.astro` renderiza `<ServiciosGrid />`
  sin prop `items` (usa el default: los 7 servicios completos, incluida
  Ciudades inteligentes — el hub es la página que sí debe listarlos todos).

### 3.3 `src/components/sections/SectoresGrid.astro`

Extrae de `Sectores.astro`:
- El bloque de cards + la 6ª tarjeta de invitación (`Sectores.astro:29-112`,
  el `<div class="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">...
  </div>` completo, incluida la tarjeta "¿Su industria no está aquí?").
- El `<style>` de reveal (`Sectores.astro:115-132`, la regla
  `.js [data-reveal].sector-card`).
- El `<script>` de autoplay de video (`Sectores.astro:134-178`).

```ts
// Sin props: importa `sectores` directamente de `data/sectores.ts`,
// igual que ya hace Sectores.astro hoy.
```

- La tarjeta de invitación conserva `href="#contacto"` **sin cambios**:
  ese `href` relativo funciona igual desde la home (scroll en la misma
  página) y desde `/sectores` (navega a `/#contacto` y el navegador hace
  scroll tras cargar) — no requiere prop condicional.
- `Sectores.astro` pasa a importar y renderizar `<SectoresGrid />` donde
  estaba el bloque extraído; conserva su `Section`, `Eyebrow`, título e
  intro tal cual.
- El nuevo `src/pages/sectores/index.astro` también renderiza
  `<SectoresGrid />`.

### 3.4 `src/components/landing/LandingHero.astro` (carpeta nueva `landing/`)

Unifica el hero+breadcrumb hoy duplicado en `productos/[slug].astro:62-103`,
`servicios/[slug].astro:60-103`, `sectores/[slug].astro:60-107` y
`nosotros.astro:82-112`. Las cuatro versiones difieren en: qué tipo de
badge llevan sobre el título (ícono cuadrado, punto de color, el
componente `Eyebrow` ya existente, o ninguno), si hay tagline aparte del
título, si hay un párrafo secundario además del intro, y qué va en la
columna derecha del grid (lista de puntos clave, figura de imagen, o
nada). **Importante:** `nosotros.astro:94` usa `<Eyebrow on="dark">
Nosotros</Eyebrow>` — no el badge de ícono cuadrado que sí usan producto y
servicio. `LandingHero` debe soportar los tres tipos de badge, no solo
dos; no asumir que "sin ícono" significa "sin badge".

```ts
interface BreadcrumbItem {
  label: string;
  /** Omitir en el último ítem (página actual): se renderiza sin enlace y con aria-current="page". */
  href?: string;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  /** Ícono de trazo (viewBox 0 0 24 24) para el badge cuadrado de marca (producto/servicio). No combinar con `badgeDotColor` ni `useEyebrowComponent`. */
  icon?: string;
  /** Color sólido (hex) para un badge de punto en vez de ícono cuadrado — usado por sectores (`sector.color`). No combinar con `icon` ni `useEyebrowComponent`. */
  badgeDotColor?: string;
  /** true = renderiza `<Eyebrow on="dark">{eyebrowLabel}</Eyebrow>` en vez de un badge de ícono/punto — usado por nosotros.astro y por los 3 hubs nuevos (§4). No combinar con `icon` ni `badgeDotColor`. */
  useEyebrowComponent?: boolean;
  /** Texto corto sobre el H1: categoría de producto/servicio, "Solución sectorial", "Nosotros", o el nombre de la categoría del hub ("Productos"/"Servicios"/"Soluciones por sector"). Requiere `icon`, `badgeDotColor` o `useEyebrowComponent`; si ninguno está presente, no se renderiza ningún badge. */
  eyebrowLabel?: string;
  title: string;
  /** Línea secundaria bajo el título (tagline de producto/servicio). Omitir si el título ya es la frase completa (caso sectores/nosotros/hubs). */
  tagline?: string;
  intro: string;
  /** Párrafo adicional, más pequeño, bajo `intro` (usado por sectores: campo `contexto`). */
  introSecondary?: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  /** Proporción de columnas del grid en desktop (valor arbitrario de Tailwind). Default: '1.2fr_1fr'. Usar '1fr' para hero de una sola columna (nosotros y los 3 hubs, que no pasan contenido al slot por defecto). */
  gridCols?: string;
}
```

Import interno adicional: `import Eyebrow from '../ui/Eyebrow.astro';`
(mismo componente que ya usa el resto del sitio, sin `index` — ninguno de
los 4 usos originales de este badge lleva número de sección).

Slots:
- **Slot por defecto** (`<slot />`): contenido de la columna derecha del
  grid — la `<ul>` de puntos clave (producto/servicio), la `<figure>` de
  imagen de sector, o vacío (nosotros y los 3 hubs nuevos no pasan nada:
  ver §4).
- **Slot con nombre `extra`** (`<slot name="extra" />`): contenido
  renderizado dentro del contenedor, después del `<div class="grid ...">`
  — usado solo por `servicios/[slug].astro` para `<VisualCiudades />`
  cuando `servicio.slug === 'ciudades-inteligentes'`.

Estructura interna (mover tal cual desde cualquiera de los 4 orígenes,
parametrizando lo que cambia):

```astro
<section class="relative isolate overflow-hidden bg-ink text-on-dark">
  <div class="tech-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true"></div>
  <div class="relative mx-auto max-w-6xl px-6 pb-20 pt-36 lg:px-8 lg:pt-40">
    <nav class="mb-8 flex items-center gap-2 text-sm text-muted-dark" aria-label="Ruta">
      {breadcrumb.map((item, i) => (
        <Fragment>
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.href
            ? <a href={item.href} class="transition-colors hover:text-on-dark">{item.label}</a>
            : <span class="text-on-dark" aria-current="page">{item.label}</span>}
        </Fragment>
      ))}
    </nav>

    <div class={`grid items-center gap-12 lg:grid-cols-[${gridCols ?? '1.2fr_1fr'}]`}>
      <div>
        {useEyebrowComponent && <Eyebrow on="dark">{eyebrowLabel}</Eyebrow>}
        {icon && (
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
            <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={icon} stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        )}
        {badgeDotColor && (
          <span class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase text-on-dark/80">
            <span class="h-2.5 w-2.5 rounded-full" style={`background:${badgeDotColor}`} aria-hidden="true"></span>
            {eyebrowLabel}
          </span>
        )}
        {icon && eyebrowLabel && <p class="mt-6 text-base font-semibold text-brand-400">{eyebrowLabel}</p>}
        <h1 class={`${useEyebrowComponent ? '' : 'mt-2 '}text-display font-semibold text-on-dark`}>{title}</h1>
        {tagline && <p class="mt-4 text-balance text-h2 font-semibold text-on-dark">{tagline}</p>}
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">{intro}</p>
        {introSecondary && <p class="mt-5 max-w-2xl text-sm leading-relaxed text-on-dark/72">{introSecondary}</p>}
        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={ctaPrimaryHref} variant="primary" on="dark">{ctaPrimaryLabel}</Button>
          {ctaSecondaryLabel && ctaSecondaryHref && (
            <Button href={ctaSecondaryHref} variant="secondary" on="dark">{ctaSecondaryLabel}</Button>
          )}
        </div>
      </div>
      <slot />
    </div>
    <slot name="extra" />
  </div>
</section>
```

Nota de implementación: como `title`/`icon`/`badgeDotColor` cambian la
posición relativa del `eyebrowLabel` (arriba del badge para sectores, entre
el badge y el H1 para producto/servicio), seguir exactamente la lógica
condicional de arriba — no es un descuido, es la única forma de reproducir
los 4 layouts originales sin alterar el resultado visual.

### 3.5 `src/components/landing/CrossSellCierre.astro`

Unifica el cierre "cross-sell + CTA" de `productos/[slug].astro:327-376` y
`servicios/[slug].astro:225-274`.

```ts
interface CrossSellItem {
  slug: string;
  icon: string;
  categoria: string;
  nombre: string;
  tagline?: string;
}

interface Props {
  /** '/productos/' o '/servicios/' — prefijo para construir el href de cada item y del array `items`. */
  hrefBase: '/productos' | '/servicios';
  eyebrow: string; // "Un solo aliado" | "Un equipo integral"
  title: string; // H2 completo, ya interpolado por quien llama (ej. `${producto.nombre} es parte del stack integral de AdariA.`)
  description: string;
  items: CrossSellItem[];
  /** Clases de grid-cols responsivo para el grid de items. Producto: 'sm:grid-cols-2'. Servicio: 'sm:grid-cols-2 lg:grid-cols-3'. */
  itemsGridCols: string;
  /** Muestra `item.tagline` en cada card si es true. Producto: true. Servicio: false (preserva el comportamiento actual). */
  showTagline: boolean;
  itemLinkLabel: string; // "Ver producto" | "Saber más"
  closingTitle: string;
  closingDescription: string;
  closingCtaLabel: string;
  closingCtaHref: string; // siempre '/#contacto' en los dos usos actuales
}
```

Estructura interna: idéntica a `productos/[slug].astro:328-375`, con
`otros.map(...)` reemplazado por `items.map(...)`, `href={`/productos/${o.slug}`}`
reemplazado por `href={`${hrefBase}/${item.slug}`}`, el párrafo de tagline
envuelto en `{showTagline && item.tagline && <p ...>{item.tagline}</p>}`, y
los textos de cierre tomados de las props en vez de hardcodeados.

Sitios de llamada:

- `productos/[slug].astro`, reemplazando líneas 327-376:
  ```astro
  <CrossSellCierre
    hrefBase="/productos"
    eyebrow="Un solo aliado"
    title={`${producto.nombre} es parte del stack integral de AdariA.`}
    description="Del sensor a la decisión: combínelo con el resto del stack para cubrir toda la cadena —a la medida y con dato auditable— bajo un mismo techo."
    items={otros}
    itemsGridCols="sm:grid-cols-2"
    showTagline={true}
    itemLinkLabel="Ver producto"
    closingTitle="¿Lo llevamos a su operación?"
    closingDescription={`Cuéntenos su reto y diseñamos un piloto de ${producto.nombre} a la medida de su industria.`}
    closingCtaLabel="Hable con un experto"
    closingCtaHref="/#contacto"
  />
  ```
- `servicios/[slug].astro`, reemplazando líneas 225-274:
  ```astro
  <CrossSellCierre
    hrefBase="/servicios"
    eyebrow="Un equipo integral"
    title={`${servicio.nombre} es una de nuestras capacidades.`}
    description="Del sensor a la decisión: combinamos capacidades para cubrir la cadena completa —a la medida y con dato auditable— bajo un mismo techo."
    items={otros}
    itemsGridCols="sm:grid-cols-2 lg:grid-cols-3"
    showTagline={false}
    itemLinkLabel="Saber más"
    closingTitle="¿Existe un reto técnico por resolver?"
    closingDescription="Cuéntenos su operación y diseñamos la solución a la medida —con hardware, software y datos— que de verdad necesita."
    closingCtaLabel="Hable con un experto"
    closingCtaHref="/#contacto"
  />
  ```

`sectores/[slug].astro` **no** usa este componente: su bloque de cierre
("Otros sectores" + CTA, líneas 289-320) tiene un layout de 2 columnas
distinto (texto+CTA a la izquierda, lista de sectores a la derecha, fondo
claro) — no es el mismo patrón y no se toca en este plan.

## 4. Especificación de las 3 páginas hub nuevas

Regla general de enlaces internos: **todos los `href` visibles usan la
convención ya existente en el resto del código — sin barra final**
(`/productos`, no `/productos/`), igual que ya hacen todos los enlaces a
`/sectores/${slug}`, `/productos/${slug}`, etc. `canonicalPath()`
(`config/seo.ts:27-30`) sigue normalizando con barra final automáticamente,
igual que en el resto del sitio — no requiere ningún cambio. Todas las
URLs dentro de bloques JSON-LD (`BreadcrumbList`) sí usan la forma con
barra final (`/productos/`), igual que ya hace `canonical` en cada página,
para quedar coherentes con el `<link rel="canonical">` real de la página
referenciada.

### 4.1 `src/pages/productos/index.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Section from '../../components/ui/Section.astro';
import LandingHero from '../../components/landing/LandingHero.astro';
import ProductosGrid from '../../components/sections/ProductosGrid.astro';
import Button from '../../components/ui/Button.astro';
import { absoluteUrl, canonicalPath } from '../../config/seo';

const title = 'Productos | AdariA Systems';
const description =
  'Smart PBA, AdariA Vision y AdariA Sense: el stack integral de productos de AdariA Systems para software, visión artificial y IoT industrial a la medida.';
const canonical = absoluteUrl(canonicalPath(Astro.url.pathname), Astro.site?.toString());

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: new URL('/', Astro.site).toString() },
    { '@type': 'ListItem', position: 2, name: 'Productos', item: canonical },
  ],
};
---
<BaseLayout title={title} description={description}>
  <LandingHero
    breadcrumb={[{ label: 'Inicio', href: '/' }, { label: 'Productos' }]}
    useEyebrowComponent={true}
    eyebrowLabel="Productos"
    title="Tres productos. Un solo aliado tecnológico."
    intro="Software, visión artificial y hardware IoT que trabajan juntos y se adaptan a cada operación con desarrollo a la medida."
    ctaPrimaryLabel="Hable con un experto"
    ctaPrimaryHref="/#contacto"
    gridCols="1fr"
  />

  <Section theme="dark" id="productos-grid" grid={true}>
    <ProductosGrid />
  </Section>

  <section class="relative isolate overflow-hidden bg-light py-24 text-on-light">
    <div class="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
      <h2 class="text-balance text-h1 font-semibold text-on-light">¿Listo para ver estos productos en su operación?</h2>
      <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">Cuéntenos su reto y diseñamos un piloto a la medida de su industria.</p>
      <div class="mt-9 flex justify-center">
        <Button href="/#contacto" variant="primary" on="light">Hable con un experto</Button>
      </div>
    </div>
  </section>

  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} is:inline />
</BaseLayout>
```

Nota: `LandingHero` se llama sin contenido en el slot por defecto (columna
derecha vacía) y sin `icon`, `badgeDotColor` ni `tagline` — el badge usa la
variante `useEyebrowComponent`, igual que `nosotros.astro`. El componente
debe soportar renderizar solo la columna izquierda cuando no se pasa
contenido al slot por defecto (usar `lg:grid-cols-1` efectivo vía
`gridCols="1fr"`, ver prop en §3.4). Esta misma nota aplica a los hubs de
§4.2 y §4.3.

### 4.2 `src/pages/servicios/index.astro`

Mismo patrón que 4.1, con:
- `title`: `'Servicios | AdariA Systems'`
- `description`: `'Desarrollo de software, diseño de hardware, visión artificial, IoT, integración de sistemas, analítica y ciudades inteligentes: las capacidades núcleo de AdariA Systems.'`
- `LandingHero`: `useEyebrowComponent={true}`, `eyebrowLabel="Servicios"`,
  `title="Un equipo de ingeniería integral, bajo un mismo techo."`,
  `intro="Diseñamos el hardware, capturamos el dato, entrenamos los modelos, lo integramos y lo devolvemos convertido en decisiones. Capacidades que cubren la cadena completa —del sensor a la decisión— con desarrollo a la medida."`
- Grid: `<ServiciosGrid />` (sin prop `items` → lista los 7 servicios).
- CTA final: h2 `"¿Existe un reto técnico por resolver?"`, p
  `"Cuéntenos su operación y diseñamos la solución a la medida —con hardware, software y datos— que de verdad necesita."`, botón "Hable con un experto" → `/#contacto`.
- `BreadcrumbList`: `name: 'Servicios'`.

### 4.3 `src/pages/sectores/index.astro`

Mismo patrón, con:
- `title`: `'Soluciones por sector | AdariA Systems'`
- `description`: `'Soluciones tecnológicas por industria: hidrocarburos, minería y energía, industria cárnica, manufactura, logística y bodegas, y agroindustria.'`
- `LandingHero`: `useEyebrowComponent={true}`,
  `eyebrowLabel="Soluciones por sector"`,
  `title="Ingeniería de extremo a extremo para su industria."`,
  `intro="Diseñamos hardware electrónico propio —nodos, gateways y dispositivos edge—, sensorizamos con IoT y conectividad LoRa/LoRaWAN y entrenamos modelos de visión artificial. Procesamos en el borde, integramos con ERP, PLC, básculas y SCADA y entregamos analítica predictiva con dato trazable y auditable."`
- Grid: `<SectoresGrid />`.
- CTA final: h2 `"¿Su industria no está aquí, o quiere profundizar?"`, p
  `"Revisamos su operación y proponemos un piloto acotado con métricas claras."`, botón "Hable con un experto" → `/#contacto`.
- `BreadcrumbList`: `name: 'Soluciones por sector'` (mismo label que ya usa
  el breadcrumb de cada sector individual, ver §5).

## 5. Repunte de enlaces existentes

### 5.1 Cambian (de ancla de home a hub real)

| Archivo | Línea (aprox.) | Antes | Después |
|---|---|---|---|
| `Header.astro` | 27 | `href="/#sectores"` | `href="/sectores"` |
| `Header.astro` | 41 | `href="/#productos"` | `href="/productos"` |
| `Header.astro` | 54 | `href="/#servicios"` | `href="/servicios"` |
| `Header.astro` | 88-90 | mobile-links planos | reemplazados por acordeón, ver §6 |
| `Footer.astro` | 23 | `<h3>Soluciones</h3>` | `<a href="/sectores">Soluciones</a>` |
| `Footer.astro` | 32 | `<h3>Productos</h3>` | `<a href="/productos">Productos</a>` |
| `Footer.astro` | 41 | `<h3>Servicios</h3>` | `<a href="/servicios">Servicios</a>` |
| `nosotros.astro` | 108 | `Button href="/#servicios"` | `Button href="/servicios"` |
| `conceptos.astro` | 140 | `Button href="/#productos"` | `Button href="/productos"` |
| `productos/[slug].astro` | 70 | breadcrumb `href="/#productos"` | `href="/productos"` |
| `productos/[slug].astro` | 88 | `Button href="/#productos"` | `Button href="/productos"` |
| `productos/[slug].astro` | 53 | JSON-LD `item: new URL('/#productos', ...)` | `item: new URL('/productos/', ...)` |
| `servicios/[slug].astro` | 68 | breadcrumb `href="/#servicios"` | `href="/servicios"` |
| `servicios/[slug].astro` | 86 | `Button href="/#servicios"` | `Button href="/servicios"` |
| `servicios/[slug].astro` | 51 | JSON-LD `item: new URL('/#servicios', ...)` | `item: new URL('/servicios/', ...)` |
| `sectores/[slug].astro` | 67 | breadcrumb `href="/#sectores"` | `href="/sectores"` |
| `sectores/[slug].astro` | 83 | `Button href="/#sectores"` | `Button href="/sectores"` |
| `sectores/[slug].astro` | 51 | JSON-LD `item: new URL('/#sectores', ...)` | `item: new URL('/sectores/', ...)` |

### 5.2 NO cambian (anclas internas de la propia home — dejar tal cual)

- `src/components/sections/Industria40.astro:98` — `href="#productos"`
  (enlace dentro de la home hacia la sección `Stack`, en la misma página).
- `src/components/sections/Servicios.astro:128` — `Button href="#productos"`
  (mismo caso, botón "Ver el stack de productos" dentro de la home).
- `src/components/sections/Stack.astro:71` — `href="/#servicios"`.
  **Caso borde:** está escrito con barra inicial (`/#servicios`) pero se usa
  dentro de la propia home, igual que los dos anteriores — es un scroll a
  la sección `Servicios` de la misma página, no una navegación a otra
  página. No debe apuntar al hub `/servicios` (eso convertiría un scroll
  suave en una recarga completa de página, un retroceso de UX). Cambiar
  únicamente la forma, de `/#servicios` a `#servicios`, por consistencia
  con los otros dos casos de esta lista — **no** cambiar el destino.

## 6. Menú móvil: acordeón

`src/components/layout/Header.astro`, bloque `#mobile-menu`
(líneas 82-95 actuales).

Reemplazar los 3 `<a class="mobile-link">` de Soluciones/Productos/
Servicios por 3 `<details>` (HTML nativo, sin JS adicional — el navegador
maneja expandir/colapsar y el estado es accesible por teclado y lector de
pantalla sin atributos ARIA manuales):

```astro
<div class="space-y-1 px-6 py-4">
  <details class="mobile-accordion">
    <summary class="mobile-link mobile-accordion-summary">
      Soluciones
      <svg class="mobile-accordion-chevron h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </summary>
    <div class="mobile-accordion-panel">
      <a href="/sectores" class="mobile-sublink mobile-sublink-all">Ver todos los sectores</a>
      {sectores.map((s) => (
        <a href={`/sectores/${s.slug}`} class="mobile-sublink">{s.nombre}</a>
      ))}
    </div>
  </details>

  <details class="mobile-accordion">
    <summary class="mobile-link mobile-accordion-summary">
      Productos
      <svg class="mobile-accordion-chevron h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </summary>
    <div class="mobile-accordion-panel">
      <a href="/productos" class="mobile-sublink mobile-sublink-all">Ver todos los productos</a>
      {productos.map((p) => (
        <a href={`/productos/${p.slug}`} class="mobile-sublink">{p.nombre}</a>
      ))}
    </div>
  </details>

  <details class="mobile-accordion">
    <summary class="mobile-link mobile-accordion-summary">
      Servicios
      <svg class="mobile-accordion-chevron h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </summary>
    <div class="mobile-accordion-panel">
      <a href="/servicios" class="mobile-sublink mobile-sublink-all">Ver todos los servicios</a>
      {servicios.map((s) => (
        <a href={`/servicios/${s.slug}`} class="mobile-sublink">{s.nombre}</a>
      ))}
    </div>
  </details>

  <a href="/blog" class="mobile-link">Blog</a>
  <a href="/nosotros" class="mobile-link">Nosotros</a>
  <a href="/#contacto" class="mobile-link">Contacto</a>
</div>
```

CSS nuevo dentro del `<style>` con ámbito de `Header.astro` (junto a
`.mobile-link` existente):

```css
.mobile-accordion-summary {
  @apply flex cursor-pointer list-none items-center justify-between;
}
.mobile-accordion-summary::-webkit-details-marker {
  display: none;
}
.mobile-accordion-chevron {
  @apply text-on-dark/60 transition-transform duration-200;
}
.mobile-accordion[open] .mobile-accordion-chevron {
  @apply rotate-180;
}
.mobile-accordion-panel {
  @apply space-y-0.5 py-1 pl-4;
}
.mobile-sublink {
  @apply block rounded-md px-2 py-2 text-sm text-on-dark/75 transition-colors hover:bg-white/5 hover:text-on-dark;
}
.mobile-sublink-all {
  @apply font-semibold text-brand-400;
}
```

No se requiere ningún cambio en el `<script>` existente del menú móvil: el
listener `menu?.querySelectorAll('a').forEach(...)` (que cierra el menú al
hacer clic en cualquier enlace) ya opera sobre `querySelectorAll('a')`, así
que capta automáticamente los nuevos `.mobile-sublink` sin modificación.

## 7. Pasos atómicos

Ejecutar en este orden — cada paso debe compilar (`npm run build`) antes de
pasar al siguiente.

1. Crear `src/components/sections/ProductosGrid.astro` (§3.1). Modificar
   `Stack.astro` para usarlo. Verificar visualmente que la home no cambió
   (`npm run dev`, revisar sección "El stack integral").
2. Crear `src/components/sections/ServiciosGrid.astro` (§3.2). Modificar
   `Servicios.astro` para usarlo con `items={serviciosHome}`. Verificar
   que la home sigue mostrando 6 cards (sin Ciudades inteligentes).
3. Crear `src/components/sections/SectoresGrid.astro` (§3.3), moviendo
   también el `<style>` de `.sector-card` y el `<script>` de autoplay de
   video. Modificar `Sectores.astro` para usarlo. Verificar que la home
   sigue mostrando 5 sectores + tarjeta de invitación, y que el video de
   fondo de Hidrocarburos sigue autoreproduciéndose al hacer scroll.
4. Crear la carpeta `src/components/landing/` y el componente
   `LandingHero.astro` (§3.4).
5. Migrar `productos/[slug].astro` para usar `<LandingHero>` en vez de su
   bloque de hero actual, pasando la `<ul>` de puntos clave dentro del slot
   por defecto. Verificar las 3 páginas de producto una por una
   (`/productos/smart-pba`, `/productos/adaria-vision`,
   `/productos/adaria-sense`) contra su versión anterior (captura antes/
   después o comparación visual manual).
6. Migrar `servicios/[slug].astro` de la misma forma, pasando la `<ul>` de
   puntos clave al slot por defecto y `<VisualCiudades />` al slot
   `extra` (solo se renderiza cuando `servicio.slug === 'ciudades-
   inteligentes'`, la condición se mantiene en el sitio de llamada, no
   dentro de `LandingHero`). Verificar las 7 páginas de servicio,
   especialmente `/servicios/ciudades-inteligentes` (debe seguir
   mostrando `VisualCiudades` en el mismo lugar).
7. Migrar `sectores/[slug].astro` de la misma forma, pasando `icon`
   omitido, `badgeDotColor={sector.color}`, `eyebrowLabel="Solución
   sectorial"`, `introSecondary={d.contexto}`, `gridCols="1.08fr_0.92fr"`,
   y la `<figure>` de imagen (`sector.imagen`, siempre estática — el video
   de fondo de Hidrocarburos solo existe en las cards del grid, ahora
   `SectoresGrid`, no en el hero de la landing individual) dentro del slot
   por defecto. Verificar las 5 páginas de sector.
8. Migrar `nosotros.astro` de la misma forma, con
   `useEyebrowComponent={true}`, `eyebrowLabel="Nosotros"`, sin `icon`, sin
   `badgeDotColor`, sin `tagline`, sin slot por defecto (el hero actual de
   `nosotros.astro` no tiene columna derecha ni grid — usar
   `gridCols="1fr"`). Verificar `/nosotros`.
9. Crear `src/components/landing/CrossSellCierre.astro` (§3.5).
10. Migrar `productos/[slug].astro` para usar `<CrossSellCierre>` con los
    props de §3.5. Verificar las 3 páginas de producto de nuevo.
11. Migrar `servicios/[slug].astro` para usar `<CrossSellCierre>` con
    `showTagline={false}`. Verificar las 7 páginas de servicio de nuevo.
12. Crear `src/pages/productos/index.astro` (§4.1). Verificar `/productos`
    en dev: hero, grid de 3 productos, CTA final.
13. Crear `src/pages/servicios/index.astro` (§4.2). Verificar `/servicios`:
    debe mostrar 7 cards, incluida Ciudades inteligentes.
14. Crear `src/pages/sectores/index.astro` (§4.3). Verificar `/sectores`:
    5 cards + tarjeta de invitación.
15. Repuntar todos los enlaces de la tabla §5.1, uno por archivo. Dejar
    intactos los tres casos de §5.2 (solo normalizar `Stack.astro:71` de
    `/#servicios` a `#servicios`, sin cambiar destino).
16. Implementar el acordeón del menú móvil (§6) en `Header.astro`.
    Verificar en un viewport móvil (DevTools, ≤1023px): abrir cada
    acordeón, confirmar que lista los sectores/productos/servicios reales,
    que el chevron rota, y que tocar cualquier enlace cierra el menú
    completo.
17. `npm run build` completo. Verificar que genera 40 páginas (37
    anteriores + 3 hubs nuevas) sin errores ni warnings nuevos.
18. Revisar `dist/sitemap-0.xml` (o el sitemap que corresponda) y confirmar
    que incluye `https://adariasystems.com/productos/`,
    `.../servicios/` y `.../sectores/`.
19. Revisar el `<link rel="canonical">` de los 3 `dist/{productos,
    servicios,sectores}/index.html` generados: deben ser
    `https://adariasystems.com/productos/`, `.../servicios/`,
    `.../sectores/` (con barra final).
20. Grep final sobre `src/` de `href="/#productos"`, `href="/#servicios"`,
    `href="/#sectores"` — no debe haber ninguna coincidencia (todas
    migradas o normalizadas según §5).

## 8. Criterios de aceptación

- [ ] `npm run build` genera 40 páginas sin errores.
- [ ] `/productos`, `/servicios`, `/sectores` existen, cada una con `<h1>`
      único, `<title>` y `meta description` propios (no copiados de la
      home ni entre sí).
- [ ] Cada hub reutiliza el grid de cards correspondiente
      (`ProductosGrid`/`ServiciosGrid`/`SectoresGrid`) — mismas cards,
      mismos estilos, mismo comportamiento (hover, reveal al scroll) que en
      la home.
- [ ] `/servicios` lista los 7 servicios (incluida Ciudades inteligentes);
      la home sigue mostrando solo 6.
- [ ] La home (`/`) se ve visualmente idéntica a antes del cambio en las
      secciones Stack/Servicios/Sectores (mismas cards, mismo orden, mismo
      comportamiento de scroll/hover/video).
- [ ] El dropdown de escritorio (Header) sigue mostrando los enlaces
      individuales a cada landing; el enlace disparador ("Soluciones" /
      "Productos" / "Servicios") navega al hub correspondiente al hacer
      clic.
- [ ] El menú móvil tiene 3 acordeones (`<details>`) que, al abrirse,
      listan las mismas landings que el dropdown de escritorio más un
      enlace "Ver todos los X" al hub.
- [ ] Ningún `href` visible en `src/` apunta a `/#productos`, `/#servicios`
      ni `/#sectores` (paso 20).
- [ ] Los 3 breadcrumbs `BreadcrumbList` (JSON-LD) de las páginas hub y los
      15 `BreadcrumbList` de las landings de detalle resuelven URLs válidas
      (sin 404) al nivel "categoría".
- [ ] `sitemap-index.xml`/`sitemap-0.xml` incluye las 3 URLs nuevas sin
      cambios en `astro.config.mjs`.
- [ ] `LandingHero` y `CrossSellCierre` no introducen ninguna clase o
      estilo nuevo — todas las clases Tailwind usadas ya existían en los
      archivos de origen.
- [ ] Revisión manual en móvil (≤1023px) y escritorio de las 3 páginas hub
      y de una landing de cada tipo (producto/servicio/sector) migrada a
      `LandingHero`.

## 9. Casos borde

### SEO: canonical
`canonicalPath()` (`config/seo.ts:27-30`) normaliza cualquier pathname
distinto de `/` agregando barra final. Como las 3 páginas nuevas son
`src/pages/{productos,servicios,sectores}/index.astro` —el mismo patrón que
ya usa `src/pages/blog/index.astro`, que hoy genera correctamente
`https://adariasystems.com/blog/` como canonical (confirmado en
`SEO_AUDIT.md`)—, no se requiere ningún cambio en `BaseHead.astro`,
`BaseLayout.astro` ni `config/seo.ts`. Verificar igualmente en el paso 19
para no asumirlo sin comprobar.

### SEO: sitemap
`@astrojs/sitemap` (`astro.config.mjs:15`, `sitemap()` sin opciones) escanea
el HTML generado y excluye automáticamente las páginas con
`<meta name="robots" content="noindex...">` — así es como hoy excluye
`/404` sin configuración adicional (confirmado en `SEO_AUDIT.md`: "36 URLs
indexables... la 404 no está incluida"). Como las 3 páginas hub usan
`BaseLayout` con `noindex` en su valor por defecto (`false`), quedarán
incluidas automáticamente sin tocar `astro.config.mjs`. Verificar en el
paso 18.

### SEO: contenido duplicado
El texto de `LandingHero` en cada hub (título + intro) se reutiliza
**verbatim** del `<h2>`/`<p>` que ya existe hoy en `Stack.astro`,
`Servicios.astro` y `Sectores.astro` dentro de la home. Esto significa que,
tras este plan, ese mismo párrafo aparece dos veces en el sitio (una vez
en `/` como `<h2>`/`<p>` de sección, otra en `/productos` como `<h1>`/`<p>`
de página). No es contenido duplicado en el sentido que penaliza SEO
(títulos y meta descriptions de ambas páginas son distintos —la home
mantiene su propio `title`/`description` en `index.astro:19-21`—, y Google
no penaliza que un mismo párrafo de marketing aparezca en dos páginas del
mismo sitio), pero se documenta aquí para que quede como decisión
consciente, no accidente.

### Trailing slash en `href` vs. `canonicalPath()`
Los enlaces visibles (`<a href="/productos">`) se escriben sin barra final,
seleccionado por consistencia con el 100% de los enlaces internos ya
existentes en el código (`/sectores/${s.slug}`, `/productos/${p.slug}`,
etc., ninguno de los cuales usa barra final). El navegador resuelve
`/productos` y `/productos/` a la misma página HTML en cualquier hosting
estático estándar (Netlify, Vercel, GitHub Pages); el `<link
rel="canonical">` real de la página (con barra final, vía
`canonicalPath()`) es la señal que usan los buscadores para deduplicar, no
el `href` del enlace entrante. No requiere redirecciones adicionales.

### Enlaces internos de la propia home (§5.2)
Ya cubierto en detalle en §5.2 — los 3 casos de scroll dentro de la home
(`Industria40.astro:98`, `Servicios.astro:128`, `Stack.astro:71`) se dejan
apuntando a la sección de la misma página, no al hub. Repuntarlos al hub
sería un regresión de UX (cambia un scroll suave por una recarga completa
de página) que ninguna de las cuatro auditorías pidió corregir.

### Ciudades inteligentes en el hub de servicios
`Servicios.astro` (home) excluye "Ciudades inteligentes" del grid
deliberadamente (`serviciosHome`, línea 17) para mantener un grid de 6
cards en la home. El hub `/servicios`, en cambio, **debe** listar los 7
servicios reales — es la página cuyo propósito es mostrar el catálogo
completo. Esto ya está resuelto por el prop `items` opcional de
`ServiciosGrid` (§3.2): no requiere ninguna decisión adicional del
desarrollador, solo no pasar el prop en el hub.

### `VisualCiudades` en el slot `extra` de `LandingHero`
La condición `servicio.slug === 'ciudades-inteligentes'` que hoy envuelve
`<VisualCiudades />` (`servicios/[slug].astro:101`) se mantiene en el sitio
de llamada (`servicios/[slug].astro`), no dentro de `LandingHero.astro` —
el componente no debe conocer el concepto "Ciudades inteligentes"; solo
expone un slot genérico `extra` que quien lo usa decide cuándo llenar.

### Grid de una sola columna en los hubs
`LandingHero` en los 3 hubs se llama sin contenido en el slot por defecto
(columna derecha vacía). El prop `gridCols="1fr"` (o equivalente) debe
producir un layout de una sola columna en desktop en vez de un grid de 2
columnas con un hueco vacío a la derecha — confirmar visualmente en el
paso 12-14 que el texto del hero no queda descentrado ni con espacio en
blanco extraño a la derecha.

## 10. Pendiente para un plan futuro (no bloquea este)

- Añadir `aria-expanded` real y cierre con Escape a los dropdowns de
  escritorio (hallazgos 4.1/4.2 de `01-diseno-frontend.md`).
- Mover `.js [data-reveal].card` a una única regla en `global.css`
  (hallazgo 2.3 de `03-codigo.md`).
- Evaluar filtro por categoría/tag en `/blog` (hallazgo 3.6 de
  `02-estructura.md`) — mismo espíritu de este plan (convertir un listado
  plano en una IA navegable), pero con su propio alcance.
- Decidir si "Ciudades inteligentes" migra de `data/servicios.ts` a
  `data/sectores.ts` (nota de arquitectura abierta en `CLAUDE.md` §4).
