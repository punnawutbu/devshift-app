import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'th',
    supportedLngs: ['en', 'th'], // 👈 เพิ่มบรรทัดนี้
    load: 'languageOnly', // 👈 ให้ใช้เฉพาะ en / th ไม่เอา en-US / th-TH
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
