# Auditoría de estructura — arquitectura de información, navegación, jerarquía y contenido

Fecha: 2026-07-10
Autor: Arquitecto (Claude, según CLAUDE.md)
Alcance: mapa de rutas real (`src/pages/`), navegación (`Header.astro`,
`Footer.astro`), modelos de contenido (`src/data/*.ts`,
`src/content/blog/`) y qué información falta o sobra en cada tipo de
página. Complementa `01-diseno-frontend.md` (UX/visual/accesibilidad) y
`SEO_AUDIT.md` (indexabilidad/metadatos): donde un hallazgo ya está
documentado ahí, aquí se referencia en vez de repetirse en detalle.

## Resumen

La arquitectura de contenido tiene un modelo de datos ejemplar —tres
archivos tipados (`productos.ts`, `servicios.ts`, `sectores.ts`) con el
mismo shape para producto/servicio/sector, que alimentan tanto la home como
las 15 landings dedicadas sin duplicar contenido—. El problema no está en
el modelo de datos sino en dos capas por encima de él: (1) la navegación
solo tiene dos niveles reales (Home y landing de detalle) mientras que la
información se comunica como si tuviera tres (Home → categoría → detalle,
vía breadcrumbs y CTAs "Ver todos"), y (2) varias piezas de contenido
relacionado que sí existen en el sitio (glosario de `/conceptos`, blog por
categoría, caso Smart PBA, sector Industria Cárnica) no se enlazan entre sí
pese a ser evidentemente complementarias.

## 1. Mapa del sitio actual

| Ruta | Tipo | Origen del contenido |
|---|---|---|
| `/` | Página, 15 secciones | `src/pages/index.astro` + todos los `data/*.ts` |
| `/nosotros` | Página | `data/equipo.ts` |
| `/conceptos` | Página, 6 grupos / 40+ términos | `data/conceptos.ts` |
| `/blog` | Índice, 17 artículos | `content/blog/*.md` |
| `/blog/[slug]` | 17 páginas | `content/blog/*.md` |
| `/productos/[slug]` | 3 páginas (Smart PBA, AdariA Vision, AdariA Sense) | `data/productos.ts` |
| `/servicios/[slug]` | 7 páginas (6 capacidades núcleo + Ciudades inteligentes) | `data/servicios.ts` |
| `/sectores/[slug]` | 5 páginas | `data/sectores.ts` |
| `/404` | Página, `noindex` | `src/pages/404.astro` |

Total: 37 páginas HTML, consistente con lo ya reportado en `SEO_AUDIT.md`.
**No existen** `/productos/`, `/servicios/` ni `/sectores/` como páginas de
listado — esas "categorías" solo existen como anclas dentro de `/`
(`#productos`, `#servicios`, `#sectores`), decisión que el propio
`CLAUDE.md` (§4, nota de arquitectura) deja explícitamente abierta.

## 2. Arquitectura de navegación

### 2.1 [IMPORTANTE] La navegación se comporta como si tuviera 3 niveles, pero solo tiene 2

`src/components/layout/Header.astro`, breadcrumbs en
`src/pages/productos/[slug].astro:67-73`,
`src/pages/servicios/[slug].astro:65-71`,
`src/pages/sectores/[slug].astro:64-70`.

El breadcrumb de cada landing dice "Inicio / Productos / Smart PBA" y el
dropdown de escritorio agrupa los enlaces bajo un título de sección
("Por sector" en `Header.astro:32`). Ambos patrones comunican una jerarquía
de 3 niveles: Home → Categoría → Detalle. Pero "Productos", "Servicios" y
"Soluciones por sector" no son páginas — son anclas de la home
(`/#productos`, `/#servicios`, `/#sectores`). El nivel 2 que el breadcrumb
promete no existe como URL propia, indexable ni compartible. Esto ya está
señalado como riesgo de SEO en `SEO_AUDIT.md` ("depender de anclas... limita
la capacidad de posicionar páginas hub") y como fricción de UX en
`01-diseno-frontend.md` (hallazgo 1.2); aquí se confirma que es, en el
fondo, un problema de modelado de la información: el sitio *tiene* datos de
sobra para construir esos 3 hubs (los mismos arrays `productos`,
`servicios`, `sectores` que ya alimentan la home), solo falta la página que
los liste de forma independiente.

**Recomendación:** crear `/productos/`, `/servicios/` y `/sectores/` como
páginas reales (reutilizando las cards que ya existen en `Stack.astro`,
`Servicios.astro` y `Sectores.astro`) y apuntar breadcrumbs, dropdown y
footer ahí en vez de a las anclas de home.

### 2.2 [IMPORTANTE] `/conceptos` es una página profunda con perfil de navegación bajo

`src/components/layout/Header.astro:65-67` (nav principal: Blog, Nosotros,
Contacto — sin "Conceptos") vs. `src/components/layout/Footer.astro:53-56`
(aparece recién en la fila inferior de utilidades, al mismo nivel que
"Blog").

`/conceptos` tiene 6 grupos temáticos y más de 40 términos definidos
(`data/conceptos.ts`), un mapa conceptual dedicado (`MapaPipeline.astro`) y
5 diagramas propios (`Visual*.astro`) — es, en volumen de contenido, la
página más grande del sitio después de la home. Sin embargo, no aparece en
el menú principal de escritorio ni en el móvil; solo se llega por el
footer o por un enlace contextual dentro del Hero ("¿Nuevo en estos
términos?", `Hero.astro:130-145`). El propio brief la presenta como
herramienta para "visitantes no técnicos" (comentario en
`data/conceptos.ts:1-3`), justo el perfil de comprador que más necesitaría
encontrarla desde la navegación principal, no desde un hallazgo casual en
el hero o el footer.

**Recomendación:** agregar "Conceptos" como ítem de primer nivel en el
`Header` (no necesita dropdown, es una sola página).

### 2.3 [MENOR] No hay indicador de página activa en el header

`src/components/layout/Header.astro:65-67`.

Los enlaces "Blog", "Nosotros" y "Contacto" del nav no reciben ninguna
clase o atributo (`aria-current="page"`) cuando el usuario ya está en esa
página. Solo las landings de producto/servicio/sector y `/nosotros` tienen
breadcrumb (`aria-current="page"` en el último ítem); `/blog` y
`/conceptos` no lo tienen en ningún lugar, así que un usuario no tiene
ninguna señal visual ni semántica de en qué sección de nivel 1 está parado.

## 3. Jerarquía de la información

### 3.1 [IMPORTANTE] La home mezcla niveles 1, 2 y 3 en una sola página

`src/pages/index.astro:24-40` (orden completo de secciones).

Estrictamente, la home debería comunicar nivel 1 (propuesta de valor
general) y enlazar a nivel 2/3 (categorías y detalle). En la práctica,
varias secciones de la home ya son contenido de nivel 3 renderizado
directamente ahí: `CasoSmartPBA` es contenido específico de un solo
producto (Smart PBA) mostrado en la página general, y `Stack` muestra el
detalle completo de los 3 productos con sus puntos clave — no un simple
teaser. Esto refuerza el hallazgo de longitud de home ya registrado en
`01-diseno-frontend.md` (1.3), pero aquí el matiz es distinto: no es solo
"son demasiadas secciones", es que la home no distingue entre "resumen que
invita a profundizar" y "el contenido completo de nivel 3", duplicando
esfuerzo editorial entre la home y las landings dedicadas.

### 3.2 [IMPORTANTE] Redundancia narrativa: dos secciones de la home cuentan la misma historia con dos metáforas distintas

`src/components/sections/Solucion.astro` (Captar → Procesar → Decidir, 3
pasos, `id="solucion"`, índice de Eyebrow `4`) inmediatamente seguida de
`src/components/sections/ArquitecturaImplementacion.astro` (Campo → Borde →
Plataforma → Decisión, 4 capas, `id="arquitectura"`, índice de Eyebrow `5`).

Ambas secciones son consecutivas en `index.astro:29-30`, usan el mismo
motivo visual (línea horizontal con `flow-dot`/pulso, ver
`ArquitecturaImplementacion.astro:41-47` y `Solucion.astro:53-62`) y narran,
en esencia, el mismo recorrido: el dato viaja del sensor/campo a la
decisión, pasando por un procesamiento intermedio. La única diferencia real
es la unidad narrativa (3 "pasos" vs. 4 "capas") y el nivel de detalle
técnico. Un visitante que ya entendió "Captar → Procesar → Decidir" recibe,
30 segundos después de scroll, una segunda versión del mismo mensaje con
más pasos y vocabulario más técnico (Edge, SCADA, ERP), sin que ninguna de
las dos secciones se presente como "versión resumida" o "versión técnica"
de la otra.

**Recomendación:** fusionar ambas en una sola sección (por ejemplo, dejar
"Del sensor a la decisión" como narrativa principal y mover el detalle de
capas técnicas — Campo/Borde/Plataforma/Decisión — a una landing de
servicios o a la sección "Arquitectura" de cada landing sectorial, que ya
tiene su propio bloque de arquitectura por sector, ver
`sectores/[slug].astro:166-202`).

### 3.3 [MENOR] El mensaje "trabajamos con método, no improvisamos" se repite tres veces en la home con framings distintos

`DiagnosticoOperativo.astro` (antes del proyecto: 3 puntos de diagnóstico,
Eyebrow índice `2`), la sub-sección "Cómo trabajamos" dentro de
`Servicios.astro:76-131` (metodología de 5 pasos: Descubrimiento → Diseño →
Piloto → Despliegue → Soporte) y `CalidadDato.astro` (5 criterios de
calidad del dato, Eyebrow índice `9`) cubren, cada una desde su ángulo, la
misma idea de fondo: "antes de vender, entendemos su operación; el trabajo
es riguroso y verificable". Individualmente cada sección está bien escrita
y no es incorrecta, pero al estar repartidas en 3 puntos distintos del
scroll sin remitirse entre sí, un lector atento puede percibir que el sitio
insiste tres veces en lo mismo en vez de una sola vez con más fuerza.

### 3.4 [IMPORTANTE] El caso de éxito más fuerte del sitio no enlaza a su propia landing de sector

`src/components/sections/CasoSmartPBA.astro:15-57` (CTA único:
`href="#contacto"`, línea 39) vs. `src/pages/sectores/industria-carnica`
(vía `data/sectores.ts:142-212`).

Smart PBA es, según el propio brief (§3.1), "el producto más maduro y el
principal caso de éxito / prueba de credibilidad". Su sección en la home
(`CasoSmartPBA`) solo enlaza a `#contacto` — no hay ningún enlace a
`/sectores/industria-carnica` (que desarrolla el mismo caso con más
profundidad: retos, arquitectura, resultados esperados) ni a
`/productos/smart-pba`. Un visitante que llega a la sección de mayor
credibilidad del sitio y quiere profundizar solo puede saltar directo al
formulario, sin pasar por el contenido que reforzaría su decisión.

### 3.5 [IMPORTANTE] El glosario de `/conceptos` no se enlaza desde ninguna landing de producto, servicio o sector

`src/pages/productos/[slug].astro`, `src/pages/servicios/[slug].astro`,
`src/pages/sectores/[slug].astro` — ninguno de los tres templates referencia
`/conceptos` ni un término específico del glosario.

Las 15 landings usan vocabulario técnico con frecuencia (LoRa/LoRaWAN, edge
computing, SCADA, OCR, LPR, edge, EPP...) que `/conceptos` ya define en
lenguaje simple — es exactamente el propósito para el que se construyó la
página (`data/conceptos.ts:1-3`: "contextualiza a visitantes no técnicos").
Pero el enlace solo existe en un sentido: desde el Hero de la home hacia
`/conceptos`. Ningún término técnico dentro de una landing enlaza de vuelta
al glosario, así que un comprador no técnico que aterriza directo en
`/sectores/hidrocarburos-mineria-energia` desde una búsqueda o un anuncio
—sin pasar por el Hero— no tiene ningún puente hacia las definiciones que
el sitio ya escribió pensando en él.

### 3.6 [MENOR] El blog no cruza contenido con las landings ni consigo mismo

`src/pages/blog/[...slug].astro` (plantilla de artículo) y
`src/pages/blog/index.astro` (listado).

Ningún artículo enlaza a la landing de producto/servicio/sector con la que
se relaciona (más allá del CTA genérico final "Hable con un experto" →
`/#contacto`, igual en los 17 artículos), y ninguna landing muestra
artículos relacionados del blog. El modelo de datos ya tiene la taxonomía
para resolverlo sin trabajo editorial adicional: cada post tiene `category`
(`Tecnología` / `Industria` / `Casos de éxito`) y `tags`, pero ninguno de
los dos campos se usa para filtrar, listar por categoría ni cruzar con
sectores — ver detalle en el punto 4 (Blog).

## 4. Contenido por tipo de página: qué falta y qué sobra

### Home (`/`)
- **Sobra (relativo):** 15 secciones frente a las 9 del brief; ver
  `01-diseno-frontend.md` (1.3) y los puntos 3.1–3.3 de esta auditoría.
- **Falta:** prueba social externa. La única prueba social de todo el sitio
  es contenido propio (Smart PBA) o de un aliado (Granular Electronics,
  `PartnerTecnologico.astro`) — no hay un solo testimonio citado, logo de
  cliente o cifra de un tercero independiente en ninguna parte de la home.
  Es coherente con una empresa joven sin casos publicables aún, pero es un
  vacío de contenido a llenar en cuanto exista el primer testimonio.
- **Falta:** una comparación explícita "qué producto para qué necesidad".
  `Stack.astro` presenta los 3 productos en paralelo pero no ayuda a decidir
  entre ellos; un visitante que no sabe si necesita Vision o Sense no tiene
  ninguna guía de decisión.

### Producto (`/productos/[slug]`)
- **Falta (Smart PBA, el producto insignia):** la galería "El software en
  operación" (`data/productos.ts:146-151`) tiene sus 4 capturas marcadas
  `pending: true` — hoy se muestra un mockup genérico en las 4, no una sola
  imagen real del ERP. Es una brecha de contenido notable justo en el
  producto que el brief señala como "principal caso de éxito / prueba de
  credibilidad" (§3.1).
- **Falta (AdariA Vision y AdariA Sense):** a diferencia de Smart PBA,
  ninguno de los dos define el bloque `galeria` en absoluto (campo
  opcional en `ProductoDetalle`, `data/productos.ts:49-53`) — no hay ni
  siquiera un mockup. Los 3 productos quedan con profundidad de contenido
  desigual: uno tiene sección "El producto" (aunque con mockups) y dos no
  tienen esa sección.
- **Nada sobra:** el contenido de cada landing está acotado al shape de
  `ProductoDetalle`, sin bloques vacíos ni relleno genérico.

### Servicio (`/servicios/[slug]`)
- **Sobra (relativo), caso "Ciudades inteligentes":** es el único de los 7
  servicios con componentes visuales propios (`VisualCiudades.astro`,
  `RiesgoUrbano.astro`, `src/pages/servicios/[slug].astro:12-13,101,141`)
  que ningún otro servicio tiene, y conceptualmente se comporta como un
  sector (dirigido a un tipo de cliente — gobierno/municipio — no a una
  capacidad horizontal aplicable a cualquier industria, que es como se
  definen los otros 6). El propio `CLAUDE.md` (§4) ya deja esto como
  "decisión abierta, no tomada unilateralmente"; esta auditoría confirma,
  desde la estructura, que el desajuste es real: hoy vive en
  `data/servicios.ts` con el shape de servicio, pero su tratamiento
  editorial y visual ya es el de un sector.
- **Falta:** ninguno de los 7 servicios enlaza a artículos del blog
  relacionados ni al glosario de conceptos (puntos 3.5 y 3.6).

### Sector (`/sectores/[slug]`)
- **Completo y consistente:** los 5 sectores comparten exactamente el mismo
  shape (`SectorDetalle`, `data/sectores.ts:25-42`) con retos, soluciones,
  arquitectura, entregables y resultados — sin campos vacíos.
  ✅ Correcto — el modelo aquí es ejemplar.
- **Falta:** "Resultados esperados" es siempre una proyección genérica
  ("La operación recibe señales tempranas...") sin cifras ni casos reales
  citados, ni siquiera en Industria Cárnica pese a que ahí sí existe un
  caso real (Smart PBA) que podría respaldar esa sección con datos
  concretos en lugar de una expectativa genérica (ver también 3.4).
- **Falta:** ningún sector enlaza a artículos del blog relacionados por
  categoría (punto 3.6).

### Blog (`/blog`, `/blog/[slug]`)
- **Falta:** filtro o navegación por `category` — el campo existe
  (`Tecnología`, `Industria`, `Casos de éxito`) y se muestra como badge en
  cada card (`PostCard.astro:53-55`), pero no hay ninguna página ni control
  que permita filtrar por él. De 17 artículos, 12 son "Tecnología", 3
  "Industria" y solo 2 "Casos de éxito" — justo la categoría más persuasiva
  para un comprador B2B es la menos representada y la más difícil de
  encontrar (hay que leer los 17 títulos para encontrar los 2).
- **Falta:** los `tags` de cada artículo (visibles al final de cada post,
  `src/pages/blog/[...slug].astro:106-112`) no enlazan a ninguna parte —
  son `<span>`, no `<a>` — así que no sirven para descubrir contenido
  relacionado, solo como metadato visual.
- **Falta:** paginación en `/blog` — no es urgente con 17 artículos, pero el
  listado ya carga los 17 de una vez sin límite (`blog/index.astro:7`); vale
  la pena resolverlo antes de llegar a 30-40 posts.
- **Ya señalado en SEO_AUDIT.md** (prioridad baja): falta feed RSS.

### Nosotros (`/nosotros`)
- **Completo:** historia, propósito/misión/visión, valores y equipo
  directivo con fotos reales (`data/equipo.ts` ya tiene los 3 fundadores
  con nombre, bio, foto y LinkedIn — no hay placeholders pendientes pese a
  que el comentario del archivo, línea 3-4, todavía dice que sí los hay:
  comentario desactualizado, sin impacto en el contenido visible).
- **Falta:** datos legales/corporativos esperables en una página "Nosotros"
  B2B (ciudad, dirección o al menos razón social/NIT) — coincide con los
  pendientes ya registrados en `SEO_AUDIT.md`
  (`[PENDIENTE_CIUDAD]`, `[PENDIENTE_DIRECCION_FISICA]`).
- **Falta:** ningún enlace a `/conceptos` ni a artículos del blog que
  expliquen la tecnología detrás de la compañía.

### Conceptos (`/conceptos`)
- **Muy completo:** 6 grupos, mapa conceptual maestro, índice rápido y
  diagramas propios por grupo — el contenido más profundo del sitio fuera
  de la home.
- **Falta:** enlaces de entrada desde el resto del sitio (punto 3.5) —
  el contenido existe pero está aislado.

### 404
- Sin hallazgos. Cumple su función con dos CTAs razonables (inicio,
  contacto) y `noindex` correcto.

## Fortalezas a mantener

- Modelo de datos tipado y compartido (`data/productos.ts`,
  `data/servicios.ts`, `data/sectores.ts`) que alimenta home y landings sin
  duplicar contenido — cualquier cambio de copy se hace en un solo lugar.
- Las 5 landings de sector tienen exactamente el mismo nivel de
  profundidad y ningún campo vacío o placeholder — a diferencia de
  productos, donde la profundidad sí es desigual entre los tres.
- El índice de `/conceptos` (`grupos.length` temas, `totalConceptos`
  términos) se calcula dinámicamente del propio array de datos
  (`conceptos.astro:18`), así que nunca queda desactualizado si se agregan
  o quitan términos — buen patrón a replicar si se agregan filtros al blog.
- El breadcrumb con `BreadcrumbList` (JSON-LD) está presente y correcto en
  las 15 landings dedicadas.

## Priorización

### Importante
- 2.1 — Navegación de 3 niveles prometida (breadcrumbs, dropdown) sin
  páginas hub reales de nivel 2.
- 2.2 — `/conceptos` fuera del menú principal pese a su profundidad de
  contenido.
- 3.1 — La home mezcla contenido de nivel 1, 2 y 3 en una sola página.
- 3.2 — `Solucion` y `ArquitecturaImplementacion` narran el mismo recorrido
  dos veces, consecutivamente.
- 3.4 — El caso Smart PBA no enlaza a su landing de sector ni de producto.
- 3.5 — Ninguna landing enlaza al glosario de `/conceptos`.
- Servicio "Ciudades inteligentes" catalogado y tratado como sector, sin
  resolver la decisión abierta que el propio `CLAUDE.md` señala.
- Galería de Smart PBA 100% en mockup pese a ser el producto insignia;
  AdariA Vision y AdariA Sense sin galería alguna.

### Menor
- 2.3 — Sin indicador de página activa en el header.
- 3.3 — Mensaje de "método de trabajo" repetido en 3 secciones de la home.
- 3.6 — Blog sin cruce de contenido con landings ni consigo mismo
  (categoría y tags sin usar como navegación).
- Sector: "Resultados esperados" siempre genérico, sin cifras ni casos
  reales citados.
- Nosotros: sin datos legales/corporativos (ya señalado en SEO_AUDIT.md).
