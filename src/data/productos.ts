// Productos — el stack integral de AdariA (§2, §3 del brief).

export interface Producto {
  slug: string;
  nombre: string;
  /** Categoría corta que clasifica el producto de un vistazo. */
  categoria: string;
  tagline: string;
  descripcion: string;
  /** Puntos clave para la card. */
  puntos: string[];
  /** Path SVG del ícono (viewBox 0 0 24 24, trazo). */
  icon: string;
  /** Producto insignia: recibe tratamiento destacado en la home. */
  destacado?: boolean;
}

export const productos: Producto[] = [
  {
    slug: 'smart-pba',
    nombre: 'Smart PBA',
    categoria: 'ERP industrial trazable',
    tagline: 'ERP trazable para plantas de beneficio animal.',
    descripcion:
      'Gestiona toda la operación cárnica, del ingreso del lote al despacho, con evidencia fotográfica y conteo por visión artificial.',
    puntos: [
      'Trazabilidad y auditoría punta a punta',
      'Conteo de animales por visión artificial',
      'Evidencia fotográfica para el cliente',
    ],
    icon: 'M16.5 9.4 7.5 4.21M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12',
    destacado: true,
  },
  {
    slug: 'adaria-vision',
    nombre: 'AdariA Vision',
    categoria: 'Visión artificial',
    tagline: 'Suite de visión artificial sobre las cámaras existentes.',
    descripcion:
      'Modelos entrenados a la medida sobre la red CCTV/IP existente, o con cámaras industriales y de alta velocidad para aplicaciones más exigentes. Cubre seguridad, calidad, logística e infraestructura.',
    puntos: [
      'Aprovecha las cámaras actuales (bajo costo de entrada)',
      'EPP, zonas restringidas, fuego y humo',
      'Conteo, grading, OCR, LPR y más',
    ],
    icon: 'M3 8V6a3 3 0 0 1 3-3h2M16 3h2a3 3 0 0 1 3 3v2M21 16v2a3 3 0 0 1-3 3h-2M8 21H6a3 3 0 0 1-3-3v-2M12 7.5V10M12 14v2.5M7.5 12H10M14 12h2.5',
  },
  {
    slug: 'adaria-sense',
    nombre: 'AdariA Sense',
    categoria: 'IoT y LoRa',
    tagline: 'Monitoreo en tiempo real y mantenimiento predictivo.',
    descripcion:
      'Sensores IoT con conectividad LoRa/LoRaWAN y analítica en el borde. Mide, predice fallas y evita paradas, incluso en sitios remotos.',
    puntos: [
      'Hardware propio: nodos, gateways y edge',
      'LoRa para sitios remotos sin conectividad',
      'Predicción de fallas y alertas de seguridad',
    ],
    icon: 'M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0M12 20h.01',
  },
];
