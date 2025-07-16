"use client"

import { useState, useEffect, useRef } from "react"
import { X, ImageIcon } from "lucide-react"

const ToDoModal = ({ isOpen, onClose }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const modalContentRef = useRef(null)
  const fileInputRef = useRef(null)
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    category: "Uncategorized",
    dueDate: "",
    dueTime: "",
    repeat: "Never",
    reminder: "None",
    assignees: ["An"],
    relatedList: "test 2",
    attachedFiles: [],
  })

  // Calculate max scroll when content changes
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      const element = modalContentRef.current
      const maxScrollValue = element.scrollHeight - element.clientHeight
      setMaxScroll(maxScrollValue)
    } else {
      setMaxScroll(0)
    }
  }, [isOpen])

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

  const categories = [
    { name: "Uncategorized", icon: "📋" },
    { name: "Work", icon: "💼" },
    { name: "Personal", icon: "👤" },
    { name: "Shopping", icon: "🛒" },
    { name: "Health", icon: "🏥" },
  ]

  const handleSave = () => {
    console.log("Saving todo:", todoData)
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleAttachClick = () => {
    // Trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setTodoData((prev) => ({
        ...prev,
        attachedFiles: [...prev.attachedFiles, ...files],
      }))
      console.log("Selected files:", files)
    }
  }

  const removeAttachedFile = (index) => {
    setTodoData((prev) => ({
      ...prev,
      attachedFiles: prev.attachedFiles.filter((_, i) => i !== index),
    }))
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: "#00000080" }}
        onClick={handleOverlayClick}
        onWheel={handleWheel}
      >
        <div className="bg-white rounded-2xl w-full max-w-lg mx-auto shadow-xl relative max-h-[100vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X size={20} className="text-gray-400" />
            </button>
            <h2 className="text-xl font-semibold">Add To-Do</h2>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

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
            {/* Title */}
            <div className="mt-4 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Add to do"
                value={todoData.title}
                onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
                className="flex-1 border border-blue-500 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAttachClick}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                title="Attach files"
              >
                <ImageIcon size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Attached Files Display */}
            {todoData.attachedFiles.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Files:</h4>
                <div className="space-y-2">
                  {todoData.attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded px-3 py-2 border">
                      <div className="flex items-center">
                        <ImageIcon size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        onClick={() => removeAttachedFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add a note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add a note</label>
              <textarea
                placeholder="Add a description"
                value={todoData.description}
                onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select
                  value={todoData.category}
                  onChange={(e) => setTodoData({ ...todoData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due date</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={todoData.dueDate && todoData.dueTime ? `${todoData.dueDate}T${todoData.dueTime}` : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      const [date, time] = e.target.value.split("T")
                      setTodoData({ ...todoData, dueDate: date, dueTime: time })
                    } else {
                      setTodoData({ ...todoData, dueDate: "", dueTime: "" })
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Repeat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repeat:</label>
              <select
                value={todoData.repeat}
                onChange={(e) => setTodoData({ ...todoData, repeat: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Never</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            {/* Reminder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reminder:</label>
              <select
                value={todoData.reminder}
                onChange={(e) => setTodoData({ ...todoData, reminder: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>None</option>
                <option>15 minutes before</option>
                <option>30 minutes before</option>
                <option>1 hour before</option>
                <option>1 day before</option>
              </select>
            </div>

            {/* No assignee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">No assignee</label>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
                  <span className="text-blue-500 font-bold text-lg">👑</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">An</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">An</span>
                </div>
              </div>
            </div>

            {/* Related list */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Related list</label>
              <select
                value={todoData.relatedList}
                onChange={(e) => setTodoData({ ...todoData, relatedList: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>test 2</option>
                <option>Personal Tasks</option>
                <option>Work Projects</option>
                <option>Shopping List</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Save
              </button>
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

export default ToDoModal
