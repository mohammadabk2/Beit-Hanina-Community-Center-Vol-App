import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  useNavigate,
} from "react-router-dom";

// import components here
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";
import DropDownMenu from "./components/DropDownMenu";
import { lnOptions } from "./components/language";

function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //TODO these could be changed so that it doesnt save the value each letter
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const signIn = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign in button clicked");
    console.log(username);
    console.log(password); //! testing only remove security risk
  };

  const navigate = useNavigate();
  const signUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign up button clicked");
    navigate("/sign-up");
  };


  return (
    <div className="app flex-box flex-column">
      <div className="drop-down">
        <DropDownMenu className="language-button" text="Ln" options={lnOptions} />
      </div>
      <header className="app-header">
        <h1>Beit Hanina Community Center Volunteer App</h1>
      </header>
      <main>
        <div className="sign-in-box flex-box flex-column smooth-shadow-box">
          <h2>Welcome to Beit Hanina Community Center</h2>
          <DynamicInput
            className="input-field"
            type="text"
            value={username}
            name="username-field"
            onChange={handleUserName}
            placeholder="Enter UserName"
          />
          <DynamicInput
            className="input-field"
            type="password"
            value={password}
            name="password-field"
            onChange={handlePassword}
            placeholder="Enter Password"
          />
          <div className="button-box flex-box">
            <DynamicButton className="button" onClick={signIn} text="Sign in" />
            <DynamicButton className="button" onClick={signUp} text="Sign up" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
