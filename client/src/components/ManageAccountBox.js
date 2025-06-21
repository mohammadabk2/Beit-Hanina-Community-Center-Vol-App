import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import DynamicButton from "./common/ButtonComponent";
import { useAuth } from "../config/Context/auth";
import PopupComponent from "./common/PopupComponent";
import DynamicInput from "./common/InputComponent";

import { SERVER_IP } from "../global";


const ManageAccountBox = () => {
  const { t } = useTranslation("personal");
  const { logout, userId, token } = useAuth();
  const API_BASE_URL = SERVER_IP;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePasswordClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      console.log("Change Password button clicked");
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/change-password`,
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
      if (response.status === 200) {
        alert("Password changed successfully!");
        handlePopupClose();
      } else {
        alert("Failed to change password.");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex-box">
      <DynamicButton
        className="button"
        text={t("password_change")}
        onClick={handleChangePasswordClick}
      />

      <DynamicButton className="button" text={t("sign_out")} onClick={logout} />

      <PopupComponent
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        message="Change Your Password"
        buttonText="Cancel"
      >
        <div className="flex-box flex-column gap-1">
          <DynamicInput
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input-field"
          />
          <DynamicInput
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
          />
          <DynamicInput
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <DynamicButton
            text="Submit"
            onClick={handlePasswordChange}
            className="button"
          />
        </div>
      </PopupComponent>
    </div>
  );
};

export default ManageAccountBox;
