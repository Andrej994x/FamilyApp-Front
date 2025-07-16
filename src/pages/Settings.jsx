"use client"

import { useNavigate } from "react-router-dom"
import {
  SettingsIcon,
  Users,
  FileText,
  Plus,
  Shield,
  Bell,
  Smartphone,
  HelpCircle,
  Mail,
  Cookie,
  Tag,
  Database,
} from "lucide-react"

const Settings = ({ onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  const familyMembers = [
    {
      name: "Andrej",
      role: "Founder",
      roleDetail: "since Monday 7 July 2025",
      avatar: "An",
      color: "bg-green-500",
      isFounder: true,
    },
    {
      name: "Andrej2",
      role: "Administrator",
      roleDetail: "since Monday 7 July 2025",
      avatar: "An",
      color: "bg-green-500",
      isFounder: false,
    },
    {
      name: "Teodora",
      role: "Invitation pending",
      roleDetail: "",
      avatar: "Te",
      color: "bg-gray-400",
      isFounder: false,
    },
  ]

  const settingsItems = [
    { icon: Shield, label: "Security & Privacy", active: false },
    { icon: Users, label: "Manage circle", active: false },
    { icon: Users, label: "Family members", active: true },
    { icon: Users, label: "Manage family administrators", active: false },
    { icon: Database, label: "Family storage", active: false },
    { icon: SettingsIcon, label: "Local preferences", active: false },
    { icon: FileText, label: "Manage Subscription", active: false },
    { icon: Smartphone, label: "Get the App", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: Tag, label: "Got a Promo code?", active: false },
    { icon: HelpCircle, label: "Help", active: false },
    { icon: Mail, label: "Contact us", active: false },
    { icon: Cookie, label: "Cookie Policy", active: false },
  ]

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-300 bg-white">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>
          <nav className="space-y-1">
            {settingsItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center px-3 py-3 text-left rounded transition-colors ${
                  item.active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Family Members</h3>
              <p className="text-gray-500">Manage the members of the Nestorov Circle</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Leave this Circle
            </button>
          </div>

          <div className="space-y-4">
            {familyMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center mr-4`}>
                    <span className="text-white font-bold">{member.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">
                      {member.role} {member.roleDetail}
                    </p>
                  </div>
                </div>
                {!member.isFounder && (
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                    Remove
                  </button>
                )}
              </div>
            ))}

            {/* Add Member */}
            <div className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <Plus size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Add a new member</p>
                <p className="text-sm text-gray-500">All your loved ones are welcome</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
