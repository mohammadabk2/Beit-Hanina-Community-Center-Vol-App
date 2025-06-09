import { useTranslation } from "react-i18next";
export const useSortOptions = (UserType, callbacks = {}) => {
  const { t } = useTranslation("sort");

  const baseKeys = ["sort_1", "sort_2", "sort_3", "sort_4", "sort_5"];
  const orgKeys = ["sort_6", "sort_7"];
  const adminKeys = ["sort_8", "sort_9"];

  let combinedKeys = [...baseKeys];
  if (UserType === "organizer" || UserType === "admin") {
    combinedKeys = [...combinedKeys, ...orgKeys];
  }
  if (UserType === "admin") {
    combinedKeys = [...combinedKeys, ...adminKeys];
  }

  return combinedKeys.map((key) => ({
    label: t(key),
    value: key,
    onClick: callbacks[key] || (() => console.log(`No callback for ${key}`)),
  }));
};
