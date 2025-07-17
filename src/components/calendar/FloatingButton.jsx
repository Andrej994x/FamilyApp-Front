import { Plus } from "lucide-react"

export default function FloatingButton({ setIsEventModalOpen }) {
  return (
    <button
      onClick={() => setIsEventModalOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center z-10 cursor-pointer"
    >
      <Plus size={24} />
    </button>
  )
}