import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import ManageAccountBox from "../../components/ManageAccountBox";
// import DropDownMenu from "../../components/DropDownMenu";

function PersonalArea() {
  const { t } = useTranslation("personal");

  //TODO change all these to read from database
  const name = "Fadi";

  const printToPdf = () => {
    console.log("print to PDF button clicked");
  };

  const downloadToExcel = () => {
    console.log("Excel button clicked");
  };

  return (
    <div className="app flex-box flex-column smooth-shadow-box">
      <NavigationBar />
      <div className="flex-box flex-column event-box">
        <div className="perosnal-area-content">
          {t("name")}: {name}
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

        <ManageAccountBox />
      </div>
    </div>
  );
}

export default PersonalArea;
