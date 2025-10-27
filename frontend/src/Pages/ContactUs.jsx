import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Optional: Show sending toast
    toast.info("Sending message...", { autoClose: 1000 });

    try {
      // Web3Forms API request
      const submissionData = new FormData();
      submissionData.append("access_key", "5b2b27d6-ccf7-40e1-a18e-cb3881b4f4d5");
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Form submitted successfully!", { autoClose: 3000 });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Submission failed", { autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { autoClose: 3000 });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gray-100 text-gray-900"

      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6 ${
            isDarkMode ? "text-[#FAF8F1]" : "text-[#263675]"
          }`}
        >
          Contact Us
        </h2>

        <div className="mb-4">
          <label className={`block font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className={`block font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Registered Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
            }`}
          />
        </div>

        <div className="mb-6">
          <label className={`block font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Message
          </label>
          <textarea
            name="message"
            placeholder="Write your message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
            }`}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#263675] text-white py-2 rounded-lg font-semibold hover:bg-[#3148A0] transition-all duration-300 cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
