# Auditoría de diseño frontend — UX, consistencia visual, responsive y accesibilidad

Fecha: 2026-07-10
Autor: Arquitecto (Claude, según CLAUDE.md)
Alcance: `src/` completo (layouts, componentes, secciones de home, landings de
producto/servicio/sector, blog, nosotros, conceptos, 404). No cubre SEO ni
rendimiento de imágenes/CWV — ver `SEO_AUDIT.md` y `SEO_IMPLEMENTATION.md`,
que ya documentan esas áreas y comparten varios hallazgos de navegación con
esta auditoría (se referencian, no se duplican en detalle).

## Resumen

El sitio tiene un sistema de diseño sólido y muy bien aplicado: tokens
centralizados en `src/styles/global.css`, un componente `Section` que
alterna fondos con disciplina, un patrón `data-reveal` consistente en todas
las secciones, y tres plantillas (producto/servicio/sector) que comparten
estructura casi 1:1. Esa consistencia es la principal fortaleza del proyecto
y hace que los hallazgos de esta auditoría sean, en su mayoría, excepciones
puntuales a un patrón que el propio equipo ya sigue correctamente en el
resto del sitio — no problemas sistémicos.

Los hallazgos más importantes son: (1) el menú móvil no da acceso a las 15
landings de sector/producto/servicio que sí están en el dropdown de
escritorio, y (2) dos secciones consecutivas de la home comparten
prácticamente el mismo fondo claro, rompiendo la alternancia oscuro/claro
que el propio equipo documenta y protege en otras páginas (ver comentario en
`nosotros.astro`).

## 1. Experiencia de usuario (UX)

### 1.1 [CRÍTICO] El menú móvil no da acceso a las landings de sector, producto ni servicio

`src/components/layout/Header.astro:83-95` (menú móvil) vs. `Header.astro:24-68`
(dropdown de escritorio).

En escritorio, al pasar el mouse sobre "Soluciones", "Productos" y
"Servicios" se despliega un submenú con enlaces directos a cada una de las
15 landings (`/sectores/{slug}`, `/productos/{slug}`, `/servicios/{slug}`).
En el menú móvil (`#mobile-menu`), esos mismos ítems son solo cuatro enlaces
planos a anclas de la home (`/#sectores`, `/#productos`, `/#servicios`) — no
hay ningún submenú ni listado de las páginas individuales.

Un usuario móvil que quiere llegar directo a "Manufactura" o a "Smart PBA"
no puede hacerlo desde la navegación: debe abrir el menú, ir a la home,
esperar a que cargue, buscar la sección correspondiente por scroll y recién
ahí tocar la tarjeta correcta. El brief (§10) es explícito en que "muchos
clientes verán desde móvil", por lo que este es el canal de navegación más
usado perdiendo la mitad de la profundidad del sitio.

**Recomendación:** replicar en el menú móvil el mismo patrón de acordeón que
ya usan los dropdowns de escritorio (puede ser un `<details>`/`<summary>`
nativo o un toggle con JS), listando `sectores`, `productos` y `servicios`
igual que el dropdown de escritorio.

### 1.2 [IMPORTANTE] Los breadcrumbs de las landings no llevan a páginas hub, sino a anclas de la home

`src/pages/productos/[slug].astro:53,70,88`, `src/pages/servicios/[slug].astro:51,68,86`,
`src/pages/sectores/[slug].astro:51,67,83`.

El breadcrumb de cada landing ("Inicio / Productos / Smart PBA") y el botón
secundario del hero ("Ver todos los productos") apuntan a `/#productos`,
`/#servicios` o `/#sectores` — anclas dentro de la home, no páginas de
listado. Visualmente el breadcrumb comunica una jerarquía de navegación
("estoy en Productos") que en realidad no existe como página. Además, cada
clic implica una navegación completa a `/` seguida de un salto de scroll
(no hay SPA), lo cual es más lento y menos predecible que un enlace directo
a un hub.

Esto ya está registrado como riesgo medio de SEO en `SEO_AUDIT.md`
("depender de anclas en la home limita la capacidad de posicionar páginas
hub"); aquí se confirma que también es una carencia de UX/IA de la
información, no solo de indexación. La decisión de si vale la pena crear
`/productos/`, `/servicios/` y `/sectores/` como hubs reales está señalada
como pendiente abierta en el propio `CLAUDE.md` (§4, nota de arquitectura) —
esta auditoría refuerza que conviene resolverla pronto.

### 1.3 [IMPORTANTE] La home creció de las 9 secciones documentadas en el brief a 15

`src/pages/index.astro:24-40`.

El brief (§9) define una narrativa de 9 secciones. La home actual encadena
`Hero, Problema, DiagnosticoOperativo, Industria40, Solucion,
ArquitecturaImplementacion, Servicios (2 sub-secciones), Sectores, Stack,
CalidadDato, CasoSmartPBA, PorQue, Noticias, PartnerTecnologico, Contacto` —
15 bloques de scroll completo. Cada sección individual está bien resuelta y
respeta "un mensaje por sección" (§8), pero la suma entera contradice la
misma filosofía de claridad radical que el brief pide tomar de Elementary:
un visitante que llega por primera vez recorre una cantidad considerable de
scroll antes de llegar al formulario de contacto, y varias secciones
compiten por ser "la" prueba de credibilidad (Industria 4.0, Arquitectura,
Calidad del dato, Smart PBA, Por qué AdariA).

**Recomendación:** no es una corrección de código, es una decisión de
producto — evaluar si `DiagnosticoOperativo`, `ArquitecturaImplementacion`
y `CalidadDato` pueden fusionarse o moverse a una landing de "Metodología"
aparte, dejando la home más cerca de la longitud original del brief.

### 1.4 [MENOR] "Aliado tecnológico" (Granular Electronics) comparte la home justo antes del CTA final

`src/components/sections/PartnerTecnologico.astro`.

Es una sección bien resuelta y con un tratamiento visual deliberadamente
distinto (correcto, según su propio comentario en el código), pero al vivir
en la home general — y no, por ejemplo, en `/nosotros` o en una landing de
alianzas — introduce a una empresa distinta a AdariA justo antes de la
sección de contacto, en el tramo de la página donde el usuario ya debería
estar convergiendo hacia un solo CTA. No es un error, es un riesgo de foco
que vale la pena revisar con métricas reales de conversión una vez el sitio
esté en producción.

### 1.5 [MENOR] El formulario de contacto no enlaza una política de privacidad

`src/components/sections/Contacto.astro:125-127`.

El texto "Al enviar acepta que le contactemos sobre su solicitud." no tiene
enlace a ningún documento. Ya está registrado en `SEO_AUDIT.md` como
pendiente de prioridad "Alta" a nivel legal/SEO; aquí se confirma que
también es una carencia de UX para un formulario B2B que pide correo
corporativo y empresa.

### 1.6 [MENOR] El footer no ofrece un correo o teléfono corporativo visible

`src/components/layout/Footer.astro:10-59`.

El footer tiene columnas de navegación completas (Soluciones, Productos,
Servicios) pero ningún dato de contacto directo (correo, teléfono, ciudad):
solo "Colombia · Latinoamérica". El único canal de contacto inmediato en
todo el sitio es el botón flotante de WhatsApp. Para un sitio B2B que vende
consultivamente, tener al menos un correo de contacto visible en el footer
(aunque sea el mismo que ya usa el formulario) refuerza la percepción de
solidez corporativa.

## 2. Consistencia visual

### 2.1 [IMPORTANTE] Dos secciones consecutivas de la home comparten casi el mismo fondo claro

`src/components/sections/Problema.astro:35` (`theme="white"` → `bg-surface`,
`#ffffff`) seguida inmediatamente por
`src/components/sections/DiagnosticoOperativo.astro:27` (`theme="light"` →
`bg-light`, `#f5f7fa`) — ver el orden real en `src/pages/index.astro:26-27`.

El brief (§13.1) es explícito: "Alternar secciones oscuras (`#0C1116`) y
claras (`#F4F6F9`) para dar ritmo a la home". El componente `Section.astro`
sí ofrece esa alternancia (`dark` / `light` / `white`), y el resto de la
home la respeta con disciplina: `Industria40 (dark) → Solucion (white) →
ArquitecturaImplementacion (dark) → Servicios (white→dark) → Sectores
(white) → Stack (dark) → CalidadDato (white) → CasoSmartPBA (dark) → PorQue
(white) → Noticias (dark) → PartnerTecnologico (white) → Contacto (dark)`.
Pero justo al inicio, `Problema` (`white`, `#ffffff`) y
`DiagnosticoOperativo` (`light`, `#f5f7fa`) quedan una encima de la otra sin
ninguna sección oscura entre medio. La diferencia de luminancia entre
`#ffffff` y `#f5f7fa` es mínima (~2%), así que al hacer scroll el límite
entre ambas secciones es casi imperceptible: en la práctica se leen como un
solo bloque largo de ~700px+ de alto, justo al principio del recorrido,
donde más importa transmitir ritmo.

Es un hallazgo puntual, no sistémico: el propio equipo demuestra que cuida
esta regla activamente en otra página — hay un comentario explícito en
`src/pages/nosotros.astro:304-306` que dice literalmente "dos secciones
oscuras seguidas rompían la alternancia del resto del sitio" y cambia el
CTA final a fondo claro por esa razón. La misma disciplina no se aplicó
entre `Problema` y `DiagnosticoOperativo`.

**Recomendación:** cambiar `DiagnosticoOperativo` a `theme="dark"` (y
ajustar sus cards a la variante oscura, como ya hacen `ArquitecturaImplementacion`
o `Servicios`/metodología), o mover `Industria40` (ya oscura) antes de
`DiagnosticoOperativo` en vez de después.

### 2.2 [MENOR] Comentarios de diseño desactualizados sobre el orden de secciones

`src/components/sections/CasoSmartPBA.astro:3`,
`src/components/sections/Servicios.astro:5-7`,
`src/components/sections/Stack.astro:2-3`,
`src/components/sections/Solucion.astro:4-6`.

Varios componentes documentan en su comentario de cabecera qué sección va
"antes" y "después" para justificar su `theme`, pero esos comentarios ya no
coinciden con el orden real de `index.astro` (por ejemplo, `Servicios.astro`
describe la secuencia "Arquitectura → Servicios → Servicios/método →
Sectores", que sigue siendo cierta, pero `CasoSmartPBA.astro` dice
simplemente "alterna oscuro→blanco desde el Hero" sin reflejar las 9
secciones que hay en medio). No es un bug visual, pero si alguien vuelve a
reordenar secciones confiando en estos comentarios en vez de verificar
`index.astro`, es fácil reintroducir un salto como el del punto 2.1.

**Recomendación:** al tocar el orden de secciones, actualizar el comentario
o eliminarlo y dejar que `index.astro` sea la única fuente de verdad del
orden.

### 2.3 [MENOR] Colores sectoriales usados como color de ícono sin verificar contraste

`src/pages/sectores/[slug].astro:156` (`style="color:var(--sector)"` en
checks de lista) y `src/pages/sectores/[slug].astro:191` (número sobre
fondo sólido `var(--sector)`).

El color sectorial de Hidrocarburos/Minería/Energía es `#f08c1d` (ámbar,
`src/data/sectores.ts:70`). Usado como `color` de un ícono de trazo fino
sobre fondo blanco (`bg-surface`), el contraste ronda ~2:1 — por debajo del
mínimo de 3:1 que WCAG 1.4.11 (Non-text Contrast) recomienda para
componentes gráficos con significado informativo. El resto de colores
sectoriales (`#c0552f`, `#4a7fb5`, `#1ba89a`, `#5c9a35`) están más cerca del
umbral pero conviene revisarlos todos juntos. El número dentro de un
cuadro sólido (`sectores/[slug].astro:191`) no tiene este problema porque
usa texto blanco sobre el color sólido, no el color sobre blanco.

## 3. Responsive

### 3.1 [IMPORTANTE] Botones flotantes de WhatsApp y "volver arriba" sin margen de seguridad para pantallas bajas

`src/components/ui/WhatsAppButton.astro:24` (`bottom-6 right-6`) y
`src/components/ui/GoToTop.astro:16` (`bottom-28 right-6`).

Ambos botones son `fixed` con offsets fijos en `rem`, sin usar
`env(safe-area-inset-bottom)` ni ajuste por `dvh`. En un móvil en horizontal
con teclado virtual abierto (por ejemplo, si el usuario enfoca el textarea
del formulario de contacto en landscape, donde la altura visible puede
bajar de 400px), los ~130px combinados que ocupan ambos botones apilados
pueden solapar controles del formulario o quedar recortados por la barra
del navegador/gestos del sistema en dispositivos con notch. No se detectó
en el código ningún ajuste condicional para esos casos.

**Recomendación:** añadir `env(safe-area-inset-bottom)` al `bottom` de
ambos botones y considerar ocultar el `GoToTop` mientras el foco esté dentro
del formulario de contacto (`Contacto.astro`).

### 3.2 [MENOR] El hero repite `max-w-[calc(100vw-3rem)]` como parche de overflow en 5 lugares distintos

`src/components/sections/Hero.astro:93,98,118,124,130,147`.

Cada bloque de contenido del hero (eyebrow, h1, párrafo, botones, link,
lista de features) repite individualmente
`max-w-[calc(100vw-3rem)]` para evitar overflow horizontal en móvil, en vez
de que el contenedor padre (`div class="relative mx-auto ... px-6 ..."`,
línea 90) limite el ancho una sola vez. Funciona, pero es frágil: si el
padding del contenedor cambia (`px-6` → otro valor), hay que actualizar el
"3rem" mágico en los 5 lugares a la vez o vuelve a aparecer el overflow que
el parche evita.

## 4. Accesibilidad

### 4.1 [IMPORTANTE] Los dropdowns de escritorio no comunican su estado a lectores de pantalla

`src/components/layout/Header.astro:27-29,41-43,54-56`.

Los disparadores "Soluciones", "Productos" y "Servicios" son elementos
`<a href="/#...">` con `aria-haspopup="true"`, pero ese atributo nunca se
acompaña de `aria-expanded`, y al ser un enlace (no un `<button>`) su rol
semántico por defecto tampoco comunica "tiene un submenú". Un usuario de
lector de pantalla recibe el anuncio de un enlace normal, sin indicación de
que al enfocarlo (o pasar el mouse en el `group:hover`) aparece un
`<div class="dropdown">` con más opciones. El submenú sí es alcanzable por
teclado gracias a `:focus-within` (correcto), pero no es *anunciado*.

**Recomendación:** cambiar el disparador a `<button aria-expanded="false"
aria-controls="...">` y alternar `aria-expanded` con JS al mostrar/ocultar
el dropdown (mismo patrón que ya usa el botón de menú móvil en
`Header.astro:71-76`, que sí lo hace bien).

### 4.2 [IMPORTANTE] Ni el menú móvil ni los dropdowns se cierran con la tecla Escape

`src/components/layout/Header.astro` (bloque `<script>`, líneas 151-183).

El script del header maneja clic en el botón hamburguesa, clic en cada
enlace del menú móvil, y scroll — pero no hay ningún listener de `keydown`
para `Escape`. Un usuario de teclado que abre el menú móvil o entra a un
dropdown de escritorio con Tab no tiene una forma estándar de cerrarlo sin
seguir tabulando hasta salir del componente o hasta el enlace siguiente.
Esto es una expectativa de accesibilidad estándar (WAI-ARIA Authoring
Practices) para cualquier patrón de menú desplegable.

### 4.3 [MENOR] Enlaces que abren en pestaña nueva no lo advierten textualmente

`src/components/ui/WhatsAppButton.astro:19-26` (WhatsApp),
`src/pages/nosotros.astro:288-296` (LinkedIn de cada fundador),
`src/components/sections/PartnerTecnologico.astro:94-103` ("Visitar
granularelectronics.com").

Los tres usan `target="_blank" rel="noopener noreferrer"` (correcto en la
parte de seguridad) pero ninguno indica en el texto accesible que el enlace
abre una pestaña nueva (ni un `aria-label` que lo mencione ni un ícono
distinto al habitual). No es bloqueante — son patrones muy reconocibles
(ícono de WhatsApp, "LinkedIn", URL externa explícita en el texto del botón)
— pero WCAG 3.2.5 recomienda advertir el cambio de contexto de forma
perceptible para todos los usuarios, no solo por convención visual.

## Fortalezas a mantener

- Sistema de tokens (`global.css`) y componente `Section` consistentes;
  la alternancia oscuro/claro se respeta correctamente en 14 de las 15
  secciones de la home (ver 2.1 para la excepción).
- Las tres plantillas de landing (producto/servicio/sector) comparten
  estructura, breadcrumb, patrón de hero, `data-reveal` y cierre con
  cross-sell casi 1:1 — reduce el riesgo de deriva visual entre páginas.
- `prefers-reduced-motion` se respeta de forma sistemática en absolutamente
  todas las animaciones revisadas (reveals, carrusel, contadores, videos de
  fondo, anillo de WhatsApp).
- El carrusel del hero cumple WCAG 2.2.2 (pausa con hover y con foco de
  teclado antes de reproducir el siguiente slide) y usa `role="tablist"` /
  `aria-selected` correctamente en los puntos indicadores.
- Foco visible global consistente (`:focus-visible` con outline de marca)
  en `global.css:131-135`, aplicado en todos los componentes interactivos
  revisados.
- El meta viewport no bloquea el zoom (`width=device-width, initial-scale=1`,
  sin `user-scalable=no` ni `maximum-scale`) — buena práctica de
  accesibilidad que muchos sitios rompen sin darse cuenta.
- El índice numérico de `Eyebrow` (`index={1}`…`index={12}`) en las
  secciones de la home está completo y sin huecos ni duplicados, reforzando
  la identidad "spec técnico" del sitio de forma coherente en las 12
  secciones que lo usan.

## Priorización

### Crítica
- 1.1 — Menú móvil sin acceso a landings de sector/producto/servicio.

### Importante
- 1.2 — Breadcrumbs y CTAs de "ver todos" apuntan a anclas de home, no a hubs.
- 1.3 — Home con 15 secciones frente a las 9 del brief; riesgo de dilución.
- 2.1 — Dos secciones claras consecutivas rompen la alternancia oscuro/claro.
- 3.1 — Botones flotantes sin margen de seguridad en pantallas bajas.
- 4.1 — Dropdowns de escritorio sin `aria-expanded`.
- 4.2 — Menús desplegables sin cierre por tecla Escape.

### Menor
- 1.4 — "Aliado tecnológico" comparte foco con el CTA final de la home.
- 1.5 — Formulario sin enlace a política de privacidad (ya en SEO_AUDIT.md).
- 1.6 — Footer sin correo/teléfono corporativo visible.
- 2.2 — Comentarios de orden de secciones desactualizados.
- 2.3 — Contraste de colores sectoriales como color de ícono sin verificar.
- 3.2 — Parche repetido `max-w-[calc(100vw-3rem)]` en el hero.
- 4.3 — Enlaces externos sin advertencia textual de nueva pestaña.
