// Sectores - ejes comerciales del sitio.
// La home usa el azul de marca; cada landing activa su color sectorial.

export interface SectorReto {
  titulo: string;
  texto: string;
}

export interface SectorSolucion {
  titulo: string;
  texto: string;
  items: string[];
}

export interface SectorProceso {
  titulo: string;
  texto: string;
}

export interface SectorResultado {
  titulo: string;
  texto: string;
}

export interface SectorDetalle {
  heroTitulo: string;
  intro: string;
  contexto: string;
  retosTitulo: string;
  retosIntro: string;
  retos: SectorReto[];
  solucionTitulo: string;
  solucionIntro: string;
  soluciones: SectorSolucion[];
  arquitecturaTitulo: string;
  arquitecturaIntro: string;
  arquitectura: SectorProceso[];
  entregables: string[];
  resultadosTitulo: string;
  resultados: SectorResultado[];
  cta: string;
}

export interface Sector {
  slug: string;
  nombre: string;
  /** Color solido del sector, usado solo en su landing. */
  color: string;
  /** Gancho corto para la tarjeta en la home. */
  gancho: string;
  /** Dolor concreto del cliente que resolvemos. */
  dolor: string;
  /** Productos/capacidades que lo resuelven. */
  resuelveCon: string;
  /** Sector prioritario de alto valor. */
  prioritario?: boolean;
  /** Imagen de la tarjeta y hero. Si hay video, actua como poster. */
  imagen?: string;
  /** Video de fondo de la tarjeta en home. */
  video?: string;
  /** Icono de trazo (viewBox 24x24) para estados sin imagen. */
  icon: string;
  detalle: SectorDetalle;
}

export const sectores: Sector[] = [
  {
    slug: 'hidrocarburos-mineria-energia',
    nombre: 'Hidrocarburos, Minería y Energía',
    color: '#f08c1d',
    gancho: 'Operaciones más seguras y auditables en entornos críticos.',
    dolor: 'Cada falla o accidente puede generar sobrecostos significativos y existe presión regulatoria en seguridad, ambiente y continuidad.',
    resuelveCon: 'Vision Seguridad + AdariA Sense + drones + mantenimiento predictivo',
    prioritario: true,
    imagen: '/sectores/hidrocarburos.jpg',
    video: '/sectores/hidrocarburos.mp4',
    icon: 'M12 2.69s-7 7.19-7 11.31a7 7 0 0 0 14 0c0-4.12-7-11.31-7-11.31Z',
    detalle: {
      heroTitulo: 'Seguridad, trazabilidad y continuidad para activos críticos.',
      intro:
        'Integramos visión artificial, IoT industrial, conectividad LoRa/LoRaWAN, drones y analítica predictiva para monitorear activos, personas y condiciones operativas en campo.',
      contexto:
        'En operaciones de hidrocarburos, minería y energía, una parada no planeada, una desviación de seguridad o una lectura incompleta puede afectar producción, cumplimiento y reputación. La solución debe resistir campo, conectividad limitada y exigencia regulatoria.',
      retosTitulo: 'Riesgos que deben verse antes de convertirse en incidente.',
      retosIntro:
        'El objetivo no es sumar pantallas, sino convertir la operación dispersa en evidencia accionable y auditable.',
      retos: [
        {
          titulo: 'Activos remotos sin visibilidad continua',
          texto: 'Bombas, tanques, subestaciones, válvulas y equipos críticos suelen operar lejos del centro de control o con conectividad irregular.',
        },
        {
          titulo: 'Condiciones de seguridad difíciles de auditar',
          texto: 'EPP, zonas restringidas, presencia humana y maniobras críticas requieren evidencia confiable, no solo reportes manuales.',
        },
        {
          titulo: 'Mantenimiento reactivo y alto costo de parada',
          texto: 'Cuando la falla se detecta tarde, la operación absorbe sobrecostos, desplazamientos urgentes y pérdida de disponibilidad.',
        },
      ],
      solucionTitulo: 'Una capa inteligente entre el campo y la decisión.',
      solucionIntro:
        'AdariA conecta dispositivos, cámaras y sistemas existentes para construir una lectura única de la operación, con alertas y trazabilidad de extremo a extremo.',
      soluciones: [
        {
          titulo: 'Monitoreo IoT de variables críticas',
          texto: 'Nodos de bajo consumo capturan presión, nivel, vibración, temperatura, energía, estado de válvulas y otras señales relevantes.',
          items: ['Conectividad LoRa/LoRaWAN para sitios remotos', 'Dispositivos edge diseñados a la medida', 'Alertas tempranas por umbral y tendencia'],
        },
        {
          titulo: 'Visión artificial para seguridad operacional',
          texto: 'Modelos de visión identifican uso de EPP, presencia en zonas restringidas, condiciones inseguras y eventos que requieren intervención.',
          items: ['Detección sobre cámaras existentes o nuevas', 'Evidencia visual para auditoría', 'Reglas configurables por área y turno'],
        },
        {
          titulo: 'Analítica predictiva y mantenimiento',
          texto: 'Los datos históricos y en tiempo real se convierten en señales de riesgo para anticipar fallas y priorizar intervención.',
          items: ['Tableros de disponibilidad y salud de activos', 'Integración con órdenes de mantenimiento', 'Trazabilidad de inspecciones y eventos'],
        },
      ],
      arquitecturaTitulo: 'Implementación preparada para campo.',
      arquitecturaIntro:
        'El despliegue se diseña según criticidad, conectividad y riesgos de la operación, con un piloto medible antes de escalar.',
      arquitectura: [
        { titulo: 'Levantamiento técnico', texto: 'Se identifican activos, zonas críticas, fuentes de datos, cámaras, protocolos y restricciones de conectividad.' },
        { titulo: 'Piloto instrumentado', texto: 'Se instala una primera capa de sensores, cámaras o integración edge en un punto de alto impacto operativo.' },
        { titulo: 'Integración y alertamiento', texto: 'Los eventos se conectan con tableros, ERP, SCADA, mantenimiento o canales operativos definidos por el cliente.' },
        { titulo: 'Escalamiento controlado', texto: 'La solución se replica por activos, frentes o sedes con métricas de disponibilidad, seguridad y cumplimiento.' },
      ],
      entregables: ['Mapa de activos críticos', 'Nodos IoT y gateways', 'Modelos de visión artificial', 'Tablero operativo', 'Alertas y evidencias auditables', 'Plan de escalamiento'],
      resultadosTitulo: 'Resultados esperados para la operación.',
      resultados: [
        { titulo: 'Menos paradas no planeadas', texto: 'La operación recibe señales tempranas para intervenir antes de la falla.' },
        { titulo: 'Mayor control de seguridad', texto: 'Los eventos críticos quedan registrados con evidencia y trazabilidad.' },
        { titulo: 'Dato único para decisión', texto: 'Campo, mantenimiento y gerencia trabajan sobre la misma información.' },
        { titulo: 'Auditoría más sólida', texto: 'Los reportes dejan de depender exclusivamente de registros manuales.' },
      ],
      cta: 'Conversemos sobre activos críticos, continuidad y seguridad operacional.',
    },
  },
  {
    slug: 'industria-carnica',
    nombre: 'Industria Cárnica',
    color: '#c0552f',
    gancho: 'Trazabilidad y transparencia, del corral al despacho.',
    dolor: 'Falta de trazabilidad, transparencia y control en la operación cárnica.',
    resuelveCon: 'Smart PBA + AdariA Vision + integración de datos',
    imagen: '/sectores/industria-carnica.webp',
    icon: 'M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82ZM7 7h.01',
    detalle: {
      heroTitulo: 'Trazabilidad completa para plantas cárnicas exigentes.',
      intro:
        'Digitalizamos el flujo operativo desde el ingreso del animal hasta despacho, con evidencia, pesajes, eventos de proceso y datos integrados para control sanitario, productivo y comercial.',
      contexto:
        'La industria cárnica requiere control documental, transparencia en el proceso, reducción de errores manuales y capacidad de responder con evidencia ante clientes, autoridades y auditorías internas.',
      retosTitulo: 'Donde el registro manual limita la operación.',
      retosIntro:
        'La trazabilidad debe ser continua, verificable y útil para tomar decisiones, no un archivo posterior al proceso.',
      retos: [
        {
          titulo: 'Información fragmentada entre áreas',
          texto: 'Ingreso, beneficio, pesaje, calidad, almacenamiento y despacho suelen registrar datos en sistemas o formatos distintos.',
        },
        {
          titulo: 'Poca evidencia visual del proceso',
          texto: 'Cuando no existe respaldo digital, las diferencias de peso, estado o lote se vuelven difíciles de auditar.',
        },
        {
          titulo: 'Conteos y controles operativos manuales',
          texto: 'El registro manual introduce demoras, reprocesos y riesgo de inconsistencias en momentos críticos.',
        },
      ],
      solucionTitulo: 'Del corral al despacho, con datos confiables.',
      solucionIntro:
        'Combinamos Smart PBA, visión artificial, integración con básculas y tableros de control para crear una línea de trazabilidad clara y auditable.',
      soluciones: [
        {
          titulo: 'Trazabilidad por lote y proceso',
          texto: 'Cada evento relevante se registra y queda asociado al flujo operativo correspondiente.',
          items: ['Ingreso y clasificación', 'Pesajes y movimientos', 'Estados de proceso y despacho'],
        },
        {
          titulo: 'Visión artificial aplicada al control',
          texto: 'Las cámaras pueden apoyar conteos, verificación de presencia, lectura de eventos y respaldo visual de operaciones.',
          items: ['Conteo y validación visual', 'Evidencia por punto crítico', 'Reducción de digitación manual'],
        },
        {
          titulo: 'Integración con básculas y sistemas',
          texto: 'El dato operativo se conecta con básculas, ERP, inventario o reportes existentes para evitar islas de información.',
          items: ['Captura automática de peso', 'Reportes de producción', 'Indicadores para gerencia y calidad'],
        },
      ],
      arquitecturaTitulo: 'Implementación ajustada al flujo real de planta.',
      arquitecturaIntro:
        'La solución se modela sobre el proceso existente para evitar fricción operativa y generar adopción desde el primer piloto.',
      arquitectura: [
        { titulo: 'Mapeo de flujo', texto: 'Se identifican puntos de captura, responsables, registros actuales, básculas y necesidades de auditoría.' },
        { titulo: 'Digitalización del punto crítico', texto: 'Se implementa primero el tramo de mayor impacto: ingreso, pesaje, proceso o despacho.' },
        { titulo: 'Integración operativa', texto: 'Los datos se conectan con equipos, cámaras y sistemas administrativos relevantes.' },
        { titulo: 'Tableros y reportes', texto: 'La información se entrega en vistas para operación, calidad, gerencia y auditoría.' },
      ],
      entregables: ['Modelo de trazabilidad', 'Integración con básculas', 'Captura visual de evidencia', 'Tablero Smart PBA', 'Reportes auditables', 'Plan de adopción en planta'],
      resultadosTitulo: 'Resultados esperados para plantas cárnicas.',
      resultados: [
        { titulo: 'Trazabilidad verificable', texto: 'Cada etapa crítica cuenta con registro y evidencia asociada.' },
        { titulo: 'Menos reprocesos administrativos', texto: 'La captura automática reduce digitación y conciliaciones manuales.' },
        { titulo: 'Mayor transparencia comercial', texto: 'Los datos respaldan diferencias, pesos, lotes y tiempos de proceso.' },
        { titulo: 'Control operativo en tiempo real', texto: 'La planta deja de esperar reportes tardíos para actuar.' },
      ],
      cta: 'Conversemos sobre trazabilidad, control de planta y evidencia auditable.',
    },
  },
  {
    slug: 'manufactura',
    nombre: 'Manufactura',
    color: '#4a7fb5',
    gancho: 'Calidad consistente y menos paradas no planeadas.',
    dolor: 'Defectos que escapan la inspección manual y paradas de máquina costosas.',
    resuelveCon: 'Vision Calidad + AdariA Sense + IoT',
    imagen: '/sectores/manufactura.webp',
    icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
    detalle: {
      heroTitulo: 'Calidad industrial con visión, sensores y datos de proceso.',
      intro:
        'Implementamos inspección visual automatizada, monitoreo de variables críticas, integración con PLC y analítica para reducir defectos, paradas y pérdidas de productividad.',
      contexto:
        'La manufactura moderna necesita consistencia, trazabilidad y respuesta rápida. La inspección manual no siempre escala al ritmo de la línea, y los datos de máquina suelen quedar aislados del análisis operativo.',
      retosTitulo: 'Lo que afecta calidad y disponibilidad.',
      retosIntro:
        'La mejora productiva comienza cuando las señales de calidad, máquina y operación se leen en conjunto.',
      retos: [
        {
          titulo: 'Defectos detectados tarde',
          texto: 'Los problemas de ensamblaje, presencia, orientación, empaque o acabado pueden avanzar hasta etapas costosas del proceso.',
        },
        {
          titulo: 'Paradas sin diagnóstico claro',
          texto: 'Cuando las señales de máquina no se registran con contexto, la causa raíz queda sujeta a interpretación.',
        },
        {
          titulo: 'Indicadores desconectados del piso de planta',
          texto: 'La gerencia recibe reportes, pero no siempre cuenta con datos vivos para intervenir durante el turno.',
        },
      ],
      solucionTitulo: 'Una línea más visible, medible y controlada.',
      solucionIntro:
        'AdariA combina visión artificial, sensórica, edge computing e integración para llevar la información de la línea a decisiones operativas.',
      soluciones: [
        {
          titulo: 'Inspección visual automatizada',
          texto: 'Modelos de visión detectan defectos, ausencia de componentes, errores de ensamble, lectura de códigos y condiciones fuera de estándar.',
          items: ['Inspección en línea o por estación', 'Registro de evidencia por lote', 'Alertas por desviación de calidad'],
        },
        {
          titulo: 'Monitoreo de condición de máquina',
          texto: 'Sensores y datos de PLC permiten vigilar variables que anticipan paradas o pérdida de eficiencia.',
          items: ['Vibración, temperatura, corriente y ciclos', 'Tendencias de salud de activos', 'Integración con mantenimiento'],
        },
        {
          titulo: 'Analítica operativa',
          texto: 'La información de calidad, producción y mantenimiento se consolida para detectar patrones y priorizar decisiones.',
          items: ['Tableros por línea y turno', 'Indicadores de rechazo y disponibilidad', 'Datos trazables para mejora continua'],
        },
      ],
      arquitecturaTitulo: 'De la estación crítica al escalamiento de línea.',
      arquitecturaIntro:
        'La implementación inicia donde la pérdida es más visible y escala con evidencia técnica y retorno operativo.',
      arquitectura: [
        { titulo: 'Selección de caso crítico', texto: 'Se prioriza una estación, defecto, activo o variable donde el impacto sea medible.' },
        { titulo: 'Captura e inferencia edge', texto: 'Se instalan cámaras, sensores o conexión PLC con procesamiento cercano a la línea.' },
        { titulo: 'Validación con datos reales', texto: 'Se ajustan reglas, modelos y umbrales con condiciones reales de producción.' },
        { titulo: 'Integración industrial', texto: 'La solución se conecta con tableros, ERP, MES, mantenimiento o señales de control.' },
      ],
      entregables: ['Modelo de visión artificial', 'Sensórica de condición', 'Integración PLC/ERP/MES', 'Tablero por línea', 'Registro de evidencia', 'Matriz de escalamiento'],
      resultadosTitulo: 'Resultados esperados en manufactura.',
      resultados: [
        { titulo: 'Calidad más consistente', texto: 'La inspección automatizada reduce variabilidad y dependencia del criterio manual.' },
        { titulo: 'Menor costo de rechazo', texto: 'Los defectos se detectan antes de avanzar en la cadena de valor.' },
        { titulo: 'Mayor disponibilidad', texto: 'Las señales de condición ayudan a anticipar fallas y paradas.' },
        { titulo: 'Mejora continua con datos', texto: 'Las decisiones se soportan en evidencia de línea, no en percepciones.' },
      ],
      cta: 'Conversemos sobre calidad, disponibilidad y datos de planta.',
    },
  },
  {
    slug: 'logistica-bodegas',
    nombre: 'Logística y Bodegas',
    color: '#1ba89a',
    gancho: 'Flujo controlado y trazable en cada movimiento.',
    dolor: 'Conteos manuales lentos, errores de inventario y poca visibilidad del flujo.',
    resuelveCon: 'Vision Logística + integración + analítica',
    imagen: '/sectores/logistica-bodegas.webp',
    icon: 'M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12',
    detalle: {
      heroTitulo: 'Inventario, flujo y trazabilidad bajo control.',
      intro:
        'Aplicamos visión artificial, integración con sistemas logísticos, sensórica e indicadores operativos para controlar inventario, movimientos, ocupación y despacho con menos fricción manual.',
      contexto:
        'En bodegas y centros de distribución, cada diferencia de inventario, conteo tardío o movimiento no registrado impacta promesas de entrega, costos y nivel de servicio.',
      retosTitulo: 'El costo de no ver el movimiento completo.',
      retosIntro:
        'La logística necesita datos oportunos sobre qué se mueve, cuándo se mueve, dónde está y en qué condición llega.',
      retos: [
        {
          titulo: 'Conteos manuales y conciliaciones lentas',
          texto: 'Los inventarios físicos consumen tiempo y no siempre reflejan la realidad operativa del momento.',
        },
        {
          titulo: 'Movimientos sin trazabilidad suficiente',
          texto: 'Entradas, salidas, picking, patios y zonas de staging pueden perder visibilidad cuando dependen de registros manuales.',
        },
        {
          titulo: 'Poca lectura de capacidad y congestión',
          texto: 'Sin datos de flujo, la operación reacciona tarde a cuellos de botella, errores de ubicación y sobreocupación.',
        },
      ],
      solucionTitulo: 'Visibilidad continua del flujo logístico.',
      solucionIntro:
        'AdariA convierte cámaras, sensores y sistemas existentes en una capa de control que ayuda a reducir diferencias y acelerar decisiones.',
      soluciones: [
        {
          titulo: 'Visión artificial para conteo y flujo',
          texto: 'Cámaras y modelos de visión identifican pallets, cajas, movimientos, ocupación de zonas y eventos relevantes.',
          items: ['Conteo asistido por imagen', 'Registro visual de entradas y salidas', 'Detección de congestión o zonas ocupadas'],
        },
        {
          titulo: 'Integración con WMS, ERP y dispositivos',
          texto: 'Los eventos logísticos se conectan con sistemas existentes para reducir doble digitación y mejorar trazabilidad.',
          items: ['Sincronización con inventario', 'Lectura desde básculas, RFID o códigos', 'Alertas por diferencia o excepción'],
        },
        {
          titulo: 'Analítica de operación logística',
          texto: 'Los datos se transforman en indicadores de exactitud, tiempos, ocupación y cumplimiento.',
          items: ['Tablero de flujo y productividad', 'Trazabilidad por zona y turno', 'Indicadores para mejora de servicio'],
        },
      ],
      arquitecturaTitulo: 'Implementación por flujos y zonas críticas.',
      arquitecturaIntro:
        'La solución se despliega por etapa logística para medir impacto sin detener la operación.',
      arquitectura: [
        { titulo: 'Diagnóstico de flujo', texto: 'Se mapean entradas, salidas, zonas críticas, sistemas actuales y puntos de captura disponibles.' },
        { titulo: 'Instrumentación de zona', texto: 'Se instalan o reutilizan cámaras, lectores, sensores o integraciones según el caso de uso.' },
        { titulo: 'Validación operativa', texto: 'Se comparan eventos capturados con registros actuales para ajustar precisión y reglas.' },
        { titulo: 'Escala por operación', texto: 'La solución se extiende a más zonas, sedes o procesos logísticos con un modelo probado.' },
      ],
      entregables: ['Mapa de flujo logístico', 'Modelos de conteo y detección', 'Integración WMS/ERP', 'Tablero de operación', 'Alertas por excepción', 'Reporte de exactitud'],
      resultadosTitulo: 'Resultados esperados en logística.',
      resultados: [
        { titulo: 'Inventario más confiable', texto: 'La operación reduce diferencias entre sistema y realidad física.' },
        { titulo: 'Menos registro manual', texto: 'Los eventos relevantes se capturan con mayor automatización.' },
        { titulo: 'Mejor uso de capacidad', texto: 'Las zonas críticas se monitorean con señales de ocupación y flujo.' },
        { titulo: 'Trazabilidad de movimientos', texto: 'La evidencia facilita auditoría, reclamos y análisis de causa.' },
      ],
      cta: 'Conversemos sobre inventario, flujo y trazabilidad logística.',
    },
  },
  {
    slug: 'agroindustria',
    nombre: 'Agroindustria',
    color: '#5c9a35',
    gancho: 'Decisiones de campo basadas en datos, no en estimaciones.',
    dolor: 'Conteo y grading manual de cultivos; baja visibilidad de grandes extensiones.',
    resuelveCon: 'AdariA Vision + drones + IoT',
    imagen: '/sectores/agroindustria.webp',
    icon: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10ZM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
    detalle: {
      heroTitulo: 'Campo conectado para decidir con evidencia.',
      intro:
        'Combinamos visión artificial, drones, sensores IoT, conectividad de largo alcance y analítica para monitorear cultivos, infraestructura y variables críticas de producción.',
      contexto:
        'La agroindustria opera sobre grandes extensiones, ventanas de tiempo exigentes y alta variabilidad ambiental. Decidir tarde o con estimaciones puede afectar productividad, calidad y costos de operación.',
      retosTitulo: 'Cuando el campo se mide tarde, se decide tarde.',
      retosIntro:
        'El valor está en capturar señales útiles antes de que la condición del cultivo, el clima o el activo se conviertan en pérdida.',
      retos: [
        {
          titulo: 'Baja visibilidad de grandes extensiones',
          texto: 'Recorridos manuales y reportes tardíos dificultan detectar cambios de condición en el momento oportuno.',
        },
        {
          titulo: 'Conteo y clasificación con alta variabilidad',
          texto: 'La estimación manual de frutos, plantas, lotes o calidad puede afectar planeación, compras y despacho.',
        },
        {
          titulo: 'Infraestructura remota sin monitoreo',
          texto: 'Bombas, tanques, riego, energía y estaciones de campo requieren lectura continua incluso con conectividad limitada.',
        },
      ],
      solucionTitulo: 'Datos de campo listos para actuar.',
      solucionIntro:
        'AdariA diseña una capa de captura y analítica para convertir imágenes, sensores y operación de campo en indicadores concretos.',
      soluciones: [
        {
          titulo: 'Visión artificial y drones',
          texto: 'Imágenes de campo se analizan para conteo, clasificación, detección de anomalías, avance de cultivo o inspección de infraestructura.',
          items: ['Conteo y grading asistido por IA', 'Inspección aérea de lotes', 'Evidencia georreferenciada'],
        },
        {
          titulo: 'Sensórica IoT para variables críticas',
          texto: 'Nodos de bajo consumo permiten monitorear humedad, temperatura, energía, nivel, presión u otras variables del proceso.',
          items: ['Conectividad de largo alcance', 'Alertas por condición crítica', 'Monitoreo de riego e infraestructura'],
        },
        {
          titulo: 'Analítica para planeación operativa',
          texto: 'Los datos se consolidan para apoyar cosecha, mantenimiento, uso de recursos y seguimiento por lote o zona.',
          items: ['Tableros por finca, lote o activo', 'Tendencias y comparativos', 'Reportes para operación y gerencia'],
        },
      ],
      arquitecturaTitulo: 'Implementación por lote, variable o activo.',
      arquitecturaIntro:
        'El despliegue inicia con un caso de uso acotado y medible, después se replica por cultivo, finca o infraestructura.',
      arquitectura: [
        { titulo: 'Priorización del caso', texto: 'Se define si el mayor impacto está en conteo, calidad, riego, infraestructura o monitoreo ambiental.' },
        { titulo: 'Captura de campo', texto: 'Se utilizan drones, cámaras, sensores o dispositivos edge según la variable y el terreno.' },
        { titulo: 'Modelo y tablero', texto: 'La información se procesa para entregar indicadores claros por zona, lote, activo o fecha.' },
        { titulo: 'Escalamiento territorial', texto: 'La solución se replica con criterios de conectividad, mantenimiento y adopción operativa.' },
      ],
      entregables: ['Mapa de variables críticas', 'Captura con drones o cámaras', 'Nodos IoT', 'Modelos de visión', 'Tablero por lote o activo', 'Alertas operativas'],
      resultadosTitulo: 'Resultados esperados en agroindustria.',
      resultados: [
        { titulo: 'Decisiones con mejor oportunidad', texto: 'La operación identifica condiciones relevantes antes de que se conviertan en pérdida.' },
        { titulo: 'Planeación más precisa', texto: 'El conteo, la clasificación y el seguimiento por lote mejoran la estimación operativa.' },
        { titulo: 'Menos desplazamientos innecesarios', texto: 'El monitoreo remoto reduce visitas reactivas y prioriza intervenciones.' },
        { titulo: 'Trazabilidad del campo', texto: 'Las evidencias y mediciones quedan disponibles para seguimiento técnico y gerencial.' },
      ],
      cta: 'Conversemos sobre monitoreo de campo, conteo inteligente y activos remotos.',
    },
  },
];
