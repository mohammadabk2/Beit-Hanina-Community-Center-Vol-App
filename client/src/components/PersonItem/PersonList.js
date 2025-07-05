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

  // Determine if all users are organizers (for conditional headers)
  const isAllOrganizers = people.length > 0 && people.every(person => person.role === "organizer");
  // const isAllVolunteers = people.length > 0 && people.every(person => person.role === "volunteer");

  // Define table headers in the order they should appear (LTR order)
  const tableHeaders = [
    <th key="fullName">{tsignup("fullName")}</th>,
    // Only show birthDate for volunteers
    ...(isAllOrganizers ? [] : [<th key="birthDate">{tsignup("birthDate")}</th>]),
    // Only show gender for volunteers
    ...(isAllOrganizers ? [] : [<th key="gender">{tsignup("gender")}</th>]),
    <th key="phoneNumber">{tsignup("phoneNumber")}</th>,
    <th key="email">{tsignup("email")}</th>,
    <th key="address">{tsignup("address")}</th>,
    // Only show skills for volunteers
    ...(isAllOrganizers ? [] : [<th key="skills">{tsignup("skills")}</th>]),
    // Only show insurance for volunteers
    ...(isAllOrganizers ? [] : [<th key="insurance">{tsignup("insurance")}</th>]),
    // Only show idNumber for volunteers
    ...(isAllOrganizers ? [] : [<th key="idNumber">{tsignup("idNumber")}</th>]),
  ];

  // Add actions header
  const actionsHeader = (
    <th key="actions" colSpan={isNewUserList ? 2 : (isAllOrganizers ? 2 : 3)} className="actions-header">
      {t("actions")}
    </th>
  );

  // For RTL: Put actions first (rightmost), then reverse the data columns
  // For LTR: Put data columns first, then actions (leftmost)
  const allHeaders = isRTL ? [actionsHeader, ...tableHeaders.reverse()] : [...tableHeaders, actionsHeader];

  // Debug logging
  console.log('RTL Mode:', isRTL);
  console.log('Language:', i18n.language);
  console.log('Headers order:', allHeaders.map(h => h.key));

  return (
    <div className="person-table-container">
      {" "}
      {/* Optional: for overflow/scrolling */}
      <table className="person-table">
        <thead>
          <tr>
            {allHeaders}
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
              role={person.role} // Pass the role to determine which fields to show
              approveFunction={() => approveUser(person.id)}
              rejectFunction={() => rejectUser(person.id)}
              viewLogsFunction={() => viewLogs(person.id)}
              addLogFunction={() => addLog(person.id)}
              approveHoursFunction={(hours) => approveHours(person.id, hours)}
              unapprovedHours={person.unapproved_hours || 0}
              isRTL={isRTL} // Pass RTL flag to PersonItemRow
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
