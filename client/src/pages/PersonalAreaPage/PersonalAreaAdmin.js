import React from "react";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/layout/NavigationBar";
import ManageAccountBox from "../../components/ManageAccountBox";
import DropDownMenu from "../../components/DropDownMenu";
import CopyRight from "../../components/layout/CopyRight";

const PersonalArea = () => {
  const { t } = useTranslation("personal");

  //TODO change all these to read from database
  const name = "Fadi";

  const printToPdf = () => {
    console.log("print to PDF button clicked");
  };

  const downloadToExcel = () => {
    console.log("Excel button clicked");
  };

  //TODO make it do diffrent things
  const handleDropDown = () => {};
  const eventOptions = [
    {
      label: t("all_events_to_pdf"),
      href: "#event_1",
      onClick: () => {
        console.log("some log");
        printToPdf("");
      },
    },
    {
      label: t("all_events_to_excel"),
      href: "#event_2",
      onClick: () => {
        console.log("some log");
        downloadToExcel("");
      },
    },
    {
      label: t("active_events_to_pdf"),
      href: "#event_3",
      onClick: () => {
        console.log("some log");
        printToPdf("");
      },
    },
    {
      label: t("active_events_to_excel"),
      href: "#event_4",
      onClick: () => {
        console.log("some log");
        downloadToExcel("");
      },
    },
    {
      label: t("done_events_to_pdf"),
      href: "#event_5",
      onClick: () => {
        console.log("some log");
        printToPdf("");
      },
    },
    {
      label: t("done_events_to_excel"),
      href: "#event_6",
      onClick: () => {
        console.log("some log");
        downloadToExcel("");
      },
    },
    {
      label: t("volunteer_to_pdf"),
      href: "#event_5",
      onClick: () => {
        console.log("some log");
        printToPdf("");
      },
    },
    {
      label: t("volunteer_to_excel"),
      href: "#event_6",
      onClick: () => {
        console.log("some log");
        downloadToExcel("");
      },
    },
  ];

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-box-padding">
            <div className="perosnal-area-content basic-box-padding">
              {t("name")}: {name}
            </div>

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
                className="dropdown-menu"
                text={t("select_type")}
                options={eventOptions.map((event) => ({
                  label: t(`${event.label}`),
                  href: `#${event.value}`,
                  onClick: () => handleDropDown(event.value),
                }))}
              />
            </div>

            <ManageAccountBox />
          </div>
        </div>

        <CopyRight />
      </div>
    </div>
  );
};

export default PersonalArea;
