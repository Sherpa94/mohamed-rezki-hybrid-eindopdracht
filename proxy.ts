import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * // LEARN: Proxy (formerly Middleware) is the traffic controller for your i18n setup.
 * It detects the user's browser language, looks for the locale in the URL,
 * and handles redirects (e.g., from / to /en).
 */
export const proxy = createMiddleware(routing);

export const config = {
  // LEARN: Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*']
};
