import React, { useState } from "react";
import { useTranslation } from "react-i18next";


import DynamicButton from "../../components/common/ButtonComponent";
import DynamicInput from "../../components/common/InputComponent";
import EventItem from "../../components/EventItem";
import SelectComponent from "../../components/common/SelectComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

const HomeOrganizer = () => {
  const { t } = useTranslation("home");
  const [showEvents, setShowEvents] = useState(true); // Use useState!

  const [formData, setFormData] = useState({
    eventName: "",
    eventCount: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
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
        eventLocation={event.eventLocation}
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
              value={formData.birthDate}
              name="eventDate"
              onChange={handleChange}
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

          <SelectComponent
            type="skills"
            onChange={handleChange}
            chosen={formData.skills}
          />

          <div className="flex-box flex-column input-field-box">
            <div>
              {t("event_description")}: <label className="red-star">*</label>
            </div>

            <textarea value={formData.eventDescription}
              name="eventDescription" rows={5} cols={50} 
              className="input-field" onChange={handleChange}></textarea>
          </div>

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
      {showEvents && renderShowEvents()}
      {!showEvents && renderCreateEvent()}
      <CopyRight />
    </div>
  );
};

export default HomeOrganizer;


// ! temp data
const events = [
  {
    id: "event1",
    name: "تنظيف الحديقة العامة",
    desc: "حملة تنظيف وتجميل الحديقة العامة في بيت حنينا",
    req: ["التنظيف", "البستنة"],
    count: 5,
    size: 20,
    eventLocation: "الحديقة العامة - بيت حنينا",
  },
  {
    id: "event2",
    name: "دروس تقوية للطلاب",
    desc: "دروس تقوية في الرياضيات والعلوم لطلاب المدارس",
    req: ["التدريس", "الرياضيات", "العلوم"],
    count: 3,
    size: 10,
    eventLocation: "مركز المجتمع - بيت حنينا",
  },
  {
    id: "event3",
    name: "يوم رياضي للأطفال",
    desc: "تنظيم يوم رياضي ترفيهي للأطفال",
    req: ["الرياضة", "تنظيم الفعاليات"],
    count: 8,
    size: 15,
    eventLocation: "الملعب الرياضي - بيت حنينا",
  },
];