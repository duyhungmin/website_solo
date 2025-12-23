import ClientAxios from "./axiosClient";

export const cartAPI = {

addToCart : (data) => ClientAxios.post("/cart/add",data),
getCart : () => ClientAxios.get("/cart"),
updateQuantity : (data)=> ClientAxios.patch("/cart/update-quantity",data)

}