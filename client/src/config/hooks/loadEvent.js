import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth";

const useLoadEvents = () => {
  const { userId, isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  const loadEvents = useCallback(
    async (request = ["approved"]) => {
      if (!token) {
        console.warn("Missing token. Logging out.");
        logout();
        return;
      }

      setEventsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/events`, {
          params: {
            userID: userId,
            type: "events",
            userRequest: request,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data?.userData;
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
          console.log("Unexpected data format or no events found.");
        }

        setEventsError(null);
      } catch (error) {
        console.error("Error loading events:", error);
        if (error.response?.status === 401) {
          console.warn("Unauthorized access. Logging out.");
          logout();
        }
        setEventsError("Failed to load events.");
      } finally {
        setEventsLoading(false);
      }
    },
    [userId, isAuthenticated, token, API_BASE_URL, logout]
  );

  return {
    events,
    eventsLoading,
    eventsError,
    loadEvents,
  };
};

export default useLoadEvents;
