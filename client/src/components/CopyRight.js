import React from "react";
import { useTranslation } from "react-i18next";

import DynamicButton from "./ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../config/options/Colors";

const CopyRight = () => {
  const { t } = useTranslation("copyRight");
  const navigate = useNavigate();
  const { isLightMode } = useTheme();

  const ulaRedirect = () => {
    console.log("Copy Right Link clicked.")
    navigate("/user-license-agreement");
  }

  return (
    <>
      <div className="general-box flex-box flex-column basic-box-padding">
        <div className="basic-item-padding">&copy; {t("owner")}</div>
        <DynamicButton className="link-button" text={t("privacy")} onClick={ulaRedirect} />
      </div>
    </>
  );
};

export default CopyRight;