import { Heart, MoreHorizontal, MapPin } from "lucide-react"

const ActivityCard = ({ activity }) => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 border border-gray-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xs lg:text-sm">{activity.avatar}</span>
          </div>
          <div>
            <p className="text-sm lg:text-base">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <Heart size={12} className="text-gray-400 lg:w-3.5 lg:h-3.5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={14} className="lg:w-4 lg:h-4" />
          </button>
        </div>
      </div>

      {activity.hasEvent && (
        <div className={`${activity.eventColor} rounded-lg p-4 lg:p-5 flex items-start space-x-3 lg:space-x-4 mt-3`}>
          <div className="text-center min-w-[40px] lg:min-w-[50px]">
            <div className={`text-xs ${activity.eventTextColor} opacity-75 font-medium`}>
              {activity.eventMonth}
            </div>
            <div className={`text-xl lg:text-2xl font-bold ${activity.eventTextColor}`}>
              {activity.eventDate}
            </div>
          </div>
          <div className="flex-1">
            <h3 className={`font-medium ${activity.eventTextColor} mb-1 text-sm lg:text-base`}>
              {activity.eventType}
            </h3>
            <p className={`text-xs lg:text-sm ${activity.eventTextColor} opacity-75 mb-2`}>
              {activity.eventDetails}
            </p>
            {activity.eventLocation && (
              <p className={`text-xs lg:text-sm ${activity.eventTextColor} flex items-center`}>
                <MapPin size={10} className="mr-1 lg:w-3 lg:h-3" />
                {activity.eventLocation}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="-mx-4 lg:-mx-6 mt-4 pt-4 px-4 lg:px-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xs lg:text-sm font-bold">An</span>
          </div>
          <input
            type="text"
            placeholder="Write a comment"
            className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 border border-gray-200 text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
