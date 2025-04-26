import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import EventItem from "../../components/EventItem";
import PeopleDisplaySwitcher from "../../components/PersonItem/PeopleDisplaySwitcher";
import { useTheme } from "../../config/options/Colors";
import DynamicInput from "../../components/InputComponent";
import CopyRight from "../../components/CopyRight";

import CardIconDark from "../../icons/dark/card_view_icon.svg";
import TableIconDark from "../../icons/dark/table_view_icon.svg";

import CardIconLight from "../../icons/light/card_view_icon.svg";
import TableIconLight from "../../icons/light/table_view_icon.svg";

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

  // Using static data for now
  const people = initialPeople;
  //!

  const { t } = useTranslation("homeAdmin");

  const [viewMode, setViewMode] = useState("events"); // "events", "people", "createOrg"
  const [personView, setPersonView] = useState(true);

  const switchToEvents = () => setViewMode("events");
  const switchToPeople = () => {
    setViewMode("people"); // Switch view mode to "people"
    setPersonView(true); // Set personView to true by default when switching to "people"
  };
  const switchToCreateOrg = () => setViewMode("createOrg");
  const togglePersonView = () => setPersonView(!personView); // Toggle between card and table view

  const sortEvents = () => {
    console.log("Sort events button clicked");
    // Add sorting logic for events array here if needed
  };

  const sortPeople = () => {
    console.log("Sort people button clicked");
    // Add sorting logic for people array here if needed
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

  const renderEvents = () => {
    return (
      <>
        <div className="scroll-box1 general-box flex-box flex-column">
          <div className="flex-box top-scroll-box1 line-break">
            <DynamicButton
              className="button button-small"
              onClick={sortEvents}
              text={t("sort")}
            />

            <DynamicButton
              className="button button-small"
              onClick={switchToPeople}
              text={t("switch_to_people")}
            />

            <DynamicButton
              className="button button-small"
              onClick={switchToCreateOrg}
              text={t("switch_to_create_org")}
            />
          </div>
          <div className="bottom-scroll-box1">{renderEventItems(events)}</div>
        </div>
      </>
    );
  };

  const handleApprove = (personId) => {
    console.log(`Approving person ${personId}`);
    // TODO: Implement actual logic (e.g., API call, update state)
  };

  const handleReject = (personId) => {
    console.log(`Rejecting person ${personId}`);
    // TODO: Implement actual logic (e.g., API call, update state)
  };

  const handleAddLog = (personId) => {
    console.log(`Adding log for person ${personId}`);
    // TODO: Implement actual logic (e.g., show modal, navigate)
  };

  const handleViewLogs = (personId) => {
    console.log(`Viewing logs for person ${personId}`);
    // TODO: Implement actual logic (e.g., show modal, navigate)
  };

  const renderPeople = () => {
    return (
      <>
        <div className="perosnal-area-content scroll-box1 general-box flex-box flex-column">
          <div className="flex-box top-scroll-box1 line-break">
            <DynamicButton
              className="button button-small"
              onClick={sortPeople}
              text={t("sort")}
            />

            <DynamicButton
              className="button button-small"
              onClick={switchToEvents}
              text={t("switch_to_events")}
            />
            {/* //TODO give the img a class to make it bigger */}
            <img
              className="table-img"
              onClick={togglePersonView}
              src={
                personView
                  ? isLightMode
                    ? TableIconLight
                    : TableIconDark
                  : isLightMode
                  ? CardIconLight
                  : CardIconDark
              }
              alt={
                personView
                  ? t("switch_to_table_view")
                  : t("switch_to_card_view")
              }
            />

            <DynamicButton
              className="button button-small"
              onClick={switchToCreateOrg}
              text={t("switch_to_create_org")}
            />
          </div>

          <div className="bottom-scroll-box1">
            <PeopleDisplaySwitcher
              people={people}
              type={personView ? "card" : "table"}
              approveUser={handleApprove}
              rejectUser={handleReject}
              addLog={handleAddLog}
              viewLogs={handleViewLogs}
            />
          </div>
        </div>
      </>
    );
  };

  const [formData, setFormData] = useState({
    orgName: "",
    orgAddress: "",
    orgAdmin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Create Org Submit clicked");
  };

  const renderCreateOrg = () => {
    return (
      <>
        <div className="perosnal-area-content scroll-box1 general-box flex-box flex-column">
          <div className="flex-box top-scroll-box1">
            <div className="flex-box top-scroll-box1 line-break">
              <DynamicButton
                className="button button-small"
                onClick={sortEvents}
                text={t("sort")}
              />

              <DynamicButton
                className="button button-small"
                onClick={switchToPeople}
                text={t("switch_to_people")}
              />

              <DynamicButton
                className="button button-small"
                onClick={switchToEvents}
                text={t("switch_to_Events")}
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="general-box smooth-shadow-box flex-box flex-column "
            >
              <div className="flex-box flex-column input-field-box">
                <div>
                  <label> {t("orgName")} </label>
                  <label className="red-star">*</label>
                </div>

                <DynamicInput
                  className="input-field"
                  type="text"
                  value={formData.orgName}
                  name="name"
                  onChange={handleChange}
                  placeholder={t("orgName_placeholder")}
                />
              </div>

              <div className="flex-box flex-column input-field-box">
                <div>
                  <label> {t("orgAddress")} </label>
                  <label className="red-star">*</label>
                </div>

                <DynamicInput
                  className="input-field"
                  type="text"
                  value={formData.orgAddress}
                  name="name"
                  onChange={handleChange}
                  placeholder={t("orgAddress_placeholder")}
                />
              </div>

              <div className="flex-box flex-column input-field-box">
                <div>
                  <label> {t("orgAdmin")} </label>
                  <label className="red-star">*</label>
                </div>

                <DynamicInput
                  className="input-field"
                  type="text"
                  value={formData.orgAdmin}
                  name="name"
                  onChange={handleChange}
                  placeholder={t("orgAdmin_placeholder")}
                />
              </div>

              {/* //TODO add org pic */}

              <div className="flex-box">
                <DynamicButton
                  className="button button-small"
                  onClick={handleSubmit}
                  text={t("submit_button")}
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  const { isLightMode } = useTheme();

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      {viewMode === "events" && renderEvents()}
      {viewMode === "people" && renderPeople()}
      {viewMode === "createOrg" && renderCreateOrg()}
      <CopyRight />
    </div>
  );
};

export default HomeAdmin;
