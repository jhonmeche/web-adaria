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
    bio: 'Dirige la estrategia comercial y el crecimiento de AdariA Systems. Traduce los retos operativos de cada cliente en oportunidades de producto, alianzas y proyectos viables, manteniendo el foco en impacto, adopción y retorno.',
    foco: ['Estrategia corporativa', 'Desarrollo de negocio', 'Relación con clientes', 'Producto'],
    linkedin: 'https://www.linkedin.com/in/jhon-meche-540802115',
    foto: '/equipo/jhon-meche.webp',
  },
  {
    nombre: 'Edinson Guzmán',
    rol: 'CTO y cofundador',
    bio: 'Dirige la arquitectura tecnológica y el desarrollo de las soluciones de AdariA Systems. Integra hardware, IoT, visión artificial y plataformas de datos para convertir operaciones complejas en sistemas confiables, trazables y escalables.',
    foco: ['Arquitectura técnica', 'Hardware & IoT', 'IA aplicada', 'Plataformas de datos'],
    linkedin: 'https://www.linkedin.com/in/edinson-guzman',
    foto: '/equipo/edinson-guzman.webp',
  },
  {
    nombre: 'Rafael Pulifo',
    rol: 'Director de operaciones técnicas',
    bio: 'Lidera la ejecución operativa de los proyectos, coordinando instalación, soporte y puesta en marcha en campo. Su trabajo conecta la ingeniería con la realidad diaria del cliente, asegurando implementaciones ordenadas, continuidad operativa y respuestas oportunas cuando la operación lo exige.',
    foco: ['Operaciones en campo', 'Puesta en marcha', 'Soporte técnico', 'Continuidad operativa'],
    foto: '/equipo/rafael-pulifo.webp',
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
