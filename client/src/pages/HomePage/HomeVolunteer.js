import React from "react";
import { useTranslation } from "react-i18next";

// import components here
import EventItem from "../../components/EventItem";
import DynamicButton from "../../components/ButtonComponent";
import NavigationBar from "../../components/NavigationBar";
// import orgLogo from "../../icons/org_icon.jpg"

function HomeVolunteer() {
  const { t } = useTranslation("homeVol");

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
      <NavigationBar />
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
