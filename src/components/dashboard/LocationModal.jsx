"use client"

import { useState, useRef } from "react"
import { MapPin, ImageIcon } from "lucide-react"

const LocationModal = ({ isOpen, onClose }) => {
  const [locationData, setLocationData] = useState({
    text: "",
    location: "",
    attachedFiles: [],
  })
  const fileInputRef = useRef(null)

  const handleShare = () => {
    console.log("Sharing location:", locationData)
    onClose()
  }

  const handleCancel = () => {
    setLocationData({
      text: "",
      location: "",
      attachedFiles: [],
    })
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setLocationData((prev) => ({
        ...prev,
        attachedFiles: [...prev.attachedFiles, ...files],
      }))
      console.log("Selected files:", files)
    }
  }

  const removeAttachedFile = (index) => {
    setLocationData((prev) => ({
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
      >
        <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto shadow-xl">
          {/* Content */}
          <div className="p-6">
            {/* Avatar and Text Input - Horizontal Layout */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">An</span>
              </div>
              <div className="flex-1 relative">
                <textarea
                  placeholder="What's on your mind?"
                  value={locationData.text}
                  onChange={(e) => setLocationData({ ...locationData, text: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-600 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
                
              </div>
            </div>

            {/* Location Input - Aligned with text input above */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Where are you?"
                  value={locationData.location}
                  onChange={(e) => setLocationData({ ...locationData, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>
            </div>

            {/* Attach Icons Section - Image icon under MapPin, Plus icon under input */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <button
                  
                  className="w-12 h-12  rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ImageIcon size={20} className="text-blue-500" />
                </button>
              </div>
              <div className="flex-1">
                <button
                  onClick={handleAttachClick}
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <span className="text-gray-400 text-2xl font-light">+</span>
                </button>
              </div>
            </div>

            {/* Display attached files - Aligned with inputs */}
            {locationData.attachedFiles.length > 0 && (
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0"></div> {/* Spacer */}
                <div className="flex-1 space-y-2">
                  {locationData.attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 border">
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
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

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
    </>
  )
}

export default LocationModal
