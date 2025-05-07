import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
  const { t } = useTranslation("home");

  const [viewMode, setViewMode] = useState("events"); // "events", "people", "createOrg"
  const [personView, setPersonView] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  // const people = initialPeople; //! Using static data for now
  const loadPeople = async (type) => {
    // TODO change to get userId from memo and context

    const body =
      type === "new"
        ? {
            userID: 4,
            userRequest: `add conditions from sort for new users`,
            tableName: "users_waiting_list",
          }
        : type === "current"
        ? {
            userID: 5,
            userRequest: `add conditions from sort for current users`,
            tableName: "users",
          }
        : {};

    try {
      const response = await axios.post(`${API_BASE_URL}/api/loadUsers`, body);
      if (response.data.status === "success") {
        console.log("loading passed");
        let peopleArray = response.data.userData;
        peopleArray.forEach((person) => {
          person.isNew = true;
        });
        return peopleArray;
      } else {
        alert(`load Failed: ${response.data.message}`);
        return null;
      }
    } catch (error) {
      console.error("Error during loading people:", error);
      return null;
    }
  };

  const [people, setPeople] = useState(null);
  useEffect(() => {
    const fetchPeople = async () => {
      const loadedPeople = await loadPeople("new");
      setPeople(loadedPeople);
    };

    fetchPeople();
  }, []);

  const events = initEvents;

  const switchToEvents = () => setViewMode("events");
  const switchToPeople = () => {
    setViewMode("people"); // Switch view mode to "people"
    setPersonView(true); // Set personView to true by default when switching to "people"
  };
  const switchToCreateOrg = () => setViewMode("createOrg");
  const togglePersonView = () => setPersonView(!personView); // Toggle between card and table view

  const sortEvents = () => {
    console.log("Sort events button clicked");
    //TODO Add sorting logic for events array here if needed
  };

  const sortPeople = () => {
    console.log("Sort people button clicked");
    //TODO Add sorting logic for people array here if needed
  };

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
          location={event.location}
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
        <div className="scroll-box1 general-box flex-box flex-column">
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
        <div className="scroll-box1 general-box flex-box flex-column">
          <div className="flex-box top-scroll-box1 line-break">
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

// ! temp examples
const initEvents = [
  {
    id: "event1",
    name: "تنظيف الحديقة العامة",
    desc: "حملة تنظيف وتجميل الحديقة العامة في بيت حنينا",
    req: ["التنظيف", "البستنة"],
    count: 5,
    size: 20,
    location: "الحديقة العامة - بيت حنينا",
  },
  {
    id: "event2",
    name: "دروس تقوية للطلاب",
    desc: "دروس تقوية في الرياضيات والعلوم لطلاب المدارس",
    req: ["التدريس", "الرياضيات", "العلوم"],
    count: 3,
    size: 10,
    location: "مركز المجتمع - بيت حنينا",
  },
  {
    id: "event3",
    name: "يوم رياضي للأطفال",
    desc: "تنظيم يوم رياضي ترفيهي للأطفال",
    req: ["الرياضة", "تنظيم الفعاليات"],
    count: 8,
    size: 15,
    location: "الملعب الرياضي - بيت حنينا",
  },
];
