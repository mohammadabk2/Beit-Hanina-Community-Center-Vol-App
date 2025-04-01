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
}) => {
  const { t } = useTranslation("homeAdmin");
  const { t: tsignup } = useTranslation("signUp");
  const { t: tskill } = useTranslation("skills");

  const handleApproveClick = () => {};
  const handleRejectClick = () => {};

  //TODO make half appear on the right and half on the left
  return (
    <div className="top-scroll-box1" style={style}>
      <div className="event-box-content-top ">
        <div className="event-box-title">
          <label>{tsignup("fullName")} </label> {name}
        </div>

        <div className="bottom-scroll-box1">
          <div className="flex-box flex-column left-side">
            <div>
              <label>{tsignup("birthDate")} </label> {birthDate}
            </div>
            <div>
              <label>{tsignup("address")} </label>
              {address}
            </div>
            <div>
              <label>{tsignup("gender")} </label> {sex}
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

            <DynamicButton
              className="button button-approve"
              text={t("approve_button")}
              onClick={handleApproveClick}
            />
          </div>

          <div className="flex-box flex-column right-side">
            <div>
              <label>{tsignup("phoneNumber")} </label>
              {phoneNumber}
            </div>
            <div>
              <label>{tsignup("email")} </label>
              {email}
            </div>
            <div>
              <label>{tsignup("insurance")} </label>
              {insurance}
            </div>
            <div>
              <label>{tsignup("idNumber")} </label>
              {idNumber}
            </div>

            <DynamicButton
              className="button button-reject"
              text={t("reject_button")}
              onClick={handleRejectClick}
            />
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
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Corrected proptype for phoneNumber
  email: PropTypes.string,
  address: PropTypes.string,
  insurance: PropTypes.string,
  idNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Corrected proptype for idNumber
  skills: PropTypes.arrayOf(PropTypes.string).isRequired, // Added propTypes for skills
  style: PropTypes.object, // Added proptype for style.
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
