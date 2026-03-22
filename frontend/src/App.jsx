import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Assessment from "./components/Assessment";
import Result from "./components/Result";
import RoleSelect from "./components/RoleSelect";
import VolunteersPage from "./components/VolunteersPage";
import UserDashboard from "./components/Userdashboard";
import TherapistsPage from "./components/TherapistPage";
import BookingPage from "./components/BookingPage";
import Chatbot from "./components/Chatbot";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoutes from "./components/PrivateRoutes"; // ✅ IMPORT
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/roleselect" element={<RoleSelect />} />

      {/* PROTECTED ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/result" element={<Result />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/therapists" element={<TherapistsPage />} />
        <Route path="/book/volunteer/:id" element={<BookingPage />} />
        <Route path="/book/therapist/:id" element={<BookingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Route>

      {/* Admin Route */}
    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminDashboard />} />
    </Route>

    </Routes>
  );
};

export default App;