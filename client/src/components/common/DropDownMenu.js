import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import DynamicButton from "./ButtonComponent";
import dropDownArrow from "../../icons/drop_down_icon.svg"

const DropDownMenu = ({ onClick, name, className, style, text, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (onClick) {
      onClick(e);
    }
  };

  const handleOptionClick = (option, e) => {
    if (option.onClick) {
      option.onClick(e);
    }
    setIsOpen(false);
  };

  // handles outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={`${className}`} style={style} ref={dropdownRef}>
      <DynamicButton
        onClick={toggleDropdown}
        name={name}
        className="button dropdown-toggle flex-box button-small"
        text={text}
        logoSrc={dropDownArrow}
        logoalt={"drop down arrow"}
        // type="button"
      />
      {options && isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} className="dropdown-item">
              <a
                href={option.href}
                onClick={(e) => handleOptionClick(option, e)}
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropDownMenu.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default DropDownMenu;
