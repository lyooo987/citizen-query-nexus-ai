
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';

const resources = {
  fr: {
    translation: frTranslations
  },
  ar: {
    translation: arTranslations
  },
  en: {
    translation: enTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
