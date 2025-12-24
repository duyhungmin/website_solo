import ClientAxios from "./axiosClient";

export const checkOutCartApi = {

    createCheckOutCart : (data)=> ClientAxios.post("/check-out",data),
    
    getCartDetail : (id)=> ClientAxios.get(`/check-out/orders/${id}`),

    updateStatus : (id , status) => ClientAxios.patch(`/check-out/orders/${id}/status`,{status}),

    getAllOrders : () => ClientAxios.get('/check-out/orders/list/client'),

    getAllOrdersbyAdmin : (page , limit) => ClientAxios.get(`/check-out/admin/orders?page=${page}&limit=${limit}`)
}