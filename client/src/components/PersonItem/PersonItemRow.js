// PersonItemRow.js
import React from "react";
import PropTypes from "prop-types";
import DynamicButton from "../ButtonComponent";
import { useTranslation } from "react-i18next";

// Renamed component to reflect its purpose (rendering a row)
const PersonItemRow = ({
  name,
  birthDate,
  sex,
  phoneNumber,
  email,
  address,
  // insurance, // Removed from direct display for brevity, but available if needed
  // idNumber,  // Removed from direct display for brevity, but available if needed
  skills,    // Keeping skills prop
  newUser,
  approveFunction,
  rejectFunction,
  viewLogsFunction,
  addLogFunction,
}) => {
  const { t } = useTranslation("homeAdmin");
  // const { t: tskill } = useTranslation("skills"); // Not needed here

  // Simple skills display (comma-separated) - adjust as needed
  // const skillsDisplay = skills ? skills.join(", ") : "N/A";

  return (
    // No outer div or table needed here, just the row
    <tr>
      <td>{name}</td>
      <td>{birthDate}</td>
      <td>{sex}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      {/*<td>{insurance}</td>*/} {/* Example: Can be added back if needed */}
      {/*<td>{idNumber}</td>*/} {/* Example: Can be added back if needed */}
      {/* <td>{skillsDisplay}</td> */} {/* Example: Skills cell */}

      {/* Action Buttons - Render appropriate buttons in shared cells */}
      {newUser ? (
        <>
          <td>
            <DynamicButton
              className="button button-approve" // Use specific classes for styling
              text={t("approve_button")}
              onClick={approveFunction}
              aria-label={`${t('approve_button')} ${name}`} // Better accessibility
            />
          </td>
          <td>
            <DynamicButton
              className="button button-reject"
              text={t("reject_button")}
              onClick={rejectFunction}
              aria-label={`${t('reject_button')} ${name}`} // Better accessibility
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <DynamicButton
              className="button button-add" // Use specific classes
              text={t("add_log")}
              onClick={addLogFunction}
              aria-label={`${t('add_log')} for ${name}`} // Better accessibility
            />
          </td>
          <td>
            <DynamicButton
              className="button button-view" // Use specific classes
              text={t("view_log")}
              onClick={viewLogsFunction}
              aria-label={`${t('view_log')} for ${name}`} // Better accessibility
            />
          </td>
        </>
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