import React from 'react'
import ListProductAdmin from '../admin/pages/listProductAdmin.jsx';  
import DashboardAdmin from '../admin/layouts/dashboardAdmin.jsx';
import DashboardOverview from '../admin/pages/dashboardOverview.jsx';
import AddProductAdmin from '../admin/pages/addProductAdmin.jsx';
import EditProductAdmin from '../admin/pages/editProductAdmin.jsx';
import { Route , Routes} from 'react-router-dom';
import AdminOrders from './pages/adminOrders.jsx';
import GuardAdmin from './guardAdmin.jsx';
const RouteAdmin = () => {
  return (
    <Routes>
      <></>
      <Route path="/" element={<DashboardAdmin />}>
        <Route index element={<DashboardOverview />} />
        <Route path="products" element={<ListProductAdmin />} />
        <Route path="add" element={<AddProductAdmin />} />
        <Route path="edit/:id" element={<EditProductAdmin />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
)
}

export default RouteAdmin