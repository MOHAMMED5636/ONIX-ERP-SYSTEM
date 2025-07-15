import React from "react";
import { UserCircleIcon, GlobeAltIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Navbar({ lang, dir, onLangToggle }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Optionally clear auth state here
    navigate("/login");
  };
  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-4 py-2 z-40 rounded-b-2xl border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/onix-bg.png" alt="Logo" className="h-9 w-9 rounded-full border border-gray-200" />
      </div>
      {/* Search bar (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-80">
          <input
            type="text"
            placeholder={lang === "ar" ? "بحث..." : "Search..."}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-sm"
            dir={dir}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      {/* Right controls: ERP Admin, Language, Profile, Logout */}
      <div className="flex items-center gap-x-4 py-2">
        <span className="font-bold text-indigo-700 text-xl tracking-tight flex items-center">ERP Admin</span>
        <button
          onClick={onLangToggle}
          className="flex items-center gap-1 border border-indigo-500 rounded px-3 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition"
        >
          <GlobeAltIcon className="h-4 w-4" />
          {lang === "en" ? "EN | ع" : "ع | EN"}
        </button>
        <button className="flex items-center gap-2 focus:outline-none">
          <UserCircleIcon className="h-9 w-9 text-indigo-500" />
          <span className="hidden sm:inline font-medium text-gray-700">Admin</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 border border-red-400 text-red-600 rounded px-3 py-1 text-xs font-bold hover:bg-red-50 transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
} 