import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import DynamicButton from "../../components/common/ButtonComponent";
import DynamicInput from "../../components/common/InputComponent";
import EventItem from "../../components/EventItem";
import SelectComponent from "../../components/common/SelectComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

// import context and hooks
import { useAuth } from "../../config/Context/auth";
import useLoadEvents from "../../config/hooks/loadEvent";
// import useLoadUsers from "../../config/hooks/loadUsers";

const HomeOrganizer = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t } = useTranslation("home");

  const { userId, loadingInitial, isAuthenticated, token } = useAuth();
  const { events, eventsLoading, eventsError, loadEvents } = useLoadEvents();
  // const { users, usersLoading, userError, loadUsers } = useLoadUsers();

  const [showEvents, setShowEvents] = useState(true); // Use useState!
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    orgId: userId, // set when sending it
    maxNumberOfVolunteers: "",
    eventLocation: "",
    eventDescription: "",
    skills: [], // Initialize skills as an array
  });

  useEffect(() => {
    if (userId && isAuthenticated) {
      loadEvents(["approved"]);
    }
  }, [userId, isAuthenticated, loadEvents]);

  // useEffect(() => {
  //   if (userId && isAuthenticated) {
  //     loadUsers("users");
  //   }
  // }, [userId, isAuthenticated, loadUsers]);

  if (loadingInitial) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this data.</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowEvents = () => {
    console.log("Show Events button clicked!");
    setShowEvents(true); // Update state using the setter function
  };

  const handleCreateEvents = () => {
    console.log("Create Events button clicked!");
    setShowEvents(false); // Update state using the setter function
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const response = await axios.post(
      `${API_BASE_URL}/api/events`,
      {
        userID: userId,
        userData: formData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      console.log(`${response.status} ${response.message}`);
    }
  };

  const sortEvents = () => {
    console.log("Sort button clicked");
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
        type="org"
        count={event.currentSize}
        size={event.maxSize}
        eventLocation={event.location}
      />
    ));
  };

  const renderCreateEvent = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="general-box flex-box flex-column smooth-shadow-box"
        >
          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_name")}: <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="text"
              value={formData.eventName}
              name="eventName"
              onChange={handleChange}
              placeholder={t("event_name_placeholder")}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_date")}: <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="date"
              value={formData.eventDate}
              name="eventDate"
              onChange={handleChange}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_start")}: <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="time"
              value={formData.eventStartTime}
              name="eventStartTime"
              onChange={handleChange}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_end")}: <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="time"
              value={formData.eventEndTime}
              name="eventEndTime"
              onChange={handleChange}
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              <label> {t("volunteer_count")}: </label>
              <label className="red-star">*</label>
            </div>
            <DynamicInput
              className="input-field"
              type="text"
              value={formData.maxNumberOfVolunteers}
              name="maxNumberOfVolunteers"
              onChange={handleChange}
              placeholder={t("event_count_placeholder")}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>

          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_location")}: <label className="red-star">*</label>
            </div>

            <DynamicInput
              className="input-field"
              type="text"
              value={formData.eventLocation}
              name="eventLocation"
              onChange={handleChange}
              placeholder={t("event_location_placeholder")}
            />
          </div>

          <SelectComponent
            type="skills"
            onChange={handleChange}
            chosen={formData.skills}
          />

          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_description")}: <label className="red-star">*</label>
            </div>

            <textarea
              value={formData.eventDescription}
              name="eventDescription"
              rows={5}
              cols={50}
              className="input-field"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex-box">
            <DynamicButton
              className="button"
              onClick={handleShowEvents}
              text={t("back")}
              type="button"
            />

            <DynamicButton
              className="button"
              text={t("create_event")}
              type="submit"
            />
          </div>
        </form>
      </>
    );
  };

  const renderShowEvents = () => {
    return (
      <>
        <div className="scroll-box1 flex-box flex-column">
          <div className="flex-box flex-column top-scroll-box1 line-break">
            <div>
              <DynamicButton
                className="button button-small"
                onClick={sortEvents}
                text={t("sort")}
              />

              <DynamicButton
                className="button button-small"
                onClick={handleCreateEvents}
                text={t("create_event")}
              />
            </div>
          </div>
          <div className="bottom-scroll-box1">{renderEventItems(events)}</div>
        </div>
      </>
    );
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      {eventsLoading && <p>{t("loading_events")}</p>}
      {eventsError && <p style={{ color: "red" }}>{eventsError}</p>}
      {/* {!eventsLoading && !eventsError && renderShowEvents()}
      {!showEvents && renderCreateEvent()} */}
      {!eventsLoading &&
        !eventsError &&
        (showEvents ? renderShowEvents() : renderCreateEvent())}
      <CopyRight />
    </div>
  );
};

export default HomeOrganizer;
