"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const EditListModal = ({ isOpen, onClose, list, onSave }) => {
  const [editedListName, setEditedListName] = useState(list?.name || "")
  const [selectedColor, setSelectedColor] = useState(list?.color || "blue") // Assuming lists can have colors

  useEffect(() => {
    if (list) {
      setEditedListName(list.name)
      setSelectedColor(list.color || "blue")
    }
  }, [list])

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
    onSave({ ...list, name: editedListName, color: selectedColor })
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "#000000b3" }} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
              <X size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
              Edit list
            </h2>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* List Name */}
            <div>
              <input
                type="text"
                value={editedListName}
                onChange={(e) => setEditedListName(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-base font-medium text-gray-900 mb-3">Color</label>
              <div className="grid grid-cols-9 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-6 h-6 rounded-full ${color.class} ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-gray-400" : ""} cursor-pointer hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-base cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditListModal
