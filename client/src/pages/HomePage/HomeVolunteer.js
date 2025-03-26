import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import components here
import DropDownMenu from "../../components/DropDownMenu";
import { useLnOptions } from "../../config/Language";
import EventItem from "../../components/EventItem";
import DynamicButton from "../../components/ButtonComponent";
import settingsIcon from "../../icons/settings_icon.jpg";
import profileIcon from "../../icons/profile_icon.jpg";
import orgLogo from "../../icons/org_icon.jpg"

function HomeVolunteer() {
  const navigate = useNavigate();

  const lnOptions = useLnOptions();
  const { t } = useTranslation("homeVol");

  const goToSettings = () => {
    console.log("Settings button clicked");
    navigate("/settings");
  };

  const goToPersonalArea = () => {
    console.log("Personal Area button clicked");
    navigate("/personal-area");
  };

  const sortEvents = () => {
    console.log("Sort button clicked");
  };

  //! testing only
  const events = [
    {
      name: "test event1",
      desc: "some desc",
      req: ["old", "young", "test", "rest"],
    },
    {
      name: "test event2",
      desc: "some desc",
      req: ["old", "young", "test", "rest"],
    },
    {
      name: "test event3",
      desc: "some desc",
      req: ["old", "young", "test", "rest"],
    },
    {
      name: "test event4",
      desc: "some desc",
      req: ["old", "young", "test", "rest"],
    },
  ];
  //!

  const renderEventItems = (eventsArray) => {
    return eventsArray.map((event, index) => (
      <EventItem
        key={index}
        name={event.name}
        desc={event.desc}
        req={event.req}
        className="flex-box flex-column event-box smooth-shadow-box"
      />
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <div className="flex-box navigation-box">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />
        <div onClick={goToPersonalArea}>
          <img className="navigation-button-image" src={profileIcon}></img>
        </div>
        <div onClick={goToSettings}>
          <img className="navigation-button-image" src={settingsIcon}></img>
        </div>
      </div>
      <div className="scroll-box1">
        <div className="flex-box line-break top-scroll-box1">
          <div>
            <DynamicButton
              className="button button-small"
              onClick={sortEvents}
              text={t("sort")}
            />
          </div>
        </div>
        <div className="flex-box flex-column bottom-scroll-box1">
          {renderEventItems(events)}
        </div>
      </div>
    </div>
  );
}

export default HomeVolunteer;
