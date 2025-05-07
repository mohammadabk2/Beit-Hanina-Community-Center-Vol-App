import React from "react";
import { useTranslation } from "react-i18next";
import DynamicButton from "./ButtonComponent";

const CopyRight = () => {
  const { t } = useTranslation("copyRight");

  const privacyRedirect = ()=>{
    console.log("Privacy Link clicked.")
  }
  return (
    <>
      <div className="general-box flex-box basic-box-padding">
        <div className="basic-item-padding">&copy; {t("owner")}</div>
        <DynamicButton className="link-button" text={t("privacy")} onClick={privacyRedirect} />
      </div>
    </>
  );
};

export default CopyRight;
