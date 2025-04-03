import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import NavigationBar from "../../components/NavigationBar";
import { useSkillOptions } from "../../config/options/Skills";


import xIconLight from "../../icons/light/x_icon.svg";


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
    skills: [], // Initialize skills as an array
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (value) => {
    if (!formData.skills.includes(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [
          ...(Array.isArray(prevFormData.skills) ? prevFormData.skills : []),
          value,
        ],
      }));
    }
  };

  const handleRemoveSkill = (index) => {
    console.log("clicked remove skill");
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSexChange = (value) => {
    setFormData({ ...formData, sex: value });
  };

  const skillsOptions = useSkillOptions();
  const { t: tsignup } = useTranslation("signUp");
  const { t: tskill } = useTranslation("skills");

  const sexOptions = [
    {
      label: tsignup("male"),
      href: "#option1",
      onClick: () => {
        console.log("male clicked");
        handleSexChange("male");
      },
    },
    {
      label: tsignup("female"),
      href: "#option2",
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
              <label> {tsignup("fullName")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
              placeholder={tsignup("fullname_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{tsignup("birthDate")}: </label>
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
              <label>{tsignup("gender")} </label>
              <label className="red-star">*</label>
            </div>
            <DropDownMenu
              className="gender-button"
              text={tsignup(formData.sex) || tsignup("Select Gender")}
              options={sexOptions}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{tsignup("phoneNumber")}: </label>
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
              placeholder={tsignup("phoneNnumber_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{tsignup("email")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder={tsignup("email_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{tsignup("address")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
              placeholder={tsignup("address_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{tsignup("insurance")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.insurance}
              name="insurance"
              onChange={handleChange}
              placeholder={tsignup("insurance_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label>{tsignup("idNumber")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.idNumber}
              name="idNumber"
              onChange={handleChange}
              placeholder={tsignup("idNumber_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <div>{tsignup("skills")}: </div>
            </div>
            <div className="flex-box">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex-box skills">
                  <div>{skill}</div>
                  <img onClick={() => handleRemoveSkill(index)} className="button-image" src={xIconLight}></img>
                </div>
              ))}
            </div>
            <DropDownMenu
              className="gender-button"
              text={tsignup("selectskills")}
              options={skillsOptions.map((skill) => ({
                label: tskill(`${skill.label}`),
                href: `#${skill.value}`,
                onClick: () => handleAddSkill(skill.value),
              }))}
            />
          </div>
          <div className="flex-box">
            <div>
              <DynamicButton
                className="button"
                text={tsignup("submit")}
                type="submit"
              />
            </div>
            <div>
              <DynamicButton
                className="button"
                onClick={goBack}
                text={tsignup("back")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
