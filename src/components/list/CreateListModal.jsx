"use client"

import { useState, useEffect } from "react"
import { X, Smile, Camera, ChevronDown } from "lucide-react"

const CreateListModal = ({ isOpen, onClose, onSave }) => {
  const [currentView, setCurrentView] = useState("selectType") // 'selectType' or 'createForm'
  const [listName, setListName] = useState("")
  const [selectedColor, setSelectedColor] = useState("blue")
  const [sharedWith, setSharedWith] = useState("Everyone in this circle")
  const [listType, setListType] = useState("Other") // Default to Other

  const [sharedWithDropdownOpen, setSharedWithDropdownOpen] = useState(false)
  const [listTypeDropdownOpen, setListTypeDropdownOpen] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView("selectType")
      setListName("")
      setSelectedColor("blue")
      setSharedWith("Everyone in this circle")
      setListType("Other") // Reset to default type
    }
  }, [isOpen])

  const listTypeOptionsData = [
    {
      name: "Shopping",
      icon: "🛒",
      description: "Organize shopping essentials—groceries, household items, and more!",
    },
    {
      name: "To Do",
      icon: "✅",
      description: "Manage tasks and goals, staying on top of daily activities",
    },
    {
      name: "Other",
      icon: "📝",
      description: "Customize and organize various information or any of your thoughts.",
    },
  ]

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

  const sharedWithOptions = ["Everyone in this circle", "Only me", "Specific members"]
  const allListTypes = ["Shopping", "To Do", "Other"] // All possible types for dropdown

  const handleSelectType = (type) => {
    setListType(type) // Set the selected type
    setCurrentView("createForm") // Transition to the form view
  }

  const handleSave = () => {
    onSave({ name: listName, color: selectedColor, sharedWith, type: listType })
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "#000000b3" }} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-6 border-b border-gray-100">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
              <X size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
              {currentView === "selectType" ? "What kind of list is it?" : "Create new list"}
            </h2>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>

          {/* Content based on currentView */}
          {currentView === "selectType" ? (
            <div className="px-6 pt-6 pb-6 space-y-4">
              {listTypeOptionsData.map((type) => (
                <button
                  key={type.name}
                  onClick={() => handleSelectType(type.name)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-6 pt-6 pb-6 space-y-6">
              {/* List Name */}
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                  <Smile size={20} className="text-gray-600" />
                </button>
                <input
                  type="text"
                  placeholder="List name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-md px-2.5 py-1.5 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                  <Camera size={20} className="text-gray-600" />
                </button>
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

              {/* Shared with */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Shared with</label>
                <div className="relative">
                  <button
                    onClick={() => setSharedWithDropdownOpen(!sharedWithDropdownOpen)}
                    className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-base text-gray-900">{sharedWith}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {sharedWithDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                      {sharedWithOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSharedWith(option)
                            setSharedWithDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 text-base text-gray-900 cursor-pointer"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* List type */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">List type</label>
                <div className="relative">
                  <button
                    onClick={() => setListTypeDropdownOpen(!listTypeDropdownOpen)}
                    className="w-full px-2.5 py-1.5 text-left bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-base text-gray-900">{listType}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {listTypeDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                      {allListTypes.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setListType(option)
                            setListTypeDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 text-base text-gray-900 cursor-pointer"
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
                onClick={handleSave}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-base cursor-pointer"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateListModal
