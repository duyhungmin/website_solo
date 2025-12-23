import React from 'react'
import { Bell, User, LogOut } from 'lucide-react'

const AdminHeader = () => {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-gray-800">Admin Panel</div>
        <span className="text-sm text-gray-400">Dashboard</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative text-gray-500 hover:text-gray-800 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Admin</span>
        </div>

        {/* Logout */}
        <button className="text-gray-500 hover:text-red-500 transition">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
