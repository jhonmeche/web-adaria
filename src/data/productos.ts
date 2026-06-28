// Productos — el stack integral de AdariA (§2, §3 del brief).

export interface Producto {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  /** Puntos clave para la card. */
  puntos: string[];
  /** Etiqueta de estado/madurez (opcional). */
  badge?: string;
}

export const productos: Producto[] = [
  {
    slug: 'smart-pba',
    nombre: 'Smart PBA',
    tagline: 'ERP trazable para plantas de beneficio animal.',
    descripcion:
      'Gestiona toda la operación cárnica —del ingreso del lote al despacho— con evidencia fotográfica y conteo por visión artificial.',
    puntos: [
      'Trazabilidad y auditoría punta a punta',
      'Conteo de animales por visión artificial',
      'Evidencia fotográfica para el cliente',
    ],
    badge: 'Caso de éxito',
  },
  {
    slug: 'adaria-vision',
    nombre: 'AdariA Vision',
    tagline: 'Suite de visión artificial sobre tus cámaras.',
    descripcion:
      'Modelos entrenados a la medida que corren sobre tu CCTV/IP existente vía RTSP. Seguridad, calidad, logística e infraestructura.',
    puntos: [
      'Usa tus cámaras actuales (bajo costo de entrada)',
      'EPP, zonas restringidas, fuego y humo',
      'Conteo, grading, OCR, LPR y más',
    ],
  },
  {
    slug: 'adaria-sense',
    nombre: 'AdariA Sense',
    tagline: 'Monitoreo en tiempo real + mantenimiento predictivo.',
    descripcion:
      'Sensores IoT con conectividad LoRa/LoRaWAN y analítica en el borde. Mide, predice fallas y evita paradas, incluso en sitios remotos.',
    puntos: [
      'Hardware propio: nodos, gateways y edge',
      'LoRa para sitios remotos sin conectividad',
      'Predicción de fallas y alertas de seguridad',
    ],
  },
];
