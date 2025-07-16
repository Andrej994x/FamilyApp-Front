"use client"
import { useState, useEffect, useRef } from "react"
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  List,
  User,
  MoreHorizontal,
  Edit,
  Copy,
  Share,
  Download,
  Trash2,
} from "lucide-react"

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  const [comment, setComment] = useState("")
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const [isCommentFocused, setIsCommentFocused] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const modalContentRef = useRef(null)

  // Calculate max scroll when content changes
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      const element = modalContentRef.current
      const maxScrollValue = element.scrollHeight - element.clientHeight
      setMaxScroll(maxScrollValue)
    } else {
      setMaxScroll(0)
    }
  }, [isOpen, isCommentFocused])

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setScrollPosition(0)
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0
      }
    }
  }, [isOpen])

  // Handle wheel scroll
  const handleWheel = (e) => {
    if (!modalContentRef.current) return
    e.preventDefault()
    const delta = e.deltaY
    const element = modalContentRef.current
    const newScrollTop = Math.max(0, Math.min(element.scrollHeight - element.clientHeight, element.scrollTop + delta))
    element.scrollTop = newScrollTop
    setScrollPosition(newScrollTop)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (showOptionsMenu) {
        setShowOptionsMenu(false)
      } else {
        onClose()
      }
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      console.log("Comment submitted:", comment)
      setComment("")
      setIsCommentFocused(false)
    }
  }

  const handleCommentCancel = () => {
    setComment("")
    setIsCommentFocused(false)
  }

  const handleOptionClick = (option) => {
    console.log("Option clicked:", option)
    setShowOptionsMenu(false)
    if (option === "delete") {
      // Handle delete logic
    }
  }

  if (!isOpen || !event) return null

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: showOptionsMenu ? "#000000B0" : "#00000080" }}
        onClick={handleOverlayClick}
        onWheel={handleWheel}
      >
        <div className="bg-white rounded-2xl w-full max-w-md mx-auto shadow-xl relative max-h-[100vh] flex flex-col">
          {/* Options Menu Dropdown */}
          {showOptionsMenu && (
            <>
              {/* Dark overlay over modal */}
              <div className="absolute inset-0 z-[2]" style={{ backgroundColor: "#00000080" }} />
              <div className="absolute top-16 right-6 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-64">
                <div className="py-2">
                  <button
                    onClick={() => handleOptionClick("edit")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Edit size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Edit</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick("copy")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Copy size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Copy</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick("copy-to-circle")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Copy size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Copy to another Circle</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick("delete")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Trash2 size={20} className="text-red-500 mr-3" />
                    <span className="text-sm font-medium text-red-500">Delete</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick("share")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Share size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Share</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick("save")}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Download size={20} className="text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Save</span>
                  </button>
                </div>
              </div>
            </>
          )}
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X size={20} className="text-gray-400" />
            </button>
            <h2 className="text-lg font-semibold">Event details</h2>
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <MoreHorizontal size={20} className="text-gray-400" />
            </button>
          </div>
          {/* Content */}
          <div
            ref={modalContentRef}
            className="px-6 pb-6 space-y-4 flex-1 min-h-0"
            style={{
              overflowY: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Event Title */}
            <div className="flex items-center space-x-3 mt-4">
              <div className={`w-10 h-10 ${event.color} rounded-lg flex items-center justify-center`}>
                <Calendar size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
            </div>
            {/* Date and Time */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Clock size={20} className={event.color.replace("bg-", "text-")} />
              </div>
              <div>
                <p className="text-gray-900 font-medium">{event.fullDate}</p>
              </div>
            </div>
            {/* Reminder */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <div className={`w-5 h-5 ${event.color} rounded-full flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <p className="text-gray-700">{event.reminder}</p>
              </div>
            </div>
            {/* Location */}
            {event.location && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <MapPin size={20} className={event.color.replace("bg-", "text-")} />
                </div>
                <div>
                  <p className="text-gray-900">{event.location}</p>
                </div>
              </div>
            )}
            {/* Attendees */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Users size={20} className={event.color.replace("bg-", "text-")} />
              </div>
              <div className="flex items-center space-x-2">
                {event.attendees?.map((attendee, index) => (
                  <div key={index} className={`w-8 h-8 ${event.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{attendee.substring(0, 2).toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Related List */}
            {event.relatedList && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <List size={20} className={event.color.replace("bg-", "text-")} />
                </div>
                <div>
                  <p className="text-gray-900">{event.relatedList}</p>
                </div>
              </div>
            )}
            {/* Created By - with full width border */}
            <div className="flex items-center space-x-3 -mx-6 px-6 pb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <User size={20} className={event.color.replace("bg-", "text-")} />
              </div>
              <div>
                <p className="text-gray-700">Created by {event.createdBy}</p>
              </div>
            </div>
            {/* Full width border */}
            <div className="-mx-6 border-t border-gray-200"></div>
            {/* Comment Section */}
            <div className="pt-4">
              <div className="flex items-start space-x-3 mb-3">
                <div className={`w-10 h-10 ${event.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">An</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Write a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={() => setIsCommentFocused(true)}
                    rows={isCommentFocused ? 3 : 1}
                    className={`w-full bg-gray-50 rounded-lg px-4 py-2 focus:outline-none text-gray-700 text-sm resize-none transition-all ${
                      isCommentFocused
                        ? "border-2 border-blue-500 focus:ring-0"
                        : "border border-gray-200 focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>
              </div>
              {/* Action buttons - only show when focused - aligned with input field */}
              {isCommentFocused && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex-shrink-0"></div> {/* Spacer to align with input */}
                  <div className="flex-1 flex flex-col space-y-2 mt-4">
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!comment.trim()}
                      className="w-full py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                    <button
                      onClick={handleCommentCancel}
                      className="w-full py-2 bg-gray-100 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* External Scrollbar - when needed */}
      {isOpen && maxScroll > 0 && (
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

export default EventDetailsModal
