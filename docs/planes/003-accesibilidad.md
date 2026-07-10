# Plan 003 — Accesibilidad de navegación, botones flotantes y formulario

**Estado: APROBADO** — aprobado por Jhon Meche el 2026-07-10. Listo para
IMPLEMENTAR (CLAUDE.md, "Ciclo de trabajo").

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `docs/auditorias/01-diseno-frontend.md` (hallazgo 4.1 — dropdowns
de escritorio sin `aria-expanded`; hallazgo 4.2 — sin cierre con Escape;
hallazgo 4.3 — enlaces externos sin advertencia de nueva pestaña) y
`docs/auditorias/03-codigo.md` (hallazgo 3.4 — formulario de contacto sin
protección antispam).

## 1. Objetivo

1. Dar semántica correcta a los dropdowns de escritorio del Header
   (Soluciones/Productos/Servicios): disparador `<button>` con
   `aria-expanded`/`aria-controls`, igual que ya hace bien el botón del
   menú móvil.
2. Cerrar con `Escape` tanto el menú móvil como los dropdowns de
   escritorio.
3. Evitar que los botones flotantes (WhatsApp, volver arriba) invadan el
   área segura en dispositivos con notch/gestos, y ocultar "volver arriba"
   mientras el usuario está escribiendo en el formulario de contacto.
4. Honeypot simple en el formulario de contacto, antes de conectar
   `PUBLIC_FORM_ENDPOINT` a un servicio real.
5. (Evaluado, aplica sin tocar el diseño) advertencia accesible de "se
   abre en pestaña nueva" en los 3 enlaces que abren `target="_blank"`.

## 2. Fuera de alcance (explícitamente)

- No se implementa un patrón ARIA `menu`/`menuitem` completo (con
  navegación por flechas) para los dropdowns — ver §7, "Por qué no
  `role=menu`". Se resuelve como patrón de *disclosure* (botón +
  región que se muestra/oculta), que es lo que el hallazgo 4.1 pedía
  corregir.
- No se toca el copy, el layout ni las clases visuales de ningún elemento
  — todos los cambios son de comportamiento/semántica (atributos ARIA,
  tipo de elemento, JS) o, cuando son visuales, invisibles en pantalla
  (`sr-only`, `env(safe-area-inset-bottom)` que solo tiene efecto en
  dispositivos con áreas inseguras).
- No se agrega CAPTCHA ni verificación server-side al formulario — el
  honeypot es la única capa antispam pedida, "simple" y sin backend
  propio (el sitio es estático).
- No se oculta `WhatsAppButton` durante el foco del formulario — el
  encargo solo pidió ocultar `GoToTop`. Se anota como posible extensión
  futura en §8, no se decide aquí.
- No se cambia el mecanismo de detección `noindex`/sitemap ni ningún otro
  tema de los planes 001/002.

## 3. Especificación de cambios por archivo

### 3.1 `src/components/layout/Header.astro` — dropdowns con botón + Escape (puntos 1 y 2)

**Conflicto a resolver antes de tocar código:** hoy el disparador de cada
dropdown es un `<a href="/sectores">` (etc.) que cumple dos funciones a la
vez — navega al hub (plan 001) y revela el submenú al pasar el mouse
(`.group:hover .dropdown`). Un `<button>` no tiene `href`; convertirlo tal
cual perdería la navegación directa al hub por clic, que el plan 001
agregó deliberadamente. La solución (igual que ya usa el menú móvil, que
sí resuelve este mismo problema) es separar las dos funciones: el
`<button>` solo abre/cierra el submenú; dentro del submenú, el primer
ítem es un enlace "Ver todos los sectores/productos/servicios" que sigue
llevando al hub — mismo patrón que ya existe en el acordeón móvil
(`mobile-sublink-all`, `Header.astro:94,107,120`).

**Markup nuevo** (reemplaza las 3 estructuras `<li class="group relative">`
de las líneas 26-63):

```astro
<li class="group relative">
  <button
    type="button"
    class="nav-link"
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls="dropdown-sectores"
    data-dropdown-trigger
  >
    Soluciones
    <svg class="dropdown-chevron h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <div class="dropdown" id="dropdown-sectores">
    <a href="/sectores" class="dropdown-item dropdown-item-all">Ver todos los sectores</a>
    <p class="dropdown-title">Por sector</p>
    {sectores.map((s) => (
      <a href={`/sectores/${s.slug}`} class="dropdown-item">{s.nombre}</a>
    ))}
  </div>
</li>
```

Repetir el mismo patrón para Productos (`aria-controls="dropdown-productos"`,
`id="dropdown-productos"`, "Ver todos los productos", sin `<p
class="dropdown-title">` — el original tampoco lo tiene ahí) y Servicios
(`aria-controls="dropdown-servicios"`, `id="dropdown-servicios"`, "Ver
todos los servicios", sin `dropdown-title`).

**CSS** (reemplaza `Header.astro:139-145` y ajusta la animación de
`dropdown-item` en las líneas 179-194):

```css
.dropdown {
  @apply invisible absolute left-0 top-full min-w-64 translate-y-2 rounded-md border border-white/10 bg-ink/96 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200;
}
.group:hover .dropdown,
.group:focus-within .dropdown,
.group.is-open .dropdown {
  @apply visible translate-y-1 opacity-100;
}
/* Debe ir DESPUÉS de las tres reglas de arriba: misma especificidad
   (.group + pseudoclase/clase + .dropdown), gana por orden de aparición. */
.group.dropdown-suppressed .dropdown {
  visibility: hidden !important;
  opacity: 0 !important;
}
.dropdown-item-all {
  @apply font-semibold text-brand-400;
}
/* Mismo patrón que ya usa .mobile-accordion[open] .mobile-accordion-chevron
   (Header.astro:164-166) — rotación explícita por estado, no una variante
   arbitraria de Tailwind sobre .group, para no depender de una sintaxis
   sin verificar en el proyecto. */
.group.is-open .dropdown-chevron,
.group:focus-within .dropdown-chevron {
  @apply rotate-180;
}
```

Las reglas de animación escalonada de `.dropdown-item` (líneas 179-194)
cambian su selector de `.group:hover .dropdown-item, .group:focus-within
.dropdown-item` a `.group.is-open .dropdown-item, .group:hover
.dropdown-item, .group:focus-within .dropdown-item` (se agrega
`.is-open` a la lista existente, no se quita nada).

**JS** (agregar al final del `<script>` existente, líneas 208-240; no
tocar la lógica ya existente de scroll/progreso ni la del menú móvil salvo
lo indicado abajo para Escape):

```js
// Dropdowns de escritorio: botón como disparador de disclosure.
// La visibilidad la sigue manejando CSS (:hover/:focus-within/.is-open)
// para que funcione sin JS (hover y tabulación); el JS solo:
// (a) sincroniza aria-expanded con lo que el usuario ve,
// (b) agrega clic como método explícito (toque, o clic sin hover),
// (c) cierra con Escape incluso cuando el submenú está abierto por
//     :focus-within, que CSS solo no puede cerrar (ver nota en el plan).
const dropdownGroups = Array.from(document.querySelectorAll('li.group'))
  .filter((group) => group.querySelector('[data-dropdown-trigger]'));

const setExpanded = (group, expanded) => {
  group.querySelector('[data-dropdown-trigger]')?.setAttribute('aria-expanded', String(expanded));
};

dropdownGroups.forEach((group) => {
  const trigger = group.querySelector('[data-dropdown-trigger]');

  trigger?.addEventListener('click', () => {
    const isOpen = group.classList.contains('is-open');
    dropdownGroups.forEach((g) => { g.classList.remove('is-open', 'dropdown-suppressed'); setExpanded(g, false); });
    if (!isOpen) { group.classList.add('is-open'); setExpanded(group, true); }
  });

  group.addEventListener('mouseenter', () => setExpanded(group, true));
  group.addEventListener('mouseleave', () => setExpanded(group, false));
  group.addEventListener('focusin', () => setExpanded(group, true));
  group.addEventListener('focusout', (e) => {
    if (group.contains(e.relatedTarget)) return;
    setExpanded(group, false);
    group.classList.remove('is-open', 'dropdown-suppressed');
  });
});

document.addEventListener('click', (e) => {
  dropdownGroups.forEach((group) => {
    if (!group.contains(e.target)) { group.classList.remove('is-open', 'dropdown-suppressed'); setExpanded(group, false); }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  const openGroup = dropdownGroups.find(
    (group) => group.querySelector('[data-dropdown-trigger]')?.getAttribute('aria-expanded') === 'true',
  );
  if (openGroup) {
    openGroup.classList.remove('is-open');
    openGroup.classList.add('dropdown-suppressed'); // ver nota: :focus-within seguiría mostrando el panel sin esto
    setExpanded(openGroup, false);
    openGroup.querySelector('[data-dropdown-trigger]')?.focus();
    return;
  }

  if (menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.focus();
  }
});
```

El bloque `if (menu && !menu.classList.contains('hidden'))` dentro del
listener de `Escape` reutiliza las variables `menu`/`toggle` que ya existen
arriba en el mismo `<script>` (`Header.astro:210-211`) — no declararlas de
nuevo.

**Nota técnica — por qué hace falta `dropdown-suppressed`:** si el
submenú se abrió con Tab (no con clic), `:focus-within` sigue siendo
verdadero mientras el foco permanezca en el botón — y por diseño, al
presionar Escape el foco *vuelve* al mismo botón (para no desorientar al
usuario de teclado). Sin una clase que fuerce el ocultamiento por encima
de `:hover`/`:focus-within`/`.is-open`, el panel se vería "cerrado" para
`aria-expanded` pero seguiría visible en pantalla. `dropdown-suppressed`
se quita solo en el próximo `mouseleave`/`focusout` real (cuando el
usuario efectivamente se aleja), así que no interfiere con usos futuros
del mismo dropdown.

### 3.2 `src/components/ui/WhatsAppButton.astro` — safe-area + aria-label (puntos 3 y 5)

Línea 24, reemplazar `bottom-6` por un valor que suma el *safe area* del
dispositivo sin cambiar el offset visual en dispositivos sin notch/gestos
(`env(safe-area-inset-bottom)` vale `0` donde no aplica, así que el
resultado es idéntico al actual en la mayoría de pantallas):

```astro
class="group fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 text-white shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
```

(`1.5rem` = valor actual de `bottom-6` en la escala de Tailwind — el
cambio es aditivo, no reemplaza el espaciado existente.)

Línea 25, `aria-label`:

```astro
aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
```

(Se edita el propio `aria-label`, no se agrega un `<span>` interno: el
elemento ya tiene `aria-label` explícito, que tiene prioridad total sobre
el contenido para el nombre accesible — un `sr-only` adentro sería
ignorado por lectores de pantalla.)

### 3.3 `src/components/ui/GoToTop.astro` — safe-area + ocultar durante el formulario (punto 3)

Línea 16, `bottom-28` → mismo criterio que WhatsAppButton (`7rem` = valor
actual de `bottom-28`):

```astro
class="fixed bottom-[calc(7rem+env(safe-area-inset-bottom))] right-6 z-50 opacity-0 translate-y-2 scale-90 [transition:opacity_.3s_ease,transform_.4s_cubic-bezier(0.16,1,0.3,1)]"
```

CSS nuevo en el `<style>` existente (junto a la regla `:global(html.gtt-show)`,
líneas 54-59):

```css
:global(html.gtt-hide-for-form) [data-gototop] {
  opacity: 0 !important;
  pointer-events: none !important;
}
```

JS nuevo, agregado al `<script>` existente (después de la inicialización
de `root`, antes o después de `onScroll` — el orden no importa mientras
esté dentro del mismo bloque):

```js
// Oculta "volver arriba" mientras el usuario tiene el foco dentro del
// formulario de contacto, para no competir con los campos ni con el
// teclado virtual en móvil (ver 01-diseno-frontend.md, hallazgo 3.1).
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('focusin', () => root.classList.add('gtt-hide-for-form'));
contactForm?.addEventListener('focusout', (e) => {
  if (!contactForm.contains(e.relatedTarget)) root.classList.remove('gtt-hide-for-form');
});
```

`GoToTop.astro` no importa nada de `Contacto.astro`; localiza el
formulario por `id` (`#contact-form`), igual que ya hace `BaseLayout.astro`
con `[data-reveal]` de cualquier componente — mismo patrón ya establecido
en el sitio para JS que cruza límites de componente.

### 3.4 `src/components/sections/Contacto.astro` — honeypot (punto 4)

**Campo nuevo**, insertado como primer hijo de `<form id="contact-form"
class="space-y-4" novalidate>` (antes del primer `<div class="grid gap-4
sm:grid-cols-2">`, línea 84), fuera del flujo visual y fuera del orden de
tabulación:

```astro
<div class="hp-field" aria-hidden="true">
  <label for="website">No completar este campo</label>
  <input type="text" id="website" name="_gotcha" tabindex="-1" autocomplete="off" />
</div>
```

CSS nuevo en el `<style>` existente (junto a `.form-label`/`.form-input`,
líneas 143-151):

```css
.hp-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

**Por qué el nombre `_gotcha` y no otro:** es la convención que Formspree
—el servicio que el propio comentario de `Contacto.astro:7-8` ya nombra
como backend previsto ("Formspree u otro compatible con FormData")—
reconoce automáticamente: si ese campo llega con contenido, Formspree
descarta el envío sin que el sitio tenga que hacer nada adicional en el
servidor. El chequeo del punto siguiente funciona igual sin importar qué
servicio se conecte finalmente a `PUBLIC_FORM_ENDPOINT`, así que no es una
dependencia de Formspree, es una compatibilidad extra si termina siéndolo.

**JS**, en el `<script define:vars=...>` existente (líneas 170-228):
agregar la referencia al campo y el chequeo al inicio del listener de
`submit`, antes de la validación de `checkValidity()`:

```js
const honeypot = form?.querySelector('input[name="_gotcha"]');
// ...
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: si un bot rellenó el campo oculto, se simula éxito sin
  // enviar nada — no se le revela al bot que fue detectado.
  if (honeypot && honeypot.value) {
    setStatus('¡Gracias! Hemos recibido su solicitud. Le contactaremos muy pronto.', 'ok');
    form.reset();
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  // ... resto del listener sin cambios
});
```

No se toca nada más del script (ni la rama de WhatsApp, ni la de
`fetch(FORM_ENDPOINT)`, ni el manejo de errores).

### 3.5 `src/pages/nosotros.astro` — advertencia de pestaña nueva (punto 5)

Dentro del enlace de LinkedIn de cada fundador (líneas 271-279), agregar
un `<span class="sr-only">` después del texto visible "LinkedIn":

```astro
<a
  href={f.linkedin}
  class="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-400 transition-all hover:gap-2.5"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
  LinkedIn
  <span class="sr-only"> (se abre en una pestaña nueva)</span>
</a>
```

Sin `aria-label` explícito en el elemento, el nombre accesible se
construye a partir del contenido — el `<span class="sr-only">` se suma al
texto visible sin cambiar nada en pantalla (`sr-only` ya se usa en el
mismo sitio en el enlace "Saltar al contenido" de `BaseLayout.astro:101-106`).

### 3.6 `src/components/sections/PartnerTecnologico.astro` — advertencia de pestaña nueva (punto 5)

Dentro del `<Button>` que enlaza a Granular Electronics (líneas 94-102),
agregar el mismo patrón dentro del contenido del slot:

```astro
<Button
  href="https://granularelectronics.com"
  variant="secondary"
  on="light"
  target="_blank"
  rel="noopener noreferrer"
  class="btn-fill-brand-hover shrink-0"
>
  Visitar granularelectronics.com
  <span class="sr-only"> (se abre en una pestaña nueva)</span>
</Button>
```

`Button.astro` renderiza `<slot />` sin modificar su contenido, así que
esto no requiere ningún cambio en `src/components/ui/Button.astro`.

## 4. Pasos atómicos

1. En `Header.astro`, convertir los 3 disparadores de `<a>` a `<button>`
   con `aria-expanded`/`aria-controls`/`data-dropdown-trigger`, agregar
   el enlace "Ver todos los X" como primer ítem de cada panel, y el `id`
   correspondiente a cada `.dropdown` (§3.1, solo el markup). Verificar
   en `npm run dev` que los 3 dropdowns se siguen abriendo al pasar el
   mouse (CSS `:hover` no depende del JS que viene en el paso 3).
2. Actualizar el CSS de `.dropdown`/`.dropdown-item` y agregar
   `.dropdown-item-all`/`.dropdown-suppressed` (§3.1, bloque CSS).
   Verificar que el estilo de "Ver todos los sectores" se ve distinto
   (semibold, color de marca) al resto de ítems del panel.
3. Agregar el bloque de JS de dropdowns al `<script>` de `Header.astro`
   (§3.1, bloque JS) y el manejo de `Escape` para ambos (dropdowns +
   menú móvil). Verificar con teclado: Tab hasta "Soluciones" → el panel
   se abre → `Escape` → el panel se cierra y el foco permanece en el
   botón "Soluciones". Repetir con el menú móvil abierto en viewport
   angosto.
4. Verificar con las herramientas de accesibilidad del navegador
   (DevTools → Accessibility, o la pestaña de Elements) que
   `aria-expanded` cambia de `"false"` a `"true"` al abrir cada dropdown
   por clic, hover y Tab, y vuelve a `"false"` al cerrar.
5. Actualizar `WhatsAppButton.astro`: `bottom-*` con `env()` y el nuevo
   `aria-label` (§3.2). Verificar en DevTools con la emulación de un
   dispositivo con *safe area* (o revisando que en un dispositivo normal
   el botón queda exactamente en la misma posición que antes — `env()`
   vale `0` donde no aplica).
6. Actualizar `GoToTop.astro`: `bottom-*` con `env()`, la regla CSS
   `gtt-hide-for-form` y el JS de `focusin`/`focusout` sobre
   `#contact-form` (§3.3). Verificar: hacer scroll hasta que "volver
   arriba" aparezca, enfocar cualquier campo del formulario de contacto
   → el botón desaparece; salir del formulario (Tab hacia afuera o clic
   fuera) → reaparece si el scroll sigue pasando el umbral.
7. Agregar el campo honeypot y su CSS a `Contacto.astro` (§3.4, markup +
   CSS). Verificar que el campo no es visible ni alcanzable con Tab
   (Tab desde "Nombre" hacia atrás no debe caer nunca en "No completar
   este campo").
8. Agregar el chequeo de honeypot al script de envío de `Contacto.astro`
   (§3.4, JS). Verificar manualmente: rellenar el campo `#website` desde
   la consola del navegador (`document.getElementById('website').value =
   'x'`) y enviar el formulario → debe mostrar el mensaje de éxito sin
   abrir WhatsApp ni hacer ningún `fetch` (confirmar en la pestaña Network
   que no sale ninguna petición).
9. Agregar el `<span class="sr-only">` a los enlaces de LinkedIn en
   `nosotros.astro` (§3.5). Verificar que no cambia nada visualmente.
10. Agregar el `<span class="sr-only">` al botón de Granular Electronics
    en `PartnerTecnologico.astro` (§3.6). Verificar que no cambia nada
    visualmente.
11. `npm run build` completo. Verificar que sigue generando 41 páginas sin
    errores ni advertencias nuevas.
12. Revisión manual completa con teclado únicamente (sin mouse) desde el
    inicio de la home: Tab a través del header, abrir y cerrar cada
    dropdown con Enter/Espacio y con Escape, llegar al formulario de
    contacto, confirmar que "volver arriba" se oculta al enfocar un
    campo.

## 5. Criterios de aceptación

- [ ] Los 3 disparadores de dropdown del Header son `<button>` con
      `aria-expanded` que cambia correctamente entre `"true"`/`"false"`
      al abrir/cerrar por clic, hover y foco de teclado.
- [ ] Cada panel de dropdown tiene un enlace "Ver todos los X" que
      navega al hub correspondiente (`/sectores`, `/productos`,
      `/servicios`) — el clic en el disparador ya no navega (es
      `<button>`), pero el hub sigue siendo alcanzable en un clic
      adicional dentro del panel.
- [ ] `Escape` cierra el dropdown abierto (si hay uno) y devuelve el foco
      a su disparador; si no hay dropdown abierto, `Escape` cierra el
      menú móvil (si está abierto) y devuelve el foco al botón
      hamburguesa.
- [ ] `WhatsAppButton` y `GoToTop` usan
      `bottom-[calc(*+env(safe-area-inset-bottom))]`; en un dispositivo
      sin *safe area* se ven en la misma posición que antes del cambio.
- [ ] `GoToTop` se oculta (`opacity: 0`, no clicable) mientras cualquier
      campo de `#contact-form` tiene el foco, y reaparece al salir del
      formulario (sujeto al umbral de scroll ya existente).
- [ ] El formulario de contacto tiene un campo `name="_gotcha"` oculto de
      forma visual, semántica (`aria-hidden`) y de tabulación
      (`tabindex="-1"`).
- [ ] Si el campo honeypot tiene contenido al enviar, el formulario
      muestra el mensaje de éxito pero no dispara ni el `fetch` a
      `FORM_ENDPOINT` ni la apertura de WhatsApp.
- [ ] Los 3 enlaces con `target="_blank"` (WhatsApp, LinkedIn ×3 en
      `nosotros.astro`, Granular Electronics) anuncian "se abre en una
      pestaña nueva" en su nombre accesible, sin cambio visual.
- [ ] `npm run build` genera 41 páginas sin errores.
- [ ] Ninguna otra sección, página o comportamiento existente cambia
      fuera de los 6 archivos listados en §3.

## 6. Casos borde

### Por qué no `role="menu"`/`role="menuitem"`
El patrón ARIA "menu" (usado típicamente en menús de aplicación tipo
escritorio) exige soporte completo de navegación por flechas
(↑/↓ entre ítems, ←/→ entre menús de nivel superior, `Home`/`End`), que
este plan no implementa. Declarar `role="menu"` sin ese soporte sería
peor que no declararlo: un lector de pantalla anunciaría un widget que
promete un comportamiento de teclado que no existe. El patrón que sí se
implementa es *disclosure* (WAI-ARIA Authoring Practices, patrón
"Disclosure Navigation Menu"): un botón que expande una región con
enlaces normales, navegables con Tab como cualquier lista de enlaces.

### `dropdown-suppressed` y una segunda tecla Escape
Si el usuario presiona `Escape` dos veces seguidas (la primera cierra el
dropdown y devuelve el foco al botón), la segunda pulsación no encuentra
ningún `aria-expanded="true"` (ya se cerró) ni el menú móvil abierto, así
que no hace nada — comportamiento esperado, no es un error.

### Honeypot y autocompletado del navegador
Algunos gestores de contraseñas o el autocompletado del navegador podrían,
en teoría, rellenar un campo `<input type="text">` visible-para-el-DOM
aunque esté fuera de pantalla. Por eso el campo lleva `autocomplete="off"`
y un `name` (`_gotcha`) que no coincide con ningún patrón que los
gestores de autocompletado reconozcan (a diferencia de `name="email"` o
`name="website"` sin guion bajo, que sí podrían autocompletarse). Es un
campo simple, no infalible contra bots sofisticados que evalúan CSS antes
de rellenar formularios — el propio encargo lo pide como protección
"simple", no como reemplazo de un CAPTCHA.

### `env(safe-area-inset-bottom)` en navegadores sin soporte
Navegadores que no reconocen `env()` (prácticamente ninguno relevante hoy)
simplemente lo tratan como `0` dentro del `calc()`, dejando el mismo
`bottom` de siempre — no hay riesgo de que la propiedad quede inválida o
rompa el layout.

### Orden de las reglas CSS de `.dropdown-suppressed`
Señalado también en §3.1: la regla debe declararse **después** de las
reglas de `:hover`/`:focus-within`/`.is-open` en el archivo, porque tienen
la misma especificidad — si el desarrollador reordena el bloque de estilos
por cualquier motivo, `dropdown-suppressed` podría dejar de ganar el
empate y Escape dejaría de cerrar visualmente el panel abierto por
`:focus-within`. Vale la pena un comentario en el propio CSS al
implementarlo (ya incluido en el bloque de §3.1).

### `GoToTop` y `WhatsAppButton` simultáneamente visibles sobre el formulario
Solo `GoToTop` se oculta durante el foco del formulario (pedido
explícito). `WhatsAppButton` permanece visible — su posición
(`bottom-[calc(1.5rem+...)]`, más abajo que `GoToTop`) tiene menos
probabilidad de solaparse con los últimos campos del formulario, pero no
es cero. Si en producción se observa solapamiento real, es un ajuste de
una línea (mismo patrón `focusin`/`focusout`) para un plan futuro — no se
decide unilateralmente aquí porque no fue parte del encargo.

## 7. Pendiente para un plan futuro (no bloquea este)

- Evaluar si `WhatsAppButton` también debería ocultarse durante el foco
  del formulario de contacto (ver casos borde).
- Si el negocio necesita protección antispam más robusta que un honeypot
  (por ejemplo, si Formspree reporta spam real pese al campo `_gotcha`),
  evaluar un CAPTCHA invisible (reCAPTCHA v3, hCaptcha o similar) — pero
  eso sí requiere una decisión de producto (aceptar la dependencia
  externa y su carga adicional de JS), no algo que este plan deba
  resolver.
- Extender la advertencia de "pestaña nueva" a cualquier enlace externo
  que se agregue en el futuro (blog, landings) como convención de
  componente, no solo a los 3 casos existentes hoy.
