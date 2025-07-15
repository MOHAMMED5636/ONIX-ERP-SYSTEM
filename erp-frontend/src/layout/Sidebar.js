import React from "react";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { key: "dashboard", icon: HomeIcon, label: { en: "Dashboard", ar: "لوحة التحكم" }, path: "/dashboard" },
  { key: "employees", icon: UsersIcon, label: { en: "Employees", ar: "الموظفون" }, path: "/employees" },
  { key: "tasks", icon: ClipboardDocumentListIcon, label: { en: "Tasks", ar: "المهام" }, path: "/tasks" },
  { key: "attendance", icon: CalendarDaysIcon, label: { en: "Attendance", ar: "الحضور" }, path: "/attendance" },
  { key: "leaves", icon: DocumentTextIcon, label: { en: "Leaves", ar: "الإجازات" }, path: "/leaves" },
  { key: "contracts", icon: DocumentTextIcon, label: { en: "Contracts", ar: "العقود" }, path: "/contracts" },
  { key: "balance", icon: ChartPieIcon, label: { en: "Balance", ar: "الميزانية" }, path: "/balance" },
  { key: "settings", icon: Cog6ToothIcon, label: { en: "Settings", ar: "الإعدادات" }, path: "/settings" },
];

export default function Sidebar({ collapsed, onToggle, lang, dir }) {
  return (
    <aside
      className={`fixed top-0 ${dir === "rtl" ? "right-0" : "left-0"} h-full bg-white shadow-md border-r border-gray-100 z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-20"} flex flex-col rounded-r-2xl`}
    >
      <button
        className="p-3 focus:outline-none hover:bg-indigo-50 rounded-full mx-auto mt-2"
        onClick={onToggle}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <Bars3Icon className="h-6 w-6 text-indigo-500" /> : <XMarkIcon className="h-6 w-6 text-indigo-500" />}
      </button>
      <nav className="flex-1 flex flex-col gap-2 mt-4 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href={item.path}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl hover:bg-indigo-50 transition text-indigo-500 mb-2"
              title={item.label[lang]}
            >
              <Icon className="h-6 w-6" />
              {/* Hide label for minimalist look */}
            </a>
          );
        })}
      </nav>
    </aside>
  );
} 