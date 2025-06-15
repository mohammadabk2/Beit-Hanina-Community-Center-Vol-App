import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import DynamicButton from "../../components/common/ButtonComponent";
import ManageAccountBox from "../../components/ManageAccountBox";
import SelectSkills from "../../components/common/SelectComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

import { useAuth } from "../../config/Context/auth";

const PersonalArea = () => {
  const { t } = useTranslation("personalVolunteer");
  const { t: tsignup } = useTranslation("signUp");
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const { userId, token } = useAuth();

  const [userData, setUserData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/Info`, {
          params: { userID: userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data.userData);
        } else {
          console.log(`${response.status} ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (userId && token) {
      fetchUserInfo();
    }
  }, [userId, token, API_BASE_URL]);

  const handleSkills = (e) => {
    if (e && e.target && Array.isArray(e.target.value)) {
      setUserSkills(e.target.value);
      //TODO add edit skills or change them to view only
    } else {
      console.error("Received unexpected event structure in handleSkills:", e);
    }
  };

  const printToPdf = () => {
    console.log("print to PDF button clicked");
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-box-padding">
            {userData ? (
              <>
                <div className="personal-area-content basic-item-padding">
                  {tsignup("fullName")}: {userData.name}
                </div>

                <div className="personal-area-content basic-item-padding">
                  {t("approved_hours")}: {userData.approved_hours}
                </div>

                <div className="personal-area-content basic-item-padding">
                  {t("unapproved_hours")}: {userData.unapproved_hours}
                </div>
              </>
            ) : (
              <div>Loading user data...</div>
            )}
          </div>

          <SelectSkills
            type="skills"
            onChange={handleSkills}
            chosen={userSkills}
          />

          <DynamicButton
            className="button"
            text={t("to_pdf")}
            onClick={printToPdf}
          />

          <ManageAccountBox />
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default PersonalArea;
