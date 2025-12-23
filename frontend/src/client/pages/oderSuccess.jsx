import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Home,
  ClipboardList
} from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // optional

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center border rounded-2xl p-8 shadow-sm">

        {/* Icon success */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={72} className="text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          Đặt hàng thành công!
        </h1>

        <p className="text-gray-600 mb-6">
          Cảm ơn anh đã mua hàng. Đơn hàng của anh đang được xử lý.
        </p>

        {/* Order ID */}
        {id && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Mã đơn hàng</p>
            <p className="font-semibold text-lg">#{id}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/oder-details/${id}`)}
            className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
          >
            <ClipboardList size={20} />
            Xem đơn hàng
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full border py-3 rounded-lg hover:bg-gray-50"
          >
            <Home size={20} />
            Về trang chủ
          </button>
        </div>

        {/* Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Package size={16} />
          Đơn hàng sẽ được giao trong 2–4 ngày làm việc
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
