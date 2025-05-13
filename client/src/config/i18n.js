import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import english translation files
import appEN from "./locales/en/app.json";
import signupEN from "./locales/en/signup.json";
import HomeEN from "./locales/en/home.json";
import aboutEn from "./locales/en/about.json";
import skillsEN from "./locales/en/skills.json";
import insuranceEN from "./locales/en/insurance.json";
import occupationEN from "./locales/en/occupation.json";
import personalAreaVolunteerEN from "./locales/en/personalArea.json";
import navBarEN from "./locales/en/navBar.json";
import copyRightEN from "./locales/en/copyright.json";

// Import arabic translation files
import appAr from "./locales/ar/app.json";
import signupAR from "./locales/ar/signup.json";
import HomeAR from "./locales/ar/home.json";
import aboutAR from "./locales/ar/about.json";
import skillsAR from "./locales/ar/skills.json";
import insuranceAR from "./locales/ar/insurance.json";
import occupationAR from "./locales/ar/occupation.json"
import personalAreaVolunteerAR from "./locales/ar/personalArea.json";
import navBarAR from "./locales/ar/navBar.json";
import copyRightAR from "./locales/ar/copyright.json";

// The translations
const resources = {
  en: {
    app: appEN,
    signUp: signupEN,
    skills: skillsEN,
    home: HomeEN,
    about: aboutEn,
    personal: personalAreaVolunteerEN,
    insurance: insuranceEN,
    occupation: occupationEN,
    navBar: navBarEN,
    copyRight: copyRightEN,
  },
  ar: {
    app: appAr,
    signUp: signupAR,
    home: HomeAR,
    about: aboutAR,
    skills: skillsAR,
    personal: personalAreaVolunteerAR,
    navBar: navBarAR,
    insurance: insuranceAR,
    occupation: occupationAR,
    copyRight: copyRightAR,
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

document.documentElement.setAttribute("lang", i18n.language);
// document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});
export default i18n;
