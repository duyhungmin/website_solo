import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { UseCart } from '../../context/cartContext'
import React from 'react'

const Login = () => {

    const navigate = useNavigate()
    const {register,handleSubmit,formState:{errors}} = useForm()
    const { fetch, setIsLoggedin } = UseCart();

    const OnLogin = async(data)=>{
        try {
            
            const response = await axios.post('http://localhost:3000/users/login', data)
            console.log(response.data)
            console.log(response.data.data.role)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.data))
            setIsLoggedin(true)
            fetch()
            window.alert("Đăng nhập thành công")
            
            if(response.data.data.role === "admin") {
                
                navigate('/admin')
            }else{
                navigate('/')
            }
        


        } catch (error) {
            
            console.log("err",error)
            window.alert("lỗi")

        }
    }

 return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
<LogIn /> Login
</h1>


<form onSubmit={handleSubmit(OnLogin)} className="space-y-5">
<div>
<label className="text-sm text-gray-600 flex items-center gap-2">
<Mail size={16} /> Email
</label>
<input
    type="email"
   {...register("email",{
            required:"Email is required",
            pattern:{
                value:/^\S+@\S+\.\S+$/,
                message:"Please use a valid email address"
            }
        })}
   placeholder="example@email.com"
   className="mt-2 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-gray-900"
/>

   {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
</div>


<div>
<label className="text-sm text-gray-600 flex items-center gap-2">
<Lock size={16} /> Password
</label>

<input
type="password"
placeholder="••••••••"
{...register("password",{
            required:"Password is required",
            minLength:{
                value:6,
                message:"Password must be at least 6 characters"
            }
        })}

className="mt-2 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-gray-900"
/>
 {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
</div>


<button className="w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">
Login
</button>
</form>


<p className="text-sm text-center text-gray-500 mt-5">
Chưa có tài khoản?{' '}
<Link to="/register" className="text-gray-900 font-medium hover:underline">
Đăng ký
</Link>
</p>
</div>
</div>
)

}
export default Login