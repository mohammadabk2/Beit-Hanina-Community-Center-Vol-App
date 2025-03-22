import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages here
import App from "./App";
import SignUpPage from "./pages/SignUpPage/SignUp";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;