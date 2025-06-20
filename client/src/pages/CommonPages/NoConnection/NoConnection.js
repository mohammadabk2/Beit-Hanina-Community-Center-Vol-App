import React from "react";
import PropTypes from "prop-types";
const NoConnection = ({ message = "لا يوجد اتصال بالإنترنت" }) => {
  return (
    <div className="no-connection-container">
      <h2 className="no-connection-title">{message}</h2>
      <p className="no-connection-subtext">
        يرجى التحقق من اتصالك بالشبكة والمحاولة مرة أخرى.
      </p>
    </div>
  );
};

NoConnection.propTypes = {
  message: PropTypes.string,
};

export default NoConnection;
