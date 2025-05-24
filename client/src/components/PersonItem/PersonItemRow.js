// PersonItemRow.js
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../config/options/Colors";
import { ReactComponent as CheckDark } from "../../icons/dark/check-dark.svg";
import { ReactComponent as CheckLight } from "../../icons/light/check-light.svg";
import { ReactComponent as CrossDark } from "../../icons/dark/cross-dark.svg";
import { ReactComponent as CrossLight } from "../../icons/light/cross-light.svg";
import { ReactComponent as DocFilledDark } from "../../icons/dark/document-filled-dark.svg";
import { ReactComponent as DocFilledLight } from "../../icons/light/document-filled-light.svg";
import { ReactComponent as DocPlusDark } from "../../icons/dark/document-plus-dark.svg";
import { ReactComponent as DocPlusLight } from "../../icons/light/document-plus-light.svg";

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
  // skills, //! uncomment when added
  newUser,
  approveFunction,
  rejectFunction,
  viewLogsFunction,
  addLogFunction,
}) => {
  const { isLightMode } = useTheme();

  return (
    // No outer div or table needed here, just the row
    <tr>
      <td>{name}</td>
      <td>{birthDate}</td>
      <td>{sex}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{insurance}</td> {/* Example: Can be added back if needed */}
      <td>{idNumber}</td> {/* Example: Can be added back if needed */}
      {/* <td>{skillsDisplay}</td> */} {/* Example: Skills cell */}
      {/* Action Buttons - Render appropriate buttons in shared cells */}
      {newUser ? (
        <>
          <td>
            <div
              className="button button-approve button-icon-only"
              onClick={approveFunction}
            >
              {isLightMode ? (
                <CheckLight className="icon-svg" />
              ) : (
                <CheckDark className="icon-svg" />
              )}
            </div>
          </td>
          <td>
            <div
              className="button button-reject button-icon-only"
              onClick={rejectFunction}
            >
              {isLightMode ? (
                <CrossLight className="icon-svg" />
              ) : (
                <CrossDark className="icon-svg" />
              )}
            </div>
          </td>
        </>
      ) : (
        <>
          <td>
            <div
              className="button button-add button-icon-only"
              onClick={addLogFunction}
            >
              {isLightMode ? (
                <DocPlusLight className="icon-svg" />
              ) : (
                <DocPlusDark className="icon-svg" />
              )}
            </div>
          </td>
          <td>
            <div
              className="button button-view button-icon-only"
              onClick={viewLogsFunction}
            >
              {isLightMode ? (
                <DocFilledLight className="icon-svg" />
              ) : (
                <DocFilledDark className="icon-svg" />
              )}
            </div>
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
