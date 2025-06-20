import { useTranslation } from "react-i18next";
export const useSortOptions = (UserType) => {
  const { t } = useTranslation("sort");

  if (UserType === "admin") {
    console.log("add all def here");
  }
  return [
    {
      label: t("sort_1"),
      value: t("sort_1"),
      href: "#option1",
      onClick: () => {
        console.log("sort 1 clicked");
      },
    },
    {
      label: t("sort_2"),
      value: t("sort_2"),
      href: "#option2",
      onClick: () => {
        console.log("sort 2 clicked");
      },
    },
  ];
};
