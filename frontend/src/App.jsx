// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
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

// Pages
import NoticePage from "./Pages/Notice";
import AuthForm from "./Pages/login";
import AdminAuth from "./Pages/adminLogin";

// Protected Route
import ProtectedRoute from "./Components/ProtectedRoute";

// Dark Mode Colors
import darkModeColors from "./Components/DarkMode";

const App = () => {
  // ✅ Initialize from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Toggle dark mode and save preference
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  // Optional: add 'dark' class to body for Tailwind utilities
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  return (
    <Router>
      <div className={`${darkMode ? darkModeColors.body : "bg-white text-black"} min-h-screen`}>
        {/* Global Navbars */}
        <FirstNavbar isDarkMode={darkMode} />
        <MainNav isDarkMode={darkMode} />

        {/* Toast notifications */}
        <ToastContainer />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero isDarkMode={darkMode} />
                <Card isDarkMode={darkMode} />
                <PrincipleMssg isDarkMode={darkMode} />
                <Counters isDarkMode={darkMode} />
                <GalleryQuoteLayout isDarkMode={darkMode} />
                <TeacherSlider isDarkMode={darkMode} />
                <WhyVidyaSchool isDarkMode={darkMode} />
                <ContactForm isDarkMode={darkMode} />
                <Footer isDarkMode={darkMode} />
              </>
            }
          />

          {/* Login Pages */}
          <Route path="/login" element={<AuthForm isDarkMode={darkMode} />} />
          <Route path="/admin" element={<AdminAuth isDarkMode={darkMode} />} />

          {/* Protected Notice Page */}
          <Route
            path="/notice"
            element={
              <ProtectedRoute>
                <NoticePage isDarkMode={darkMode} />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Floating menu (always visible on every page) */}
        <FloatingMenu onToggleDarkMode={toggleDarkMode} />
      </div>
    </Router>
  );
};

export default App;
