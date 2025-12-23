import React from 'react';
import { Route , Routes} from 'react-router-dom';
import RouteAdmin from './admin/routeAdmin';
import RouteClient from './client/routeClient';
import GuardAdmin from './admin/guardAdmin';
// import AdminRoutes from './admin/routes.jsx';
function App() {
  return (

      <Routes>

        <Route path="/*" element={<RouteClient />} />

        <Route path="/admin/*" element={

              <GuardAdmin><RouteAdmin/></GuardAdmin>

        } />
      
      </Routes>

  )
}

export default App
 