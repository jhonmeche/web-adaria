# Plan 005 — Acordeón exclusivo en el menú móvil

**Estado: APROBADO** — aprobado por Jhon Meche el 2026-07-10. Listo para
IMPLEMENTAR (CLAUDE.md, "Ciclo de trabajo").

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `src/components/layout/Header.astro` (Plan 003, menú móvil con
3 `<details>` independientes).

## 1. Problema

En el menú móvil de `Header.astro`, los 3 acordeones (`<details>` de
Soluciones, Productos y Servicios) son independientes: el usuario puede
tener los 3 abiertos simultáneamente, lo que ocupa casi toda la pantalla
y deja los enlaces de Blog, Nosotros y Contacto fuera del viewport sin
que el usuario sepa que existen — tiene que hacer scroll para descubrirlos.

## 2. Solución propuesta

Agregar el atributo HTML `name="mobile-accordion"` a los 3 elementos
`<details>` en el menú móvil. El estándar HTML (`§4.11.1 The `details`
element`) especifica que cuando se abre un `<details>` con un `name` dado,
cualquier otro `<details>` con el mismo `name` que esté abierto se cierra
automáticamente. Esto da el comportamiento de acordeón exclusivo sin
JavaScript adicional.

### 2.1 ¿Por qué `name` y no un script?

| Aspecto | `name` nativo | Script propio |
|---------|---------------|---------------|
| Complejidad | 0 líneas de JS | ~10–15 líneas (escuchar `toggle`, cerrar otros) |
| Mantenimiento | 0 | Un evento más que mantener |
| Compatibilidad | Chrome 120+, Firefox 125+, Safari 17.5+ | 100 % |
| Degradación | = status quo (múltiples abiertos) | = status quo si falla el script |
| Accesibilidad | Nativo, AT lo entiende | Hay que probar |

El `name` nativo gana en simplicidad. En navegadores que no lo soporten
(ninguno relevante con < 2 % de cuota de mercado a julio 2026), el
comportamiento actual sigue funcionando.

### 2.2 ¿Hay conflictos con el script existente?

**No.** El script del menú móvil (líneas 252–347 de `Header.astro`) hace
3 cosas:

1. Abre/cierra el menú completo al hacer clic en el hamburguesa.
2. Cierra el menú completo al hacer clic en un enlace.
3. Cierra el menú completo con Escape.

Ninguna de estas interfiere con el comportamiento nativo de `name`:
cuando un `<details>` se cierra porque otro se abrió, el navegador cambia
el atributo `open` directamente — no pasa por el script. No hay listeners
de `toggle` que puedan entrar en conflicto.

### 2.3 ¿Hay casos borde?

1. **Click en enlace dentro de un acordeón abierto:** el script existente
   (líneas 261–266) cierra el menú completo (`menu.classList.add('hidden')`)
   cuando se hace clic en cualquier `<a>` dentro del menú. Esto ocurre
   después de la navegación — el cierre del acordeón por `name` ya ocurrió
   (o no, si el usuario ya había navegado). No hay carrera ni conflicto.

2. **Escape con un acordeón abierto:** el manejador de Escape (líneas
   327–346) prioriza los dropdowns de escritorio y luego cierra el menú
   móvil completo. No cierra acordeones individuales — y no necesita
   hacerlo. El `name` ya cerró el acordeón cuando se abrió otro; si solo
   hay uno abierto y el usuario quiere cerrarlo sin abrir otro, usa el
   click en el `<summary>` (comportamiento normal de `<details>`). Escape
   cierra todo el menú, lo cual también contrae el acordeón (el elemento
   deja de estar visible).

3. **Animación del chevron:** la regla CSS
   `.mobile-accordion[open] .mobile-accordion-chevron { rotate: 180deg; }`
   (línea 202–204) ya funciona con el atributo `open` nativo — cuando
   `name` cierra un `<details>`, el navegador quita `open` y el chevron
   rota de vuelta. Sin cambios.

## 3. Cambio requerido

Un solo archivo, un solo cambio:

**Archivo:** `src/components/layout/Header.astro`

Agregar `name="mobile-accordion"` a los 3 `<details>` (líneas 112, 125,
138):

```astro
<!-- antes -->
<details class="mobile-accordion">     <!-- ×3 -->

<!-- después -->
<details name="mobile-accordion" class="mobile-accordion">     <!-- ×3 -->
```

## 4. Pasos atómicos

1. Agregar `name="mobile-accordion"` al primer `<details>` (Soluciones,
   línea 112 de `Header.astro`).
2. Agregar `name="mobile-accordion"` al segundo `<details>` (Productos,
   línea 125).
3. Agregar `name="mobile-accordion"` al tercer `<details>` (Servicios,
   línea 138).
4. `npm run build`. Debe compilar sin errores.

Este plan es tan pequeño que no vale la pena fraccionarlo en sub-lotes —
los 3 cambios se hacen en una sola pasada.

## 5. Prueba (no automatizada, manual)

1. `npm run dev` y abrir el sitio en un navegador moderno (Chrome 120+,
   Firefox 125+, Safari 17.5+ o sus versiones posteriores).
2. Redimensionar a viewport móvil (< 1024 px).
3. Abrir el menú hamburguesa.
4. Abrir "Soluciones" — debe desplegarse la lista de sectores.
5. Abrir "Productos" — "Soluciones" debe cerrarse automáticamente,
   "Productos" debe abrirse.
6. Abrir "Servicios" — "Productos" debe cerrarse automáticamente,
   "Servicios" debe abrirse.
7. Cerrar "Servicios" haciendo clic en su `<summary>` — debe colapsarse
   sin abrir otro.
8. Hacer clic en un enlace dentro de un acordeón (ej. "Ver todos los
   servicios") — debe navegar a la página correspondiente.
9. Abrir el menú, abrir un acordeón, presionar Escape — debe cerrarse el
   menú completo.
10. Probar en un navegador que no soporte `name` en `<details>` (p. ej.
    Firefox < 125 o Chrome < 120 vía dev tools, si se dispone) — el
    comportamiento debe ser el actual (acordeones independientes).

## 6. Criterios de aceptación

- [ ] Los 3 `<details>` del menú móvil tienen `name="mobile-accordion"`.
- [ ] En navegadores compatibles, al abrir un acordeón se cierran los
      otros 2 automáticamente.
- [ ] El chevron (flecha) de cada acordeón rota correctamente al abrir/cerrar.
- [ ] El clic en un enlace dentro de un acordeón navega y cierra el menú
      (comportamiento actual preservado).
- [ ] Escape cierra el menú completo (comportamiento actual preservado).
- [ ] `npm run build` produce 41 páginas sin errores ni advertencias nuevas.
- [ ] Ningún otro archivo fue modificado.

## 7. Casos borde

### Degradación en navegadores que no soportan `name`
Si un navegador no reconoce `name` en `<details>`, el atributo se ignora
y los 3 acordeones siguen siendo independientes — el mismo comportamiento
que hoy. No hay pérdida funcional ni visual.

### Interacción con el cierre por tecla Escape
El manejador de Escape cierra el menú móvil completo, no los acordeones
individualmente. No intentar cerrar acordeones con Escape — es
innecesario y rompería la expectativa del usuario de que un `<details>`
se cierra haciendo clic en su `<summary>`.

### Pantallas muy angostas (< 360 px de ancho)
Incluso con un solo acordeón abierto, el contenido de "Soluciones" (~6
enlaces) puede ocupar buena parte del viewport. Este plan no aborda ese
extremo — es un problema de diseño del menú (p. ej., subtítulos más
cortos o fuente más pequeña en móvil), no de comportamiento del
acordeón.
