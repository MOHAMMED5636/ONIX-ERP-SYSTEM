import React from "react";
import { UserCircleIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Navbar({ lang, dir, onLangToggle }) {
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-4 py-2 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/onix-bg.png" alt="Logo" className="h-8 w-8 rounded-full" />
        <span className="font-bold text-cyan-800 text-lg">ERP Admin</span>
      </div>
      {/* Language toggle */}
      <button
        onClick={onLangToggle}
        className="flex items-center gap-1 border border-cyan-700 rounded px-3 py-1 text-xs font-bold text-cyan-700 hover:bg-cyan-50 transition"
      >
        <GlobeAltIcon className="h-4 w-4" />
        {lang === "en" ? "EN | AR" : "AR | EN"}
      </button>
      {/* User avatar */}
      <div className="flex items-center gap-2">
        <UserCircleIcon className="h-8 w-8 text-cyan-700" />
        <span className="hidden sm:inline font-medium text-cyan-900">Admin</span>
      </div>
    </header>
  );
} 