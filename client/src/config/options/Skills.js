import { useTranslation } from "react-i18next";
//TODO talk with fadi about a list of approved skills
export const useSkillOptions = () => {
  const { t } = useTranslation("skills");

  return [
    {
      label: t("skill_1"),
      value: t("skill_1"),
      href: "#option1",
      onClick: () => {
        console.log("skill 1 clicked");
      },
    },
    {
      label: t("skill_2"),
      value: t("skill_2"),
      href: "#option2",
      onClick: () => {
        console.log("skill 2 clicked");
      },
    },
  ];
};
