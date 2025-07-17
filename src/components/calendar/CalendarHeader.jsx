"use client"
import { Search, Grid3X3, Calendar, Settings, Printer, Clock, ArrowLeft } from "lucide-react"

export default function CalendarHeader({
  isSearchMode,
  handleSearchClick,
  handleSearchBack,
  searchQuery,
  handleSearchChange,
  renderCalendarHeader,
  handleCalendarSidebarClick,
  isOptionsMenuOpen,
  setIsOptionsMenuOpen,
  handlePreferencesClick,
}) {
  return (
    <div className="flex items-center justify-between p-4 pb-2">
      {!isSearchMode ? (
        <>
          <div className="flex items-center space-x-2">
            <Calendar size={20} />
            <h2 className="text-xl font-semibold">{renderCalendarHeader}</h2>
          </div>
          <div className="flex items-center space-x-4 relative">
            <button onClick={handleSearchClick} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
              <Search size={20} className="text-gray-400" />
            </button>
            <button onClick={handleCalendarSidebarClick} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
              <Grid3X3 size={20} className="text-gray-400" />
            </button>
            <button
              onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
              className="p-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
            {isOptionsMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  style={{ backgroundColor: "#00000080" }}
                  onClick={() => setIsOptionsMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 z-50 bg-white shadow-lg rounded-lg w-48 overflow-hidden">
                  <button
                    onClick={handlePreferencesClick}
                    className="w-full text-left px-4 py-2 text-sm font-bold flex items-center space-x-2 cursor-pointer hover:bg-gray-50"
                  >
                    <Settings size={16} className="text-gray-700" />
                    <span className="text-gray-700">Preferences</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-bold flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
                    <Printer size={16} className="text-gray-700" />
                    <span className="text-gray-700">Print</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-bold flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
                    <Clock size={16} className="text-gray-700" />
                    <span className="text-gray-700">Clean</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4 w-full">
          <button onClick={handleSearchBack} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div
            className="relative flex-1 animate-[slideInFromLeft_0.3s_ease-out]"
            style={{
              animation: "slideInFromLeft 0.3s ease-out",
            }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
          <div className="flex items-center space-x-4 relative">
            <button onClick={handleCalendarSidebarClick} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
              <Grid3X3 size={20} className="text-gray-400" />
            </button>
            <button
              onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
              className="p-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
            {isOptionsMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  style={{ backgroundColor: "#00000080" }}
                  onClick={() => setIsOptionsMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 z-50 bg-white shadow-lg rounded-lg w-48 overflow-hidden">
                  <button
                    onClick={handlePreferencesClick}
                    className="w-full text-left px-4 py-2 text-sm font-bold flex items-center space-x-2 cursor-pointer hover:bg-gray-50"
                  >
                    <Settings size={16} className="text-gray-700" />
                    <span className="text-gray-700">Preferences</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-bold flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
                    <Printer size={16} className="text-gray-700" />
                    <span className="text-gray-700">Print</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-bold flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
                    <Clock size={16} className="text-gray-700" />
                    <span className="text-gray-700">Clean</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}