// PersonList.js
import React from "react";
import PropTypes from "prop-types";
import PersonItemRow from "./PersonItemRow"; // Renamed component
import { useTranslation } from "react-i18next";

const PersonList = ({ people, approveUser, rejectUser, viewLogs, addLog, approveHours }) => {
  const { t, i18n } = useTranslation("home");
  const { t: tsignup } = useTranslation("signUp");
  // const { t: tskill } = useTranslation("skills"); // For skills column if needed

  // Check if current language is Arabic for RTL layout
  const isRTL = i18n.language === "ar";

  // Determine which set of actions apply (assuming all people in the list are either new or existing)
  // If it's mixed, you'll need to pass 'isNew' down to PersonItemRow
  const isNewUserList = people.length > 0 ? people[0].isNew : false; // Example logic

  // Define table headers in the order they should appear
  const tableHeaders = [
    <th key="fullName">{tsignup("fullName")}</th>,
    <th key="birthDate">{tsignup("birthDate")}</th>,
    <th key="gender">{tsignup("gender")}</th>,
    <th key="phoneNumber">{tsignup("phoneNumber")}</th>,
    <th key="email">{tsignup("email")}</th>,
    <th key="address">{tsignup("address")}</th>,
    <th key="skills">{tsignup("skills")}</th>,
    <th key="insurance">{tsignup("insurance")}</th>,
    <th key="idNumber">{tsignup("idNumber")}</th>,
  ];

  // Add actions header
  const actionsHeader = (
    <th key="actions" colSpan={isNewUserList ? 2 : 3} className="actions-header">
      {t("actions")}
    </th>
  );

  // Combine all headers and reverse order for RTL
  const allHeaders = [...tableHeaders, actionsHeader];
  const orderedHeaders = isRTL ? allHeaders.reverse() : allHeaders;

  return (
    <div className="person-table-container">
      {" "}
      {/* Optional: for overflow/scrolling */}
      <table className="person-table">
        <thead>
          <tr>
            {orderedHeaders}
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PersonItemRow
              key={person.id} // Assuming each person has a unique ID
              name={person.name}
              birthDate={person.birthDate}
              sex={person.sex}
              phoneNumber={person.phoneNumber}
              email={person.email}
              address={person.address}
              skills={person.skills} // Pass skills
              insurance={person.insurance} // Pass data even if not displayed in main table
              idNumber={person.idNumber} // Pass data even if not displayed in main table
              newUser={person.isNew} // Pass the flag per person
              approveFunction={() => approveUser(person.id)}
              rejectFunction={() => rejectUser(person.id)}
              viewLogsFunction={() => viewLogs(person.id)}
              addLogFunction={() => addLog(person.id)}
              approveHoursFunction={(hours) => approveHours(person.id, hours)}
              unapprovedHours={person.unapproved_hours || 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired, // Assuming an array of person objects
  approveUser: PropTypes.func.isRequired,
  rejectUser: PropTypes.func.isRequired,
  viewLogs: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  approveHours: PropTypes.func.isRequired,
};

PersonList.defaultProps = {
  people: [], // Default to an empty array
};

export default PersonList;
