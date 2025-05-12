import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/layout/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import EventItem from "../../components/EventItem";
import PeopleDisplaySwitcher from "../../components/PersonItem/PeopleDisplaySwitcher";
import { useTheme } from "../../config/options/Colors";
import DynamicInput from "../../components/InputComponent";
import CopyRight from "../../components/layout/CopyRight";

import CardIconDark from "../../icons/dark/card_view_icon.svg";
import TableIconDark from "../../icons/dark/table_view_icon.svg";

import CardIconLight from "../../icons/light/card_view_icon.svg";
import TableIconLight from "../../icons/light/table_view_icon.svg";

const HomeAdmin = () => {
  const { t } = useTranslation("home");

  const [viewMode, setViewMode] = useState("events"); // "events", "people", "createOrg"
  const [personView, setPersonView] = useState(true);

  const people = initialPeople; //! Using static data for now
  
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
          eventLocation={event.eventLocation}
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

const initialPeople = [
  {
    id: "person1",
    name: "أحمد محمود",
    sex: "male",
    birthDate: "1995-03-15",
    age: 28,
    approvedhous: 25,
    unapprovedhous: 5,
    skills: ["التدريس", "الحاسوب", "اللغة الإنجليزية"],
    phoneNumber: "0591234567",
    email: "ahmad@example.com",
    address: "بيت حنينا - شارع الرئيسي",
    insurance: "clalit",
    idNumber: "123456789",
    isNew: true,
  },
  {
    id: "person2",
    name: "سارة خالد",
    sex: "female",
    birthDate: "1998-08-22",
    age: 25,
    approvedhous: 15,
    unapprovedhous: 0,
    skills: ["الفنون", "العمل مع الأطفال", "التنظيم"],
    phoneNumber: "0597654321",
    email: "sara@example.com",
    address: "بيت حنينا - حي المدارس",
    insurance: "maccabi",
    idNumber: "987654321",
    isNew: false,
  },
  {
    id: "person3",
    name: "محمد عبد الله",
    sex: "male",
    birthDate: "1992-11-10",
    age: 31,
    approvedhous: 40,
    unapprovedhous: 8,
    skills: ["الرياضة", "الإسعافات الأولية", "تنظيم الفعاليات"],
    phoneNumber: "0598765432",
    email: "mohammad@example.com",
    address: "بيت حنينا - حي السلام",
    insurance: "leumit",
    idNumber: "456789123",
    isNew: true,
  },
];
