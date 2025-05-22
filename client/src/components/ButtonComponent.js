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
    <button onClick={onClick} name={name} className={className} style={style}>
      {text}
      {logoSrc && <img src={logoSrc} alt={logoalt} className="button-image" />}
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
