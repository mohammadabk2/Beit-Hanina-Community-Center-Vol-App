import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../config/options/Colors";

// Components
import DynamicButton from "../common/ButtonComponent";
import PopupComponent from "../common/PopupComponent";
import DynamicInput from "../common/InputComponent";
// Icons
import checkLight from "../../icons/light/check-light.svg";
import checkDark from "../../icons/dark/check-dark.svg";
import crossLight from "../../icons/light/cross-light.svg";
import crossDark from "../../icons/dark/cross-dark.svg";
import docPlusLight from "../../icons/light/document-plus-light.svg";
import docPlusDark from "../../icons/dark/document-plus-dark.svg";
import docFilledLight from "../../icons/light/document-filled-light.svg";
import docFilledDark from "../../icons/dark/document-filled-dark.svg";
import clockLight from "../../icons/light/clock-light.svg";
import clockDark from "../../icons/dark/clock-dark.svg";

// Renamed component to reflect its purpose (rendering a row)
const PersonItemRow = ({
  name,
  birthDate,
  sex,
  phoneNumber,
  email,
  address,
  insurance, // Removed from direct display for brevity, but available if needed
  idNumber, // Removed from direct display for brevity, but available if needed
  skills,
  newUser,
  approveFunction,
  rejectFunction,
  viewLogsFunction,
  addLogFunction,
  approveHoursFunction,
  unapprovedHours = 0,
}) => {
  const { t, i18n } = useTranslation("home");
  // const { t: tPersonal } = useTranslation("personalArea");
  const { isLightMode } = useTheme();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isApproveHoursPopupOpen, setIsApproveHoursPopupOpen] = useState(false);
  const [hoursToApprove, setHoursToApprove] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if current language is Arabic for RTL layout
  const isRTL = i18n.language === "ar";

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

  // Define table cells in the order they should appear
  const tableCells = [
    <td key="name">{name}</td>,
    <td key="birthDate">{birthDate}</td>,
    <td key="sex">{sex}</td>,
    <td key="phoneNumber">{phoneNumber}</td>,
    <td key="email">{email}</td>,
    <td key="address">{address}</td>,
    <td key="skills">
      <DynamicButton
        text={t("skills")}
        className={"button button-small"}
        onClick={showSkills}
      />
    </td>,
    <td key="insurance">{insurance}</td>,
    <td key="idNumber">{idNumber}</td>,
  ];

  // Add action buttons based on user type
  const actionCells = newUser ? (
    [
      <td key="approve">
        <DynamicButton
          className="button button-approve"
          logoSrc={isLightMode ? checkLight : checkDark}
          logoalt={t("approve_button")}
          onClick={approveFunction}
          aria-label={`${t("approve_button")} ${name}`}
        />
      </td>,
      <td key="reject">
        <DynamicButton
          className="button button-reject"
          logoSrc={isLightMode ? crossLight : crossDark}
          logoalt={t("reject_button")}
          onClick={rejectFunction}
          aria-label={`${t("reject_button")} ${name}`}
        />
      </td>,
    ]
  ) : (
    [
      <td key="add">
        <DynamicButton
          className="button button-add"
          logoSrc={isLightMode ? docPlusLight : docPlusDark}
          logoalt={t("add_log")}
          onClick={addLogFunction}
          aria-label={`${t("add_log")} for ${name}`}
        />
      </td>,
      <td key="view">
        <DynamicButton
          className="button button-view"
          logoSrc={isLightMode ? docFilledLight : docFilledDark}
          logoalt={t("view_log")}
          onClick={viewLogsFunction}
          aria-label={`${t("view_log")} for ${name}`}
        />
      </td>,
      <td key="approveHours">
        <DynamicButton
          className="button button-approve"
          logoSrc={isLightMode ? clockLight : clockDark}
          logoalt={t("approve_hours")}
          onClick={showApproveHours}
          aria-label={`${t("approve_hours")} for ${name}`}
        />
      </td>,
    ]
  );

  // Combine all cells and reverse order for RTL
  const allCells = [...tableCells, ...actionCells];
  const orderedCells = isRTL ? allCells.reverse() : allCells;

  return (
    // No outer div or table needed here, just the row
    <tr>
      {orderedCells}
      
      {isPopupOpen && ReactDOM.createPortal(
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
        </PopupComponent>,
        document.body
      )}

      {isApproveHoursPopupOpen && ReactDOM.createPortal(
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
              {t("unapproved_hours")}: <strong>{unapprovedHours}</strong>
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
        </PopupComponent>,
        document.body
      )}
    </tr>
  );
};

// Keep PropTypes, update as needed based on data structure
PersonItemRow.propTypes = {
  name: PropTypes.string,
  birthDate: PropTypes.string,
  sex: PropTypes.string,
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  email: PropTypes.string,
  address: PropTypes.string,
  insurance: PropTypes.string, // Keep if passed, even if not displayed
  idNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Keep if passed
  skills: PropTypes.arrayOf(PropTypes.string), // Updated prop type
  newUser: PropTypes.bool,
  approveFunction: PropTypes.func.isRequired,
  rejectFunction: PropTypes.func.isRequired,
  viewLogsFunction: PropTypes.func.isRequired,
  addLogFunction: PropTypes.func.isRequired,
  approveHoursFunction: PropTypes.func,
  unapprovedHours: PropTypes.number,
};

// Update default props if needed
PersonItemRow.defaultProps = {
  skills: [],
  newUser: false,
  approveHoursFunction: () => {},
  unapprovedHours: 0,
  // Add other defaults as necessary
};

export default PersonItemRow;
