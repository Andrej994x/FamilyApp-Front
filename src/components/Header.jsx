"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLocation } from "react-router-dom"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  // Get current page name from pathname
  const getCurrentPageName = () => {
    const path = location.pathname.replace("/", "")
    return path.charAt(0).toUpperCase() + path.slice(1) || "Dashboard"
  }

  return (
    <div className="bg-white border-b border-gray-300 relative">
      {/* Simple Header with just Nestorov dropdown */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors"
          >
            <h1 className="text-lg font-semibold mr-1">Nestorov</h1>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />

          {/* Dropdown Content */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 mt-1">
            {/* Blue Header Section */}
            <div className="bg-blue-500 text-white p-4 rounded-t-lg">
              <div className="text-center mb-3">
                <h2 className="text-lg font-semibold">Nestorov</h2>
              </div>
              <div className="flex justify-center space-x-2">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white font-bold text-sm">🏠</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white font-bold text-sm">An</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white font-bold text-sm">An</span>
                </div>
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white font-bold text-sm">Te</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white font-bold text-sm">😊</span>
                </div>
              </div>
            </div>

            {/* Teest Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-center text-gray-600 font-medium mb-3">Teest</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">An</span>
                </div>
              </div>
            </div>

            {/* Add Circle Section */}
            <div className="p-4">
              <p className="text-center text-gray-500 mb-3">Add a circle</p>
              <div className="flex justify-center">
                <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-white font-bold text-xl">+</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Header
