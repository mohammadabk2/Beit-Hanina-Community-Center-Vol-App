import React, { useState } from "react";
import PropTypes from "prop-types";

import DynamicButton from "./ButtonComponent";
import { useTranslation } from "react-i18next";
import logoIcon from "../icons/org_icon.png";
import personIcon from "../icons/person_icon.svg";
import fullStar from "../icons/favorite_icon.svg";
import emptyStar from "../icons/not_favorite_icon.svg";

const EventItem = ({ name, className, style, req, type, count, size, eventLocation, description}) => {
  const { t } = useTranslation("home");
  const { t: tskill } = useTranslation("skills");

  const handleVolClick = () => {
    console.log("Join button clicked");
  };

  const handleOrgClick = () => {
    console.log("org button clicked");
  };
  const handleApproveClick = () => {
    console.log("approve button clicked");
  };

  const handleRejectClick = () => {
    console.log("reject button clicked");
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    console.log("Clicked favorite");
    setIsFavorite(!isFavorite);
  };

  // const handleShareClick = () => {
  //   console.log("Share button clicked");
  // };

  // const handleHideClick = () => {
  //   console.log("Hide button clicked");
  // };

  return (
    <div className={className} style={style}>
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
        <div className="flex-box flex-column">
          <div>{tskill("skills")}:</div>
          <div className="flex-box">
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
      📍{eventLocation} {/*Location, can be styled or not */}
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
              onClick={handleVolClick}
            />
          )}

          {type === "org" && (
            <DynamicButton
              className="button"
              text={t("org_button")}
              onClick={handleOrgClick}
            />
          )}

          {type === "admin" && (
            <>
              <DynamicButton
                className="button"
                text={t("approve_button")}
                onClick={handleApproveClick}
              />

              <DynamicButton
                className="button"
                text={t("reject_button")}
                onClick={handleRejectClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

EventItem.propTypes = {
  name: PropTypes.string.isRequired,
  req: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  count: PropTypes.number,
  size: PropTypes.number,
  description: PropTypes.string,
  eventLocation: PropTypes.string
};

EventItem.defaultProps = {
  className: "",
  style: {},
};

export default EventItem;
