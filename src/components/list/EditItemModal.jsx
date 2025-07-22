"use client"

import { useState, useEffect, useRef } from "react"
import { X, Instagram, Trash2, ChevronDown, Plus } from "lucide-react"

const EditItemModal = ({ isOpen, onClose, item, onSave, onDeleteTrigger, allLists }) => {
  const scrollableContentRef = useRef(null) // Ref for the scrollable content area
  const [editedItem, setEditedItem] = useState(item)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [reminderDropdownOpen, setReminderDropdownOpen] = useState(false)
  const [relatedListDropdownOpen, setRelatedListDropdownOpen] = useState(false)

  const convertToDatetimeLocal = (dateString) => {
    if (!dateString) return ""
    const [datePart, timePart] = dateString.split(" ")
    const [month, day, year] = datePart.split("/")
    return `${year}-${month}-${day}T${timePart}`
  }

  const convertFromDatetimeLocal = (datetimeLocalString) => {
    if (!datetimeLocalString) return ""
    const [datePart, timePart] = datetimeLocalString.split("T")
    const [year, month, day] = datePart.split("-")
    return `${month}/${day}/${year} ${timePart}`
  }

  const categories = ["Uncategorized", "Work", "Personal", "Shopping", "Health"]
  const reminders = ["None", "5 minutes before", "10 minutes before", "30 minutes before", "1 hour before"]

  useEffect(() => {
    setEditedItem(item)
  }, [item])

  // Attach/detach global wheel listener
  useEffect(() => {
    const handleGlobalWheel = (e) => {
      if (!scrollableContentRef.current) return
      e.preventDefault() // Prevent page scroll
      const delta = e.deltaY
      const element = scrollableContentRef.current
      // Adjust scrollTop, ensuring it stays within bounds
      element.scrollTop = Math.max(0, Math.min(element.scrollHeight - element.clientHeight, element.scrollTop + delta))
    }

    if (isOpen) {
      document.body.addEventListener("wheel", handleGlobalWheel, { passive: false })
    } else {
      document.body.removeEventListener("wheel", handleGlobalWheel)
    }

    // Cleanup function
    return () => {
      document.body.removeEventListener("wheel", handleGlobalWheel)
    }
  }, [isOpen]) // Re-run effect when modal opens/closes

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleDropdownSelect = (field, value) => {
    setEditedItem((prev) => ({ ...prev, [field]: value }))
    if (field === "category") setCategoryDropdownOpen(false)
    if (field === "reminder") setReminderDropdownOpen(false)
    if (field === "relatedList") setRelatedListDropdownOpen(false)
  }

  const handleSave = () => {
    onSave(editedItem)
    onClose()
  }

  const handleDelete = () => {
    onDeleteTrigger(editedItem.id)
    // onClose(); // Remove this line
  }

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "#000000b3" }} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Main modal container - now a flex column with fixed header */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[100vh] flex flex-col">
          {/* Fixed Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
              <X size={24} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
              Edit an item
            </h2>
            <div className="w-6"></div> {/* Placeholder for alignment */}
          </div>

          {/* Scrollable Content - now includes the buttons */}
          <div ref={scrollableContentRef} className="px-6 pt-4 pb-6 space-y-4 flex-1 overflow-y-auto hide-scrollbar">
            {/* Item Title - REVISED STRUCTURE for icon position */}
            <div className="flex items-center">
              <input
                type="text"
                name="text"
                value={editedItem?.text || ""}
                onChange={handleChange}
                className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => alert("Attach functionality for this item!")} // Placeholder for attach action
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer ml-1"
              >
                <Instagram size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Add a note */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Add a note</label>
              <textarea
                name="note"
                value={editedItem?.note || ""}
                onChange={handleChange}
                placeholder="Add a note"
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[60px] text-base"
              />
            </div>

            {/* Add a description */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Add a description</label>
              <textarea
                name="description"
                value={editedItem?.description || ""}
                onChange={handleChange}
                placeholder="Add a description"
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[60px] text-base"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Category</label>
              <div className="relative">
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-base text-gray-900">{editedItem?.category || "Uncategorized"}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                    {categories.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleDropdownSelect("category", option)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-base text-gray-900 cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Due date */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Due date</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={convertToDatetimeLocal(editedItem?.dueDate)}
                  onChange={(e) => {
                    const newDueDate = convertFromDatetimeLocal(e.target.value)
                    setEditedItem((prev) => ({ ...prev, dueDate: newDueDate }))
                  }}
                  className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Repeat */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Repeat:</label>
              <input
                type="text"
                name="repeat"
                value={editedItem?.repeat || ""}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            {/* Reminder */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Reminder:</label>
              <div className="relative">
                <button
                  onClick={() => setReminderDropdownOpen(!reminderDropdownOpen)}
                  className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-base text-gray-900">{editedItem?.reminder || "None"}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {reminderDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                    {reminders.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleDropdownSelect("reminder", option)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-base text-gray-900 cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* No assignee */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">No assignee</label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm">
                  <Plus size={16} />
                </div>
                {editedItem?.assignees?.map((assignee, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-base"
                  >
                    {assignee}
                  </div>
                ))}
              </div>
            </div>

            {/* Related list */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Related list</label>
              <div className="relative">
                <button
                  onClick={() => setRelatedListDropdownOpen(!relatedListDropdownOpen)}
                  className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-base text-gray-900">{editedItem?.relatedList || "To Do"}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {relatedListDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                    {allLists.map((list) => (
                      <button
                        key={list.name}
                        onClick={() => handleDropdownSelect("relatedList", list.name)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-base text-gray-900 cursor-pointer"
                      >
                        {list.name} {list.icon}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer - now part of the scrollable content, no border-t */}
            <div className="pt-4 flex flex-col space-y-2">
              <button
                onClick={handleSave}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-base cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                className="w-full bg-[#fd7777] text-white py-2 px-4 rounded-md hover:bg-[#e06a6a] focus:outline-none focus:ring-[#fd7777] focus:ring-offset-2 font-medium text-base cursor-pointer flex items-center justify-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete this item</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    `}</style>
    </>
  )
}

export default EditItemModal
