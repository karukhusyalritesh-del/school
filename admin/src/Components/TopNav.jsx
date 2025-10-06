import React from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const FirstNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-[#263675] text-white font-sans">
      {/* Left Side */}
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <FaPhone className="text-sm" />
          <span>9821775780 | 9808054226</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-sm" />
          <span>vidyainfo@gmail.com</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-300">
          <FaFacebook className="text-lg" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <FaInstagram className="text-lg" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <FaWhatsapp className="text-lg" />
        </a>
      </div>
    </nav>
  );
};

export default FirstNavbar;
