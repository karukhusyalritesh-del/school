import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaQuoteLeft } from "react-icons/fa";
import centerImage from "../assets/arrow.png"; 
import img1 from '../assets/flower1.png'
import img2 from '../assets/flower3.png'
import img3 from '../assets/flower2.png'
import img4 from '../assets/flower4.png'
import img5 from '../assets/flower5.png'
import img6 from '../assets/flower6.png'
import img7 from '../assets/flower7.png'
import darkModeColors from "./DarkMode";
import { useState } from 'react';
import { motion } from 'framer-motion';

const GalleryQuoteLayout = ({ isDarkMode }) => {
   const environmentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to environment section when route is /environment
    if (location.pathname === '/environment' && environmentRef.current) {
      setTimeout(() => {
        environmentRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [location]);
  const images = [
    {
      src: img1,
      alt: "a house on a mountain",
      quote: "Admissions Open for 2025! At Vidya Niketan Academy, admissions for the 2025 academic session are now open. Every student will take an entrance exam to help us understand their learning level and place them in the right class. Exciting discounts will be available soon for early admissions — don’t miss the chance to join our family of learners!"
    },
    {
      src: img2,
      alt: "some pink flowers",
      quote: "At Vidya Niketan Academy, we provide quality education with care and dedication. We have more than 10 years of experience in guiding and managing students. Our teachers help every child grow in knowledge, discipline, and confidence. The students who have passed out from our school are doing very well in their further studies and making us proud"
    },
    {
      src: img3,
      alt: "big rocks with some trees",
      quote: "Our advice is that every child, whether a boy or a girl, should have equal rights to education. This message is especially for guardians who may not be aware — never compare your son and daughter when it comes to school. Both should have the opportunity to learn, grow, and build a bright future, instead of thinking that daughters should only stay at home and do household work."
    },
    {
      src: img4,
      alt: "a waterfall view",
      quote: "Our teachers are like a second father and mother to the children. They give full attention, care, and guidance to every student, helping them learn, grow, and build confidence. With patience and love, they support each child in both studies and personal development, ensuring a happy and safe environment for learning."
    },
    {
      src: img5,
      alt: "a cool landscape",
      quote: "At our school, we always focus on quality learning. We provide top-quality education and never compromise on it. While we may sometimes have fewer facilities compared to others, we ensure that learning is never less. Every student receives proper guidance, attention, and knowledge to grow and succeed. Our goal is to provide excellent education while steadily improving all facilities for a better learning environment."
    },
    {
      src: img6,
      alt: "inside a town between buildings",
      quote: "At our school, guardians have full right to share any concerns about their child’s learning or weaknesses. If you feel your child has not learned something properly, you are welcome to discuss it with us. We take every complaint seriously and positively, as our goal is to help every student improve and succeed."
    },
    {
      src: img7,
      alt: "sea above mountain",
      quote: "At our school, there are many students just like your child. Here, your child will never feel alone — all students learn, play, and grow together in a friendly and caring environment. Just like children grow happily with their friends in their own village or town, your child will also feel the same warmth and togetherness at our school."
    },
  ];

  const defaultQuote = "Education is not just about reading books or learning lessons — it is about discipline, good behavior, and applying knowledge in real life. True education teaches children how to live wisely and do good in the world. A good education gives us a better future.";

  const [currentQuote, setCurrentQuote] = useState(defaultQuote);
  const [shake, setShake] = useState(false);

  const handleMouseEnter = (quote) => {
    setCurrentQuote(quote);
    setShake(true);
  };

  const handleMouseLeave = () => {
    setCurrentQuote(defaultQuote);
    setShake(false);
  };

  return (
    <motion.section
initial={{opacity: 0, x:-200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
     id="aboutSection" ref={environmentRef}
      className={`w-full min-h-screen flex justify-center items-center px-4 md:px-10 lg:px-12 overflow-hidden ${
        isDarkMode ? darkModeColors.about : "bg-white text-black"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-4 items-center w-full max-w-7xl">
        
        {/* Left: Hexagonal Gallery */}
        <div className="flex justify-center lg:justify-start order-2 lg:order-1 py-30 sm:mt-10 lg:py-0 lg:pl-38 min-[1286px]:pl-12">
          <div
            className="relative scale-75 sm:scale-90 lg:scale-100"
            style={{
              width: "clamp(150px, 40vw, 200px)",
              height: "clamp(180px, 45vw, 250px)",
            }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="w-[clamp(120px,35vw,170px)] aspect-[0.866] object-cover absolute bubble cursor-pointer"
                style={{
                  clipPath: "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0)",
                  "--_x": getTransformX(i),
                  "--_y": getTransformY(i),
                  animationDelay: `${i * 0.5}s`,
                }}
                onMouseEnter={() => handleMouseEnter(img.quote)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => handleMouseEnter(img.quote)}
                onTouchEnd={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        {/* Center: Small PNG Image */}
        <div className="hidden lg:flex justify-center items-center order-1 lg:order-2 lg:pl-40 xl:pl-20 mx-auto min-[1024px]:mx-auto min-[1286px]:mx-0">
          <img
            src={centerImage}
            alt="Center"
            className={`w-25 h-25 object-contain transition-transform ${shake ? "animate-shake" : ""}`}
          />
        </div>

        {/* Right: Quote Box */}
        <div className="flex justify-center lg:justify-start order-3 lg:py-0 lg:pr-8 min-[1286px]:pr-12">
          <div className={`relative border-4 border-dotted rounded-2xl p-4 lg:p-5 w-full max-w-md lg:w-[400px] xl:w-[450px] h-[40vh] sm:h-[45vh] lg:h-[500px] ${
            isDarkMode ? "border-white" : "border-black"
          }`}>
            <FaQuoteLeft className={`absolute -top-5 left-5 text-2xl px-1 ${isDarkMode ? "bg-[#071645] text-white" : "bg-white text-black"}`} />
            <div className={`rounded-xl p-4 lg:p-5 w-full h-full overflow-hidden ${isDarkMode ? "bg-[#ff6c02] bg-opacity-50" : "bg-yellow-400"}`}>
              <p className={`m-0 text-base sm:text-lg lg:text-lg leading-relaxed text-center lg:text-left break-words ${isDarkMode ? "text-white" : "text-black"}`}>
                {currentQuote}
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes bubble {
            0%, 100% { transform: translate(var(--_x,0), var(--_y,0)) scale(1); }
            50% { transform: translate(var(--_x,0), var(--_y,0)) scale(1.02); }
          }
          .bubble { animation: bubble 6s ease-in-out infinite; }

          @keyframes shake {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            20% { transform: translate(-2px, 2px) rotate(-2deg); }
            40% { transform: translate(2px, -2px) rotate(2deg); }
            60% { transform: translate(-2px, 2px) rotate(-1deg); }
            80% { transform: translate(2px, -2px) rotate(1deg); }
            100% { transform: translate(0, 0) rotate(0); }
          }
          .animate-shake { animation: shake 0.5s infinite; }
        `}</style>
      </div>
    </motion.section>
  );
};

// Hexagon transforms - unchanged
function getTransformX(i) {
  switch (i + 1) {
    case 1: return "calc(-100% - 10px)";
    case 7: return "calc(100% + 10px)";
    case 3: return "calc(-50% - 5px)";
    case 5: return "calc(50% + 5px)";
    case 4: return "calc(-50% - 5px)";
    case 6: return "calc(50% + 5px)";
    default: return "0";
  }
}

function getTransformY(i) {
  switch (i + 1) {
    case 3:
    case 5: return "calc(-75% - 8.66px)";
    case 4:
    case 6: return "calc(75% + 8.66px)";
    default: return "0";
  }
}

export default GalleryQuoteLayout;
