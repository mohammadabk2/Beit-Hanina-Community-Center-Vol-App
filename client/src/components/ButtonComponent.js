import React from "react";
import PropTypes from "prop-types";

const DynamicButton = ({ onClick, name, className, style, text }) => {
  return (
    <button onClick={onClick} name={name} className={className} style={style} > {text} </button>
  );
};

DynamicButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
};

export default DynamicButton;
