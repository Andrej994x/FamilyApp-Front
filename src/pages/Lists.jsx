import { MoreHorizontal, Plus } from "lucide-react"

const Lists = () => {
  const lists = [
    {
      name: "test 2",
      type: "private",
      icon: "📝",
      completed: true,
      isSelected: true,
    },
    {
      name: "odmor 2025",
      type: "shared",
      icon: "📝",
      completed: true,
      isSelected: false,
    },
    {
      name: "To Do ✅",
      type: "shared",
      icon: "✅",
      completed: true,
      isSelected: false,
      isDefault: true,
    },
    {
      name: "Shopping 🛒",
      type: "shared",
      icon: "🛒",
      completed: true,
      isSelected: false,
      isDefault: true,
    },
  ]

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-300">
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Lists</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500">4 Lists</p>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {lists.map((list, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer border ${
                  list.isSelected ? "bg-blue-50 border-blue-300" : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                    <span>{list.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{list.name}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      {list.type === "private" ? (
                        <>🔒 private</>
                      ) : (
                        <>👥 {list.isDefault ? "Default List" : "Shared"} 👥 Shared with all mem...</>
                      )}
                    </p>
                  </div>
                </div>
                {list.completed && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-2">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center mr-3">
              <span>📝</span>
            </div>
            <h3 className="text-lg font-medium">test 2</h3>
          </div>
          <button className="text-white hover:text-blue-200">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Input Field */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center">
            <button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
              <Plus size={16} className="text-gray-600" />
            </button>
            <input type="text" placeholder="I want to..." className="flex-1 text-gray-500 focus:outline-none" />
          </div>
        </div>

        {/* Blank Page Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <div className="w-12 h-12 bg-orange-200 rounded flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">It's a blank page</h3>
            <p className="text-gray-500">Tap on field above to start listing anything that comes to mind</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lists
