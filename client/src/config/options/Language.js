import { useTranslation } from "react-i18next";

export const useLnOptions = () => {
  const { i18n } = useTranslation();
  return [
    {
      label: "ar",
      href: "#ar",
      onClick: () => {
        i18n.changeLanguage("ar");
        console.log("Language changed to Arabic");
      },
    },
    {
      label: "en",
      href: "#en",
      onClick: () => {
        i18n.changeLanguage("en");
        console.log("Language changed to English");
      },
    },
  ];
};
