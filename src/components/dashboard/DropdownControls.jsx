"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

const DropdownControls = ({
  selectedView,
  selectedSort,
  setSelectedView,
  setSelectedSort,
  viewOptions,
  sortOptions,
}) => {
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  return (
    <div className="flex justify-between items-center mb-6 relative">
      {/* View Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setIsViewDropdownOpen(!isViewDropdownOpen)
            setIsSortDropdownOpen(false)
          }}
          className="flex items-center cursor-pointer px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {selectedView}{" "}
          <ChevronDown size={16} className={`ml-2 transition-transform ${isViewDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        {isViewDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {viewOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedView(option)
                  setIsViewDropdownOpen(false)
                }}
                className={`w-full text-left cursor-pointer  px-4 py-2 text-sm font-medium hover:bg-gray-100 ${selectedView === option ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setIsSortDropdownOpen(!isSortDropdownOpen)
            setIsViewDropdownOpen(false)
          }}
          className="flex items-center cursor-pointer px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {selectedSort}{" "}
          <ChevronDown size={16} className={`ml-2 transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        {isSortDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedSort(option)
                  setIsSortDropdownOpen(false)
                }}
                className={`w-full cursor-pointer  text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 ${selectedSort === option ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownControls
