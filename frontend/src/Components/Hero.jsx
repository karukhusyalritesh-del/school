import React from "react";
import student from "../assets/student.png"; // foreground image
import studentbg from "../assets/studentbg.png"; // background image
import darkModeColors from "./DarkMode"; // ✅ import dark mode colors

const Hero = ({ isDarkMode }) => {
  return (
    <section
      id="home"
      className={`flex flex-col lg:flex-row items-center px-6 lg:px-12 min-h-[82vh] relative ${
        isDarkMode ? darkModeColors.hero : "bg-[#e3e5f4] text-black"
      }`}
    >
      {/* Left text / top on mobile and tablet */}
      <div className="flex-1 px-4 lg:px-0 mt-8 lg:mt-0">
        <h1
          className={`text-3xl lg:text-5xl py-6 font-bold tracking-[2px] lg:tracking-[4px] whitespace-nowrap ${
            isDarkMode ? "text-white" : "text-[#263675]"
          }`}
        >
          Welcome to Our School
        </h1>
        <p className={`${isDarkMode ? "text-white" : "text-black"} text-base lg:text-lg leading-relaxed`}>
          Vidya Niketan Academy is a school that gives better education to all students. We have 10+ years of experience in teaching and taking care of children. Our school is always clean and well-managed, so students can study in a good and safe place. The students who studied here have a strong base and are doing well in higher studies. We help children learn better so they can have a good life in the future. We believe in giving every child the best start in their education journey.
        </p>
      </div>

      {/* Right images / below text on mobile and tablet */}
      <div className="flex-1 relative flex items-center justify-center w-full lg:w-auto mt-8 lg:mt-0">
        <img
          src={studentbg}
          alt="Background"
          className="absolute w-3/4 lg:w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow z-10"
        />
        <img
          src={student}
          alt="Foreground"
          className="w-3/4 lg:w-3/5 relative z-20"
        />
      </div>
    </section>
  );
};

export default Hero;
