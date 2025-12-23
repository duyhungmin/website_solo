import React from 'react'
import { Shirt, Flame, Sparkles, Baby, Tag } from "lucide-react";

const categories = [
{ name: "Hàng mới", icon: Sparkles },
{ name: "Bán chạy", icon: Flame },
{ name: "Nam", icon: Shirt },
{ name: "Nữ", icon: Shirt },
{ name: "Trẻ em", icon: Baby },
{ name: "Sale", icon: Tag },
];

const SidebarClient = () => {
    return (
           <aside className="hidden md:block w-64 border-r bg-white sticky top-16 h-screen self-start">
            <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Danh mục</h2>
            <ul className="space-y-2">
            {categories.map((item) => (
            <li key={item.name}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
            </button>
            </li>
            ))}
            </ul>
            </div>
            </aside>
);
}

export default SidebarClient