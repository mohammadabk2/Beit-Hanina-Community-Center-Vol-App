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
  const { events: signedUpEvents, loadEvents: loadSignedUpEvents } = useLoadEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("new");
  const [sortText, setSortText] = useState("");
  const [signedUpEventIds, setSignedUpEventIds] = useState([]);

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

  // Update sortText when language changes or selectedStatus changes
  useEffect(() => {
    const updateSortText = () => {
      switch (selectedStatus) {
        case "new":
          setSortText(t("new"));
          break;
        case "signed-up":
          setSortText(t("signed_up"));
          break;
        case "fav":
          setSortText(t("favorites"));
          break;
        default:
          setSortText(t("new"));
      }
    };
    
    updateSortText();
  }, [t, selectedStatus]);

  useEffect(() => {
    if (userId && isAuthenticated) {
      loadEvents(["approved"], selectedStatus);
      // Load signed up events separately to track enrollment status
      loadSignedUpEvents(["approved"], "signed-up");
    }
  }, [userId, isAuthenticated, loadEvents, loadSignedUpEvents, selectedStatus]);

  // Update signed up event IDs when signed up events are loaded
  useEffect(() => {
    if (signedUpEvents.length > 0) {
      const eventIds = signedUpEvents.map(event => event.id);
      setSignedUpEventIds(eventIds);
    }
  }, [signedUpEvents]);

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
    const isSignedUp = signedUpEventIds.includes(eventID);
    
    if (isSignedUp) {
      console.log("Cancel Enrollment Button Clicked");
      sendAxiod("/events/actions", eventID, "unenroll", "");
      alert("Enrollment cancelled");
      
      // Remove from signed up events list immediately for UI feedback
      setSignedUpEventIds(prev => prev.filter(id => id !== eventID));
    } else {
      console.log("Join Event Button Clicked");
      sendAxiod("/events/actions", eventID, "enroll", "");
      alert(t("event_signup_success"));
      
      // Add to signed up events list immediately for UI feedback
      setSignedUpEventIds(prev => [...prev, eventID]);
    }
    
    // Refresh the signed up events list from backend to ensure consistency
    setTimeout(() => {
      loadSignedUpEvents(["approved"], "signed-up");
    }, 1000); // Small delay to allow backend to process
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
        eventDate={event.eventDate}
        startTime={event.startTime}
        endTime={event.endTime}
        joinEvent={() => handleJoin(event.id)} // Passes functions as callback
        isFavorite={event.isFavorite}
        isSignedUp={signedUpEventIds.includes(event.id)} // Pass enrollment status
      />
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      <div className="scroll-box1 flex-box">
        <div className="flex-box flex-column top-scroll-box1 line-break">
          <div className="flex-box">
            <DropDownMenu
              text={sortText}
              className="gender-button"
              options={statusOptions}
            />
          </div>
          <DynamicInput
            type="text"
            placeholder={"..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
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
