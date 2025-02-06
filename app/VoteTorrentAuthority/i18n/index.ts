import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      elections: "Elections",
      authorities: "Authorities",
      signers: "Signers",
    },
  },
  es: {
    translation: {
      elections: "Elecciones",
      authorities: "Autoridades",
      signers: "Firmantes",
    },
  },
};

const deviceLanguage = Localization.getLocales()[0].languageCode ?? "en";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 