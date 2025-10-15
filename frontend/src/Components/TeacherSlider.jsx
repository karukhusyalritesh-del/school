import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaQuoteLeft } from "react-icons/fa"; // ✅ added proper react-icon
import viceImg from '../assets/vice.jpg';
import nilamImg from '../assets/nilam.jpg';
import galImg from '../assets/gal.jpg';
import starImg from '../assets/star.png';
import darkModeClasses from './DarkMode'; 
import { motion } from 'framer-motion';

const TeachersSlider = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const location = useLocation();
  const sliderRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/teachers' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [location]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInstant, setIsInstant] = useState(false); // ✅ for instant jump
  const slideInterval = useRef(null);

  const slides = [
    {
      name: "Devendra Yadav",
      role: "Principle",
      description:
        "I am the founder of our school. As the founder, my role is to create a warm and inspiring environment where every child can learn, grow, and shine. I guide the vision of the school, support our teachers, and make sure every student feels valued and encouraged. My goal is to build a place where learning is joyful, dreams are nurtured, and every child can reach their full potential.",
      image: viceImg,
    },
    {
      name: "Nilam Chaudhary",
      role: "Chairman",
      description:
        "My name is Nilam Chaudhary, and I am the chairman of our school. My role is to guide and support the school’s growth, help make important decisions, and ensure that every student enjoys a safe, happy, and inspiring learning environment. I work to encourage our teachers and staff so that together we can help every child reach their dreams.",
      image: nilamImg,
    },
    {
      name: "Topper Student",
      role: "Of School",
      description:
        "I am a disciplined student in our school. I have won many prizes for being good and following rules. I always try to listen to my teachers, respect my friends, and set a good example. Being disciplined helps me do well in school and become a better person.",
      image: galImg,
    },
  ];

  const startAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === slides.length - 1) {
          setIsInstant(true);
          setTimeout(() => setIsInstant(false), 50);
          return 0;
        }
        return prev + 1;
      });
    }, 15000);
  };

  const nextSlide = () => {
    if (currentIndex === slides.length - 1) {
      setIsInstant(true);
      setCurrentIndex(0);
      setTimeout(() => setIsInstant(false), 50);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    nextSlide();
    startAutoSlide();
  };

  const handlePrevClick = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    prevSlide();
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.style.display = 'none';
  };

  // ✅ Swipe/Drag Logic (untouched)
  // === Swipe Logic (fixed white flash) ===
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let isDown = false;
    const THRESHOLD = 50;
    const VERTICAL_TOLERANCE = 30;

    const onTouchStart = (ev) => {
      if (!ev.touches || ev.touches.length === 0) return;
      startX = ev.touches[0].clientX;
      startY = ev.touches[0].clientY;
      isDown = true;
      if (slideInterval.current) clearInterval(slideInterval.current);
    };

    const onTouchEnd = (ev) => {
      if (!isDown) return;
      isDown = false;
      const changed = ev.changedTouches && ev.changedTouches[0];
      const endX = changed ? changed.clientX : startX;
      const endY = changed ? changed.clientY : startY;
      const dx = endX - startX;
      const dy = Math.abs(endY - startY);

      if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > dy - VERTICAL_TOLERANCE) {
        if (dx < 0) {
          // Swipe left → Next
          if (currentIndex === slides.length - 1) {
            // ✅ Jump instantly from last to first
            setIsInstant(true);
            setCurrentIndex(0);
            setTimeout(() => setIsInstant(false), 50);
            startAutoSlide();
          } else {
            handleNextClick();
          }
        } else {
          // Swipe right → Prev
          if (currentIndex === 0) {
            // ✅ Jump instantly from first to last
            setIsInstant(true);
            setCurrentIndex(slides.length - 1);
            setTimeout(() => setIsInstant(false), 50);
            startAutoSlide();
          } else {
            handlePrevClick();
          }
        }
      } else {
        startAutoSlide();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentIndex]);


  return (
    <section
      ref={sectionRef}
      className={`w-full relative overflow-hidden transition-all duration-500 ${
        isDarkMode ? darkModeClasses.teacherSlider : "bg-white text-black"
      }`}
      id="container-new"
    >
      {/* Title */}
      <h2
        className={`text-center pt-8 md:pt-12 text-2xl sm:text-3xl md:text-[35px] font-bold px-4 ${
          isDarkMode ? "text-[#ffa500]" : "text-[#263675]"
        }`}
      >
        Meet Our Teachers
      </h2>

      <motion.div
      initial={{opacity: 0, x:200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
       ref={sliderRef} className="relative w-full mx-auto overflow-hidden z-10">
        <div
          className={`flex ${isInstant ? '' : 'transition-transform duration-500 ease-in-out'} mt-8 md:mt-20`}
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full box-border flex flex-col lg:flex-row justify-center items-center relative min-h-screen lg:h-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-0"
            >
              <div className="lg:absolute lg:top-[-20px] lg:mb-[-20px] mb-6 text-center lg:text-left w-full lg:w-auto lg:pr-30">
                <h3 className="text-xl sm:text-2xl lg:text-[20px] font-semibold">
                  {slide.name}
                </h3>
                <span className="text-lg sm:text-xl lg:text-[16px] text-gray-600">
                  {slide.role}
                </span>
              </div>

              {/* ✅ Added proper react-icon at top-left */}
              <div
                className={`relative p-6 sm:p-8 md:p-12 lg:p-[100px] shadow-lg z-0 w-full lg:w-1/2 h-auto lg:h-[70%] lg:mr-[-50px] order-2 lg:order-1 mt-6 lg:mt-0 ${
                  isDarkMode ? "bg-[#211e4d] text-[#e0e0e0]" : "bg-[#f4be40] text-black"
                }`}
              >
                <FaQuoteLeft
  className="absolute top-4 left-6 sm:top-12 sm:left-9 md:top-12 md:left-12 lg:top-14 lg:left-25 text-3xl opacity-70"
/>

                <div className="leading-relaxed pb-6 lg:pb-20 mt-10">
                  <p className="text-sm sm:text-base lg:text-[20px] pt-4">
                    {slide.description}
                  </p>
                </div>
              </div>

              <div className="relative w-full max-w-[280px] sm:max-w-[350px] h-[400px] sm:h-[510px] shadow-lg z-10 lg:mt-[-15rem] order-1 lg:order-2 mb-6 lg:mb-0">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <img
                  src={starImg}
                  alt="Star"
                  className="absolute top-[-40px] sm:top-[-50px] lg:top-[-70px] right-[-25px] sm:right-[-35px] lg:right-[-42px] z-20 w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] lg:w-[115px] lg:h-[115px]"
                  onError={handleImageError}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="absolute w-full top-1/2 flex justify-between transform -translate-y-1/2 px-2 sm:px-4">
          <button
            onClick={handlePrevClick}
            className="bg-red-500 border-none text-white p-2 sm:p-2.5 cursor-pointer text-base sm:text-[18px] hover:bg-red-600 transition-colors rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextClick}
            className="bg-red-500 border-none text-white p-2 sm:p-2.5 cursor-pointer text-base sm:text-[18px] hover:bg-red-600 transition-colors rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default TeachersSlider;
