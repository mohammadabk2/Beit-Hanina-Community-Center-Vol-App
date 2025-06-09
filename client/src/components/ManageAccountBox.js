import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import DynamicButton from "./common/ButtonComponent";
import { useAuth } from "../config/Context/auth";

const ManageAccountBox = () => {
  const { t } = useTranslation("personal");
  const { logout, userId, token } = useAuth();
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const changePassword = async (newPassword) => {
    console.log("Change Password button clicked");
    const response = await axios.post(
      `${API_BASE_URL}/api/change-password`,
      {
        userID: userId,
        action: "password-change",
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      console.log(`${response.status} ${response.message}`);
    }
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
