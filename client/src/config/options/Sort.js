import { useTranslation } from "react-i18next";
export const useSortOptions = (UserType) => {
  const { t } = useTranslation("sort");

  const adminKeys = [],
    orgKeys = [],
    volKeys = [];

  for (let i = 1; i <= 9; i++) {
    let string = `sort_${i}`;
    adminKeys.push(string);
    if (i >= 3) orgKeys.push(string);
    if (i >= 5) volKeys.push(string);
  }

  let keyToReturn = [];

  console.log(`${UserType} sort option loaded`);
  switch (UserType) {
    case "admin":
      keyToReturn = adminKeys;
      break;
    case "organizer":
      keyToReturn = orgKeys;
      break;
    case "volunteer":
      keyToReturn = volKeys;
      break;
    default:
      keyToReturn = volKeys; //fallback
  }

  return keyToReturn.map((key) => ({
    label: t(`${key}`),
    value: t(`${key}`),
    // href: `#option${key}`,
    onClick: () => {
      console.log(`Sort ${t(key)} clicked`);
    },
  }));
};
