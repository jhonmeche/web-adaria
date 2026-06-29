// Utilidades del blog: ordenar, filtrar borradores y formatear.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Artículos publicados (sin borradores), del más reciente al más antiguo. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Fecha legible en español (Colombia): "20 de junio de 2026". */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Versión corta para datetime de <time>: AAAA-MM-DD. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Tiempo de lectura estimado a partir del cuerpo Markdown (~200 ppm). */
export function readingTime(body = ''): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const min = Math.max(1, Math.round(words / 200));
  return `${min} min de lectura`;
}
