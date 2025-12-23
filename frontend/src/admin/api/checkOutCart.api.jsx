import ClientAxios from "./axiosClient";

export const checkOutCartApi = {

    createCheckOutCart : (data)=> ClientAxios.post("/check-out",data),
    
    getCartDetail : (id)=> ClientAxios.get(`/check-out/orders/${id}`)

}