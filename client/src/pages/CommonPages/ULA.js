import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/layout/NavigationBar";
import PopupComponent from "../../components/common/PopupComponent";
import DynamicButton from "../../components/common/ButtonComponent";

const ULAPage = () => {
  const { t } = useTranslation("copyRight");
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      <div className="general-box flex-box flex-column smooth-shadow-box basic-box-padding gap-1">
        <div className="bold-text personal-area-content">{t("ula")}</div>

        <DynamicButton
          className="button button-small"
          text="Show Modern Popup"
          onClick={() => setShowPopup(true)}
          ariaLabel="Open demo popup"
        />

        <PopupComponent
          isOpen={showPopup}
          onClose={handlePopupClose}
          message="Modern Popup Demo"
          buttonText="Confirm"
          showCloseButton={true}
          closeOnOutsideClick={true}
        >
          <div className="flex-box flex-column">
            <div className="personal-area-content">popup content</div>

            {/* ADD THE LOGO IMAGE HERE */}
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="Community Center Logo"
              className="preview-img smooth-shadow-box"
            />
          </div>
        </PopupComponent>
      </div>
    </div>
  );
};

export default ULAPage;
