import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import DashboardLayout from "../layout/DashboardLayout";
import AdminMessagePopup from "../components/AdminMessagePopup";

function PieChart({ colors = ["#a78bfa", "#fbbf24", "#f87171"], size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className="mx-auto">
      <circle r="16" cx="16" cy="16" fill={colors[0]} />
      <path d="M16 16 L16 0 A16 16 0 0 1 32 16 Z" fill={colors[1]} />
      <path d="M16 16 L32 16 A16 16 0 0 1 16 32 Z" fill={colors[2]} />
    </svg>
  );
}

function DashboardCard({ title, value, icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-start min-w-[140px] min-h-[90px] border border-gray-100 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-indigo-500">{icon}</span>}
        <span className="text-lg font-bold text-gray-800">{title}</span>
      </div>
      <div className="text-3xl font-extrabold text-gray-900">{value}</div>
      {children}
    </div>
  );
}

// Dummy event data
const eventData = {
  '2024-07-10': [{ title: 'Task Due', status: 'In Progress' }],
  '2024-07-15': [{ title: 'Project Review', status: 'Done' }],
  '2024-07-22': [{ title: 'ERP Message', status: 'Delayed' }],
};

function CalendarWidget({ onDateClick }) {
  const [value, setValue] = useState(new Date());
  // Helper to format date as yyyy-mm-dd
  const formatDate = d => d.toISOString().split('T')[0];
  return (
    <div className="mt-8">
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={({ date, view }) => {
          const key = formatDate(date);
          if (eventData[key]) {
            return <span className="block w-2 h-2 mx-auto mt-1 rounded-full bg-indigo-500"></span>;
          }
          return null;
        }}
        onClickDay={date => {
          const key = formatDate(date);
          if (eventData[key]) onDateClick(key);
        }}
        className="rounded-2xl border-none w-full"
      />
    </div>
  );
}

function RightWidgetBox({ onDateClick }) {
  return (
    <aside className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 w-full max-w-xs mx-auto mb-6">
      <h4 className="font-bold text-gray-700 mb-4 text-lg">Quick Links</h4>
      <ul className="space-y-3 text-base">
        <li><a href="#" className="text-indigo-600 hover:underline">My Parcels</a></li>
        <li><a href="#" className="text-indigo-600 hover:underline">Inspection Reports</a></li>
        <li><a href="#" className="text-indigo-600 hover:underline">Payments</a></li>
        <li><a href="#" className="text-indigo-600 hover:underline">Building Services</a></li>
      </ul>
      <div className="mt-6 border-t pt-3 text-xs text-gray-400">Company: ONIX Engineering</div>
      <CalendarWidget onDateClick={onDateClick} />
    </aside>
  );
}

function AdminMessageModal({ open, onClose, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-indigo-700 mb-2">{message.title}</h2>
        <div className="text-gray-700 mb-2">{message.body}</div>
      </div>
    </div>
  );
}

export default function Dashboard({ lang, dir, onLangToggle }) {
  const [selectedDate, setSelectedDate] = useState(null);
  // Admin message popup state
  const [showAdminMsg, setShowAdminMsg] = useState(() => {
    return localStorage.getItem('adminMsgRead') !== 'true';
  });
  const adminMessage = {
    title: 'Welcome to the ERP Dashboard!',
    body: 'Please review your pending tasks and check the calendar for upcoming events. Contact admin for any urgent issues.'
  };
  const handleCloseAdminMsg = () => {
    setShowAdminMsg(false);
    localStorage.setItem('adminMsgRead', 'true');
  };

  return (
    <DashboardLayout lang={lang} dir={dir} onLangToggle={onLangToggle}>
      <AdminMessagePopup title="Admin Message" message="System will be down Sunday 2:00 AM" />
      <AdminMessageModal open={showAdminMsg} onClose={handleCloseAdminMsg} message={adminMessage} />
      <div
        className="relative min-h-screen overflow-auto flex flex-col lg:flex-row gap-8"
        style={{
          backgroundImage: 'url("/onix-bg.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '40%',
          backgroundAttachment: 'fixed',
          opacity: 1,
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.85)' }} />
        <div className="relative flex-1 flex flex-col gap-8 z-10">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Active Employees" value="61" />
            <DashboardCard title="Active Contracts" value="424" />
            <DashboardCard title="Your Daily Attendance" value={<span className="text-base font-normal">Check-In / Check-Out</span>} />
            <DashboardCard title="Active Tasks" value="0" />
            <DashboardCard title="Team Active Tasks" value={<span><span className="text-yellow-500 font-bold">153</span> <span className="text-xs">Pending</span> <span className="text-indigo-600 font-bold ml-2">211</span> <span className="text-xs">In Progress</span></span>} className="col-span-1 sm:col-span-2 lg:col-span-1" />
          </div>
          {/* Balance Sheet & Invoice Pending Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-gray-700 font-bold mb-4 text-lg">Balance Sheet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select className="border rounded p-2 w-full bg-gray-50">
                  <option>Furnitures and fittings</option>
                </select>
                <select className="border rounded p-2 w-full bg-gray-50">
                  <option>Loans</option>
                </select>
                <select className="border rounded p-2 w-full bg-gray-50">
                  <option>Clients</option>
                </select>
                <select className="border rounded p-2 w-full bg-gray-50">
                  <option>Imprest and Insurance</option>
                </select>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-gray-700 font-bold mb-4 text-lg">Invoice Pending Payments</h3>
              <div className="text-gray-400">No Record / No Data</div>
            </div>
          </div>
          {/* Unusual Attendance & Reminders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-gray-700 font-bold mb-4 text-lg">Unusual Attendance</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2 text-left">Name</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">OMAR SHAKAN</td>
                    <td className="py-2 text-red-400">No Record</td>
                    <td className="py-2"><button className="bg-indigo-50 text-indigo-600 rounded px-3 py-1 text-xs">View</button></td>
                  </tr>
                  <tr>
                    <td className="py-2">KARAM ALMAKDISI</td>
                    <td className="py-2 text-red-400">No Record</td>
                    <td className="py-2"><button className="bg-indigo-50 text-indigo-600 rounded px-3 py-1 text-xs">View</button></td>
                  </tr>
                  <tr>
                    <td className="py-2">KARAM ALHUSSEIN</td>
                    <td className="py-2 text-red-400">No Record</td>
                    <td className="py-2"><button className="bg-indigo-50 text-indigo-600 rounded px-3 py-1 text-xs">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-gray-700 font-bold mb-4 text-lg">Upcoming Reminders</h3>
              <div className="text-gray-400">No Record / No Data</div>
            </div>
          </div>
          {/* Last Month Task Summary with Pie Charts */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-gray-700 font-bold mb-6 text-lg">Last Month Tasks Summary</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="flex-1 flex flex-col items-center">
                <PieChart />
                <div className="mt-2 text-xs text-gray-500">Tasks Status</div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <PieChart colors={["#fbbf24", "#a78bfa", "#f87171"]} />
                <div className="mt-2 text-xs text-gray-500">Tasks Completion State</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right-side widget box */}
        <div className="relative w-full lg:w-80 flex-shrink-0 z-10">
          <RightWidgetBox onDateClick={setSelectedDate} />
        </div>
      </div>
    </DashboardLayout>
  );
} 