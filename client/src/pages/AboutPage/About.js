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
      <div className="about-container">
        <div className="about-desc">{tAbout("desc")}</div>
        <hr className="about-divider" />
        <div className="about-section">
          <div className="about-section-title">
            {tAbout("contact") || "Contact Information"}
          </div>
          <div className="about-contact">support@email.com</div>
        </div>
        <hr className="about-divider" />
        <div className="about-section">
          <div className="about-section-title">
            {tAbout("devs") || "Developers"}
          </div>
          <ul className="about-dev-list">
            <li>Mohammad Abu Khdier</li>
            <li>Jad Jaraisy</li>
            <li>Husam Halawani</li>
            <li>Mohammad Quttaineh</li>
            <li>Mohammad Tbakhy</li>
          </ul>
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default About;
