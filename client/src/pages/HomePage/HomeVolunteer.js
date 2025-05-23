import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useTranslation } from "react-i18next";
import axios from "axios";

// import components here
import EventItem from "../../components/EventItem";
import DynamicButton from "../../components/common/ButtonComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";
// import orgLogo from "../../icons/org_icon.jpg"

// import context
import { useAuth } from "../../config/Context/auth";

const HomeVolunteer = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const { userId, loadingInitial, isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem("authToken");

  const { t } = useTranslation("home");

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true); // State to manage the loading status of events
  const [eventsError, setEventsError] = useState(null); // State to manage any errors during event fetching

  useEffect(() => {
    // Only fetch if userId is available and authenticated
    if (userId && isAuthenticated) {
      loadEvents(["approved"]);
    }
  }, [userId, isAuthenticated, token, API_BASE_URL, logout]);

  if (loadingInitial) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this data.</div>;
  }
  console.log("userid = ");
  console.log(userId);

  const sortEvents = () => {
    console.log("Sort button clicked");
  };

  const loadEvents = async (request) => {
    if (!token) {
      console.log("error with token login in again");
      logout();
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events`, {
        params: {
          // Data for the query parameters
          userID: userId,
          type: "events",
          userRequest: request,
        },
        headers: {
          // Add the headers object
          Authorization: `Bearer ${token}`, // This is the standard way to send a Bearer token
        },
      });

      if (response.data && response.data.userData) {
        // console.log(response.data.userData);
        setEvents(response.data.userData);
      } else {
        setEvents([]); // If no data, set to empty array
        console.log("No events found or unexpected data format.");
      }
      setEventsError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error loading events:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token might be invalid or expired.");
        logout();
      }
      throw error; // Re-throw the error for further handling up the call stack
    } finally {
      setEventsLoading(false); // Set loading to false after request completes (success or error)
    }
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
      />
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      <div className="scroll-box1 flex-box flex-column">
        <div className="flex-box flex-column top-scroll-box1 line-break">
          <div>
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
          {!eventsLoading && !eventsError && renderEventItems(events)}
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default HomeVolunteer;
