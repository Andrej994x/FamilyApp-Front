import { Check, Clock } from "lucide-react"

export default function CalendarGrid({
  selectedView,
  currentDate,
  getDaysInMonth,
  getDaysOfWeek,
  getHoursOfDay,
  isToday,
  mockEvents,
  monthNames,
  dayNames,
  fullDayNames,
  handleEventClick,
}) {
  const renderCalendarGrid = () => {
    if (selectedView === "Month") {
      const days = getDaysInMonth(currentDate)
      return (
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 border border-gray-200 ${
                day ? "bg-white hover:bg-gray-50" : "bg-gray-50"
              } cursor-pointer`}
            >
              {day && (
                <>
                  <div
                    className={`text-sm w-6 h-6 flex items-center justify-center ${
                      isToday(day, currentDate.getMonth(), currentDate.getFullYear())
                        ? "bg-blue-500 text-white rounded-full font-medium"
                        : ""
                    }`}
                  >
                    {day}
                  </div>
                  {mockEvents
                    .filter(
                      (event) =>
                        event.date.getDate() === day &&
                        event.date.getMonth() === currentDate.getMonth() &&
                        event.date.getFullYear() === currentDate.getFullYear(),
                    )
                    .map((event) => (
                      <div key={event.id} className="mt-1">
                        <div
                          className={`text-xs ${event.color} text-white px-1 rounded cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEventClick(event)
                          }}
                        >
                          {event.title}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
        </div>
      )
    } else if (selectedView === "Week") {
      const daysOfWeek = getDaysOfWeek(currentDate)
      const hoursOfDay = getHoursOfDay()
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const allDayEvents = mockEvents.filter(
        (event) =>
          event.type === "all-day" && event.date >= daysOfWeek[0] && event.date <= daysOfWeek[daysOfWeek.length - 1],
      )

      return (
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="p-2 text-center text-sm font-medium text-gray-600">
                {dayNames[day.getDay() === 0 ? 6 : day.getDay() - 1]} {day.getDate()}/{day.getMonth() + 1}
              </div>
            ))}
          </div>
          {allDayEvents.length > 0 && (
            <div className="flex flex-col border-b border-gray-200 pb-2 mb-2">
              <div className="text-sm font-medium text-gray-600 mb-1">All day</div>
              <div className="flex flex-col gap-1">
                {allDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} text-white text-xs p-1 rounded cursor-pointer`}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto relative">
            <div className="grid grid-cols-[auto_1fr] h-full">
              <div className="flex flex-col border-r border-gray-200 pr-2 text-xs text-gray-500">
                {hoursOfDay.map((hour, index) => (
                  <div key={hour} className="h-12 flex items-start justify-end pt-0.5">
                    {index > 0 ? hour : ""}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 flex-1 relative">
                {isToday(now.getDate(), now.getMonth(), now.getFullYear()) && selectedView === "Week" && (
                  <div
                    className="absolute left-0 right-0 h-px bg-red-500 z-10"
                    style={{ top: `${((currentHour * 60 + currentMinute) / 60) * 48 + 24}px` }}
                  >
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                )}
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex flex-col border-r border-gray-200 last:border-r-0">
                    {hoursOfDay.map((hour, hourIndex) => (
                      <div key={`${dayIndex}-${hourIndex}`} className="h-12 border-b border-gray-100 relative">
                        {mockEvents
                          .filter(
                            (event) =>
                              event.date.getDate() === day.getDate() &&
                              event.date.getMonth() === day.getMonth() &&
                              event.date.getFullYear() === day.getFullYear() &&
                              event.type === "timed" &&
                              event.date.getHours() === hourIndex,
                          )
                          .map((event) => (
                            <div
                              key={event.id}
                              className={`absolute inset-0 ${event.color} text-white text-xs p-1 rounded overflow-hidden cursor-pointer`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventClick(event)
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    } else if (selectedView === "Day") {
      const hoursOfDay = getHoursOfDay()
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const allDayEvents = mockEvents.filter(
        (event) =>
          event.type === "all-day" &&
          event.date.getDate() === currentDate.getDate() &&
          event.date.getMonth() === currentDate.getMonth() &&
          event.date.getFullYear() === currentDate.getFullYear(),
      )

      return (
        <div className="flex flex-col h-full">
          <div className="p-2 text-center text-sm font-medium text-gray-600">
            {dayNames[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]}
          </div>
          {allDayEvents.length > 0 && (
            <div className="flex flex-col border-b border-gray-200 pb-2 mb-2">
              <div className="text-sm font-medium text-gray-600 mb-1">All day</div>
              <div className="flex flex-col gap-1">
                {allDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} text-white text-xs p-1 rounded cursor-pointer`}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto relative">
            <div className="grid grid-cols-[auto_1fr] h-full">
              <div className="flex flex-col border-r border-gray-200 pr-2 text-xs text-gray-500">
                {hoursOfDay.map((hour, index) => (
                  <div key={hour} className="h-12 flex items-start justify-end pt-0.5">
                    {index > 0 ? hour : ""}
                  </div>
                ))}
              </div>
              <div className="flex flex-col flex-1 relative">
                {isToday(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()) &&
                  selectedView === "Day" && (
                    <div
                      className="absolute left-0 right-0 h-px bg-red-500 z-10"
                      style={{ top: `${((currentHour * 60 + currentMinute) / 60) * 48 + 24}px` }}
                    >
                      <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                {hoursOfDay.map((hour, hourIndex) => (
                  <div key={hourIndex} className="h-12 border-b border-gray-100 relative">
                    {mockEvents
                      .filter(
                        (event) =>
                          event.date.getDate() === currentDate.getDate() &&
                          event.date.getMonth() === currentDate.getMonth() &&
                          event.date.getFullYear() === currentDate.getFullYear() &&
                          event.type === "timed" &&
                          event.date.getHours() === hourIndex,
                      )
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`absolute inset-0 ${event.color} text-white text-xs p-1 rounded overflow-hidden cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEventClick(event)
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    } else if (selectedView === "List") {
      const filteredEvents = mockEvents
        .filter((event) => event.date.getFullYear() === currentDate.getFullYear())
        .sort((a, b) => a.date.getTime() - b.date.getTime())

      let lastDate = null
      return (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No events for this year.</div>
          ) : (
            filteredEvents.map((event, index) => {
              const eventDate = event.date
              const showDateHeader = !lastDate || eventDate.toDateString() !== lastDate.toDateString()
              lastDate = eventDate

              return (
                <div key={event.id}>
                  {showDateHeader && (
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {fullDayNames[eventDate.getDay()]} {eventDate.getDate()} {monthNames[eventDate.getMonth()]}{" "}
                        {eventDate.getFullYear()}
                      </h3>
                      <span className="text-sm text-gray-500">{fullDayNames[eventDate.getDay()]}</span>
                    </div>
                  )}
                  <div
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className={`w-4 h-4 ${event.color} rounded-full flex items-center justify-center`}>
                      {event.type === "all-day" ? (
                        <Check size={10} className="text-white" />
                      ) : (
                        <Clock size={10} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {event.type === "all-day"
                          ? "All day"
                          : `${String(event.date.getHours()).padStart(2, "0")}:${String(event.date.getMinutes()).padStart(2, "0")}`}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )
    }
    return null
  }

  return <div className="flex-1 overflow-y-auto p-4">{renderCalendarGrid()}</div>
}