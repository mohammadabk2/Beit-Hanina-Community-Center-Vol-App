import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages here
import App from "./App";
import SignUpPage from "./pages/SignUpPage/SignUp";
import HomeVolunteerPage from "./pages/HomePage/HomeVolunteer";
import PersonalAreaVolunteerPage from "./pages/PersonalAreaPage/PersonalAreaVolunteer";
import PersonalAreaOrganizerPage from "./pages/PersonalAreaPage/PersonalAreaOrganizer";
import PersonalAreaAdminPage from "./pages/PersonalAreaPage/PersonalAreaAdmin";
import HomeOrganizerPage from "./pages/HomePage/HomeOrganizer";
import HomeAdminPage from "./pages/HomePage/HomeAdmin";
import AboutPage from "./pages/AboutPage/About";
import ULAPage from "./pages/CommonPages/ULA";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home-volunteer" element={<HomeVolunteerPage />} />
        <Route path="/home-organizer" element={<HomeOrganizerPage />} />
        <Route path="/home-admin" element={<HomeAdminPage />} />
        <Route
          path="/personal-area-vol"
          element={<PersonalAreaVolunteerPage />}
        />
        <Route
          path="/personal-area-org"
          element={<PersonalAreaOrganizerPage />}
        />
        <Route
          path="/personal-area-admin"
          element={<PersonalAreaAdminPage />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ULA" element={<ULAPage />} />       
      </Routes>
    </Router>
  );
};

export default AppRouter;
