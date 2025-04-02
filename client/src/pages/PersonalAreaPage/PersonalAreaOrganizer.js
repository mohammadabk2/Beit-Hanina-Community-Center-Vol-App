import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import ManageAccountBox from "../../components/ManageAccountBox";
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

  return (
    <div className="app flex-box flex-column smooth-shadow-box">
      <NavigationBar />

      <div className="flex-box flex-column event-box basic-item-padding">
        <div className="basic-item-padding">
          <div className="perosnal-area-content basic-item-padding">
            {t("org_name")}: {name}
          </div>

          <div className="perosnal-area-content basic-item-padding">
            {t("user_name")}: {userName}
          </div>

          <div className="perosnal-area-content basic-item-padding">
            {t("total_hours")}: {givenHours}
          </div>

          <div className="perosnal-area-content basic-item-padding">
            {t("number_of_vol")}: {numberOfVolunteers}
          </div>
        </div>

        <div className="flex-box">
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
        </div>

        <ManageAccountBox />
      </div>
    </div>
  );
}

export default PersonalArea;
