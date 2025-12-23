import React, { useEffect, useState } from "react";
import { checkOutCartApi } from "../../admin/api/checkOutCart.api";
import {UseCart} from "../../context/cartContext"
import { cartAPI } from "../../admin/api/cart.api";
import {useNavigate} from "react-router-dom"
import {
  ShoppingCart,
  User,
  Phone,
  MapPin,
  StickyNote,
  CreditCard
} from "lucide-react";

const CheckoutCart = () => {

  const navigate = useNavigate()

  const {cart,fetch} = UseCart()
  
  const [cart2, setCart]= useState([])

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
    note: ""
  });

  useEffect(()=>{
    const getCart = async ()=>{
      try {
        const res = await cartAPI.getCart()
        setCart(res.data)
      } catch (error) {
        console.log("err",error)
      }
    }

    getCart()
  },[])

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]: e.target.value})
  }

  const handleCheckOut = async()=>{

    try {

     const res = await checkOutCartApi.createCheckOutCart({
        shippingAddress: form,
        paymentMethod : "cod"
      });
      console.log("Thêm thành công",res.data)
      window.alert("ĐẶT HÀNG THÀNH CÔNG")
      navigate(`/oder-success/${res.data._id}`)
      await fetch() // refresh cart
    } catch (error) {
      console.log("errr checkout",error)
    }

  }
if (!cart2 || !Array.isArray(cart2.items)) {
  return <p className="p-6">Đang tải giỏ hàng...</p>;
}


  // const handleCheckout = () => {
  //   const order = {
  //     products: cart,
  //     total: totalPrice,
  //     customer: form
  //   };

  //   console.log("ORDER:", order);
  //   alert("Thanh toán thành công 🎉");
  //   localStorage.removeItem("cart");
  // };

  return (

    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      
    {/* LEFT: CART */}
      <div className="border rounded-xl p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <ShoppingCart size={22} />
          Danh sách sản phẩm
        </h2>

        {cart2.length === 0 && (
          <p className="text-gray-500">Giỏ hàng trống</p>
        )}

        {cart2.items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-3"
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

        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Tổng tiền</span>
          <span className="text-red-500">
            {cart2.totalPrice.toLocaleString()}đ
          </span>
        </div>
      </div>


      {/* RIGHT: CUSTOMER INFO */}
      <div className="border rounded-xl p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <User size={22} />
          Thông tin người mua
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="fullname"
              placeholder="Tên người mua"
              value={form.fullname}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 p-2"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 p-2"
            />
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="address"
              placeholder="Địa chỉ giao hàng"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 p-2"
            />
          </div>

          {/* Note */}
          <div className="relative">
            <StickyNote
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <textarea
              name="note"
              placeholder="Ghi chú (optional)"
              value={form.note}
              onChange={handleChange}
              className="w-full border rounded-lg pl-10 p-2"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleCheckOut}
            className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
          >
            <CreditCard size={20} />
           Đặt hàng ({cart.totalPrice.toLocaleString()}₫)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
