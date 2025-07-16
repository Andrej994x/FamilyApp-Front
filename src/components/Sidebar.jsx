"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  Calendar,
  List,
  DollarSign,
  FileText,
  Clock,
  Utensils,
  MapPin,
  MessageSquare,
  Settings,
  Users,
  ImageIcon,
  HelpCircle,
  Crown,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarItems = [
    { id: "dashboard", icon: Activity, label: "Activity", path: "/dashboard" },
    { id: "calendar", icon: Calendar, label: "Calendar", path: "/calendar" },
    { id: "lists", icon: List, label: "Lists", path: "/lists" },
    { id: "budget", icon: DollarSign, label: "Budget", path: "/budget" },
    { id: "documents", icon: FileText, label: "Documents", path: "/documents" },
    { id: "timetable", icon: Clock, label: "Timetable", path: "/timetable" },
    { id: "meal", icon: Utensils, label: "Meal Planner", path: "/meal" },
    { id: "recipe", icon: ImageIcon, label: "Recipe Box", path: "/recipe" },
    { id: "map", icon: MapPin, label: "Map", path: "/map" },
    {
      id: "messages",
      icon: MessageSquare,
      label: "Messages",
      path: "/messages",
    },
    { id: "gallery", icon: ImageIcon, label: "Gallery", path: "/gallery" },
    { id: "contacts", icon: Users, label: "Contact Book", path: "/contacts" },
    { id: "premium", icon: Crown, label: "Premium", path: "/premium" },
  ];

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
    { id: "help", icon: HelpCircle, label: "Help", path: "/help" },
  ];

  return (
    <>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .sidebar-container:hover .custom-scrollbar {
          scrollbar-width: thin; /* Firefox */
          -ms-overflow-style: auto; /* IE and Edge */
        }
        .sidebar-container:hover .custom-scrollbar::-webkit-scrollbar {
          display: block; /* Chrome, Safari, Opera */
          width: 6px;
        }
        .sidebar-container:hover .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .sidebar-container:hover .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .sidebar-container:hover
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
  sidebar-container fixed md:relative h-full bg-white shadow-sm border-r border-gray-300 flex flex-col z-40 transition-all duration-300 ease-in-out
  ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  ${isExpanded ? "w-48" : "w-14 md:w-14"}
  md:hover:w-48
`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Family Info */}
        <div
          className={`p-3 border-b border-gray-300 transition-all duration-300 flex-shrink-0 ${
            !isExpanded && !isMobileOpen ? "px-2" : ""
          }`}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div
              className={`ml-3 transition-all duration-300 overflow-hidden ${
                !isExpanded && !isMobileOpen
                  ? "w-0 opacity-0"
                  : "w-auto opacity-100"
              }`}
            >
              <h3 className="font-semibold whitespace-nowrap">Nestorov</h3>
              <p className="text-sm text-gray-500 whitespace-nowrap">
                2 members
              </p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav
          className={`custom-scrollbar flex-1 overflow-y-auto ${
            !isExpanded && !isMobileOpen ? "p-1" : "p-2"
          } min-h-0`}
        >
          <div className="space-y-0">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center justify-start px-3 py-1 rounded-lg text-left text-sm transition-all duration-200 group relative ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="flex-shrink-0" />
                </div>
                <span
                  className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    !isExpanded && !isMobileOpen
                      ? "w-0 opacity-0"
                      : "w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!isExpanded && !isMobileOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-1.5 mt-1.5 space-y-0">
            {bottomItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center justify-start px-3 py-1 rounded-lg text-left text-sm transition-all duration-200 group relative ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="flex-shrink-0" />
                </div>
                <span
                  className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    !isExpanded && !isMobileOpen
                      ? "w-0 opacity-0"
                      : "w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!isExpanded && !isMobileOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div
          className={`p-3 border-t border-gray-300 flex items-center transition-all duration-300 flex-shrink-0 ${
            !isExpanded && !isMobileOpen ? "px-2" : ""
          }`}
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">An</span>
          </div>
          <div
            className={`flex-1 min-w-0 ml-2 transition-all duration-300 overflow-hidden ${
              !isExpanded && !isMobileOpen
                ? "w-0 opacity-0"
                : "w-auto opacity-100"
            }`}
          >
            <p className="text-xs font-medium truncate whitespace-nowrap">
              Andrej
            </p>
            <p className="text-xs text-gray-500 truncate whitespace-nowrap">
              andrej.nesti@gmail.com
            </p>
          </div>

          {/* Logout button */}
          <button
            className={`ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors ${
              !isExpanded && !isMobileOpen ? "hidden" : ""
            }`}
            onClick={() => {
              console.log("Logout clicked");
            }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
