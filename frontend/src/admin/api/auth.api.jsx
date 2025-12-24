import ClientAxios from "./axiosClient"

export const userApi = {

    registerUser : (data)=> ClientAxios.post("/users/register",data),
    
    loginUser : (data)=> ClientAxios.post("/users/login",data)

}