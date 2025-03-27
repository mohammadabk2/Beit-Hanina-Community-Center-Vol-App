import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
// import DropDownMenu from "../../components/DropDownMenu";

function PersonalArea() {
  const { t } = useTranslation("personal");

  //TODO change all these to read from database
  const name = "Some org";
  const userName = "org123";
  const givenHours = 100;
  const numberOfVolunteers = 50;

  const printToPdf = () => {
    console.log("print to PDF button clicked");
  };

  const downloadToExcel = () => {
    console.log("Excel button clicked");
  };

  const changePassword = () => {
    console.log("password change button clicked");
  };

  return (
    <div className="app flex-box flex-column smooth-shadow-box">
      <NavigationBar />
      <div className="flex-box flex-column event-box">
        <div className="perosnal-area-content">
          {t("org_name")}: {name}
        </div>

        <div className="perosnal-area-content">
          {t("user_name")}: {userName}
        </div>
        <div className="perosnal-area-content">
          {t("total_hours")}: {givenHours}
        </div>
        <div className="perosnal-area-content">
          {t("number_of_vol")}: {numberOfVolunteers}
        </div>

        <div className="flex-box flex-column input-field-box"></div>

        <DynamicButton
          className="button"
          text={t("to_pdf")}
          onClick={printToPdf}
        />

        <DynamicButton
          className="button"
          text={t("to_excel")}
          onClick={downloadToExcel}
        />

        <DynamicButton
          className="button"
          text={t("password_change")}
          onClick={changePassword}
        />
      </div>
    </div>
  );
}

export default PersonalArea;
