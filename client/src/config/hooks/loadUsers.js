import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth";

const useLoadUsers = () => {
  const { userId, isAuthenticated, logout } = useAuth();
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const [users, setUsers] = useState([]);
  const [usersLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const loadUsers = useCallback(
    async (tableName = "volunteer_waiting_list") => {
      if (!token) {
        console.warn("Missing token. Logging out.");
        logout();
        return;
      }

      setUserLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`, {
          params: {
            userID: userId,
            userRequest: "add later",
            tableName: tableName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let data = response.data?.userData;
        if (Array.isArray(data)) {
          const people = data.map((person) => ({
            ...person,
            isNew: tableName === "volunteer_waiting_list",
          }));
          setUsers(people);
        } else {
          setUsers([]);
          console.log("Unexpected data format or no users found.");
        }

        setUserError(null);
      } catch (error) {
        console.error("Error loading users:", error);
        if (error.response?.status === 401) {
          console.warn("Unauthorized access. Logging out.");
          logout();
        }
        setUserError("Failed to load users.");
      } finally {
        setUserLoading(false);
      }
    },
    [userId, isAuthenticated, token, API_BASE_URL, logout]
  );

  return {
    users,
    usersLoading,
    userError,
    loadUsers,
  };
};

export default useLoadUsers;
