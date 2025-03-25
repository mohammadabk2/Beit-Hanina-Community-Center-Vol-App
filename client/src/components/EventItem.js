import React from "react";
import PropTypes from "prop-types";
import DynamicButton from "./ButtonComponent";
import { useTranslation } from "react-i18next";

const EventItem = ({ name, desc, className, style, req }) => {
  const { t } = useTranslation("homeVol");

  const handleJoinClick = () => {
    console.log("Join button clicked");
  };

  const handleFavoriteClick = () => {
    console.log("Favorite button clicked");
  };

  const handleShareClick = () => {
    console.log("Share button clicked");
  };

  const handleHideClick = () => {
    console.log("Hide button clicked");
  };

  return (
    <div className={className} style={style}>
      <div>
        <h1>{name}</h1>
        <p>{desc}</p>
        <div className="flex-box">
          {req.map((item, index) => (
            <div key={index} className="skills">
              {item}
              {index < req.length - 1 && " "}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-box">
        <div>
          <DynamicButton
            className="button button-small"
            text={t("join")}
            onClick={handleJoinClick}
          />
          <DynamicButton
            className="button button-small"
            text={t("favorite")}
            onClick={handleFavoriteClick}
          />
          <DynamicButton
            className="button button-small"
            text={t("share")}
            onClick={handleShareClick}
          />
          <DynamicButton
            className="button button-small"
            text={t("hide")}
            onClick={handleHideClick}
          />
        </div>
        <div className="event-spots-free"></div>
      </div>
    </div>
  );
};

EventItem.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  req: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

EventItem.defaultProps = {
  className: "",
  style: {},
};

export default EventItem;
