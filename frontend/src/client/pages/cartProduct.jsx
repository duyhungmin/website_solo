import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { cartAPI } from "../../admin/api/cart.api";
import { useNavigate } from "react-router-dom";

 const CartPage = ()=> {
    
    const  navigate = useNavigate()
    const [cart , setCart] = useState(null);

    const handleUpdateQuantity = async (productId, type)=>{
            try {
                const res = await cartAPI.updateQuantity({
                    productId,
                    type
                })

                setCart(res.data)
            } catch (error) {
                console.log("loi quantity",error)
            }
    }


    useEffect(()=>{
           
                
        const listCart = async ()=>{
        try { 
                const res = await cartAPI.getCart()
                setCart(res.data)
                console.log(res)
        } catch (error)
                     {
                        console.log("err get cart", error)
                    }
            
        }

        listCart()

            


    },[])

if (!cart || !cart.items || cart.items.length === 0) {
  return <div className="p-6">🛒 Giỏ hàng trống</div>;
}
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div className="flex items-center gap-3">
        <ShoppingBag className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Giỏ hàng</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
    
        <div className="md:col-span-2 space-y-4">
       {cart.items.map((item)=>(
            <div
              key={item.product}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-20 rounded-xl object-cover"
              />

              <div className="flex-1 space-y-2">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500">
                  {item.price.toLocaleString()}₫
                </p>

                <div className="flex items-center gap-3">
                  <button onClick={()=>handleUpdateQuantity(item.product,"decrease")} className="rounded-lg border p-1">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-6 text-center">
                    {item.quantity}
                  </span>
                  <button onClick={()=>handleUpdateQuantity(item.product,"increase")} className="rounded-lg border p-1">
                    <Plus className="h-4 w-4" />
                  </button>

                  <button className="ml-auto text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="font-semibold">
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
            </div>
      ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>

          <div className="flex justify-between text-sm">
            <span>Tạm tính</span>
            <span>{cart.totalPrice.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Tổng cộng</span>
            <span>{cart.totalPrice.toLocaleString()}₫</span>
          </div>

          <button onClick={()=>navigate("/checkout")} className="w-full rounded-xl bg-black py-3 text-white hover:bg-gray-800">
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage