"use client"

import { useState, useRef, useEffect } from "react" // Import useRef and useEffect
import { X, ChevronDown } from "lucide-react"

export default function PreferencesModal({
  isPreferencesModalOpen,
  setIsPreferencesModal,
  defaultReminder,
  setDefaultReminder,
  showWeekNumbers,
  setShowWeekNumbers,
  firstDayOfWeek,
  setFirstDayOfWeek,
  reminderDropdownOpen,
  setReminderDropdownOpen,
  weekNumbersDropdownOpen,
  setWeekNumbersDropdownOpen,
  firstDayDropdownOpen,
  setFirstDayDropdownOpen,
  reminderOptions,
  weekNumberOptions,
  dayOptions,
  handleSavePreferences,
}) {
  const firstDayDropdownRef = useRef(null)
  const [firstDayDropdownDirection, setFirstDayDropdownDirection] = useState("down") // 'up' or 'down'

  useEffect(() => {
    if (firstDayDropdownOpen && firstDayDropdownRef.current) {
      const buttonRect = firstDayDropdownRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - buttonRect.bottom
      const spaceAbove = buttonRect.top

      // Approximate height of the dropdown list (max-h-60 is ~240px)
      const dropdownHeight = 240

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setFirstDayDropdownDirection("up")
      } else {
        setFirstDayDropdownDirection("down")
      }
    }
  }, [firstDayDropdownOpen])

  return (
    isPreferencesModalOpen && (
      <>
        <div
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "#000000b3" }}
          onClick={() => setIsPreferencesModal(false)}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <button
                onClick={() => setIsPreferencesModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X size={20} className="text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                Calendar settings
              </h2>
              <div className="w-6"></div>
            </div>
            {/* Content */}
            <div className="px-6 pb-6 space-y-6">
              {/* Default Reminder */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Default Reminder</label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setReminderDropdownOpen(!reminderDropdownOpen)
                      setWeekNumbersDropdownOpen(false)
                      setFirstDayDropdownOpen(false)
                    }}
                    className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-900">{defaultReminder}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {reminderDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {reminderOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setDefaultReminder(option)
                            setReminderDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 cursor-pointer"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Show Week Numbers */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Show Week Numbers</label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setWeekNumbersDropdownOpen(!weekNumbersDropdownOpen)
                      setReminderDropdownOpen(false)
                      setFirstDayDropdownOpen(false)
                    }}
                    className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-900">{showWeekNumbers}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {weekNumbersDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {weekNumberOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setShowWeekNumbers(option)
                            setWeekNumbersDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 cursor-pointer"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* 1st Day of Week */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">1st Day of Week</label>
                <div className="relative">
                  <button
                    ref={firstDayDropdownRef} // Attach ref here
                    onClick={() => {
                      setFirstDayDropdownOpen(!firstDayDropdownOpen)
                      setReminderDropdownOpen(false)
                      setWeekNumbersDropdownOpen(false)
                    }}
                    className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-900">{firstDayOfWeek}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {firstDayDropdownOpen && (
                    <div
                      className={`absolute z-10 w-full ${
                        firstDayDropdownDirection === "up" ? "bottom-full mb-1" : "mt-1"
                      } bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto`}
                    >
                      {dayOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFirstDayOfWeek(option)
                            setFirstDayDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 cursor-pointer"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Save Button */}
              <button
                onClick={handleSavePreferences}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    )
  )
}
