import React, { useState } from "react";
import { FaPlus, FaPhoneAlt, FaEnvelope, FaSun, FaMoon } from "react-icons/fa";

const FloatingMenu = ({ onToggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // 🌙 track current mode

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleDarkModeClick = () => {
    setIsDark(!isDark); // toggle icon state
    onToggleDarkMode(); // keep your existing dark mode function
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-end">
        {/* Floating Buttons */}
        <div
          className={`absolute bottom-24 right-0 flex flex-col space-y-3 transition-all duration-300 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <a
            href="tel:9819999475"
            className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer"
            title="Call Us"
          >
            <FaPhoneAlt size={20} />
          </a>
          <a
            href="mailto:riteshtharu58@gmail.com?subject=Hello%20there&body=This%20is%20a%20pre-filled%20message"
            className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer"
            title="Send Email"
          >
            <FaEnvelope size={20} />
          </a>
          <button
            onClick={handleDarkModeClick}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer ${
              isDark ? "bg-gray-800" : "bg-yellow-500"
            }`}
            title="Toggle Dark Mode"
          >
            {isDark ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>

        {/* Main Floating Button */}
        <button
          onClick={toggleMenu}
          className={`w-12 h-12 rounded-full bg-[#263675] text-white flex items-center justify-center text-2xl shadow-lg hover:bg-blue-800 transition-transform duration-300 cursor-pointer ${
            menuOpen ? "rotate-45" : "rotate-0"
          }`}
          title="Menu"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;