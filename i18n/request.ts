import { getRequestConfig } from 'next-intl/server';

/**
 * // LEARN: This is the core configuration for next-intl in the App Router.
 * It dynamically loads the translation JSON files based on the 'locale'
 * segment of the URL.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure a valid locale is used; default to 'en'
  if (!locale) locale = 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
