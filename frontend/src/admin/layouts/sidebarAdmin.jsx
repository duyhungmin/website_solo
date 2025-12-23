import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Box, Users, Settings } from 'lucide-react'

const menu = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Box },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

const AdminSidebar = () => {
  return (
    <aside className="w-40 bg-white border-r min-h-screen p-4">
      <div className="text-xl font-bold text-gray-800 mb-6">Admin</div>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition \
                ${isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar
