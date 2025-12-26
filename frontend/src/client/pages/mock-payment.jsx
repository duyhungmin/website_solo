import { useParams, useNavigate } from "react-router-dom";
import {QRCodeCanvas} from "qrcode.react"
import { checkOutCartApi } from "../../admin/api/checkOutCart.api";

const MockPayment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = async () => {
   
    try {

        const res = await checkOutCartApi.mockPaymentSuccess(orderId)
        console.log(orderId)
        navigate(`/oder-success/${orderId}`)
        
    } catch (error) {
        window.alert("Thanh toan loi", error)
    }

  };

  return (
   <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl text-center">
      <h1 className="text-xl font-semibold mb-4">Mock QR Payment</h1>

      <QRCodeCanvas
        value={`mock-payment:${orderId}`}
        size={220}
      />

      <button
        onClick={handleSuccess}
        className="w-full mt-6 bg-green-500 text-white py-2 rounded"
      >
        Thanh toán thành công
      </button>
    </div>
  );
};

export default MockPayment;
