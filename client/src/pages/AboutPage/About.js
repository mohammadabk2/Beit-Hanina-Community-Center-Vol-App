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
          <div>{tAbout("admins")}</div>
          <div>{tAbout("fadi")}</div>
          <div>{tAbout("ahmed")}</div>
          <div>{tAbout("contact")} add support email</div>
        </div>

        <div className="basic-box-padding">
          <div>{tAbout("devs")}</div>
          <div>{tAbout("mohammadak")}</div>
          <div>{tAbout("jad")}</div>
          <div>{tAbout("husam")}</div>
          <div>{tAbout("mohammadqt")}</div>
          <div>{tAbout("mohammadtb")}</div>
        </div>

        <div className="basic-box-padding">{tAbout("version")}: 0.5</div>
      </div>
    </div>
  );
};

export default About;
