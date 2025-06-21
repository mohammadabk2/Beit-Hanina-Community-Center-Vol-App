import { useTranslation } from "react-i18next";

export const useInsuranceOptions = () => {
  const { t } = useTranslation("insurance");
  
  return [
    {
      label: t("clalit"),
      value: "clalit",
      href: "#cla",
      onClick: () => {
        console.log("Clalit clicked");
      },
    },
    {
      label: t("leumit"),
      value: "leumit",
      href: "#leu",
      onClick: () => {
        console.log("Leumit clicked");
      },
    },
    {
      label: t("maccabi"),
      value: "maccabi",
      href: "#mac",
      onClick: () => {
        console.log("Maccabi clicked");
      },
    },
    {
      label: t("meuhedet"),
      value: "meuhedet",
      href: "#meu",
      onClick: () => {
        console.log("Meuhedet clicked");
      },
    },
  ];
};