import { Outlet } from "react-router-dom";
import FooterClient from "./footerClient";
import HeaderClient from "./headerClient";
import SidebarClient from "./sidebarClient";

import React from 'react'

const MainClient = () => {

   return (
<div className="flex min-h-screen flex-col">
{/* Header */}
<HeaderClient />


{/* Body */}
<div className="flex flex-1">
{/* Sidebar */}
<SidebarClient />


{/* Main Content */}
<main className="flex-1 bg-gray-50 p-6">
<Outlet />
</main>
</div>


{/* Footer */}
<FooterClient />
</div>
);


}

export default MainClient