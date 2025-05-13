import React from 'react';
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";

const ULAPage = () => {
  const { t } = useTranslation("copyRight");

  return (
    <div className="app flex-box flex-column">
      <NavigationBar /> 
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box basic-box-padding">
          <div className="bold-text"> {t("ula")} </div>
          {/* //TODO add to translation legal document */}
          <div >some legal text</div>
        </div>
      </div> 
    </div>
  );
};

export default ULAPage;