import React from 'react'
import { Outlet } from 'react-router-dom'
import  AdminHeader  from '../layouts/headerAdmin.jsx'
import AdminSidebar  from '../layouts/sidebarAdmin.jsx'
// import Darshboad from '../layouts/Darshboad.jsx'
const DashboardAdmin = () => {
  return (
     <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardAdmin