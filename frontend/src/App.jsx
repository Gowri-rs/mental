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

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/result" element={<Result/>}/>
        <Route path="/roleselect" element={<RoleSelect />} />
        <Route path="/volunteers" element={<VolunteersPage/>} />
        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/therapists" element={<TherapistsPage />} />
        <Route path="/book/volunteer/:id" element={<BookingPage />} />
        <Route path="/book/therapist/:id" element={<BookingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/admin" element={<AdminDashboard/>} />

      </Routes>
    
  );
};

export default App;