import React from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="footer bg-[#263675] py-6 md:py-[30px] font-['Montserrat'] text-center" id="footer">
        
        {/* Social Media Icons Row */}
        <div className="row w-full my-2 md:my-[1%] py-2 md:py-[0.6%] text-white">
          <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8">
            <a href="#" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 inline-block" aria-label="Facebook">
              <FaFacebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </a>
            <a href="#" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 inline-block" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </a>
            <a href="#" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 inline-block" aria-label="Instagram">
              <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </a>
            <a href="#" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 inline-block" aria-label="Telegram">
              <FaTelegram className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </a>
          </div>
        </div>

        {/* Navigation Links Row */}
        <div className="row w-full my-2 md:my-[1%] py-2 md:py-[0.6%] text-white">
          <ul className="w-full flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-8 lg:space-x-12 px-4">
            <li className="sm:inline-block">
              <a href="#home" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 text-sm sm:text-base md:text-[0.8em] block sm:inline-block py-1 sm:py-0">
                Home
              </a>
            </li>
            <li className="sm:inline-block">
              <a href="#contact" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 text-sm sm:text-base md:text-[0.8em] block sm:inline-block py-1 sm:py-0">
                Contact us
              </a>
            </li>
            <li className="sm:inline-block">
              <a href="#third-section" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 text-sm sm:text-base md:text-[0.8em] block sm:inline-block py-1 sm:py-0">
                Words From Principal
              </a>
            </li>
            <li className="sm:inline-block">
              <a href="#" className="text-white no-underline transition-colors duration-500 hover:text-orange-500 text-sm sm:text-base md:text-[0.8em] block sm:inline-block py-1 sm:py-0">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright Row */}
        <div className="row w-full my-2 md:my-[1%] py-2 md:py-[0.6%] text-white px-4">
          <p className="text-xs sm:text-sm md:text-[0.8em] leading-relaxed">
            Vidya Niketan Academy Copyright © 2025 - All rights reserved
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> || </span>
            Developed By: Ritesh Chaudhary
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;