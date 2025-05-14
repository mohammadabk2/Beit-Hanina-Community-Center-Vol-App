import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import CopyRight from "../../components/CopyRight";

const About = () => {
  const { t: tAbout } = useTranslation("about");

  return (
    <div className="app flex-box flex-column">
      {/* //TODO add check if signed in or not and use the right nav bar according to it */}
      <NavigationBar />
      <div className="general-box scroll-box1 flex-box">
        <div
          className="general-box flex-box flex-column smooth-shadow-box"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <div className="basic-item-padding personal-area-content">
            {tAbout("desc")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("contact")}
            <div className="personal-area-content">support@email.com</div>
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("devs")}
            <div className="personal-area-content">{tAbout("mohammadak")}</div>
            <div className="personal-area-content">{tAbout("jad")}</div>
            <div className="personal-area-content">{tAbout("husam")}</div>
            <div className="personal-area-content">{tAbout("mohammadqt")}</div>
            <div className="personal-area-content">{tAbout("mohammadtb")}</div>
          </div>
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default About;
