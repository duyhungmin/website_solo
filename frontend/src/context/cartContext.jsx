import { createContext, useContext, useEffect, useState } from "react";
import { cartAPI } from "../admin/api/cart.api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalPrice: 0,
    status: "active"
  });

  const logout = async () => {
    setCart({
      items: [],
      totalPrice: 0,
      status: "active"
    });
    localStorage.removeItem("token");
  };

  const fetch = async () => {
    try {
      const res = await cartAPI.getCart();

      setCart({
        items: res.data.items || [],
        totalPrice: res.data.totalPrice || 0,
        status: res.data.status || "active"
      });
    } catch (error) {
      console.log("loi roi e oi", error);

      // fallback an toàn
      setCart({
        items: [],
        totalPrice: 0,
        status: "active"
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const cartCount = cart.items.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, cartCount, fetch, logout }}>
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => useContext(CartContext);
