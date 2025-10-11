import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AdmissionAdCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Show popup after 1.5s every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isVisible]);

  // Close popup
  const closeAd = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  // Click outside to close
  const handleOutsideClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) closeAd();
  };

  const handleContactClick = () => {
    closeAd();
    setTimeout(() => navigate("/contact"), 350);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={cardRef}
        className={`relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-2 transform transition-all duration-500 animate-popup-entrance ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        {/* Close Button */}
        <button
          onClick={closeAd}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold w-8 h-8 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 z-20 cursor-pointer hover:scale-110 active:scale-95 border border-white"
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#263675] to-purple-700 text-white p-4 rounded-t-xl text-center">
          <h1 className="text-xl font-bold text-yellow-300 mb-1">
            प्रवेश खुल्यो २०२५
          </h1>
          <p className="text-base font-semibold">Admission Open 2025</p>
        </div>

        {/* Content */}
        <div className="p-3 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-lg text-center mb-4 relative overflow-hidden shadow-lg animate-pulse hover:animate-none hover:scale-[1.02] transition-transform duration-300">
            <strong className="text-base font-bold relative z-10">
              🎉 बैशाख २० भन्दा अगाडि - ५०% छुट! 🎉
            </strong>
          </div>

          {/* Services List */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-800 space-y-2 leading-relaxed">
            <h3 className="text-sm font-semibold text-center mb-2">
              हाम्रा सेवाहरु
            </h3>
            <p>
              १. विद्यालयको सर्वोच्च अंक ल्याउने १ जना विद्यार्थीलाई ३५% छुटको
              व्यवस्था ।
            </p>
            <p>
              २. एउटै अभिभावकको ३ जना विद्यार्थी भए ३०% , ४ जना भए ४०% र ५
              जना वा सो भन्दा बढी भएमा ५०% छुटको व्यवस्था ।
            </p>
            <p>
              ३. प्रत्येक कक्षामा प्रथम हुने १ जना विद्यार्थीलाई ९०% छुटको
              व्यवस्था साथै द्वितीय तथा तृतीय हुने छात्रछात्रालाई ५०% छुटको
              व्यवस्था ।
            </p>
            <p>
              ४. शान्त तथा मनोहर वातावरणमा दक्ष तथा अनुभवी शिक्षकहरूद्वारा
              अध्यापन गराउने व्यवस्था ।
            </p>
            <p>५. प्रत्येक शुक्रवार अतिरिक्त क्रियाकलाप गराइने व्यवस्था ।</p>
            <p>
              ६. त्रिपक्षीय (शिक्षक, अभिभावक र विद्यार्थी) समन्वयमा आधारित
              शिक्षा ।
            </p>
            <p>७. यातायातको व्यवस्था ।</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex space-x-2">
            <button
              onClick={closeAd}
              className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-3 rounded-lg hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm"
            >
              पछि गर्नुहोस्
            </button>
            <button
              onClick={handleContactClick}
              className="flex-1 bg-gradient-to-r from-[#263675] to-purple-600 text-white font-bold py-2 px-3 rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-sm"
            >
              सम्पर्क गर्नुहोस्
            </button>
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">
            सीमित सीट, अहिलै नै स्थान सुरक्षित गर्नुहोस्
          </p>
        </div>
      </div>

      {/* Custom Animations and Scrollbar */}
      <style>{`
        @keyframes popup-entrance {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          70% {
            opacity: 1;
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-popup-entrance {
          animation: popup-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar { 
          width: 6px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: #f1f1f1; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #c1c1c1; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: #a8a8a8; 
        }
      `}</style>
    </div>
  );
};

export default AdmissionAdCard;