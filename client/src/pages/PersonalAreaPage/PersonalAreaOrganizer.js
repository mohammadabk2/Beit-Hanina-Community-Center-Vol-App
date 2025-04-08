import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import ManageAccountBox from "../../components/ManageAccountBox";

const PersonalArea = () => {
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
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-box-padding">
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
    </div>
  );
};

export default PersonalArea;
