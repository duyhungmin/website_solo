import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ClipboardList,
  MapPin,
  Phone,
  User,
  PackageCheck
} from "lucide-react";
import {checkOutCartApi} from "../../admin/api/checkOutCart.api"

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await checkOutCartApi.getCartDetail(id);
        setOrder(res.data);
      } catch (error) {
        console.log("Lỗi lấy chi tiết đơn hàng", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <p className="p-6">Đang tải đơn hàng...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <ClipboardList />
        Chi tiết đơn hàng #{order._id}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <PackageCheck />
        Trạng thái: {order.status || "pending"}
      </div>

      {/* Products */}
      <div className="border rounded-xl p-5">
        <h2 className="font-semibold mb-4">Danh sách sản phẩm</h2>

        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-3 last:border-none"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                SL: {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              {(item.price * item.quantity).toLocaleString()}đ
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Tổng tiền</span>
          <span className="text-red-500">
            {order.totalPrice.toLocaleString()}đ
          </span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="border rounded-xl p-5 space-y-3">
        <h2 className="font-semibold">Thông tin người nhận</h2>

        <p className="flex items-center gap-2">
          <User size={18} />
          {order.shippingAddress.fullname}
        </p>

        <p className="flex items-center gap-2">
          <Phone size={18} />
          {order.shippingAddress.phone}
        </p>

        <p className="flex items-center gap-2">
          <MapPin size={18} />
          {order.shippingAddress.address}
        </p>

        {order.shippingAddress.note && (
          <p className="text-sm text-gray-500">
            Ghi chú: {order.shippingAddress.note}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
