import { basename, extname } from 'node:path';

type I18nMessages = Record<string, string>;
type I18nMessageModule = {
  default: I18nMessages;
};

const i18nModules = import.meta.glob<I18nMessageModule>('./i18n/*.json', {
  eager: true,
});

export function loadI18nMessages(): Record<string, I18nMessages> {
  return Object.fromEntries(
    Object.entries(i18nModules).map(([path, module]) => {
      const locale = basename(path, extname(path));
      return [locale, module.default];
    }),
  );
}
