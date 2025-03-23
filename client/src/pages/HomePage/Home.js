import React from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

// import components here
// import DynamicInput from "./components/InputComponent";
// import DynamicButton from "./components/ButtonComponent";
import DropDownMenu from "../../components/DropDownMenu";
import { useLnOptions } from "../../components/language";
import EventItem from "../../components/EventItem";

function Home() {
  //   const navigate = useNavigate();

  const lnOptions = useLnOptions();
  const { t } = useTranslation("home");

  return (
    <div className="app flex-box">
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />
      </div>
      <main>
        <div className="flex-box flex-column">
          <EventItem
            name={"test event1"}
            desc={"some desc"}
            req={["old", "young", "test", "rest"]}
            className="flex-box flex-column event-box smooth-shadow-box"
          ></EventItem>
          <EventItem
            name={"test event2"}
            desc={"some desc"}
            req={["old", "young", "test", "rest"]}
            className="flex-box flex-column event-box smooth-shadow-box"
          ></EventItem>
          <EventItem
            name={"test event3"}
            desc={"some desc"}
            req={["old", "young", "test", "rest"]}
            className="flex-box flex-column event-box smooth-shadow-box"
          ></EventItem>
        </div>
      </main>
    </div>
  );
}

export default Home;
