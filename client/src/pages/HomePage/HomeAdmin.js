import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";
import DynamicButton from "../../components/ButtonComponent";
import EventItem from "../../components/EventItem";
import PersonItem from "../../components/PersonItem/PersonItem";

const HomeAdmin = () => {
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

  const people = [
    {
      name: "adam",
      sex: "male",
      birthDate: "01/01/2000",
      age: 18,
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill1", "skill2"],
      phoneNumber: "1234567891",
      email: "something@gmail.com",
      address: "3rd street",
      insurance: "clalit",
      idNumber: "123456789",
      newUser: true,
    },
    {
      name: "adam",
      sex: "male",
      birthDate: "01/01/2000",
      age: 18,
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill1", "skill2"],
      phoneNumber: "1234567891",
      email: "something@gmail.com",
      address: "3rd street",
      insurance: "clalit",
      idNumber: "123456789",
      newUser: false,
    },
    {
      name: "adam",
      sex: "male",
      birthDate: "01/01/2000",
      age: 18,
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill1", "skill2"],
      phoneNumber: "1234567891",
      email: "something@gmail.com",
      address: "3rd street",
      insurance: "clalit",
      idNumber: "123456789",
      newUser: true,
    },
    {
      name: "adam",
      sex: "male",
      birthDate: "01/01/2000",
      age: 18,
      approvedhous: 10,
      unapprovedhous: 10,
      skills: ["skill1", "skill2"],
      phoneNumber: "1234567891",
      email: "something@gmail.com",
      address: "3rd street",
      insurance: "clalit",
      idNumber: "123456789",
      newUser: false,
    },
  ];
  //!

  const { t } = useTranslation("homeAdmin");
  // const { t: tsignup } = useTranslation("signUp");

  const [showEvents, setShowEvents] = useState(true); // Use useState!

  const switchMode = () => {
    setShowEvents(!showEvents);
  };
  const sortEvents = () => {
    console.log("Sort events button clicked");
  };

  const sortPeople = () => {
    console.log("Sort people button clicked");
  };

  const [personView, setCardView] = useState(true);

  const handleChange = () => {
    setCardView(!personView);
  };

  const renderEventItems = (eventsArray) => {
    return eventsArray.map((event, index) => (
      <EventItem
        key={index}
        name={event.name}
        desc={event.desc}
        req={event.req}
        className="flex-box flex-column event-box smooth-shadow-box"
        type="admin"
        count={event.count}
        size={event.size}
      />
    ));
  };

  const renderPeopleItems = (peopeArray) => {
    return peopeArray.map((person, index) => (
      <>
        <PersonItem
          key={index}
          name={person.name}
          birthDate={person.birthDate}
          sex={person.sex}
          skills={person.skills}
          phoneNumber={person.phoneNumber}
          email={person.email}
          address={person.address}
          insurance={person.insurance}
          idNumber={person.idNumber}
          newUser={person.newUser}
          type={personView ? "card" : "table"}
        />
      </>
    ));
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />

      {showEvents && (
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
      )}

      {!showEvents && (
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
                  text={t("switch_modes")}
                  onClick={handleChange}
                  className="button button-small"
                />
              </div>
            </div>
            <div className="bottom-scroll-box1">
              {renderPeopleItems(people)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeAdmin;
