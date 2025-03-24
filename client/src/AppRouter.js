import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages here
import App from "./App";
import SignUpPage from "./pages/SignUpPage/SignUp";
import HomeVolunteerPage from "./pages/HomePage/HomeVolunteer";
import SettingsPage from "./pages/SettingsPage/Settings";
import PersonalAreaPage from "./pages/PersonalAreaPage/PersonalArea"
import HomeOrganizerPage from "./pages/HomePage/HomeOrganizer";
import HomeAdminPage from "./pages/HomePage/HomeAdmin";
import AboutPage from "./pages/AboutPage/About";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home-volunteer" element={<HomeVolunteerPage />} />
        <Route path="/home-organizer" element={<HomeAdminPage />} />
        <Route path="/home-admin" element={<HomeOrganizerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/personal-area" element={<PersonalAreaPage />} />
        <Route path="/About" element={<AboutPage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
