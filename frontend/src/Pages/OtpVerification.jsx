import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const OTPVerification = ({ isDarkMode }) => { // Add isDarkMode prop
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Please enter OTP");
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      setMessage(res.data.message);
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`p-8 rounded shadow-md w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl text-[#263675] font-bold mb-6 text-center">OTP Verification</h2>

        {message && <p className={`mb-4 text-center text-sm ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full border p-2 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#263675] text-white p-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;