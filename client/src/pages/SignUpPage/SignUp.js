import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";

// import components here
import DynamicButton from "../../components/ButtonComponent";
import FormComponent from "../../components/FormComponent";
// import pages here

function SignUpPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <div>
        <FormComponent></FormComponent>
      </div>
      <div>
        <DynamicButton className="button" onClick={goBack} text="Back" />
      </div>
    </div>
  );
}

export default SignUpPage;
