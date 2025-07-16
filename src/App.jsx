"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom" // Import useLocation

import Login from "./pages/Login"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./Pages/Dashboard"
import CalendarView from "./Pages/CalendarView"
import Lists from "./pages/Lists"
import Settings from "./pages/Settings"

// Protected Route Component
const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation() // Get current location
  const isCalendarRoute = location.pathname === "/calendar"

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <style jsx>{`
        .main-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }
        .main-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .main-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .main-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .main-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className={`flex-1 ${isCalendarRoute ? "overflow-hidden" : "overflow-auto main-scrollbar"}`}>
            {children}
          </main>
        </div>
        {/* Floating Action Button - if it's global, keep it here */}
      </div>
    </>
  )
}

// Placeholder component for under development pages
const UnderDevelopment = ({ title }) => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-500">This section is under development.</p>
    </div>
  </div>
)

export default function FamilyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
        />
        {/* Protected Routes - All wrapped in single ProtectedRoute */}
        <Route
          path="/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
                <Route path="/budget" element={<UnderDevelopment title="Budget" />} />
                <Route path="/documents" element={<UnderDevelopment title="Documents" />} />
                <Route path="/timetable" element={<UnderDevelopment title="Timetable" />} />
                <Route path="/meal" element={<UnderDevelopment title="Meal Planner" />} />
                <Route path="/recipe" element={<UnderDevelopment title="Recipe Box" />} />
                <Route path="/map" element={<UnderDevelopment title="Map" />} />
                <Route path="/messages" element={<UnderDevelopment title="Messages" />} />
                <Route path="/gallery" element={<UnderDevelopment title="Gallery" />} />
                <Route path="/contacts" element={<UnderDevelopment title="Contact Book" />} />
                <Route path="/premium" element={<UnderDevelopment title="Premium" />} />
                <Route path="/help" element={<UnderDevelopment title="Help" />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<UnderDevelopment title="Page Not Found" />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}
