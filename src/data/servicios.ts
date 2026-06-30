// Servicios — las 6 capacidades núcleo de AdariA (§4 del brief).
// Alimenta tanto la sección de la home (Servicios.astro) como la landing
// dedicada de cada servicio (/servicios/[slug]). Mismo enfoque tipado que
// productos.ts: el contenido vive aquí, la presentación en los componentes.

/** Grupo de capacidades de un servicio (qué hacemos, en la landing). */
export interface ServicioCapacidad {
  titulo: string;
  /** Subtítulo corto en tono de marca. */
  descripcion?: string;
  items: string[];
}
/** Paso del método de trabajo del servicio. */
export interface ServicioPaso {
  titulo: string;
  texto: string;
}
/** Diferenciador / beneficio del servicio. */
export interface ServicioBeneficio {
  titulo: string;
  texto: string;
}
/** Contenido extendido de la landing dedicada (/servicios/[slug]). */
export interface ServicioDetalle {
  /** Párrafo de apertura del hero. */
  intro: string;
  /** Puntos clave destacados en el hero (columna derecha). */
  puntos: string[];
  queHacemosTitulo: string;
  queHacemosIntro?: string;
  capacidades: ServicioCapacidad[];
  proceso: ServicioPaso[];
  /** Stack / tecnologías / entregables concretos (tags). */
  entregables: string[];
  beneficios: ServicioBeneficio[];
  /** Slugs de sectores donde más aplica (resuelven nombre desde sectores.ts). */
  sectores?: string[];
}

export interface Servicio {
  slug: string;
  nombre: string;
  /** Categoría corta que clasifica el servicio de un vistazo. */
  categoria: string;
  tagline: string;
  /** Texto de la card en la home. */
  resumen: string;
  /** Tags de tecnologías/entregables para la card de la home. */
  tags: string[];
  /** Path SVG del ícono (viewBox 0 0 24 24, trazo). */
  icon: string;
  detalle: ServicioDetalle;
}

export const servicios: Servicio[] = [
  {
    slug: 'desarrollo-de-software',
    nombre: 'Desarrollo de software',
    categoria: 'Software a la medida',
    tagline: 'Web, móvil, plataformas y ERP a la medida de tu operación.',
    resumen: 'Web, móvil, plataformas y ERP a la medida que se ajustan a tu operación, no al revés.',
    tags: ['Web & móvil', 'Plataformas SaaS', 'ERP', 'APIs'],
    icon: 'm8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14',
    detalle: {
      intro:
        'Construimos el software que tu operación necesita —no el que cabe en una licencia genérica—. Plataformas web, apps móviles, portales y ERP diseñados alrededor de tu proceso real, integrados con tus equipos y datos, y listos para escalar.',
      puntos: [
        'A la medida de tu proceso, no al revés',
        'Integrado con tus equipos y datos',
        'Arquitectura lista para escalar',
      ],
      queHacemosTitulo: 'Software que se adapta a tu operación',
      queHacemosIntro:
        'Del portal interno al ERP que corre la planta: diseñamos, construimos y mantenemos el sistema completo.',
      capacidades: [
        {
          titulo: 'Plataformas web y SaaS',
          descripcion: 'Aplicaciones de negocio en la nube',
          items: [
            'Portales internos y de cliente',
            'Paneles de operación en tiempo real',
            'Multiusuario con roles y permisos',
            'Arquitectura multi-tenant',
          ],
        },
        {
          titulo: 'Aplicaciones móviles',
          descripcion: 'Captura y operación en campo',
          items: [
            'Apps para iOS y Android',
            'Captura de datos en planta y en ruta',
            'Funcionamiento sin conexión',
            'Sincronización automática',
          ],
        },
        {
          titulo: 'ERP y sistemas de gestión',
          descripcion: 'El núcleo de tu operación',
          items: [
            'Trazabilidad punta a punta',
            'Inventario, producción y despacho',
            'Reportes y auditoría',
            'Smart PBA como caso de referencia',
          ],
        },
        {
          titulo: 'APIs e integraciones',
          descripcion: 'Todo conectado',
          items: [
            'APIs REST documentadas',
            'Conexión con básculas, PLC y SCADA',
            'Webhooks y servicios en tiempo real',
            'Integración con sistemas existentes',
          ],
        },
      ],
      proceso: [
        { titulo: 'Levantamiento', texto: 'Mapeamos tu proceso real y definimos el alcance del primer entregable.' },
        { titulo: 'Diseño', texto: 'Arquitectura, modelo de datos y prototipo navegable antes de programar.' },
        { titulo: 'Desarrollo iterativo', texto: 'Entregas cortas y verificables: ves avances cada sprint, no al final.' },
        { titulo: 'Despliegue y soporte', texto: 'Puesta en producción, capacitación y mejora continua del sistema.' },
      ],
      entregables: ['React / Astro', 'Node.js', 'TypeScript', 'PostgreSQL', 'React Native', 'APIs REST', 'Cloud / on-premise'],
      beneficios: [
        { titulo: 'Hecho a tu medida', texto: 'El sistema se ajusta a tu operación, no tu operación al sistema.' },
        { titulo: 'Un dato confiable', texto: 'Una sola fuente de verdad, integrada con tus equipos.' },
        { titulo: 'Listo para crecer', texto: 'Arquitectura que escala de un piloto a toda la operación.' },
        { titulo: 'Soporte cercano', texto: 'Un equipo que conoce tu sistema y responde, no un ticket más.' },
      ],
      sectores: ['industria-carnica', 'logistica-bodegas', 'manufactura'],
    },
  },
  {
    slug: 'diseno-de-hardware',
    nombre: 'Diseño de hardware',
    categoria: 'Electrónica a la medida',
    tagline: 'Tarjetas, sensores, gateways y dispositivos edge diseñados por nosotros.',
    resumen: 'Tarjetas electrónicas, sensores, gateways y dispositivos edge diseñados por nosotros.',
    tags: ['PCB', 'Sensores', 'Gateways', 'Edge'],
    icon: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2',
    detalle: {
      intro:
        'Diseñamos el hardware desde el esquemático hasta el dispositivo en campo. Tarjetas electrónicas, nodos de sensores, gateways LoRa y dispositivos edge pensados para tu entorno —remoto, industrial o de bajo consumo— y fabricados a la medida del problema.',
      puntos: [
        'Del esquemático al dispositivo en campo',
        'Pensado para entornos industriales y remotos',
        'Bajo consumo: años de batería',
      ],
      queHacemosTitulo: 'Electrónica diseñada para tu entorno',
      queHacemosIntro:
        'No adaptamos un módulo genérico: diseñamos la tarjeta que tu aplicación necesita.',
      capacidades: [
        {
          titulo: 'Diseño de PCB',
          descripcion: 'Del esquemático a la fabricación',
          items: [
            'Esquemático y ruteo multicapa',
            'Selección y abastecimiento de componentes',
            'Prototipado y validación',
            'Documentación para producción',
          ],
        },
        {
          titulo: 'Nodos de sensores',
          descripcion: 'Captura del dato en campo',
          items: [
            'Presión, temperatura y vibración',
            'Nivel, caudal, gas y más variables',
            'Acondicionamiento de señal',
            'Carcasas para ambiente industrial',
          ],
        },
        {
          titulo: 'Gateways y conectividad',
          descripcion: 'El dato que sale del sitio',
          items: [
            'Gateways LoRa / LoRaWAN',
            'Largo alcance en sitios sin cobertura',
            'Respaldo celular y satelital',
            'Gestión remota de dispositivos',
          ],
        },
        {
          titulo: 'Dispositivos edge',
          descripcion: 'Procesamiento en el sitio',
          items: [
            'Cómputo en el borde (edge AI)',
            'Inferencia local sin depender de la nube',
            'Bajo consumo energético',
            'Operación autónoma por años',
          ],
        },
      ],
      proceso: [
        { titulo: 'Requerimientos', texto: 'Variables a medir, entorno, energía y conectividad disponibles.' },
        { titulo: 'Diseño y prototipo', texto: 'Esquemático, PCB y primer prototipo funcional para validar en banco.' },
        { titulo: 'Validación en campo', texto: 'Probamos el dispositivo en tu sitio real, en condiciones reales.' },
        { titulo: 'Producción', texto: 'Afinamos para fabricación y desplegamos la cantidad que necesites.' },
      ],
      entregables: ['Diseño de PCB', 'Firmware embebido', 'LoRa / LoRaWAN', 'Edge computing', 'Sensórica industrial', 'Bajo consumo'],
      beneficios: [
        { titulo: 'A la medida', texto: 'El hardware exacto para tu variable y tu entorno.' },
        { titulo: 'Sin cobertura, sin problema', texto: 'LoRa lleva el dato donde no llega la red tradicional.' },
        { titulo: 'Autonomía real', texto: 'Sensores a batería que duran años, no semanas.' },
        { titulo: 'Propiedad del diseño', texto: 'El hardware es tuyo: sin candados de proveedor.' },
      ],
      sectores: ['hidrocarburos-mineria-energia', 'manufactura', 'agroindustria'],
    },
  },
  {
    slug: 'vision-artificial-ia',
    nombre: 'Visión artificial e IA',
    categoria: 'Visión artificial e IA',
    tagline: 'Modelos propios entrenados para tu contexto.',
    resumen: 'Modelos propios entrenados para tu contexto: más precisión y menos falsos positivos.',
    tags: ['Modelos propios', 'Deep learning', 'RTSP / CCTV', 'Edge AI'],
    icon: 'M3 8V6a3 3 0 0 1 3-3h2M16 3h2a3 3 0 0 1 3 3v2M21 16v2a3 3 0 0 1-3 3h-2M8 21H6a3 3 0 0 1-3-3v-2M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    detalle: {
      intro:
        'Entrenamos modelos de visión artificial e inteligencia artificial para tu operación específica. Corren sobre tus cámaras actuales (CCTV/IP vía RTSP), detectan lo que importa con precisión y menos falsos positivos, y disparan alertas en tiempo real. Es la base de AdariA Vision.',
      puntos: [
        'Sobre tus cámaras actuales (RTSP/CCTV)',
        'Modelos entrenados a tu contexto',
        'Alertas en tiempo real',
      ],
      queHacemosTitulo: 'IA entrenada para lo que necesitas ver',
      queHacemosIntro:
        'Seguridad, calidad, logística e infraestructura: un modelo para cada caso de uso, sobre la cámara que ya tienes.',
      capacidades: [
        {
          titulo: 'Seguridad (HSE)',
          descripcion: 'Prevención en tiempo real',
          items: [
            'Detección de EPP',
            'Zonas restringidas y red-zones',
            'Detección de fuego y humo',
            'Fatiga de operarios',
          ],
        },
        {
          titulo: 'Calidad',
          descripcion: 'Inspección automática',
          items: [
            'Detección de defectos',
            'Clasificación y grading',
            'Verificación de etiquetado y empaque',
            'Medición dimensional',
          ],
        },
        {
          titulo: 'Logística',
          descripcion: 'Conteo y control',
          items: [
            'Conteo de productos',
            'Aforo y conteo de personas',
            'Lectura de placas (LPR)',
            'OCR de lotes, fechas y seriales',
          ],
        },
        {
          titulo: 'Movilidad e infraestructura',
          descripcion: 'Vista a gran escala',
          items: [
            'Conteo vehicular',
            'Inspección con drones',
            'Lectura de medidores analógicos',
            'Monitoreo de infraestructura',
          ],
        },
      ],
      proceso: [
        { titulo: 'Caso de uso', texto: 'Definimos qué detectar y la métrica de éxito: precisión y falsos positivos.' },
        { titulo: 'Datos y entrenamiento', texto: 'Recolectamos y etiquetamos imágenes de tu contexto y entrenamos el modelo.' },
        { titulo: 'Integración', texto: 'Conectamos a tus cámaras vía RTSP y al canal de alertas que uses.' },
        { titulo: 'Mejora continua', texto: 'El modelo aprende de nuevos casos y sube su precisión con el tiempo.' },
      ],
      entregables: ['Deep learning', 'Modelos propios', 'RTSP / CCTV', 'Edge AI', 'Detección y conteo', 'OCR / LPR'],
      beneficios: [
        { titulo: 'Usa tus cámaras', texto: 'Bajo costo de entrada: aprovechamos el CCTV que ya tienes.' },
        { titulo: 'Precisión a tu medida', texto: 'Entrenado en tu contexto: menos falsos positivos.' },
        { titulo: 'Vigilancia 24/7', texto: 'El modelo no se cansa ni se distrae: observa todo, siempre.' },
        { titulo: 'Reacción inmediata', texto: 'Alertas en el momento, no en el reporte del día siguiente.' },
      ],
      sectores: ['hidrocarburos-mineria-energia', 'manufactura', 'logistica-bodegas', 'industria-carnica'],
    },
  },
  {
    slug: 'soluciones-iot',
    nombre: 'Soluciones IoT',
    categoria: 'IoT y conectividad',
    tagline: 'Sensorización, conectividad LoRa y telemetría, hasta donde no llega la red.',
    resumen: 'Sensorización, conectividad LoRa/LoRaWAN y telemetría, incluso en sitios sin cobertura.',
    tags: ['LoRa/LoRaWAN', 'Telemetría', 'Sensórica', 'Bajo consumo'],
    icon: 'M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0M12 20h.01',
    detalle: {
      intro:
        'Conectamos tu operación física al mundo digital. Instalamos sensores, los enlazamos con LoRa/LoRaWAN —ideal para sitios remotos y de largo alcance— y llevamos la telemetría en tiempo real a tus tableros. Es la base de AdariA Sense.',
      puntos: [
        'Largo alcance en sitios remotos',
        'Sensores a batería que duran años',
        'Telemetría en tiempo real',
      ],
      queHacemosTitulo: 'Del sensor en campo al dato en tu tablero',
      queHacemosIntro:
        'Sensorizamos, conectamos y transmitimos —incluso donde no hay cobertura celular.',
      capacidades: [
        {
          titulo: 'Sensorización',
          descripcion: 'Medimos tu operación',
          items: [
            'Presión, temperatura y vibración',
            'Gas, nivel y caudal',
            'Energía y consumo',
            'Variables a la medida de tu proceso',
          ],
        },
        {
          titulo: 'Conectividad LoRa',
          descripcion: 'El dato llega siempre',
          items: [
            'LoRa / LoRaWAN de largo alcance',
            'Cobertura en sitios remotos',
            'Bajo consumo energético',
            'Respaldo celular y satelital',
          ],
        },
        {
          titulo: 'Telemetría',
          descripcion: 'Datos en tiempo real',
          items: [
            'Monitoreo continuo 24/7',
            'Histórico de variables',
            'Tableros en vivo',
            'Alertas por umbral',
          ],
        },
        {
          titulo: 'Edge y autonomía',
          descripcion: 'Inteligencia en el sitio',
          items: [
            'Procesamiento en el borde',
            'Operación sin conexión permanente',
            'Gestión remota de nodos',
            'Despliegue escalable',
          ],
        },
      ],
      proceso: [
        { titulo: 'Diagnóstico', texto: 'Qué medir, dónde y con qué frecuencia para tu objetivo.' },
        { titulo: 'Sensorización', texto: 'Instalamos sensores y nodos en los puntos críticos.' },
        { titulo: 'Conectividad', texto: 'Desplegamos la red LoRa que lleva el dato fuera del sitio.' },
        { titulo: 'Visualización', texto: 'Telemetría y alertas en tableros listos para decidir.' },
      ],
      entregables: ['LoRa / LoRaWAN', 'Sensórica industrial', 'Telemetría', 'Edge computing', 'Bajo consumo', 'Gateways propios'],
      beneficios: [
        { titulo: 'Llega a todas partes', texto: 'LoRa cubre sitios remotos donde no hay red celular.' },
        { titulo: 'Años de autonomía', texto: 'Sensores a batería de bajo consumo, sin cableado.' },
        { titulo: 'Visibilidad total', texto: 'Sabes qué pasa en tu operación en todo momento.' },
        { titulo: 'Base predictiva', texto: 'El dato histórico habilita el mantenimiento predictivo.' },
      ],
      sectores: ['hidrocarburos-mineria-energia', 'manufactura', 'agroindustria'],
    },
  },
  {
    slug: 'integracion-de-sistemas',
    nombre: 'Integración de sistemas',
    categoria: 'Integración y digitalización',
    tagline: 'ERP, básculas, PLC, cámaras y SCADA en un solo flujo confiable.',
    resumen: 'Conectamos ERP, básculas, PLCs, cámaras y SCADA en un solo flujo de datos confiable.',
    tags: ['ERP', 'PLC', 'SCADA', 'Básculas'],
    icon: 'M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8',
    detalle: {
      intro:
        'Tu operación ya tiene equipos, software y datos —pero aislados—. Los integramos en un solo flujo confiable: ERP, básculas, PLC, cámaras y SCADA hablando entre sí, con un dato único y auditable que elimina la digitación manual y los silos.',
      puntos: [
        'Un solo flujo de datos confiable',
        'Sin digitación manual ni silos',
        'Dato único y auditable',
      ],
      queHacemosTitulo: 'Todo tu ecosistema, hablando el mismo idioma',
      queHacemosIntro:
        'Conectamos lo que ya tienes —sin reemplazarlo— para que el dato fluya sin intervención manual.',
      capacidades: [
        {
          titulo: 'Integración industrial',
          descripcion: 'La capa OT, conectada',
          items: [
            'PLC y SCADA',
            'Básculas y sistemas de pesaje',
            'Sensores y cámaras',
            'Protocolos industriales',
          ],
        },
        {
          titulo: 'Integración de sistemas',
          descripcion: 'La capa IT, conectada',
          items: [
            'ERP y sistemas de gestión',
            'Bases de datos y servicios',
            'APIs de terceros',
            'Sincronización entre plataformas',
          ],
        },
        {
          titulo: 'Digitalización de procesos',
          descripcion: 'Adiós al papel',
          items: [
            'Captura digital en planta',
            'Flujos de trabajo automatizados',
            'Eliminación de la re-digitación',
            'Trazabilidad punta a punta',
          ],
        },
        {
          titulo: 'Middleware y datos',
          descripcion: 'El pegamento confiable',
          items: [
            'Capa de integración a la medida',
            'Normalización de datos',
            'Eventos en tiempo real',
            'Monitoreo de la integración',
          ],
        },
      ],
      proceso: [
        { titulo: 'Mapa de sistemas', texto: 'Inventariamos equipos, software y datos que hoy están aislados.' },
        { titulo: 'Diseño de la integración', texto: 'Definimos qué conecta con qué y el flujo de dato único.' },
        { titulo: 'Conexión', texto: 'Implementamos la capa que hace hablar a todo el ecosistema.' },
        { titulo: 'Validación', texto: 'Verificamos consistencia y dejamos la integración monitoreada.' },
      ],
      entregables: ['ERP', 'PLC / SCADA', 'Básculas', 'APIs REST', 'Middleware', 'Protocolos industriales'],
      beneficios: [
        { titulo: 'Sin re-digitación', texto: 'El dato viaja solo: menos errores y menos trabajo manual.' },
        { titulo: 'Una sola verdad', texto: 'Todos los sistemas con el mismo dato, sin contradicciones.' },
        { titulo: 'Aprovecha lo que tienes', texto: 'Integramos tu inversión actual, no la reemplazamos.' },
        { titulo: 'Dato auditable', texto: 'Trazabilidad de punta a punta para auditar con confianza.' },
      ],
      sectores: ['industria-carnica', 'manufactura', 'logistica-bodegas'],
    },
  },
  {
    slug: 'analitica-y-decision',
    nombre: 'Analítica y decisión',
    categoria: 'Analítica y big data',
    tagline: 'Dashboards, KPIs, reportes y predicción que convierten el dato en decisiones.',
    resumen: 'Dashboards, KPIs, reportes y predicción que convierten el dato en decisiones a tiempo.',
    tags: ['Dashboards', 'KPIs', 'Reportes', 'Predicción'],
    icon: 'M3 3v18h18M7 14l3-3 3 3 5-6',
    detalle: {
      intro:
        'Capturar el dato es la mitad del camino; lo que importa es decidir mejor. Convertimos tus datos —de sensores, cámaras, ERP y operación— en dashboards claros, KPIs accionables, reportes automáticos y modelos de predicción que anticipan lo que viene.',
      puntos: [
        'Del dato crudo a la decisión',
        'KPIs y dashboards en tiempo real',
        'Predicción, no solo histórico',
      ],
      queHacemosTitulo: 'El dato convertido en decisiones a tiempo',
      queHacemosIntro:
        'Centralizamos, visualizamos y predecimos —para que decidas con evidencia, no con intuición.',
      capacidades: [
        {
          titulo: 'Dashboards y visualización',
          descripcion: 'Tu operación de un vistazo',
          items: [
            'Tableros en tiempo real',
            'KPIs por área y rol',
            'Vistas para operación y dirección',
            'Acceso web y móvil',
          ],
        },
        {
          titulo: 'Reportes y automatización',
          descripcion: 'Informes sin esfuerzo',
          items: [
            'Reportes automáticos programados',
            'Exportación e informes a la medida',
            'Soporte a auditoría',
            'Alertas por desviación',
          ],
        },
        {
          titulo: 'Big data e ingeniería de datos',
          descripcion: 'El dato, ordenado',
          items: [
            'Centralización de fuentes',
            'Limpieza y normalización',
            'Histórico consultable',
            'Modelo de datos a la medida',
          ],
        },
        {
          titulo: 'Predicción e IA',
          descripcion: 'Anticipa lo que viene',
          items: [
            'Mantenimiento predictivo',
            'Detección de anomalías',
            'Proyección de demanda y consumo',
            'Soporte a la decisión',
          ],
        },
      ],
      proceso: [
        { titulo: 'Preguntas clave', texto: 'Definimos qué decisiones quieres tomar con los datos.' },
        { titulo: 'Centralización', texto: 'Reunimos y ordenamos las fuentes en un solo lugar.' },
        { titulo: 'Visualización', texto: 'Construimos los dashboards y KPIs que importan.' },
        { titulo: 'Predicción', texto: 'Sumamos modelos que anticipan fallas, demanda y anomalías.' },
      ],
      entregables: ['Dashboards', 'KPIs', 'Reportes', 'Mantenimiento predictivo', 'Big data', 'Modelos de IA'],
      beneficios: [
        { titulo: 'Decides con evidencia', texto: 'Datos claros en vez de intuición o planillas dispersas.' },
        { titulo: 'Ves a tiempo', texto: 'KPIs en vivo: reaccionas antes de que el problema crezca.' },
        { titulo: 'Anticipas', texto: 'La predicción te avisa de la falla antes de que ocurra.' },
        { titulo: 'Menos trabajo manual', texto: 'Reportes automáticos en vez de armar Excel cada semana.' },
      ],
      sectores: ['hidrocarburos-mineria-energia', 'manufactura', 'logistica-bodegas', 'agroindustria'],
    },
  },
];
