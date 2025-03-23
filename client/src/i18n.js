import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import english translation files
import appEN from "./locales/en/app.json";
import signupEn from "./locales/en/signup.json";
import homeVolunteerEn from "./locales/en/homeVolunteer.json";
// Import arabic translation files
import appAr from "./locales/ar/app.json";
import signupAR from "./locales/ar/signup.json";
import homeVolunteerAR from "./locales/ar/homeVolunteer.json";

// The translations
const resources = {
  en: {
    app: appEN,
    signUp: signupEn,
    homeVol:homeVolunteerEn,
  },
  ar: {
    app: appAr,
    signUp: signupAR,
    homeVol:homeVolunteerAR,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language

    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
