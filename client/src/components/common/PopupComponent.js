import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DynamicButton from "./ButtonComponent";

const PopupComponent = ({ 
  isOpen, 
  onClose, 
  message, 
  className, 
  style, 
  buttonText 
}) => {
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Don't render anything if popup is not open
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div 
        ref={popupRef}
        className={`popup-container smooth-shadow-box ${className || ""}`} 
        style={style}
      >
        <div className="popup-content">
          <p>{message}</p>
        </div>
        <div className="popup-footer flex-box">
          <DynamicButton
            onClick={onClose}
            className="button button-small"
            text={buttonText}
          />
        </div>
      </div>
    </div>
  );
};

PopupComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  buttonText: PropTypes.string
};

PopupComponent.defaultProps = {
  className: "",
  style: {},
  buttonText: "Close"
};

export default PopupComponent;