// import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  sortFavorites,
  sortMyEvents,
  sortClosedEvents,
  sortOpenEvents,
  sortByTime,
  sortUnapprovedEvents,
  sortApprovedEvents,
  sortUnapprovedUsers,
  sortApprovedUsers,
} from "../utils/sortFunctions";

const useSortOptions = ({ type } = {}, data, currentUserId) => {
  const { t } = useTranslation("sort");

  //TODO pass the arguemnt to be returned events/people
  //TODO add somewhere a backup copy to reset
  const baseOptions = [
    {
      label: t("sort_1"),
      value: t("sort_1"),
      onClick: () => sortFavorites(data),
    },
    {
      label: t("sort_2"),
      value: t("sort_2"),
      onClick: () => sortMyEvents(data, currentUserId),
    },

    {
      label: t("sort_3"),
      value: t("sort_3"),
      onClick: () => sortClosedEvents(data),
    },
    {
      label: t("sort_4"),
      value: t("sort_4"),
      onClick: () => sortOpenEvents(data),
    },

    {
      label: t("sort_5"),
      value: t("sort_5"),
      onClick: () => sortByTime(data),
    },
  ];
  const orgOptions = [
    {
      label: t("sort_6"),
      value: t("sort_6"),
      onClick: () => sortUnapprovedEvents(data),
    },
    {
      label: t("sort_7"),
      value: t("sort_7"),
      onClick: () => sortApprovedEvents(data),
    },
  ];
  const adminOptions = [
    {
      label: t("sort_8"),
      value: t("sort_8"),
      onClick: () => sortUnapprovedUsers(data),
    },
    {
      label: t("sort_9"),
      value: t("sort_9"),
      onClick: () => sortApprovedUsers(data),
    },
  ];

  let options = baseOptions; // default to base options

  if (type === "admin") {
    options = [...baseOptions, ...orgOptions, ...adminOptions];
  }

  if (type === "organizer") {
    options = [...baseOptions, ...orgOptions];
  }

  return options;
};

useSortOptions.propTypes = {
  type: PropTypes.string.isRequired,
};

export default useSortOptions;
