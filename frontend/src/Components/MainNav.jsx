import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import Footer from "./Footer";
import {
  FaHome,
  FaInfoCircle,
  FaChevronDown,
  FaUserTie,
  FaEnvelope,
  FaBell,
  FaUser,
  FaTimes,
  FaMoneyBillWave
} from "react-icons/fa";
import darkModeColors from "./DarkMode";

const MainNav = ({ isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  
  // Create ref for sidebar
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Add event listener when sidebar is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle body overflow
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

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

        {/* About Us Dropdown */}
        <li className="relative">
          <button
            className={`flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaInfoCircle /> About Us
            <FaChevronDown
              className={`ml-1 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <ul
            className={`absolute -left-12 mt-5 lg:pt-3 lg:pb-3 w-60 shadow-md rounded-md transition-all duration-300 overflow-hidden
              ${isDarkMode ? "bg-[#242250] text-white" : "bg-[#f8f9fa] text-black"}
              ${dropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95 pointer-events-none"}
              lg:mr-24
            `}
          >
            <li className="w-full flex justify-center group">
              <div className="w-52 mx-auto relative overflow-hidden rounded">
                <Link
                  to="/activities"
                  className="block w-full text-center px-4 py-3 hover:bg-blue-200/50 hover:backdrop-blur-md hover:text-[#263675] rounded transition-all duration-300 transform group-hover:translate-x-[-8px]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Activities
                </Link>
              </div>
            </li>
            <li className="w-full flex justify-center group">
              <div className="w-52 mx-auto relative overflow-hidden rounded">
                <Link
                  to="/environment"
                  className="block w-full text-center px-4 py-3 hover:bg-blue-200/50 hover:backdrop-blur-md hover:text-[#263675] rounded transition-all duration-300 transform group-hover:translate-x-[-8px]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Environment
                </Link>
              </div>
            </li>
            <li className="w-full flex justify-center group">
              <div className="w-52 mx-auto relative overflow-hidden rounded">
                <Link
                  to="/teachers"
                  className="block w-full text-center px-4 py-3 hover:bg-blue-200/50 hover:backdrop-blur-md hover:text-[#263675] rounded transition-all duration-300 transform group-hover:translate-x-[-8px]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Teachers
                </Link>
              </div>
            </li>
          </ul>
        </li>

        <li>
          <Link
            to="/principle"
            className={`flex items-center gap-2 ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
          >
            <FaUserTie /> Founder
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
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate("/feestructure");
              } else {
                toast.error("You must be logged in to access school fee structure");
              }
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
          >
            <FaMoneyBillWave /> Fee
          </button>
        </li>

        <li>
          <Link
            to="/uniform"
            className={`flex items-center gap-2 ${
              isDarkMode ? "hover:text-gray-300" : "hover:text-[#263675]"
            }`}
          >
            <FaEnvelope /> Uniform
          </Link>
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
          <Link className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition" to="/admin">
            <FaUser /> Admin
          </Link>
        </li>

        <li>
          <Link className="flex items-center gap-2 px-4 py-2 bg-[#263675] text-white rounded hover:bg-blue-700 transition" to="/login">
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <button
        className="lg:hidden flex flex-col space-y-1 ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`${isDarkMode ? "bg-white" : "bg-black"} block w-6 h-0.5`}></span>
        <span className={`${isDarkMode ? "bg-white" : "bg-black"} block w-6 h-0.5`}></span>
        <span className={`${isDarkMode ? "bg-white" : "bg-black"} block w-6 h-0.5`}></span>
      </button>

      {/* Backdrop Overlay - Click outside to close */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm ${
          isDarkMode ? "bg-[#242250] text-white" : "bg-white text-black"
        } shadow-md flex flex-col z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img src={logo} alt="Logo" className="h-12 mix-blend-multiply" />
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition"
          >
            <FaTimes className={`${isDarkMode ? "text-white" : "text-black"} text-xl`} />
          </button>
        </div>

        <ul className="flex-1 flex flex-col justify-center items-start px-6 space-y-6 text-xl">
          <li>
            <button
              onClick={() => {
                handleNav("home");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
            >
              <FaHome /> Home
            </button>
          </li>

          {/* Mobile Dropdown */}
          <li className="w-full">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
            >
              <FaInfoCircle /> About
              <FaChevronDown
                className={`ml-2 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <ul className="mt-2 space-y-2 text-base pl-4 w-full">
                <li>
                  <Link
                    to="/activities"
                    onClick={() => {
                      handleNav("second-section");
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                    className="block py-1 hover:text-[#263675] transition-colors"
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
                      setDropdownOpen(false);
                    }}
                    className="block py-1 hover:text-[#263675] transition-colors"
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
                      setDropdownOpen(false);
                    }}
                    className="block py-1 hover:text-[#263675] transition-colors"
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
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
              onClick={() => {
                handleNav("third-section");
                setMenuOpen(false);
              }}
            >
              <FaUserTie /> Founder
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
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
            >
              <FaBell /> Notice
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/feestructure");
                } else {
                  toast.error("You must be logged in to access school fee structure");
                }
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
            >
              <FaMoneyBillWave /> Fee
            </button>
          </li>

          <li>
            <Link
              to="/uniform"
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <FaEnvelope /> Uniform
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="flex items-center gap-2 hover:text-[#263675] transition-colors"
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
            className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition w-full justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser /> Admin
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-2 bg-[#263675] text-white rounded hover:bg-blue-700 transition w-full justify-center"
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