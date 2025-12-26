import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../client/pages/register.jsx'
import Login from '../client/pages/login.jsx'
import MainClient from './layouts/mainClient.jsx'
import ListProducts from './pages/ListProducts.jsx'
import ListProductsDetails from './pages/listProductsDetails.jsx'
import CartPage from './pages/cartProduct.jsx'
import Checkout from './pages/checkOutCart.jsx'
import OrderSuccess from './pages/oderSuccess.jsx'
import OrderDetail from './pages/OderDetail.jsx'
import AllOrderUser from './pages/allOrderUser.jsx'
import MockPayment from './pages/mock-payment.jsx'
export const RouteClient = () => {
  return (
    <Routes>  
        <Route path='/' element={<MainClient/>}>
          <Route index element={<ListProducts/>}/>
          <Route path='details-product/:id' element={<ListProductsDetails/>}/>
          <Route path='cart' element={<CartPage/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='/oder-success/:id' element={<OrderSuccess/>}/>
          <Route path='/oder-details/:id' element={<OrderDetail/>}/>
          <Route path='/oder-user' element={<AllOrderUser/>}/>
          <Route path='/mock-payment/:orderId' element={<MockPayment/>}/>

        </Route>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
     
  
    </Routes>
  )
}

export default RouteClient