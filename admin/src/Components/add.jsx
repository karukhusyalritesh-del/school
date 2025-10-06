import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import NepaliDate from "nepali-date";

// Make sure your .env has: VITE_BACKEND_URL=http://localhost:3000
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const NoticePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    uploader: "",
    description: "",
    category: "",
  });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      console.log("Fetching notices from:", `${BACKEND_URL}/api/notice/all`);
      const res = await axios.get(`${BACKEND_URL}/api/notice/all`);
      console.log("Notices fetched:", res.data);

      const noticesData = Array.isArray(res.data) ? res.data : [];
      setNotices(noticesData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading notices:", err);
      alert("Failed to load notices. Check console for details.");
      setNotices([]);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.uploader || !formData.description || !formData.category) {
      alert("All fields are required!");
      return;
    }

    try {
      console.log("Sending notice data:", formData);
      const res = await axios.post(`${BACKEND_URL}/api/notice/create`, formData);
      alert("Notice added successfully!");
      console.log("Notice added:", res.data);

      fetchNotices();

      setFormData({ uploader: "", description: "", category: "" });
      setModalOpen(false);
    } catch (err) {
      console.error("Error adding notice:", err);
      alert("Failed to add notice! Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await axios.delete(`${BACKEND_URL}/api/notice/${id}`);
        alert("Notice deleted successfully!");
        fetchNotices();
      } catch (err) {
        console.error("Error deleting notice:", err);
        alert("Failed to delete notice!");
      }
    }
  };

  // Format date to Nepali date with AM/PM and vertical alignment
  const formatNepaliDate = (adDateString) => {
    try {
      const adDate = new Date(adDateString); // English date
      const nepDate = new NepaliDate(adDate); // Convert to Nepali

      // Use getYear(), getMonth(), and getDate() methods instead of direct properties
      const year = nepDate.getYear();
      const month = String(nepDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
      const day = String(nepDate.getDate()).padStart(2, "0");

      // Format time with AM/PM
      let hours = adDate.getHours();
      const minutes = String(adDate.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      hours = String(hours).padStart(2, "0");

      return (
        <div className="text-right">
          <div className="text-gray-500">{year}-{month}-{day}</div>
          <div className="text-gray-500 text-xs">{hours}:{minutes} {ampm}</div>
        </div>
      );
    } catch (error) {
      console.error("Error formatting Nepali date:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Add Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Notice
        </button>
      </div>

      {/* Modal for Adding Notice */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add New Notice</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Uploader Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Uploader Name *
                </label>
                <input
                  type="text"
                  name="uploader"
                  value={formData.uploader}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="Enter uploader name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows="3"
                  placeholder="Enter description"
                  required
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Bus Notice">Bus Notice</option>
                  <option value="Holiday Notice">Holiday Notice</option>
                  <option value="Exam Notice">Exam Notice</option>
                  <option value="Result Notice">Result Notice</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice List */}
      <div className="space-y-4 mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-center text-gray-500">No notices available.</p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {notice.title || "No Title"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {notice.description || "No description"}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Category: {notice.category}</span>
                    <span>
                      {notice.createdAt ? formatNepaliDate(notice.createdAt) : ""}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticePage;