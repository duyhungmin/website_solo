import React from 'react'
import { Navigate } from 'react-router-dom'

const GuardAdmin = ({children}) => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    console.log(token)
    console.log(user)

    if(!token || !user){
        return <Navigate to={"/login"} replace/>
    }

    if(user.role !== "admin"){
        return <Navigate to={"/"} replace/>
    }
  return children
}

export default GuardAdmin