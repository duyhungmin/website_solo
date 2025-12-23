import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Products Sold',
    value: '1,248',
    icon: Package,
    change: '+12%',
  },
  {
    title: 'Revenue',
    value: '$24,560',
    icon: DollarSign,
    change: '+8.5%',
  },
  {
    title: 'Orders',
    value: '892',
    icon: ShoppingCart,
    change: '+5.2%',
  },
  {
    title: 'Growth',
    value: '18%',
    icon: TrendingUp,
    change: '+2.1%',
  },
]

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {item.value}
                  </p>
                </div>

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <Icon size={20} className="text-gray-700" />
                </div>
              </div>

              <p className="text-sm text-green-600 mt-3">
                {item.change} so với tháng trước
              </p>
            </div>
          )
        })}
      </div>

      {/* Placeholder charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Revenue Chart (coming soon)
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Orders Chart (coming soon)
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview