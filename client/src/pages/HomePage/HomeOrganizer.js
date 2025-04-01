import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// import DropDownMenu from "../../components/DropDownMenu";
import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";
import EventItem from "../../components/EventItem";
import { useSkillOptions } from "../../config/options/Skills";

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
  const skillsOptions = useSkillOptions();
  const { t: tskill } = useTranslation("signUp");

  const [showEvents, setShowEvents] = useState(true); // Use useState!

  const [formData, setFormData] = useState({
    eventName: "",
    eventCount: "",
    eventDate: "",
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

  const handleRemoveSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleAddSkill = (value) => {
    if (!formData.skills.includes(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [
          ...(Array.isArray(prevFormData.skills) ? prevFormData.skills : []),
          value,
        ],
      }));
    }
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
                <label> {t("event_name")}: </label>
                <label className="red-star">*</label>
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
                <label>{t("event_date")}: </label>
                <label className="red-star">*</label>
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
                <label>{tskill("skills")}: </label>
              </div>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex-box">
                  <label>{skill}</label>
                  <DynamicButton
                    className="button"
                    text={t("remove")}
                    onClick={() => handleRemoveSkill(index)}
                  />
                </div>
              ))}
              <DropDownMenu
                className="sex-button"
                text={tskill("selectskills")}
                options={skillsOptions.map((skill) => ({
                  label: tskill(`${skill.label}`),
                  href: `#${skill.value}`,
                  onClick: () => handleAddSkill(skill.value),
                }))}
              />
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
        </div>
      </>
    );
  };

  const renderShowEvents = () => {
    return (
      <>
        <div className="scroll-box1 general-box flex-box flex-column">
          <div className="flex-box flex-column top-scroll-box1">
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
            <div className="line-break"></div>
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
