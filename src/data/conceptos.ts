// Glosario tecnológico — contextualiza a visitantes no técnicos sobre los
// términos que aparecen en el sitio (Industria 4.0, visión artificial, LoRa…).
// Lenguaje sencillo, español neutro-colombiano, frases cortas (§12).

export interface Concepto {
  termino: string;
  definicion: string;
  /** Dónde/para qué lo usa AdariA (opcional). */
  enAdaria?: string;
}

export interface GrupoConceptos {
  /** Ancla para el índice. */
  id: string;
  titulo: string;
  intro: string;
  /** Path SVG del ícono del grupo (viewBox 0 0 24 24, trazo). */
  icon: string;
  conceptos: Concepto[];
}

export const grupos: GrupoConceptos[] = [
  {
    id: 'industria-40',
    titulo: 'Industria 4.0, el marco',
    intro: 'La idea que conecta todo lo demás: operaciones que generan datos y deciden mejor.',
    icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9h.01M9 13h.01M9 17h.01',
    conceptos: [
      {
        termino: 'Industria 4.0',
        definicion:
          'La cuarta revolución industrial: conectar máquinas, sensores y software para que la operación genere datos en tiempo real y se tomen mejores decisiones. En vez de operar "a ciegas", la planta se vuelve inteligente, automatizada y medible.',
      },
      {
        termino: 'Internet de las cosas (IoT)',
        definicion:
          'Equipos y objetos (máquinas, sensores, tableros) conectados a internet que envían y reciben datos. Permite saber qué pasa en un equipo sin estar físicamente frente a él.',
      },
      {
        termino: 'Procesamiento en el borde (edge)',
        definicion:
          'Procesar los datos cerca de donde se generan —en el propio equipo o planta— en lugar de mandarlos todos a la nube. Es más rápido, funciona sin buena conexión y reduce costos.',
      },
      {
        termino: 'Gemelo digital',
        definicion:
          'Una réplica virtual de un equipo o proceso que se actualiza con datos reales, para simular, monitorear y anticipar sin tocar el equipo físico.',
      },
      {
        termino: 'Trazabilidad',
        definicion:
          'Poder seguir el recorrido completo de un producto o proceso, paso a paso, con registro de cada etapa. Si algo ocurre, se sabe dónde, cuándo y cómo.',
        enAdaria: 'Es el corazón de Smart PBA.',
      },
      {
        termino: 'Dato auditable',
        definicion:
          'Información registrada de forma que cualquiera pueda verificarla después: con respaldo y sin ediciones ocultas. Da confianza y soporta informes.',
      },
    ],
  },
  {
    id: 'vision-ia',
    titulo: 'Visión artificial e IA',
    intro: 'Cómo logramos que un computador "vea" y entienda lo que pasa en una cámara.',
    icon: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    conceptos: [
      {
        termino: 'Inteligencia artificial (IA)',
        definicion:
          'Software que aprende de ejemplos para reconocer patrones y tomar decisiones, en lugar de seguir solo reglas fijas. Mejora a medida que recibe más datos.',
      },
      {
        termino: 'Visión artificial',
        definicion:
          'IA aplicada a imágenes y video: que un computador "vea" y entienda lo que hay en una cámara —personas, objetos, defectos, placas— y actúe en consecuencia.',
        enAdaria: 'Es la base de AdariA Vision.',
      },
      {
        termino: 'Modelo entrenado a la medida',
        definicion:
          'El "cerebro" de la IA, ajustado con ejemplos de tu operación. No es genérico: aprende tus EPP, tus productos y tu contexto, por eso acierta más y se equivoca menos.',
      },
      {
        termino: 'CCTV/IP y RTSP',
        definicion:
          'CCTV/IP son tus cámaras de seguridad actuales; RTSP es el "idioma" estándar para conectarse a ellas. Por eso podemos usar las cámaras que ya tienes, sin comprar hardware nuevo.',
      },
      {
        termino: 'OCR',
        definicion:
          'Reconocimiento de texto dentro de una imagen: leer fechas, lotes o seriales impresos en un producto, de forma automática.',
      },
      {
        termino: 'LPR (lectura de placas)',
        definicion:
          'Lectura automática de las placas de los vehículos a partir de la cámara. Útil para control de acceso y logística.',
      },
      {
        termino: 'Detección de objetos',
        definicion:
          'Ubicar y marcar (con un recuadro) cada objeto o persona en la imagen, no solo saber si aparece. Es la base del conteo, la verificación de EPP o las zonas restringidas.',
      },
      {
        termino: 'Inferencia en tiempo real',
        definicion:
          'Cuando el modelo ya entrenado analiza el video en vivo y entrega resultados al instante, sin intervención humana.',
      },
      {
        termino: 'Grading',
        definicion:
          'Clasificar automáticamente por calidad, tamaño o tipo —por ejemplo, fruta por categoría— usando visión artificial.',
      },
    ],
  },
  {
    id: 'iot-lora',
    titulo: 'Conectividad e IoT industrial',
    intro: 'Cómo medimos equipos remotos y llevamos el dato hasta donde haga falta.',
    icon: 'M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0M12 20h.01',
    conceptos: [
      {
        termino: 'Sensor',
        definicion:
          'Dispositivo que mide una variable física —temperatura, presión, vibración, gas, nivel, caudal— y la convierte en un dato.',
      },
      {
        termino: 'LoRa / LoRaWAN',
        definicion:
          'Tecnología de comunicación inalámbrica de largo alcance y bajísimo consumo. Ideal para sitios remotos: cubre kilómetros y los sensores duran años con una sola batería.',
        enAdaria: 'Es la conectividad de AdariA Sense.',
      },
      {
        termino: 'Gateway',
        definicion:
          'El punto que recibe los datos de muchos sensores y los envía a la plataforma. Funciona como una "antena" central que junta todo.',
      },
      {
        termino: 'Nodo',
        definicion:
          'Cada dispositivo con sensores que se instala en campo y reporta sus mediciones.',
      },
      {
        termino: 'Telemetría',
        definicion:
          'La medición y el envío automático de datos a distancia. Saber el estado de un equipo remoto sin tener que ir hasta él.',
      },
      {
        termino: 'Mantenimiento predictivo',
        definicion:
          'Anticipar las fallas analizando los datos del equipo, para mantener ANTES de que se dañe. Evita paradas sorpresa y costos altos.',
        enAdaria: 'Lo hace AdariA Sense.',
      },
    ],
  },
  {
    id: 'datos-decision',
    titulo: 'Datos y decisión',
    intro: 'Lo que convierte la información en algo accionable para tu equipo.',
    icon: 'M3 3v18h18M7 14l3-3 3 3 5-6',
    conceptos: [
      {
        termino: 'Dashboard (tablero)',
        definicion:
          'Pantalla que muestra los datos importantes de un vistazo: indicadores, gráficas y alertas, en tiempo real.',
      },
      {
        termino: 'KPI',
        definicion:
          'Indicador clave de desempeño: una cifra que mide si la operación va bien (producción, calidad, paradas, etc.).',
      },
      {
        termino: 'Analítica y big data',
        definicion:
          'Procesar grandes cantidades de datos para encontrar patrones, explicar lo que pasa y predecir lo que viene.',
      },
      {
        termino: 'Alertas',
        definicion:
          'Avisos automáticos cuando un dato cruza un límite —por ejemplo, gas alto o temperatura crítica— para reaccionar a tiempo.',
      },
      {
        termino: 'SCADA y PLC',
        definicion:
          'Sistemas que controlan la maquinaria industrial. Nos integramos con ellos para leer y unificar la información de la planta.',
      },
      {
        termino: 'Reporte e informe',
        definicion:
          'El resumen de los datos en un documento descargable (PDF, Excel) para auditar, compartir o cumplir la normativa.',
      },
    ],
  },
  {
    id: 'hardware-seguridad',
    titulo: 'Hardware y seguridad',
    intro: 'Los dispositivos que diseñamos y los conceptos de seguridad que cuidamos.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7Zm3 3h4v4h-4v-4Z',
    conceptos: [
      {
        termino: 'Diseño de hardware (electrónica)',
        definicion:
          'Crear los dispositivos físicos —tarjetas, sensores, gateways— a la medida de la necesidad, en vez de depender solo de equipos genéricos.',
        enAdaria: 'AdariA diseña su propio hardware.',
      },
      {
        termino: 'Dispositivo edge',
        definicion:
          'Un pequeño computador en campo que procesa los datos localmente (ver "procesamiento en el borde") antes de enviarlos.',
      },
      {
        termino: 'Tarjeta electrónica (PCB)',
        definicion:
          'La placa donde se montan los chips y componentes de un dispositivo. AdariA las diseña a la medida de cada solución.',
        enAdaria: 'Diseño electrónico propio.',
      },
      {
        termino: 'Protocolos de comunicación',
        definicion:
          'El "idioma" estándar con que equipos y sistemas se entienden: MQTT, Modbus, OPC-UA, RTSP. Son los que permiten integrarlo todo.',
      },
      {
        termino: 'EPP',
        definicion:
          'Equipo de protección personal: casco, chaleco, gafas, guantes. La visión artificial puede verificar que se use, para prevenir accidentes.',
      },
      {
        termino: 'HSE',
        definicion:
          'Salud, seguridad y medio ambiente (por sus siglas en inglés). El área que cuida que la operación sea segura y cumpla la normativa.',
      },
    ],
  },
];
