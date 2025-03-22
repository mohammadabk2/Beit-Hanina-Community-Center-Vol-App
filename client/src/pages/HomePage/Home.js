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
    <div className="app flex-box flex-column">
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />
      </div>
      <header className="app-header"></header>
      <main>
        <EventItem
          name={"test event"}
          desc={"some desc"}
          req={["old", "young", "test", "rest"]}
        ></EventItem>
      </main>
    </div>
  );
}

export default Home;
