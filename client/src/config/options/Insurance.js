import { useTranslation } from "react-i18next";

export const useInsuranceOptions = () => {
  const { t } = useTranslation("insurance");
  
  return [
    {
      label: t("clalit"),
      value: t("clalit"),
      href: "#option1",
      onClick: () => {
        console.log("Clalit clicked");
      },
    },
    {
      label: t("leumit"),
      value: t("leumit"),
      href: "#option2",
      onClick: () => {
        console.log("Leumit clicked");
      },
    },
    {
      label: t("maccabi"),
      value: t("maccabi"),
      href: "#option3",
      onClick: () => {
        console.log("Maccabi clicked");
      },
    },
    {
      label: t("meuhedet"),
      value: t("meuhedet"),
      href: "#option4",
      onClick: () => {
        console.log("Meuhedet clicked");
      },
    },
  ];
};