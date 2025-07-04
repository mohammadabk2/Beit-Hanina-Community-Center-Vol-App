import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../config/Context/auth";

import DynamicButton from "./common/ButtonComponent";
import { useTranslation } from "react-i18next";
import logoIcon from "../icons/org_icon.png";
import personIcon from "../icons/person_icon.svg";
import fullStar from "../icons/favorite_icon.svg";
import emptyStar from "../icons/not_favorite_icon.svg";
import PopupComponent from "./common/PopupComponent";

import { SERVER_IP } from "../config/constants/global";

const EventItem = ({
  id,
  name,
  // req,
  type,
  count,
  size,
  eventLocation,
  description,
  eventDate,
  startTime,
  endTime,
  rejectEvent,
  approveEvent,
  joinEvent,
  isFavorite: initialIsFavorite = false,
  isSignedUp = false,
  onFavorite,
  // editEvent,
  // volunteers,
}) => {
  const { t } = useTranslation("home");
  // const { t: tskill } = useTranslation("skills");
  const { token, userId } = useAuth();
  const API_BASE_URL = SERVER_IP;

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      if (!isPopupOpen) return;

      setIsLoading(true);
      setError(null);

      console.log(userId);

      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userID: userId,
            userRequest: [id, "vol_id_waiting_list"],
            tableName: "volunteer",
          },
        });

        const usersArr = Array.isArray(response.data)
          ? response.data
          : response.data.userData || [];

        if (usersArr.length > 0) {
          setEnrolledUsers(usersArr);
          console.log(usersArr);
        } else {
          setEnrolledUsers([]);
        }
      } catch (error) {
        console.error("Error fetching enrolled users:", error);
        setError(error.message || "Failed to fetch enrolled users");
        setEnrolledUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledUsers();
  }, [isPopupOpen, id, userId, token]);

  const showEnrolled = () => {
    console.log("Clicked enrolled");
    setIsPopupOpen(true);
  };

  const handleEnrolledUsers = async (action, targetUserId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/events/actions`,
        {
          targetUserID: targetUserId,
          userID: userId,
          actionID: id,
          action: action,
          actionValue: "vol_id_waiting_list",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEnrolledUsers((enrolledUsers) =>
          enrolledUsers.filter((user) => user.id !== targetUserId)
        );
      } else {
        alert("Failed to update user status, try again later");
      }
    } catch (error) {
      console.error("Axios request failed:", error);
      alert("Failed to update user status, try again later");
    }
  };

  const handleFavorite = async () => {
    console.log("Clicked favorite");
    
    // If external handler is provided, use it for optimistic updates
    if (onFavorite) {
      onFavorite();
      return;
    }
    
    // Otherwise, use internal implementation
    setIsFavorite(!isFavorite);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/events/actions`,
        {
          userID: userId,
          actionID: id,
          action: "fav",
          actionValue: "N/A",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("fav reversed");
      } else {
        alert("Failed to update user status, try again later");
      }
    } catch (error) {
      console.error("Axios request failed:", error);
      alert("Failed to update user status, try again later");
    }
  };

  console.log("enrolledUsers to render:", enrolledUsers);

  return (
    <div className="flex-box flex-column event-box smooth-shadow-box">
      <div className="event-box-content-top">
        <div className="event-box-title">{name}</div>

        <div className="event-box-favorite">
          <img
            id="favoriteIcon"
            onClick={handleFavorite}
            className="favorite-button-image"
            src={isFavorite ? fullStar : emptyStar}
            alt="Fav Icon"
          ></img>
        </div>
      </div>

      <div className="flex-box event-box-content-middle">
        <div>
          <img className="event-box-image" src={logoIcon} alt="Logo Icon"></img>
        </div>

        <div className="flex-box flex-column skills-box">
          <div className="event-description-label">{t("event_description")}</div>
          <div style={{ marginBottom: '1rem' }}>
            {description || t("no_description_available")}
          </div>
        </div>
      </div>

      <div>
        {eventLocation}
      </div>

      <div className="flex-box event-date-time-container">
        <div className="event-date">
          {eventDate}
        </div>
        <div className="event-time">
          {startTime} - {endTime}
        </div>
      </div>

      <div className="flex-box event-box-content-bottom">
        <div className="event-spots-free"></div>

        <div className="flex-box">
          <div>
            {count}/{size}
          </div>

          <img
            className="button-image"
            src={personIcon}
            alt="Person Icon"
          ></img>
        </div>

        <div className="flex-box">
          {type === "vol" && (
            <DynamicButton
              className="button"
              text={isSignedUp ? t("cancel") : t("join")}
              onClick={joinEvent}
            />
          )}

          {type === "org" && (
            <DynamicButton
              className="button"
              text={t("enrolled_users")}
              onClick={showEnrolled}
            />
          )}

          {type === "admin" && (
            <>
              {approveEvent && (
                <DynamicButton
                  className="button"
                  text={t("approve_button")}
                  onClick={approveEvent}
                />
              )}

              {rejectEvent && (
                <DynamicButton
                  className="button"
                  text={t("reject_button")}
                  onClick={rejectEvent}
                />
              )}
            </>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <PopupComponent
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        >
          {isLoading ? (
            <div>{t("loding_users")}</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : Array.isArray(enrolledUsers) && enrolledUsers.length > 0 ? (
            <div className="enrolled-users-list">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      {t("name")}
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      {t("phoneNumber")}
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      {t("gender")}
                    </th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledUsers.map((user) => (
                    <tr key={user.id} className="user-item">
                      <td style={{ padding: "0.5rem" }}>{user.name}</td>
                      <td style={{ padding: "0.5rem" }}>{user.phoneNumber}</td>
                      <td style={{ padding: "0.5rem" }}>{user.sex}</td>
                      <td style={{ padding: "0.5rem" }}>
                        <button
                          className="button button-approve"
                          onClick={() =>
                            handleEnrolledUsers("approve", user.id)
                          }
                        >
                          {t("approve")}
                        </button>
                        <button
                          className="button button-reject"
                          onClick={() => handleEnrolledUsers("reject", user.id)}
                        >
                          {t("reject")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>{t("no_users_enrolled")}</div>
          )}
        </PopupComponent>
      )}
    </div>
  );
};

EventItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  req: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string,
  count: PropTypes.number,
  size: PropTypes.number,
  description: PropTypes.string,
  eventLocation: PropTypes.string,
  eventDate: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  approveEvent: PropTypes.func,
  rejectEvent: PropTypes.func,
  joinEvent: PropTypes.func,
  editEvent: PropTypes.func,
  isFavorite: PropTypes.bool,
  isSignedUp: PropTypes.bool,
  onFavorite: PropTypes.func,
};

EventItem.defaultProps = {
  className: "",
  style: {},
};

export default EventItem;
