import React, { useState } from "react";
import PropTypes from "prop-types";

import DynamicButton from "./ButtonComponent";
import { useTranslation } from "react-i18next";
import logoIcon from "../icons/org_icon.png";
import personIcon from "../icons/person_icon.svg";
import fullStar from "../icons/favorite_icon.svg";
import emptyStar from "../icons/not_favorite_icon.svg";

const EventItem = ({ name, className, style, req }) => {
  const { t } = useTranslation("homeVol");

  const handleJoinClick = () => {
    console.log("Join button clicked");
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
      <div className="flex-box event-box-content-middle">
        <div>
          <img className="event-box-image" src={logoIcon} alt="Logo Icon"></img>
        </div>
        <div className="flex-box flex-column">
          <div>Skills:</div>
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
      <div className="flex-box event-box-content-bottom">
        <div className="event-spots-free"></div>
        <div className="flex-box">
          <div>5/10</div>
          <img
            className="button-image"
            src={personIcon}
            alt="Person Icon"
          ></img>
        </div>
        <div className="flex-box">
          <DynamicButton
            className="button"
            text={t("join")}
            onClick={handleJoinClick}
          />
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
};

EventItem.defaultProps = {
  className: "",
  style: {},
};

export default EventItem;
