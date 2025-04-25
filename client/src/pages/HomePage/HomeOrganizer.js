import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import EventItem from "../../components/EventItem";
import SelectComponent from "../../components/SelectComponent";

const HomeOrganizer = () => {
  //! testing only
  const events = [
    {
      name: "test event1",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      name: "test event2",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      name: "test event3",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
    {
      name: "test event4",
      desc: "some desc",
      req: ["test", "test", "test", "test"],
      count: 5,
      size: 10,
    },
  ];
  //!

  const { t } = useTranslation("homeOrg");
  const [showEvents, setShowEvents] = useState(true); // Use useState!

  const [formData, setFormData] = useState({
    eventName: "",
    eventCount: "",
    eventDate: "",
    eventDescription: "",
    eventLocation: "",
    skills: [], // Initialize skills as an array
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const sortEvents = () => {
    console.log("Sort button clicked");
  };

  const renderEventItems = (eventsArray) => {
    return eventsArray.map((event, index) => (
      <EventItem
        key={index}
        name={event.name}
        desc={event.desc}
        req={event.req}
        className="flex-box flex-column event-box smooth-shadow-box"
        type="org"
        count={event.count}
        size={event.size}
      />
    ));
  };

  const renderCreateEvent = () => {
    return (
      <>
        <div className="general-box scroll-box1">
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
                value={formData.birthDate}
                name="Eventdate"
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
                value={formData.eventCount}
                name="eventCount"
                onChange={handleChange}
                placeholder={t("event_count_placeholder")}
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>

            <div className="flex-box flex-column input-field-box">
              <div>
                {t("event_description")}: <label className="red-star">*</label>
              </div>
              <DynamicInput
                className="input-field"
                type="text"
                value={formData.eventDescription}
                name="eventDescription"
                onChange={handleChange}
                placeholder={t("event_description_placeholder")}
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

            <div className="flex-box">
              <DynamicButton
                className="button"
                onClick={handleShowEvents}
                text={t("back")}
              />

              <DynamicButton
                className="button"
                text={t("create_event")}
                type="submit"
              />
            </div>
          </form>
        </div>
      </>
    );
  };

  const renderShowEvents = () => {
    return (
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
      {showEvents && renderShowEvents()}
      {!showEvents && renderCreateEvent()}
    </div>
  );
};

export default HomeOrganizer;
