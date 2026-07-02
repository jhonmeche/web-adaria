// Sectores — ejes comerciales del sitio (§5 del brief).
// Cada uno tendrá su landing en /soluciones/[slug]. En la HOME solo se usa el
// azul de marca; el `color` sectorial se reserva para la landing (Opción C §13).

export interface Sector {
  slug: string;
  nombre: string;
  /** Color sólido del sector (se usa solo en su propia landing). */
  color: string;
  /** Gancho corto para la tarjeta en la home. */
  gancho: string;
  /** Dolor concreto del cliente que resolvemos. */
  dolor: string;
  /** Productos/capacidades que lo resuelven. */
  resuelveCon: string;
  /** ¿Sector prioritario de alto valor? */
  prioritario?: boolean;
  /** Imagen de la tarjeta (ruta en /public, p. ej. /sectores/mineria.jpg).
   *  Si hay `video`, esta imagen actúa además como poster/respaldo. */
  imagen?: string;
  /** Video de fondo de la tarjeta (ruta en /public, p. ej. /sectores/mineria.mp4).
   *  Se reproduce en bucle, silenciado. Usa clips cortos y livianos (.mp4/.webm). */
  video?: string;
  /** Ícono de trazo (viewBox 24x24) que se muestra cuando aún no hay `imagen`/`video`
   *  reales para el sector — evita repetir el mismo ícono genérico en las 4 tarjetas
   *  que aún no tienen media propia. */
  icon: string;
}

export const sectores: Sector[] = [
  {
    slug: 'hidrocarburos-mineria-energia',
    nombre: 'Hidrocarburos, Minería y Energía',
    color: '#f08c1d',
    gancho: 'Operaciones más seguras y auditables en entornos críticos.',
    dolor: 'Cada falla o accidente puede generar sobrecostos significativos y hay presión regulatoria (SST, ambiental).',
    resuelveCon: 'Vision Seguridad + AdariA Sense (IoT/LoRa) + drones + mantenimiento predictivo',
    prioritario: true,
    imagen: '/sectores/hidrocarburos.jpg',
    video: '/sectores/hidrocarburos.mp4',
    icon: 'M12 2.69s-7 7.19-7 11.31a7 7 0 0 0 14 0c0-4.12-7-11.31-7-11.31Z',
  },
  {
    slug: 'industria-carnica',
    nombre: 'Industria Cárnica',
    color: '#c0552f',
    gancho: 'Trazabilidad y transparencia, del corral al despacho.',
    dolor: 'Falta de trazabilidad, transparencia y control en la operación cárnica.',
    resuelveCon: 'Smart PBA + AdariA Vision (conteo y peso por imagen)',
    icon: 'M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82ZM7 7h.01',
  },
  {
    slug: 'manufactura',
    nombre: 'Manufactura',
    color: '#4a7fb5',
    gancho: 'Calidad consistente y menos paradas no planeadas.',
    dolor: 'Defectos que escapan la inspección manual y paradas de máquina costosas.',
    resuelveCon: 'Vision Calidad + AdariA Sense + IoT',
    icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
  },
  {
    slug: 'logistica-bodegas',
    nombre: 'Logística y Bodegas',
    color: '#1ba89a',
    gancho: 'Flujo controlado y trazable en cada movimiento.',
    dolor: 'Conteos manuales lentos, errores de inventario y poca visibilidad del flujo.',
    resuelveCon: 'Vision Logística + integración + analítica',
    icon: 'M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12',
  },
  {
    slug: 'agroindustria',
    nombre: 'Agroindustria',
    color: '#5c9a35',
    gancho: 'Decisiones de campo basadas en datos, no en estimaciones.',
    dolor: 'Conteo y grading manual de cultivos; baja visibilidad de grandes extensiones.',
    resuelveCon: 'AdariA Vision (conteo, grading) + drones + IoT',
    icon: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10ZM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
  },
];
