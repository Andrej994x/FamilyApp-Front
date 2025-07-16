import { ImageIcon, Calendar, List, MapPin } from "lucide-react"

const PostInput = ({ onPhotoClick, onEventClick, onToDoClick, onLocationClick }) => (
  <div className="bg-white rounded-lg p-4 lg:p-6 mb-6 border border-gray-300">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3 lg:mr-4">
        <span className="text-white font-bold text-sm lg:text-base">An</span>
      </div>
      <input
        type="text"
        placeholder="What's on your mind?"
        className="flex-1 bg-gray-50 rounded-full px-4 py-2 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 border border-gray-200 text-sm lg:text-base"
      />
    </div>
    <div className="flex flex-wrap gap-2 lg:gap-3">
      <button onClick={onPhotoClick} className="btn-post"><ImageIcon size={14} className="icon text-blue-500" /> Add Photo</button>
      <button onClick={onEventClick} className="btn-post"><Calendar size={14} className="icon text-red-500" /> Add Event</button>
      <button onClick={onToDoClick} className="btn-post"><List size={14} className="icon text-green-500" /> Add To-Do</button>
      <button onClick={onLocationClick} className="btn-post"><MapPin size={14} className="icon text-yellow-500" /> Add Local...</button>
      <button className="btn-post">😊 Add GIF</button>
    </div>
  </div>
)

export default PostInput
