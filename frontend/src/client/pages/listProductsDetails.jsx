import React from 'react'
import  { useState , useEffect } from "react";
import { productAPI } from '../../admin/api/products.api';
import { useParams } from 'react-router-dom';
import { cartAPI } from '../../admin/api/cart.api';
// import { useNavigate } from 'react-router-dom';
import { UseCart } from '../../context/cartContext';

import {
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus
} from "lucide-react";



const ListProductsDetails = () => {

  const { fetch } = UseCart()
  // const navigate = useNavigate()
    const {id} = useParams()
    const [product, setProducts] = useState();
    const [quantity, setQuantity] = useState(1);

     const HandleAddCart = async ()=>{

            try {
              const res = await cartAPI.addToCart({
                productId : product._id,
                quantity
              });
              console.log(res)

             await fetch()

            } catch (error) {
              console.log("loi k add dc ",error)
            }

}

    useEffect(()=>{
                  
            const detailProduct = async ()=>{
              try {
                  const res = await productAPI.getProductById(id)
                setProducts(res.data)
                console.log(res)
              } catch (error) {
                console.log("KHONG HIEN THI DC SAN PHAM",error) 
              }
          
        }

            detailProduct()

            

    },[id])

  if (!product) {
    return <p className="p-6">Đang tải sản phẩm...</p>;
  }
 return (

    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}

      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl shadow"
        />
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        {/* Rating
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              className={
                index < product.rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
              fill={index < product.rating ? "#facc15" : "none"}
            />
          ))}
        </div> */}

        <p className="text-red-500 text-xl font-semibold mb-4">
          {product.price.toLocaleString()} ₫
        </p>

        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 border rounded"
          >
            <Minus size={18} />
          </button>

          <span className="font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 border rounded"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button onClick={HandleAddCart} className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded hover:opacity-90">
            <ShoppingCart size={20} />
            Thêm vào giỏ
          </button>

          <button className="p-3 border rounded hover:bg-gray-100">
            <Heart size={20} />
          </button>
        </div>
      </div>

    </div>

  );
};


export default ListProductsDetails