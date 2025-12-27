import { Edit, Trash2, Eye } from 'lucide-react'
import React from 'react'
import { useState, useEffect } from 'react'
// import axios from 'axios'
import { productAPI } from '../api/products.api'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
const ListProductAdmin = () => {

  const navigate = useNavigate()
  // const { id } = useParams()

  const [selectProduct ,setSelectProduct] = useState(null)

  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProduct()
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])


  const handleDelete = async(id)=>{
   
    if(window.confirm('Are you sure you want to delete this product?')){
       try {

      await productAPI.deleteProduct(id)
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id))
      window.alert('Product deleted successfully')


    } catch (error) {
      console.error('Error deleting product:', error)
      window.alert('Failed to delete product')
    }

  }
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Products
        </h2>
        <button onClick={()=>navigate('/admin/add')} className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-800">
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-3 text-left">Name</th> 
              <th className="px-5 py-3 text-left">Variants</th>
              <th className="px-5 py-3 text-left">Brand</th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Images</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
                  <tr className="border-b last:border-none hover:bg-gray-50">
        <td className="px-5 py-4 font-medium text-gray-800">
          {p.name}
        </td>

        {/* VARIANTS */}
        <td className="px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {p.variants?.slice(0, 2).map((v, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700"
              >
                {v.attribute} · ${v.price}
              </span>
            ))}

            {p.variants?.length > 2 && (
              <span className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-600">
                +{p.variants.length - 2} more
              </span>
            )}
          </div>
        </td>

        <td className="px-5 py-4">{p.brand}</td>
        <td className="px-5 py-4">{p.category}</td>
        <td className="px-5 py-4">{p.images}</td>

        <td className="px-5 py-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${
                p.status === 'In Stock'
                  ? 'bg-green-100 text-green-600'
                  : p.status === 'Out of Stock'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}
          >
            {p.status}
          </span>
        </td>

        <td className="px-5 py-4">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelectProduct(p)}
              className="text-gray-500 hover:text-blue-600"
            >
              <Eye size={18} />
            </button>

            <button
              onClick={() => navigate(`/admin/edit/${p._id}`)}
              className="text-gray-500 hover:text-yellow-500"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={() => handleDelete(p._id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
                  </tr>

            ))}
          </tbody>
        </table>
        {selectProduct && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[520px] p-5">
      <h3 className="text-lg font-semibold mb-4">
        Variants – {selectProduct.name}
      </h3>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {selectProduct.variants.map((v, i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">{v.attribute}</p>
              <p className="text-sm text-gray-500">SKU: {v.sku}</p>
              <p className="text-sm text-gray-500">image: {v.image}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">${v.price}</p>
              <p className="text-sm text-gray-500">
                Stock: {v.stock}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSelectProduct(null)}
        className="mt-4 w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  )
}

export default ListProductAdmin
