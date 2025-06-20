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
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleOutsideClick = (e) => {
      if (closeOnOutsideClick && popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Prevent body scrolling when popup is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnOutsideClick]);

  if (!isOpen) return null;

  return (
    <div className="fixed-overlay">
      <div 
        ref={popupRef}
        className="general-box smooth-shadow-box flex-box flex-column basic-box-padding popup-entrance-animation popup-content-elevation"
        style={{ maxWidth: '90vw', width: '600px' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
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
        
        <div className="flex-box flex-column basic-box-padding gap-1">
          {message && <div id="popup-title" className="bold-text personal-area-content">{message}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};

PopupComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node,
  showCloseButton: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool
};

export default PopupComponent;