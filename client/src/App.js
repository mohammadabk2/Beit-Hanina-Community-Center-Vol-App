import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import components here
import Home from "./pages/Home";
// TODO:
// import Header from './components/Header';
// import Footer from './components/Footer';
// import About from './pages/About';
// import Settings from './pages/Settings';
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
        
        <h2>Welcome to Beit Hanina Community Center</h2>
      </main>
    </div>
  );
}

export default App;
