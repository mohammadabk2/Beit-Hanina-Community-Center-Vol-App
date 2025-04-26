import React from "react";
import { useTranslation } from "react-i18next";

// import components here
import EventItem from "../../components/EventItem";
import DynamicButton from "../../components/ButtonComponent";
import NavigationBar from "../../components/NavigationBar";
import CopyRight from "../../components/CopyRight";
// import orgLogo from "../../icons/org_icon.jpg"

const HomeVolunteer = () => {
  const { t } = useTranslation("homeVol");

  const sortEvents = () => {
    console.log("Sort button clicked");
  };

  const events = [
    {
      name: "test event1",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      name: "test event2",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      name: "test event3",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      name: "test event4",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
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
        type="vol"
        count={event.count}
        size={event.size}
      />
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      <div className="scroll-box1 general-box flex-box flex-column">
        <div className="flex-box flex-column top-scroll-box1 line-break">
          <div>
            <DynamicButton
              className="button button-small"
              onClick={sortEvents}
              text={t("sort")}
            />
          </div>
        </div>
        <div className="bottom-scroll-box1">{renderEventItems(events)}</div>
        <CopyRight />
      </div>
    </div>
  );
};

export default HomeVolunteer;
