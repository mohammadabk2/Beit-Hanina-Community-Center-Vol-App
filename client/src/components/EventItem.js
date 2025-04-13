import React, { useState } from "react";
import PropTypes from "prop-types";

import DynamicButton from "./ButtonComponent";
import { useTranslation } from "react-i18next";
import logoIcon from "../icons/org_icon.png";
import personIcon from "../icons/person_icon.svg";
import fullStar from "../icons/favorite_icon.svg";
import emptyStar from "../icons/not_favorite_icon.svg";

const EventItem = ({ name, desc, className, style, req, type, count, size }) => {
  const { t } = useTranslation("homeVol");
  const { t: tskill } = useTranslation("skills");

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVolClick = () => console.log("Join button clicked");
  const handleOrgClick = () => console.log("org button clicked");
  const handleApproveClick = () => console.log("approve button clicked");
  const handleRejectClick = () => console.log("reject button clicked");

  return (
    <div className={className} style={style}>
      <div className="event-box-content-top">
        <div className="event-box-title">{name}</div>
        <div className="event-box-favorite">
          <img
            onClick={handleFavorite}
            className="favorite-button-image"
            src={isFavorite ? fullStar : emptyStar}
            alt="Fav Icon"
          />
        </div>
      </div>

      <div className="flex-box event-box-content-middle">
        <div>
          <img className="event-box-image" src={logoIcon} alt="Logo Icon" />
        </div>
        <div className="flex-box flex-column">
          <div>{tskill("skills")}:</div>
          <div className="flex-box">
            {req.map((item, index) => (
              <div key={index} className="skills">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-box event-box-content-bottom" style={{ flexDirection: "column", alignItems: "flex-start" }}>
        {/* ✅ الجزء السفلي - الزر وعدد المتطوعين */}
        <div className="flex-box" style={{ width: "100%", justifyContent: "space-between" }}>
          <div className="flex-box">
            <div className={count >= size ? "event-spots-full" : "event-spots-free"}></div>
            <div>
              {count}/{size}
            </div>
            <img className="button-image" src={personIcon} alt="Person Icon" />
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

        {/* ✅ وصف الحدث بأسفل الشريحة */}
        {desc && (
          <div className="event-box-description">
            {desc}
          </div>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  req: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  count: PropTypes.number,
  size: PropTypes.number,
};

EventItem.defaultProps = {
  className: "",
  style: {},
};

export default EventItem;
