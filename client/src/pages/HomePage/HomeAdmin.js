import React from "react";
import { useTranslation } from "react-i18next";

import DropDownMenu from "../../components/DropDownMenu";
import { useLnOptions } from "../../config/Language";
// import DynamicButton from "../../components/ButtonComponent";

function HomeAdmin() {
  const lnOptions = useLnOptions();
  const { t } = useTranslation("home"); //! change to Admin when made

  return (
    <div className="app flex-box">
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />
      </div>
      <main>
        <h1>Home Admin Page</h1>
      </main>
    </div>
  );
}

export default HomeAdmin;
