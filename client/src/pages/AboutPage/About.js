import React from "react";
import { useTranslation } from "react-i18next";

import DropDownMenu from "../../components/DropDownMenu";
import { useLnOptions } from "../../config/Language";
// import backgroundImage from "../../icons/logo.jpg";

//TODO add support email and ahmeds family name
function About() {
  const lnOptions = useLnOptions();

  const { t: tApp } = useTranslation("app");
  const { t: tAbout } = useTranslation("about");

  return (
    <div className="app flex-box">
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={tApp("ln")}
          options={lnOptions}
        />
      </div>
      <main>
        <div className="flex-box-columns smooth-shadow-box sign-up-box">
          <h1>{tAbout("devs")}</h1>
          <h2>{tAbout("mohammadak")}</h2>
          <h2>{tAbout("jad")}</h2>
          <h2>{tAbout("husam")}</h2>
          <h2>{tAbout("mohammadqt")}</h2>
          <h2>{tAbout("mohammadtb")}</h2>
          <h1>{tAbout("admins")}</h1>
          <h2>{tAbout("fadi")}</h2>
          <h2>{tAbout("ahmed")}</h2>
          <h3>{tAbout("contact")} add support email</h3>
          <h3>{tAbout("version")}: 0.1</h3>
        </div>
      </main>
    </div>
  );
}

export default About;
