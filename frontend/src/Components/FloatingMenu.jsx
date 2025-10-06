import React, { useState } from "react";
import { FaPlus, FaPhoneAlt, FaEnvelope, FaSun } from "react-icons/fa";

const FloatingMenu = ({ onToggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-end">
        {/* Floating Buttons */}
        <div
          className={`absolute bottom-14 right-0 flex flex-col space-y-3 transition-all duration-300 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <a
            href="tel:9819999475"
            className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
            title="Call Us"
          >
            <FaPhoneAlt size={20} />
          </a>
          <a
            href="mailto:riteshtharu58@gmail.com?subject=Hello%20there&body=This%20is%20a%20pre-filled%20message"
            className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
            title="Send Email"
          >
            <FaEnvelope size={20} />
          </a>
          <button
            onClick={onToggleDarkMode}
            className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
            title="Toggle Dark Mode"
          >
            <FaSun size={20} />
          </button>
        </div>

        {/* Main Floating Button */}
        <button
          onClick={toggleMenu}
          className={`w-12 h-12 rounded-full bg-[#263675] text-white flex items-center justify-center text-2xl shadow-lg hover:bg-blue-800 transition-transform duration-300 ${
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
