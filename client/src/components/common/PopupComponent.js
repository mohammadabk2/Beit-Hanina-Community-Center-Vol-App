import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DynamicButton from "./ButtonComponent";

const PopupComponent = ({ 
  isOpen, 
  onClose, 
  message, 
  buttonText,
  children,
  showCloseButton = true,
  closeOnOutsideClick = true
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const handleClickOutside = (event) => {
      if (closeOnOutsideClick && popupRef.current && 
          !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, closeOnOutsideClick]);

  if (!isOpen) return null;

  return (
    <div className="flex-box flex-column general-box bottom-scroll-box1 app-header">
      <div 
        ref={popupRef}
        className="general-box smooth-shadow-box flex-column basic-box-padding"
      >
        {showCloseButton && (
          <div className="flex-box justify-end full-width">
            <DynamicButton
              onClick={onClose}
              className="button button-small"
              text="×"
              ariaLabel="Close popup"
            />
          </div>
        )}
        
        <div className="flex-box flex-column basic-box-padding">
          {message && <p className="personal-area-content">{message}</p>}
          {children}
        </div>
        
        <div className="flex-box flex-box-gap basic-box-padding">
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

// Add prop type validation
PopupComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  showCloseButton: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool
};

export default PopupComponent;