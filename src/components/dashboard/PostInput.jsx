"use client"
import { ImageIcon, Calendar, List, MapPin } from "lucide-react"

const PostInput = ({ onPhotoClick, onEventClick, onToDoClick, onLocationClick }) => (
  <div className="bg-white rounded-lg p-4 mb-6 border border-gray-300">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
        <span className="text-white font-bold text-sm">An</span>
      </div>
      <input
        type="text"
        placeholder="What's on your mind?"
        className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 border border-gray-200 text-sm"
      />
     
    </div>
    <div className="flex flex-wrap gap-2 lg:gap-3">
      <button
        onClick={onPhotoClick}
        className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
      >
        <ImageIcon size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-blue-500" />
        <span className="text-xs lg:text-sm font-medium">Add Photo</span>
      </button>
      <button
        onClick={onEventClick}
        className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
      >
        <Calendar size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-red-500" />
        <span className="text-xs lg:text-sm font-medium">Add Event</span>
      </button>
      <button
        onClick={onToDoClick}
        className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
      >
        <List size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-green-500" />
        <span className="text-xs lg:text-sm font-medium">Add To-Do</span>
      </button>
      <button
        onClick={onLocationClick}
        className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
      >
        <MapPin size={14} className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-yellow-500" />
        <span className="text-xs lg:text-sm font-medium">Add Local...</span>
      </button>
      <button className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50">
        <span className="text-sm lg:text-lg mr-1 lg:mr-2">😊</span>
        <span className="text-xs lg:text-sm font-medium">Add GIF</span>
      </button>
    </div>
  </div>
)

export default PostInput
