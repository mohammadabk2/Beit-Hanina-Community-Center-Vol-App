import React, { useState } from "react"; // Added useEffect if you plan fetching data later
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import EventItem from "../../components/EventItem";
// 1. Import the correct switcher component
import PeopleDisplaySwitcher from "../../components/PersonItem/PeopleDisplaySwitcher"; // Adjust path if needed

const HomeAdmin = () => {
  //! testing only - Added unique IDs and changed 'newUser' to 'isNew'
  const events = [
    // ... (your events data remains the same)
    {
      id: "evt1",
      name: "test event1",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      id: "evt2",
      name: "test event2",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      id: "evt3",
      name: "test event3",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      id: "evt4",
      name: "test event4",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
  ];

  const initialPeople = [
    // Renamed to initialPeople for clarity if using state later
    {
      id: "person1", // Added unique ID
      name: "Alice", // Changed names for clarity
      sex: "female",
      birthDate: "01/01/2000",
      age: 25, // Age might be derived from birthDate usually
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill1", "skill2"],
      phoneNumber: "1234567891",
      email: "alice@gmail.com",
      address: "1st street",
      insurance: "clalit",
      idNumber: "111111111",
      isNew: true, // Changed from newUser to isNew
    },
    {
      id: "person2", // Added unique ID
      name: "Bob",
      sex: "male",
      birthDate: "05/05/1995",
      age: 29,
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill3", "skill4"],
      phoneNumber: "9876543210",
      email: "bob@gmail.com",
      address: "2nd street",
      insurance: "maccabi",
      idNumber: "222222222",
      isNew: false, // Changed from newUser to isNew
    },
    {
      id: "person3", // Added unique ID
      name: "Charlie",
      sex: "male",
      birthDate: "10/10/2002",
      age: 22,
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill1", "skill5"],
      phoneNumber: "1231231234",
      email: "charlie@gmail.com",
      address: "3rd avenue",
      insurance: "leumit",
      idNumber: "333333333",
      isNew: true, // Changed from newUser to isNew
    },
    // Add more unique people as needed
  ];
  //!

  // If you fetch data, you'll use useState:
  // const [people, setPeople] = useState([]);
  // const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   fetchPeopleData().then(data => setPeople(data || []));
  //   fetchEventsData().then(data => setEvents(data || []));
  // }, []);

  // Using static data for now
  const people = initialPeople;

  const { t } = useTranslation("homeAdmin");

  const [showEvents, setShowEvents] = useState(true);
  const [personView, setPersonView] = useState(true); // true = card, false = table

  const switchMode = () => {
    setShowEvents(!showEvents);
  };

  const sortEvents = () => {
    console.log("Sort events button clicked");
    // Add sorting logic for events array here if needed
  };

  const sortPeople = () => {
    console.log("Sort people button clicked");
    // Add sorting logic for people array here if needed
  };

  const handleChange = () => {
    setPersonView(!personView);
  };

  // --- Event Rendering --- (Remains the same)
  const renderEventItems = (eventsArray) => {
    return eventsArray.map(
      (
        event // Use event.id for key
      ) => (
        <EventItem
          key={event.id}
          name={event.name}
          desc={event.desc}
          req={event.req}
          className="flex-box flex-column event-box smooth-shadow-box"
          type="admin"
          count={event.count}
          size={event.size}
        />
      )
    );
  };

  // --- People Action Handlers ---
  // 4. Define handlers that PeopleDisplaySwitcher expects
  const handleApprove = (personId) => {
    console.log(`Approving person ${personId}`);
    // TODO: Implement actual logic (e.g., API call, update state)
    // Example state update (if using state):
    // setPeople(prevPeople => prevPeople.map(p =>
    //   p.id === personId ? { ...p, isNew: false } : p
    // ));
  };

  const handleReject = (personId) => {
    console.log(`Rejecting person ${personId}`);
    // TODO: Implement actual logic (e.g., API call, update state)
    // Example state update (if using state):
    // setPeople(prevPeople => prevPeople.filter(p => p.id !== personId));
  };

  const handleAddLog = (personId) => {
    console.log(`Adding log for person ${personId}`);
    // TODO: Implement actual logic (e.g., show modal, navigate)
  };

  const handleViewLogs = (personId) => {
    console.log(`Viewing logs for person ${personId}`);
    // TODO: Implement actual logic (e.g., show modal, navigate)
  };

  // 2. renderPeopleItems function is no longer needed for mapping
  // const renderPeopleItems = (peopleArray) => { ... } // DELETE THIS FUNCTION

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      {/* --- Events Section --- */}
      {showEvents ? (
        <>
          <div className="scroll-box1 general-box flex-box flex-column">
            <div className="flex-box flex-column top-scroll-box1 line-break">
              <div>
                <DynamicButton
                  className="button button-small"
                  onClick={sortEvents}
                  text={t("sort")}
                />
                <DynamicButton
                  className="button button-small"
                  onClick={switchMode}
                  text={t("switch_to_people")}
                />
              </div>
            </div>
            <div className="bottom-scroll-box1">{renderEventItems(events)}</div>
          </div>
        </>
      ) : (
        <>
          <div className="perosnal-area-content flex-box flex-column">
            <div className="flex-box flex-column top-scroll-box1 line-break">
              <div>
                <DynamicButton
                  className="button button-small"
                  onClick={sortPeople}
                  text={t("sort")}
                />
                <DynamicButton
                  className="button button-small"
                  onClick={switchMode}
                  text={t("switch_to_events")}
                />
                <DynamicButton
                  text={
                    personView
                      ? t("switch_to_table_view")
                      : t("switch_to_card_view")
                  } // More descriptive text
                  onClick={handleChange}
                  className="button button-small"
                />
              </div>
            </div>
            <div className="bottom-scroll-box1">
              {/* 3. Render PeopleDisplaySwitcher directly */}
              <PeopleDisplaySwitcher
                people={people} // Pass the whole array
                type={personView ? "card" : "table"} // Calculate type
                // Pass the handler functions
                approveUser={handleApprove}
                rejectUser={handleReject}
                addLog={handleAddLog}
                viewLogs={handleViewLogs}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeAdmin;
