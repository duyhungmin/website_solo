import { Plus, Image, Tag, DollarSign, Layers, CheckCircle, Trash2  } from 'lucide-react'
import React from 'react'
// import axios from 'axios'
import {useForm, useFieldArray} from 'react-hook-form'
import {productAPI} from "../api/products.api"
import { useNavigate} from 'react-router-dom'
const AddProductAdmin = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors },control } = useForm({
    defaultValues :{
      variants :[
        {
          sku :'',
          price:'',
          attribute:'',
          stock:'',
          image:''
        }
      ]
    }
  })

  const {fields, append , remove} = useFieldArray({
    control,
    name:'variants'
  })

  const onSubmit = async (data)=>{

    try {
      const res = await productAPI.createProduct(data)
      console.log('Product added:', res.data)
      window.alert('Product added successfully')
      navigate('/admin/products')
    } catch (error) {
      
      console.error('Error adding product:', error)
      window.alert('Failed to add product')

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
          
        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Image size={16} /> Image URL
          </label>
          <input
            type="text"
            placeholder="https://image-url"
            {...register('images',{ required: "Bắt buộc nhập URL hình ảnh sản phẩm" })}
            className="mt-2 w-full rounded-lg border px-4 py-2"
          />
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}  
         
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

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers /> Variants
            </h2>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4 p-4 border rounded-lg"
              >
                <input
                  placeholder="SKU"
                  {...register(`variants.${index}.sku`, { required: true })}
                  className="input"
                />

                <input
                  type="number"
                  placeholder="Price"
                  {...register(`variants.${index}.price`, { required: true })}
                  className="input"
                />

                <input
                  placeholder="Attribute (Color / Size...)"
                  {...register(`variants.${index}.attribute`, { required: true })}
                  className="input"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  {...register(`variants.${index}.stock`, { required: true })}
                  className="input"
                />

                <div className="flex gap-2">
                  <input
                    placeholder="Image URL"
                    {...register(`variants.${index}.image`)}
                    className="input"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({ sku: '', price: '', attribute: '', stock: '', image: '' })
              }
              className="flex items-center gap-2 text-sm text-blue-600"
            >
              <Plus size={16} /> Add Variant
            </button>
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

export default AddProductAdmin
