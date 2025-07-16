const LastItemsCard = ({ navigate }) => {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <div className="px-3 lg:px-4 py-3 lg:py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-xs lg:text-sm tracking-wide">LAST ITEMS OF LISTS ADDED</h3>
        </div>
        <div className="p-3 lg:p-4">
          <div className="flex items-center">
            <div className="w-4 h-4 lg:w-5 lg:h-5 bg-gray-400 rounded-full mr-2 lg:mr-3"></div>
            <span className="text-gray-700 text-xs lg:text-sm">test</span>
          </div>
        </div>
        <div className="border-t border-gray-200 py-2 lg:py-3 px-3 lg:px-4">
          <button
            onClick={() => navigate("/lists")}
            className="w-full text-blue-600 text-xs font-bold hover:underline text-center tracking-wide cursor-pointer"
          >
            GO TO LISTS
          </button>
        </div>
      </div>
    </div>
  )
}

export default LastItemsCard
