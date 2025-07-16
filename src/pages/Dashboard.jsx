"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PhotoModal from "../components/dashboard/PhotoModal"
import ToDoModal from "../components/dashboard/ToDoModal"
import LocationModal from "../components/dashboard/LocationModal"
import PostInput from "../components/dashboard/PostInput"
import DropdownControls from "../components/dashboard/DropdownControls"
import ActivityCard from "../components/dashboard/ActivityCard"
import UpcomingEventsCard from "../components/dashboard/UpcomingEventsCard"
import LastItemsCard from "../components/dashboard/LastItemsCard"
import EventDetailsModal from "../shared/EventDetailsModal"
import EventModal from  "../shared/EventModal"
import LastCheckInCard from "../components/dashboard/LastCheckInCard"




const Dashboard = () => {
  const navigate = useNavigate()
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isToDoModalOpen, setIsToDoModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [selectedView, setSelectedView] = useState("View all")
  const [selectedSort, setSelectedSort] = useState("By update date")

  const viewOptions = ["View all", "Events only", "Photos only", "To-dos only", "Locations only"]
  const sortOptions = ["By update date", "By creation date", "By name", "By priority"]

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Left/Main Content */}
        <div className="flex-1 lg:max-w-3xl pt-8 px-4 lg:px-6 lg:mx-8">
          <PostInput
            onPhotoClick={() => setIsPhotoModalOpen(true)}
            onEventClick={() => setIsEventModalOpen(true)}
            onToDoClick={() => setIsToDoModalOpen(true)}
            onLocationClick={() => setIsLocationModalOpen(true)}
          />

          <DropdownControls
            selectedView={selectedView}
            selectedSort={selectedSort}
            setSelectedView={setSelectedView}
            setSelectedSort={setSelectedSort}
            viewOptions={viewOptions}
            sortOptions={sortOptions}
          />

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 px-4 lg:px-6 lg:mr-8 mt-6 lg:mt-0">
          <div className="hidden lg:block" style={{ height: "2rem" }} />
          <UpcomingEventsCard events={upcomingEvents} onEventClick={setSelectedEvent} setOpen={setIsEventDetailsModalOpen} />
          <LastItemsCard navigate={navigate} />
          <LastCheckInCard />
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
  )
}

export default Dashboard
