import React, { useState ,useEffect } from "react";
import { checkOutCartApi } from "../api/checkOutCart.api";
// import { cartAPI } from "../api/cart.api";
import { 
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
// import { checkOutCartApi } from "../api/checkOutCart.api";

const statusConfig = {
  pending: {
    label: "Chờ xử lý",
    icon: <Clock size={18} />,
    color: "bg-yellow-100 text-yellow-700"
  },
  processing: {
    label: "Đang giao",
    icon: <Truck size={18} />,
    color: "bg-blue-100 text-blue-700"
  },
  completed: {
    label: "Hoàn thành",
    icon: <CheckCircle size={18} />,
    color: "bg-green-100 text-green-700"
  },
  cancelled: {
    label: "Đã huỷ",
    icon: <XCircle size={18} />,
    color: "bg-red-100 text-red-700"
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page,setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading,setLoading] = useState(false) // đặt false để kết thúc trạng thái luôn không cho tải trạng thái

    const fetchOrders = async ()=>{
        try {
            
            setLoading(true)
            const res = await checkOutCartApi.getAllOrdersbyAdmin(page, 10)
            setOrders(res.data)
            setTotalPages(res.totalPages)
            console.log(res.data)

        } catch (error) {
            console.log("lỗi lấy đơn hàng",error)
        } finally{
            setLoading(false)
        }
    }


  const handleChangeStatus = async(id, status) => {
    try {

        await checkOutCartApi.updateStatus(id, status)
        // window.alert("Thay đổi trạng thái thành công")
        fetchOrders() // load lại trang 


    } catch (error) {
        alert("Cập nhập thất bại ",error)
    }
  };

  useEffect(()=>{
    fetchOrders()
  },[page])

  if (loading) {
  return <p className="p-6">Đang tải đơn hàng...</p>;
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package /> Quản lý đơn hàng
      </h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Mã đơn</th>
            <th className="p-3 text-left">Khách hàng</th>
            <th className="p-3 text-left">Tổng tiền</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-t">
              <td className="p-3">{order._id}</td>
              <td className="p-3">{order.user.email}</td>
              <td className="p-3">
                {order.totalPrice.toLocaleString()}đ
              </td>

              <td className="p-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
                  ${statusConfig[order.status].color}`}
                >
                  {statusConfig[order.status].icon}
                  {statusConfig[order.status].label}
                </span>
              </td>

              <td className="p-3">
                <select
                  value={order.status}
                  disabled={order.status === "processing"}
                  onChange={e =>
                    handleChangeStatus(order._id, e.target.value)
                  }
                  className={`border rounded px-2 py-1
                  ${order.status === "processing"
                    ? "bg-gray-200 cursor-not-allowed"
                    : ""}`}
                       >
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang giao</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Huỷ</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <div className="flex justify-center gap-2 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(p => p - 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="px-3 py-1 font-medium">
    {page} / {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(p => p + 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
    
    
  );
};

export default AdminOrders;
