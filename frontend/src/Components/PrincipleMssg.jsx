import React, { useEffect, useRef } from "react";
import { FaGraduationCap } from "react-icons/fa";
import principalImg from "../assets/principle.png"; // principal image
import star from "../assets/star.png"; // star image
import darkModeColors from "./DarkMode";
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

const PrincipalMsg = ({ isDarkMode }) => {

 const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to principle section when route is /principle
    if (location.pathname === '/principle' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [location]);

  return (
    <motion.section
      initial={{opacity: 0, x:-200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
     ref={sectionRef}
      className={`min-h-screen flex justify-center items-center py-0 px-20 bg-contain max-lg:py-8 max-lg:px-4 ${
        isDarkMode ? darkModeColors.principle : "bg-white text-black"
      }`}
      id="third-section"
    >
      <div className="flex justify-between items-center w-full max-lg:flex-col max-lg:gap-8">
        {/* Text Content */}
        <div className="flex-1 max-lg:order-2">
          <h2
            className={`text-5xl font-albert mb-8 flex items-center whitespace-nowrap max-lg:text-3xl max-lg:justify-center max-lg:mb-6 ${
              isDarkMode ? "text-white" : "text-[#263675]"
            }`}
          >
            <FaGraduationCap className="mr-2.5 max-lg:text-2xl" /> Words From Founder
          </h2>
          <p
            className={`font-albert text-xl pt-8 pr-8 leading-relaxed max-lg:text-base max-lg:pt-4 max-lg:pr-0 max-lg:text-justify ${
              isDarkMode ? "text-gray-200" : "text-black"
            }`}
          >
            I hope you all had a wonderful break and are ready to dive into an exciting and productive new school
            year. My name is Rundi Prasad Chaudhary, and I am honored to be your founder. First, I want to
            extend a warm welcome to our new students and a welcome back to our returning ones. Each one of you is a
            valued member of our school community, and I am thrilled to see all the eager faces ready to learn and
            grow. Here at Vidya Niketan Academy, we believe in creating an environment where everyone feels safe,
            respected, and encouraged to reach their full potential. Our dedicated teachers and staff are here to
            support you every step of the way, whether you're mastering a new subject, joining a club or sports
            team, or simply making new friends.
          </p>
        </div>

        {/* Image Container */}
        <div className="flex-none max-w-[50%] relative max-lg:max-w-full max-lg:order-1 max-lg:mb-6">
          <div 
            className="custom-shadow max-lg:mx-auto max-lg:max-w-md"
            style={{
              boxShadow: '-50px -50px 0 -40px tomato, 50px 50px 0 -40px tomato'
            }}
          >
            <div className="relative">
              <img 
                src={principalImg}
                alt="Principal Rundi Prasad Chaudhary" 
                className="w-full h-auto"
              />
              {/* Star positioning */}
              <img 
                src={star}
                alt="Decoration Star" 
                className="absolute top-[-20px] right-[-30px] w-24 h-auto z-10 max-lg:top-[-15px] max-lg:right-[-20px] max-lg:w-16"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PrincipalMsg;
