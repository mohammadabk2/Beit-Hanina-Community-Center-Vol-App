import React from "react";
import { useTranslation } from "react-i18next";

// import backgroundImage from "../../icons/logo.jpg";
import NavigationBar from "../../components/NavigationBar";

//TODO add support email and ahmeds family name
function About() {
  const { t: tAbout } = useTranslation("about");

  return (
    <div className="app flex-box">
      <NavigationBar />
      <main>
        <div className="flex-box-columns smooth-shadow-box sign-up-box">
          <div>
            {tAbout("devs")}
            <div>{tAbout("mohammadak")}</div>
            <div>{tAbout("jad")}</div>
            <div>{tAbout("husam")}</div>
            <div>{tAbout("mohammadqt")}</div>
            <div>{tAbout("mohammadtb")}</div>
          </div>

          <div>
            {tAbout("admins")}
            <div>{tAbout("fadi")}</div>
            <div>{tAbout("ahmed")}</div>
            <div>{tAbout("contact")} add support email</div>
          </div>
          <div>{tAbout("version")}: 0.1</div>
        </div>
      </main>
    </div>
  );
}

export default About;
