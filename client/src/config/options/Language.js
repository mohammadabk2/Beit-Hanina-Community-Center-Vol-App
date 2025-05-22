import { useTranslation } from "react-i18next";

export const useLnOptions = () => {
  const { i18n } = useTranslation();
  return [
    {
      label: "العربية",
      href: "#ar",
      onClick: () => {
        i18n.changeLanguage("ar");
        console.log("Language changed to Arabic");
      },
    },
    {
      label: "English",
      href: "#en",
      onClick: () => {
        i18n.changeLanguage("en");
        console.log("Language changed to English");
      },
    },
  ];
};
