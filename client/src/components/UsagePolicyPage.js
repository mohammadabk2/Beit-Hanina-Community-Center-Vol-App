import React from "react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const UsagePolicyPage = () => {
  const { t } = useTranslation("app");

  return (
    <div className="page-container">
      <h2>{t("usage-policy")}</h2>
      <p>هنا تكتب سياسة الاستخدام بالتفصيل...</p>
      <Footer />
    </div>
  );
};

export default UsagePolicyPage;
