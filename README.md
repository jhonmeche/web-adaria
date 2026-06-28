# AdariA Systems — Sitio web

Sitio corporativo de AdariA Systems. Construido con **Astro 5 + Tailwind CSS 4**
(estático, rápido, 0 JS por defecto). El contexto de marca y contenido vive en
[`CLAUDE.md`](./CLAUDE.md).

## Requisitos
- Node.js 20+ (probado en 24)

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo → http://localhost:4321
npm run build      # build de producción → ./dist
npm run preview    # previsualizar el build
```

## Estructura

```
src/
├── components/
│   ├── layout/    # Header (nav + menú móvil), Footer
│   ├── ui/        # Logo, Button, Section, Eyebrow
│   ├── seo/       # BaseHead (meta + OpenGraph)
│   └── sections/  # Las 8 secciones de la home (§9 del brief)
├── data/          # sectores.ts, productos.ts (contenido tipado)
├── layouts/       # BaseLayout.astro
├── pages/         # index.astro (HOME)
└── styles/        # global.css (tokens de paleta — Opción C)
public/            # favicon.svg, /og (imágenes OpenGraph)
assets/            # logo original
```

## Estado

- ✅ **Home** completa y responsive.
- ⏳ Formulario de contacto: valida en cliente; falta conectar backend
  (Formspree / Netlify Forms) — ver `src/components/sections/Contacto.astro`.
- ⏳ Imágenes reales (hoy placeholders) y landings dedicadas por sector/producto.

Detalle de pendientes en la §14 de [`CLAUDE.md`](./CLAUDE.md).
