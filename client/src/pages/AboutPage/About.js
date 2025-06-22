import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";
import DynamicButton from "../../components/common/ButtonComponent";

const About = () => {
  const { t: tAbout } = useTranslation("about");

  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box">
        <div className="flex-box flex-column smooth-shadow-box">
          {/* <div className="basic-item-padding personal-area-content">
            {tAbout("admins")}
          </div> */}
          <div className="basic-item-padding personal-area-content">
            {tAbout("desc")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("contact")} support@email.com
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("devs")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("mohammadak")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("jad")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("husam")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("mohammadqt")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("mohammadtb")}
          </div>

          <DynamicButton
            className="button"
            text={tAbout("back")}
            onClick={backToHome}
          />
        </div>
      </div>

      <CopyRight />
    </div>
  );
};

export default About;
