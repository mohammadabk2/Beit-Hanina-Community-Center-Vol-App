import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";

//TODO add support email and ahmeds family name
const About = () => {
  const { t: tAbout } = useTranslation("about");

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box scroll-box1">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-item-padding personal-area-content">
            {tAbout("admins")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("fadi")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("ahmed")}
          </div>
          <div className="basic-item-padding personal-area-content">
            {tAbout("contact")} add support email
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
        </div>
      </div>
    </div>
  );
};

export default About;
