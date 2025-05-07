import React from "react";
import PropTypes from "prop-types";

import DynamicButton from "../ButtonComponent";
import { useTranslation } from "react-i18next";

const PersonItemCard = ({
  name,
  birthDate,
  sex,
  phoneNumber,
  email,
  address,
  insurance,
  idNumber,
  skills,
  style,
  newUser,
  approveFunction,
  rejectFunction,
  viewLogsFunction,
  addLogFunction,
}) => {
  const { t } = useTranslation("home");
  const { t: tsignup } = useTranslation("signUp");
  const { t: tskill } = useTranslation("skills");

  //TODO make half appear on the right and half on the left
  return (
    <div
      className="flex-box flex-column event-box smooth-shadow-box"
      style={style}
    >
      {/* //TODO centre the name in height */}
      {/* <div className="event-box-title general-box">{name}</div> */}
      <div className="top-user-box line-break">{name}</div>
      <div className="bottom-user-box flex-box flex-column">
        <div className="basic-item-padding personal-area-content">
          {tsignup("birthDate")} {birthDate}
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("address")} {address}
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("gender")} {sex}
        </div>

        <div className="basic-item-padding personal-area-content">
          <div className="flex-box">
            <div className="flex-box flex-column">
              <div>{tskill("skills")}:</div>

              <div className="flex-box">
                {skills.map((person, index) => (
                  <div key={index} className="skills">
                    {person}
                    {index < skills.length - 1 && " "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("phoneNumber")}: {phoneNumber}
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("email")} {email}
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("insurance")} {insurance}
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("idNumber")} {idNumber}
        </div>

        <div>
          {newUser && (
            <>
              <div className="flex-box">
                <DynamicButton
                  className="button button-reject"
                  text={t("reject_button")}
                  onClick={rejectFunction}
                />
                <DynamicButton
                  className="button button-approve"
                  text={t("approve_button")}
                  onClick={approveFunction}
                />
              </div>
              {/* //TODO add view events button for user */}
            </>
          )}
          {!newUser && (
            <>
              <div className="flex-box">
                {/* TODO add plus icon */}
                <DynamicButton
                  className="button"
                  text={t("add_log")}
                  onClick={addLogFunction}
                />

                <DynamicButton
                  className="button"
                  text={t("view_log")}
                  onClick={viewLogsFunction}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

PersonItemCard.propTypes = {
  name: PropTypes.string,
  birthDate: PropTypes.string,
  sex: PropTypes.string,
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  email: PropTypes.string,
  address: PropTypes.string,
  insurance: PropTypes.string,
  idNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object,
  newUser: PropTypes.bool,
  approveFunction: PropTypes.func.isRequired,
  rejectFunction: PropTypes.func.isRequired,
  viewLogsFunction: PropTypes.func.isRequired,
  addLogFunction: PropTypes.func.isRequired,
};

PersonItemCard.defaultProps = {
  style: {},
  email: "",
  address: "",
  Insurance: "",
  idNumber: "",
  birthDate: "",
  sex: "",
  phoneNumber: "",
  name: "",
};

export default PersonItemCard;
