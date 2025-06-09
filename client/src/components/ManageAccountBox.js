import React from "react";
import { useTranslation } from "react-i18next";

import DynamicButton from "./common/ButtonComponent";
import { useAuth } from "../config/Context/auth";

const ManageAccountBox = () => {
  const { t } = useTranslation("personal");
  const { logout } = useAuth();

  const changePassword = () => {
    console.log("Change Password button clicked");
  };

  return (
    <div className="flex-box">
      <DynamicButton
        className="button"
        text={t("password_change")}
        onClick={changePassword}
      />

      <DynamicButton className="button" text={t("sign_out")} onClick={logout} />
    </div>
  );
};

export default ManageAccountBox;
