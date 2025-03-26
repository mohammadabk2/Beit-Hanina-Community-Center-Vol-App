import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import english translation files
import appEN from "./locales/en/app.json";
import signupEN from "./locales/en/signup.json";
import homeVolunteerEN from "./locales/en/homeVolunteer.json";
import aboutEn from "./locales/en/about.json";
import skillsEN from "./locales/en/skills.json";
import personalAreaVolunteerEN from "./locales/en/personalAreaVolunteer.json";

// Import arabic translation files
import appAr from "./locales/ar/app.json";
import signupAR from "./locales/ar/signup.json";
import homeVolunteerAR from "./locales/ar/homeVolunteer.json";
import aboutAR from "./locales/ar/about.json";
import skillsAR from "./locales/ar/skills.json";
import personalAreaVolunteerAR from "./locales/ar/personalAreaVolunteer.json";

// The translations
const resources = {
  en: {
    app: appEN,
    signUp: signupEN,
    skills: skillsEN,
    homeVol: homeVolunteerEN,
    about: aboutEn,
    personalVolunteer: personalAreaVolunteerEN,
  },
  ar: {
    app: appAr,
    signUp: signupAR,
    homeVol: homeVolunteerAR,
    about: aboutAR,
    skills: skillsAR,
    personalVolunteer: personalAreaVolunteerAR,
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
