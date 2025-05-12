import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import NavigationBar from "../../components/layout/NavigationBar";
import SelectComponent from "../../components/SelectComponent";
import UploadFile from "../../components/UploadComponent";
import CopyRight from "../../components/layout/CopyRight";

// Import the insurance options
import { useInsuranceOptions } from "../../config/options/Insurance";

const SignUpPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const baseInsuranceOptions = useInsuranceOptions();

  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    sex: "",
    phone: "",
    email: "",
    address: "",
    insurance: "",
    idNumber: "",
    userName: "",
    password: "",
    skills: [], // Initialize skills as an array
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInsuranceChange = (value) => {
    setFormData({ ...formData, insurance: value });
  };

  const handleSexChange = (value) => {
    setFormData({ ...formData, sex: value });
  };

  const { t } = useTranslation("signUp");
  const { t: tApp } = useTranslation("app");

  const insuranceOptions = baseInsuranceOptions.map((option) => ({
    ...option,
    onClick: () => {
      console.log(`${option.value} clicked`);
      handleInsuranceChange(option.value);
    },
  }));

  const sexOptions = [
    {
      label: t("male"),
      href: "#male",
      onClick: () => {
        console.log("male clicked");
        handleSexChange("male");
      },
    },
    {
      label: t("female"),
      href: "#female",
      onClick: () => {
        console.log("female clicked");
        handleSexChange("female");
      },
    },
  ];

  //TODO change lan from drop down to new nav bar
  return (
    <div className="flex-box flex-column">
      <NavigationBar dontShowPageButtons={true} />
      <div>
        <form
          onSubmit={handleSubmit}
          className="general-box smooth-shadow-box flex-box flex-column"
        >
          <div className="flex-box flex-column input-field-box">
            <div>
              <label> {t("fullName")} </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.fullName}
              name="name"
              onChange={handleChange}
              placeholder={t("fullname_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("birthDate")} </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="date"
              value={formData.birthDate}
              name="birthDate"
              onChange={handleChange}
            />
          </div>

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
              value={formData.phone}
              name="phone"
              onChange={handleChange}
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder={t("phoneNnumber_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("email")} </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder={t("email_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("address")} </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
              placeholder={t("address_placeholder")}
            />
          </div>

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
              <label>{t("idNumber")} </label>
              <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="text"
              value={formData.idNumber}
              name="idNumber"
              onChange={handleChange}
              placeholder={t("idNumber_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("userName")} </label>
              <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="text"
              value={formData.userName}
              name="userName"
              onChange={handleChange}
              placeholder={tApp("user-name-placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("password")} </label>
              <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder={tApp("password-placeholder")}
            />
          </div>

          <SelectComponent
            type="skills"
            onChange={handleChange}
            chosen={formData.skills}
          />

          <UploadFile />

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
  );
};

export default SignUpPage;
