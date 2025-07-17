"use client"

import { useState } from "react"
import { X, MoreVertical } from "lucide-react"

const MembersModal = ({ isOpen, onClose }) => {
  const [members, setMembers] = useState([
    { id: 1, name: "Andrej", avatar: "An", color: "bg-green-500", selected: true },
    { id: 2, name: "Tea", avatar: "Te", color: "bg-green-500", selected: true },
  ])

  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleDragStart = (e, index) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null)
      setDragOverIndex(null)
      return
    }

    const newMembers = [...members]
    const draggedMember = newMembers[draggedItem]

    // Remove dragged item
    newMembers.splice(draggedItem, 1)

    // Insert at new position
    const insertIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex
    newMembers.splice(insertIndex, 0, draggedMember)

    setMembers(newMembers)
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const toggleMemberSelection = (memberId) => {
    setMembers(members.map((member) => (member.id === memberId ? { ...member, selected: !member.selected } : member)))
  }

  const handleSave = () => {
    console.log("Saving members filter:", members)
    onClose()
  }

  const handleClearFilter = () => {
    setMembers(members.map((member) => ({ ...member, selected: true })))
    onClose() // Add this line to close the modal
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: "#00000080" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center p-6 pb-4 border-b border-gray-100 relative">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button
            onClick={onClose}
            className="absolute right-6 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Members Section */}
          <div className="mt-4">
            <h3 className="text-base font-medium text-gray-900 mb-2">Members</h3>
            <p className="text-xs text-gray-600 mb-4">
              Select the members to view the events where they are listed as participants. You can also drag and drop
              them to set the order in which they appear in the Day (By Member) view.
            </p>

            {/* Members List */}
            <div className="space-y-2">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-move ${
                    dragOverIndex === index ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  } ${draggedItem === index ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Checkbox */}
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={member.selected}
                        onChange={() => toggleMemberSelection(member.id)}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </label>

                    {/* Avatar */}
                    <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{member.avatar}</span>
                    </div>

                    {/* Name */}
                    <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  </div>

                  {/* Drag Handle */}
                  <div className="cursor-move p-1 hover:bg-gray-200 rounded">
                    <MoreVertical size={16} className="text-gray-400 rotate-90" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={handleClearFilter}
              className="w-full bg-gray-100 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembersModal
