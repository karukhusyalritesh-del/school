import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Make sure to have VITE_BACKEND_URL in .env: VITE_BACKEND_URL=http://localhost:3000
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminAuth = () => {
  const [formType, setFormType] = useState("login"); // "login" | "signup" | "forgot"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === "signup") {
        const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, formData);
        toast.success(res.data.message);
        setFormType("login"); // redirect to login after signup
      } else if (formType === "login") {
        const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);

        // check if role is admin
        if (res.data.user.role !== "admin") {
          toast.error("Access denied. Only admin can login here.");
          return;
        }

        // save token to localStorage
        localStorage.setItem("adminToken", res.data.token);

        toast.success("Login successful! Redirecting to admin panel...");
        // Redirect to admin frontend add.jsx page
        window.location.href = "https://school-backend-ivory.vercel.app";
      } else if (formType === "forgot") {
        const res = await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, { email: formData.email });
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {formType === "login" && "Admin Login"}
          {formType === "signup" && "Admin Signup"}
          {formType === "forgot" && "Forgot Password"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formType === "signup" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          {formType !== "forgot" && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          )}

          {formType === "signup" && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="admin">Admin</option>
            </select>
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white ${
              formType === "signup"
                ? "bg-green-600 hover:bg-green-700"
                : formType === "login"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-purple-600 hover:bg-purple-700"
            } transition`}
          >
            {formType === "signup"
              ? "Signup"
              : formType === "login"
              ? "Login"
              : "Send OTP"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 flex justify-between text-sm">
          {formType === "login" && (
            <>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setFormType("forgot")}
              >
                Forgot Password?
              </button>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setFormType("signup")}
              >
                Signup
              </button>
            </>
          )}
          {formType === "signup" && (
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setFormType("login")}
            >
              Already have an account? Login
            </button>
          )}
          {formType === "forgot" && (
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setFormType("login")}
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
