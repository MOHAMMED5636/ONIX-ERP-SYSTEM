import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./modules/Login";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  const [lang, setLang] = useState("en");
  const [dir, setDir] = useState("ltr");
  const handleLangToggle = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
    setDir((prev) => (prev === "ltr" ? "rtl" : "ltr"));
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
