import React from "react";
import PropTypes from "prop-types";

import PersonItemCard from "./PersonItemCard";
import PersonItemTable from "./PersonItemTable";

const tem = ({
  name,
  birthDate,
  sex,
  phoneNumber,
  email,
  address,
  insurance,
  idNumber,
  skills,
  style,
  newUser,
  type,
}) => {
  //   const { t } = useTranslation("homeAdmin");
  //   const { t: tsignup } = useTranslation("signUp");
  //   const { t: tskill } = useTranslation("skills");

  const handleApprove = () => {
    console.log("approve button clicked");
  };
  const handleReject = () => {
    console.log("reject button clicked");
  };
  const handleViewLogs = () => {
    console.log("view logs button clicked");
  };
  const handleAddLogs = () => {
    console.log("add log button clicked");
  };

  //TODO make half appear on the right and half on the left
  return (
    <>
      {type === "card" && (
        <>
          <PersonItemCard
            name={name}
            birthDate={birthDate}
            sex={sex}
            skills={skills}
            phoneNumber={phoneNumber}
            email={email}
            address={address}
            insurance={insurance}
            idNumber={idNumber}
            newUser={newUser}
            style={style}
            approveFunction={handleApprove}
            rejectFunction={handleReject}
            addLogFunction={handleAddLogs}
            viewLogsFunction={handleViewLogs}
          />
        </>
      )}

      {type === "table" && (
        <>
          <PersonItemTable
            name={name}
            birthDate={birthDate}
            sex={sex}
            skills={skills}
            phoneNumber={phoneNumber}
            email={email}
            address={address}
            insurance={insurance}
            idNumber={idNumber}
            newUser={newUser}
            style={style}
            approveFunction={handleApprove}
            rejectFunction={handleReject}
            addLogFunction={handleAddLogs}
            viewLogsFunction={handleViewLogs}
          />
        </>
      )}
    </>
  );
};

tem.propTypes = {
  name: PropTypes.string,
  birthDate: PropTypes.string,
  sex: PropTypes.string,
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  email: PropTypes.string,
  address: PropTypes.string,
  insurance: PropTypes.string,
  idNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object,
  newUser: PropTypes.bool,
};

tem.defaultProps = {
  style: {},
  email: "",
  address: "",
  Insurance: "",
  idNumber: "",
  birthDate: "",
  sex: "",
  phoneNumber: "",
  name: "",
};

export default tem;
