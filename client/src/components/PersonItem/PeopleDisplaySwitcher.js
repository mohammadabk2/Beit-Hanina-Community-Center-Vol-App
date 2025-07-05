// PeopleDisplaySwitcher.js
import React from "react";
import PropTypes from "prop-types";

import PersonItemCard from "./PersonItemCard"; // Your card component for one person
import PersonList from "./PersonList";       // Your table component for a list


// 1. Renamed component for clarity
const PeopleDisplaySwitcher = ({
  // 2. Expect an array of people objects, not individual props
  people,
  // 3. Type to switch between views ('card' or 'table')
  type,
  // 4. Pass the actual handler functions from the parent component
  //    These functions should likely expect a person ID as an argument
  approveUser,
  rejectUser,
  viewLogs,
  addLog,
  approveHours,
}) => {

  // Optional: Add loading or empty state based on the people array
  if (!people) {
    // This might indicate data is still loading in the parent
    return <div>Loading...</div>; // Or return null
  }

  if (people.length === 0) {
    return <div>No people found.</div>; // Display message if the list is empty
  }

  // --- Render based on type ---

  // 5. If type is 'table', render the PersonList component
  if (type === "table") {
    return (
      <PersonList
        people={people} // Pass the entire array
        // Pass the handler functions down
        // PersonList will delegate them to PersonItemRow, passing the relevant person ID
        approveUser={approveUser}
        rejectUser={rejectUser}
        viewLogs={(personId) => {
          const user = people.find(u => u.id === personId);
          viewLogs(personId, user?.logs || []);
        }}
        addLog={addLog}
        approveHours={approveHours}
      />
    );
  }

  // 6. If type is 'card', map over the array and render a Card for each person
  if (type === "card") {
    return (
      // Add a container div for layout (e.g., flexbox or grid)
      <div className="person-card-container">
        {people.map((person) => (
          <PersonItemCard
            key={person.id} // IMPORTANT: Use a unique key, assuming person has an 'id'
            // Pass individual props needed by PersonItemCard from the person object
            name={person.name}
            birthDate={person.birthDate}
            sex={person.sex}
            skills={person.skills}
            phoneNumber={person.phoneNumber}
            email={person.email}
            address={person.address}
            insurance={person.insurance}
            idNumber={person.idNumber}
            newUser={person.isNew} // Assuming the flag is 'isNew' on the person object
            role={person.role} // Pass the role to determine which fields to show
            // Pass handler functions, wrapping them to include the person's ID
            approveFunction={() => approveUser(person.id)}
            rejectFunction={() => rejectUser(person.id)}
            addLogFunction={() => addLog(person.id)}
            viewLogsFunction={() => viewLogs(person.id)}
            approveHoursFunction={(hours) => approveHours(person.id, hours)}
            unapprovedHours={person.unapproved_hours || 0}
            // style={person.style} // Removed top-level style, apply styling via CSS or per-card if needed
          />
        ))}
      </div>
    );
  }

  // Fallback for invalid type
  console.warn("PeopleDisplaySwitcher received invalid type:", type);
  // Render the table as a default, or null, or an error message
  return <PersonList people={people} approveUser={approveUser} rejectUser={rejectUser} viewLogs={viewLogs} addLog={addLog} approveHours={approveHours} />;
};

// 7. Update PropTypes
PeopleDisplaySwitcher.propTypes = {
  // Expect an array of person objects. Using PropTypes.shape is more specific.
  people: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Assuming an ID exists
      name: PropTypes.string,
      birthDate: PropTypes.string,
      sex: PropTypes.string,
      phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      email: PropTypes.string,
      address: PropTypes.string,
      insurance: PropTypes.string,
      idNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      skills: PropTypes.arrayOf(PropTypes.string),
      isNew: PropTypes.bool, // Assuming the flag is 'isNew'
      role: PropTypes.string, // Add role field
      unapproved_hours: PropTypes.number, // Add unapproved hours field
      // Add other expected properties within a person object
  })), // Can be .isRequired if the parent guarantees an array
  type: PropTypes.oneOf(["card", "table"]).isRequired, // Type is required
  // Handler functions passed from parent are required
  approveUser: PropTypes.func.isRequired,
  rejectUser: PropTypes.func.isRequired,
  viewLogs: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  approveHours: PropTypes.func, // Make optional for backward compatibility
};

// 8. Update DefaultProps (optional, but good practice for 'people')
PeopleDisplaySwitcher.defaultProps = {
  people: [], // Default to empty array to prevent errors if loading handled internally
  approveHours: () => {}, // Default empty function for backward compatibility
};

// 9. Export with the new name
export default PeopleDisplaySwitcher;