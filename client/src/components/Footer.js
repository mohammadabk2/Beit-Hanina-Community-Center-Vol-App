import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("app");

  return (
    <footer style={{
      textAlign: "center",
      padding: "1rem",
      fontSize: "0.85rem",
      color: "#aaa",
      borderTop: "1px solid #444",
      marginTop: "2rem"
    }}>
      <div>
        &copy; {new Date().getFullYear()} Beit Hanina Community Center
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Link to="/usage-policy" style={{ margin: "0 1rem", color: "#bbb", textDecoration: "underline" }}>
          {t("usage-policy")}
        </Link>
        <Link to="/usage-agreement" style={{ margin: "0 1rem", color: "#bbb", textDecoration: "underline" }}>
          {t("usage-agreement")}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
