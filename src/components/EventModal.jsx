"use client"

import { useState, useEffect, useRef } from "react"
import { X, Paperclip, ImageIcon, FileText, FolderOpen } from "lucide-react"

const EventModal = ({ isOpen, onClose }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const modalContentRef = useRef(null)
  const [eventData, setEventData] = useState({
    title: "",
    fromDate: "2025-07-10",
    fromTime: "15:00",
    toDate: "2025-07-10",
    toTime: "16:00",
    allDay: false,
    color: "blue",
    isPrivate: false,
    repeat: "Never",
    until: "No end date",
    reminder: "30 minutes before",
    reminder2: "None",
    location: "",
    description: "",
  })

  // Calculate max scroll when content changes
  useEffect(() => {
    if (isOpen && modalContentRef.current && showMoreOptions) {
      const element = modalContentRef.current
      const maxScrollValue = element.scrollHeight - element.clientHeight
      setMaxScroll(maxScrollValue)
    } else {
      setMaxScroll(0)
    }
  }, [isOpen, showMoreOptions])

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowMoreOptions(false)
      setShowAttachMenu(false)
      setScrollPosition(0)
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0
      }
    }
  }, [isOpen])

  // Handle wheel scroll - only when more options are shown
  const handleWheel = (e) => {
    if (!showMoreOptions || !modalContentRef.current) return

    e.preventDefault()
    const delta = e.deltaY
    const element = modalContentRef.current
    const newScrollTop = Math.max(0, Math.min(element.scrollHeight - element.clientHeight, element.scrollTop + delta))

    element.scrollTop = newScrollTop
    setScrollPosition(newScrollTop)
  }

  const colors = [
    { name: "blue", class: "bg-blue-500" },
    { name: "red", class: "bg-red-500" },
    { name: "yellow", class: "bg-yellow-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "pink", class: "bg-pink-500" },
    { name: "green", class: "bg-green-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "emerald", class: "bg-emerald-500" },
    { name: "gray", class: "bg-gray-500" },
    { name: "indigo", class: "bg-indigo-500" },
    { name: "cyan", class: "bg-cyan-500" },
    { name: "amber", class: "bg-amber-500" },
    { name: "rose", class: "bg-rose-500" },
    { name: "violet", class: "bg-violet-500" },
    { name: "teal", class: "bg-teal-500" },
    { name: "lime", class: "bg-lime-500" },
    { name: "black", class: "bg-black" },
  ]

  const handleSave = () => {
    console.log("Saving event:", eventData)
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (showAttachMenu) {
        setShowAttachMenu(false)
      } else {
        onClose()
      }
    }
  }

  const handleAttachOption = (option) => {
    console.log("Selected attach option:", option)
    setShowAttachMenu(false)
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: showAttachMenu ? "#000000B0" : "#00000080" }}
        onClick={handleOverlayClick}
        onWheel={handleWheel}
      >
        <div className="bg-white rounded-2xl w-full max-w-lg mx-auto shadow-xl relative max-h-[100vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X size={20} className="text-gray-400" />
            </button>
            <h2 className="text-xl font-semibold">New event</h2>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>

          {/* Attach Menu Dropdown */}
          {showAttachMenu && (
            <>
              {/* Dark overlay over modal */}
              <div className="absolute inset-0 z-[2]" style={{ backgroundColor: "#00000080" }} />
              <div className="absolute top-20 right-6 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-64">
                <div className="py-2">
                  <button
                    onClick={() => handleAttachOption("photo")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <ImageIcon size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Add a photo</span>
                  </button>
                  <button
                    onClick={() => handleAttachOption("file")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <FileText size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Add a file</span>
                  </button>
                  <button
                    onClick={() => handleAttachOption("documents")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <FolderOpen size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Insert from Documents</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Content */}
          <div
            ref={modalContentRef}
            className="px-6 pb-6 space-y-4 flex-1 min-h-0"
            style={{
              overflowY: showMoreOptions ? "hidden" : "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Title */}
            <div className="flex items-center space-x-3 mt-4">
              <input
                type="text"
                placeholder="Title"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="flex-1 border border-blue-500 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <Paperclip size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From:</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={`${eventData.fromDate}T${eventData.fromTime}`}
                    onChange={(e) => {
                      const [date, time] = e.target.value.split("T")
                      setEventData({ ...eventData, fromDate: date, fromTime: time })
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={`${eventData.toDate}T${eventData.toTime}`}
                    onChange={(e) => {
                      const [date, time] = e.target.value.split("T")
                      setEventData({ ...eventData, toDate: date, toTime: time })
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={eventData.allDay}
                  onChange={(e) => setEventData({ ...eventData, allDay: e.target.checked })}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${eventData.allDay ? "bg-blue-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${eventData.allDay ? "translate-x-5" : "translate-x-0.5"} mt-0.5`}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">All day</span>
              </label>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color: <span className="text-blue-500">Default</span>
              </label>
              <div className="grid grid-cols-9 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setEventData({ ...eventData, color: color.name })}
                    className={`w-6 h-6 rounded-full ${color.class} ${eventData.color === color.name ? "ring-2 ring-offset-2 ring-gray-400" : ""} cursor-pointer hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>

            {/* Attendees */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Attendees: All</label>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                  <span className="text-gray-400 text-lg">+</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">An</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">An</span>
                </div>
              </div>
            </div>

            {/* More Options Button - only show when not expanded */}
            {!showMoreOptions && (
              <button
                onClick={() => setShowMoreOptions(true)}
                className="w-full py-2 text-center text-gray-600 hover:text-gray-800 font-medium transition-colors bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                More options
              </button>
            )}

            {/* Expanded Options */}
            {showMoreOptions && (
              <div className="space-y-4">
                {/* Private Event */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Private event</span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventData.isPrivate}
                      onChange={(e) => setEventData({ ...eventData, isPrivate: e.target.checked })}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${eventData.isPrivate ? "bg-blue-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${eventData.isPrivate ? "translate-x-5" : "translate-x-0.5"} mt-0.5`}
                      ></div>
                    </div>
                  </label>
                </div>

                {/* Time Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer">
                    <option>Warsaw (UTC+02:00) - Local time</option>
                    <option>London (UTC+01:00)</option>
                    <option>New York (UTC-05:00)</option>
                  </select>
                </div>

                {/* Repeat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Repeat:</label>
                  <select
                    value={eventData.repeat}
                    onChange={(e) => setEventData({ ...eventData, repeat: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                  >
                    <option>Never</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                {/* Until */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Until:</label>
                  <select
                    value={eventData.until}
                    onChange={(e) => setEventData({ ...eventData, until: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                  >
                    <option>No end date</option>
                    <option>After 5 occurrences</option>
                    <option>On date</option>
                  </select>
                </div>

                {/* Reminder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reminder:</label>
                  <select
                    value={eventData.reminder}
                    onChange={(e) => setEventData({ ...eventData, reminder: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                  >
                    <option>30 minutes before</option>
                    <option>15 minutes before</option>
                    <option>1 hour before</option>
                    <option>1 day before</option>
                  </select>
                </div>

                {/* Second Reminder */}
                <div>
                  <select
                    value={eventData.reminder2}
                    onChange={(e) => setEventData({ ...eventData, reminder2: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                  >
                    <option>None</option>
                    <option>15 minutes before</option>
                    <option>30 minutes before</option>
                    <option>1 hour before</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Where?</label>
                  <input
                    type="text"
                    placeholder="Type an address or a place name"
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                  <textarea
                    placeholder="Add a description"
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                  />
                </div>
              </div>
            )}

            {/* Save Button - always at the end of content */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* External Scrollbar - only when more options are shown */}
      {isOpen && showMoreOptions && maxScroll > 0 && (
        <div className="fixed right-0 top-0 z-[60] w-1 h-full bg-gray-200">
          <div
            className="bg-gray-500 w-full transition-all duration-150 cursor-pointer hover:bg-gray-600"
            style={{
              height: `${Math.max(20, (window.innerHeight * (modalContentRef.current?.clientHeight || 0)) / (modalContentRef.current?.scrollHeight || 1))}px`,
              transform: `translateY(${(scrollPosition / maxScroll) * (window.innerHeight - Math.max(20, (window.innerHeight * (modalContentRef.current?.clientHeight || 0)) / (modalContentRef.current?.scrollHeight || 1)))}px)`,
            }}
          />
        </div>
      )}
    </>
  )
}

export default EventModal
