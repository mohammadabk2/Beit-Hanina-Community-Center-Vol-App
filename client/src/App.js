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

function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //TODO these could be changed so that it doesnt save the value each letter
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const signIn = (event) => {
    console.log("sign in button clicked");
    console.log(username);
    console.log(password); //! testing only remove security risk
  };

  const navigate = useNavigate();
  const signUp = (event) => {
    console.log("sign up button clicked");
    navigate("/sign-up");
  };

  const options = [
    {
      label: "ar",
      href: "#option1",
      onClick: () => console.log("Arabic clicked"),
    },
    {
      label: "en",
      href: "#option2",
      onClick: () => console.log("English clicked"),
    },
    // { label: "hb", href: "#option3", onClick: () => console.log("hebrew clicked") },
  ];

  return (
    <div className="app flex-container">
      <div className="drop-down">
        <DropDownMenu className="language-button" text="Ln" options={options} />
      </div>
      <header className="app-header">
        <h1>Beit Hanina Community Center Volunteer App</h1>
      </header>
      <main>
        <div className="sign-in-box flex-container smooth-shadow-box">
          <h2>Welcome to Beit Hanina Community Center</h2>
          <div className="input-field-box flex-container">
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
          </div>
          <div className="button-box flex-container">
            <DynamicButton className="button" onClick={signIn} text="Sign in" />
            <DynamicButton className="button" onClick={signUp} text="Sign up" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
