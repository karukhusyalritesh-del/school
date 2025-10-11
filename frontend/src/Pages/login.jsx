import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import api from "../api/axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false); // New state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); // Add navigate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "" // Add OTP field
  });

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "User");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isForgot) {
        if (showOtpVerification) {
          // Verify OTP
          const res = await api.post("/auth/verify-otp", {
            email: formData.email,
            otp: formData.otp
          });
          setMessage(res.data.message);
          
          // Navigate to reset password page
          navigate("/reset-password", { state: { email: formData.email, otp: formData.otp } });
        } else {
          // Forgot Password - Send OTP
          const res = await api.post("/auth/forgot-password", {
            email: formData.email,
          });
          setMessage(res.data.message);
          setShowOtpVerification(true); 
        }
      } else if (isLogin) {
        // Login
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        setMessage("Login successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name); 
        setIsLoggedIn(true);
        setUserName(res.data.user.name);
      } else {
        // Signup
        const res = await api.post("/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user",
        });
        setMessage(res.data.message);
        // Reset form after successful signup
        setFormData({
          name: "",
          email: "",
          password: "",
          otp: ""
        });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      setIsLoggedIn(false);
      setUserName("");
      setMessage("Logged out successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        otp: ""
      });
    }
  };

  // Reset OTP verification when switching modes
  const handleModeSwitch = () => {
    setIsForgot(false);
    setShowOtpVerification(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      otp: ""
    });
    setMessage("");
  };

  // If user is logged in, show logout interface
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl text-[#263675] font-bold mb-4">
            Welcome, {userName}!
          </h2>
          <p className="text-gray-600 mb-6">You are successfully logged in.</p>
          
          {message && (
            <p className="mb-4 text-center text-sm text-green-500">{message}</p>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-[#263675] font-bold mb-6 text-center">
          {showOtpVerification ? "Verify OTP" : isForgot ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}
        </h2>

        {message && (
          <p className={`mb-4 text-center text-sm ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !isForgot && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {showOtpVerification && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )}

          {!isForgot && !showOtpVerification && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#263675] text-white p-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            {loading
              ? "Please wait..."
              : showOtpVerification
              ? "Verify OTP"
              : isForgot
              ? "Send OTP"
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center space-x-2">
          {!isForgot && !showOtpVerification && (
            <>
              <button
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  setIsLogin(!isLogin);
                  handleModeSwitch();
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>

              {isLogin && (
                <button
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => {
                    setIsForgot(true);
                    setShowOtpVerification(false);
                  }}
                >
                  Forgot Password?
                </button>
              )}
            </>
          )}

          {(isForgot || showOtpVerification) && (
            <button
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={handleModeSwitch}
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
      
      {/* Footer Note */}
      <div className="mt-8 p-4 max-w-md text-center text-gray-600 text-sm">
        <p>
          <strong>Note:</strong> To log in successfully, you must verify your email through the school. This step is required because after logging in, you will gain access to sensitive and private school information.<br/>
          For faster verification, please contact the school by sending a message through the "Contact Us" section, which you can find in the sidebar or navbar.<br/>
          You can also send a message through Gmail.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;