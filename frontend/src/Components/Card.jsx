import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PencilBg from "../assets/pencil.jpg"; 
import { FaPencilAlt, FaUserGraduate, FaBaseballBall } from "react-icons/fa";
import darkModeColors from "./DarkMode";
import useForceDesktop from "../utils/UserForceDesktop"

const Card = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to activities section when route is /activities
    if (location.pathname === '/activities' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [location]);
  return (
    <section ref={sectionRef}
      id="second-section"
      className="bg-cover bg-center bg-fixed min-h-screen flex justify-center items-center relative"
      style={{ backgroundImage: `url(${PencilBg})` }}
    >
      {/* Dark overlay for dark mode */}
{/* Dark overlay for dark mode */}
{isDarkMode && (
  <div
    className="absolute inset-0 z-0"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} // black with 60% opacity
  ></div>
)}


      <div className="flex flex-wrap justify-center items-end gap-5 p-5 relative z-10">
        {/* Power Card */}
        <div
          className={`border border-gray-300 border-b-4 border-b-blue-900 rounded-xl max-w-xs w-full p-5 text-center shadow-md hover:-translate-y-1 transition-transform h-[400px] flex flex-col justify-start ${
            isDarkMode ? darkModeColors.card : "bg-white"
          }`}
        >
          <div className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-lg mx-auto mb-5">
            <FaPencilAlt className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-sans mb-2">Power</h3>
          <p className={`${isDarkMode ? "text-gray-200" : "text-gray-600"} text-base leading-relaxed`}>
            At our School, we guide students from basics to advanced stages,
            symbolized by the journey from pencil to pen. The pencil represents
            early learning and growth through mistakes. This solid support from
            our School prepares students to excel and reach their potential.
          </p>
        </div>

        {/* Futures Card */}
        <div
          className={`border border-gray-300 border-b-4 border-b-blue-900 rounded-xl max-w-md w-full p-5 text-center shadow-md hover:-translate-y-1 transition-transform h-[450px] flex flex-col justify-start ${
            isDarkMode ? darkModeColors.card : "bg-white"
          }`}
        >
          <div className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-lg mx-auto mb-5">
            <FaUserGraduate className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-sans mb-2">Futures</h3>
          <p className={`${isDarkMode ? "text-gray-200" : "text-gray-600"} text-base leading-relaxed`}>
            At Our School, we build a strong academic foundation that helps
            students advance smoothly into higher education and a successful
            future. Our approach blends rigorous academics with sports and
            technology, preparing children for future challenges. We provide a
            well-rounded education, giving students the skills and confidence to
            thrive in all aspects of life.
          </p>
        </div>

        {/* Sports Card */}
        <div
          className={`border border-gray-300 border-b-4 border-b-blue-900 rounded-xl max-w-xs w-full p-5 text-center shadow-md hover:-translate-y-1 transition-transform h-[400px] flex flex-col justify-start ${
            isDarkMode ? darkModeColors.card : "bg-white"
          }`}
        >
          <div className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-lg mx-auto mb-5">
            <FaBaseballBall className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-sans mb-2">Sports</h3>
          <p className={`${isDarkMode ? "text-gray-200" : "text-gray-600"} text-base leading-relaxed`}>
            We emphasize both physical and educational activities, such as
            quizzes, math problem-solving games, football, cricket, and
            skipping. These help students build physical strength, boost mental
            resilience, and develop a strong mindset.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Card;
