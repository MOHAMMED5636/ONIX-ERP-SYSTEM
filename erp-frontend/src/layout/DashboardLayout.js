import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ lang, dir, onLangToggle, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);

  // Responsive sidebar collapse on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Navbar lang={lang} dir={dir} onLangToggle={onLangToggle} />
      <div className="flex flex-1">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
          lang={lang}
          dir={dir}
        />
        <main className={`flex-1 p-2 md:p-6 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-48'} ${dir === 'rtl' ? (sidebarCollapsed ? 'mr-16' : 'mr-48') : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
} 