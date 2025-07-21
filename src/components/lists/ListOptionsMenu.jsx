"use client"
import { useState } from "react"
import {
  Edit,
  List,
  FolderOpen,
  EyeOff,
  CheckSquare,
  Trash2,
  Copy,
  Printer,
  ChevronRight,
  SortAsc,
  Check,
  Type,
  Calendar,
  Clock,
  Utensils,
} from "lucide-react"

const ListOptionsMenu = ({
  isOpen,
  onClose,
  onEditList,
  onSortOptionSelect,
  selectedSortOption,
  selectedList,
  onDeleteList,
}) => {
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false)

  if (!isOpen) return null

  const handleSortByClick = (option, e) => {
    e.stopPropagation()
    onSortOptionSelect(option)
    setIsSortByDropdownOpen(false)
    onClose()
  }

  const handleDeleteList = () => {
    if (selectedList && !selectedList.isDefault) {
      onDeleteList(selectedList)
      onClose()
    }
  }

  return (
    <>
      {/* Overlay to capture clicks outside the menu and prevent interaction with background */}
      <div className="fixed inset-0 z-69" style={{ backgroundColor: "#00000080" }} onClick={onClose} />

      {/* Main menu container with max-height and thin scrollbar */}
      <div className="absolute right-4 top-full mt-1 z-70 bg-white shadow-lg rounded-lg w-56 max-h-[80vh] overflow-y-auto thin-scrollbar">
        <div className="py-1">
          <button
            onClick={() => {
              onEditList()
              onClose()
            }}
            className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50"
          >
            <Edit size={16} className="text-gray-900" />
            <span className="text-gray-900">Edit list</span>
          </button>

          {/* Sort by button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsSortByDropdownOpen(!isSortByDropdownOpen)
            }}
            className="w-full text-left px-4 py-2 text-base font-medium flex items-center justify-between cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              <SortAsc size={16} className="text-gray-900" />
              <span className="text-gray-900">Sort by</span>
            </div>
            <ChevronRight
              size={16}
              className={`text-gray-900 transition-transform ${isSortByDropdownOpen ? "rotate-90" : ""}`}
            />
          </button>

          {/* Sort By Options - Conditionally rendered inline with smooth transition */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSortByDropdownOpen ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="pl-8 pr-4 py-1 space-y-1">
              <button
                onClick={(e) => handleSortByClick("Alphabetically", e)}
                className="w-full text-left px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-50 text-gray-900 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Type size={16} className="text-gray-900" />
                  <span>Alphabetically</span>
                </div>
                {selectedSortOption === "Alphabetically" && <Check size={16} className="text-blue-600" />}
              </button>
              <button
                onClick={(e) => handleSortByClick("By Due Date", e)}
                className="w-full text-left px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-50 text-gray-900 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-900" />
                  <span>By Due Date</span>
                </div>
                {selectedSortOption === "By Due Date" && <Check size={16} className="text-blue-600" />}
              </button>
              <button
                onClick={(e) => handleSortByClick("By Creation", e)}
                className="w-full text-left px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-50 text-gray-900 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-900" />
                  <span>By Creation</span>
                </div>
                {selectedSortOption === "By Creation" && <Check size={16} className="text-blue-600" />}
              </button>
              <button
                onClick={(e) => handleSortByClick("By Recipe", e)}
                className="w-full text-left px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-50 text-gray-900 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Utensils size={16} className="text-gray-900" />
                  <span>By Recipe</span>
                </div>
                {selectedSortOption === "By Recipe" && <Check size={16} className="text-blue-600" />}
              </button>
              <button
                onClick={(e) => handleSortByClick("By Default", e)}
                className="w-full text-left px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-50 text-gray-900 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <List size={16} className="text-gray-900" />
                  <span>By Default</span>
                </div>
                {selectedSortOption === "By Default" && <Check size={16} className="text-blue-600" />}
              </button>
            </div>
          </div>

          {/* Remaining Main Menu Options */}
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <FolderOpen size={16} className="text-gray-900" />
            <span className="text-gray-900">Manage categories</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <List size={16} className="text-gray-900" />
            <span className="text-gray-900">Show categories</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <EyeOff size={16} className="text-gray-900" />
            <span className="text-gray-900">Hide completed items</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <CheckSquare size={16} className="text-gray-900" />
            <span className="text-gray-900">Untick all items</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <Trash2 size={16} className="text-gray-900" />
            <span className="text-gray-900">Delete ticked item</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <Copy size={16} className="text-gray-900" />
            <span className="text-gray-900">Duplicate list</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
            <Printer size={16} className="text-gray-900" />
            <span className="text-gray-900">Print</span>
          </button>

          {/* Delete List Button - Only show if not a default list */}
          <button
            onClick={handleDeleteList}
            disabled={selectedList?.isDefault}
            className={`w-full text-left px-4 py-2 text-base font-medium flex items-center space-x-2 cursor-pointer ${
              selectedList?.isDefault ? "text-gray-400 cursor-not-allowed" : "hover:bg-red-50"
            }`}
            style={{
              color: selectedList?.isDefault ? "#9ca3af" : "#fd7777",
            }}
          >
            <Trash2
              size={16}
              style={{
                color: selectedList?.isDefault ? "#9ca3af" : "#fd7777",
              }}
            />
            <span>Delete list</span>
          </button>
        </div>
      </div>

      {/* Custom CSS for thin scrollbar */}
      <style jsx>{`
        .thin-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .thin-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
      `}</style>
    </>
  )
}

export default ListOptionsMenu
