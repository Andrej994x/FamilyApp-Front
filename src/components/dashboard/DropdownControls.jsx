import { ChevronDown } from "lucide-react"
import { useState } from "react"

const DropdownControls = ({ selectedView, selectedSort, setSelectedView, setSelectedSort, viewOptions, sortOptions }) => {
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  return (
    <div className="flex justify-between items-center mb-6 relative">
      {/* View Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setIsViewDropdownOpen(!isViewDropdownOpen)
            setIsSortDropdownOpen(false)
          }}
          className="dropdown-btn"
        >
          {selectedView} <ChevronDown size={16} className={`transition-transform ${isViewDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        {isViewDropdownOpen && (
          <div className="dropdown-menu">
            {viewOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedView(option)
                  setIsViewDropdownOpen(false)
                }}
                className={`dropdown-item ${selectedView === option ? "bg-blue-50 text-blue-600" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setIsSortDropdownOpen(!isSortDropdownOpen)
            setIsViewDropdownOpen(false)
          }}
          className="dropdown-btn"
        >
          {selectedSort} <ChevronDown size={16} className={`transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        {isSortDropdownOpen && (
          <div className="dropdown-menu right-0">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedSort(option)
                  setIsSortDropdownOpen(false)
                }}
                className={`dropdown-item ${selectedSort === option ? "bg-blue-50 text-blue-600" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownControls
