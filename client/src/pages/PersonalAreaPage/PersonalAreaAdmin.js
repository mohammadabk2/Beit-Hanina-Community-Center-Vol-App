import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../config/Context/auth";
import axios from "axios";

import ManageAccountBox from "../../components/ManageAccountBox";
import DropDownMenu from "../../components/common/DropDownMenu";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";
import { SERVER_IP } from "../../config/constants/global";

const PersonalArea = () => {
  const { t } = useTranslation("personal");
  const { token, userId } = useAuth();

  //TODO change all these to read from database

  // const printToPdf = () => {
  //   console.log("print to PDF button clicked");
  // };

  const downloadToExcel = async () => {
    try {
      const response = await axios.get(
        `${SERVER_IP}/api/events/export`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userID: userId,
            userRequest: "events",
          },
        }

      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "events.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(t("download_failed"));
      console.error(err);
    }
  };

  // Add this function for users export
  const downloadUsersToExcel = async () => {
    try {
      const response = await axios.get(
        `${SERVER_IP}/api/events/export`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userID: userId,
            userRequest: "users",
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(t("download_failed"));
      console.error(err);
    }
  };

  //TODO make it do diffrent things
  const eventOptions = [
    {
      label: t("all_events_to_excel"),
      href: "#event_2",
      onClick: downloadToExcel,
    },
    {
      label: t("all_users_to_excel"),
      href: "#users_1",
      onClick: downloadUsersToExcel,
    },
  ];

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
        <div className="general-box flex-box flex-column smooth-shadow-box">
              <DropDownMenu
                className="gender-button"
                text={t("select_type")}
                options={eventOptions}
              />
            <ManageAccountBox />
        </div>
      <CopyRight />
    </div>
  );
};

export default PersonalArea;
