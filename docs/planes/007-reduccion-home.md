# Plan 007 — Reducción de la home: 3 escenarios de decisión

**Estado: BORRADOR — DOCUMENTO DE DECISIÓN, NO DE EJECUCIÓN.**
No modifica ningún archivo. Presenta 3 escenarios para que el propietario
elija uno; solo entonces se redactará el plan de ejecución
correspondiente (que sí seguirá el ciclo APROBADO → IMPLEMENTAR →
REVISAR de CLAUDE.md).

Autor: Arquitecto (Claude)
Fecha: 2026-07-10
Basado en: `docs/auditorias/01-diseno-frontend.md` (hallazgo 1.3 — home de
15 secciones frente a las 9 del brief; y de paso 2.1 — dos secciones
claras consecutivas) y `docs/auditorias/02-estructura.md` (hallazgos 3.1
mezcla de niveles 1/2/3, 3.2 redundancia narrativa, 3.3 mensaje de método
repetido 3 veces, 3.4 el caso Smart PBA no enlaza a su landing).

---

## 1. Punto de partida: la home hoy (15 componentes, 16 bloques visuales)

Orden real (`src/pages/index.astro:25-39`) con su fondo actual
(D = oscuro, C = claro):

| # | Sección | Fondo | Mensaje comercial que aporta |
|---|---|---|---|
| 1 | Hero (carrusel) | **D** | Promesa + "Industria 4.0 a la operación real" + CTA |
| 2 | Problema | C | El costo de operar a ciegas (dolor) |
| 3 | DiagnosticoOperativo | C | "Partimos de su operación real, no de una plantilla" (método) |
| 4 | Industria40 | **D** | Marco I4.0 → 6 pilares, cada uno atado a un producto |
| 5 | Solución | C | Captar → Procesar → Decidir (3 pasos) |
| 6 | ArquitecturaImplementación | **D** | Campo → Borde → Plataforma → Decisión (4 capas) |
| 7 | Servicios | C→**D** | Capacidades (grid) + metodología (5 pasos) |
| 8 | Sectores | C | 5 sectores + tarjeta de invitación |
| 9 | Stack | **D** | 3 productos con detalle completo |
| 10 | CalidadDato | C | "El dato debe poder revisarse" (5 criterios) |
| 11 | CasoSmartPBA | **D** | Prueba de credibilidad (solo enlaza a #contacto) |
| 12 | PorQue | C | 4 diferenciadores (a la medida, hardware, dato auditable, entrada acotada) |
| 13 | Noticias | **D** | Teaser de los 3 últimos artículos del blog |
| 14 | PartnerTecnologico | C | Granular Electronics (otra empresa) |
| 15 | Contacto | **D** | Formulario + CTA final |

**Dos roturas de alternancia ya presentes:** #2 Problema (blanco `#fff`) →
#3 Diagnóstico (gris `#f5f7fa`) son dos claros casi idénticos seguidos
(audit 01 §2.1); y todo escenario que quite Noticias o Partner debe cuidar
que #13→#15 no deje dos oscuros seguidos.

### Mapa de redundancia (la materia prima de los 3 escenarios)

- **Redundancia A — "el viaje del dato", contada dos veces** (audit 3.2,
  IMPORTANTE): #5 Solución (Captar→Procesar→Decidir) y #6 Arquitectura
  (Campo→Borde→Plataforma→Decisión) narran el mismo recorrido
  sensor→decisión, consecutivas y con el mismo motivo visual. Es la
  redundancia más clara del sitio.
- **Redundancia B — "trabajamos con método", contada tres veces** (audit
  3.3): #3 Diagnóstico, la metodología dentro de #7 Servicios
  (Descubrimiento→…→Soporte) y #10 CalidadDato repiten "entendemos su
  operación antes de vender; el trabajo es riguroso y auditable".
- **Redundancia C — el ADN, repetido como refrán y como sección:** la
  frase "del sensor a la decisión / bajo un mismo techo / dato auditable"
  aparece en Hero, Solución, Sectores, Stack y **como sección propia** en
  #12 PorQue. Como refrán está bien; como sección dedicada, PorQue es en
  buena parte una reafirmación.
- **Contenido de nivel 3 en la home** (audit 3.1): #9 Stack muestra el
  detalle completo de los 3 productos (no un teaser) y #11 CasoSmartPBA es
  contenido de un solo producto — ambos ahora tienen landing propia
  (`/productos`, `/productos/smart-pba`, `/sectores/industria-carnica`)
  creada en los planes 001-002.

---

## 2. Mejora transversal aplicada en LOS TRES escenarios

Independiente de cuál se elija, y porque no cuesta secciones:

- **CasoSmartPBA gana enlaces** a `/sectores/industria-carnica` y
  `/productos/smart-pba` (corrige audit 3.4). Hoy solo enlaza a
  `#contacto`; la sección de mayor credibilidad debe poder profundizar.
- **Regla de oro de este documento:** nada se borra. Todo lo que sale de
  la home aterriza en una landing que **ya existe** tras los planes
  001-002 (`/servicios`, `/productos`, `/sectores/*`, `/nosotros`,
  `/blog`) — varias de ellas hoy delgadas, así que reciben el contenido
  como enriquecimiento, no como relleno.

---

## 3. ESCENARIO CONSERVADOR — 12 secciones

> Filosofía: quitar solo la redundancia más indiscutible y la fricción ya
> señalada, sin tocar la columna vertebral del mensaje.

### Qué cambia (3 movimientos)

1. **Fusiona #5 Solución + #6 Arquitectura** en una sola sección "Del
   sensor a la decisión". Se conserva Captar→Procesar→Decidir como
   narrativa principal; las 4 capas técnicas (Campo/Borde/Plataforma/
   Decisión) **se mueven a `/servicios`** (hub hoy delgado) como bloque
   "cómo implementamos". (Resuelve audit 3.2.)
2. **Retira #3 DiagnosticoOperativo.** Su mensaje ("partimos de su
   operación real, piloto acotado") ya vive en la metodología de
   Servicios (paso "Descubrimiento") y en PorQue ("entrada acotada"); el
   detalle de 3 puntos **se mueve a `/servicios`**. (Resuelve la pata más
   débil de audit 3.3 y, de paso, la rotura de alternancia 01 §2.1.)
3. **Reubica #14 PartnerTecnologico (Granular)** a `/nosotros` como bloque
   "aliado / compañía hermana". (Resuelve audit 01 §1.4: una empresa
   ajena deja de competir con el CTA final.)

### Orden final y alternancia (12)

| # | Sección | Fondo |
|---|---|---|
| 1 | Hero | **D** |
| 2 | Problema | C |
| 3 | Industria40 | **D** |
| 4 | Del sensor a la decisión (Sol+Arq) | C |
| 5 | Stack (productos) | **D** |
| 6 | Servicios (capacidades C → método D) | C→**D** |
| 7 | Sectores | C |
| 8 | CasoSmartPBA | **D** |
| 9 | CalidadDato | C |
| 10 | Noticias | **D** |
| 11 | PorQue | C |
| 12 | Contacto | **D** |

Alternancia limpia (D C D C D [C D] C D C D C D). **No requiere recolorear
ninguna sección**, solo reordenar (Stack sube antes de Servicios; el
grupo de cierre se intercala). La rotura Problema/Diagnóstico desaparece
sola al quitar Diagnóstico.

### A dónde va lo que sale

| Sale | Destino |
|---|---|
| 4 capas técnicas (Arquitectura) | `/servicios` — bloque "cómo implementamos" |
| Diagnóstico (3 puntos) | `/servicios` — se funde en metodología |
| Granular Electronics | `/nosotros` — bloque aliado |

### Mensaje B2B: qué se gana / qué se arriesga

- **Se refuerza:** el sitio deja de contar el viaje del dato dos veces →
  la promesa "del sensor a la decisión" gana nitidez. El CTA final deja de
  compartir escenario con otra empresa.
- **Se debilita:** poco. Sigue siendo una home larga (12); el clúster de
  confianza (CalidadDato + PorQue) sigue algo repetitivo y la home todavía
  mezcla teaser (Sectores) con detalle de nivel 3 (Stack completo).
- **Riesgo:** mínimo. Es el escenario más seguro y el de menor retorno.

---

## 4. ESCENARIO MODERADO — 10 secciones

> Filosofía: consolidar los mensajes repetidos en una sola voz fuerte y
> empujar el detalle "de cómo trabajamos" a las landings que ya existen.

### Qué cambia (los 3 del Conservador + 2 más + 1 interno)

4. **Funde #10 CalidadDato en #12 PorQue.** PorQue pasa a ser "Por qué
   AdariA" con los 4 diferenciadores **más** un tratamiento compacto de
   "dato auditable" (el titular de CalidadDato). Los 5 criterios de
   calidad **se mueven a `/servicios/analitica-y-decision`** y al bloque
   ADN de `/nosotros`. (Cierra audit 3.3: los tres ecos de "método/rigor"
   se reducen a uno.)
5. **Retira #13 Noticias de la home.** El blog sigue accesible por nav y
   footer; el teaser deja de interrumpir el tramo de conversión.
6. **Mueve la metodología** (2º bloque de Servicios) **a `/servicios`**,
   dejando Servicios como un solo bloque de capacidades en la home.

### Orden final y alternancia (10)

| # | Sección | Fondo |
|---|---|---|
| 1 | Hero | **D** |
| 2 | Problema | C |
| 3 | Industria40 | **D** |
| 4 | Del sensor a la decisión (Sol+Arq) | C |
| 5 | Stack (productos) | **D** |
| 6 | Servicios (solo capacidades) | C |
| 7 | CasoSmartPBA | **D** |
| 8 | Sectores | C |
| 9 | PorQue + dato auditable | **D** ← *recolorear* |
| 10 | Contacto | **D** |

Con 10 secciones y ambos extremos oscuros (Hero y Contacto), la
alternancia estricta es geométricamente imposible sin una adyacencia
repetida: se resuelve con **un cierre oscuro deliberado** (PorQue→Contacto)
que lee como un "remate serio" hacia el formulario. **Requiere recolorear
PorQue a oscuro** (hoy claro); CasoSmartPBA (D, #7) actúa de puente entre
Servicios (C) y Sectores (C) para que no queden dos claros juntos.

### A dónde va lo que sale (además de lo del Conservador)

| Sale | Destino |
|---|---|
| CalidadDato (5 criterios) | `/servicios/analitica-y-decision` + ADN de `/nosotros`; el titular se funde en PorQue |
| Metodología (5 pasos) | `/servicios` — bloque "cómo trabajamos" |
| Noticias (teaser blog) | `/blog` (ya accesible por nav/footer) |

### Mensaje B2B: qué se gana / qué se arriesga

- **Se refuerza:** el diferenciador de confianza se dice **una sola vez y
  con más fuerza** (PorQue absorbe "dato auditable"). El detalle de "cómo
  trabajamos/implementamos" enriquece `/servicios` (hoy delgada) → doble
  ganancia: home más corta **y** landing de servicios más sólida (que
  además ayuda al SEO de "servicios de Industria 4.0", audit SEO). Se
  conservan intactos los 3 productos, los sectores, la prueba (Smart PBA)
  y el marco I4.0 — la espina dorsal de venta queda completa.
- **Se debilita:** el relato de "socio metódico y riguroso" en la home se
  adelgaza a lo que digan PorQue ("entrada acotada") y Solución; el
  comprador que responde a "ingeniería seria y ordenada" recibe una dosis
  más ligera en la home (mitigado: está a un clic en `/servicios`). El
  teaser de blog sale de la home (señal menor de "empresa activa/al día").
- **Riesgo:** medio. Recolorear PorQue y migrar la metodología exige QA
  visual cuidadoso, pero el núcleo comercial no se toca.

---

## 5. ESCENARIO AGRESIVO — 9 secciones (alineado al brief §9)

> Filosofía: volver exactamente a la narrativa de 9 secciones que el brief
> definió; cada sección de la home es un teaser que enruta a su landing.

### Qué cambia (los 5 del Moderado + demotar Servicios)

7. **Servicios deja de ser sección propia.** Las 6 capacidades se
   comprimen a **una tira compacta dentro de Stack** ("3 productos +
   servicios a la medida", tal como el brief §5 las concibió juntas); las
   tarjetas completas de servicio viven en el hub `/servicios`.

Resultado = las 9 secciones del brief §9: Hero, Problema, Industria 4.0,
La solución en pasos, El stack integral, Sectores, Caso Smart PBA, Por qué
AdariA, Contacto.

### Orden final y alternancia (9)

| # | Sección | Fondo |
|---|---|---|
| 1 | Hero | **D** |
| 2 | Problema | C |
| 3 | Industria40 | **D** |
| 4 | Del sensor a la decisión (Sol+Arq) | C |
| 5 | Stack (productos + tira de servicios) | **D** |
| 6 | Sectores | C |
| 7 | CasoSmartPBA | **D** |
| 8 | PorQue + dato auditable | C |
| 9 | Contacto | **D** |

Al ser **impar** con ambos extremos oscuros, la alternancia es **estricta
y perfecta** (D C D C D C D C D) **sin recolorear nada**. Estructuralmente
es el más limpio de los tres.

### A dónde va lo que sale (además de lo del Moderado)

| Sale | Destino |
|---|---|
| Servicios (tarjetas completas) | `/servicios` (hub, ya existe); la home deja solo una tira |

### Mensaje B2B: qué se gana / qué se arriesga

- **Se refuerza:** camino de conversión más corto y una home donde cada
  bloque es claramente "resumen que invita a profundizar" (niveles de IA
  bien separados, cierra audit 3.1). Estructura idéntica al brief.
- **Se debilita:** es la cirugía narrativa más grande. Demotar Servicios a
  una tira y sacar CalidadDato de la home adelgaza **dos pilares del ADN**
  en la página de mayor tráfico: "equipo de ingeniería integral" y "dato
  auditable/trazable". Si `/servicios` y `/nosotros` no se refuerzan **en
  paralelo**, la home puede leerse más como catálogo de productos y menos
  como "socio de ingeniería de extremo a extremo" — justo el
  posicionamiento que el brief §8 pide proteger.
- **Riesgo:** alto en ejecución (más migración de contenido y recoloreado)
  y en mensaje (depende de que las landings de apoyo se enriquezcan a la
  vez). Este proyecto ya necesitó dos rondas de corrección en el plan 001;
  el agresivo multiplica esa superficie.

---

## 6. Comparación y recomendación

| Criterio | Conservador (12) | Moderado (10) | Agresivo (9) |
|---|---|---|---|
| Hallazgos que cierra | 3.2, 3.4, 01§1.4, 01§2.1 | + 3.3, parte de 3.1 | + 3.1 completo, brief §9 |
| Recoloreado de secciones | Ninguno | 1 (PorQue) | Ninguno |
| Migración de contenido | Baja | Media | Alta |
| ADN en la home (integral / dato auditable) | Intacto | Conservado (consolidado) | En riesgo |
| Riesgo de ejecución | Bajo | Medio | Alto |
| Retorno (claridad ganada) | Bajo | Alto | Alto |

### Recomendación: **MODERADO**

Es el más equilibrado por tres razones:

1. **Captura casi todo el beneficio del Agresivo con menos riesgo de
   mensaje.** Baja la home a 10 secciones y cierra los cuatro hallazgos
   IMPORTANTES de longitud/redundancia, pero **preserva los dos
   diferenciadores que el Agresivo pone en riesgo**: mantiene una sección
   de capacidades (equipo integral) y conserva "dato auditable" fundido en
   un PorQue más fuerte, en vez de sacarlo de la home.

2. **Aprovecha lo que los planes 001-002 ya construyeron.** El contenido
   que saca (metodología, arquitectura, criterios de calidad) aterriza en
   `/servicios` y `/nosotros`, que hoy son delgadas — así el recorte de la
   home **fortalece** esas landings en lugar de dejar el contenido
   huérfano. Es reducción con reciclaje, no amputación.

3. **Deja el Agresivo como un paso 2 opcional, no como una apuesta única.**
   Lo correcto según el brief es el Agresivo, pero conviene llegar ahí
   *después* de comprobar que una home más corta convierte y *tras*
   enriquecer `/servicios` y `/nosotros`. El Moderado es precisamente ese
   punto intermedio: si funciona, el salto final al Agresivo es pequeño y
   de bajo riesgo; si no, no se habrá desmantelado el posicionamiento de
   "socio de ingeniería integral" de un tirón.

El **Conservador** se descarta como objetivo (no como parte del camino):
12 secciones sigue siendo largo y deja intactas la repetición del clúster
de confianza y la mezcla de niveles — mucho trabajo de decisión para poca
ganancia.

---

## 7. Qué NO decide este documento (queda para el plan de ejecución)

- El copy exacto del PorQue consolidado (Moderado/Agresivo) y de la tira
  de servicios (Agresivo).
- El detalle de bloque de cada landing receptora (`/servicios`,
  `/nosotros`) — cómo se maqueta el contenido migrado.
- Si Noticias se elimina del todo o se degrada a un enlace simple.
- El orden fino y los `--reveal-delay`; aquí solo se fija la alternancia
  de fondos.

**Siguiente paso:** el propietario elige un escenario. Con esa decisión se
redacta `docs/planes/008-...` (plan de ejecución del escenario elegido),
que sí listará archivos exactos, pasos atómicos, criterios de aceptación y
casos borde, y pasará por APROBADO → IMPLEMENTAR → REVISAR.
