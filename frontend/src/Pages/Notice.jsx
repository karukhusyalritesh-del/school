import React, { useState, useEffect } from "react";
import MainNav from '../Components/MainNav'; 
import api from "../api/axios";
import NepaliDate from "nepali-date";
import { motion } from "framer-motion";

const NoticePage = ({ isDarkMode }) => {
  const [activeCategory, setActiveCategory] = useState("Bus Notice");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notice/all");
      const noticesData = Array.isArray(res.data) ? res.data : [];
      setNotices(noticesData);
      setLoading(false);
    } catch (err) {
      setNotices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const formatNepaliDate = (adDateString) => {
    try {
      const adDate = new Date(adDateString);
      const nepDate = new NepaliDate(adDate);

      const year = nepDate.getYear();
      const month = String(nepDate.getMonth() + 1).padStart(2, "0");
      const day = String(nepDate.getDate()).padStart(2, "0");

      // Format time with AM/PM
      let hours = adDate.getHours();
      const minutes = String(adDate.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12;
      hours = String(hours).padStart(2, "0");

      return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes} ${ampm}`
      };
    } catch (error) {
      console.error("Error formatting Nepali date:", error);
      return {
        date: "Invalid Date",
        time: "Invalid Time"
      };
    }
  };

  const filteredNotices = notices
    .filter((notice) => notice.category === activeCategory)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Dark mode styles
  const darkModeStyles = {
    container: isDarkMode ? "bg-[#0a0c23] text-white" : "bg-gray-50 text-black",
    card: isDarkMode ? "bg-[#1b1b45] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-700",
    categoryButton: {
      active: isDarkMode ? "bg-[#2c2c6c] text-white" : "bg-[#263675] text-white",
      inactive: isDarkMode ? "bg-[#242250] border-gray-600 text-gray-300 hover:bg-[#2c2c6c]" : "bg-white border-gray-300 text-gray-700 hover:bg-blue-100"
    },
    categoryBadge: isDarkMode ? "bg-[#2c2c6c] text-gray-300" : "bg-gray-100 text-gray-600",
    title: isDarkMode ? "text-white" : "text-[#263675]",
    loadingText: isDarkMode ? "text-gray-400" : "text-gray-500"
  };

  return (
    <motion.div
          initial={{opacity: 0, x:200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
     className={`p-6 md:p-12 min-h-screen ${darkModeStyles.container}`}>
      <h1 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? "text-white" : "text-[#263675]"}`}>
        School Notices
      </h1>

      {/* Categories Tabs */}
      <div className="flex flex-wrap justify-center mb-6 gap-4">
        {["Bus Notice", "Holiday Notice", "Exam Notice", "Result Notice"].map(
          (category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === category
                  ? darkModeStyles.categoryButton.active
                  : darkModeStyles.categoryButton.inactive
              } border cursor-pointer`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Notice Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className={`text-center col-span-full ${darkModeStyles.loadingText}`}>
            Loading notices...
          </p>
        ) : filteredNotices.length === 0 ? (
          <p className={`text-center col-span-full ${darkModeStyles.loadingText}`}>
            No {activeCategory} available.
          </p>
        ) : (
          filteredNotices.map((notice) => {
            const formattedDateTime = notice.createdAt ? formatNepaliDate(notice.createdAt) : { date: '', time: '' };
            
            return (
              <div
                key={notice._id}
                className={`border rounded-lg p-6 shadow hover:shadow-lg transition flex flex-col justify-between ${darkModeStyles.card}`}
              >
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${darkModeStyles.title}`}>
                    {notice.title}
                  </h3>
                  <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {notice.description}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2 py-1 rounded font-bold ${darkModeStyles.categoryBadge}`}>
                    {notice.category}
                  </span>
                  <div className="text-right">
                    <div className={`font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      {formattedDateTime.date}
                    </div>
                    <div className={`text-xs font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      {formattedDateTime.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default NoticePage;