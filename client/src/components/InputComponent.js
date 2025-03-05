import React from "react";
import PropTypes from "prop-types";

const DynamicInput = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className,
  style,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={className}
      style={style}
    />
  );
};

DynamicInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default DynamicInput;
