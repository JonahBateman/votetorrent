import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization';
import { Platform } from "react-native";

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

//Checking for web, the check can be removed if not needed for development
//Just keep the Localization.getLocales()[0].languageCode ?? "en"
const deviceLanguage = Platform.select({
	native: () => Localization.getLocales()[0].languageCode ?? "en",
	default: () => "en",
})();

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 