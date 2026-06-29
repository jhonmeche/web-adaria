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
}

export const sectores: Sector[] = [
  {
    slug: 'hidrocarburos-mineria-energia',
    nombre: 'Hidrocarburos, Minería y Energía',
    color: '#f08c1d',
    gancho: 'Operaciones más seguras y auditables en entornos críticos.',
    dolor: 'Cada falla o accidente cuesta millones y hay presión regulatoria (SST, ambiental).',
    resuelveCon: 'Vision Seguridad + AdariA Sense (IoT/LoRa) + drones + mantenimiento predictivo',
    prioritario: true,
    imagen: '/sectores/hidrocarburos.jpg',
    video: '/sectores/hidrocarburos.mp4',
  },
  {
    slug: 'industria-carnica',
    nombre: 'Industria Cárnica',
    color: '#c0552f',
    gancho: 'Trazabilidad y transparencia, del corral al despacho.',
    dolor: 'Falta de trazabilidad, transparencia y control en la operación cárnica.',
    resuelveCon: 'Smart PBA + AdariA Vision (conteo y peso por imagen)',
  },
  {
    slug: 'manufactura',
    nombre: 'Manufactura',
    color: '#4a7fb5',
    gancho: 'Calidad consistente y menos paradas no planeadas.',
    dolor: 'Defectos que escapan la inspección manual y paradas de máquina costosas.',
    resuelveCon: 'Vision Calidad + AdariA Sense + IoT',
  },
  {
    slug: 'logistica-bodegas',
    nombre: 'Logística y Bodegas',
    color: '#1ba89a',
    gancho: 'Flujo controlado y trazable en cada movimiento.',
    dolor: 'Conteos manuales lentos, errores de inventario y poca visibilidad del flujo.',
    resuelveCon: 'Vision Logística + integración + analítica',
  },
  {
    slug: 'agroindustria',
    nombre: 'Agroindustria',
    color: '#5c9a35',
    gancho: 'Decisiones de campo basadas en datos, no en estimaciones.',
    dolor: 'Conteo y grading manual de cultivos; baja visibilidad de grandes extensiones.',
    resuelveCon: 'AdariA Vision (conteo, grading) + drones + IoT',
  },
];
