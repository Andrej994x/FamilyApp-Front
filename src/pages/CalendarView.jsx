"use client"
import { useState, useMemo, useCallback } from "react"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Grid3X3,
  Users,
  Plus,
  ListIcon,
  Settings,
  Printer,
  Clock,
  X,
  ChevronDown,
  ArrowLeft,
  Check,
  Download,
} from "lucide-react"
import MembersModal from "../components/MembersModal"
import EventDetailsModal from "../shared/EventDetailsModal"
import EventModal from  "../shared/EventModal"

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 16)) // Use a single date state for all views
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false) // Declare the variable here
  const [isPreferencesModalOpen, setIsPreferencesModal] = useState(false)
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false)
  const [isCalendarSidebarOpen, setIsCalendarSidebarOpen] = useState(false)
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedView, setSelectedView] = useState("Month") // Default to Month
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarCurrentMonth, setSidebarCurrentMonth] = useState(new Date(2025, 6))

  // Preferences modal states
  const [defaultReminder, setDefaultReminder] = useState("30 minutes before")
  const [showWeekNumbers, setShowWeekNumbers] = useState("No")
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("Monday")
  const [reminderDropdownOpen, setReminderDropdownOpen] = useState(false)
  const [weekNumbersDropdownOpen, setWeekNumbersDropdownOpen] = useState(false)
  const [firstDayDropdownOpen, setFirstDayDropdownOpen] = useState(false)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const fullDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const shortDayNames = ["M", "T", "W", "T", "F", "S", "S"]

  const viewOptions = [
    { value: "Day", label: "Day", icon: Calendar },
    { value: "Week", label: "Week", icon: Calendar },
    { value: "Month", label: "Month", icon: Calendar },
    { value: "List", label: "List", icon: ListIcon },
  ]

  const reminderOptions = [
    "No reminder",
    "5 minutes before",
    "10 minutes before",
    "15 minutes before",
    "30 minutes before",
    "1 hour before",
    "2 hours before",
    "1 day before",
  ]

  const weekNumberOptions = ["Yes", "No"]

  const dayOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // Helper to format date for EventDetailsModal
  const formatEventDateForModal = useCallback(
    (date, type) => {
      const dayName = fullDayNames[date.getDay()]
      const day = date.getDate()
      const month = monthNames[date.getMonth()]
      const year = date.getFullYear()

      if (type === "all-day") {
        return `${dayName} ${day} ${month} ${year} - All Day`
      } else {
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        return `${dayName} ${day} ${month} ${year} at ${hours}:${minutes}`
      }
    },
    [fullDayNames, monthNames],
  )

  // Mock events for demonstration
  const mockEvents = useMemo(
    () => [
      {
        id: 1,
        title: "Tea's birthday",
        date: new Date(2025, 1, 3),
        type: "all-day",
        color: "bg-purple-500",
        reminder: "On day of event at 09:00",
        location: "krusevo",
        attendees: ["Te"],
        description: "test",
        createdBy: "Andrej",
        relatedList: "Family Events",
      },
      {
        id: 2,
        title: "piknik",
        date: new Date(2025, 6, 9),
        type: "all-day",
        color: "bg-blue-500",
        reminder: "No reminder",
        location: "Park",
        attendees: ["Family"],
        description: "Family picnic in the park.",
        createdBy: "Andrej",
        relatedList: "Outdoor Activities",
      },
      {
        id: 3,
        title: "test public",
        date: new Date(2025, 6, 11), // Changed to July 11 for Day view example
        type: "all-day",
        color: "bg-green-500",
        reminder: "1 day before",
        location: "City Square",
        attendees: ["Public"],
        description: "Public testing event.",
        createdBy: "Admin",
        relatedList: "Community Events",
      },
      {
        id: 4,
        title: "Meeting with John",
        date: new Date(2025, 6, 16, 9, 0),
        type: "timed",
        color: "bg-red-500",
        reminder: "15 minutes before",
        location: "Office Room 3",
        attendees: ["John"],
        description: "Discuss Q3 strategy.",
        createdBy: "Andrej",
        relatedList: "Work Tasks",
      },
      {
        id: 5,
        title: "Project Deadline",
        date: new Date(2025, 6, 18, 17, 0),
        type: "timed",
        color: "bg-yellow-500",
        reminder: "1 hour before",
        location: "Remote",
        attendees: ["Team"],
        description: "Final submission for Project X.",
        createdBy: "Andrej",
        relatedList: "Work Tasks",
      },
      {
        id: 6,
        title: "Team Lunch",
        date: new Date(2025, 6, 14, 12, 0),
        type: "timed",
        color: "bg-indigo-500",
        reminder: "5 minutes before",
        location: "Cafeteria",
        attendees: ["Team"],
        description: "Casual team lunch.",
        createdBy: "Andrej",
        relatedList: "Social Events",
      },
      {
        id: 7,
        title: "Client Call",
        date: new Date(2025, 6, 15, 10, 30),
        type: "timed",
        color: "bg-pink-500",
        reminder: "10 minutes before",
        location: "Zoom",
        attendees: ["Client A", "Sarah"],
        description: "Weekly sync with Client A.",
        createdBy: "Andrej",
        relatedList: "Work Tasks",
      },
      {
        id: 8,
        title: "Dentist Appointment",
        date: new Date(2025, 6, 17, 14, 0),
        type: "timed",
        color: "bg-teal-500",
        reminder: "2 hours before",
        location: "Dental Clinic",
        attendees: [],
        description: "Routine check-up.",
        createdBy: "Andrej",
        relatedList: "Personal Health",
      },
      {
        id: 9,
        title: "Yoga Class",
        date: new Date(2025, 6, 19, 8, 0),
        type: "timed",
        color: "bg-orange-500",
        reminder: "30 minutes before",
        location: "Yoga Studio",
        attendees: [],
        description: "Morning yoga session.",
        createdBy: "Andrej",
        relatedList: "Personal Health",
      },
    ],
    [],
  )

  const getDaysInMonth = useCallback((date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Adjust to make Monday the first day (0-6)
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(day)
    return days
  }, [])

  const getSidebarDaysInMonth = useCallback((date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay() // Sunday is 0
    const days = []

    // Add previous month days
    const prevMonth = new Date(year, month, 0) // Last day of previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.unshift({ day: prevMonth.getDate() - i, isCurrentMonth: false, isPrevMonth: true })
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true, isPrevMonth: false })
    }

    // Add next month days to fill the grid (always 6 rows, 42 cells)
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false, isPrevMonth: false })
    }

    return days
  }, [])

  const getWeekRange = useCallback((date) => {
    const day = date.getDay() // 0 for Sunday, 1 for Monday
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust to Monday as start of week
    const startOfWeek = new Date(date.setDate(diff))
    const endOfWeek = new Date(date.setDate(diff + 6))
    return { startOfWeek, endOfWeek }
  }, [])

  const getDaysOfWeek = useCallback(
    (date) => {
      const { startOfWeek } = getWeekRange(date)
      const days = []
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek)
        d.setDate(startOfWeek.getDate() + i)
        days.push(d)
      }
      return days
    },
    [getWeekRange],
  )

  const getHoursOfDay = useCallback(() => {
    const hours = []
    for (let i = 0; i < 24; i++) {
      hours.push(`${String(i).padStart(2, "0")}:00`)
    }
    return hours
  }, [])

  const navigateCalendar = useCallback(
    (direction) => {
      const newDate = new Date(currentDate)
      if (selectedView === "Month") {
        newDate.setMonth(newDate.getMonth() + direction)
      } else if (selectedView === "Week") {
        newDate.setDate(newDate.getDate() + direction * 7)
      } else if (selectedView === "Day") {
        newDate.setDate(newDate.getDate() + direction)
      } else if (selectedView === "List") {
        newDate.setFullYear(newDate.getFullYear() + direction)
      }
      setCurrentDate(newDate)
    },
    [currentDate, selectedView],
  )

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  const goToPreviousSidebarMonth = useCallback(
    () => setSidebarCurrentMonth(new Date(sidebarCurrentMonth.getFullYear(), sidebarCurrentMonth.getMonth() - 1)),
    [sidebarCurrentMonth],
  )

  const goToNextSidebarMonth = useCallback(
    () => setSidebarCurrentMonth(new Date(sidebarCurrentMonth.getFullYear(), sidebarCurrentMonth.getMonth() + 1)),
    [sidebarCurrentMonth],
  )

  const isToday = useCallback((day, month, year) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }, [])

  const isTodayInSidebar = useCallback(
    (dayObj) => {
      if (!dayObj.isCurrentMonth) return false
      const today = new Date()
      return (
        dayObj.day === today.getDate() &&
        sidebarCurrentMonth.getMonth() === today.getMonth() &&
        sidebarCurrentMonth.getFullYear() === today.getFullYear()
      )
    },
    [sidebarCurrentMonth],
  )

  const handleViewSelect = useCallback((option) => {
    setSelectedView(option.value)
    setIsViewDropdownOpen(false)
    // Reset current date to today when changing view for better context
    setCurrentDate(new Date())
  }, [])

  const handleSearchClick = useCallback(() => {
    setIsSearchMode(true)
  }, [])

  const handleSearchBack = useCallback(() => {
    setIsSearchMode(false)
    setSearchQuery("")
  }, [])

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value)
  }, [])

  const handlePreferencesClick = useCallback(() => {
    setIsOptionsMenuOpen(false)
    setIsPreferencesModal(true)
  }, [])

  const handleCalendarSidebarClick = useCallback(() => {
    setIsCalendarSidebarOpen(true)
  }, [])

  const handleSavePreferences = useCallback(() => {
    console.log("Settings saved:", {
      defaultReminder,
      showWeekNumbers,
      firstDayOfWeek,
    })
    setIsPreferencesModal(false)
  }, [defaultReminder, showWeekNumbers, firstDayOfWeek])

  const handleEventClick = useCallback(
    (event) => {
      // Prepare event data for the modal, including the formatted date
      const eventWithFormattedDate = {
        ...event,
        fullDate: formatEventDateForModal(event.date, event.type),
      }
      setSelectedEvent(eventWithFormattedDate)
      setIsEventDetailsModalOpen(true)
    },
    [formatEventDateForModal],
  )

  const renderCalendarHeader = useMemo(() => {
    if (selectedView === "Month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    } else if (selectedView === "Week") {
      const { startOfWeek, endOfWeek } = getWeekRange(currentDate)
      const startMonth = monthNames[startOfWeek.getMonth()].substring(0, 3)
      const endMonth = monthNames[endOfWeek.getMonth()].substring(0, 3)
      const startDay = startOfWeek.getDate()
      const endDay = endOfWeek.getDate()
      const year = startOfWeek.getFullYear()
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`
    } else if (selectedView === "Day") {
      return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    } else if (selectedView === "List") {
      return `${currentDate.getFullYear()}`
    }
    return ""
  }, [selectedView, currentDate, getWeekRange, monthNames])

  const renderCalendarGrid = useMemo(() => {
    if (selectedView === "Month") {
      const days = getDaysInMonth(currentDate)
      return (
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 border border-gray-200 ${
                day ? "bg-white hover:bg-gray-50" : "bg-gray-50"
              } cursor-pointer`}
            >
              {day && (
                <>
                  <div
                    className={`text-sm w-6 h-6 flex items-center justify-center ${
                      isToday(day, currentDate.getMonth(), currentDate.getFullYear())
                        ? "bg-blue-500 text-white rounded-full font-medium"
                        : ""
                    }`}
                  >
                    {day}
                  </div>
                  {mockEvents
                    .filter(
                      (event) =>
                        event.date.getDate() === day &&
                        event.date.getMonth() === currentDate.getMonth() &&
                        event.date.getFullYear() === currentDate.getFullYear(),
                    )
                    .map((event) => (
                      <div key={event.id} className="mt-1">
                        <div
                          className={`text-xs ${event.color} text-white px-1 rounded cursor-pointer`} // Added cursor-pointer
                          onClick={(e) => {
                            e.stopPropagation() // Prevent day cell click
                            handleEventClick(event)
                          }}
                        >
                          {event.title}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
        </div>
      )
    } else if (selectedView === "Week") {
      const daysOfWeek = getDaysOfWeek(currentDate)
      const hoursOfDay = getHoursOfDay()
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const allDayEvents = mockEvents.filter(
        (event) =>
          event.type === "all-day" && event.date >= daysOfWeek[0] && event.date <= daysOfWeek[daysOfWeek.length - 1],
      )

      return (
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="p-2 text-center text-sm font-medium text-gray-600">
                {dayNames[day.getDay() === 0 ? 6 : day.getDay() - 1]} {day.getDate()}/{day.getMonth() + 1}
              </div>
            ))}
          </div>
          {allDayEvents.length > 0 && (
            <div className="flex flex-col border-b border-gray-200 pb-2 mb-2">
              <div className="text-sm font-medium text-gray-600 mb-1">All day</div>
              <div className="flex flex-col gap-1">
                {allDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} text-white text-xs p-1 rounded cursor-pointer`}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto relative">
            <div className="grid grid-cols-[auto_1fr] h-full">
              {/* Time Column */}
              <div className="flex flex-col border-r border-gray-200 pr-2 text-xs text-gray-500">
                {hoursOfDay.map((hour, index) => (
                  <div key={hour} className="h-12 flex items-start justify-end pt-0.5">
                    {index > 0 ? hour : ""}
                  </div>
                ))}
              </div>
              {/* Week Grid */}
              <div className="grid grid-cols-7 gap-1 flex-1 relative">
                {/* Current time indicator */}
                {isToday(now.getDate(), now.getMonth(), now.getFullYear()) && selectedView === "Week" && (
                  <div
                    className="absolute left-0 right-0 h-px bg-red-500 z-10"
                    style={{ top: `${((currentHour * 60 + currentMinute) / 60) * 48 + 24}px` }} // 48px per hour, 24px offset for half hour
                  >
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                )}
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex flex-col border-r border-gray-200 last:border-r-0">
                    {hoursOfDay.map((hour, hourIndex) => (
                      <div key={`${dayIndex}-${hourIndex}`} className="h-12 border-b border-gray-100 relative">
                        {/* Render events for this hour/day */}
                        {mockEvents
                          .filter(
                            (event) =>
                              event.date.getDate() === day.getDate() &&
                              event.date.getMonth() === day.getMonth() &&
                              event.date.getFullYear() === day.getFullYear() &&
                              event.type === "timed" &&
                              event.date.getHours() === hourIndex,
                          )
                          .map((event) => (
                            <div
                              key={event.id}
                              className={`absolute inset-0 ${event.color} text-white text-xs p-1 rounded overflow-hidden cursor-pointer`} // Added cursor-pointer
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventClick(event)
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    } else if (selectedView === "Day") {
      const hoursOfDay = getHoursOfDay()
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const allDayEvents = mockEvents.filter(
        (event) =>
          event.type === "all-day" &&
          event.date.getDate() === currentDate.getDate() &&
          event.date.getMonth() === currentDate.getMonth() &&
          event.date.getFullYear() === currentDate.getFullYear(),
      )

      return (
        <div className="flex flex-col h-full">
          <div className="p-2 text-center text-sm font-medium text-gray-600">
            {dayNames[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]}
          </div>
          {allDayEvents.length > 0 && (
            <div className="flex flex-col border-b border-gray-200 pb-2 mb-2">
              <div className="text-sm font-medium text-gray-600 mb-1">All day</div>
              <div className="flex flex-col gap-1">
                {allDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} text-white text-xs p-1 rounded cursor-pointer`}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto relative">
            <div className="grid grid-cols-[auto_1fr] h-full">
              {/* Time Column */}
              <div className="flex flex-col border-r border-gray-200 pr-2 text-xs text-gray-500">
                {hoursOfDay.map((hour, index) => (
                  <div key={hour} className="h-12 flex items-start justify-end pt-0.5">
                    {index > 0 ? hour : ""}
                  </div>
                ))}
              </div>
              {/* Day Grid */}
              <div className="flex flex-col flex-1 relative">
                {/* Current time indicator */}
                {isToday(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) &&
                  selectedView === "Day" && (
                    <div
                      className="absolute left-0 right-0 h-px bg-red-500 z-10"
                      style={{ top: `${((currentHour * 60 + currentMinute) / 60) * 48 + 24}px` }} // 48px per hour, 24px offset for half hour
                    >
                      <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                {hoursOfDay.map((hour, hourIndex) => (
                  <div key={hourIndex} className="h-12 border-b border-gray-100 relative">
                    {/* Render events for this hour/day */}
                    {mockEvents
                      .filter(
                        (event) =>
                          event.date.getDate() === currentDate.getDate() &&
                          event.date.getMonth() === currentDate.getMonth() &&
                          event.date.getFullYear() === currentDate.getFullYear() &&
                          event.type === "timed" &&
                          event.date.getHours() === hourIndex,
                      )
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`absolute inset-0 ${event.color} text-white text-xs p-1 rounded overflow-hidden cursor-pointer`} // Added cursor-pointer
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEventClick(event)
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    } else if (selectedView === "List") {
      const filteredEvents = mockEvents
        .filter((event) => event.date.getFullYear() === currentDate.getFullYear())
        .sort((a, b) => a.date.getTime() - b.date.getTime())

      let lastDate = null
      return (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No events for this year.</div>
          ) : (
            filteredEvents.map((event, index) => {
              const eventDate = event.date
              const showDateHeader = !lastDate || eventDate.toDateString() !== lastDate.toDateString()
              lastDate = eventDate

              return (
                <div key={event.id}>
                  {showDateHeader && (
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {fullDayNames[eventDate.getDay()]} {eventDate.getDate()} {monthNames[eventDate.getMonth()]}{" "}
                        {eventDate.getFullYear()}
                      </h3>
                      <span className="text-sm text-gray-500">{fullDayNames[eventDate.getDay()]}</span>
                    </div>
                  )}
                  <div
                    key={event.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer" // Added cursor-pointer
                    onClick={() => handleEventClick(event)}
                  >
                    <div className={`w-4 h-4 ${event.color} rounded-full flex items-center justify-center`}>
                      {event.type === "all-day" ? (
                        <Check size={10} className="text-white" />
                      ) : (
                        <Clock size={10} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {event.type === "all-day"
                          ? "All day"
                          : `${String(event.date.getHours()).padStart(2, "0")}:${String(event.date.getMinutes()).padStart(2, "0")}`}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )
    }
    return null
  }, [
    selectedView,
    currentDate,
    getDaysInMonth,
    getDaysOfWeek,
    getHoursOfDay,
    isToday,
    mockEvents,
    monthNames,
    dayNames,
    fullDayNames,
    handleEventClick,
  ])

  return (
    <div className="flex h-full bg-white">
      {/* Main content area */}
      <div className="flex-1 p-6 relative flex flex-col">
        <div className="flex-none">
          {/* Header */}
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
          {/* Navigation */}
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
        </div>
        {/* Calendar Grid / List */}
        <div className="flex-1 overflow-y-auto p-4">{renderCalendarGrid}</div>
        {/* Floating Button */}
        <button
          onClick={() => setIsEventModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center z-10 cursor-pointer"
        >
          <Plus size={24} />
        </button>
      </div>
      {/* Calendar Sidebar */}
      {isCalendarSidebarOpen && (
        <div
          className="w-80 bg-white shadow-xl flex-shrink-0 transform transition-transform duration-300 ease-in-out h-full"
          style={{
            animation: "slideInFromRight 0.3s ease-out",
          }}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Calendars</h2>
              <button
                onClick={() => setIsCalendarSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Mini Calendar */}
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

              {/* My Calendars */}
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

              {/* Add Other Calendars */}
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
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Preferences Modal */}
      {isPreferencesModalOpen && (
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
                      className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between cursor-pointer"
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
                      className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium cursor-pointer"
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
                      onClick={() => {
                        setFirstDayDropdownOpen(!firstDayDropdownOpen)
                        setReminderDropdownOpen(false)
                        setWeekNumbersDropdownOpen(false)
                      }}
                      className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium cursor-pointer"
                    >
                      <span className="text-gray-900">{firstDayOfWeek}</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    {firstDayDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
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
      )}

      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      <MembersModal isOpen={isMembersModalOpen} onClose={() => setIsMembersModalOpen(false)} />
      <EventDetailsModal
        isOpen={isEventDetailsModalOpen}
        onClose={() => setIsEventDetailsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  )
}

export default CalendarView
