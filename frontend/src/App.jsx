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

// Protected Route
import ProtectedRoute from "./Components/ProtectedRoute";

// Dark Mode Colors
import darkModeColors from "./Components/DarkMode";
import FeeStructure from "./Pages/FeeStructure";

//  Helper component to handle layout logic
const Layout = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const hideMainNav = location.pathname === "/notice"; // hide on notice page

  return (
    <div
      className={`${
        darkMode ? darkModeColors.body : "bg-white text-black"
      } min-h-screen`}
    >
      <FirstNavbar isDarkMode={darkMode} className="no-print" />

      {/* Only show MainNav  */}
      <MainNav isDarkMode={darkMode} className="no-print" />

      <ToastContainer className="no-print" />

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
              <Footer isDarkMode={darkMode} className="no-print" />
            </>
          }
        />

        <Route path="/login" element={<AuthForm isDarkMode={darkMode} />} />
        <Route path="/admin" element={<AdminAuth isDarkMode={darkMode} />} />

        <Route
          path="/notice"
          element={
            <ProtectedRoute>
              <NoticePage isDarkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route path="/feestructure" element={
          <ProtectedRoute>
            <FeeStructure />
            <Footer className="no-print" />
          </ProtectedRoute>
        }
        />

        <Route
          path="/principle"
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
              <Footer isDarkMode={darkMode} className="no-print" />
            </>
          }
        />

        <Route
          path="/contact"
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
              <Footer isDarkMode={darkMode} className="no-print" />
            </>
          }
        />

        <Route
          path="/activities"
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
              <Footer isDarkMode={darkMode} className="no-print" />
            </>
          }
        />

        <Route
          path="/environment"
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
              <Footer isDarkMode={darkMode} className="no-print" />
            </>
          }
        />

        <Route
          path="/teachers"
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
              <Footer isDarkMode={darkMode} className="no-print" />
            </>
          }
        />
      </Routes>

      <FloatingMenu onToggleDarkMode={toggleDarkMode} className="no-print" />
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