import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import DropDownMenu from "./DropDownMenu";
import { useSkillOptions } from "../config/options/Skills";
import { useSortOptions } from "../config/options/Sort";
import { useTheme } from "../config/options/Colors";

import xIconLight from "../icons/light/x_icon.svg";
import xIconDark from "../icons/dark/x_icon.svg";

const SelectComponent = ({
  onChange, // Function to call when skills array changes
  type,
  choosen,
}) => {
  const { isLightMode } = useTheme();
  const { t } = useTranslation("select");

  const skillOptions = useSkillOptions();
  const sortOptions = useSortOptions();

  const availableOptions =
    type === "skills"
      ? skillOptions || []
      : type === "sort"
      ? sortOptions || []
      : [];

  const handleAddOption = (optionValueToAdd) => {
    const currentValues = Array.isArray(choosen) ? choosen : [];
    if (!currentValues.includes(optionValueToAdd)) {
      const updatedValues = [...currentValues, optionValueToAdd];
      onChange({
        target: {
          name: type, // or just "skills" if you're not changing the type
          value: updatedValues,
        },
      });
    }
  };

  const handleRemoveOption = (valueToRemove) => {
    const currentValues = Array.isArray(choosen) ? choosen : [];
    const updatedValues = currentValues.filter((val) => val !== valueToRemove);
    onChange({
      target: {
        name: type, // or just "skills" if you're not changing the type
        value: updatedValues,
      },
    });
  };

  return (
    <div className="flex-box flex-column input-field-box">
      <div>
        <div>{t("skills")}: </div>
      </div>
      <div className="flex-box">
        {choosen.map((choice, index) => (
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
        text={type == "skills" ? t("selectskills") : t("sort")}
        options={availableOptions.map((skill) => ({
          label: t(`${skill.label}`),
          href: `#${skill.value}`,
          onClick: () => handleAddOption(skill.value),
        }))}
      />
    </div>
  );
};

SelectComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  choosen: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export default SelectComponent;
