"use client"

import { useState } from "react"
import { ImageIcon } from "lucide-react"

const PhotoModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleShare = () => {
    // Handle sharing logic here
    console.log("Sharing photo:", selectedFile)
    onClose()
  }

  const handleCancel = () => {
    setSelectedFile(null)
    onClose()
  }

  const handleOverlayClick = (e) => {
    // Close modal when clicking on the overlay (background)
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: "#00000080" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto shadow-xl">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">An</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="px-6 pb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileSelect} />

            {selectedFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <ImageIcon size={32} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{selectedFile.name}</p>
                  <p className="text-gray-500 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <ImageIcon size={32} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-600 text-lg">Drag an image here or upload a file</p>
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                  >
                    Browse files
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors cursor-pointer"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
