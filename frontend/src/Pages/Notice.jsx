import React, { useState, useEffect } from "react";
import MainNav from '../Components/MainNav'; 
import api from "../api/axios";
import NepaliDate from "nepali-date";

const NoticePage = () => {
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
      hours = hours ? hours : 12; // the hour '0' should be '12'
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

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#263675]">School Notices</h1>

      {/* Categories Tabs */}
      <div className="flex flex-wrap justify-center mb-6 gap-4">
        {["Bus Notice", "Holiday Notice", "Exam Notice", "Result Notice"].map(
          (category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === category
                  ? "bg-[#263675] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100 cursor-pointer"
              }`}
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
          <p className="text-gray-500 text-center col-span-full">Loading notices...</p>
        ) : filteredNotices.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No {activeCategory} available.
          </p>
        ) : (
          filteredNotices.map((notice) => {
            const formattedDateTime = notice.createdAt ? formatNepaliDate(notice.createdAt) : { date: '', time: '' };
            
            return (
              <div
                key={notice._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-[#263675] mb-2">{notice.title}</h3>
                  <p className="text-gray-700 mb-4">{notice.description}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-bold">
                    {notice.category}
                  </span>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">
                      {formattedDateTime.date}
                    </div>
                    <div className="text-green-600 text-xs font-bold">
                      {formattedDateTime.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NoticePage;