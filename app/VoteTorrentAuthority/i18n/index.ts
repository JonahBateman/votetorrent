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
      settings: "Settings",
      account: "Account",
      appearance: "Appearance",
      language: "Language",
      about: "About",
      dark: "Dark",
      light: "Light",
      english: "English",
      recentNetworks: "Recent Networks",
      find: "Find",
      scanQrCode: "Scan QR Code",
      enterBootstrap: "Enter Bootstrap (advanced)",
      useLocation: "USE LOCATION",
      scan: "SCAN",
      useBootstrap: "USE BOOTSTRAP",
      enterLocationOrAddress: "Enter location or address...",
      enterBootstrapPlaceholder: "Enter bootstrap...",
      cameraPermissionMessage: "We need your permission to show the camera",
      grantPermission: "Grant Permission",
      close: "Close",
      addAuthority: "ADD AUTHORITY",
      noPinnedAuthorities: "No pinned authorities yet",
      noAuthoritiesFound: "No authorities found",
      filterAuthorities: "Filter authorities...",
    },
  },
  es: {
    translation: {
      elections: "Elecciones",
      authorities: "Autoridades",
      signers: "Firmantes",
      settings: "Ajustes",
      account: "Cuenta",
      appearance: "Apariencia",
      language: "Idioma",
      about: "Acerca de",
      dark: "Oscuro",
      light: "Claro",
      english: "Inglés",
      recentNetworks: "Redes Recientes",
      find: "Buscar",
      scanQrCode: "Escanear Código QR",
      enterBootstrap: "Ingresar Bootstrap (avanzado)",
      useLocation: "USAR UBICACIÓN",
      scan: "ESCANEAR",
      useBootstrap: "USAR BOOTSTRAP",
      enterLocationOrAddress: "Ingresar ubicación o dirección...",
      enterBootstrapPlaceholder: "Ingresar bootstrap...",
      cameraPermissionMessage: "Necesitamos tu permiso para mostrar la cámara",
      grantPermission: "Permitir",
      close: "Cerrar",
      addAuthority: "AGREGAR AUTORIDAD",
      noPinnedAuthorities: "No hay autoridades marcadas",
      noAuthoritiesFound: "No se encontraron autoridades",
      filterAuthorities: "Filtrar autoridades...",
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