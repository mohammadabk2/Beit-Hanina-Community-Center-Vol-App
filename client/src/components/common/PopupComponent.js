import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DynamicButton from "./ButtonComponent";

const PopupComponent = ({ 
  isOpen, 
  onClose, 
  message, 
  className, 
  style, 
  buttonText,
  children,
  showCloseButton = true,
  closeOnOutsideClick = true
}) => {
  const popupRef = useRef(null);

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (closeOnOutsideClick && popupRef.current && !popupRef.current.contains(event.target)) {
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

  // Add active class when open for transitions
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`popup-overlay ${isOpen ? 'active' : ''}`}>
      <div 
        ref={popupRef}
        className={`popup-container smooth-shadow-box ${className || ""}`} 
        style={style}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <button 
            className="popup-close" 
            onClick={onClose}
            aria-label="Close popup"
          >
            &times;
          </button>
        )}
        
        <div className="popup-content">
          {message && <p>{message}</p>}
          {children}
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
  message: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  showCloseButton: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool
};

PopupComponent.defaultProps = {
  className: "",
  style: {},
  buttonText: "Close",
  message: "",
  children: null,
  showCloseButton: true,
  closeOnOutsideClick: true
};

export default PopupComponent;