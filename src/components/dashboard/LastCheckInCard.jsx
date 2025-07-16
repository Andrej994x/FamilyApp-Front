import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const LastCheckInCard = () => {
  return (
    <div>
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <div className="px-3 lg:px-4 py-3 lg:py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-xs lg:text-sm tracking-wide">LAST CHECK-IN</h3>
        </div>
        <div className="p-3 lg:p-4">
          <div className="flex items-center justify-center mb-3 lg:mb-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center relative">
              <span className="text-white font-bold text-sm lg:text-base">An</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <MapPin size={8} className="text-white lg:w-2.5 lg:h-2.5" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ChevronLeft size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 lg:w-5 lg:h-5" />
            <span className="font-medium text-gray-900 text-xs lg:text-sm">Andrej2</span>
            <ChevronRight size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 lg:w-5 lg:h-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LastCheckInCard
