import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import NavigationBar from "../../components/layout/NavigationBar";
import PopupComponent from "../../components/common/PopupComponent";
import DynamicButton from "../../components/common/ButtonComponent";

const ULAPage = () => {
  // Remove unused translation hook or use it
  const { t } = useTranslation("copyRight");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      
      {/* Simple Test Section */}
      <div className="general-box flex-box flex-column smooth-shadow-box basic-box-padding gap-1">
        <h2 className="bold-text">{t("ula")}</h2> {/* Now using translation */}
        
        <DynamicButton
          className="button button-small"
          text="Show Test Popup"
          onClick={() => setShowPopup(true)}
        />

        <PopupComponent
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          message="Test Popup"
          buttonText="Close"
        >
          <p>Simple popup content</p>
        </PopupComponent>
      </div>
    </div>
  );
};

export default ULAPage;