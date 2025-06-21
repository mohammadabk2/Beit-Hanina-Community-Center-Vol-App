import React from "react";
import PropTypes from "prop-types";

import "./loading.css"

const LoadingPage = ({ message = "جارٍ التحميل..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">{message}</p>
    </div>
  );
};

LoadingPage.propTypes = {
  message: PropTypes.string,
};

export default LoadingPage;
