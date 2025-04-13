import React from "react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const UsageAgreementPage = () => {
  const { t } = useTranslation("app");

  return (
    <div className="page-container">
      <h2>{t("usage-agreement")}</h2>
      <p>هنا تكتب اتفاقية المستخدم بالتفصيل...</p>
      <Footer />
    </div>
  );
};

export default UsageAgreementPage;
