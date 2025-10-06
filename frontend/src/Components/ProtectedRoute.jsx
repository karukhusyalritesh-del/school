import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Only open when you are logged in!");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
