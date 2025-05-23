import { useTranslation } from "react-i18next";

export const useOccupationOptions = () => {
  const { t } = useTranslation("occupation");
  
  return [
    {
      label: t("university_student"),
      value: ("university"),
      href: "#university",
      onClick: () => {
        console.log("University student clicked");
      },
    },
    {
      label: t("school_student"),
      value: ("school"),
      href: "#school",
      onClick: () => {
        console.log("School student clicked");
      },
    },
    {
      label: t("craftsman"),
      value: ("craftsman"),
      href: "#craftsman",
      onClick: () => {
        console.log("Craftsman clicked");
      },
    },
  ];
};