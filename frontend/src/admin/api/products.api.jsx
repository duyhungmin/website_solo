// import ClientAxios from "./axiosClient"
import ClientAxios from "./axiosClient";
// export const getAllProducts = ()=>{
   
//     return ClientAxios.get('/products');
   
export const productAPI = {


    getAllProduct : ()=> ClientAxios.get("/products"),

    getProductById : (id)=> ClientAxios.get(`/products/${id}`),

    createProduct : (data)=> ClientAxios.post("/products",data),

    updateProduct : (id,data)=> ClientAxios.put(`/products/${id}`,data),

    deleteProduct : (id)=> ClientAxios.delete(`/products/${id}`)


}
