import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import DropDownMenu from "./DropDownMenu";
import { useSkillOptions } from "../../config/options/Skills";
import useSortOptions from "../../config/options/Sort";
import { useTheme } from "../../config/options/Colors";

import xIconLight from "../../icons/light/x_icon.svg";
import xIconDark from "../../icons/dark/x_icon.svg";

const SelectComponent = ({
  onChange, // Function to call when skills array changes
  type,
  chosen,
  userType,
  dataToPass,
  //todo Maybe add userID
}) => {
  const { isLightMode } = useTheme();
  const { t } = useTranslation("skills");

  const skillOptions = useSkillOptions();
  const sortOptions = useSortOptions({ type: userType, data: dataToPass });

  const availableOptions =
    type === "skills"
      ? skillOptions || []
      : type === "sort"
      ? sortOptions || []
      : [];

  const handleAddOption = (optionValueToAdd) => {
    const currentValues = Array.isArray(chosen) ? chosen : [];
    if (!currentValues.includes(optionValueToAdd)) {
      const updatedValues = [...currentValues, optionValueToAdd];
      onChange({
        target: {
          name: type,
          value: updatedValues,
        },
      });
    }
  };

  const handleRemoveOption = (valueToRemove) => {
    const currentValues = Array.isArray(chosen) ? chosen : [];
    const updatedValues = currentValues.filter((val) => val !== valueToRemove);
    onChange({
      target: {
        name: type,
        value: updatedValues,
      },
    });
  };

  return (
    <div className="flex-box flex-column input-field-box">
      <div>
        <div>{type === "skills" ? t("skills") : ""}</div>
      </div>
      <div className="flex-box">
        {(Array.isArray(chosen) ? chosen : []).map((choice, index) => (
          <div key={index} className="flex-box skills">
            <div>{choice}</div>
            <img
              alt="x Icon"
              onClick={() => handleRemoveOption(choice)}
              className="button-image"
              src={isLightMode ? xIconLight : xIconDark}
            ></img>
          </div>
        ))}
      </div>
      <DropDownMenu
        className="gender-button"
        text={type === "skills" ? t("select_skills") : t("select_sort")}
        options={availableOptions.map((item) => ({
          label: t(`${item.label}`),
          href: `#${item.value}`,
          onClick: () => handleAddOption(item.value),
        }))}
      />
    </div>
  );
};

SelectComponent.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  userType: PropTypes.string,
  style: PropTypes.object,
  chosen: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  dataToPass: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export default SelectComponent;
