import React from "react";
import PropTypes from "prop-types";

const DynamicButton = ({
  onClick,
  name,
  className,
  style,
  text,
  logoSrc,
  logoalt,
}) => {
  return (
    <button
      onClick={onClick}
      name={name}
      className={`button-flex-center ${className || ""}`.trim()}
      style={style}
    >
      {logoSrc && <img src={logoSrc} alt={logoalt} className="button-icon" />}
      {text}
    </button>
  );
};

DynamicButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  logoSrc: PropTypes.string,
  logoalt: PropTypes.string,
};

export default DynamicButton;
