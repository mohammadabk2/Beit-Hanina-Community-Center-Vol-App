import React, { useEffect, useState } from "react"; // Import useState and useEffect
import { useTranslation } from "react-i18next";
import axios from "axios";

// import components here
import EventItem from "../../components/EventItem";
import DynamicButton from "../../components/common/ButtonComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";
// import orgLogo from "../../icons/org_icon.jpg"
import DynamicInput from "../../components/common/InputComponent";

// import context and hooks
import { useAuth } from "../../config/Context/auth";
import useLoadEvents from "../../config/hooks/loadEvent";

const HomeVolunteer = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t } = useTranslation("home");

  const { userId, loadingInitial, isAuthenticated, token } = useAuth();
  const { events, eventsLoading, eventsError, loadEvents } = useLoadEvents();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (userId && isAuthenticated) {
      loadEvents(["approved"]);
    }
  }, [userId, isAuthenticated, loadEvents]);

  if (loadingInitial) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this data.</div>;
  }

  const sortEvents = () => {
    console.log("Sort button clicked");
    //TODO call loadevents with arguemnt as needed
  };

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
        alert("Failed to sign up try again later");
      }
    } catch (error) {
      console.error("Axios request failed:", error);
      alert("Failed to sign up try again later");
    }
  };

  const handleJoin = async (eventID) => {
    console.log("Join Event Button Clicked");
    sendAxiod("/events/actions", eventID, "enroll", "");
    alert("Signed up To Event");
  };

  const renderEventItems = (eventsArray) => {
    if (!Array.isArray(eventsArray) || eventsArray.length === 0) {
      return <p>{t("no_events_found")}</p>; // Or any other placeholder
    }

    return eventsArray.map((event) => (
      <EventItem
        key={event.id}
        name={event.name}
        desc={event.description}
        req={event.requirements || []} // Assuming 'requirements' might exist, fallback to empty array
        type="vol"
        count={event.currentSize}
        size={event.maxSize}
        eventLocation={event.location}
        joinEvent={() => handleJoin(event.id)} // Passes functions as callback
      />
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      <div className="scroll-box1 flex-box flex-column">
        <div className="flex-box flex-column top-scroll-box1 line-break">
          <div>
            <DynamicInput
              type="text"
              placeholder={"..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />

            <DynamicButton
              className="button button-small"
              onClick={sortEvents}
              text={t("sort")}
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
