import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import components here
import Home from "./pages/Home";
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";

// TODO:
// import About from './pages/About';
// import Settings from './pages/Settings';

function App() {
  const [username, setUserName] = useState("");
  const [password , setPassword] = useState("");

  const handleUserName = (event) =>{
    setUserName(event.target.value);
  }

  const handlePassword = (event) =>{
    setPassword(event.target.value);
  }

  const signIn = (event) => {
    console.log("sign in button clicked");
    console.log(username);
    console.log(password);
  };

  const signUp = (event) => {
    console.log("sign up button clicked");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beit Hanina Community Center Volunteer App</h1>
      </header>
      <main>
        {/* //TODO: add routes as needed*/}
        {/* <Switch> */}
        {/* <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/settings" component={Settings} /> */}
        {/* Add other routes here */}
        {/* </Switch> */}

        <div className="Sign-in-box">
          <h2>Welcome to Beit Hanina Community Center</h2>
          <div className="Input-field-box">
            <DynamicInput
              className="Input-field"
              type="text"
              value={username}
              onChange={handleUserName}
              placeholder="Enter UserName"
            />
            <DynamicInput
              className="Input-field"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Enter Password"
            />
          </div>

          <div className="Button-box">
            <DynamicButton className="Button" onClick={signIn} text="Sign in" />
            <DynamicButton className="Button" onClick={signUp} text="Sign up" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
