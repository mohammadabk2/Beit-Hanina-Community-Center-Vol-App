import React from "react";
import { useTranslation } from "react-i18next";
import NavigationBar from "../../components/NavigationBar";

// import DynamicButton from "../../components/ButtonComponent";

function PersonalArea() {
  // const { t: tSignUp } = useTranslation("signUp"); //! when adding the personal details
  const { t: tPeronal } = useTranslation("personalVolunteer");

  //TODO change all these to read from database
  const approvedHours = 10;
  const unapprovedHours = 1;
  const skills = ["skill_1", "skill_2"];

  const renderSkills = (skills) => {
    return skills.map((skill, index) => (
      <h3 key={index} className="flex-box flex-column  smooth-shadow-box">
        {skill}
      </h3>
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="flex-column">
        <h1>{tPeronal("desc")}</h1>
        <h2>
          {tPeronal("approved_hours")}: {approvedHours}
        </h2>
        <h2>
          {tPeronal("unapproved_hours")}: {unapprovedHours}
        </h2>
        <h2>
          {tPeronal("skills")} {renderSkills(skills)}
        </h2>
      </div>
    </div>
  );
}

export default PersonalArea;
