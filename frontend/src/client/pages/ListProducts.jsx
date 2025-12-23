import React from 'react'
import { Heart, ShoppingBag } from "lucide-react";
import { productAPI } from '../../admin/api/products.api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// const products = Array.from({ length: 12 }).map((_, i) => ({
// id: i + 1,
// name: `Áo thun basic ${i + 1}`,
// price: 199000,
// image: "https://images.unsplash.com/photo-1520975869010-9fbb5b8c4c9c",
// }));

const ListProducts = () => {
    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    useEffect(()=>{

        const listProduct = async()=>{
            try {
                   const response = await productAPI.getAllProduct()
                     setProducts(response.data)
                     console.log(response)
            } catch (error) {
                console.log("list product loi",error)
            }

             

        }

        listProduct()


    },[])



 return (
<div className="space-y-6">
{/* Title */}
<div className="flex items-center justify-between">
<h1 className="text-2xl font-bold">Sản phẩm</h1>
<select className="rounded-lg border px-3 py-2 text-sm">
<option>Mới nhất</option>
<option>Giá tăng dần</option>
<option>Giá giảm dần</option>
</select>
</div>


{/* Grid sản phẩm */}
<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
{products.map((p) => (
<div
key={p._id}
className="group rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
>
{/* Image */}
<div className="relative overflow-hidden rounded-t-2xl">
<img
src={p.image}
alt={p.name}
className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
/>
<button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-100">
<Heart className="h-4 w-4" />
</button>
</div>


{/* Content */}
<div className="space-y-2 p-4">
<h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
<p className="font-semibold text-black">
{p.price.toLocaleString()}₫
</p>


<button onClick={()=>navigate(`/details-product/${p._id}`)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2 text-sm text-white hover:bg-gray-800">
<ShoppingBag className="h-4 w-4" />
Xem Sản Phẩm
</button>
</div>
</div>
))}
</div>


{/* Pagination */}
<div className="flex justify-center gap-2 pt-6">
<button className="rounded-lg border px-3 py-1">1</button>
<button className="rounded-lg border px-3 py-1">2</button>
<button className="rounded-lg border px-3 py-1">3</button>
</div>
</div>
);
}

export default ListProducts