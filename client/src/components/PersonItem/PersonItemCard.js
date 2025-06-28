import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import DynamicButton from "../common/ButtonComponent";
import PopupComponent from "../common/PopupComponent";
import DynamicInput from "../common/InputComponent";

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
  approveHoursFunction,
  unapprovedHours = 0,
}) => {
  const { t } = useTranslation("home");
  const { t: tsignup } = useTranslation("signUp");
  const { t: tskill } = useTranslation("skills");
  const { t: tPersonal } = useTranslation("personalArea");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isApproveHoursPopupOpen, setIsApproveHoursPopupOpen] = useState(false);
  const [hoursToApprove, setHoursToApprove] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showSkills = () => {
    console.log("skills render");
    setIsPopupOpen(true);
  };

  const showApproveHours = () => {
    setIsApproveHoursPopupOpen(true);
  };

  const handleHoursChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setHoursToApprove(Math.min(value, unapprovedHours)); // Don't allow more than available
  };

  const handleApproveHours = async () => {
    if (hoursToApprove <= 0) return;
    
    setIsSubmitting(true);
    try {
      await approveHoursFunction(hoursToApprove);
      setIsApproveHoursPopupOpen(false);
      setHoursToApprove(0);
    } catch (error) {
      console.error("Error approving hours:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseApproveHours = () => {
    setHoursToApprove(0);
    setIsApproveHoursPopupOpen(false);
  };

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

              {/* <div className="flex-box">
                {Array.isArray(skills) ? (
                  skills.map((person, index) => (
                    <div key={index} className="skills">
                      {person}
                      {index < skills.length - 1 && " "}
                    </div>
                  ))
                ) : (
                  <div>N/A</div>
                )}
              </div> */}
              <DynamicButton
                text={t("skills")}
                className={"button button-small"}
                onClick={showSkills}
              />
            </div>
          </div>
        </div>

        <div className="basic-item-padding personal-area-content">
          {tsignup("phoneNumber")} {phoneNumber}
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

                <DynamicButton
                  className="button button-approve"
                  text={t("approve_hours")}
                  onClick={showApproveHours}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <PopupComponent
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          message={t("skills")}
          buttonText="Cancel"
        >
          {(skills || []).length > 0 ? (
            <ul>
              {(skills || []).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <div>No skills found</div> //TODO add translation
          )}
        </PopupComponent>
      )}

      {isApproveHoursPopupOpen && (
        <PopupComponent
          isOpen={isApproveHoursPopupOpen}
          onClose={handleCloseApproveHours}
          message={t("approve_hours")}
        >
          <div className="flex-box flex-column gap-1">
            <div className="personal-area-content">
              {t("volunteer_name")}: <strong>{name}</strong>
            </div>
            
            <div className="personal-area-content">
              {tPersonal("unapproved_hours")}: <strong>{unapprovedHours}</strong>
            </div>
            
            <div className="flex-box flex-column input-field-box">
              <div>
                <label>{t("hours_to_approve")}:</label>
                <label className="red-star">*</label>
              </div>
              <DynamicInput
                className="input-field"
                type="number"
                min="0"
                max={unapprovedHours}
                value={hoursToApprove}
                onChange={handleHoursChange}
                placeholder="0"
                disabled={unapprovedHours === 0}
              />
            </div>
            
            {unapprovedHours === 0 && (
              <div className="personal-area-content" style={{ color: "var(--text-color-secondary)" }}>
                {t("no_unapproved_hours")}
              </div>
            )}
            
            <div className="flex-box gap-1">
              <DynamicButton
                className="button button-approve"
                text={t("approve")}
                onClick={handleApproveHours}
                disabled={hoursToApprove <= 0 || unapprovedHours === 0 || isSubmitting}
              />
              <DynamicButton
                className="button button-reject"
                text={t("cancel")}
                onClick={handleCloseApproveHours}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </PopupComponent>
      )}
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
  skills: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
  newUser: PropTypes.bool,
  approveFunction: PropTypes.func.isRequired,
  rejectFunction: PropTypes.func.isRequired,
  viewLogsFunction: PropTypes.func.isRequired,
  addLogFunction: PropTypes.func.isRequired,
  approveHoursFunction: PropTypes.func,
  unapprovedHours: PropTypes.number,
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
  skills: [],
  approveHoursFunction: () => {},
  unapprovedHours: 0,
};

export default PersonItemCard;
