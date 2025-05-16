import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import NavigationBar from "../../components/layout/NavigationBar";
import PopupComponent from "../../components/common/PopupComponent";
import DynamicButton from "../../components/common/ButtonComponent";
const ULAPage = () => {
  const { t } = useTranslation("copyRight");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      
      <div className="general-box flex-box flex-column smooth-shadow-box basic-box-padding gap-1">
        <h2 className="bold-text">{t("ula")}</h2>
        
        <DynamicButton
          className="button button-small"
          text="Show Modern Popup"
          onClick={() => setShowPopup(true)}
        />

        <PopupComponent
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          message="Modern Popup Demo"
          buttonText="Confirm"
          showCloseButton={false} // Test without close button
          closeOnOutsideClick={false} // Test click outside behavior
        >
          <div className="flex-box flex-column">
            <p className="personal-area-content">New animated popup content!</p>
            <img 
              src="/demo-image.jpg" 
              alt="Demo" 
              className="preview-img smooth-shadow-box"
            />
          </div>
        </PopupComponent>
      </div>
    </div>
  );
};
export default ULAPage;