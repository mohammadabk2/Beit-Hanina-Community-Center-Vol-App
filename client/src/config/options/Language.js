import { useTranslation } from "react-i18next";

export const useLnOptions = () => {
  const { i18n } = useTranslation();
  return [
    {
      label: "ar",
      href: "#option1",
      onClick: () => {
        i18n.changeLanguage("ar");
        console.log("Language changed to Arabic");
      },
    },
    {
      label: "en",
      href: "#option2",
      onClick: () => {
        i18n.changeLanguage("en");
        console.log("Language changed to English");
      },
    },
  ];
};
