import React from "react";
import { FaSchool, FaDesktop, FaBus, FaLandmark } from "react-icons/fa";
import darkModeColors from "./DarkMode";
import { motion } from "framer-motion";

const WhyVidyaSchool = ({ isDarkMode }) => {
  const features = [
    { icon: <FaSchool />, text: "Neat & Clean" },
    { icon: <FaDesktop />, text: "Computer Lab" },
    { icon: <FaBus />, text: "Transportation\nService" },
    { icon: <FaLandmark />, text: "Nepal Government\nCertification Achieved" },
  ];

  return (
    <section
      id="approved"
      className={`font-sans py-12 px-4 transition-colors duration-500 overflow-x-hidden ${
        isDarkMode ? darkModeColors.whyVidyaSchool : "bg-white text-black"
      }`}
    >
      <motion.div
      initial={{opacity: 0, x:-200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
       className="max-w-3xl mx-auto text-center">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? "text-[wheat]" : "text-[#263675]"
          }`}
        >
          Why Vidya School
        </h1>

        <p
          className={`text-lg md:text-xl mb-8 leading-relaxed ${
            isDarkMode ? "text-[#e0e0e0]" : "text-gray-500"
          }`}
        >
          Our school boasts a neat and clean environment, ideal for learning. We offer a
          state-of-the-art computer lab and reliable transportation services for students.
          Proudly, our school is officially approved by the Government of Nepal,
          highlighting our commitment to excellence in education.
        </p>

        <div className="flex flex-wrap justify-around gap-6 mt-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div
                className={`p-5 rounded-full text-3xl mb-3 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-[#444] text-white hover:bg-[#a9aef0]"
                    : "bg-[#263675] text-white hover:bg-orange-500"
                }`}
              >
                {feature.icon}
              </div>
              <p className="whitespace-pre-line text-base md:text-lg">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyVidyaSchool;
