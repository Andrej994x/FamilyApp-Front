"use client"
import { X, MoreHorizontal, Folder, User, CheckSquare, FileText, ShoppingCart, Heart } from "lucide-react"
import { useState, useEffect } from "react"

const TaskDetailsModal = ({ isOpen, onClose, item, onToggleComplete, selectedList, onUpdateItemComments }) => {
  const [commentText, setCommentText] = useState("")
  const [showCommentActions, setShowCommentActions] = useState(false) // New state for showing buttons
  const [isShaking, setIsShaking] = useState(false)

  // Initialize comments from item prop, or an empty array if not present
  // This state will be used for rendering, but updates will be passed to parent
  const [currentComments, setCurrentComments] = useState(item?.comments || [])

  useEffect(() => {
    setCurrentComments(item?.comments || [])
  }, [item])

  if (!isOpen || !item) return null

  const handleCommentFocus = () => setShowCommentActions(true)
  const handleCommentBlur = () => {
    // Hide actions only if commentText is empty
    if (commentText.trim() === "") {
      setShowCommentActions(false)
    }
  }

  const handlePostComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        author: "Andrej", // Hardcoded for now, can be dynamic
        initials: "An", // Hardcoded for now
        text: commentText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // e.g., "16:13"
        date: new Date().toLocaleDateString("en-US", { weekday: "long" }), // e.g., "Monday"
      }
      const updatedComments = [...currentComments, newComment]
      setCurrentComments(updatedComments) // Update local state for immediate display
      onUpdateItemComments(item.id, updatedComments) // Pass updated comments to parent
      setCommentText("")
      setShowCommentActions(false)
    }
  }

  const handleCancelComment = () => {
    setCommentText("")
    setShowCommentActions(false)
  }

  const handleCheckboxClick = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
    onToggleComplete(item.id)
  }

  const getListIcon = (iconType) => {
    switch (iconType) {
      case "document":
        return <FileText size={24} className="text-blue-600" />
      case "checklist":
        return <CheckSquare size={24} className="text-blue-600" />
      case "shopping":
        return <ShoppingCart size={24} className="text-blue-600" />
      default:
        return <FileText size={24} className="text-blue-600" />
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#000000b3" }}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl w-[500px] max-w-2xl mx-4 relative transition-transform duration-500 p-0 ${isShaking ? "animate-bounce" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{ animation: isShaking ? "shake 0.5s ease-in-out" : "none" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <button onClick={onClose} className="text-gray-900 hover:text-gray-600 cursor-pointer">
            <X size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-900">Task details</h2>
          <button className="text-gray-900 hover:text-gray-600 cursor-pointer">
            <MoreHorizontal size={24} />
          </button>
        </div>
        {/* Full-width border */}
        <div className="w-full h-[1px] bg-gray-200"></div>
        {/* Content */}
        <div className="p-6 pt-6 pb-4">
          {/* Task title */}
          <div className="flex items-center mb-8">
            <div
              className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center mr-4 cursor-pointer hover:border-gray-400"
              onClick={handleCheckboxClick}
            >
              {item.completed && <div className="w-3.5 h-3.5 rounded-full bg-gray-900" />}
            </div>
            <span
              className={`font-medium text-base ${item.completed ? "line-through text-gray-500" : "text-gray-900"}`}
            >
              {item.text}
            </span>
          </div>
          {/* List info */}
          <div className="flex items-center mb-8">
            {getListIcon(selectedList?.icon)}
            <span className="text-gray-900 font-medium text-base ml-3">{selectedList?.name}</span>
            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center ml-2">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
          {/* Attachment icon */}
          <div className="flex items-center mb-8">
            <Folder size={24} className="text-blue-600 mr-4" />
          </div>
          {/* Completed info */}
          <div className="flex items-center mb-10">
            <User size={24} className="text-blue-600 mr-4" />
            <span className="text-gray-900 font-medium text-base">Completed by Andrej</span>
            <span className="text-gray-500 text-sm ml-1">- 12:55</span>
          </div>
          {/* Existing Comments Section */}
          {currentComments.length > 0 && (
            <div className="mb-6 space-y-4">
              {currentComments.map((comment) => (
                <div key={comment.id} className="flex items-start">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-sm font-medium">{comment.initials}</span>
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-lg relative">
                    <p className="text-gray-900 font-medium text-sm mb-1">{comment.author}</p>
                    <p className="text-gray-700 text-base">{comment.text}</p>
                    <span className="text-gray-500 text-xs mt-1 block">
                      {comment.date} {comment.timestamp}
                    </span>
                    <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                      <Heart size={16} />
                      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 ml-2">
                        <MoreHorizontal size={16} />
                      </button>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment input section */}
          <div className="flex items-start">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-white text-sm font-medium">An</span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Write a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onFocus={handleCommentFocus}
                onBlur={handleCommentBlur}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none text-gray-700 font-normal text-base resize-none"
                rows={showCommentActions || commentText.length > 0 ? 3 : 1} // Expand rows when focused or has text
              />
              {(showCommentActions || commentText.length > 0) && (
                <div className="flex flex-col space-y-3 mt-4">
                  <button
                    onClick={handlePostComment}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium text-base cursor-pointer"
                  >
                    Post
                  </button>
                  <button
                    onClick={handleCancelComment}
                    className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium text-base cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Shake animation */}
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
        `}</style>
      </div>
    </div>
  )
}
export default TaskDetailsModal
