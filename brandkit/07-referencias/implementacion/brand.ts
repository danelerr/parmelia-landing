const withoutTrailingSlash = (value: string) => value.replace(/\/+$/, '');

/** Public identity. API, developer dashboard and social account require configuration. */
export const brand = {
  name: 'GatoPago',
  mascot: 'Meli',
  tagline: {
    es: 'Tus dólares ya saben moverse.',
    en: 'Your dollars already know how to move.',
  },
  siteUrl: withoutTrailingSlash(import.meta.env.PUBLIC_SITE_URL || 'https://gatopago.com'),
  appUrl: withoutTrailingSlash(import.meta.env.PUBLIC_APP_URL || 'https://app.gatopago.com'),
  dashboardUrl: withoutTrailingSlash(import.meta.env.PUBLIC_DASHBOARD_URL || ''),
  apiUrl: withoutTrailingSlash(import.meta.env.PUBLIC_API_URL || ''),
  socialUrl: import.meta.env.PUBLIC_SOCIAL_URL || '',
  socialHandle: import.meta.env.PUBLIC_SOCIAL_HANDLE || '',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'hola@gatopago.com',
  privacyEmail: import.meta.env.PUBLIC_PRIVACY_EMAIL || 'privacy@gatopago.com',
} as const;

export const appLink = (ref: string) => {
  const url = new URL(brand.appUrl);
  url.searchParams.set('ref', ref);
  return url.href;
};

export const paymentLink = (slug: string) => `${brand.siteUrl}/p/${slug}`;
