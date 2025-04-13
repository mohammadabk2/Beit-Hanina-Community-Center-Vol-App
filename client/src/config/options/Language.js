import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const useLnOptions = () => {
  const { i18n } = useTranslation();

  // ✅ تغيير الاتجاه حسب اللغة
  const setDirection = (lang) => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  // ✅ عند تحميل الصفحة: اقرأ اللغة من localStorage وطبّقها
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    setDirection(savedLang);
  }, [i18n]);

  return [
    {
      label: "ar",
      href: "#option1",
      onClick: () => {
        i18n.changeLanguage("ar");
        setDirection("ar");
        localStorage.setItem("lang", "ar"); // ✅ حفظ اللغة
        console.log("Language changed to Arabic");
      },
    },
    {
      label: "en",
      href: "#option2",
      onClick: () => {
        i18n.changeLanguage("en");
        setDirection("en");
        localStorage.setItem("lang", "en"); // ✅ حفظ اللغة
        console.log("Language changed to English");
      },
    },
  ];
};
