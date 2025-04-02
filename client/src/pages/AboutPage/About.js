import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";

//TODO add support email and ahmeds family name
const About = () => {
  const { t: tAbout } = useTranslation("about");

  return (
    <div className="app flex-box">
      <NavigationBar />
      <div className="general-box flex-box flex-column smooth-shadow-box basic-box-padding">
        <div>
          <div className="basic-item-padding">{tAbout("admins")}</div>
          <div className="basic-item-padding">{tAbout("fadi")}</div>
          <div className="basic-item-padding">{tAbout("ahmed")}</div>
          <div className="basic-item-padding">
            {tAbout("contact")} add support email
          </div>
        </div>

        <div className="basic-box-padding">
          <div className="basic-item-padding">{tAbout("devs")}</div>
          <div className="basic-item-padding">{tAbout("mohammadak")}</div>
          <div className="basic-item-padding">{tAbout("jad")}</div>
          <div className="basic-item-padding">{tAbout("husam")}</div>
          <div className="basic-item-padding">{tAbout("mohammadqt")}</div>
          <div className="basic-item-padding">{tAbout("mohammadtb")}</div>
        </div>

        <div className="basic-box-padding">{tAbout("version")}: 0.5</div>
      </div>
    </div>
  );
};

export default About;
