"use client";
import { ImageIcon, Calendar, List, MapPin } from "lucide-react";
import { useState } from "react";
const PostInput = ({
  onPhotoClick,
  onEventClick,
  onToDoClick,
  onLocationClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postText, setPostText] = useState("");
  const handleInputClick = () => {
    setIsExpanded(true);
  };
  const handleCancel = () => {
    setPostText("");
    setIsExpanded(false);
  };
  const handleShare = () => {
    console.log("Sharing post:", postText);
    setPostText("");
    setIsExpanded(false);
  };
  return (
    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-300">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <span className="text-white font-bold text-sm">An</span>
        </div>
        <div className="flex-1">
          {isExpanded ? (
            <textarea
              placeholder="What's on your mind?"
              className="w-full h-[50px] bg-gray-50 rounded-md px-4 py-2 border border-gray-200 text-gray-500 text-sm resize-none focus:outline-none focus:border-gray-200 focus:ring-0"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              autoFocus
            />
          ) : (
            <input
              type="text"
              placeholder="What's on your mind?"
              className="w-full h-[50px] bg-gray-50 rounded-md px-4 border border-gray-200 text-gray-500 text-sm focus:outline-none focus:border-gray-200 focus:ring-0 flex items-center"
              readOnly
              onClick={handleInputClick}
            />
          )}
        </div>
      </div>
      {/* Action buttons (always visible) */}
      <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 ml-[52px]">
        <button
          onClick={onPhotoClick}
          className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
        >
          <ImageIcon
            size={14}
            className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-blue-500"
          />
          <span className="text-xs lg:text-sm font-medium">Add Photo</span>
        </button>
        <button
          onClick={onEventClick}
          className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
        >
          <Calendar
            size={14}
            className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-red-500"
          />
          <span className="text-xs lg:text-sm font-medium">Add Event</span>
        </button>
        <button
          onClick={onToDoClick}
          className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
        >
          <List
            size={14}
            className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-green-500"
          />
          <span className="text-xs lg:text-sm font-medium">Add To-Do</span>
        </button>
        <button
          onClick={onLocationClick}
          className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50"
        >
          <MapPin
            size={14}
            className="mr-1 lg:mr-2 lg:w-4 lg:h-4 text-yellow-500"
          />
          <span className="text-xs lg:text-sm font-medium">Add Local...</span>
        </button>
        <button className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-50">
          <span className="text-sm lg:text-lg mr-1 lg:mr-2">😊</span>
          <span className="text-xs lg:text-sm font-medium">Add GIF</span>
        </button>
      </div>
      {/* Share/Cancel buttons (conditionally rendered) */}
      {isExpanded && (
        <div className="flex justify-end space-x-2 mt-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 cursor-pointer"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
};
export default PostInput;
