import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
// import DropDownMenu from "../../components/DropDownMenu";
import ManageAccountBox from "../../components/ManageAccountBox";
// import { useSkillOptions } from "../../config/options/Skills";
import SelectComponent from "../../components/SelectComponent";

const PersonalArea = () => {
  const { t } = useTranslation("personalVolunteer");
  // const { t: tskill } = useTranslation("skills");
  const { t: tsignup } = useTranslation("signUp");
  // const skillsOptions = useSkillOptions();

  //TODO change all these to read from database
  const name = "john doe";
  const userName = "johndoe12";
  // const gender = "male";
  const approvedHours = 10;
  const unapprovedHours = 1;

  //TODO add call to get user skills
  const [userSkills, setUserSkills] = useState(["cook", "order"]);

  const handleChange = (e) => {
    const { value } = e.target;
    setUserSkills(value);
  };

  const printToPdf = () => {
    console.log("print to PDF button clicked");
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box scroll-box1">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-box-padding">
            <div className="personal-area-content basic-item-padding">
              {tsignup("fullName")}: {name}
            </div>

            <div className="personal-area-content basic-item-padding">
              {t("user_name")}: {userName}
            </div>

            <div className="personal-area-content basic-item-padding">
              {t("approved_hours")}: {approvedHours}
            </div>

            <div className="personal-area-content basic-item-padding">
              {t("unapproved_hours")}: {unapprovedHours}
            </div>
          </div>

          <SelectComponent
            type="skills"
            onChange={handleChange}
            choosen={userSkills}
          />

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
};

export default PersonalArea;
