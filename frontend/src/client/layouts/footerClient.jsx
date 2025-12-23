import { Mail, Phone, MapPin, Facebook, Instagram, Globe } from "lucide-react";

import React from 'react'

const FooterClient = () => {
 return (
<footer className="bg-gray-900 text-gray-300">
<div className="mx-auto max-w-7xl px-6 py-12">
<div className="grid gap-8 md:grid-cols-4">
{/* Logo */}
<div>
<h2 className="text-2xl font-bold text-white">FASHION</h2>
<p className="mt-3 text-sm text-gray-400">
Thời trang hiện đại – phong cách mỗi ngày. Chất lượng tạo nên uy tín.
</p>
</div>


{/* Contact */}
<div>
<h3 className="mb-4 text-lg font-semibold text-white">Liên hệ</h3>
<ul className="space-y-3 text-sm">
<li className="flex items-center gap-2">
<Mail className="h-4 w-4" /> support@fashion.vn
</li>
<li className="flex items-center gap-2">
<Phone className="h-4 w-4" /> 0123 456 789
</li>
<li className="flex items-center gap-2">
<MapPin className="h-4 w-4" /> Hà Nội, Việt Nam
</li>
</ul>
</div>


{/* Website */}
<div>
<h3 className="mb-4 text-lg font-semibold text-white">Website</h3>
<ul className="space-y-3 text-sm">
<li className="flex items-center gap-2 hover:text-white cursor-pointer">
<Globe className="h-4 w-4" /> www.fashion.vn
</li>
<li className="hover:text-white cursor-pointer">Chính sách bảo mật</li>
<li className="hover:text-white cursor-pointer">Điều khoản sử dụng</li>
</ul>
</div>


{/* Social */}
<div>
<h3 className="mb-4 text-lg font-semibold text-white">Kết nối</h3>
<div className="flex gap-4">
<button className="rounded-full bg-gray-800 p-2 hover:bg-gray-700">
<Facebook className="h-5 w-5" />
</button>
<button className="rounded-full bg-gray-800 p-2 hover:bg-gray-700">
<Instagram className="h-5 w-5" />
</button>
</div>
</div>
</div>


{/* Bottom */}
<div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
© {new Date().getFullYear()} FASHION. All rights reserved.
</div>
</div>
</footer>
);
}

export default FooterClient