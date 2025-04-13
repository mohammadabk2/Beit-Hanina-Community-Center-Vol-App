import React from "react";
import PropTypes from "prop-types";

const DynamicInput = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className,
}) => {
  // نقرأ اتجاه الصفحة من <html dir="rtl">
  const direction = document.documentElement.dir || "ltr";

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={className}
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        margin: "5px 0",
        direction: direction, // يتبع RTL أو LTR تلقائيًا
        textAlign: direction === "rtl" ? "right" : "left", // لضبط محاذاة النص
      }}
    />
  );
};

DynamicInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default DynamicInput;
