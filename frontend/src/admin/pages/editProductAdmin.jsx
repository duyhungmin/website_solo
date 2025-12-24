import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import { Plus, Image, Tag, DollarSign, Layers, CheckCircle } from 'lucide-react'
// import axios from 'axios'
import { productAPI } from '../api/products.api'
// import { Plus, Tag, DollarSign, Layers, Image, CheckCircle } from 'react-feather'
import {  useEffect } from 'react'
const EditProductAdmin = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {register,handleSubmit,formState:{errors}, setValue} = useForm()
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productAPI.getProductById(id)
                const product = response.data
                console.log(product)
                setValue('name', product.name)
                setValue('description', product.description)
                setValue('price', product.price)
                setValue('brand', product.brand)
                setValue('attribute', product.attribute)
                setValue('image', product.image)
                setValue('category', product.category)
                setValue('status', product.status)
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }
        fetchProduct()
    }, [id, setValue])

    const onSubmit = async (data) => {
        try {
           await productAPI.updateProduct(id,data)
            window.alert('Product updated successfully')
            navigate('/admin/products')
        } catch (error) {
            console.error('Error updating product:', error)
        }
    }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <Plus /> Add Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Tag size={16} /> Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
          {...register('name',{ 
            required: "Bắt buộc nhập tên sản phẩm", 
            // trim: true,
            maxLength:{
              value: 100,
              message: 'Name cannot exceed 100 characters'
            }
          
          })}
            className="mt-2 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />      
           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
         
        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            rows="4"
            placeholder="Product description"
            {...register('description',{ 
              required: "Bắt buộc nhập mô tả sản phẩm", 
              maxLength:{
                value: 1000,
                message: 'Description cannot exceed 1000 characters'
              }
            })}
            className="mt-2 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        

        {/* Price & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign size={16} /> Price
            </label>
            <input
              type="number"
              placeholder="0.00"
              {...register('price',{ 
                required: "Bắt buộc nhập giá sản phẩm", 
                maxLength:{
                  value: 10,
                  message: 'Price cannot exceed 10 digits'
                }
              })
                }
              className="mt-2 w-full rounded-lg border px-4 py-2"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Brand</label>
            <input
              type="text"
              placeholder="Apple, Samsung..."
              {...register('brand',{ 
                required: "Bắt buộc nhập thương hiệu sản phẩm", 
                // trim: true,
                maxLength:{
                  value: 50,
                  message: 'Brand cannot exceed 50 characters'
                }
              })}
              className="mt-2 w-full rounded-lg border px-4 py-2"
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
          </div>
          
        </div>

        {/* Attribute */}
        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Layers size={16} /> Attributes
          </label>
          <input
            type="text"
            placeholder="Color, Size, Storage..."
            {...register('attribute',{ 
              required: "Bắt buộc nhập thuộc tính sản phẩm", 
            //   trim: true,
            })}
            className="mt-2 w-full rounded-lg border px-4 py-2"
          />
         {errors.attribute && <p className="text-red-500 text-sm mt-1">{errors.attribute.message}</p>}
        {/* Image */}
        </div>
 
        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Image size={16} /> Image URL
          </label>
          <input
            type="text"
            placeholder="https://image-url"
            {...register('image',{ required: "Bắt buộc nhập URL hình ảnh sản phẩm" })}
            className="mt-2 w-full rounded-lg border px-4 py-2"
          />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}  
         
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Category</label>
            <select  className="mt-2 w-full rounded-lg border px-4 py-2" 
            {...register('category',{ required: "Bắt buộc nhập danh mục sản phẩm", maxLength:{
              value: 50,
              message: 'Category cannot exceed 50 characters'
            }})}
            
            >
              <option>Phone</option>
              <option>Laptop</option>
              <option>Accessory</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle size={16} /> Status
            </label>
            <select className="mt-2 w-full rounded-lg border px-4 py-2"
            {...register('status',{ required: "Bắt buộc nhập trạng thái sản phẩm" })}
            >
              <option value="empty"></option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>
{errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            
        </div>
      {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={()=>navigate('/admin/products')}
            type="button"
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductAdmin