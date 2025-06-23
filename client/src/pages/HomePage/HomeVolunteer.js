import React, { useEffect, useState } from "react"; // Import useState and useEffect
import { useTranslation } from "react-i18next";
import axios from "axios";

// import components here
import EventItem from "../../components/EventItem";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";
import DynamicInput from "../../components/common/InputComponent";
import DropDownMenu from "../../components/common/DropDownMenu";

// import context and hooks
import { useAuth } from "../../config/Context/auth";
import useLoadEvents from "../../config/hooks/loadEvent";

import { SERVER_IP } from "../../config/constants/global";

const HomeVolunteer = () => {
  const API_BASE_URL = SERVER_IP;
  const { t } = useTranslation("home");

  const { userId, loadingInitial, isAuthenticated, token } = useAuth();
  const { events, eventsLoading, eventsError, loadEvents } = useLoadEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("new");
  const [sortText, setSortText] = useState(t("sort"));

  //TODO add signup events and fav events options
  const statusOptions = [
    {
      label: t("new"),
      href: "#",
      onClick: () => {
        setSelectedStatus("new");
        setSortText(t("new"));
      },
    },
    {
      label: t("signed_up"),
      href: "#",
      onClick: () => {
        setSelectedStatus("signed-up");
        setSortText(t("signed_up"));
      },
    },
    {
      label: t("favorites"),
      href: "#",
      onClick: () => {
        setSelectedStatus("fav");
        setSortText(t("favorites"));
      },
    },
  ];

  useEffect(() => {
    if (userId && isAuthenticated) {
      loadEvents(["approved"], selectedStatus);
      // loadEvents([selectedStatus], "event-type");
      // loadEvents(["approved"]);
    }
  }, [userId, isAuthenticated, loadEvents, selectedStatus]);

  if (loadingInitial) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this data.</div>;
  }

  const sendAxiod = async (path, actionID, actiontoPerform, actionValue) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/${path}`,
        {
          userID: userId,
          actionID: actionID,
          action: actiontoPerform,
          actionValue: actionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log(`${response.status} ${response.message}`);
        alert(t("event_signup_failed"));
      }
    } catch (error) {
      console.error("Axios request failed:", error);
      alert(t("event_signup_failed"));
    }
  };

  const handleJoin = async (eventID) => {
    console.log("Join Event Button Clicked");
    sendAxiod("/events/actions", eventID, "enroll", "");
    alert(t("event_signup_success"));
  };

  const renderEventItems = (eventsArray) => {
    if (!Array.isArray(eventsArray) || eventsArray.length === 0) {
      return <p>{t("no_events_found")}</p>; // Or any other placeholder
    }

    return eventsArray.map((event) => (
      <EventItem
        key={event.id}
        id={event.id}
        name={event.name}
        description={event.description}
        req={event.requirements || []} // Assuming 'requirements' might exist, fallback to empty array
        type="vol"
        count={event.currentSize}
        size={event.maxSize}
        eventLocation={event.location}
        joinEvent={() => handleJoin(event.id)} // Passes functions as callback
        isFavorite={event.isFavorite}
      />
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      <div className="scroll-box1 flex-box">
        <div className="flex-box  top-scroll-box1 line-break">
          <div>
            <DynamicInput
              type="text"
              placeholder={"..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            {" "}
            <DropDownMenu
              text={sortText}
              className="gender-button"
              options={statusOptions}
            />
          </div>
        </div>
        {/* <div className="bottom-scroll-box1">{renderEventItems(events)}</div> */}
        <div className="bottom-scroll-box1">
          {eventsLoading && <p>{t("loading_events")}</p>}
          {eventsError && <p style={{ color: "red" }}>{eventsError}</p>}
          {!eventsLoading &&
            !eventsError &&
            renderEventItems(
              events.filter(
                (event) =>
                  event.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  event.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
            )}
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default HomeVolunteer;
