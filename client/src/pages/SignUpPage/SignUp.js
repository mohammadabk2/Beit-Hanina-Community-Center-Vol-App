import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import { useLnOptions } from "../../components/language";
import { useTranslation } from "react-i18next";

// import pages here

function SignUpPage() {
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

  const lnOptions = useLnOptions();
  const { t } = useTranslation("signUp");

  const sexOptions = [
    {
      label: t("male"),
      href: "#option1",
      onClick: () => {
        console.log("male clicked");
        handleSexChange("male");
      },
    },
    {
      label: t("female"),
      href: "#option2",
      onClick: () => {
        console.log("female clicked");
        handleSexChange("female");
      },
    },
  ];

  return (
    <div>
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />
      </div>
      <div className="flex-box">
        <form
          onSubmit={handleSubmit}
          className="form-container smooth-shadow-box"
        >
          <div className="flex-box flex-column">
            <div>
              <label> {t("fullName")} </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
            <div>
              <label>{t("sex")} </label>
              <label className="red-star">*</label>
            </div>
            <DropDownMenu
              className="sex-button"
              text={formData.sex || "Select Sex"}
              options={sexOptions}
            />
          </div>

          <div className="flex-box flex-column">
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
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="flex-box flex-column">
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
              placeholder="Enter Email Address"
            />
          </div>

          <div className="flex-box flex-column">
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
              placeholder="Enter Address"
            />
          </div>

          <div className="flex-box flex-column">
            <div>
              <label>{t("insurance")} </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.insurance}
              name="insurance"
              onChange={handleChange}
              placeholder="Enter Insurance Information"
            />
          </div>

          <div className="flex-box flex-column">
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
              placeholder="Enter ID Number"
            />
          </div>

          <DynamicButton
            className="button"
            text={t("submit")}
            onClick={handleChange}
          />
        </form>
      </div>
      <div>
        <DynamicButton className="button" onClick={goBack} text="Back" />
      </div>
    </div>
  );
}

export default SignUpPage;
