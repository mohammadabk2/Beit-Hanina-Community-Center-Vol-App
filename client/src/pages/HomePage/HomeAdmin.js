import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import DynamicButton from "../../components/common/ButtonComponent";
import EventItem from "../../components/EventItem";
import PeopleDisplaySwitcher from "../../components/PersonItem/PeopleDisplaySwitcher";
import { useTheme } from "../../config/options/Colors";
import DynamicInput from "../../components/common/InputComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";
import DropDownMenu from "../../components/common/DropDownMenu";
import LoadingPage from "../CommonPages/Loading/Loading";

// Icons
import CardIconDark from "../../icons/dark/card_view_icon.svg";
import TableIconDark from "../../icons/dark/table_view_icon.svg";

import CardIconLight from "../../icons/light/card_view_icon.svg";
import TableIconLight from "../../icons/light/table_view_icon.svg";

// import context and hooks
import { useAuth } from "../../config/Context/auth";
import useLoadEvents from "../../config/hooks/loadEvent";
import useLoadUsers from "../../config/hooks/loadUsers";

const HomeAdmin = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t } = useTranslation("home");
  const { isLightMode } = useTheme();

  const { userId, loadingInitial, isAuthenticated, token } = useAuth();
  const { events, eventsLoading, eventsError, loadEvents } = useLoadEvents(); // load events hook
  const { users, usersLoading, userError, loadUsers } = useLoadUsers(); // load users hook

  const [viewMode, setViewMode] = useState("events"); // "events", "people", "createOrg"
  const [personView, setPersonView] = useState(true);
  const [sortText, setSortText] = useState(t("sort"));

  const personContainerRef = useRef(null); // For attatching to person table to change sizing dynamically

  const [searchQuery, setSearchQuery] = useState(""); // search query

  const [eventStatus, setEventStatus] = useState("approved");
  const [peopleStatus, setPeopleStatus] = useState("volunteer_waiting_list");

  const eventOptions = [
    {
      label: t("approved_events"),
      href: "#",
      onClick: () => {
        setEventStatus("approved");
        setSortText(t("approved_events"));
      },
    },
    {
      label: t("pending_events"),
      href: "#",
      onClick: () => {
        setEventStatus("pending");
        setSortText(t("pending_events"));
      },
    },
    {
      label: t("finished_events"),
      href: "#",
      onClick: () => {
        setEventStatus("finished");
        setSortText(t("finished_events"));
      },
    },
    {
      label: t("rejected_events"),
      href: "#",
      onClick: () => {
        setEventStatus("rejected");
        setSortText(t("rejected_events"));
      },
    },
    {
      label: t("on_going"),
      href: "#",
      onClick: () => {
        setEventStatus("ongoing");
        setSortText(t("on_going"));
      },
    },
  ];

  const peopeOptions = [
    {
      label: t("new"),
      href: "#",

      onClick: () => {
        setPeopleStatus("volunteer_waiting_list");
        setSortText(t("new"));
      },
    },
    {
      label: t("active"),
      href: "#",
      onClick: () => {
        setPeopleStatus("volunteer");
        setSortText(t("active"));
      },
    },
    //TODO maybe add
    // {
    //   label: t("org"),
    //   href: "#",
    //   onClick: () => setPeopleStatus("organizer"),
    // },
  ];

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

  const approveEvent = async (id) => {
    console.log(`approve event clicked event id:${id}`);
    await sendAxiod("events/actions", id, "approve", "NA");
    // loadEvents([eventStatus]); //TODO check if this effects anythign or not
  };

  const rejectEvent = (id) => {
    console.log(`reject event clicked event id:${id}`);
    sendAxiod("events/actions", id, "reject", "NA");
  };

  const renderEventItems = (eventsArray) => {
    if (!Array.isArray(eventsArray) || eventsArray.length === 0) {
      return <p>{t("no_events_found")}</p>; // Or any other placeholder
    }

    return eventsArray.map((event) => (
      <EventItem
        key={event.id}
        id={event.id}
        name={event.name}
        desc={event.description}
        req={event.requirements || []} // Assuming 'requirements' might exist, fallback to empty array
        type="admin"
        count={event.currentSize}
        size={event.maxSize}
        eventLocation={event.location}
        approveEvent={() => approveEvent(event.id)}
        rejectEvent={() => rejectEvent(event.id)}
      />
    ));
  };

  const sendAxiod = async (path, actionID, actiontoPerform, actionValue) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/${path}`,
      {
        userID: userId,
        actionID: actionID,
        action: actiontoPerform,
        actionValue: actionValue,
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

  const handleApprove = (personId) => {
    console.log(`Approving person ${personId}`);
    sendAxiod("users", personId, "approve", "NA");
    //TODO force refresh of page
  };

  const handleReject = (personId) => {
    console.log(`Rejecting person ${personId}`);
    sendAxiod("users", personId, "reject", "NA");
    //TODO force refresh of page
  };

  const handleAddLog = (personId) => {
    console.log(`Adding log for person ${personId}`);
    // TODO: Implement actual logic (e.g., show modal, navigate)
  };

  const handleViewLogs = (personId) => {
    console.log(`Viewing logs for person ${personId}`);
    // TODO: Implement actual logic (e.g., show modal, navigate)
  };

  const renderSearch = () => {
    return (
      <DynamicInput
        type="text"
        placeholder={"..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-field"
      />
    );
  };

  const renderButton = (func, text) => {
    return (
      <DynamicButton
        className="button button-small"
        onClick={func}
        text={text}
      />
    );
  };

  const renderInput = (upperName, value, name, placeholder) => {
    return (
      <div className="flex-box flex-column input-field-box">
        <div>
          <label> {upperName} </label>
          <label className="red-star">*</label>
        </div>

        <DynamicInput
          className="input-field"
          type="text"
          value={value}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  };

  const renderPeople = () => {
    return (
      <>
        <div
          ref={personContainerRef}
          className="scroll-box1 flex-box flex-column"
        >
          <div className="flex-box top-scroll-box1 line-break">
            <div>{renderSearch()}</div>

            <DropDownMenu
              text={sortText}
              className="gender-button"
              options={peopeOptions}
            />

            {renderButton(switchToEvents, t("switch_to_events"))}
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
            {renderButton(switchToCreateOrg, t("switch_to_create_org"))}
          </div>

          <div className="bottom-scroll-box1">
            <PeopleDisplaySwitcher
              // people={users}
              people={users.filter(
                (user) =>
                  user.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  user.phoneNumber
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  user.email
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  user.idNumber
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  user.skills?.toLowerCase().includes(searchQuery.toLowerCase())
              )}
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
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    username: "",
    password: "",
    type: "org",
    // orgAdmin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Create Org Submit clicked", formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        formData
      );
      if (response.data.status === "success") {
        alert(t("org_sign_up_message"));
      } else {
          alert(`${t("welcome_message")} ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const renderCreateOrg = () => {
    return (
      <>
        <div className="general-box flex-box flex-column">
          <div className="flex-box line-break">
            {renderButton(switchToPeople, t("switch_to_people"))}

            {renderButton(switchToEvents, t("switch_to_events"))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-box flex-column input-field-box"
          >
            {renderInput(
              t("fullName"),
              formData.fullName,
              "fullName",
              t("fullName_placeholder")
            )}

            {renderInput(
              t("phoneNumber"),
              formData.phoneNumber,
              "phoneNumber",
              t("fullName_phone_placeholder")
            )}

            {renderInput(
              t("email"),
              formData.email,
              "email",
              t("email_phone_placeholder")
            )}

            {renderInput(
              t("address"),
              formData.address,
              "address",
              t("address_placeholder")
            )}

            {renderInput(
              t("orgUserName"),
              formData.username,
              "username",
              t("username_phone_placeholder")
            )}

            {renderInput(
              t("password"),
              formData.password,
              "password",
              t("password_phone_placeholder")
            )}

            {/* {renderInput(
              t("orgAdmin"),
              formData.orgAdmin,
              "orgAdmin",
              t("orgAdmin_placeholder")
            )} */}

            {/* //TODO add org pic */}

            <div className="flex-box">
              {renderButton(handleSubmit, t("submit_button"))}
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
            {renderSearch()}

            <DropDownMenu
              text={sortText}
              className="gender-button"
              options={eventOptions}
            />

            {renderButton(switchToPeople, t("switch_to_people"))}

            {renderButton(switchToCreateOrg, t("switch_to_create_org"))}
          </div>

          {/* <div className="bottom-scroll-box1">{renderEventItems(events)}</div> */}
          <div className="bottom-scroll-box1">
            {renderEventItems(
              events.filter(
                (event) =>
                  event.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  event.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
            )}
          </div>
        </div>
      </>
    );
  };

  // UseEffects
  useEffect(() => {
    if (userId && isAuthenticated) {
      loadEvents([eventStatus]);
    }
  }, [userId, isAuthenticated, loadEvents, eventStatus]);

  useEffect(() => {
    if (userId && isAuthenticated) {
      loadUsers(peopleStatus);
    }
  }, [userId, isAuthenticated, loadUsers, peopleStatus]);

  if (loadingInitial) {
    return (<><LoadingPage message={t("Loading Events")}/></>);
  }

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this data.</div>;
  }

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
      {viewMode === "people" && (
        <>
          {usersLoading && <p>{t("loading_users")}</p>}
          {userError && <p style={{ color: "red" }}>{userError}</p>}
          {!usersLoading && !userError && renderPeople()}
        </>
      )}
      {viewMode === "createOrg" && renderCreateOrg()}
      <CopyRight />
    </div>
  );
};

export default HomeAdmin;
