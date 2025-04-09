import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import DropDownMenu from "./DropDownMenu";
import DynamicButton from "./ButtonComponent";

const ManageAccountBox = () => {
  const { t } = useTranslation("personal");
  const navigate = useNavigate();

  const signOutHandler = () => {
    console.log("Sign Out button clicked");
    navigate("/"); // go to Landing Page
    //TODO delete whatever cashed info
    //TODO reset user token to null
  };

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

      <DynamicButton
        className="button"
        text={t("sign_out")}
        onClick={signOutHandler}
      />
    </div>
  );
};

export default ManageAccountBox;
