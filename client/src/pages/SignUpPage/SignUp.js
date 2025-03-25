import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import { useLnOptions } from "../../config/Language";
import { useSkillOptions } from "../../config/Skills";
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

  const lnOptions = useLnOptions();
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

  return (
    <div>
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={tsignup("ln")}
          options={lnOptions}
        />
      </div>
      <div className="flex-box">
        <form onSubmit={handleSubmit} className="sign-in-box smooth-shadow-box">
          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
            <div>
              <label>{tsignup("gender")} </label>
              <label className="red-star">*</label>
            </div>
            <DropDownMenu
              className="gender-button"
              text={formData.sex || "Select Gender"}
              options={sexOptions}
            />
          </div>

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
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

          <div className="flex-box flex-column">
            <div>
              <label>{tsignup("skills")}: </label>
            </div>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex-box">
                <label>{skill}</label>
                <DynamicButton
                  className="button"
                  text={tsignup("remove")}
                  onClick={() => handleRemoveSkill(index)}
                />
              </div>
            ))}
            <DropDownMenu
              className="sex-button"
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
