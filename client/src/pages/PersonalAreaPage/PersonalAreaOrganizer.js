import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import ManageAccountBox from "../../components/ManageAccountBox";
// import SelectSkills from "../../components/common/SelectComponent";
import NavigationBar from "../../components/layout/NavigationBar";
import CopyRight from "../../components/layout/CopyRight";

import { useAuth } from "../../config/Context/auth";

import { SERVER_IP } from "../../config/constants/global";

const PersonalArea = () => {
  const { t } = useTranslation("personal");
  const API_BASE_URL = SERVER_IP;
  const { userId, token } = useAuth();

  const [userData, setUserData] = useState(null);
  // const [userSkills, setUserSkills] = useState([]);

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

  // const handleSkills = (e) => {
  //   if (e && e.target && Array.isArray(e.target.value)) {
  //     setUserSkills(e.target.value);
  //     //TODO add edit skills or change them to view only
  //   } else {
  //     console.error("Received unexpected event structure in handleSkills:", e);
  //   }
  // };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar />
      <div className="general-box flex-box">
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <div className="basic-box-padding">
            {userData ? (
              <>
                <div className="personal-area-content basic-item-padding">
                  {t("org_name")}: {userData.org_name}
                </div>

                <div className="personal-area-content basic-item-padding">
                  {t("total_hours")}: {userData.given_hours}
                </div>
              </>
            ) : (
              <div>Loading user data...</div>
            )}
          </div>

          {/* <SelectSkills
            type="skills"
            onChange={handleSkills}
            chosen={userSkills}
          /> */}

          <ManageAccountBox />
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default PersonalArea;
