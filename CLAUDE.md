# CLAUDE.md — Brief del sitio web de AdariA Systems

> **Cómo usar este archivo:** Colócalo en la raíz del proyecto. Es el contexto maestro
> para construir el sitio web de AdariA Systems. Léelo completo antes de empezar.
> Actualízalo al final de cada sesión de trabajo.

---

## 0. El encargo

Construir el sitio web corporativo de **AdariA Systems**, una startup de tecnología
colombiana que actúa como **habilitador de la Industria 4.0**. El sitio es la principal
herramienta de venta consultiva B2B y la primera prueba de credibilidad ante empresas que
quieren transformar su operación con tecnología (conectividad, datos en tiempo real,
visión artificial, automatización).

**Objetivo del sitio:** transmitir que AdariA es un aliado tecnológico integral y serio,
y convertir visitantes en leads (solicitudes de demo / contacto comercial).

---

## 1. Identidad corporativa

- **Nombre:** AdariA Systems
- **Tagline:** *Soluciones tecnológicas a la medida de tu industria.*
- **Frase de valor:** *Diseñamos e implementamos soluciones de inteligencia artificial,
  visión artificial y hardware que optimizan la operación de las empresas.*

**Misión:** Desarrollar soluciones tecnológicas a la medida que resuelven las necesidades
reales de las empresas, integrando inteligencia artificial, visión artificial y diseño de
hardware para optimizar sus procesos, reducir costos y potenciar su crecimiento.

**Visión:** Ser para 2030 una compañía de tecnología referente en Latinoamérica en
inteligencia y visión artificial e IoT industrial, reconocida por transformar la operación
de nuestros clientes en procesos más eficientes, trazables y rentables.

**Propósito:** AdariA Systems nace para resolver las necesidades reales de las empresas con
soluciones tecnológicas hechas a la medida, llevando a cada operación la tecnología que de
verdad necesita.

**Valores:** Rigor técnico · Transparencia y trazabilidad · Innovación aplicada ·
Soluciones a la medida · Orientación a resultados · Integridad.

**ADN de marca (lo que nos diferencia):** Ofrecemos la cadena completa —diseñamos el
hardware, capturamos los datos con visión artificial e IoT, los integramos y los devolvemos
convertidos en decisiones—. Un solo aliado, del sensor a la decisión, a la medida, con dato
auditable. Pocas empresas en Colombia hacen todo esto bajo un mismo techo.

**Concepto paraguas — Industria 4.0:** AdariA Systems se posiciona como un **habilitador de
la Industria 4.0**: el aliado que lleva a las empresas de operaciones manuales y a ciegas
hacia operaciones conectadas, inteligentes y basadas en datos en tiempo real. Este concepto
es el hilo conductor de toda la comunicación. Cada producto y servicio de AdariA es uno de
los pilares de la Industria 4.0. Importante: usar "Industria 4.0" como marco moderno y
transversal; no usar el término "industria pesada" como mensaje general. Los sectores
específicos viven en sus landings, no en el mensaje global.

### AdariA como habilitador de la Industria 4.0
La Industria 4.0 es la cuarta revolución industrial: convertir las operaciones en sistemas
conectados, inteligentes y automatizados que generan datos en tiempo real para decidir
mejor. AdariA cubre sus pilares principales con tecnología propia y a la medida:

- **Visión artificial e IA:** AdariA Vision
- **IoT y conectividad:** AdariA Sense
- **Analítica y big data:** dashboards, KPIs y soporte a la decisión
- **Hardware inteligente:** diseño de hardware a la medida
- **Integración y digitalización:** Smart PBA y servicios de integración
- **Mantenimiento predictivo:** AdariA Sense

Mensaje clave: *"Habilitamos los pilares de la Industria 4.0 con tecnología propia y a la
medida."* Beneficios a comunicar: eficiencia, mantenimiento predictivo, calidad,
visibilidad y trazabilidad en tiempo real, reducción de costos, decisiones basadas en datos
y más seguridad.

---

## 2. Arquitectura de marca (DEFINITIVA)

```
AdariA Systems
├── Smart PBA      → ERP trazable para plantas de beneficio animal
├── AdariA Vision  → Suite de visión artificial
└── AdariA Sense   → Monitoreo en tiempo real + mantenimiento predictivo (IoT/LoRa)
```

Marca monolítica: la marca madre acompaña a los productos (excepto Smart PBA, que ya
existía con nombre propio). Tres productos, nombres coherentes.

---

## 3. Productos

### 3.1 Smart PBA
ERP trazable y auditable para plantas de beneficio animal (bovino y porcino) y desposte.
Gestiona toda la operación desde el ingreso del lote hasta el despacho. Incluye un modelo
de visión artificial propio para el conteo de animales en el pesaje en pie y genera
evidencia fotográfica que da transparencia al cliente y soporta los informes.
- **Resuelve:** falta de trazabilidad, transparencia y control en la operación cárnica.
- **Para:** plantas de beneficio animal, frigoríficos.
- **Clave:** es el producto más maduro y el principal caso de éxito / prueba de credibilidad.

### 3.2 AdariA Vision
Suite de visión artificial sobre cámaras (integra CCTV/IP existente vía RTSP, sin
necesidad de hardware nuevo en muchos casos). Modelos entrenados a la medida. Organizada
en líneas:
- **Seguridad (HSE):** detección de EPP, zonas restringidas/red-zones, fuego y humo,
  prevención de colisiones, fatiga de operarios.
- **Calidad:** detección de defectos, clasificación/grading, inspección en banda,
  verificación de etiquetado/empaque, medición dimensional.
- **Logística:** conteo de productos, conteo de personas/aforo, lectura de placas (LPR),
  OCR de lotes/fechas/seriales, monitoreo de estanterías.
- **Movilidad e infraestructura:** conteo vehicular, inspección con drones, lectura de
  medidores analógicos.
- **Resuelve:** procesos manuales lentos y propensos a error; falta de control y seguridad.
- **Gancho comercial:** "usa tus cámaras actuales" → bajo costo de entrada.

### 3.3 AdariA Sense
Plataforma de monitoreo de equipos e infraestructura en tiempo real **y** mantenimiento
predictivo. Sensores IoT + conectividad LoRa/LoRaWAN + dispositivos edge + analítica.
Mide presión, temperatura, vibración, gas, nivel, caudal, etc. Predice fallas y programa
mantenimientos antes de que ocurran las paradas.
- **Módulos:** monitoreo en tiempo real · mantenimiento predictivo · alertas de seguridad
  (gas, temperatura).
- **Resuelve:** paradas no planeadas, fallas costosas, mantenimiento reactivo, operaciones
  remotas sin conectividad.
- **Clave:** LoRa es ideal para sitios remotos (largo alcance, bajo consumo, sensores a
  batería que duran años). AdariA diseña el hardware propio (nodos, gateways, edge).

---

## 4. Servicios / capacidades núcleo

1. Desarrollo de software a la medida (web, móvil, plataformas, ERP).
2. Diseño de hardware electrónico (tarjetas, sensores, gateways, dispositivos edge).
3. Visión artificial e inteligencia artificial (entrenamiento de modelos propios).
4. Soluciones IoT (sensorización, conectividad, telemetría).
5. Integración de sistemas y tecnología (ERP, básculas, PLCs, cámaras, SCADA).
6. Analítica de datos y soporte a la decisión (dashboards, KPIs, reportes, predicción).

---

## 5. Sectores (ejes comerciales — la web se organiza por aquí)

1. **Industria Cárnica** → Smart PBA + Vision (conteo, peso por imagen, sanidad).
2. **Hidrocarburos, Minería y Energía** → Vision Seguridad + Sense (IoT/LoRa) + drones +
   mantenimiento predictivo. *(Sector prioritario de alto valor.)*
3. **Manufactura** → Vision Calidad + Sense + IoT.
4. **Logística y Bodegas** → Vision Logística + integración + analítica.
5. **Agroindustria** → Vision (conteo de cultivos, grading) + drones + IoT.

**Dolor por sector (sectores industriales como energía, minería, manufactura):** el costo
de cada falla y cada accidente es altísimo; hay presión regulatoria (SG-SST, ambiental).
AdariA entra barato (sobre cámaras y sensores existentes) y escala a soluciones de mayor
valor. Mensaje: operaciones más **seguras, eficientes y auditables**, encuadradas como el
paso hacia la Industria 4.0.

---

## 6. Modelo de negocio (contexto, no va literal en la web)

Cinco motores de ingreso: proyectos/servicios · licencias · **SaaS/suscripción** ·
hardware · soporte/mantenimiento. Estrategia "land & expand": entrar con bajo costo de
adopción (piloto, 1 caso de uso, CCTV existente) y crecer hacia recurrencia (más sitios,
más módulos, servicio gestionado). Prioridad comercial: Vision·Seguridad + Smart PBA +
servicios para caja rápida; sembrar AdariA Sense en los sectores industriales como apuesta
de valor recurrente. El CTA del sitio debe empujar a "Agenda una demo / Hablemos de tu proyecto".

---

## 7. Estructura del sitio (navegación)

```
INICIO
SOLUCIONES (por sector) ──┬── Industria Cárnica
                          ├── Hidrocarburos, Minería y Energía
                          ├── Manufactura
                          ├── Logística y Bodegas
                          └── Agroindustria
PRODUCTOS ────────────────┬── Smart PBA
                          ├── AdariA Vision
                          └── AdariA Sense
SERVICIOS (capacidades) ──┬── Desarrollo de software
                          ├── Diseño de hardware
                          ├── Visión artificial e IA
                          ├── Soluciones IoT
                          └── Integración y analítica
NOSOTROS
CONTACTO
```

Lógica: el cliente entra por SU sector → encuentra su dolor resuelto → lo llevamos a los
PRODUCTOS que lo resuelven → respaldados por las CAPACIDADES. Cada página de sector es una
landing de venta.

---

## 8. Dirección de diseño

**Filosofía de referencia: Elementary (elementaryml.com) — adoptar su FILOSOFÍA, NO copiar
su contenido ni su look exacto.**

Lo que adoptamos:
- **Claridad radical:** un mensaje por sección, sin saturar.
- **Narrativa de venta** (ver §9).
- **Resultados en números grandes** (métricas de impacto donde existan).
- **Estética tech limpia y luminosa**, ordenada, con mucho aire.
- **CTA claro y repetido.**

Lo que hacemos PROPIO de AdariA (no copiar):
- Paleta y tipografía propias.
- Nuestro diferenciador: "del sensor a la decisión, a la medida, con dato auditable"
  (visión + IoT/LoRa + hardware propio bajo un mismo techo). NO el mensaje de Elementary.
- Nuestra amplitud: 3 productos + servicios + varios sectores (estructura más rica).
- Prueba social: Smart PBA en plantas reales, NO logos Fortune 500.

**Principios visuales:** mucho espacio en blanco; titulares grandes y afirmativos;
secciones limpias con una idea cada una; imágenes reales potentes (plantas industriales,
drones inspeccionando torres, galería minera, línea de Smart PBA en operación); micro-
interacciones sutiles al hacer scroll.

---

## 9. Narrativa de la home (orden de secciones)

1. **Hero** — promesa potente + 1 CTA. Headline candidato:
   "Soluciones tecnológicas a la medida de tu industria."
   Subhead: la frase de valor. CTA: "Agenda una demo" / "Hablemos de tu proyecto".
2. **El problema** — el costo de operar a ciegas / fallas / accidentes / procesos manuales.
3. **Industria 4.0** — bloque que enmarca a AdariA como habilitador de la Industria 4.0:
   explicar brevemente el concepto (operaciones conectadas, inteligentes, basadas en datos
   en tiempo real) y mostrar los pilares (IoT, IA/visión, analítica, hardware inteligente,
   integración) conectados a lo que hace AdariA. Mensaje: "Llevamos tu operación a la
   Industria 4.0."
4. **La solución en pasos** — Captar (visión + sensores) → Procesar (edge + IA) →
   Decidir (dashboards, alertas, predicción). "Del sensor a la decisión."
5. **El stack integral de AdariA** — los 3 productos + servicios a la medida.
6. **Sectores** — tarjetas por industria (con imagen), cada una enlaza a su landing.
7. **Caso destacado: Smart PBA** — prueba de credibilidad (trazabilidad, evidencia
   fotográfica, transparencia ante el cliente).
8. **Por qué AdariA** — diferenciadores: a la medida, hardware propio, dato auditable,
   bajo costo de entrada.
9. **CTA final** — formulario de contacto / agendar demo.

---

## 10. Recomendaciones técnicas (sugeridas, ajustables)

- **Stack sugerido:** sitio estático moderno y rápido. Opciones: HTML/CSS/JS limpio,
  o framework (Next.js / Astro) si se quiere escalar a blog y multipágina. Para empezar
  rápido y liviano, **Astro o HTML+Tailwind** son buenas opciones.
- **Responsive** obligatorio (muchos clientes verán desde móvil).
- **Rendimiento:** imágenes optimizadas (webp), carga rápida.
- **SEO básico:** meta tags, OpenGraph, títulos por sector.
- **Idioma:** español (Colombia). Considerar inglés a futuro.
- **Formularios:** contacto / agendar demo, con campos B2B (empresa, cargo, sector).
- Accesibilidad y buenas prácticas semánticas.

---

## 11. Pendientes / decisiones abiertas

- **Logo:** ✅ recibido (`assets/logo_adaria.png`). Ícono *viewfinder/crosshair* con punto
  central cian. Wordmark en azul marino. Recreado como SVG inline en `src/components/ui/Logo.astro`
  (+ `public/favicon.svg`). Colores muestreados del archivo: acento **cian `#00B4D8`**,
  oscuro **`#0A1628`** (≈ `#0C1116`, ya casa con el núcleo de marca).
- **Paleta de color:** ✅ confirmada contra el logo. **Acento de marca = azul `#2563D9`**
  (decisión del cliente). El cian `#00B4D8` del logo queda como detalle puntual (punto del
  ícono, micro-acentos), NUNCA como texto. Implementada como Opción C en los tokens
  (`src/styles/global.css`).
- **Fondo predominante:** mixto — alternar secciones oscuras (`#0C1116`) y claras
  (`#F4F6F9`) para dar ritmo, al estilo Elementary.
- **Nombre final de la suite de visión:** confirmado como "AdariA Vision".
- **Contenido fino por sector y producto:** redactar textos definitivos de cada landing.
- **Imágenes/recursos reales:** conseguir fotos de operaciones, Smart PBA, etc.

---

## 12. Tono de redacción

Confiado, directo, profesional, orientado a resultados y ROI. Frases cortas y contundentes.
Enfatizar el dolor y el resultado del cliente, no la tecnología por sí misma. Español
neutro-colombiano. Evitar jerga vacía.

---

## 13. Identidad visual — Tipografía y paleta de colores

### Tipografía (estilo Apple / SF Pro) ★ DEFINIDA

Familia única en todo el sitio. Stack del sistema Apple con **Inter** como fallback:
en dispositivos Apple se usa San Francisco (SF Pro); en el resto, Inter (cargada desde
Google Fonts).

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter",
  "Helvetica Neue", Arial, sans-serif;
```

**Jerarquía de pesos:**
| Rol | Peso | Detalles |
|-----|------|----------|
| Titulares (h1, h2, h3) | **600** | `letter-spacing: -0.02em`, `line-height: 1.1–1.2` |
| Cuerpo de texto | **400** | `line-height: 1.6` |
| Etiquetas, botones, badges | **500** | — |
| Texto secundario / captions | **400** | color `#5B6470` (`--color-muted`) |

**Reglas:**
- **Sentence case** en todo el sitio. NO Title Case ni MAYÚSCULAS SOSTENIDAS (eliminadas de
  eyebrows, títulos de footer y menús).
- Titulares con **tamaños fluidos (`clamp`)** estilo Apple: grandes en desktop, escalados en
  móvil.

**Implementación (dónde está):**
- Stack y escala fluida como tokens en [`src/styles/global.css`](src/styles/global.css)
  (`@theme`): `--font-sans`, `--font-display` (alias), y la escala
  `--text-display` / `--text-h1` / `--text-h2` (cada una con su `line-height` y `letter-spacing`).
- Pesos base de `body` (400/1.6) y `h1–h4` (600) en la sección base de ese mismo archivo.
- Inter cargada desde Google Fonts (pesos 400, 500, 600) con `preconnect` en
  [`src/components/seo/BaseHead.astro`](src/components/seo/BaseHead.astro).
- Uso en componentes: titulares con `text-display` / `text-h1` / `text-h2` + `font-semibold`;
  etiquetas/botones con `font-medium`.

---

## 13.1 Paleta de colores

> Tres opciones evaluadas. **Opción recomendada: C (híbrida).** Implementar esa por
> defecto; A y B quedan como alternativas. Todos los colores deben funcionar en modo claro
> y oscuro. El color de acento NUNCA se usa para texto largo, solo para CTAs, métricas,
> íconos, enlaces y detalles (regla de contraste WCAG, mínimo 4.5:1 en texto).

### Núcleo de marca (común a las tres opciones, constante en todo el sitio)
| Rol | Hex | Uso |
|-----|-----|-----|
| Fondo oscuro | `#141B24` | Hero, secciones de impacto, CTA, footer (aclarado desde `#0C1116` por decisión de diseño) |
| Tarjeta oscura | `#202A36` | Bloques/cards sobre fondo oscuro |
| Fondo claro | `#F4F6F9` | Secciones de contenido (alterna con el oscuro) |
| Blanco | `#FFFFFF` | Cards sobre fondo claro |
| Texto secundario | `#5B6470` | Descripciones, subtítulos |
| Texto sobre oscuro | `#F5F7FA` | Texto principal en secciones oscuras |
| Texto sobre claro | `#0C1116` | Texto principal en secciones claras |

---

### OPCIÓN A — "Elementary sobrio" (un solo acento)
Mínima, elegante, fácil de mantener. Un único acento azul en todo el sitio.
| Rol | Hex |
|-----|-----|
| Acento principal | `#2E6BFF` (azul eléctrico) |
- Uso: botones, métricas, enlaces e íconos en azul. Sin colores por sector.
- Pro: máxima coherencia y simplicidad. Contra: menos diferenciación entre sectores.

### OPCIÓN B — "Sistema sectorial completo"
Núcleo de marca + un color por sector, presente de forma marcada en cada landing.
- Acento de marca: `#2563D9` (azul).
- Color por sector (ver tabla sectorial abajo).
- Pro: muy navegable y memorable por industria. Contra: requiere disciplina para no saturar.

### OPCIÓN C — "Híbrida" ★ RECOMENDADA
Sobriedad de Elementary en home y páginas generales (solo azul de marca), y el color
sectorial se activa SOLO dentro de la landing de cada sector (borde superior, badge del
sector, íconos y CTA de esa página). El azul de marca sigue mandando en todo el sitio.
- Acento de marca: `#2563D9` (azul).
- Colores sectoriales: se usan únicamente en su landing respectiva.

---

### Colores por sector (para opciones B y C)
Cada color tiene versión sólida (detalles/CTA sobre oscuro) y se usa al 15–18% de opacidad
para fondos de badges e íconos, garantizando contraste del texto.
| Sector | Hex sólido | Texto sobre el sólido | Justificación |
|--------|-----------|----------------------|----------------|
| Hidrocarburos, Minería y Energía | `#F08C1D` ámbar | `#3A2100` | Energía, señalización industrial, EPP |
| Industria Cárnica | `#C0552F` terracota | `#FFE6DA` | Proteína/alimentos, sin rojo crudo |
| Manufactura | `#4A7FB5` azul acero | `#E2EEF9` | Metal, maquinaria, precisión |
| Logística y Bodegas | `#1BA89A` teal | `#04332D` | Flujo, movimiento, trazabilidad |
| Agroindustria | `#5C9A35` verde | `#EAF5DE` | Campo, cultivo, crecimiento |

### Colores funcionales (dashboards de AdariA Sense — NO son de marca)
Para estados de monitoreo. No compiten con el azul de marca.
| Estado | Hex |
|--------|-----|
| OK / normal | `#2EA36B` verde |
| Alerta | `#E0A21B` ámbar |
| Crítico | `#D9483B` rojo |

### Reglas de uso
- Un solo acento de marca (azul) domina home y páginas generales.
- El color sectorial entra como SEGUNDO acento, solo en la landing de su sector (opción C).
- Acentos jamás en texto de párrafo; solo en CTAs, métricas, íconos, badges, bordes.
- Alternar secciones oscuras (`#0C1116`) y claras (`#F4F6F9`) para dar ritmo a la home.
- Modo oscuro obligatorio: verificar que todo texto sea legible si el fondo es casi-negro.
- Acento sobre blanco y blanco sobre `#0C1116` cumplen contraste; el azul no se usa como
  texto pequeño sobre fondos claros de bajo contraste.

### Pendiente
- ✅ Confirmado contra el LOGO. Acento de marca = azul `#2563D9`; cian `#00B4D8` del logo
  solo como detalle. Ver §11.

---

## 14. Estado del desarrollo

> Actualizar al final de cada sesión.

### Stack elegido
- **Astro 5 + Tailwind CSS 4** (vía `@tailwindcss/vite`). Sitio estático, 0 JS por defecto.
- Tipografía: stack del sistema Apple (SF Pro) + **Inter** de fallback desde Google Fonts
  (ver §13). Una sola familia en todo el sitio.
- Justificación: muchas landings comparten cascarón (nav/footer/CTA/tarjetas) y habrá blog
  → componentes reutilizables + Content Collections, sin sacrificar rendimiento.

### Repositorio
- GitHub: <https://github.com/jhonmeche/web-adaria> (rama `main`).
- Flujo: `git pull` al empezar · `git push` al terminar. Ver "Trabajar desde otro
  equipo" en el `README.md`. El `CLAUDE.md` viaja en el repo (contexto para Claude).

### Hecho (sesión 1)
- Proyecto montado, tokens de diseño (paleta Opción C en `src/styles/global.css`).
- Layout: `BaseLayout`, `Header` (nav §7 con dropdowns + menú móvil), `Footer`, SEO/OG.
- **Home completa** (`src/pages/index.astro`) con las 8 secciones de la §9.
- Logo recreado como SVG inline + favicon (fondo transparente, color adaptativo claro/oscuro).
- Micro-interacciones al scroll como mejora progresiva (visible sin JS).
- **Hero = carrusel de soluciones** (`src/components/sections/Hero.astro`): imagen full-bleed
  + título ENCIMA, ambos rotan sincronizados (5 slides, ~6.5 s, puntos clickeables, pausa al
  hover). Imágenes en `public/hero/slide-N.png` (mapeo título→imagen en el arreglo `slides`).
  Degradado de legibilidad sobre la imagen; respeta `reduce-motion`.
- Ajustes de diseño aplicados: header glass oscuro (`bg-ink/70` + blur) con dropdowns
  oscuros (`bg-ink/95`) y hover azul sólido; botones `rounded-md`; tipografía Apple/Inter
  (titulares 600, sentence case, clamp); subhead y titulares en tono corporativo (sin "tu").
- **Color oscuro aclarado**: `--color-ink` `#0C1116` → `#141B24`, `--color-ink-card` → `#202A36`
  (las tablas §13.1 siguen citando los hex base como referencia histórica).
- `npm run build` OK. Verificado en desktop y móvil.

### Hecho (sesión 2 — integración Industria 4.0)
- **Nueva sección Industria 4.0** (`src/components/sections/Industria40.astro`): cierra la
  brecha de la §9.3, que faltaba. Fondo oscuro con rejilla técnica; titular "Llevamos su
  operación a la Industria 4.0", explicación del concepto y grid de los **6 pilares** (§1),
  cada uno anclado al producto/capacidad de AdariA que lo habilita (Vision, Sense, analítica,
  hardware, integración/Smart PBA, mantenimiento predictivo). Reutiliza `Section`/`Eyebrow`
  y el patrón `data-reveal` → no altera el diseño visual existente.
- **Insertada en la home** entre `Problema` y `Solucion` (orden exacto de §9). La home pasa
  de 8 a 9 secciones.
- **Refuerzos del concepto** (solo texto, sin tocar layout): meta description de la home y
  subhead del Hero ahora encuadran "Habilitamos la Industria 4.0".
- **Bug de mensaje corregido**: `Problema.astro` decía "industria pesada" (prohibido por §1
  como mensaje general) → reemplazado por "En la industria".

### Estructura de carpetas
```
src/
├── components/{layout,ui,seo,sections}/   # Header, Footer, Logo, Button, secciones home
├── data/{sectores,productos}.ts            # contenido tipado que alimenta la home
├── layouts/BaseLayout.astro
├── pages/index.astro                       # HOME
└── styles/global.css                       # tokens de paleta (Opción C) + base
```

### Pendiente (próximas sesiones)
- **Backend del formulario**: hoy valida y confirma en cliente (placeholder). Conectar
  Formspree / Netlify Forms (definir hosting). Ver TODO en `components/sections/Contacto.astro`.
- **Imágenes del hero**: faltan slides del carrusel. Hechas: `slide-1` (Visión) y `slide-2`
  (Inspección). Pendientes: Monitoreo IoT, Mantenimiento predictivo, Trazabilidad. Subir a
  `public/hero/` y mapear en `slides` de `Hero.astro`.
- **Imágenes reales**: reemplazar placeholders (sectores, foto Smart PBA, OG en `/public/og/`).
- **Métricas reales** del caso Smart PBA (hoy placeholders).
- **Landings dedicadas**: `/soluciones/[sector]`, `/productos/*`, `/servicios`, `/nosotros`,
  `/contacto`. Hoy la nav apunta a anclas de la home. Activar color sectorial (Opción C) en
  cada landing de sector con `data/sectores.ts.color`.
- **Comandos**: `npm run dev` (desarrollo) · `npm run build` (producción → `dist/`).
