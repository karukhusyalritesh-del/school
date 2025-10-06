import React from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import darkModeColors from "./DarkMode"; // import dark mode colors

const FirstNavbar = ({ isDarkMode }) => {
  return (
    <nav className={`${isDarkMode ? darkModeColors.navbar : "bg-[#263675] text-white"} px-4 py-2`}>
      <div className="flex justify-between items-center flex-nowrap">

        {/* Left Side */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-8 text-[10px] sm:text-xs lg:text-[12px] flex-shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
            <FaPhone className="text-[12px] sm:text-sm lg:text-[15px]" />
            <span className="text-[10px] sm:text-xs lg:text-[14px]">+977 9821775780 | +977 9808054226</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
            <FaEnvelope className="text-[12px] sm:text-sm lg:text-[15px]" />
            <span className="text-[10px] sm:text-xs lg:text-[15px]">vidyainfo@gmail.com</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
          <a href="#" className={darkModeColors.linkHover}>
            <FaFacebook className="text-[12px] sm:text-lg lg:text-[18px]" />
          </a>
          <a href="#" className={darkModeColors.linkHover}>
            <FaInstagram className="text-[12px] sm:text-lg lg:text-[18px]" />
          </a>
          <a href="#" className={darkModeColors.linkHover}>
            <FaWhatsapp className="text-[12px] sm:text-lg lg:text-[18px]" />
          </a>
        </div>

      </div>
    </nav>
  );
};

export default FirstNavbar;
