import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ if no user or not admin → redirect to login
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // render nested routes
};

export default AdminRoute;