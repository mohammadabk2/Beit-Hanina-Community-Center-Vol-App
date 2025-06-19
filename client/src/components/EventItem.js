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
import PopupComponent from "./common/PopupComponent"

const EventItem = ({
  id,
  name,
  req,
  type,
  count,
  size,
  eventLocation,
  description,
  rejectEvent,
  approveEvent,
  joinEvent,
  editEvent,
  volunteers,
}) => {
  const { t } = useTranslation("home");
  const { t: tskill } = useTranslation("skills");
  const { token, userId } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cachedUsers, setCachedUsers] = useState({});
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      if (!isPopupOpen) return;
      if (cachedUsers[id]) {
        setEnrolledUsers(cachedUsers[id]);
        return;
      }
      
      setIsLoading(true);
      setError(null);

      console.log(userId);
      
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userID: userId,
              userRequest: [id, 'vol_id_waiting_list'],
              tableName: 'volunteer'
            }
          }
        );
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEnrolledUsers(response.data);
          setCachedUsers(prev => ({...prev, [id]: response.data}));
        } else {
          setEnrolledUsers([]);
        }
      } catch (error) {
        console.error("Error fetching enrolled users:", error);
        setError(error.message || 'Failed to fetch enrolled users');
        setEnrolledUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledUsers();
  }, [isPopupOpen, id, token, cachedUsers]);

  const handleFavorite = () => {
    console.log("Clicked favorite");
    setIsFavorite(!isFavorite);
  };

  const showEnrolled = () => {
    console.log("Clicked enrolled");
    setIsPopupOpen(true);
  };

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
      <div>
        {description} {/*Desc, could be styled or not*/}
      </div>

      <div className="flex-box event-box-content-middle">
        <div>
          <img className="event-box-image" src={logoIcon} alt="Logo Icon"></img>
        </div>

        <div className="flex-box flex-column skills-box">
          <div>{tskill("skills")}:</div>

          <div className="flex-box wrap-reverse">
            {req.map((item, index) => (
              <div key={index} className="skills">
                {item}
                {index < req.length - 1 && " "}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {eventLocation} {/*Location, can be styled or not */}
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
              text={t("join")}
              onClick={joinEvent}
            />
          )}

          {type === "org" && (
            <DynamicButton
              className="button"
              text={t("enrolled users")}
              onClick={showEnrolled}
            />
          )}

          {type === "admin" && (
            <>
              <DynamicButton
                className="button"
                text={t("approve_button")}
                onClick={approveEvent}
              />

              <DynamicButton
                className="button"
                text={t("reject_button")}
                onClick={rejectEvent}
              />
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
            <div>Loading enrolled users...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : Array.isArray(enrolledUsers) && enrolledUsers.length > 0 ? (
            <div className="enrolled-users-list">
              {enrolledUsers.map((user) => (
                <div key={user.id} className="user-item">
                  <div>{user.name}</div>
                  <div>{user.phoneNumber}</div>
                  <div>{user.sex}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No users enrolled in this event</div>
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
  approveEvent: PropTypes.func,
  rejectEvent: PropTypes.func,
  joinEvent: PropTypes.func,
  editEvent: PropTypes.func,
};

EventItem.defaultProps = {
  className: "",
  style: {},
};

export default EventItem;
