import React from "react";
import { useTranslation } from "react-i18next";


import DynamicButton from "../../components/common/ButtonComponent";
import ManageAccountBox from "../../components/ManageAccountBox";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

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
          </div>

          <ManageAccountBox />
        </div>
        
        <CopyRight />
      </div>
    </div>
  );
};

export default PersonalArea;
