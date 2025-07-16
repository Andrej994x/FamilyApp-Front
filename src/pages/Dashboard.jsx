"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ImageIcon,
  Calendar,
  List,
  MapPin,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
} from "lucide-react"
import PhotoModal from "../components/PhotoModal"
import EventModal from "../components/EventModal"
import ToDoModal from "../components/ToDoModal"
import LocationModal from "../components/LocationModal"
import EventDetailsModal from "../components/EventDetailsModal"

const Dashboard = () => {
  const navigate = useNavigate()
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isToDoModalOpen, setIsToDoModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Dropdown states
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [selectedView, setSelectedView] = useState("View all")
  const [selectedSort, setSelectedSort] = useState("By update date")

  const viewOptions = ["View all", "Events only", "Photos only", "To-dos only", "Locations only"]

  const sortOptions = ["By update date", "By creation date", "By name", "By priority"]

  const upcomingEvents = [
    {
      date: "10",
      title: "piknik",
      time: "Today - All day",
      color: "bg-blue-500",
      fullDate: "Thursday 10 July 2025 - All Day",
      reminder: "On day of event at 09:00",
      location: "Park",
      attendees: ["An"],
      relatedList: "test",
      createdBy: "Andrej",
    },
    {
      date: "11",
      title: "test public",
      time: "Tomorrow - All day",
      color: "bg-green-500",
      fullDate: "Friday 11 July 2025 - All Day",
      reminder: "On day of event at 09:00",
      location: "krusevo",
      attendees: ["An"],
      relatedList: "test",
      createdBy: "Andrej",
    },
  ]

  const activities = [
    {
      user: "Andrej",
      action: "has an event",
      time: "Today",
      avatar: "An",
      hasEvent: true,
      eventType: "piknik",
      eventColor: "bg-blue-500",
      eventTextColor: "text-white",
      eventDate: "10",
      eventMonth: "July",
      eventDetails: "Thursday 10 July 2025 - All Day",
      eventLocation: "",
    },
  ]

  const handleViewSelect = (option) => {
    setSelectedView(option)
    setIsViewDropdownOpen(false)
  }

  const handleSortSelect = (option) => {
    setSelectedSort(option)
    setIsSortDropdownOpen(false)
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsEventDetailsModalOpen(true)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Main Container - Fixed position, centered content */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
          {/* Main Content - Fixed position */}
          <div className="flex-1 lg:max-w-3xl pt-8 px-4 lg:px-6 lg:mx-8">
            {/* Post Input */}
            <div className="bg-white rounded-lg p-4 lg:p-6 mb-6 border border-gray-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3 lg:mr-4">
                  <span className="text-white font-bold text-sm lg:text-base">An</span>
                </div>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="flex-1 bg-gray-50 rounded-full px-4 py-2 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 border border-gray-200 text-sm lg:text-base"
                />
              </div>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
                >
                  <ImageIcon size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-blue-500" />
                  <span className="text-xs lg:text-sm font-medium">Add Photo</span>
                </button>
                <button
                  onClick={() => setIsEventModalOpen(true)}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
                >
                  <Calendar size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-red-500" />
                  <span className="text-xs lg:text-sm font-medium">Add Event</span>
                </button>
                <button
                  onClick={() => setIsToDoModalOpen(true)}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
                >
                  <List size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-green-500" />
                  <span className="text-xs lg:text-sm font-medium">Add To-Do</span>
                </button>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
                >
                  <MapPin size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-yellow-500" />
                  <span className="text-xs lg:text-sm font-medium">Add Local...</span>
                </button>
                <button className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50">
                  <span className="text-sm lg:text-lg mr-1 lg:mr-2">😊</span>
                  <span className="text-xs lg:text-sm font-medium">Add GIF</span>
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex justify-between items-center mb-6 relative">
              {/* View Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsViewDropdownOpen(!isViewDropdownOpen)
                    setIsSortDropdownOpen(false)
                  }}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <span className="mr-1 text-sm lg:text-base">{selectedView}</span>
                  <ChevronDown size={16} className={`transition-transform ${isViewDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isViewDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsViewDropdownOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <div className="py-1">
                        {viewOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleViewSelect(option)}
                            className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                              selectedView === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsSortDropdownOpen(!isSortDropdownOpen)
                    setIsViewDropdownOpen(false)
                  }}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <span className="mr-1 text-sm lg:text-base">{selectedSort}</span>
                  <ChevronDown size={16} className={`transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isSortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleSortSelect(option)}
                            className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                              selectedSort === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="bg-white rounded-lg p-4 lg:p-6 border border-gray-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xs lg:text-sm">{activity.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm lg:text-base">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                        <Heart size={12} className="text-gray-400 lg:w-3.5 lg:h-3.5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={14} className="lg:w-4 lg:h-4" />
                      </button>
                    </div>
                  </div>

                  {activity.hasEvent && (
                    <div
                      className={`${activity.eventColor} rounded-lg p-4 lg:p-5 flex items-start space-x-3 lg:space-x-4 mt-3`}
                    >
                      <div className="text-center min-w-[40px] lg:min-w-[50px]">
                        <div className={`text-xs ${activity.eventTextColor} opacity-75 font-medium`}>
                          {activity.eventMonth}
                        </div>
                        <div className={`text-xl lg:text-2xl font-bold ${activity.eventTextColor}`}>
                          {activity.eventDate}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${activity.eventTextColor} mb-1 text-sm lg:text-base`}>
                          {activity.eventType}
                        </h3>
                        <p className={`text-xs lg:text-sm ${activity.eventTextColor} opacity-75 mb-2`}>
                          {activity.eventDetails}
                        </p>
                        {activity.eventLocation && (
                          <p className={`text-xs lg:text-sm ${activity.eventTextColor} flex items-center`}>
                            <MapPin size={10} className="mr-1 lg:w-3 lg:h-3" />
                            {activity.eventLocation}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Comment Input - inside the event container with full-width border */}
                  <div className="-mx-4 lg:-mx-6 mt-4 pt-4 px-4 lg:px-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs lg:text-sm font-bold">An</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Write a comment"
                        className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Fixed position */}
          <div className="w-full lg:w-80 px-4 lg:px-6 lg:mr-8 mt-6 lg:mt-0">
            {/* Spacing to align with action buttons on desktop */}
            <div className="hidden lg:block" style={{ height: "calc(2rem)" }}></div>

            {/* Upcoming Events - with title inside border */}
            <div className="mb-6 lg:mb-8">
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                {/* Header with title inside */}
                <div className="px-3 lg:px-4 py-3 lg:py-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-xs lg:text-sm tracking-wide">UPCOMING EVENTS</h3>
                </div>
                {/* Events content */}
                <div className="p-3 lg:p-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="py-2 lg:py-3">
                      <div
                        className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        <div
                          className={`w-6 h-6 lg:w-8 lg:h-8 ${event.color} text-white rounded flex items-center justify-center text-xs lg:text-sm font-bold mr-2 lg:mr-3`}
                        >
                          {event.date}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-xs lg:text-sm">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                      </div>
                      {index < upcomingEvents.length - 1 && (
                        <div className="border-b border-gray-200 mt-2 lg:mt-3"></div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Footer */}
                <div className="border-t border-gray-200 py-2 lg:py-3 px-3 lg:px-4">
                  <button
                    onClick={() => navigate("/calendar")}
                    className="w-full text-blue-600 text-xs font-bold hover:underline text-center tracking-wide cursor-pointer"
                  >
                    GO TO CALENDAR
                  </button>
                </div>
              </div>
            </div>

            {/* Last Items */}
            <div className="mb-6 lg:mb-8">
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                {/* Header with title inside */}
                <div className="px-3 lg:px-4 py-3 lg:py-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-xs lg:text-sm tracking-wide">
                    LAST ITEMS OF LISTS ADDED
                  </h3>
                </div>
                {/* Content */}
                <div className="p-3 lg:p-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-gray-400 rounded-full mr-2 lg:mr-3"></div>
                    <span className="text-gray-700 text-xs lg:text-sm">test</span>
                  </div>
                </div>
                {/* Footer */}
                <div className="border-t border-gray-200 py-2 lg:py-3 px-3 lg:px-4">
                  <button
                    onClick={() => navigate("/lists")}
                    className="w-full text-blue-600 text-xs font-bold hover:underline text-center tracking-wide cursor-pointer"
                  >
                    GO TO LISTS
                  </button>
                </div>
              </div>
            </div>

            {/* Last Check-in */}
            <div>
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                {/* Header with title inside */}
                <div className="px-3 lg:px-4 py-3 lg:py-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 text-xs lg:text-sm tracking-wide">LAST CHECK-IN</h3>
                </div>
                {/* Content */}
                <div className="p-3 lg:p-4">
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center relative">
                      <span className="text-white font-bold text-sm lg:text-base">An</span>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <MapPin size={8} className="text-white lg:w-2.5 lg:h-2.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <ChevronLeft size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 lg:w-5 lg:h-5" />
                    <span className="font-medium text-gray-900 text-xs lg:text-sm">Andrej2</span>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 cursor-pointer hover:text-gray-600 lg:w-5 lg:h-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <PhotoModal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} />
        <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
        <ToDoModal isOpen={isToDoModalOpen} onClose={() => setIsToDoModalOpen(false)} />
        <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
        <EventDetailsModal
          isOpen={isEventDetailsModalOpen}
          onClose={() => setIsEventDetailsModalOpen(false)}
          event={selectedEvent}
        />
      </div>
    </>
  )
}

export default Dashboard
