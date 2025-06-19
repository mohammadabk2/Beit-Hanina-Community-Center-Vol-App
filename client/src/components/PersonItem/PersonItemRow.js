import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../config/options/Colors";

// Components
import DynamicButton from "../common/ButtonComponent";
import PopupComponent from "../common/PopupComponent";
// Icons
import checkLight from "../../icons/light/check-light.svg";
import checkDark from "../../icons/dark/check-dark.svg";
import crossLight from "../../icons/light/cross-light.svg";
import crossDark from "../../icons/dark/cross-dark.svg";
import docPlusLight from "../../icons/light/document-plus-light.svg";
import docPlusDark from "../../icons/dark/document-plus-dark.svg";
import docFilledLight from "../../icons/light/document-filled-light.svg";
import docFilledDark from "../../icons/dark/document-filled-dark.svg";

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
}) => {
  const { t } = useTranslation("home");
  const { isLightMode } = useTheme();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const showSkills = () => {
    console.log("skills render");
    setIsPopupOpen(true);
  };

  return (
    // No outer div or table needed here, just the row
    <tr>
      <td>{name}</td>
      <td>{birthDate}</td>
      <td>{sex}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>
        <DynamicButton
          text={t("skills")}
          className={"button button-small"}
          onClick={showSkills}
        />
      </td>
      <td>{insurance}</td>
      <td>{idNumber}</td>
      {newUser ? (
        <>
          <td>
            <DynamicButton
              className="button button-approve"
              logoSrc={isLightMode ? checkLight : checkDark}
              logoalt={t("approve_button")}
              onClick={approveFunction}
              aria-label={`${t("approve_button")} ${name}`}
            />
          </td>
          <td>
            <DynamicButton
              className="button button-reject"
              logoSrc={isLightMode ? crossLight : crossDark}
              logoalt={t("reject_button")}
              onClick={rejectFunction}
              aria-label={`${t("reject_button")} ${name}`}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <DynamicButton
              className="button button-add"
              logoSrc={isLightMode ? docPlusLight : docPlusDark}
              logoalt={t("add_log")}
              onClick={addLogFunction}
              aria-label={`${t("add_log")} for ${name}`}
            />
          </td>
          <td>
            <DynamicButton
              className="button button-view"
              logoSrc={isLightMode ? docFilledLight : docFilledDark}
              logoalt={t("view_log")}
              onClick={viewLogsFunction}
              aria-label={`${t("view_log")} for ${name}`}
            />
          </td>
        </>
      )}

      {isPopupOpen && (
        <PopupComponent
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          message={t("skills")}
          buttonText="Cancel"
        >
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </PopupComponent>
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
};

// Update default props if needed
PersonItemRow.defaultProps = {
  skills: [],
  newUser: false,
  // Add other defaults as necessary
};

export default PersonItemRow;
