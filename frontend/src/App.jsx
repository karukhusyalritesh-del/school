import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FirstNavbar from "./Components/TopNav";
import MainNav from "./Components/MainNav";
import Hero from "./Components/Hero";
import Card from "./Components/Card";
import PrincipleMssg from "./Components/PrincipleMssg";
import Counters from "./Components/Counter";
import GalleryQuoteLayout from "./Components/About";
import TeacherSlider from "./Components/TeacherSlider";
import WhyVidyaSchool from "./Components/WhyVidyaSchool";
import ContactForm from "./Components/ContactForm";
import Footer from "./Components/Footer";
import FloatingMenu from "./Components/FloatingMenu";
import SocialSidebar from "./Components/SocialSidebar";

// Pages
import NoticePage from "./Pages/Notice";
import AuthForm from "./Pages/login";
import AdminAuth from "./Pages/adminLogin";
import OTPVerification from "./Pages/OtpVerification"; 
import ResetPassword from "./Pages/ResetPassword"; 

// Protected Route
import ProtectedRoute from "./Components/ProtectedRoute";

// Dark Mode Colors
import darkModeColors from "./Components/DarkMode";
import FeeStructure from "./Pages/FeeStructure";
import StudentUniform from "./Pages/StudentUniform";

// Helper component to handle layout logic
const Layout = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const hideMainNav = location.pathname === "/notice"; 

  return (
    <div className="min-h-screen"> {/* Remove dark mode from global wrapper */}
      <FirstNavbar isDarkMode={darkMode} className="no-print" />

      {/* Only show MainNav */}
      <MainNav isDarkMode={darkMode} className="no-print" />

      <ToastContainer className="no-print" />
      <Routes>
        <Route
          path="/"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black"}>
              <Hero isDarkMode={darkMode} />
              <Card isDarkMode={darkMode} />
              <PrincipleMssg isDarkMode={darkMode} />
              <Counters isDarkMode={darkMode} />
              <GalleryQuoteLayout isDarkMode={darkMode} />
              <TeacherSlider isDarkMode={darkMode} />
              <WhyVidyaSchool isDarkMode={darkMode} />
              <ContactForm isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />

        {/* Auth Routes - No dark mode, always light */}
        <Route path="/login" element={<AuthForm />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes with Dark Mode */}
        <Route
          path="/notice"
          element={
            <ProtectedRoute>
              <div className={darkMode ? darkModeColors.body : "bg-white text-black min-h-screen"}>
                <NoticePage isDarkMode={darkMode} />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/feestructure"
          element={
            <ProtectedRoute>
              <div className={darkMode ? darkModeColors.body : "bg-white text-black min-h-screen"}>
                <FeeStructure isDarkMode={darkMode} />
                <Footer className="no-print" />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/uniform"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black min-h-screen"}>
              <StudentUniform isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />

        <Route
          path="/principle"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black"}>
              <Hero isDarkMode={darkMode} />
              <Card isDarkMode={darkMode} />
              <PrincipleMssg isDarkMode={darkMode} />
              <Counters isDarkMode={darkMode} />
              <GalleryQuoteLayout isDarkMode={darkMode} />
              <TeacherSlider isDarkMode={darkMode} />
              <WhyVidyaSchool isDarkMode={darkMode} />
              <ContactForm isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black"}>
              <Hero isDarkMode={darkMode} />
              <Card isDarkMode={darkMode} />
              <PrincipleMssg isDarkMode={darkMode} />
              <Counters isDarkMode={darkMode} />
              <GalleryQuoteLayout isDarkMode={darkMode} />
              <TeacherSlider isDarkMode={darkMode} />
              <WhyVidyaSchool isDarkMode={darkMode} />
              <ContactForm isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />

        <Route
          path="/activities"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black"}>
              <Hero isDarkMode={darkMode} />
              <Card isDarkMode={darkMode} />
              <PrincipleMssg isDarkMode={darkMode} />
              <Counters isDarkMode={darkMode} />
              <GalleryQuoteLayout isDarkMode={darkMode} />
              <TeacherSlider isDarkMode={darkMode} />
              <WhyVidyaSchool isDarkMode={darkMode} />
              <ContactForm isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />

        <Route
          path="/environment"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black"}>
              <Hero isDarkMode={darkMode} />
              <Card isDarkMode={darkMode} />
              <PrincipleMssg isDarkMode={darkMode} />
              <Counters isDarkMode={darkMode} />
              <GalleryQuoteLayout isDarkMode={darkMode} />
              <TeacherSlider isDarkMode={darkMode} />
              <WhyVidyaSchool isDarkMode={darkMode} />
              <ContactForm isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />

        <Route
          path="/teachers"
          element={
            <div className={darkMode ? darkModeColors.body : "bg-white text-black"}>
              <Hero isDarkMode={darkMode} />
              <Card isDarkMode={darkMode} />
              <PrincipleMssg isDarkMode={darkMode} />
              <Counters isDarkMode={darkMode} />
              <GalleryQuoteLayout isDarkMode={darkMode} />
              <TeacherSlider isDarkMode={darkMode} />
              <WhyVidyaSchool isDarkMode={darkMode} />
              <ContactForm isDarkMode={darkMode} />
              <Footer isDarkMode={darkMode} className="no-print" />
            </div>
          }
        />
      </Routes>

      <FloatingMenu onToggleDarkMode={toggleDarkMode} isDarkMode={darkMode} className="no-print" />
      <SocialSidebar className="no-print" />
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
};

export default App;