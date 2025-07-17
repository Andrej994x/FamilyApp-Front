"use client"
import { useState, useMemo, useCallback } from "react"
import {
  Calendar,
  ListIcon,

} from "lucide-react"

import MembersModal from "../components/calendar/MembersModal"
import EventDetailsModal from "../shared/EventDetailsModal"
import EventModal from "../shared/EventModal"
import CalendarHeader from "../components/calendar/CalendarHeader"
import CalendarNavigation from "../components/calendar/CalendarNavigation"
import CalendarGrid from "../components/calendar/CalendarGrid"
import CalendarSidebar from "../components/calendar/CalendarSidebar"
import PreferencesModal from "../components/calendar/PreferencesModal"
import FloatingButton from "../components/calendar/FloatingButton"

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 16))
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)
  const [isPreferencesModalOpen, setIsPreferencesModal] = useState(false)
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false)
  const [isCalendarSidebarOpen, setIsCalendarSidebarOpen] = useState(false)
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedView, setSelectedView] = useState("Month")
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarCurrentMonth, setSidebarCurrentMonth] = useState(new Date(2025, 6))
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
  const fullDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]
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

  const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]

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
        date: new Date(2025, 6, 11),
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
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7
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
    const startingDayOfWeek = firstDay.getDay()
    const days = []

    const prevMonth = new Date(year, month, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.unshift({ day: prevMonth.getDate() - i, isCurrentMonth: false, isPrevMonth: true })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true, isPrevMonth: false })
    }

    const remainingDays = 42 - days.length
    console.log("test")
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false, isPrevMonth: false })
    }

    return days
  }, [])

  const getWeekRange = useCallback((date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1)
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

  return (
    <div className="flex h-full bg-white">
      <div className="flex-1 p-6 relative flex flex-col">
        <div className="flex-none">
          <CalendarHeader
            isSearchMode={isSearchMode}
            handleSearchClick={handleSearchClick}
            handleSearchBack={handleSearchBack}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            renderCalendarHeader={renderCalendarHeader}
            handleCalendarSidebarClick={handleCalendarSidebarClick}
            isOptionsMenuOpen={isOptionsMenuOpen}
            setIsOptionsMenuOpen={setIsOptionsMenuOpen}
            handlePreferencesClick={handlePreferencesClick}
          />
          <CalendarNavigation
            navigateCalendar={navigateCalendar}
            goToToday={goToToday}
            isViewDropdownOpen={isViewDropdownOpen}
            setIsViewDropdownOpen={setIsViewDropdownOpen}
            selectedView={selectedView}
            handleViewSelect={handleViewSelect}
            setIsMembersModalOpen={setIsMembersModalOpen}
            viewOptions={viewOptions}
          />
        </div>
        <CalendarGrid
          selectedView={selectedView}
          currentDate={currentDate}
          getDaysInMonth={getDaysInMonth}
          getDaysOfWeek={getDaysOfWeek}
          getHoursOfDay={getHoursOfDay}
          isToday={isToday}
          mockEvents={mockEvents}
          monthNames={monthNames}
          dayNames={dayNames}
          fullDayNames={fullDayNames}
          handleEventClick={handleEventClick}
        />
        <FloatingButton setIsEventModalOpen={setIsEventModalOpen} />
      </div>
      <CalendarSidebar
        isCalendarSidebarOpen={isCalendarSidebarOpen}
        setIsCalendarSidebarOpen={setIsCalendarSidebarOpen}
        sidebarCurrentMonth={sidebarCurrentMonth}
        monthNames={monthNames}
        shortDayNames={shortDayNames}
        getSidebarDaysInMonth={getSidebarDaysInMonth}
        goToPreviousSidebarMonth={goToPreviousSidebarMonth}
        goToNextSidebarMonth={goToNextSidebarMonth}
        isTodayInSidebar={isTodayInSidebar}
      />
      <PreferencesModal
        isPreferencesModalOpen={isPreferencesModalOpen}
        setIsPreferencesModal={setIsPreferencesModal}
        defaultReminder={defaultReminder}
        setDefaultReminder={setDefaultReminder}
        showWeekNumbers={showWeekNumbers}
        setShowWeekNumbers={setShowWeekNumbers}
        firstDayOfWeek={firstDayOfWeek}
        setFirstDayOfWeek={setFirstDayOfWeek}
        reminderDropdownOpen={reminderDropdownOpen}
        setReminderDropdownOpen={setReminderDropdownOpen}
        weekNumbersDropdownOpen={weekNumbersDropdownOpen}
        setWeekNumbersDropdownOpen={setWeekNumbersDropdownOpen}
        firstDayDropdownOpen={firstDayDropdownOpen}
        setFirstDayDropdownOpen={setFirstDayDropdownOpen}
        reminderOptions={reminderOptions}
        weekNumberOptions={weekNumberOptions}
        dayOptions={dayOptions}
        handleSavePreferences={handleSavePreferences}
      />
      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      <MembersModal isOpen={isMembersModalOpen} onClose={() => setIsMembersModalOpen(false)} />
      <EventDetailsModal
        isOpen={isEventDetailsModalOpen}
        onClose={() => setIsEventDetailsModalOpen(false)}
        event={selectedEvent}
      />
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
    </div>
  )
}