import { ChevronLeft, ChevronRight, Calendar, Users } from "lucide-react"

export default function CalendarNavigation({
  navigateCalendar,
  goToToday,
  isViewDropdownOpen,
  setIsViewDropdownOpen,
  selectedView,
  handleViewSelect,
  setIsMembersModalOpen,
  viewOptions,
}) {
  return (
    <div className="flex items-center justify-between px-4 pb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigateCalendar(-1)} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 font-bold cursor-pointer"
          >
            Today
          </button>
          <button onClick={() => navigateCalendar(1)} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
            <ChevronRight size={20} />
          </button>
        </div>
        {/* View Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            className="border border-gray-300 rounded px-3 py-1 text-sm pr-8 flex items-center space-x-2 hover:bg-gray-50 font-bold cursor-pointer"
          >
            <Calendar size={16} />
            <span>{selectedView}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isViewDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                style={{ backgroundColor: "#00000080" }}
                onClick={() => setIsViewDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  {viewOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleViewSelect(option)}
                      className={`w-full text-left px-4 py-2 text-sm font-bold cursor-pointer hover:bg-gray-50 flex items-center space-x-2 ${
                        selectedView === option.value ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {option.icon && <option.icon size={16} />}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => setIsMembersModalOpen(true)}
        className="flex items-center text-sm text-black font-bold hover:text-gray-800 cursor-pointer border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50"
      >
        <Users size={16} className="mr-1" />
        Members
      </button>
    </div>
  )
}