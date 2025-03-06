import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";

// import components here
import DynamicInput from "../../components/InputComponent";
import DynamicButton from "../../components/ButtonComponent";
import DropDownMenu from "../../components/DropDownMenu";
// import pages here

function SignUpPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <DynamicButton className="button" onClick={goBack} text="Back" />
    </div>
  );
}

export default SignUpPage;