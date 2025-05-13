import React from 'react';
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import { useLnOptions } from "../../config/options/Language";

const ULAPage = () => {
  const { t } = useTranslation("copyRight");

  return (
    <div className="app flex-box flex-column">
      <NavigationBar /> 
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <h1 className="ula-title">{t("ula")}</h1>          
        </div>
      </div> 
    </div>
  );
};

export default ULAPage;