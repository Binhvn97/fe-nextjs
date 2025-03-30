"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-slate-950 text-white flex items-center justify-evenly p-2">
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Web logo"
          width={50}
          height={50}
          priority
        />
      </div>

      <ul className="flex text-lg gap-8">
        <li className="hover:text-gray-300 cursor-pointer">Home</li>
        <li className="hover:text-gray-300 cursor-pointer">Products</li>
        <li className="hover:text-gray-300 cursor-pointer">About</li>
        <li className="hover:text-gray-300 cursor-pointer">Contact</li>
      </ul>

      <div className="flex gap-4">
        <Search className="w-6 h-6 cursor-pointer hover:text-gray-300" />
        <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-300" />
        <User className="w-6 h-6 cursor-pointer hover:text-gray-300" />
      </div>
    </nav>
  );
}