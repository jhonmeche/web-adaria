# Plan 006 — Animación de apertura/cierre del acordeón móvil

**Estado: BORRADOR** — pendiente de revisión del arquitecto.

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `src/components/layout/Header.astro` (Plan 005, acordeón exclusivo
vía `name`).

## 1. Problema

Los 3 paneles del menú móvil (`<details>` de Soluciones, Productos y Servicios)
se expanden y colapsan instantáneamente, sin transición. El resto del sitio usa
animaciones sutiles (reveal al scroll, transiciones de hover en tarjetas,
escalonado de dropdown items, rotación del chevron con `duration-200`), lo que
hace que esta brusquedad resalte.

## 2. Solución propuesta

Usar la transición CSS de `grid-template-rows` entre `0fr` (cerrado) y `1fr`
(abierto) para animar la altura del panel, complementada con una transición de
opacidad. Cuando el `<details>` recibe o pierde el atributo `open`, el
navegador interpola el tamaño del grid track automáticamente —sin JavaScript.

Requiere agregar un `<div>` interno por panel (`mobile-accordion-inner`) que
actúa como contenedor del contenido con `overflow: hidden`, mientras que el
`div` externo (`mobile-accordion-panel`) es el que transiciona.

## 3. Evaluación técnica

### 3.1 Comparación de enfoques

| Enfoque | JS | Compatibilidad | Calidad de animación |
|---------|----|----------------|---------------------|
| `max-height` fijo grande | No | ~100 % | Timing impreciso: al cerrar interpola hasta el máximo declarado, no hasta la altura real del contenido |
| **`grid-template-rows: 0fr → 1fr`** ★ | **No** | Chrome 117+, Safari 17.4+, Firefox 118+ (~95 % a jul 2026) | Perfecta: interpela exactamente la altura real |
| `calc-size()` / `interpolate-size` | No | Chrome 129+, Safari 18.2+, Firefox 131+ | Perfecta, pero soporte más estrecho |
| JS con `scrollHeight` + `requestAnimationFrame` | Sí (~10 líneas) | ~100 % | Perfecta, pero añade JS |

**Decisión: `grid-template-rows`.** A julio 2026, el soporte cubre >95 % de
los usuarios. El público B2B corporativo del sitio tiende a Chrome desktop
reciente y Safari Mobile — ambos compatibles. La degradación es elegante: sin
la transición, el panel abre/cierra al instante (comportamiento nativo de
`<details>`).

### 3.2 ¿Conflicto con funcionalidad existente?

| Funcionalidad | Impacto | Análisis |
|---------------|---------|----------|
| `name="mobile-accordion"` (plan 005) | **Ninguno** | Cuando un panel se cierra porque otro se abrió, el navegador dispara la transición de cierre mientras abre el nuevo — ambas animaciones coexisten |
| Cierre con Escape (plan 003) | **Ninguno** | Escape añade `hidden` al menú completo; el panel no está visible, no necesita animarse |
| Click en enlace cierra menú (plan 003) | **Ninguno** | Ídem que Escape |
| Rotación del chevron (líneas 199–203) | **Sinérgico** | La transición del chevron `duration-200` (0.2 s) es más corta que la del panel (0.3 s) — da una sensación de apertura secuenciada natural |
| `prefers-reduced-motion` | **Cumple** | La transición se envuelve en `@media (prefers-reduced-motion: no-preference)` |

### 3.3 Detalle técnico: cómo funciona `grid-template-rows` con `<details>`

El `<details>` nativo solo intercambia la presencia del atributo `open`. No
expone hooks de animación. La técnica:

1. El panel externo es un grid de una sola fila con `grid-template-rows: 0fr`.
2. El panel interno tiene `min-height: 0; overflow: hidden` — necesario para
   que `0fr` compute a 0 (sin `min-height: 0`, el contenido fuerza un mínimo).
3. Cuando `[open]` está presente, la regla
   `.mobile-accordion[open] .mobile-accordion-panel` cambia a `1fr`.
4. El navegador interpola el track size entre 0 y la altura real del contenido
   interno, produciendo la animación suave.
5. La opacidad se transiciona en paralelo para que el contenido no aparezca
   completo antes de que termine la apertura.

## 4. Cambios requeridos

Un solo archivo: `src/components/layout/Header.astro`.

### 4.1 Estructura HTML — agregar `<div class="mobile-accordion-inner">`

Tres lugares (los 3 `<details>` panels, líneas 117–122, 130–135, 143–148).

**Antes (cada panel):**
```html
<div class="mobile-accordion-panel">
  <a href="/sectores" class="mobile-sublink mobile-sublink-all">Ver todos los sectores</a>
  {sectores.map((s) => (
    <a href={`/sectores/${s.slug}`} class="mobile-sublink">{s.nombre}</a>
  ))}
</div>
```

**Después:**
```html
<div class="mobile-accordion-panel">
  <div class="mobile-accordion-inner">
    <a href="/sectores" class="mobile-sublink mobile-sublink-all">Ver todos los sectores</a>
    {sectores.map((s) => (
      <a href={`/sectores/${s.slug}`} class="mobile-sublink">{s.nombre}</a>
    ))}
  </div>
</div>
```

### 4.2 CSS — modificar `.mobile-accordion-panel` + agregar `.mobile-accordion-inner`

**Reemplazar** la regla actual (líneas 205–207):
```css
.mobile-accordion-panel {
  @apply space-y-0.5 py-1 pl-4;
}
```

Por:
```css
.mobile-accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
}

.mobile-accordion[open] .mobile-accordion-panel {
  grid-template-rows: 1fr;
  opacity: 1;
}

.mobile-accordion-inner {
  @apply space-y-0.5 py-1 pl-4;
  min-height: 0;
  overflow: hidden;
}
```

### 4.3 CSS — agregar `@media (prefers-reduced-motion: no-preference)`

En el bloque `@media` existente (líneas 217–238, después de la última regla de
`animation-delay`), **agregar**:
```css
@media (prefers-reduced-motion: no-preference) {
  .mobile-accordion-panel {
    transition: grid-template-rows 0.3s ease, opacity 0.25s ease;
  }
}
```

Con `prefers-reduced-motion: reduce`, el `transition` no se aplica y el panel
aparece/desaparece instantáneamente.

## 5. Pasos atómicos

1. Leer `src/components/layout/Header.astro`.
2. En el primer panel (Soluciones, línea 117–122), agregar
   `<div class="mobile-accordion-inner">` después de la apertura de
   `mobile-accordion-panel` y cerrarlo antes del cierre del div.
3. Repetir para el segundo panel (Productos, líneas 130–135).
4. Repetir para el tercer panel (Servicios, líneas 143–148).
5. En el `<style>` del componente, reemplazar la regla
   `.mobile-accordion-panel` (líneas 205–207) por el bloque de §4.2.
6. Agregar el bloque `@media (prefers-reduced-motion: no-preference)` con la
   transición según §4.3.
7. `npm run build`. Debe compilar sin errores (41 páginas, 0 errores).

## 6. Prueba (no automatizada, manual)

1. `npm run dev` y abrir en navegador moderno (Chrome 117+, Safari 17.4+,
   Firefox 118+ o versiones posteriores).
2. Viewport móvil (<1024 px). Abrir el menú hamburguesa.
3. **Abrir "Soluciones"** — el panel debe deslizarse hacia abajo en ~300 ms
   con opacidad creciente.
4. **Cerrar "Soluciones"** haciendo clic en su `<summary>` — el panel debe
   deslizarse hacia arriba en ~300 ms.
5. **Acordeón exclusivo:** abrir "Soluciones", luego abrir "Productos" —
   "Soluciones" debe cerrarse con animación mientras "Productos" se abre.
6. **Enlaces:** hacer clic en "Ver todos los sectores" dentro del panel —
   debe navegar y cerrar el menú.
7. **Escape:** abrir un acordeón, presionar Escape — debe cerrarse el menú
   completo.
8. **prefers-reduced-motion: reduce** — en DevTools (Chrome: Rendering tab >
   Emulate CSS media feature prefers-reduced-motion > `reduce`):
   - Abrir y cerrar acordeones: deben hacerlo instantáneamente, sin transición.
   - Verificar que no haya fugas de opacidad (el panel debe verse completamente
     opaco al abrirse).
9. **Degradación en navegador sin soporte** (si se dispone de uno): el panel
   abre/cierra al instante, sin animación ni pérdida funcional.
10. Volver a emular `no-preference` y confirmar que las transiciones regresan.

## 7. Criterios de aceptación

- [ ] Los 3 paneles se abren con transición suave de altura y opacidad (~300 ms).
- [ ] Los 3 paneles se cierran con la misma transición.
- [ ] El comportamiento exclusivo del plan 005 se preserva: al abrir un panel
      se cierra el otro con animación.
- [ ] El cierre por Escape (plan 003) sigue funcional.
- [ ] El clic en un enlace dentro del panel navega y cierra el menú.
- [ ] Con `prefers-reduced-motion: reduce` activado en DevTools, los paneles
      abren y cierran instantáneamente.
- [ ] Los chevrones siguen rotando sincronizados con el estado `open`.
- [ ] `npm run build` produce 41 páginas, 0 errores.
- [ ] Ningún archivo fuera de `src/components/layout/Header.astro` fue
      modificado.

## 8. Degradación

En navegadores que no soporten transición de `grid-template-rows`, la
propiedad `transition` se ignora y el panel abre/cierra al instante —
comportamiento nativo de `<details>` sin pérdida funcional ni visual.

La opacidad en estado cerrado (`opacity: 0`) combinada con `display: grid`
podría ocultar contenido incluso si la transición no se ejecuta — pero como
el `<details>` nativo ya oculta el contenido cuando no tiene `open`, el
`opacity: 0` es redundante en ese caso. En navegadores modernos sin soporte
de transición de grid, `opacity: 0` se aplica pero el panel sigue sin ser
visible porque `<details>` sin `open` no renderiza su contenido. No hay
riesgo de contenido invisible en navegadores que sí soporten el atributo
`open` de `<details>`.
