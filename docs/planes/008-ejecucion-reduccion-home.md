# Plan 008 — Ejecución del escenario Moderado (reducción de la home a 10 secciones)

**Estado: APROBADO** — aprobado por Jhon Meche el 2026-07-10. Listo para
IMPLEMENTAR (CLAUDE.md, "Ciclo de trabajo").

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `docs/planes/007-reduccion-home.md` (escenario Moderado,
elegido por el propietario), `docs/auditorias/01-diseno-frontend.md`
(hallazgo 1.3), `docs/auditorias/02-estructura.md` (hallazgos 3.1, 3.2,
3.3, 3.4).

Este plan ejecuta exactamente el escenario Moderado de `007-reduccion-home.md`
— no reabre la elección de escenario ni introduce movimientos que ese
documento no contemplara. Donde `007` dejó un detalle sin fijar ("queda
para el plan de ejecución"), este plan lo resuelve de forma explícita y
lo justifica en §7 (Casos borde).

## 1. Objetivo

Reducir `src/pages/index.astro` de 15 a 10 secciones, sin perder ningún
mensaje comercial: cada bloque que sale de la home aterriza en una
landing existente, enriqueciéndola. Cierra los hallazgos IMPORTANTES
3.1, 3.2 y 3.4 de `02-estructura.md`, el MENOR 3.3, y reduce
sustancialmente el 1.3 de `01-diseno-frontend.md` (de 15 a 10, con el
paso final a 9 quedando como decisión futura, ver `007` §6).

## 2. Fuera de alcance (explícitamente)

- No se ejecuta el escenario Agresivo (9 secciones) — ver `007` §6, es un
  paso 2 posterior y deliberadamente no incluido aquí.
- No se toca `Hero`, `Problema`, `Industria40`, `Stack`, `Sectores` ni
  `Contacto` — quedan en la home sin cambios de contenido (solo cambia su
  posición relativa, no su theme ni su markup interno).
- No se rediseña visualmente ningún componente — todo el trabajo es de
  contenido (qué vive dónde) y de `theme` (qué fondo tiene cada sección),
  reutilizando los patrones de card ya existentes en el sitio.
- No se toca el formulario de `Contacto.astro`, el header, el footer ni
  ningún componente de `landing/` o `ui/` — fuera del ajuste puntual de
  `CasoSmartPBA.astro` (mejora transversal ya prevista en `007` §2).
- No se borra ningún dato ni copy: todo texto que sale de un componente
  de home se reutiliza literalmente (o casi literalmente, ver §5.2 y
  §5.3) en su destino — no se redacta contenido nuevo desde cero salvo
  los 2 nuevos textos de enlace de `CasoSmartPBA` (§4).

## 3. Orden final de la home y alternancia de fondos

| # | Sección | Componente | Theme | Cambia respecto a hoy |
|---|---|---|---|---|
| 1 | Hero | `Hero.astro` | **D** | No |
| 2 | Problema | `Problema.astro` | C | No |
| 3 | Industria 4.0 | `Industria40.astro` | **D** | No |
| 4 | Del sensor a la decisión | `Solucion.astro` | C | No (Arquitectura sale, Solución no se toca) |
| 5 | El stack integral | `Stack.astro` | **D** | No |
| 6 | Servicios (solo capacidades) | `Servicios.astro` | C | Pierde su 2ª sección (metodología, oscura) |
| 7 | Caso destacado Smart PBA | `CasoSmartPBA.astro` | **D** | Gana 2 enlaces (§4) |
| 8 | Sectores | `Sectores.astro` | C | No |
| 9 | Por qué AdariA | `PorQue.astro` | **D** ← recolor | Cambia de claro a oscuro |
| 10 | Contacto | `Contacto.astro` | **D** | No |

Secuencia de fondos: **D C D C D C D C D D**. Con 10 secciones y ambos
extremos forzosamente oscuros (`Hero` y `Contacto` son oscuros por
diseño en todo el sitio), una alternancia perfecta es geométricamente
imposible sin recolorear una de las dos — se elige que la adyacencia
doble ocurra al final (`PorQue`→`Contacto`), como un cierre serio hacia
el formulario, en vez de romper la alternancia a mitad de página. Ver
§7 para el detalle completo de esta decisión (ya anticipada en `007` §4).

`src/pages/index.astro` queda:

```astro
<BaseLayout title={title} description={description}>
  <Hero />
  <Problema />
  <Industria40 />
  <Solucion />
  <Stack />
  <Servicios />
  <CasoSmartPBA />
  <Sectores />
  <PorQue />
  <Contacto />
</BaseLayout>
```

(Se eliminan los imports de `DiagnosticoOperativo`,
`ArquitecturaImplementacion`, `CalidadDato`, `Noticias` y
`PartnerTecnologico`.)

## 4. Mejora transversal: `CasoSmartPBA` gana enlaces (prevista en `007` §2)

`src/components/sections/CasoSmartPBA.astro:40-43` — el único enlace de
la sección ("Ver cómo Smart PBA puede ayudarle" → `#contacto`) se
reemplaza por 2 enlaces a la landing de producto y a la de sector (cierra
audit 3.4: la sección de mayor credibilidad del sitio no enlazaba a su
propio contenido de profundidad):

```astro
<div data-reveal class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
  <a href="/sectores/industria-carnica" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:gap-2.5">
    Ver el caso completo en Industria Cárnica
    <ArrowIcon class="h-4 w-4" />
  </a>
  <a href="/productos/smart-pba" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:gap-2.5">
    Conocer Smart PBA en detalle
    <ArrowIcon class="h-4 w-4" />
  </a>
</div>
```

No se toca nada más del archivo (el `<dl>` de métricas y el bloque visual
quedan igual).

## 5. A dónde va cada bloque que sale de la home

### 5.1 `ArquitecturaImplementacion.astro` + `DiagnosticoOperativo.astro` + la metodología de `Servicios.astro` → nueva sección "Cómo trabajamos" en `/servicios`

Los 3 contenidos comparten destino porque los 3 son, en esencia, la
misma promesa ("partimos de su operación real, trabajamos con método,
así es la arquitectura técnica") — exactamente la redundancia que audit
3.3 señala. Se combinan en **una sola sección nueva, oscura**, insertada
en `src/pages/servicios/index.astro` entre la sección de capacidades
(`ServiciosGrid`, blanca) y el CTA de cierre actual:

```astro
<Section theme="dark" id="como-trabajamos" grid={true}>
  <div class="mx-auto max-w-3xl text-center">
    <Eyebrow on="dark">Cómo trabajamos</Eyebrow>
    <h2 data-reveal class="text-balance text-h1 font-semibold text-on-dark">
      La solución parte de su operación real, no de una plantilla.
    </h2>
    <p data-reveal class="mt-5 text-lg leading-relaxed text-muted-dark">
      Antes de instalar sensores, entrenar modelos o integrar sistemas,
      delimitamos el problema técnico y operativo. Empezamos pequeño y de
      bajo riesgo, validamos con datos y escalamos.
    </p>
  </div>

  <!-- Diagnóstico: los 3 puntos de DiagnosticoOperativo.astro, con
       tratamiento de card oscura (equivalente dark del bg-surface claro
       original: bg-ink-card, border-white/10, ring-white/5, texto
       on-dark/muted-dark). Texto idéntico al original, solo cambia el
       tratamiento visual. -->
  <div class="mt-12 grid gap-5 sm:grid-cols-3">
    {[
      { titulo: 'Proceso y activos existentes', texto: 'Se identifican cámaras, sensores, PLC, básculas, ERP, redes y puntos de captura que ya forman parte de la operación.', icon: 'M4 5h16M4 12h16M4 19h16M8 3v4m8-4v4M8 10v4m8-4v4M8 17v4m8-4v4' },
      { titulo: 'Caso de uso medible', texto: 'Se define qué se quiere detectar, medir o automatizar, qué datos existen y qué condición permite validar el piloto.', icon: 'M3 3v18h18M7 15l3-3 3 2 5-7' },
      { titulo: 'Alcance técnico realista', texto: 'Se revisan restricciones de conectividad, iluminación, ambiente, seguridad industrial e integración antes de proponer una arquitectura.', icon: 'M12 2 4 6v6c0 5 8 10 8 10s8-5 8-10V6l-8-4ZM9 12l2 2 4-5' },
    ].map((p, i) => (
      <article data-reveal class="card flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-card p-6 ring-1 ring-white/5" style={`--reveal-delay:${i * 80}ms`}>
        <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand/15 text-brand-400">
          <svg class="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={p.icon} stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <div>
          <h3 class="text-base font-semibold text-on-dark">{p.titulo}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-muted-dark">{p.texto}</p>
        </div>
      </article>
    ))}
  </div>

  <!-- Metodología: mover tal cual el bloque de Servicios.astro líneas
       61-89 (el <ol> de 5 hitos con el riel `method-flow`), SIN cambios
       de markup — solo el array `metodologia` y el <ol> completo. -->
  <!-- ... (ol de 5 hitos, idéntico al original) ... -->

  <!-- Arquitectura: mover tal cual el bloque de ArquitecturaImplementacion.astro
       líneas 41-72 (el <ol> de 4 capas con el riel de acento), SIN cambios
       de markup — solo el array `capas` y el <ol> completo. -->
  <!-- ... (ol de 4 capas, idéntico al original) ... -->

  <!-- CTA: mover tal cual el bloque de Servicios.astro líneas 91-102,
       CAMBIANDO los 2 href (ver nota abajo). -->
  <div data-reveal class="mt-20 rounded-3xl border border-white/10 bg-ink-card p-10 text-center ring-1 ring-white/5 sm:p-12">
    <h3 class="text-h2 font-semibold text-on-dark">¿Existe un reto técnico por resolver?</h3>
    <p class="mx-auto mt-3 max-w-xl text-muted-dark">
      Cuéntenos su operación y diseñamos la solución a la medida —con hardware,
      software y datos— que de verdad necesita.
    </p>
    <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
      <Button href="/#contacto" variant="primary" on="dark">Hablemos de su proyecto</Button>
      <Button href="/productos" variant="secondary" on="dark">Ver el stack de productos</Button>
    </div>
  </div>
</Section>
```

**Nota obligatoria — hrefs relativos que dejan de ser válidos al migrar
de página:** el CTA de metodología usaba `href="#contacto"` y
`href="#productos"` porque vivía en la home, en la misma página que esas
anclas. Al moverse a `/servicios`, esos `href` **deben** cambiar a
`/#contacto` (navega a la home y baja al formulario) y `/productos`
(navega al hub, mismo patrón ya establecido en el plan 001) — dejarlos
como estaban produciría un enlace roto (`/servicios#contacto`,
`/servicios#productos`, ninguno de los dos existe). Ya reflejado en el
bloque de arriba.

**Título de sección:** se retira el `id="metodologia"` y `id="arquitectura"`
originales (ya no hay dos secciones separadas que necesiten anclas
propias); la sección combinada usa `id="como-trabajamos"`.

**CTA de cierre existente del hub** (`servicios/index.astro:39-48`, hoy
oscuro): pasa a **claro** para mantener la alternancia
Hero(D)→Grid(C)→ComoTrabajamos(D)→CTA(C):

```astro
<section class="relative isolate overflow-hidden bg-light py-24 text-on-light">
  <div class="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
    <h2 class="text-balance text-h1 font-semibold text-on-light">¿Existe un reto técnico por resolver?</h2>
    <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">Cuéntenos su operación y diseñamos la solución a la medida —con hardware, software y datos— que de verdad necesita.</p>
    <div class="mt-9 flex justify-center">
      <Button href="/#contacto" variant="primary" on="light">Hable con un experto</Button>
    </div>
  </div>
</section>
```

(Mismo patrón que ya usa el cierre de `productos/index.astro` — no es un
patrón nuevo en el sitio.)

### 5.2 Los 5 criterios de `CalidadDato.astro` → nueva `capacidad` en `/servicios/analitica-y-decision`

`src/data/servicios.ts`, dentro de la entrada `analitica-y-decision`
(línea 442), el array `detalle.capacidades` (línea 460, hoy 4 entradas)
gana una 5ª, con el texto de `CalidadDato.astro:7-11` prácticamente
literal:

```ts
{
  titulo: 'Calidad y trazabilidad del dato',
  descripcion: 'Información que se puede auditar, no solo visualizar',
  items: [
    'Definición de variables, frecuencia de captura y fuente responsable',
    'Registro de eventos con hora, origen y contexto operativo',
    'Separación entre evidencia capturada, dato procesado e indicador final',
    'Revisión de falsos positivos y mantenimiento del modelo',
    'Entregables comprensibles para operación, gerencia y equipos técnicos',
  ],
},
```

Es puramente un cambio de datos — el template
(`src/pages/servicios/[slug].astro:99-121`) ya renderiza `capacidades`
como grid de cards sin ningún cambio de código. **Efecto colateral
esperado, no un error:** al pasar de 4 a 5 elementos (número impar), la
lógica ya existente `esUltimaImpar` (línea 101 del template) hace que
esta 5ª card ocupe las 2 columnas del grid (`md:col-span-2`) y sus items
se acomoden en 2 columnas — es el mismo comportamiento que ya tienen
otros servicios con capacidades impares, no algo que este plan
introduzca.

### 5.3 `PorQue.astro` — recolor a oscuro, sin cambio de contenido

`src/components/sections/PorQue.astro`. El `theme="white"` (línea 39)
pasa a `theme="dark"`, y las clases de cada card cambian al equivalente
oscuro ya usado en otras secciones del sitio (mismo patrón que
`Industria40.astro` o la sección `como-trabajamos` de arriba):

| Elemento | Clase actual (clara) | Clase nueva (oscura) |
|---|---|---|
| `Eyebrow` | `on="light"` | `on="dark"` |
| `h2`/`p` de cabecera | `text-on-light` / `text-muted` | `text-on-dark` / `text-muted-dark` |
| Card | `border-ink/10 bg-light ring-1 ring-ink/5` | `border-white/10 bg-ink-card ring-1 ring-white/5` |
| Ícono (círculo) | `bg-brand/10 text-brand` | `bg-brand/15 text-brand-400` |
| Título de card / texto | `text-on-light` / `text-muted` | `text-on-dark` / `text-muted-dark` |

El contenido de los 4 diferenciadores (incluido "Dato auditable", que ya
cubre el mensaje de `CalidadDato` a nivel de home) **no cambia una sola
palabra** — la sustancia de "cómo lo garantizamos" ya vive en
`/servicios/analitica-y-decision` (§5.2). No se agrega ningún enlace
nuevo a las cards (quedan como `<article>`, no `<a>`, igual que hoy) para
no introducir un patrón de interacción distinto al resto del sitio.

### 5.4 `PartnerTecnologico.astro` (Granular Electronics) → nueva sección en `/nosotros`

`src/pages/nosotros.astro` gana una nueva `<Section theme="light"
id="aliado">` con el componente `PartnerTecnologico` **tal cual**
(mismo archivo, `src/components/sections/PartnerTecnologico.astro`, sin
ningún cambio — solo cambia quién lo importa), insertada entre
"Historia" (línea 99-157, `theme="light"`) y "Propósito·Misión·Visión"
(línea 160, `theme="dark"`):

```astro
import PartnerTecnologico from '../components/sections/PartnerTecnologico.astro';
```

```astro
<!-- HISTORIA / ORIGEN --> ... (sin cambios) ...

<PartnerTecnologico />

<!-- PROPÓSITO · MISIÓN · VISIÓN --> ... (sin cambios) ...
```

`index.astro` deja de importar y renderizar `PartnerTecnologico`.

### 5.5 `Noticias.astro` → se elimina sin reemplazo

El teaser de blog no se traslada a ninguna landing: `/blog` ya es
accesible desde el nav principal y el footer en todas las páginas, así
que no queda huérfano. `src/components/sections/Noticias.astro` deja de
usarse; ver §6 paso 9 sobre si se borra el archivo o se deja sin
importar.

## 6. Pasos atómicos (lotes pequeños, mismo criterio que el plan 004)

Cada lote termina en `npm run build` verificable antes de seguir.

### Lote 1 — Referencia "antes"

1. Con el repo en su estado actual, `npm run build` y copiar `dist/` a
   una carpeta de referencia local (mismo mecanismo del plan 004, no se
   commitea) para comparar al final que ninguna página *no tocada* por
   este plan cambió.

### Lote 2 — `CasoSmartPBA` (mejora transversal, independiente del resto)

2. Aplicar el cambio de §4 en `CasoSmartPBA.astro`. `npm run build` +
   revisión visual de la sección en `npm run dev` (home, ancla `#caso`).

### Lote 3 — Enriquecer `/servicios` (antes de tocar la home, para no dejar contenido huérfano ni un momento)

3. Insertar la nueva sección "Cómo trabajamos" en
   `src/pages/servicios/index.astro` (§5.1): diagnóstico + metodología
   (movida desde `Servicios.astro`) + arquitectura (movida desde
   `ArquitecturaImplementacion.astro`), con los 2 `href` corregidos.
4. Recolorear el CTA de cierre de `servicios/index.astro` a claro (§5.1).
5. `npm run build`. Verificar `/servicios` completo en `npm run dev`:
   alternancia D-C-D-C, el riel de metodología y el de arquitectura
   ambos animan, los 2 botones del CTA de "Cómo trabajamos" navegan
   correctamente (`/#contacto` baja al formulario de la home,
   `/productos` va al hub).

### Lote 4 — Enriquecer `/servicios/analitica-y-decision`

6. Agregar la 5ª `capacidad` en `data/servicios.ts` (§5.2).
7. `npm run build`. Verificar `/servicios/analitica-y-decision`: 5
   capacidades, la última ocupando el ancho completo con sus items en 2
   columnas.

### Lote 5 — Enriquecer `/nosotros`

8. Insertar `<PartnerTecnologico />` entre Historia y Propósito en
   `nosotros.astro` (§5.4). De paso, actualizar el comentario de
   cabecera de `PartnerTecnologico.astro:1-13` — hoy describe su
   posición vieja en la home ("Fondo BLANCO, justo antes del CTA final...
   para seguir la alternancia... de toda la home"), que deja de ser
   cierta; ajustarlo para reflejar que ahora vive en `/nosotros`, entre
   Historia y Propósito.
9. `npm run build`. Verificar `/nosotros`: la sección de Granular
   aparece completa (logo, capacidades, botón "Visitar
   granularelectronics.com"), y el flujo Historia→Granular→Propósito no
   corta ningún elemento visual.

### Lote 6 — Recolorear `PorQue`

10. Aplicar la tabla de clases de §5.3 a `PorQue.astro`. `npm run build`
    + revisión visual: las 4 cards se ven coherentes con el resto de
    cards oscuras del sitio (mismo hover, mismo acento).

### Lote 7 — Reducir la home

11. Editar `src/pages/index.astro`: quitar los imports y usos de
    `DiagnosticoOperativo`, `ArquitecturaImplementacion`, `CalidadDato`,
    `Noticias`, `PartnerTecnologico`; dejar el orden de §3.
12. Quitar de `Servicios.astro` la 2ª `<Section theme="dark"
    id="metodologia">` completa (líneas 48-103 del archivo original), el
    array `metodologia`, el import de `Button` (si queda sin uso) y las
    reglas CSS `.hito`/`.method-flow`/`@keyframes method-flow-scan` (ya
    no se usan ahí — si quedó markup que las necesita en
    `servicios/index.astro`, esas reglas viven ahora en ese archivo, ver
    nota de §7).
13. `npm run build`. Verificar 41 páginas, sin errores.

### Lote 8 — Limpieza de archivos huérfanos

14. Borrar `src/components/sections/DiagnosticoOperativo.astro` y
    `src/components/sections/ArquitecturaImplementacion.astro` (su
    contenido ya vive en `servicios/index.astro`, ningún archivo los
    importa).
15. Borrar `src/components/sections/Noticias.astro` (sin uso en ningún
    lugar tras el Lote 7).
16. `grep -rn "DiagnosticoOperativo\|ArquitecturaImplementacion\|Noticias.astro" src/` debe devolver **cero** coincidencias.
17. `npm run build`. 41 páginas, sin errores ni imports rotos.

### Lote 9 — Verificación final

18. Comparar `dist/` contra la referencia del Lote 1 (mismo método de
    comparación normalizada del plan 004: ignorar hashes de
    `data-astro-cid-*` y nombres de archivo con hash de contenido).
    **Páginas que NO deben cambiar en absoluto:** las 34 páginas fuera de
    `/`, `/servicios`, `/servicios/analitica-y-decision` y `/nosotros`.
    **Páginas que sí cambian, con el contenido esperado documentado en
    este plan:** `/` (10 secciones), `/servicios` (nueva sección),
    `/servicios/analitica-y-decision` (5ª capacidad),
    `/nosotros` (sección Granular).
19. Revisión visual manual, escritorio y móvil, de las 4 páginas que
    cambian — con especial atención a la transición Historia→Granular en
    `/nosotros` (2 secciones claras seguidas, ver §7) y al cierre
    PorQue→Contacto en la home (2 secciones oscuras seguidas, ver §7).
20. Confirmar con teclado (Tab) que todos los enlaces nuevos son
    alcanzables y tienen foco visible: los 2 de `CasoSmartPBA`, los 2 del
    CTA movido a `/servicios`.

## 7. Criterios de aceptación

- [ ] `src/pages/index.astro` renderiza exactamente 10 componentes, en el
      orden de §3.
- [ ] `npm run build` genera 41 páginas sin errores (mismo total que hoy
      — este plan no agrega ni quita páginas, solo mueve contenido entre
      las que ya existen).
- [ ] `grep -rn "DiagnosticoOperativo\|ArquitecturaImplementacion" src/`
      devuelve cero coincidencias (archivos borrados, contenido migrado).
- [ ] `src/components/sections/Noticias.astro` no existe y no está
      importado en ningún archivo.
- [ ] `/servicios` tiene una sección "Cómo trabajamos" con los 3 puntos
      de diagnóstico, los 5 hitos de metodología y las 4 capas de
      arquitectura, todos oscuros, y su CTA de cierre es claro.
- [ ] Ningún `href` de la sección movida a `/servicios` apunta a un ancla
      inexistente en esa página (`#contacto`/`#productos` sin `/`
      delante) — deben ser `/#contacto` y `/productos`.
- [ ] `/servicios/analitica-y-decision` muestra 5 capacidades, la última
      ("Calidad y trazabilidad del dato") con los 5 criterios.
- [ ] `/nosotros` muestra la sección de Granular Electronics entre
      Historia y Propósito, idéntica en contenido a como se veía en la
      home.
- [ ] `PorQue` en la home tiene fondo oscuro y las 4 cards usan la
      paleta oscura (no queda ninguna clase `text-on-light`/`bg-light`
      residual en ese componente).
- [ ] `CasoSmartPBA` enlaza a `/sectores/industria-carnica` y a
      `/productos/smart-pba` (verificar que ambas URLs existen y no dan
      404).
- [ ] Las 34 páginas no mencionadas en este plan son, en el HTML
      compilado, idénticas a la referencia del Lote 1 (normalizada).
- [ ] Revisión visual confirma que la home no tiene ninguna rotura de
      alternancia **no documentada** en este plan (las únicas 2
      adyacencias de mismo fondo son las descritas en §3 y §7, ninguna
      otra).

## 8. Casos borde

### Cierre oscuro doble: `PorQue` → `Contacto`
Ya justificado en §3 y en `007` §4: con 10 secciones y ambos extremos
oscuros por diseño del sitio (`Hero`, `Contacto`), una alternancia
perfecta exige romperse en algún punto. Se elige el final — el visitante
llega a "Por qué AdariA" (una afirmación de cierre) y de inmediato al
formulario, en un solo tramo oscuro y serio, en vez de una rotura a mitad
de scroll que se sentiría como un error de maquetación. No es un olvido:
es la alternativa explícitamente elegida frente a, por ejemplo, dejar
`PorQue` claro y romper la alternancia entre `Sectores` (claro) y
`PorQue` (claro) en su lugar — esa alternativa es peor porque ocurre en
medio del recorrido, no al final.

### Dos secciones claras seguidas en `/nosotros`: Historia → Granular
`Historia` (`theme="light"`) y la nueva sección de `PartnerTecnologico`
(también clara, por diseño — ver el comentario de ese componente:
"Fondo BLANCO... para seguir la alternancia oscuro→blanco") quedan
adyacentes. Es la misma clase de compromiso que el de arriba, en la
página `/nosotros`: insertar 1 sección nueva en una secuencia de 6 ya
perfectamente alternada (D-L-D-L-D-L) obliga a repetir un color en algún
punto. Se elige repetir claro entre Historia y Granular —dos secciones
de contenido "quiénes somos"— en vez de recolorear `Propósito·Misión·
Visión` o `Equipo directivo` (ambas oscuras por razones de legibilidad
de fotos/cards ya establecidas y fuera de alcance de este plan). Si en
el futuro se quiere una alternancia perfecta en `/nosotros`, es un plan
aparte que decida qué otra sección recolorear — no se fuerza aquí.

### El CSS de metodología/arquitectura (`.hito`, `.method-flow`, `.pilar`-like) debe viajar con el markup
Al mover los bloques `<ol>` de metodología y arquitectura desde
`Servicios.astro`/`ArquitecturaImplementacion.astro` hacia
`servicios/index.astro`, el `<style>` con las reglas `.js
[data-reveal].hito`, `.method-flow`/`@keyframes method-flow-scan` (hoy en
`Servicios.astro:149-192`) y el estilo inline del acento de capa (hoy
generado con `color-mix()` en `ArquitecturaImplementacion.astro:52`)
**deben copiarse al `<style>` de `servicios/index.astro`**, no solo el
markup — si se olvidan, la animación del riel de metodología/arquitectura
se pierde silenciosamente (el HTML se ve bien pero sin el pulso animado).
Verificar explícitamente en el Lote 3 (paso 5) con `prefers-reduced-motion:
no-preference` activo.

### `esUltimaImpar` y la 5ª capacidad de `analitica-y-decision`
Ya explicado en §5.2 — es un comportamiento existente del template que
esta 5ª capacidad activa por primera vez en este servicio específico
(otros servicios con capacidades impares ya se ven así hoy). No requiere
ningún cambio de código, solo confirmarlo visualmente.

### Orden de los lotes: enriquecer destinos antes de vaciar la home
Los Lotes 3-6 (enriquecer `/servicios`, `/servicios/analitica-y-decision`
y `/nosotros`) se hacen **antes** del Lote 7 (reducir la home) a
propósito: así, si el trabajo se interrumpe entre lotes, el contenido
nunca queda huérfano (existe en 2 lugares — home y landing— en vez de en
ninguno). El Lote 8 (borrar los archivos de componente ya sin uso) es el
último paso posible, después de confirmar que nada los importa.

### Qué NO se migra literalmente
El copy de las cabeceras de las secciones movidas (`h2`/`p` de
"Diagnóstico operativo", "Cómo trabajamos", "Arquitectura de
implementación") se ajusta mínimamente al fusionarse en una sola sección
de `/servicios` (ver el `h2`/`p` propuesto en §5.1) — no son las 3
cabeceras originales pegadas una tras otra, porque eso repetiría en la
landing el mismo problema de redundancia narrativa que este plan corrige
en la home (audit 3.2/3.3). Es la única licencia de redacción que se
toma este plan; todo lo demás (títulos de card, `items`, `texto` de cada
paso/capa) se preserva literal.

## 9. Pendiente para un plan futuro (no bloquea este)

- El escenario Agresivo (`007` §5), si se decide dar el paso después de
  validar que la home de 10 secciones convierte bien.
- Alternancia perfecta en `/nosotros` (requeriría recolorear una sección
  adicional, decisión de diseño no tomada aquí).
- Enlazar el glosario `/conceptos` desde las landings (audit 3.5) y
  cruzar contenido del blog con landings/sectores (audit 3.6) — ninguno
  de los dos depende de este plan ni lo bloquea.
