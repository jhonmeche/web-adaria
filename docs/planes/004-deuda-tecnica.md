# Plan 004 — Deuda técnica: CSS de reveal duplicado e íconos SVG repetidos

**Estado: APROBADO** — aprobado por Jhon Meche el 2026-07-10. Listo para
IMPLEMENTAR (CLAUDE.md, "Ciclo de trabajo").

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `docs/auditorias/03-codigo.md` (hallazgo 2.3 — regla
`[data-reveal].card` duplicada en 12 archivos; hallazgo 2.4 — íconos de
check y flecha sin componentizar, con impacto medido en peso de HTML,
hallazgo 4.3).

**Nota de partida — los números cambiaron desde la auditoría original:**
`03-codigo.md` se escribió antes de los planes 001-003, que crearon
archivos nuevos (`ProductosGrid.astro`, `SectoresGrid.astro`,
`ServiciosGrid.astro`, `LandingHero.astro`, `CrossSellCierre.astro`) y
movieron código existente. Este plan se basa en un reconteo hecho hoy
sobre el estado actual del repositorio, no en los números literales del
informe original. Los conteos y la lista de archivos de este documento
son la fuente de verdad; donde difieren de `03-codigo.md`, prevalece este
plan.

## 1. Objetivo

Refactor puro (sin cambios de contenido, layout ni comportamiento):

1. Mover la regla CSS `.js [data-reveal].card` / `.js [data-reveal].card.is-visible`
   —hoy duplicada de forma idéntica en 9 archivos— a `src/styles/global.css`,
   y eliminar las 9 copias locales.
2. Crear `CheckIcon.astro` y `ArrowIcon.astro` en `src/components/ui/` y
   reemplazar con ellos las 11 instancias del ícono de check y las 17 del
   ícono de flecha que son markup SVG standalone repetido (ver §3 para las
   exclusiones justificadas).

## 2. Fuera de alcance (explícitamente)

- **No todas las apariciones de la regla `.card` son idénticas.** De los
  12 archivos que contienen la cadena `[data-reveal].card`, **3 tienen una
  variante con valores distintos** (duración, offset o propiedades de
  transición diferentes) y **no se tocan en este plan**:
  `src/components/sections/Servicios.astro` (falta la propiedad `translate`
  en la transición), `src/components/conceptos/MapaPipeline.astro` y
  `src/pages/conceptos.astro` (duración `0.3s`/`0.6s` y `translateY(20px)`
  en vez de `0.35s`/`0.7s`/`22px`). Consolidarlas junto con las 9 idénticas
  cambiaría su comportamiento visual real, violando la premisa de este
  plan ("refactor puro"). Quedan exactamente como están.
- **No todas las apariciones de los paths de ícono son markup SVG
  reemplazable por un componente:**
  - `src/components/conceptos/VisualDatos.astro:35` usa el mismo `path`
    del check como **valor de un string dentro de un array de datos**
    (`icon: 'M4 10.5 8 14l8-8.5'`), consumido dinámicamente junto con
    otros paths distintos (alerta, advertencia) por un único `<path
    d={evento.icon}>` genérico más abajo en el archivo. No hay un
    `<svg>` standalone que reemplazar ahí — es una coincidencia de
    contenido, no una duplicación de markup. Se deja fuera de este plan.
  - `src/components/conceptos/VisualLora.astro:62` y
    `src/components/conceptos/VisualVision.astro:56` usan el path de la
    flecha como parte de un `<svg>` compuesto que también contiene un
    `<circle>` hermano (el "paquete" animado que recorre la flecha). Un
    componente `ArrowIcon` que renderiza solo `<svg><path/></svg>` no
    puede reproducir ese `<circle>` adicional sin agregarle una API de
    slot solo para 2 usos — no vale la pena la complejidad para este
    plan. Se dejan como están.
- No se crea un sprite SVG (`<symbol>`/`<use>`) ni se reduce el peso del
  HTML generado — eso es un cambio de arquitectura distinto (ya anotado
  como posible mejora futura en `03-codigo.md`, hallazgo 4.3) que sí
  cambiaría el HTML resultante, algo que este plan evita deliberadamente
  (ver §4 para la justificación completa). `CheckIcon`/`ArrowIcon` son
  componentes Astro normales: se expanden en tiempo de build al mismo
  `<svg>` inline que ya existe hoy, ni una etiqueta distinta.
- No se tocan otras reglas de reveal con nombres de clase distintos que
  siguen el mismo patrón visual (`.pilar`, `.step`, `.hito`,
  `.sector-card`, `.concept-card`, `.service-card`) — el hallazgo 2.3 solo
  señala `.card`; unificar también esas otras variantes es una
  oportunidad real pero un plan aparte, con su propio análisis de cuáles
  son realmente idénticas entre sí.
- No se cambia ningún otro ícono del sitio (los que no son exactamente
  estos 2 paths).

## 3. Parte 1 — CSS: regla `[data-reveal].card`

### 3.1 Los 9 archivos con la regla idéntica (la que sí se mueve)

Verificado carácter por carácter (no solo por nombre de archivo):

```css
.js [data-reveal].card {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
    translate 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}
.js [data-reveal].card.is-visible {
  opacity: 1;
  transform: none;
}
```

| # | Archivo | Línea aprox. | ¿Todo el `<style>` es solo esta regla? |
|---|---|---|---|
| 1 | `src/components/sections/Contacto.astro` | 165-178 | No — tiene `.form-label`/`.form-input` antes |
| 2 | `src/components/sections/PorQue.astro` | 77-90 | **Sí — el `<style>` completo se elimina** |
| 3 | `src/components/sections/Problema.astro` | 75-88 | **Sí — el `<style>` completo se elimina** |
| 4 | `src/components/sections/Stack.astro` | 34-47 | **Sí — el `<style>` completo se elimina** |
| 5 | `src/components/servicios/RiesgoUrbano.astro` | 189-202 | No — tiene la animación `.risk-pulse` antes |
| 6 | `src/pages/nosotros.astro` | 310-323 | No — tiene la regla `[data-reveal]:not(.card)` después, no tocar |
| 7 | `src/pages/productos/[slug].astro` | 329-342 | No — tiene el shimmer `.mock::after` después |
| 8 | `src/pages/sectores/[slug].astro` | 318-331 | No — tiene `.sector-hero` antes |
| 9 | `src/pages/servicios/[slug].astro` | 228-241 | **Sí — el `<style>` completo se elimina** |

### 3.2 Cambio en `src/styles/global.css`

Agregar después de la regla base `[data-reveal]` existente (después de la
línea 152, cierre del bloque `@media (prefers-reduced-motion:
no-preference)` que empieza en la línea 141) — **fuera** de ese `@media`,
igual que están hoy las 9 copias locales (el `@media (prefers-reduced-motion:
reduce)` general de las líneas 154-163 ya neutraliza esta transición sin
necesidad de repetir la condición aquí):

```css
/* Reveal de tarjetas ("card"): mismo patrón que [data-reveal] de arriba,
   con desplazamiento algo mayor (22px) y transición de hover propia
   (translate/box-shadow/border-color) para que la entrada y el
   levantamiento al pasar el mouse no se pisen. Antes vivía duplicada,
   carácter por carácter, en 9 archivos — ver docs/auditorias/03-codigo.md
   hallazgo 2.3 y docs/planes/004-deuda-tecnica.md. */
.js [data-reveal].card {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
    translate 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}
.js [data-reveal].card.is-visible {
  opacity: 1;
  transform: none;
}
```

## 4. Parte 2 — Componentes `CheckIcon.astro` y `ArrowIcon.astro`

### 4.1 Por qué un componente Astro normal, no un sprite `<symbol>`/`<use>`

Un sprite reduciría el peso del HTML (el hallazgo 4.3 de `03-codigo.md`
mide 96 SVG inline = 18% del HTML de la home), pero **cambiaría el HTML
resultante** (`<path d="...">` pasaría a ser `<use href="#icon-check">`),
lo que contradice el encargo explícito de este plan ("sin alterar el HTML
resultante"). Un componente Astro normal no tiene ese problema: Astro lo
expande en tiempo de build al mismo `<svg>...</svg>` que ya existe hoy —
el HTML final es, byte a byte, indistinguible de escribirlo a mano en
cada sitio. La ganancia de este plan es solo de mantenimiento (un lugar
para editar el ícono), no de peso de página — esa es una mejora distinta,
ya anotada como pendiente futura en `03-codigo.md`.

### 4.2 `src/components/ui/CheckIcon.astro` (nuevo)

```astro
---
// Ícono de trazo "check" (viewBox 0 0 20 20 por defecto). Antes repetido
// a mano en 11 sitios — ver docs/planes/004-deuda-tecnica.md.
interface Props {
  class?: string;
  viewBox?: string;
  style?: string;
}
const { class: className = '', viewBox = '0 0 20 20', style } = Astro.props;
---
<svg class={className} viewBox={viewBox} fill="none" aria-hidden="true" style={style}>
  <path d="M4 10.5 8 14l8-8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

### 4.3 `src/components/ui/ArrowIcon.astro` (nuevo)

```astro
---
// Ícono de trazo "flecha" (viewBox 0 0 20 20, fijo — ninguna de las 17
// instancias reemplazadas usa otro). Antes repetido a mano — ver
// docs/planes/004-deuda-tecnica.md.
interface Props {
  class?: string;
  strokeWidth?: string;
}
const { class: className = 'h-4 w-4', strokeWidth = '2' } = Astro.props;
---
<svg class={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

### 4.4 Regla general de reemplazo

En cada sitio, sustituir el bloque `<svg>...</svg>` completo por
`<CheckIcon ... />` o `<ArrowIcon ... />`, con exactamente los mismos
valores de `class` (y `viewBox`/`style`/`strokeWidth` cuando difieran del
valor por defecto) que ya tenía ese `<svg>`. Agregar el `import` del
componente en el frontmatter de cada archivo
(`import CheckIcon from '.../components/ui/CheckIcon.astro';` con la ruta
relativa correcta según la profundidad del archivo). Los atributos
`viewBox="0 0 20 20"`, `fill="none"`, `aria-hidden="true"`,
`stroke="currentColor"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
y el propio `d` del path **no se declaran en el sitio de uso** — viven
fijos dentro del componente.

### 4.5 Ícono de check — 11 instancias en 6 archivos

Todas usan `stroke-width="2"` (no varía, ya está fijo en el componente).
`viewBox` es `"0 0 20 20"` salvo las 2 filas marcadas.

| Archivo | Línea aprox. | `class` a pasar | Otros props |
|---|---|---|---|
| `src/components/sections/CalidadDato.astro` | 33 | `mt-0.5 h-4.5 w-4.5 shrink-0 text-brand` | — |
| `src/components/sections/ProductosGrid.astro` | 37 | `mt-0.5 h-4 w-4 shrink-0 text-brand-400` | — |
| `src/pages/nosotros.astro` | 149 | `mt-0.5 h-5 w-5 shrink-0 text-brand` | — |
| `src/pages/productos/[slug].astro` | 80 | `mt-0.5 h-5 w-5 shrink-0 text-brand-400` | — |
| `src/pages/productos/[slug].astro` | 109 | `mt-0.5 h-4 w-4 shrink-0 text-brand` | — |
| `src/pages/productos/[slug].astro` | 229 | `mt-0.5 h-4 w-4 shrink-0` | `style="color:var(--sector)"` |
| `src/pages/productos/[slug].astro` | 287 | `h-5 w-5` | `viewBox="0 0 24 24"` |
| `src/pages/sectores/[slug].astro` | 142 | `mt-0.5 h-4 w-4 shrink-0` | `style="color:var(--sector)"` |
| `src/pages/sectores/[slug].astro` | 205 | `h-5 w-5` | `viewBox="0 0 24 24"` |
| `src/pages/servicios/[slug].astro` | 78 | `mt-0.5 h-5 w-5 shrink-0 text-brand-400` | — |
| `src/pages/servicios/[slug].astro` | 112 | `mt-0.5 h-4 w-4 shrink-0 text-brand` | — |

Ejemplo concreto (`productos/[slug].astro:229`, antes/después):

```astro
<!-- antes -->
<svg class="mt-0.5 h-4 w-4 shrink-0" style="color:var(--sector)" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5 8 14l8-8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- después -->
<CheckIcon class="mt-0.5 h-4 w-4 shrink-0" style="color:var(--sector)" />
```

### 4.6 Ícono de flecha — 17 instancias en 14 archivos

`viewBox` es siempre `"0 0 20 20"` (fijo en el componente, no se pasa).
`strokeWidth` es `"2"` salvo las 3 filas marcadas con `"2.2"`.

| Archivo | Línea aprox. | `class` a pasar | `strokeWidth` |
|---|---|---|---|
| `src/components/blog/PostCard.astro` | 66 | `h-4 w-4` | — |
| `src/components/conceptos/MapaPipeline.astro` | 77 | `h-4 w-4` | `2.2` |
| `src/components/conceptos/VisualHardware.astro` | 80 | `hw-arrow h-3.5 w-3.5` | `2.2` |
| `src/components/landing/CrossSellCierre.astro` | 85 | `h-4 w-4` | — |
| `src/components/sections/CasoSmartPBA.astro` | 41 | `h-4 w-4` | — |
| `src/components/sections/Contacto.astro` | 125 | `h-4 w-4` | — |
| `src/components/sections/Hero.astro` | 144 | `h-4 w-4 text-brand-400 transition-transform group-hover:translate-x-0.5` | — |
| `src/components/sections/ProductosGrid.astro` | 49 | `h-4 w-4` | — |
| `src/components/sections/SectoresGrid.astro` | 65 | `h-4 w-4` | — |
| `src/components/sections/SectoresGrid.astro` | 87 | `h-4 w-4` | — |
| `src/components/sections/ServiciosGrid.astro` | 40 | `h-4 w-4` | — |
| `src/components/sections/Solucion.astro` | 88 | `arrow-nudge h-4 w-4` | `2.2` |
| `src/components/ui/Button.astro` | 34 | `h-4 w-4` | — |
| `src/pages/blog/[...slug].astro` | 64 | `h-4 w-4 rotate-180` | — |
| `src/pages/sectores/[slug].astro` | 241 | `h-4 w-4` | — |
| `src/pages/sectores/[slug].astro` | 264 | `h-4 w-4` | — |
| `src/pages/sectores/[slug].astro` | 299 | `h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1` | — |

`src/components/ui/Button.astro` es el único caso donde el ícono vive
dentro de otro componente de marca (no una página/sección): al
reemplazarlo, `Button.astro` sigue decidiendo *si* se muestra (solo en
`variant === 'primary'`, lógica ya existente, no se toca) — solo cambia
qué renderiza en ese `{variant === 'primary' && (...)}`, de un `<svg>` a
un `<ArrowIcon class="h-4 w-4" />`.

## 5. Pasos atómicos (agrupados en lotes pequeños)

Cada lote termina en un `npm run build` verificable antes de pasar al
siguiente — no encadenar lotes sin confirmar que el anterior compiló y
comparó limpio, mismo motivo por el que el plan 001 tuvo que corregirse
dos veces.

### Lote 0 — Referencia "antes" (no toca código)

1. Con el repo en su estado actual (antes de cualquier cambio de este
   plan), correr `npm run build` y copiar la carpeta `dist/` completa a
   una ubicación fuera del repo (o usar `git stash`/una rama de
   comparación) como referencia "antes". Esta referencia se usa en los
   Lotes 3 y 7 para diff — no se commitea, es solo para verificación
   local de esta sesión.

### Lote 1 — CSS: agregar la regla global

2. Agregar el bloque de §3.2 a `src/styles/global.css`.
3. `npm run build`. Debe compilar sin errores (en este punto la regla
   está duplicada: existe en `global.css` Y en los 9 archivos — es
   intencional y transitorio, el CSS duplicado no rompe nada, solo es
   redundante por un momento).

### Lote 2 — CSS: quitar las 9 copias locales, en 3 sub-lotes de 3

4. Sub-lote 2a: quitar la regla de `Contacto.astro`, `PorQue.astro`,
   `Problema.astro` (según la tabla de §3.1 — los dos últimos pierden el
   `<style>` completo). `npm run build`.
5. Sub-lote 2b: quitar la regla de `Stack.astro`, `RiesgoUrbano.astro`,
   `nosotros.astro`. `npm run build`.
6. Sub-lote 2c: quitar la regla de `productos/[slug].astro`,
   `sectores/[slug].astro`, `servicios/[slug].astro`. `npm run build`.

### Lote 3 — CSS: verificación

7. Comparar el HTML/CSS generado en `dist/` contra la referencia del
   Lote 0 para las 9 páginas afectadas (home, `/nosotros`, `/conceptos`
   no debería cambiar —tiene su propia variante, fuera de alcance—, las
   landings de producto/servicio/sector, `/`). El CSS debe producir el
   mismo resultado computado (las clases `.js [data-reveal].card` y
   `.card.is-visible` deben seguir aplicando las mismas propiedades,
   ahora servidas desde el bundle global en vez de un bundle por
   componente). Confirmar visualmente en `npm run dev` que las tarjetas
   siguen apareciendo con el mismo efecto de scroll en al menos una
   página de cada tipo.
8. `grep -rn "\[data-reveal\]\.card" src/` debe devolver únicamente
   `src/styles/global.css` y los 3 archivos excluidos de §2
   (`Servicios.astro`, `MapaPipeline.astro`, `conceptos.astro`) — ninguna
   otra coincidencia.

### Lote 4 — Íconos: crear los componentes

9. Crear `src/components/ui/CheckIcon.astro` (§4.2).
10. Crear `src/components/ui/ArrowIcon.astro` (§4.3).
11. `npm run build`. Debe compilar sin errores aunque todavía nada los
    importe (componentes sin uso no rompen el build de Astro).

### Lote 5 — Ícono de check (6 archivos, 11 instancias)

12. Reemplazar en `CalidadDato.astro`, `ProductosGrid.astro`,
    `nosotros.astro` (3 archivos, 1 instancia cada uno). `npm run build`.
13. Reemplazar las 4 instancias de `productos/[slug].astro`.
    `npm run build`.
14. Reemplazar en `sectores/[slug].astro` (2 instancias) y
    `servicios/[slug].astro` (2 instancias). `npm run build`.
15. Verificación: `grep -rn "M4 10.5 8 14l8-8.5" src/` debe devolver
    únicamente `src/components/ui/CheckIcon.astro` y
    `src/components/conceptos/VisualDatos.astro` (excluido, ver §2).

### Lote 6 — Ícono de flecha (14 archivos, 17 instancias, en 4 sub-lotes)

16. Sub-lote 6a: `PostCard.astro`, `MapaPipeline.astro`,
    `VisualHardware.astro`, `CasoSmartPBA.astro` (4 archivos, 4
    instancias). `npm run build`.
17. Sub-lote 6b: `CrossSellCierre.astro`, `Contacto.astro`, `Hero.astro`,
    `Solucion.astro` (4 archivos, 4 instancias). `npm run build`.
18. Sub-lote 6c: `ProductosGrid.astro`, `SectoresGrid.astro` (2
    instancias), `ServiciosGrid.astro`, `Button.astro` (4 archivos, 5
    instancias). `npm run build`.
19. Sub-lote 6d: `blog/[...slug].astro`, `sectores/[slug].astro` (3
    instancias) (2 archivos, 4 instancias). `npm run build`.
20. Verificación: `grep -rn "M4 10h12m0 0-5-5m5 5-5 5" src/` debe
    devolver únicamente `src/components/ui/ArrowIcon.astro` y los 2
    archivos excluidos de §2 (`VisualLora.astro`, `VisualVision.astro`).

### Lote 7 — Verificación final

21. `npm run build` completo. Confirmar 41 páginas, sin errores ni
    advertencias nuevas.
22. Comparar el HTML de `dist/` completo contra la referencia del Lote 0,
    archivo por archivo. Las únicas diferencias esperadas son
    cosméticas de origen (espacios en blanco alrededor de `/>` que Astro
    ya normaliza igual en ambos casos — ver nota de §6) — **cero
    diferencias de atributos, clases, `viewBox`, `stroke-width` o
    contenido visible**.
23. Revisión visual manual en escritorio y móvil de al menos una página
    de cada tipo que usa cada ícono (home, un producto, un servicio, un
    sector, `/nosotros`, `/blog`, un artículo, `/conceptos`).

## 6. Criterios de aceptación

- [ ] `grep -rn "\[data-reveal\]\.card" src/` devuelve solo
      `global.css` + los 3 archivos excluidos documentados en §2.
- [ ] `grep -rn "M4 10.5 8 14l8-8.5" src/` devuelve solo `CheckIcon.astro`
      + `VisualDatos.astro` (excluido).
- [ ] `grep -rn "M4 10h12m0 0-5-5m5 5-5 5" src/` devuelve solo
      `ArrowIcon.astro` + `VisualLora.astro`/`VisualVision.astro`
      (excluidos).
- [ ] `npm run build` genera 41 páginas sin errores ni advertencias
      nuevas.
- [ ] El HTML generado (`dist/`) es idéntico al de la referencia del
      Lote 0 en todo lo que un usuario o un lector de pantalla puede
      observar: mismas clases, mismo `viewBox`, mismo `stroke-width`,
      mismo `d`, mismo texto, mismo orden de elementos. La única fuente
      legítima de diferencia es el formato interno de espacios en blanco
      alrededor de atributos SVG, que Astro ya normaliza de forma
      consistente independientemente de este plan (no es un cambio que
      este plan introduzca).
- [ ] Ninguna página cambia su comportamiento de scroll-reveal, hover, ni
      la apariencia de ningún ícono, en ningún breakpoint.
- [ ] Los 3 archivos con variante distinta de `.card` (`Servicios.astro`,
      `MapaPipeline.astro`, `conceptos.astro`) no fueron tocados.
- [ ] Los 3 usos de ícono excluidos (`VisualDatos.astro`,
      `VisualLora.astro`, `VisualVision.astro`) no fueron tocados.

## 7. Casos borde

### Ícono con color/tamaño distinto según el contexto
Cubierto explícitamente por el diseño de los componentes: `class` es un
prop libre (no una lista cerrada de tamaños/colores), así que cualquier
combinación ya usada en el sitio (incluida la que fija el color vía
`style="color:var(--sector)"` en vez de una clase de Tailwind, en las
landings de sector) se preserva pasando ese mismo valor como prop. No hay
ninguna instancia que el componente no pueda reproducir exactamente.

### SVG dentro de un botón vs. suelto
`Button.astro` (§4.6) es el único caso donde el ícono vive dentro de otro
componente en vez de directamente en una página/sección. No cambia nada
del mecanismo: `ArrowIcon` se importa y usa igual que en cualquier otro
archivo; la condición `variant === 'primary'` que decide si se renderiza
sigue intacta.

### Componentes con path de ícono como dato dinámico, no markup fijo
Ver §2 (`VisualDatos.astro`). Si en el futuro se quiere deduplicar
también ese caso, la vía correcta no es este componente sino exportar el
valor del path como constante compartida (p. ej. desde `CheckIcon.astro`
o un archivo de constantes) y usarlo como el string `icon: CHECK_PATH` en
el array de datos — un cambio distinto, de menor prioridad, no incluido
aquí.

### `viewBox` distinto en 2 de las 11 instancias de check
`productos/[slug].astro:287` y `sectores/[slug].astro:205` usan
`viewBox="0 0 24 24"` en vez de `"0 0 20 20"` (con el mismo `path`,
diseñado originalmente para `20 20` — visualmente el ícono queda un poco
más pequeño dentro de su caja en esos 2 casos, tal como ya se ve hoy). El
componente expone `viewBox` como prop opcional exactamente para
reproducir esto sin alterarlo — no se "corrige" la inconsistencia
original porque no es lo que pide este plan (refactor puro, no rediseño).

### Reglas de `.card` casi idénticas pero no exactas
Ver §2. La tentación de "arreglar" `Servicios.astro` (le falta la
propiedad `translate` en la transición) para que coincida con las demás
se descarta deliberadamente: eso sería una corrección visual, no un
refactor, y no fue pedida. Si en el futuro se decide que las 3 variantes
debían ser iguales desde el principio, es una decisión de diseño para un
plan aparte con su propio criterio de aceptación (cuál de las variantes
es la "correcta").

### Orden de los lotes
El Lote 1 (agregar la regla a `global.css`) se hace **antes** del Lote 2
(quitar las copias locales) a propósito: durante la ventana entre ambos
lotes, la regla existe duplicada (en `global.css` y en los archivos
locales todavía no tocados) sin conflicto — ambas declaran exactamente lo
mismo, así que no importa cuál "gane" en caso de empate de especificidad.
Esto permite parar a mitad del Lote 2 (por ejemplo, entre sub-lotes) sin
dejar el sitio en un estado roto.

## 8. Pendiente para un plan futuro (no bloquea este)

- Unificar las 3 variantes de `.card` en una sola (requiere decidir cuál
  de los 3 comportamientos es el que realmente se quiere).
- Aplicar el mismo criterio de consolidación a `.pilar`, `.step`, `.hito`,
  `.sector-card`, `.concept-card`, `.service-card`.
- Evaluar un sprite SVG (`<symbol>`/`<use>`) para reducir el peso real del
  HTML si el sitio sigue creciendo en número de íconos repetidos — ver
  `03-codigo.md`, hallazgo 4.3.
- Deduplicar el path del check en `VisualDatos.astro` como constante
  compartida.
