import React from "react";
import PropTypes from "prop-types";

import DynamicButton from "./ButtonComponent";
import { useTranslation } from "react-i18next";

const PersonItem = ({
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
}) => {
  const { t } = useTranslation("homeAdmin");
  const { t: tsignup } = useTranslation("signUp");
  const { t: tskill } = useTranslation("skills");

  const handleApprove = () => {
    console.log("approve button clicked");
  };
  const handleReject = () => {
    console.log("reject button clicked");
  };
  const handleViewLogs = () => {
    console.log("view logs button clicked");
  };
  const handleAddLogs = () => {
    console.log("add log button clicked");
  };

  //TODO make half appear on the right and half on the left
  return (
    <div className="flex-box flex-box flex-column" style={style}>
      {/* //TODO centre the name in height */}
      <div className="event-box-title general-box">{name}</div>

      <div className="">
        <div className="general-box flex-box flex-column smooth-shadow-box">
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
                    onClick={handleReject}
                  />
                  <DynamicButton
                    className="button button-approve"
                    text={t("approve_button")}
                    onClick={handleApprove}
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
                    onClick={handleAddLogs}
                  />

                  <DynamicButton
                    className="button"
                    text={t("view_log")}
                    onClick={handleViewLogs}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PersonItem.propTypes = {
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
};

PersonItem.defaultProps = {
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

export default PersonItem;
