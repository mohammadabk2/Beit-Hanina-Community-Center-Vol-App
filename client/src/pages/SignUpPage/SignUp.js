import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import NavigationBar from "../../components/NavigationBar";
import SelectComponent from "../../components/SelectComponent";

const SignUpPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    sex: "",
    phone: "",
    email: "",
    address: "",
    insurance: "",
    idNumber: "",
    skills: [], // Initialize skills as an array
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSexChange = (value) => {
    setFormData({ ...formData, sex: value });
  };

  const { t } = useTranslation("signUp");

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
              <label> {t("fullName")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
              placeholder={t("fullname_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("birthDate")}: </label>
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
              <label>{t("phoneNumber")}: </label>
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
              <label>{t("email")}: </label>
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
              <label>{t("address")}: </label>
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
              <label>{t("insurance")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.insurance}
              name="insurance"
              onChange={handleChange}
              placeholder={t("insurance_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{t("idNumber")}: </label>
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

          <SelectComponent
            type="skills"
            onChange={handleChange}
            chosen={formData.skills}
          />

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
    </div>
  );
};

export default SignUpPage;
