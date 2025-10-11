import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PencilBg from "../assets/pencil.jpg"; 
import { FaPencilAlt, FaUserGraduate, FaBaseballBall } from "react-icons/fa";
import darkModeColors from "./DarkMode";

const Card = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/activities' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  return (
    <section
      ref={sectionRef}
      id="second-section"
      className="bg-cover bg-center bg-fixed min-h-screen flex justify-center items-center relative"
      style={{ backgroundImage: `url(${PencilBg})` }}
    >
      {isDarkMode && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        ></div>
      )}

      <div className="flex flex-wrap justify-center items-end gap-5 p-3 sm:p-5 relative z-10">
        {/* Power Card */}
        <div
          className={`border border-gray-300 border-b-4 border-b-blue-900 rounded-xl max-w-xs sm:max-w-sm md:max-w-md w-full p-4 sm:p-5 text-center shadow-md hover:-translate-y-1 transition-transform min-h-[400px] flex flex-col justify-start ${
            isDarkMode ? darkModeColors.card : "bg-white"
          }`}
        >
          <div className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-lg mx-auto mb-5">
            <FaPencilAlt className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-sans mb-2">Power</h3>
          <p className={`${isDarkMode ? "text-gray-200" : "text-gray-600"} text-sm sm:text-base leading-relaxed`}>
            At our School, we guide students from basics to advanced stages,
            symbolized by the journey from pencil to pen...
          </p>
        </div>

        {/* Futures Card */}
        <div
          className={`border border-gray-300 border-b-4 border-b-blue-900 rounded-xl max-w-md w-full p-4 sm:p-5 text-center shadow-md hover:-translate-y-1 transition-transform min-h-[420px] flex flex-col justify-start ${
            isDarkMode ? darkModeColors.card : "bg-white"
          }`}
        >
          <div className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-lg mx-auto mb-5">
            <FaUserGraduate className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-sans mb-2">Futures</h3>
          <p className={`${isDarkMode ? "text-gray-200" : "text-gray-600"} text-sm sm:text-base leading-relaxed`}>
            At Our School, we build a strong academic foundation that helps
            students advance smoothly...
          </p>
        </div>

        {/* Sports Card */}
        <div
          className={`border border-gray-300 border-b-4 border-b-blue-900 rounded-xl max-w-xs sm:max-w-sm md:max-w-md w-full p-4 sm:p-5 text-center shadow-md hover:-translate-y-1 transition-transform min-h-[400px] flex flex-col justify-start ${
            isDarkMode ? darkModeColors.card : "bg-white"
          }`}
        >
          <div className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-lg mx-auto mb-5">
            <FaBaseballBall className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-sans mb-2">Sports</h3>
          <p className={`${isDarkMode ? "text-gray-200" : "text-gray-600"} text-sm sm:text-base leading-relaxed`}>
            We emphasize both physical and educational activities, such as
            quizzes, math games, and sports...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Card;
