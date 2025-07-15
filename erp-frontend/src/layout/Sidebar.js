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
      className={`fixed top-0 ${dir === "rtl" ? "right-0" : "left-0"} h-full bg-cyan-900 text-white z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-48"} flex flex-col`}
    >
      <button
        className="p-3 focus:outline-none hover:bg-cyan-800"
        onClick={onToggle}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <Bars3Icon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
      </button>
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-cyan-800 transition text-sm font-medium"
              title={item.label[lang]}
            >
              <Icon className="h-6 w-6" />
              {!collapsed && <span>{item.label[lang]}</span>}
            </a>
          );
        })}
      </nav>
    </aside>
  );
} 