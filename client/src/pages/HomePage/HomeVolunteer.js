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
  const { events: signedUpEvents, eventsLoading: signedUpEventsLoading, eventsError: signedUpEventsError, loadEvents: loadSignedUpEvents, setEvents: setSignedUpEvents } = useLoadEvents();
  const { events: favEvents, eventsLoading: favEventsLoading, eventsError: favEventsError, loadEvents: loadFavEvents, setEvents: setFavEvents } = useLoadEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("new");
  const [sortText, setSortText] = useState("");
  const [signedUpEventIds, setSignedUpEventIds] = useState([]);
  const [favoriteEventIds, setFavoriteEventIds] = useState([]);

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
      switch (selectedStatus) {
        case "new":
          loadEvents(["approved"], "new");
          break;
        case "signed-up":
          loadSignedUpEvents(["approved"], "signed-up");
          break;
        case "fav":
          loadFavEvents(["approved"], "fav");
          break;
        default:
          loadEvents(["approved"], "new");
      }
    }
  }, [userId, isAuthenticated, loadEvents, loadSignedUpEvents, loadFavEvents, selectedStatus]);

  // Update signed up event IDs when signed up events are loaded
  useEffect(() => {
    if (signedUpEvents.length > 0) {
      const eventIds = signedUpEvents.map(event => event.id);
      setSignedUpEventIds(eventIds);
    }
  }, [signedUpEvents]);

  // Update favorite event IDs when events are loaded
  useEffect(() => {
    const currentEvents = getCurrentEventsData().events;
    if (currentEvents.length > 0) {
      const favIds = currentEvents.filter(event => event.isFavorite).map(event => event.id);
      setFavoriteEventIds(favIds);
    }
  }, [events, signedUpEvents, favEvents]);

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
      
      // Optimistic update: Remove from signed up events list immediately
      setSignedUpEventIds(prev => prev.filter(id => id !== eventID));
      
      // If currently viewing signed-up events, remove from display immediately
      if (selectedStatus === "signed-up") {
        setSignedUpEvents(prev => prev.filter(event => event.id !== eventID));
      }
      
      try {
        await sendAxiod("/events/actions", eventID, "unenroll", "");
        alert("Enrollment cancelled");
      } catch (error) {
        // Revert optimistic update on error
        console.error("Error cancelling enrollment:", error);
        setSignedUpEventIds(prev => [...prev, eventID]);
        if (selectedStatus === "signed-up") {
          // Reload signed-up events to restore the correct state
          loadSignedUpEvents(["approved"], "signed-up");
        }
      }
    } else {
      console.log("Join Event Button Clicked");
      
      // Optimistic update: Add to signed up events list immediately
      setSignedUpEventIds(prev => [...prev, eventID]);
      
      try {
        await sendAxiod("/events/actions", eventID, "enroll", "");
        alert(t("event_signup_success"));
      } catch (error) {
        // Revert optimistic update on error
        console.error("Error joining event:", error);
        setSignedUpEventIds(prev => prev.filter(id => id !== eventID));
      }
    }
  };

  const handleFavorite = async (eventID) => {
    const isFavorite = favoriteEventIds.includes(eventID);
    
    if (isFavorite) {
      console.log("Unfavorite Button Clicked");
      
      // Optimistic update: Remove from favorite events list immediately
      setFavoriteEventIds(prev => prev.filter(id => id !== eventID));
      
      // If currently viewing favorite events, remove from display immediately
      if (selectedStatus === "fav") {
        setFavEvents(prev => prev.filter(event => event.id !== eventID));
      }
      
      try {
        await sendAxiod("/events/actions", eventID, "fav", "");
        console.log("Event unfavorited successfully");
      } catch (error) {
        // Revert optimistic update on error
        console.error("Error unfavoriting event:", error);
        setFavoriteEventIds(prev => [...prev, eventID]);
        if (selectedStatus === "fav") {
          // Reload favorite events to restore the correct state
          loadFavEvents(["approved"], "fav");
        }
      }
    } else {
      console.log("Favorite Button Clicked");
      
      // Optimistic update: Add to favorite events list immediately
      setFavoriteEventIds(prev => [...prev, eventID]);
      
      try {
        await sendAxiod("/events/actions", eventID, "fav", "");
        console.log("Event favorited successfully");
      } catch (error) {
        // Revert optimistic update on error
        console.error("Error favoriting event:", error);
        setFavoriteEventIds(prev => prev.filter(id => id !== eventID));
      }
    }
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
        isFavorite={favoriteEventIds.includes(event.id)} // Use state instead of event.isFavorite
        isSignedUp={signedUpEventIds.includes(event.id)} // Pass enrollment status
        onFavorite={() => handleFavorite(event.id)} // Pass favorite handler
      />
    ));
  };

  // Get the appropriate events array and loading state based on selected status
  const getCurrentEventsData = () => {
    switch (selectedStatus) {
      case "new":
        return {
          events: events,
          loading: eventsLoading,
          error: eventsError
        };
      case "signed-up":
        return {
          events: signedUpEvents,
          loading: signedUpEventsLoading,
          error: signedUpEventsError
        };
      case "fav":
        return {
          events: favEvents,
          loading: favEventsLoading,
          error: favEventsError
        };
      default:
        return {
          events: events,
          loading: eventsLoading,
          error: eventsError
        };
    }
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
          {getCurrentEventsData().loading && <p>{t("loading_events")}</p>}
          {getCurrentEventsData().error && <p style={{ color: "red" }}>{getCurrentEventsData().error}</p>}
          {!getCurrentEventsData().loading &&
            !getCurrentEventsData().error &&
            renderEventItems(
              getCurrentEventsData().events.filter(
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
