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
            userRequest: "all",
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

  //TODO make it do diffrent things
  const eventOptions = [
    {
      label: t("all_events_to_excel"),
      href: "#event_2",
      onClick: downloadToExcel,
    },
  ];

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-box-padding">

            <div className="flex-box basic-box-padding">
              {/* <DynamicButton
                className="button"
                text={t("to_pdf")}
                onClick={printToPdf}
              />

              <DynamicButton
                className="button"
                text={t("to_excel")}
                onClick={downloadToExcel}
              /> */}

              <DropDownMenu
                className="language-button"
                text={t("select_type")}
                options={eventOptions}
              />
            </div>

            <ManageAccountBox />
          </div>
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default PersonalArea;
