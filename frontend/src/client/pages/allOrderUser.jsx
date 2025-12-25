
import {
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Package
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { checkOutCartApi } from "../../admin/api/checkOutCart.api";
import { useNavigate } from "react-router-dom";
const statusConfig = {
  pending: {
    label: "Chờ xử lý",
    icon: <Clock size={16} />,
    color: "bg-yellow-100 text-yellow-700"
  },
  processing: {
    label: "Đang giao",
    icon: <Truck size={16} />,
    color: "bg-blue-100 text-blue-700"
  },
  completed: {
    label: "Hoàn thành",
    icon: <CheckCircle size={16} />,
    color: "bg-green-100 text-green-700"
  },
  cancelled: {
    label: "Đã huỷ",
    icon: <XCircle size={16} />,
    color: "bg-red-100 text-red-700"
  }
};

// nhớ đổi path cho đúng

const allOrderUser = () => {
    const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchallOrderUser = async () => {
    try {
      setLoading(true);
      const res = await checkOutCartApi.getAllOrders(page ,8);
      setOrders(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.log("Lỗi lấy đơn hàng", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchallOrderUser();
  }, [page]);

  if (loading) {
    return <p className="p-6">Đang tải đơn hàng...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package /> Đơn hàng của tôi
      </h1>

      {orders.length === 0 && (
        <p className="text-gray-500">Anh chưa có đơn hàng nào 🥲</p>
      )}

      <div className="space-y-4">
        {orders.map(order => {
          const status = statusConfig[order.status];

          return (
            <div
              key={order._id}
              className="border rounded-xl p-4 flex justify-between items-center"
              onClick={()=>navigate(`/oder-details/${order._id}`)}
            >
              <div>
                <p className="font-medium">
                  Mã đơn: <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Tổng tiền: {order.totalPrice.toLocaleString()}đ
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${status.color}`}
              >
                {status.icon}
                {status.label}
              </span>
            </div>
          );
        })}
      </div>

  
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
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
      )}
    </div>
  );
};

export default allOrderUser;
