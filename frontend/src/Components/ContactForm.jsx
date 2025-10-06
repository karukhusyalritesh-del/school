import React, { useState } from 'react';
import darkModeColors from "./DarkMode"; // Import your dark mode color settings

const ContactUs = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const dataForm = new FormData(event.target); // renamed to avoid conflict
    dataForm.append("access_key", "c4b3955b-0ab8-4678-a166-3005e6a5e70f");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: dataForm
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.log("Error", data);
        setResult(data.message || "Submission failed");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong. Try again later.");
    }
  };

  return (
    <section
      id="contact"
      className={`w-full py-16 transition-colors duration-500 ${
        isDarkMode ? darkModeColors.contactForm : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            isDarkMode ? "text-white" : "text-[#263675]"
          }`}
        >
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Information */}
          <div className="space-y-8">
            {/* Phone Number */}
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-[#1b1e3a] text-white" : "bg-blue-100 text-blue-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Phone</h3>
                <p className={`text-xl font-medium ${isDarkMode ? "text-red-400" : "text-blue-600"}`}>+977 9821775780</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-[#1b1e3a] text-white" : "bg-blue-100 text-blue-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Email</h3>
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Vidysinfo@gmail.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-[#1b1e3a] text-white" : "bg-blue-100 text-blue-600"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Address</h3>
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Your school address here</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`rounded-lg shadow-lg p-8 transition-colors duration-500 ${isDarkMode ? "bg-[#12142d] text-white" : "bg-white"}`}>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    isDarkMode ? "bg-[#1b1e3a] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                  }`}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    isDarkMode ? "bg-[#1b1e3a] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                    isDarkMode ? "bg-[#1b1e3a] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                  }`}
                  placeholder="Enter your message"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDarkMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#263675] hover:bg-blue-700 text-white"
                }`}
              >
                {result === "Sending...." ? "Sending..." : "Submit"}
              </button>

              {/* Show result message */}
              {result && <p className={`mt-3 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{result}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
