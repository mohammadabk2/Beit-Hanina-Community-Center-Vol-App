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

  const handleApprove = () => {};
  const handleReject = () => {};
  const handleViewLogs = () => {};
  const handleAddLogs = () => {};

  //TODO make half appear on the right and half on the left
  return (
    <div className="flex-box top-scroll-box1" style={style}>
      <div className="event-box-title">{name}</div>

      <div className="flex-box bottom-scroll-box1">
        <div className="flex-box flex-column">
          <div>
            {tsignup("birthDate")} {birthDate}
          </div>

          <div>
            {tsignup("address")}
            {address}
          </div>

          <div>
            {tsignup("gender")} {sex}
          </div>

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
        <div className="flex-box flex-column">
          <div>
            {tsignup("phoneNumber")}
            {phoneNumber}
          </div>

          <div>
            {tsignup("email")}
            {email}
          </div>

          <div>
            {tsignup("insurance")}
            {insurance}
          </div>

          <div>
            {tsignup("idNumber")} {idNumber}
          </div>
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
