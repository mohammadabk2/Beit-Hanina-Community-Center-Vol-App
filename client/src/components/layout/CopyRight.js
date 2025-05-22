import React from "react";
import { useTranslation } from "react-i18next";


import DynamicButton from "../common/ButtonComponent";
import { useNavigate } from "react-router-dom";

const CopyRight = () => {
  const { t } = useTranslation("copyRight");
  const navigate = useNavigate();

  const ulaRedirect = () => {
    console.log("Copy Right Link clicked.")
    navigate("/ULA");
  }

  return (
    <>
      <div className="flex-box flex-column basic-box-padding">
        <div className="basic-item-padding">&copy; {t("owner")}</div>
        <DynamicButton className="link-button" text={t("privacy")} onClick={ulaRedirect} />
      </div>
    </>
  );
};

export default CopyRight;