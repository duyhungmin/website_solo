import {
  ShoppingBag,
  Settings,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react";

import { checkOutCartApi } from "../../admin/api/checkOutCart.api";


const steps = [
  {
    key: "pending",
    label: "Đã đặt hàng",
    icon: ShoppingBag
  },
  {
    key: "processing",
    label: "Đang xử lý",
    icon: Settings
  },
  {
    key: "completed",
    label: "Hoàn tất",
    icon: CheckCircle
  }
];

const OrderStatusTimeline = ({ status }) => {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 p-4 border rounded-xl bg-red-50">
        <XCircle className="text-red-500" />
        <span className="font-medium text-red-600">
          Đơn hàng đã bị hủy
        </span>
      </div>
    );
  }

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="flex items-center justify-between mt-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= currentIndex;

        return (
          <div
            key={step.key}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Line */}
            {index !== 0 && (
              <div
                className={`absolute top-5 left-0 w-full h-1 
                ${isActive ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}

            {/* Icon */}
            <div
              className={`z-10 w-10 h-10 rounded-full flex items-center justify-center
              ${isActive ? "bg-green-500 text-white" : "bg-gray-300 text-white"}`}
            >
              <Icon size={20} />
            </div>

            {/* Label */}
            <p
              className={`mt-2 text-sm font-medium
              ${isActive ? "text-green-600" : "text-gray-400"}`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusTimeline;
