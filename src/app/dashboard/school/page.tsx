"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

// Lucide Icons
import {
  Home,
  Users,
  User,
  BookOpen,
  Calendar,
  Settings,
  Newspaper,
  LogOut,
  Menu,
  Search,
  BarChart as LucideBarChart, // Only for icon usage
} from "lucide-react";

// Custom Components
import PerformanceChart from "@/components/charts/PerformanceChart";

// Recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import DashboardCalendar from "@/components/DashboardCalendar";


const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type ChartRow = { month: string; thisWeek: number; lastWeek: number };


export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 sm:p-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2 sm:mt-0">
            Welcome Back, Code Flex
          </h1>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 bg-white color-blue rounded-full border shadow border-white focus:outline-none focus:border-blue-400"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-800" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow">
            <div className="p-2 sm:p-3 rounded-full bg-indigo-600 text-white">
              <Users size={18} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Students</p>
              <p className="text-lg sm:text-2xl font-bold">0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow">
            <div className="p-2 sm:p-3 rounded-full bg-red-400 text-white">
              <User size={18} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Teachers</p>
              <p className="text-lg sm:text-2xl font-bold">0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow">
            <div className="p-2 sm:p-3 rounded-full bg-yellow-400 text-white">
              <Calendar size={18} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Classes</p>
              <p className="text-lg sm:text-2xl font-bold">0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow">
            <div className="p-2 sm:p-3 rounded-full bg-indigo-800 text-white">
              <BookOpen size={18} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Subjects</p>
              <p className="text-lg sm:text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

{/* Main Content Area */}
<div className="space-y-6">
  {/* Performance Chart - Full width */}
  <div className="bg-white p-4 rounded-xl shadow">
  
    <PerformanceChart />
  </div>

  {/* Calendar and Finance Charts - Side by side */}
  <div className="flex flex-col lg:flex-row gap-4">
    {/* Left - Calendar */}
    <div className="lg:w-1/3">
      <DashboardCalendar />
    </div>

    {/* Right - Finance Bar Chart */}
    <div className="lg:w-2/3 bg-white p-4 text-md rounded-xl shadow">
      <h2 className="text-md font-poppins font-semibold mb-4">School Finance</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={[
            { day: "Mon", lastWeek: 50, thisWeek: 70 },
            { day: "Tue", lastWeek: 40, thisWeek: 55 },
            { day: "Wed", lastWeek: 35, thisWeek: 70 },
            { day: "Thu", lastWeek: 60, thisWeek: 80 },
            { day: "Fri", lastWeek: 45, thisWeek: 60 },
          ]}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Tooltip />
          <Legend verticalAlign="top" align="right" />
          <Bar dataKey="lastWeek" name="Last Week" fill="#EF4444" barSize={20} radius={[10, 10, 0, 0]} />
          <Bar dataKey="thisWeek" name="This Week" fill="#FACC15" barSize={20} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
        {/* Upcoming Events - Shows below on mobile */}
        <div className="bg-white p-4 rounded-xl shadow mt-6 lg:hidden">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center gap-3 p-2 border rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                  <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}