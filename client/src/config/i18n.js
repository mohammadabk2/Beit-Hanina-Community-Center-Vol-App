import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import english translation files
import appEN from "./locales/en/app.json";
import signupEN from "./locales/en/signup.json";
import homeVolunteerEN from "./locales/en/homeVolunteer.json";
import HomeOrganizerEn from "./locales/en/HomeOrganizer.json";
import HomeAdminEN from "./locales/en/HomeAdmin.json";
import aboutEn from "./locales/en/about.json";
import skillsEN from "./locales/en/skills.json";
import personalAreaVolunteerEN from "./locales/en/personalArea.json";
import navBarEN from "./locales/en/navBar.json";

// Import arabic translation files
import appAr from "./locales/ar/app.json";
import signupAR from "./locales/ar/signup.json";
import homeVolunteerAR from "./locales/ar/homeVolunteer.json";
import HomeOrganizerAR from "./locales/ar/HomeOrganizer.json";
import HomeAdminAR from "./locales/ar/HomeAdmin.json";
import aboutAR from "./locales/ar/about.json";
import skillsAR from "./locales/ar/skills.json";
import personalAreaVolunteerAR from "./locales/ar/personalArea.json";
import navBarAR from "./locales/ar/navBar.json";

// The translations
const resources = {
  en: {
    app: appEN,
    signUp: signupEN,
    skills: skillsEN,
    homeVol: homeVolunteerEN,
    homeOrg: HomeOrganizerEn,
    homeAdmin: HomeAdminEN,
    about: aboutEn,
    personal: personalAreaVolunteerEN,
    navBar: navBarEN,
  },
  ar: {
    app: appAr,
    signUp: signupAR,
    homeVol: homeVolunteerAR,
    homeOrg: HomeOrganizerAR,
    homeAdmin: HomeAdminAR,
    about: aboutAR,
    skills: skillsAR,
    personal: personalAreaVolunteerAR,
    navBar: navBarAR,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar", // Default language
    fallbackLng: "en", // Fallback language

    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
