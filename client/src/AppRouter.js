import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages here
import App from "./App";
import Home from "./pages/HomePage/Home";
import SignUpPage from "./pages/SignUpPage/SignUp";

// TODO:
// import About from './pages/About';
// import Settings from './pages/Settings';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        {/* TODO: Add routes for About and Settings */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} /> */}
        {/* Add other routes here */}
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;