import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import DynamicButton from "../../components/common/ButtonComponent";
import DynamicInput from "../../components/common/InputComponent";
import DropDownMenu from "../../components/common/DropDownMenu";
import UploadFile from "../../components/common/UploadComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

// Import the insurance and occupation options
import { useInsuranceOptions } from "../../config/options/Insurance";
import { useOccupationOptions } from "../../config/options/Occupation";
import { SERVER_IP } from "../../config/constants/global";

const SignUpPage = () => {
  //TODO handle if already signed in maybe do that in App.js
  const navigate = useNavigate();
  const { t } = useTranslation("signUp");
  const { t: tApp } = useTranslation("app");
  const API_BASE_URL = SERVER_IP;

  const baseInsuranceOptions = useInsuranceOptions();
  const baseOccupationOptions = useOccupationOptions();

  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    sex: "",
    phoneNumber: "",
    email: "",
    address: "",
    insurance: "",
    occupation: "",
    idNumber: "",
    username: "",
    password: "",
    imageFile: null,
    type: "vol",
  });

  const handleInsuranceChange = (value) => {
    setFormData({ ...formData, insurance: value });
  };

  const handleOccupationChange = (value) => {
    setFormData({ ...formData, occupation: value });
  };

  const handleSexChange = (value) => {
    setFormData({ ...formData, sex: value });
  };

  const insuranceOptions = baseInsuranceOptions.map((option) => ({
    ...option,
    onClick: () => {
      console.log(`${option.value} clicked`);
      handleInsuranceChange(option.value);
    },
  }));

  const occupationOptions = baseOccupationOptions.map((option) => ({
    ...option,
    onClick: () => {
      console.log(`${option.value} clicked`);
      handleOccupationChange(option.value);
    },
  }));

  const sexOptions = [
    {
      label: t("male"),
      href: "#male",
      onClick: () => {
        console.log("male clicked");
        handleSexChange("M");
      },
    },
    {
      label: t("female"),
      href: "#female",
      onClick: () => {
        console.log("female clicked");
        handleSexChange("F");
      },
    },
  ];

  const goBack = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        formData
      );

      if (response.data.status === "success") {
        alert(t("sign_up_message"));
        //TODO add wait here
        goBack();
      } else {
        alert(t("login_failed"));
      }
    } catch (err) {
      console.error("Error during sign in:", err);
    }
  };

  // Stores image in form to send
  const handleImageFileSelect = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  };

  const renderInput = (upperName, value, name, placeholder, type) => {
    return (
      <div className="flex-box flex-column input-field-box">
        <div>
          <label> {upperName} </label>
          <label className="red-star">*</label>
        </div>

        <DynamicInput
          className="input-field"
          type={type || "text"}
          value={value}
          name={name}
          onChange={handleChange}
          placeholder={placeholder || ""}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex-box flex-column">
        <NavigationBar />
        <div>
          <form
            onSubmit={handleSubmit}
            className="general-box smooth-shadow-box flex-box flex-column"
          >
            {renderInput(
              t("fullName"),
              formData.fullName,
              "fullName",
              t("fullname_placeholder")
            )}

            {renderInput(
              t("birthDate"),
              formData.birthDate,
              "birthDate",
              "",
              "date"
            )}

            <div className="flex-box flex-column input-field-box">
              <div>
                <label>{t("gender")} </label>
                <label className="red-star">*</label>
              </div>

              <DropDownMenu
                className="gender-button"
                text={t(formData.sex) || t("genderselect")}
                options={sexOptions}
              />
            </div>

            <div className="flex-box flex-column input-field-box">
              <div>
                <label>{t("phoneNumber")} </label>
                <label className="red-star">*</label>
              </div>

              <DynamicInput
                className="input-field"
                type="tel"
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder={t("phoneNnumber_placeholder")}
              />
            </div>

            {renderInput(
              t("email"),
              formData.email,
              "email",
              t("email_placeholder")
            )}

            {renderInput(
              t("address"),
              formData.address,
              "address",
              t("address_placeholder")
            )}

            <div className="flex-box flex-column input-field-box">
              <div>
                <label>{t("insurance")} </label>
                <label className="red-star">*</label>
              </div>
              <DropDownMenu
                className="gender-button"
                text={formData.insurance || t("selectinsurance")}
                options={insuranceOptions}
              />
            </div>

            <div className="flex-box flex-column input-field-box">
              <div>
                <label>{t("occupation")} </label>
                <label className="red-star">*</label>
              </div>
              <DropDownMenu
                className="gender-button"
                text={formData.occupation || t("selectoccupation")}
                options={occupationOptions}
              />
            </div>

            {renderInput(
              t("idNumber"),
              formData.idNumber,
              "idNumber",
              t("idNumber_placeholder")
            )}

            {renderInput(
              t("userName"),
              formData.username,
              "username",
              tApp("user-name-placeholder")
            )}

            {renderInput(
              t("password"),
              formData.password,
              "password",
              tApp("password-placeholder"),
              "password"
            )}

            <UploadFile onFileSelect={handleImageFileSelect} />

            <div className="flex-box">
              <div>
                <DynamicButton
                  className="button"
                  text={t("submit")}
                  type="submit"
                />
              </div>

              <div>
                <DynamicButton
                  className="button"
                  onClick={goBack}
                  text={t("back")}
                />
              </div>
            </div>
          </form>
        </div>
        <CopyRight />
      </div>
    </>
  );
};

export default SignUpPage;
