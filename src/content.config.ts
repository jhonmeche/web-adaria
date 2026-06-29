// Colecciones de contenido (Astro Content Layer).
// El BLOG se alimenta con archivos Markdown en  src/content/blog/  → cada .md
// es un artículo. Para publicar uno nuevo: crea otro .md con el frontmatter de
// abajo y haz commit. Esta misma estructura (carpeta de Markdown + frontmatter)
// es la que edita un CMS visual como Decap/Sanity el día que se conecte.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** Titular del artículo. */
    title: z.string(),
    /** Resumen corto (se muestra en la tarjeta y en los meta/OG). */
    description: z.string(),
    /** Fecha de publicación (AAAA-MM-DD). */
    pubDate: z.coerce.date(),
    /** Fecha de última actualización (opcional). */
    updatedDate: z.coerce.date().optional(),
    /** Autor. */
    author: z.string().default('AdariA Systems'),
    /** Categoría: Noticias · Tecnología · Casos de éxito · Eventos · Industria. */
    category: z.string().default('Noticias'),
    /** Imagen de portada: ruta en /public (p. ej. /blog/mi-portada.jpg). */
    cover: z.string().optional(),
    /** Texto alternativo de la portada (accesibilidad). */
    coverAlt: z.string().optional(),
    /** Etiquetas para filtrar/relacionar. */
    tags: z.array(z.string()).default([]),
    /** Si es true, no se publica (no aparece en el sitio). */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
