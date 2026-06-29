// Productos — el stack integral de AdariA (§2, §3 del brief).

/** Grupo de capacidades/líneas del producto (para la landing). */
export interface Capacidad {
  titulo: string;
  descripcion?: string;
  items: string[];
}
/** Paso del "cómo funciona". */
export interface PasoComo {
  titulo: string;
  texto: string;
}
/** Diferenciador / beneficio. */
export interface Beneficio {
  titulo: string;
  texto: string;
}
/** Contenido extendido de la landing dedicada (/productos/[slug]). */
export interface ProductoDetalle {
  /** Párrafo de apertura del hero de la landing. */
  intro: string;
  capacidadesTitulo: string;
  capacidadesIntro?: string;
  capacidades: Capacidad[];
  comoFunciona: PasoComo[];
  beneficios: Beneficio[];
  /** Slugs de sectores donde más aplica (enlazan a su tarjeta). */
  sectores?: string[];
}

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
  /** Contenido de la landing dedicada. */
  detalle?: ProductoDetalle;
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
    detalle: {
      intro:
        'Smart PBA es el ERP trazable y auditable para plantas de beneficio animal (bovino y porcino) y desposte. Gestiona la operación completa, del ingreso del lote al despacho, y suma un modelo de visión artificial propio para el conteo en el pesaje en pie y evidencia fotográfica que da transparencia al cliente.',
      capacidadesTitulo: 'Toda la operación, en un solo sistema',
      capacidadesIntro:
        'Del corral al despacho, cada etapa queda registrada, soportada y lista para auditar.',
      capacidades: [
        {
          titulo: 'Trazabilidad y auditoría',
          descripcion: 'Cada lote, registrado de principio a fin.',
          items: [
            'Registro del ingreso del lote al despacho',
            'Gestión de lotes y guías',
            'Auditoría punta a punta',
            'Informes y soportes descargables',
          ],
        },
        {
          titulo: 'Conteo por visión artificial',
          descripcion: 'Modelo propio en el pesaje en pie.',
          items: [
            'Conteo automático de animales',
            'Reduce disputas y errores de conteo',
            'Resultado objetivo y verificable',
          ],
        },
        {
          titulo: 'Evidencia y transparencia',
          descripcion: 'Lo que se reporta, se demuestra.',
          items: [
            'Evidencia fotográfica automática',
            'Soporte visual de cada lote',
            'Transparencia ante el cliente',
          ],
        },
        {
          titulo: 'Integración y datos',
          descripcion: 'Conectado a tu operación.',
          items: [
            'Integración con básculas y PLCs',
            'KPIs y reportes operativos',
            'Datos confiables para decidir',
          ],
        },
      ],
      comoFunciona: [
        { titulo: 'Ingreso', texto: 'Se registra el lote y el pesaje en pie, con conteo por visión artificial.' },
        { titulo: 'Proceso', texto: 'Cada etapa de la operación queda trazada y soportada.' },
        { titulo: 'Evidencia', texto: 'Captura fotográfica automática como respaldo de cada lote.' },
        { titulo: 'Despacho', texto: 'Cierre con informes auditables y datos confiables.' },
      ],
      beneficios: [
        { titulo: 'El más maduro', texto: 'Funcionando en plantas reales; nuestro principal caso de credibilidad.' },
        { titulo: 'Transparencia real', texto: 'Los números se demuestran con imágenes, no solo se afirman.' },
        { titulo: 'Menos disputas', texto: 'Conteo objetivo por visión artificial, sin discusiones.' },
        { titulo: 'Decisiones con dato', texto: 'KPIs y reportes confiables de toda la operación.' },
      ],
      sectores: ['industria-carnica'],
    },
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
    detalle: {
      intro:
        'AdariA Vision convierte tus cámaras en un sistema que ve, entiende y actúa. Modelos de visión artificial entrenados a la medida que se integran sobre el CCTV/IP existente (vía RTSP), o sobre cámaras industriales y de alta velocidad para aplicaciones más exigentes. Un mismo motor para seguridad, calidad, logística e infraestructura.',
      capacidadesTitulo: 'Una suite, cuatro líneas',
      capacidadesIntro:
        'Empieza por un caso de uso y escala a más líneas y más sitios cuando la operación lo pida.',
      capacidades: [
        {
          titulo: 'Seguridad (HSE)',
          descripcion: 'Operaciones más seguras, en tiempo real.',
          items: [
            'Detección de EPP (casco, chaleco, gafas, guantes)',
            'Zonas restringidas y red-zones',
            'Detección de fuego y humo',
            'Prevención de colisiones',
            'Fatiga de operarios',
          ],
        },
        {
          titulo: 'Calidad',
          descripcion: 'Inspección consistente, sin fatiga humana.',
          items: [
            'Detección de defectos',
            'Clasificación y grading',
            'Inspección en banda',
            'Verificación de etiquetado y empaque',
            'Medición dimensional',
          ],
        },
        {
          titulo: 'Logística',
          descripcion: 'Control y conteo automáticos del flujo.',
          items: [
            'Conteo de productos',
            'Conteo de personas y aforo',
            'Lectura de placas (LPR)',
            'OCR de lotes, fechas y seriales',
            'Monitoreo de estanterías',
          ],
        },
        {
          titulo: 'Movilidad e infraestructura',
          descripcion: 'Datos donde antes había inspección manual.',
          items: [
            'Conteo vehicular',
            'Inspección con drones',
            'Lectura de medidores analógicos',
          ],
        },
      ],
      comoFunciona: [
        { titulo: 'Integramos', texto: 'Conectamos tus cámaras CCTV/IP vía RTSP, sin hardware nuevo en muchos casos.' },
        { titulo: 'Entrenamos', texto: 'Modelos a la medida de tu contexto y casos de uso, no detectores genéricos.' },
        { titulo: 'Procesamos', texto: 'Análisis en el borde o servidor: convertimos la imagen en eventos.' },
        { titulo: 'Alertamos', texto: 'Dashboards, alertas en tiempo real e informes auditables.' },
      ],
      beneficios: [
        { titulo: 'Bajo costo de entrada', texto: 'Aprovecha la infraestructura de cámaras que ya tienes.' },
        { titulo: 'A la medida', texto: 'Modelos entrenados para tu operación: más precisión, menos falsos positivos.' },
        { titulo: 'Escalable', texto: 'Un caso de uso hoy; más líneas y sitios cuando lo necesites.' },
        { titulo: 'Dato auditable', texto: 'Evidencia visual que respalda cada evento y decisión.' },
      ],
      sectores: ['hidrocarburos-mineria-energia', 'manufactura', 'logistica-bodegas', 'agroindustria'],
    },
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
    detalle: {
      intro:
        'AdariA Sense monitorea tus equipos e infraestructura en tiempo real y anticipa las fallas. Sensores IoT, conectividad LoRa/LoRaWAN, dispositivos edge y analítica, con hardware diseñado por AdariA. Ideal para sitios remotos: largo alcance, bajo consumo y sensores a batería que duran años.',
      capacidadesTitulo: 'Del sensor a la predicción',
      capacidadesIntro:
        'Medimos las variables críticas, las llevamos hasta donde estén y las convertimos en alertas y predicción.',
      capacidades: [
        {
          titulo: 'Monitoreo en tiempo real',
          descripcion: 'Lo que pasa en el equipo, cuando pasa.',
          items: [
            'Presión, temperatura y vibración',
            'Gas, nivel y caudal',
            'Tableros centralizados',
          ],
        },
        {
          titulo: 'Mantenimiento predictivo',
          descripcion: 'Mantener antes de que falle.',
          items: [
            'Predicción de fallas',
            'Mantenimiento programado antes de la parada',
            'Menos paradas no planeadas',
          ],
        },
        {
          titulo: 'Alertas de seguridad',
          descripcion: 'Reaccionar a tiempo.',
          items: [
            'Alertas de gas y temperatura',
            'Umbrales configurables',
            'Notificaciones en tiempo real',
          ],
        },
        {
          titulo: 'Hardware propio',
          descripcion: 'Diseñado por AdariA, a la medida.',
          items: [
            'Nodos, gateways y dispositivos edge',
            'LoRa/LoRaWAN para sitios remotos',
            'Sensores a batería de larga duración',
          ],
        },
      ],
      comoFunciona: [
        { titulo: 'Sensorizamos', texto: 'Nodos IoT miden las variables críticas del equipo.' },
        { titulo: 'Conectamos', texto: 'LoRa/LoRaWAN lleva el dato incluso sin cobertura tradicional.' },
        { titulo: 'Procesamos', texto: 'Edge y analítica detectan patrones y anomalías.' },
        { titulo: 'Anticipamos', texto: 'Alertas y predicción para mantener antes de la falla.' },
      ],
      beneficios: [
        { titulo: 'Cero paradas sorpresa', texto: 'Del mantenimiento reactivo al predictivo.' },
        { titulo: 'Sitios remotos', texto: 'LoRa: largo alcance y años de batería sin cableado.' },
        { titulo: 'Hardware propio', texto: 'Adaptado a tu operación, no una solución genérica.' },
        { titulo: 'Seguridad', texto: 'Alertas tempranas de gas y temperatura.' },
      ],
      sectores: ['hidrocarburos-mineria-energia', 'manufactura'],
    },
  },
];
