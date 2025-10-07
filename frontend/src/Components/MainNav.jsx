import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import {
  FaHome,
  FaInfoCircle,
  FaChevronDown,
  FaUserTie,
  FaEnvelope,
  FaBell,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import darkModeColors from "./DarkMode";

const MainNav = ({ isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // ✅ helper to scroll or navigate
  const handleNav = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`${
        isDarkMode ? darkModeColors.mainNav : "bg-white text-black"
      } sticky top-0 z-50 shadow-sm px-6 py-3 flex justify-between items-center transition-all duration-300`}
    >
      {/* Logo */}
      <div className="logo cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="h-12 mix-blend-multiply" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center space-x-6 relative font-sans text-lg">
        <li>
          <button
            onClick={() => handleNav("home")}
            className={`flex items-center gap-2 cursor-pointer ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
          >
            <FaHome /> Home
          </button>
        </li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
          >
            <FaInfoCircle /> About Us
            <FaChevronDown
              className={`ml-1 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {dropdownOpen && (
            <ul
              className={`${
                isDarkMode ? "bg-[#242250] text-white" : "bg-white text-black"
              } absolute left-0 mt-2 w-40 shadow-md rounded-md`}
            >
<li>
  <Link
    to="/activities"
    className="block w-full text-left px-4 py-2 hover:bg-[#432323]"
    onClick={() => setDropdownOpen(false)}
  >
    Activities
  </Link>
</li>

<li>
  <Link
    to="/environment"
    className="block w-full text-left px-4 py-2 hover:bg-[#432323]"
    onClick={() => setDropdownOpen(false)}
  >
    Environment
  </Link>
</li>
<li>
  <Link
    to="/teachers"
    className="block w-full text-left px-4 py-2 hover:bg-[#432323]"
    onClick={() => setDropdownOpen(false)}
  >
    Teachers
  </Link>
</li>

            </ul>
          )}
        </li>
<li>
  <Link
    to="/principle"
    className={`flex items-center gap-2 ${
      isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
    }`}
  >
    <FaUserTie /> Principle
  </Link>
</li>

        <li>
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate("/notice");
              } else {
                toast.error("You must be logged in to access school notice");
              }
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
          >
            <FaBell /> Notice
          </button>
        </li>
<li>
  <Link
    to="/contact"
    className={`flex items-center gap-2 ${
      isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
    }`}
  >
    <FaEnvelope /> Contact
  </Link>
</li>

        <li>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            <FaUser /> Admin
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 bg-[#263675] text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Icon */}
      <button
        className="lg:hidden flex flex-col space-y-1 ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`${
            isDarkMode ? "bg-white" : "bg-black"
          } block w-6 h-0.5`}
        ></span>
        <span
          className={`${
            isDarkMode ? "bg-white" : "bg-black"
          } block w-6 h-0.5`}
        ></span>
        <span
          className={`${
            isDarkMode ? "bg-white" : "bg-black"
          } block w-6 h-0.5`}
        ></span>
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 ${
          isDarkMode ? "bg-[#242250] text-white" : "bg-white text-black"
        } shadow-md flex flex-col z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img src={logo} alt="Logo" className="h-12 mix-blend-multiply" />
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } text-xl`}
            />
          </button>
        </div>

        {/* Mobile Links */}
        <ul className="flex-1 flex flex-col justify-center items-start px-6 space-y-6 text-xl">
          <li>
            <button
              onClick={() => {
                handleNav("home");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <FaHome /> Home
            </button>
          </li>
          <li>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              <FaInfoCircle /> About Us
              <FaChevronDown
                className={`ml-2 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <ul className="mt-2 space-y-2 text-base pl-4">
<li>
  <Link
    to="/activities"
    onClick={() => {
      handleNav("second-section");
      setMenuOpen(false);
    }}
  >
    Activities
  </Link>
</li>
<li>
  <Link
    to="/environment"
    onClick={() => {
      handleNav("aboutSection");
      setMenuOpen(false);
    }}
  >
    Environment
  </Link>
</li>
<li>
  <Link
    to="/teachers"
    onClick={() => {
      handleNav("container-new");
      setMenuOpen(false);
    }}
  >
    Teachers
  </Link>
</li>
              </ul>
            )}
          </li>
<li>
  <Link
    to="/principle"
    className="flex items-center gap-2"
    onClick={() => {
      handleNav("third-section");
      setMenuOpen(false);
    }}
  >
    <FaUserTie /> Principle
  </Link>
</li>
          <li>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/notice");
                } else {
                  toast.error("You must be logged in to access school notice");
                }
                setMenuOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <FaBell /> Notice
            </button>
          </li>
<li>
  <Link
    to="/contact"
    className="flex items-center gap-2"
    onClick={() => {
      handleNav("contact");
      setMenuOpen(false);
    }}
  >
    <FaEnvelope /> Contact
  </Link>
</li>
        </ul>

        {/* Admin/Login */}
        <div className="flex flex-col items-start mb-8 px-6 space-y-3">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser /> Admin
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-2 bg-[#263675] text-white rounded hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
