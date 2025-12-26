import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, Menu , LogOut ,LogIn, UserPlus}  from "lucide-react";
import {UseCart} from "../../context/cartContext"

const HeaderClient = () => {
    
        // const {cartCount} = UseCart()
        const navigate = useNavigate()
        const {logout , cartCount , isLoggedin} = UseCart()

        const handleLogout = ()=>{
          logout()
          navigate("/")
        }

        return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center gap-2">
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
        <Menu className="h-5 w-5" />
        </button>
        <button onClick={()=>navigate("/")} className="text-xl font-bold tracking-wide">FASHION</button>
        </div>


        {/* Center */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#" className="hover:text-black text-gray-600">Nam</a>
        <a href="#" className="hover:text-black text-gray-600">Nữ</a>
        <a href="#" className="hover:text-black text-gray-600">Trẻ em</a>
        <a href="#" className="hover:text-black text-gray-600">Sale</a>
        </nav>


        {/* Right */}
        <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
        <Search className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
        <Heart className="h-5 w-5" />
        </button>

  {/* 👉 CHƯA LOGIN */}
          {!isLoggedin && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
              >
                <LogIn size={16} />
                Đăng nhập
              </button>

              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border"
              >
                <UserPlus size={16} />
                Đăng ký
              </button>
            </>
          )}
  {/* 👉 ĐÃ LOGIN */}
          {isLoggedin && (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-lg hover:bg-gray-100"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50"
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </>
          )}
        </div>
        </div>
        </header>
        );
}

export default HeaderClient