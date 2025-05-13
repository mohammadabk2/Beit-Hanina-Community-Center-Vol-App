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
          <div
            className="basic-item-padding personal-area-content"
            style={{ marginBottom: "1.5rem" }}
          >
            {tAbout("desc")}
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{
              fontWeight: "bold",
              fontSize: "1.2em",
              marginBottom: "0.5rem",
            }}
          >
            {tAbout("contact")}{" "}
            <span style={{ fontWeight: "normal", fontSize: "0.95em" }}>
              support@email.com
            </span>
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{
              fontWeight: "bold",
              fontSize: "1.2em",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {tAbout("devs")}
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{ marginBottom: "0.5rem" }}
          >
            {tAbout("mohammadak")}
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{ marginBottom: "0.5rem" }}
          >
            {tAbout("jad")}
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{ marginBottom: "0.5rem" }}
          >
            {tAbout("husam")}
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{ marginBottom: "0.5rem" }}
          >
            {tAbout("mohammadqt")}
          </div>
          <div
            className="basic-item-padding personal-area-content"
            style={{ marginBottom: "0.5rem" }}
          >
            {tAbout("mohammadtb")}
          </div>
        </div>
      </div>

      <CopyRight />
    </div>
  );
};

export default About;
