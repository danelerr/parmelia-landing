const withoutTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const legacy = {
  siteUrl: 'https://parmelia.me',
  appUrl: 'https://app.parmelia.me',
  dashboardUrl: 'https://dashboard.parmelia.me',
  apiUrl: 'https://server.parmelia.workers.dev',
  socialUrl: 'https://x.com/parmelia_',
  contactEmail: 'hola@parmelia.me',
  privacyEmail: 'privacy@parmelia.me',
} as const;

/**
 * Public GatoPago identity and migration-safe operational endpoints.
 *
 * The current legacy domains remain only as fallbacks until the new domains,
 * inboxes, and social handle exist. Setting the PUBLIC_* variables completes
 * the cutover without another component-by-component edit.
 */
export const brand = {
  name: 'GatoPago',
  mascot: 'Meli',
  tagline: {
    es: 'Tus dólares ya saben moverse.',
    en: 'Your dollars already know how to move.',
  },
  siteUrl: withoutTrailingSlash(import.meta.env.PUBLIC_SITE_URL || legacy.siteUrl),
  appUrl: withoutTrailingSlash(import.meta.env.PUBLIC_APP_URL || legacy.appUrl),
  dashboardUrl: withoutTrailingSlash(import.meta.env.PUBLIC_DASHBOARD_URL || legacy.dashboardUrl),
  apiUrl: withoutTrailingSlash(import.meta.env.PUBLIC_API_URL || legacy.apiUrl),
  socialUrl: import.meta.env.PUBLIC_SOCIAL_URL || legacy.socialUrl,
  socialHandle: import.meta.env.PUBLIC_SOCIAL_HANDLE || '',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || legacy.contactEmail,
  privacyEmail: import.meta.env.PUBLIC_PRIVACY_EMAIL || legacy.privacyEmail,
} as const;

export const appLink = (ref: string) => {
  const url = new URL(brand.appUrl);
  url.searchParams.set('ref', ref);
  return url.href;
};

export const paymentLink = (slug: string) => `${brand.siteUrl}/p/${slug}`;
