"use client"
import { X } from "lucide-react"

const DeleteListConfirmationModal = ({ isOpen, onClose, onConfirm, listName }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#000000b3" }}
      onClick={onClose}
    >
      <div className="bg-white rounded-2xl p-8 w-96 max-w-md mx-4 relative" onClick={(e) => e.stopPropagation()}>
        {/* Header with X and title on same line - moved higher */}
        <div className="flex items-center mb-4 -mt-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 mr-4 cursor-pointer">
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-900 flex-1 text-center mr-6">Are you sure?</h2>
        </div>

        {/* Full width line below header - from edge to edge */}
        <div className="absolute left-0 right-0 h-px bg-gray-200 mb-6" style={{ top: "60px" }}></div>

        <div className="text-center mb-8 mt-4">
          {/* Warning icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 bg-yellow-400 flex items-center justify-center"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            >
              <span className="text-black text-xl font-bold mt-2">!</span>
            </div>
          </div>

          {/* Warning text */}
          <div className="text-gray-700 text-center">
            <p className="mb-1 font-bold">Do you really want to delete this list?</p>
            <p className="text-sm font-bold">all items will be definitly deleted.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-2.5 text-white rounded-full font-bold transition-colors cursor-pointer"
            style={{ backgroundColor: "#fd7777" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#fc6666")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#fd7777")}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteListConfirmationModal
