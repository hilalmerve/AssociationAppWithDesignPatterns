import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/common/Navbar";

import UserNews from "./components/user/UserNews";
import UserAnnouncements from "./components/user/UserAnnouncements";

import AdminNews from "./components/admin/AdminNews";
import AdminAnnouncements from "./components/admin/AdminAnnouncements";

import Login from "./auth/Login";

import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>

      {/* PUBLIC NAVBAR */}
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 56px)" }}>
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Navigate to="/news" replace />} />
          <Route path="/news" element={<UserNews />} />
          <Route path="/announcements" element={<UserAnnouncements />} />

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="news" element={<AdminNews />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>

        </Routes>
      </main>

    </BrowserRouter>
  );
}