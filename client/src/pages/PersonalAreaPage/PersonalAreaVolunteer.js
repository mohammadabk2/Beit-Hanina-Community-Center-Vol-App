import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import DropDownMenu from "../../components/DropDownMenu";
import ManageAccountBox from "../../components/ManageAccountBox";
import { useSkillOptions } from "../../config/options/Skills";

function PersonalArea() {
  const { t } = useTranslation("personalVolunteer");
  const { t: tskill } = useTranslation("skills");
  const { t: tsignup } = useTranslation("signUp");
  const skillsOptions = useSkillOptions();

  //TODO change all these to read from database
  const name = "john doe";
  const userName = "johndoe12";
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
      <div className="general-box scroll-box1">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="personal-area-content">
            {tsignup("fullName")}: {name}
          </div>

          <div className="personal-area-content">
            {t("user_name")}: {userName}
          </div>
          <div className="personal-area-content">
            {t("approved_hours")}: {approvedHours}
          </div>
          <div className="personal-area-content">
            {t("unapproved_hours")}: {unapprovedHours}
          </div>
          

          <div className="flex-box flex-column input-field-box">
            <div className="personal-area-content">{t("skills")}: </div>
            {userSkills.map((skill, index) => (
              <div key={index} className="flex-box">
                <div>{tskill(skill.label)}</div>
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

          <DynamicButton
            className="button"
            text={t("to_pdf")}
            onClick={printToPdf}
          />

          <ManageAccountBox />
        </div>
      </div>
    </div>
  );
}

export default PersonalArea;
