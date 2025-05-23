import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import axios from "axios";

import DynamicButton from "../../components/common/ButtonComponent";
import EventItem from "../../components/EventItem";
import PeopleDisplaySwitcher from "../../components/PersonItem/PeopleDisplaySwitcher";
import { useTheme } from "../../config/options/Colors";
import DynamicInput from "../../components/common/InputComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

import CardIconDark from "../../icons/dark/card_view_icon.svg";
import TableIconDark from "../../icons/dark/table_view_icon.svg";

import CardIconLight from "../../icons/light/card_view_icon.svg";
import TableIconLight from "../../icons/light/table_view_icon.svg";

// import context and hooks
import { useAuth } from "../../config/Context/auth";
import useLoadEvents from "../../config/hooks/useEvent";

const HomeAdmin = () => {
  // const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t } = useTranslation("home");
  const { isLightMode } = useTheme();

  const [viewMode, setViewMode] = useState("events"); // "events", "people", "createOrg"
  const [personView, setPersonView] = useState(true);
  const personContainerRef = useRef(null); // For attatching to person table to change sizing dynamically

  const people = [""]; //! change it wont work like this

  const switchToEvents = () => setViewMode("events");
  const switchToPeople = () => {
    setViewMode("people"); // Switch view mode to "people"
    setPersonView(true); // Set personView to true by default when switching to "people"
  };
  const switchToCreateOrg = () => setViewMode("createOrg");
  // To switch between card to table view whith appropriate sizes
  const togglePersonView = () => {
    setPersonView((personView) => {
      const newPersonView = !personView;
      if (personContainerRef.current) {
        if (personView) {
          personContainerRef.current.classList.add("perosnal-area-content");
        } else {
          personContainerRef.current.classList.remove("perosnal-area-content");
        }
      }
      return newPersonView;
    });
  };

  const sortEvents = () => {
    console.log("Sort events button clicked");
    //TODO Add sorting logic for events array here if needed
  };

  const sortPeople = () => {
    console.log("Sort people button clicked");
    //TODO Add sorting logic for people array here if needed
  };

  const renderEventItems = (eventsArray) => {
    if (!Array.isArray(eventsArray) || eventsArray.length === 0) {
      return <p>{t("no_events_found")}</p>; // Or any other placeholder
    }

    return eventsArray.map((event) => (
      <EventItem
        key={event.id}
        name={event.name}
        desc={event.description}
        req={event.requirements || []} // Assuming 'requirements' might exist, fallback to empty array
        type="admin"
        count={event.currentSize}
        size={event.maxSize}
        eventLocation={event.location}
      />
    ));
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
        <div
          ref={personContainerRef}
          className="scroll-box1 flex-box flex-column"
        >
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create Org Submit clicked", formData);
  };

  const renderCreateOrg = () => {
    return (
      <>
        <div className="general-box flex-box flex-column">
          <div className="flex-box line-break">
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
            className="flex-box flex-column input-field-box"
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
                name="address"
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
      </>
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

  const { userId, loadingInitial, isAuthenticated } = useAuth();
  const { events, eventsLoading, eventsError, loadEvents } = useLoadEvents();

  useEffect(() => {
    if (userId && isAuthenticated) {
      loadEvents(["approved"]);
    }
  }, [userId, isAuthenticated, loadEvents]);

  if (loadingInitial) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this data.</div>;
  }

  console.log("Current viewMode:", viewMode);
  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      {viewMode === "events" && (
        <>
          {eventsLoading && <p>{t("loading_events")}</p>}
          {eventsError && <p style={{ color: "red" }}>{eventsError}</p>}
          {!eventsLoading && !eventsError && renderEvents()}
        </>
      )}
      {viewMode === "people" && renderPeople()}
      {viewMode === "createOrg" && renderCreateOrg()}
      <CopyRight />
    </div>
  );
};

export default HomeAdmin;
