// Equipo y empresa — alimenta la página /nosotros (§ "Nosotros" del brief).
// Misión, visión, propósito y valores provienen del §1 del CLAUDE.md.
// Los datos de los fundadores son PLACEHOLDERS: reemplazar nombre, bio y
// linkedin por los reales (el monograma de iniciales se calcula del nombre).

export interface Fundador {
  /** Nombre completo. Las iniciales del monograma se derivan de aquí. */
  nombre: string;
  rol: string;
  /** Bio corta (2–3 frases), tono §12: directo, orientado a resultados. */
  bio: string;
  /** Áreas/responsabilidades clave (tags). */
  foco: string[];
  /** URL de LinkedIn (o '#' mientras no exista). */
  linkedin?: string;
  /**
   * Ruta de la foto en /public (ej. '/equipo/jhon-meche.jpg'). Recomendado:
   * imagen cuadrada (1:1), mínimo 320×320, formato .webp/.jpg.
   * Si se deja vacía, la tarjeta muestra el monograma con las iniciales.
   */
  foto?: string;
}

export interface Valor {
  titulo: string;
  texto: string;
}

export const fundadores: Fundador[] = [
  {
    nombre: 'Jhon Meche',
    rol: 'CEO y cofundador',
    bio: 'Lidera la estrategia, la relación con clientes y la visión de negocio de AdariA. Conecta el dolor real de cada operación industrial con la solución tecnológica que de verdad la resuelve.',
    foco: ['Estrategia', 'Comercial B2B', 'Producto', 'Alianzas'],
    linkedin: '#',
    foto: '/equipo/jhon-meche.webp',
  },
  {
    nombre: 'Edinson Guzmán',
    rol: 'CTO y cofundador',
    bio: 'Lidera la ingeniería y la arquitectura técnica de AdariA: del diseño de hardware y los modelos de visión artificial a las plataformas de datos. Garantiza el rigor técnico y el dato auditable, del sensor a la decisión.',
    foco: ['Ingeniería', 'Hardware & IoT', 'Visión artificial / IA', 'Arquitectura'],
    linkedin: '#',
    // Sube la imagen a public/equipo/ y descomenta:
    // foto: '/equipo/edinson-guzman.jpg',
    foto: '',
  },
];

// §1 del brief — constantes de identidad.
export const proposito =
  'AdariA Systems nace para resolver las necesidades reales de las empresas con soluciones tecnológicas hechas a la medida, llevando a cada operación la tecnología que de verdad necesita.';

export const mision =
  'Desarrollar soluciones tecnológicas a la medida que resuelven las necesidades reales de las empresas, integrando inteligencia artificial, visión artificial y diseño de hardware para optimizar sus procesos, reducir costos y potenciar su crecimiento.';

export const vision =
  'Ser para 2030 una compañía de tecnología referente en Latinoamérica en inteligencia y visión artificial e IoT industrial, reconocida por transformar la operación de nuestros clientes en procesos más eficientes, trazables y rentables.';

export const valores: Valor[] = [
  { titulo: 'Rigor técnico', texto: 'Ingeniería seria y bien hecha: nada de soluciones a medias.' },
  { titulo: 'Transparencia y trazabilidad', texto: 'Cada dato es auditable, del sensor a la decisión.' },
  { titulo: 'Innovación aplicada', texto: 'Tecnología de punta puesta a resolver problemas reales.' },
  { titulo: 'Soluciones a la medida', texto: 'Construimos para su operación, no al revés.' },
  { titulo: 'Orientación a resultados', texto: 'Medimos el éxito por el impacto en su operación y el impacto operativo.' },
  { titulo: 'Integridad', texto: 'Cumplimos lo que prometemos, con honestidad técnica.' },
];
