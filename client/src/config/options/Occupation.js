import { useTranslation } from "react-i18next";

export const useOccupationOptions = () => {
  const { t } = useTranslation("occupation");
  
  return [
    {
      label: t("university_student"),
      value: t("university_student"),
      href: "#university",
      onClick: () => {
        console.log("University student clicked");
      },
    },
    {
      label: t("school_student"),
      value: t("school_student"),
      href: "#school",
      onClick: () => {
        console.log("School student clicked");
      },
    },
    {
      label: t("craftsman"),
      value: t("craftsman"),
      href: "#craftsman",
      onClick: () => {
        console.log("Craftsman clicked");
      },
    },
  ];
};