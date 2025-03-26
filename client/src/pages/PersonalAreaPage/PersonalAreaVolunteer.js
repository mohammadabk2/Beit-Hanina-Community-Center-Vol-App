import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import DropDownMenu from "../../components/DropDownMenu";
import { useSkillOptions } from "../../config/Skills";

function PersonalArea() {
  const { t } = useTranslation("personalVolunteer");
  const { t: tskill } = useTranslation("skills");
  const { t: tsignup } = useTranslation("signUp");
  const skillsOptions = useSkillOptions();

  //TODO change all these to read from database
  const name = "john doe";
  // const gender = "male";
  const approvedHours = 10;
  const unapprovedHours = 1;
  const [userSkills, setUserSkills] = useState([
    //TODO call to get user skills
  ]);

  const handleAddSkill = (value) => {
    //TODO call database and check
    if (!userSkills.some((skill) => skill.value === value)) {
      console.log("skill added");
      setUserSkills([...userSkills, { label: value, value }]);
      //TODO change to call database and remove the skill
    } else {
      console.log("skill already there");
    }
  };

  const handleRemoveSkill = (value) => {
    //TODO call database and check
    if (userSkills.some((skill) => skill.value === value)) {
      console.log("skill removed");
      // Update the state by filtering out the removed skill
      setUserSkills(userSkills.filter((skill) => skill.value !== value));
    } else {
      console.log("skill not there");
    }
  };

  const printToPdf = () => {
    console.log("print to PDF button clicked");
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="flex-column">
        <h1>{t("desc")}</h1>
        <h2>
          {tsignup("fullName")}: {name}
        </h2>
        {/* <h2>{tsignup("gender")}: {gender}</h2> */}
        <h2>
          {t("approved_hours")}: {approvedHours}
        </h2>
        <h2>
          {t("unapproved_hours")}: {unapprovedHours}
        </h2>
        <div className="flex-box flex-column input-field-box">
          <div>
            <label>{t("skills")}: </label>
          </div>
          {userSkills.map((skill, index) => (
            <div key={index} className="flex-box">
              <label>{tskill(skill.label)}</label>
              <DynamicButton
                className="button"
                text={tsignup("remove")}
                onClick={() => handleRemoveSkill(skill.value)}
              />
            </div>
          ))}
          <DropDownMenu
            className="sex-button"
            text={t("selectskills")}
            options={skillsOptions.map((skill) => ({
              label: tskill(skill.label),
              href: `#${skill.value}`,
              onClick: () => handleAddSkill(skill.value),
            }))}
          />
        </div>
        <div>
          <h2>{t("places")}</h2>
        </div>
        <div>
          <DynamicButton
            className="button"
            text={t("to_pdf")}
            onClick={printToPdf}
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalArea;
