import React from "react";
import PropTypes from "prop-types";

import DynamicButton from "../ButtonComponent";
import { useTranslation } from "react-i18next";

const PersonItemTable = ({
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
  approveFunction,
  rejectFunction,
  viewLogsFunction,
  addLogFunction,
}) => {
  const { t } = useTranslation("homeAdmin");
  const { t: tsignup } = useTranslation("signUp");
  const { t: tskill } = useTranslation("skills");

  //TODO make half appear on the right and half on the left
  return (
    <div className="flex-box" style={style}>
      <>
        <table>
          <tr>
            <th>{tsignup("fullName")}</th>
            <th>{tsignup("birthDate")}</th>
            <th>{tsignup("address")}</th>
            <th>{tsignup("gender")}</th>
            <th>{tsignup("phoneNumber")}</th>
            <th>{tsignup("email")}</th>
            <th>{tsignup("insurance")}</th>
            <th>{tsignup("idNumber")}</th>
            <th>{t("approve_button")}</th>
            <th>{t("reject_button")}</th>
            <th>{t("add_log")}</th>
            <th>{t("view_log")}</th>
          </tr>

          <tr>
            <td>{name}</td>
            <td>{birthDate}</td>
            <td>{address}</td>
            <td>{sex}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td>{insurance}</td>
            <td>{idNumber}</td>

            <td>
              {newUser && (
                <>
                  <DynamicButton
                    className="button button-approve"
                    text={t("approve_button")}
                    onClick={approveFunction}
                  />
                </>
              )}
            </td>

            <td>
              {newUser && (
                <>
                  <DynamicButton
                    className="button button-reject"
                    text={t("reject_button")}
                    onClick={rejectFunction}
                  />
                </>
              )}
            </td>

            <td>
              {!newUser && (
                <>
                  <DynamicButton
                    className="button"
                    text={t("add_log")}
                    onClick={addLogFunction}
                  />
                </>
              )}
            </td>

            <td>
              {!newUser && (
                <>
                  <DynamicButton
                    className="button"
                    text={t("view_log")}
                    onClick={viewLogsFunction}
                  />
                </>
              )}
            </td>
          </tr>
        </table>
      </>

      {/* <div className="">
        <div>{tskill("skills")}:</div>

        <div className="">
          {skills.map((person, index) => (
            <div key={index} className="skills">
              {person}
              {index < skills.length - 1 && " "}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

PersonItemTable.propTypes = {
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
  approveFunction: PropTypes.func.isRequired,
  rejectFunction: PropTypes.func.isRequired,
  viewLogsFunction: PropTypes.func.isRequired,
  addLogFunction: PropTypes.func.isRequired,
};

PersonItemTable.defaultProps = {
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

export default PersonItemTable;
