export const siteConfig = {
  name: 'AdariA Systems',
  url: 'https://adariasystems.com',
  locale: 'es_CO',
  language: 'es-CO',
  country: 'Colombia',
  regionLabel: 'Colombia y Latinoamérica',
  description:
    'Soluciones de Industria 4.0 con visión artificial, IoT/LoRa, software y hardware a la medida para convertir datos operativos en decisiones auditables.',
  defaultImage: '/og/og-default.jpg',
  defaultImageAlt: 'AdariA Systems, soluciones tecnológicas para la Industria 4.0',
  logo: '/icons/icon-512.png',
  themeColor: '#101418',
  whatsappNumber: '573138537266',
} as const;

// Datos no publicados o no confirmados por el propietario:
// email: [PENDIENTE_CORREO]
// address: [PENDIENTE_DIRECCION_FISICA]
// city: [PENDIENTE_CIUDAD]
// companySocialProfiles: [PENDIENTE_REDES_SOCIALES]

export function absoluteUrl(path: string, base = siteConfig.url): string {
  return new URL(path, base).toString();
}

export function canonicalPath(pathname: string): string {
  if (pathname === '/') return '/';
  return `${pathname.replace(/\/+$/, '')}/`;
}

export function metaDescription(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  const candidate = normalized.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(' ');
  return `${candidate.slice(0, lastSpace > 110 ? lastSpace : candidate.length).trim()}…`;
}
