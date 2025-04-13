import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import NavigationBar from "../../components/NavigationBar";
import SelectComponent from "../../components/SelectComponent";
import { useInsuranceOptions } from "../../config/options/Insurance";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("signUp");

  const baseInsuranceOptions = useInsuranceOptions();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    sex: "",
    phone: "",
    email: "",
    address: "",
    insurance: "",
    idNumber: "",
    skills: [],
    occupation: "",
    occupationOther: "" // ✅ حقل المهنة في حال "أخرى"
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

  const goBack = () => {
    navigate("/");
  };

  const insuranceOptions = baseInsuranceOptions.map(option => ({
    ...option,
    onClick: () => handleInsuranceChange(option.value),
  }));

  const sexOptions = [
    {
      label: t("male"),
      href: "#male",
      onClick: () => handleSexChange("male"),
    },
    {
      label: t("female"),
      href: "#female",
      onClick: () => handleSexChange("female"),
    },
  ];

  const occupationOptions = [
    {
      label: t("occupation.school_student"),
      href: "#school",
      onClick: () =>
        setFormData({ ...formData, occupation: "school_student", occupationOther: "" }),
    },
    {
      label: t("occupation.university_student"),
      href: "#university",
      onClick: () =>
        setFormData({ ...formData, occupation: "university_student", occupationOther: "" }),
    },
    {
      label: t("occupation.professional"),
      href: "#professional",
      onClick: () =>
        setFormData({ ...formData, occupation: "professional", occupationOther: "" }),
    },
    {
      label: t("occupation.other"),
      href: "#other",
      onClick: () =>
        setFormData({ ...formData, occupation: "other" }), // نترك الأخرى مفتوحة للكتابة
    },
  ];

  return (
    <div className="flex-box flex-column">
      <NavigationBar dontShowPageButtons={true} />
      <div>
        <form
          onSubmit={handleSubmit}
          className="general-box smooth-shadow-box flex-box flex-column"
        >
          <div className="flex-box flex-column input-field-box">
            <label>{t("fullName")}: <span className="red-star">*</span></label>
            <DynamicInput
              className="input-field"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("fullname_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("birthDate")}: <span className="red-star">*</span></label>
            <DynamicInput
              className="input-field"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("gender")} <span className="red-star">*</span></label>
            <DropDownMenu
              className="gender-button"
              text={formData.sex ? t(formData.sex) : t("genderselect")}
              options={sexOptions}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("phoneNumber")}: <span className="red-star">*</span></label>
            <DynamicInput
              className="input-field"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder={t("phoneNnumber_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("email")}: <span className="red-star">*</span></label>
            <DynamicInput
              className="input-field"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("email_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("address")}: <span className="red-star">*</span></label>
            <DynamicInput
              className="input-field"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t("address_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("insurance")}: <span className="red-star">*</span></label>
            <DropDownMenu
              className="gender-button"
              text={formData.insurance || t("insurance_placeholder")}
              options={insuranceOptions}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <label>{t("idNumber")}: <span className="red-star">*</span></label>
            <DynamicInput
              className="input-field"
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder={t("idNumber_placeholder")}
            />
          </div>

          {/* ✅ اختيار المهنة */}
          <div className="flex-box flex-column input-field-box">
            <label>{t("occupation.label")}: <span className="red-star">*</span></label>
            <DropDownMenu
              className="gender-button"
              text={
                formData.occupation
                  ? t(`occupation.${formData.occupation}`)
                  : t("occupation.select")
              }
              options={occupationOptions}
            />
          </div>

          {/* ✅ حقل إضافي يظهر عند اختيار "أخرى" */}
          {formData.occupation === "other" && (
            <div className="flex-box flex-column input-field-box">
              <label>{t("occupation.other_placeholder")}</label>
              <DynamicInput
                className="input-field"
                type="text"
                name="occupationOther"
                value={formData.occupationOther}
                onChange={handleChange}
                placeholder={t("occupation.other_placeholder")}
              />
            </div>
          )}

          <SelectComponent
            type="skills"
            onChange={handleChange}
            chosen={formData.skills}
          />

          <div className="flex-box">
            <DynamicButton className="button" type="submit" text={t("submit")} />
            <DynamicButton className="button" onClick={goBack} text={t("back")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
