import React from "react";
import PropTypes from "prop-types";

const ImageComponent = ({ name, className, src, alt }) => {
  return (
    <img src={src} alt={alt} className={className} aria-label={name} />
  );
};

ImageComponent.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageComponent;
