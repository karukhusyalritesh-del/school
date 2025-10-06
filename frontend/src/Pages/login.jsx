import React, { useState } from "react";
import api from "../api/axios"; // 👈 import axios instance

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Switch between login/signup
  const [isForgot, setIsForgot] = useState(false); // Forgot password form
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isForgot) {
        // Forgot Password
        const res = await api.post("/auth/forgot-password", {
          email: formData.email,
        });
        setMessage(res.data.message);
      } else if (isLogin) {
        // Login
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        setMessage("Login successful!");
        localStorage.setItem("token", res.data.token); // Save JWT
      } else {
        // Signup
        const res = await api.post("/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user", // or "admin"
        });
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isForgot ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-500">{message}</p>
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

          {!isForgot && (
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
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {loading
              ? "Please wait..."
              : isForgot
              ? "Send OTP"
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center space-x-2">
          {!isForgot && (
            <>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>

              {isLogin && (
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsForgot(true)}
                >
                  Forgot Password?
                </button>
              )}
            </>
          )}

          {isForgot && (
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsForgot(false)}
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
