import { ChevronLeft, ChevronRight, X, Check, Calendar, Download } from "lucide-react"

export default function CalendarSidebar({
  isCalendarSidebarOpen,
  setIsCalendarSidebarOpen,
  sidebarCurrentMonth,
  monthNames,
  shortDayNames,
  getSidebarDaysInMonth,
  goToPreviousSidebarMonth,
  goToNextSidebarMonth,
  isTodayInSidebar,
}) {
  return (
    isCalendarSidebarOpen && (
      <div
        className="w-80 bg-white shadow-xl flex-shrink-0 transform transition-transform duration-300 ease-in-out h-full"
        style={{
          animation: "slideInFromRight 0.3s ease-out",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Calendars</h2>
            <button
              onClick={() => setIsCalendarSidebarOpen(false)}
              className="p-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">
                  {monthNames[sidebarCurrentMonth.getMonth()]} {sidebarCurrentMonth.getFullYear()}
                </h3>
                <div className="flex items-center space-x-1">
                  <button onClick={goToPreviousSidebarMonth} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={goToNextSidebarMonth} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {shortDayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-600 p-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {getSidebarDaysInMonth(sidebarCurrentMonth).map((dayObj, index) => (
                  <div
                    key={index}
                    className={`text-center text-sm p-1 cursor-pointer hover:bg-gray-100 rounded ${
                      isTodayInSidebar(dayObj) ? "bg-blue-500 text-white rounded" : ""
                    } ${!dayObj.isCurrentMonth ? "text-gray-400" : "text-gray-900"}`}
                  >
                    {dayObj.day}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-base mb-3">My calendars</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Nestorov</div>
                    <div className="text-xs text-gray-500">Default calendar</div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-4 h-4 border-2 border-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Scheduled Tasks</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Holidays</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">teest</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3">Add Other Calendars</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        fill="#4285f4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34a853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#fbbc05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#ea4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Google Calendar</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        fill="#0078d4"
                        d="M21.53 4.306v15.363A.331.331 0 0 1 21.2 20H2.8a.331.331 0 0 1-.33-.331V4.306a.331.331 0 0 1 .33.331h18.4a.331.331 0 0 1 .33.331z"
                      />
                      <path fill="#fff" d="M12.25 14.494L21.2 4.975H2.8l9.45 9.519z" />
                      <path fill="#0078d4" d="M12.25 14.494L21.2 4.975H2.8l9.45 9.519z" opacity=".6" />
                      <path fill="#fff" d="M7.706 12.494L2.8 19.669h18.4l-4.906-7.175-3.544 2.494-3.544-2.494z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Outlook.com Calendar</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Calendar size={16} className="text-red-500" />
                  </div>
                  <span className="text-sm font-medium">Add Subscription Calendar</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Download size={16} className="text-red-500" />
                  </div>
                  <span className="text-sm font-medium">Import events from ICS</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-500" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Public Holidays Calendar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}