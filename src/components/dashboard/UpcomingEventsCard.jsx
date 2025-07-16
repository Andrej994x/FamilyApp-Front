const UpcomingEventsCard = ({ events, onEventClick, setOpen }) => {
  const handleClick = (event) => {
    onEventClick(event)
    setOpen(true)
  }

  return (
    <div className="mb-6 lg:mb-8">
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <div className="px-3 lg:px-4 py-3 lg:py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-xs lg:text-sm tracking-wide">UPCOMING EVENTS</h3>
        </div>
        <div className="p-3 lg:p-4">
          {events.map((event, index) => (
            <div key={index} className="py-2 lg:py-3">
              <div
                className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                onClick={() => handleClick(event)}
              >
                <div
                  className={`w-6 h-6 lg:w-8 lg:h-8 ${event.color} text-white rounded flex items-center justify-center text-xs lg:text-sm font-bold mr-2 lg:mr-3`}
                >
                  {event.date}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs lg:text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              </div>
              {index < events.length - 1 && <div className="border-b border-gray-200 mt-2 lg:mt-3"></div>}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 py-2 lg:py-3 px-3 lg:px-4">
          <button className="w-full text-blue-600 text-xs font-bold hover:underline text-center tracking-wide cursor-pointer">
            GO TO CALENDAR
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpcomingEventsCard
