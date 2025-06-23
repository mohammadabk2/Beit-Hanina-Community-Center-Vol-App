// PersonList.js
import React from "react";
import PropTypes from "prop-types";
import PersonItemRow from "./PersonItemRow"; // Renamed component
import { useTranslation } from "react-i18next";

const PersonList = ({ people, approveUser, rejectUser, viewLogs, addLog }) => {
  const { t } = useTranslation("home");
  const { t: tsignup } = useTranslation("signUp");
  // const { t: tskill } = useTranslation("skills"); // For skills column if needed

  // Determine which set of actions apply (assuming all people in the list are either new or existing)
  // If it's mixed, you'll need to pass 'isNew' down to PersonItemRow
  const isNewUserList = people.length > 0 ? people[0].isNew : false; // Example logic

  return (
    <div className="person-table-container">
      {" "}
      {/* Optional: for overflow/scrolling */}
      <table className="person-table">
        <thead>
          <tr>
            {/* Keep only relevant headers */}
            <th>{tsignup("fullName")}</th>
            <th>{tsignup("birthDate")}</th>
            <th>{tsignup("gender")}</th>
            <th>{tsignup("phoneNumber")}</th>
            <th>{tsignup("email")}</th>
            <th>{tsignup("address")}</th>
            <th>{tsignup("skills")}</th>
            {/* Maybe add Insurance/ID later if needed, or show in details view */}
            <th>{tsignup("insurance")}</th>
            <th>{tsignup("idNumber")}</th>
            <th colSpan={isNewUserList ? 2 : 2} className="actions-header">
              {" "}
              {/* Adjust colSpan */}
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PersonItemRow
              key={person.id}
              name={person.name}
              birthDate={person.birthDate}
              sex={person.sex}
              phoneNumber={person.phoneNumber}
              email={person.email}
              address={person.address}
              skills={person.skills}
              insurance={person.insurance}
              idNumber={person.idNumber}
              newUser={person.isNew}
              approveFunction={() => approveUser(person.id)}
              rejectFunction={() => rejectUser(person.id)}
              addLogFunction={() => addLog(person.id)}
              logs={person.logs}
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
  viewLogs: undefined, // Remove this propType
  addLog: PropTypes.func.isRequired,
};

PersonList.defaultProps = {
  people: [], // Default to an empty array
};

export default PersonList;
