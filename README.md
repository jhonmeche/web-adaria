# AdariA Systems — Sitio web

Sitio corporativo de AdariA Systems. Construido con **Astro 5 + Tailwind CSS 4**
(estático, rápido, 0 JS por defecto). El contexto de marca y contenido vive en
[`CLAUDE.md`](./CLAUDE.md).

Repositorio: <https://github.com/jhonmeche/web-adaria>

## Requisitos
- Node.js 20+ (probado en 24)
- Git y (opcional) VS Code con las extensiones recomendadas (Astro, Tailwind)

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo → http://localhost:4321
npm run build      # build de producción → ./dist
npm run preview    # previsualizar el build
```

Para ver el sitio desde el celular en la misma red: `npm run dev -- --host`
y abre `http://<IP-del-PC>:4321` en el móvil.

## Trabajar desde otro equipo

Primera vez en un equipo nuevo (instala antes Git, Node 20+ y VS Code + extensión Claude Code):

```bash
git clone https://github.com/jhonmeche/web-adaria.git
cd web-adaria
npm install
npm run dev
```

Flujo diario (en cualquier equipo) — la regla de oro es **pull al empezar, push al terminar**:

```bash
git pull                       # 1. traer lo último antes de trabajar
# ...cambios...
git add -A
git commit -m "descripción"
git push                       # 2. subir al terminar
```

> Nota: el `CLAUDE.md` viaja en el repo, así que Claude Code recupera todo el
> contexto del proyecto en cualquier equipo. El historial de chat NO se sincroniza.
> `node_modules/` tampoco se versiona: se reinstala con `npm install`.

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
