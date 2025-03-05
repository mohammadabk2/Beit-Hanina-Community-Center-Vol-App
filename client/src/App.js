import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import components here
import Home from "./pages/Home";
// TODO:
// import About from './pages/About';
// import Settings from './pages/Settings';
let username, password;

function App() {
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
            <input className="Input-field" placeholder="Username" type="text" value={username}></input>
            <input className="Input-field" placeholder="Password" type="password" value={password}></input>
          </div>
          <div className="Button-box">
            <button className="Button">Sign in</button>
            <button className="Button">Sign up</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
