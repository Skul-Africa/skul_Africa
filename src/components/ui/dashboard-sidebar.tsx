"use client"

import { useState } from "react"
import Image from "next/image"
import { Poppins } from "next/font/google"
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
} from "lucide-react"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

interface DashboardSidebarProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  currentView?: string
  onNavigate?: (view: string) => void
}

export default function DashboardSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  currentView = "students",
  onNavigate,
}: DashboardSidebarProps) {
  const handleNavigation = (view: string) => {
    if (onNavigate) {
      onNavigate(view)
    }
  }

  return (
    <aside
      className={`flex flex-col justify-between bg-[#073B7F] text-white w-16 sm:w-48 h-screen fixed left-0 top-0 transition-all duration-300 z-40
      ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
    >
      {/* Mobile menu toggle */}
      <button className="sm:hidden absolute right-2 top-2 p-1" onClick={() => setIsMobileMenuOpen(false)}>
        <Menu size={24} className="text-white" />
      </button>

      {/* Logo */}
      <div>
        <h2
          className={`${poppins.className} flex items-center justify-center gap-3 text-lg sm:text-2xl font-semibold py-6`}
        >
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
            <Image src="/logo.png" alt="Skul Africa Logo" width={28} height={28} priority />
          </div>
          <span className="hidden sm:inline">Skul Africa</span>
        </h2>

        {/* Menu */}
        <nav>
          <ul className="space-y-1">
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "dashboard" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("dashboard")}
            >
              <Home size={18} />
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "students" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("students")}
            >
              <Users size={18} />
              <span className="hidden sm:inline text-sm font-medium">Students</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "teachers" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("teachers")}
            >
              <User size={18} />
              <span className="hidden sm:inline text-sm">Teachers</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "classes" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("classes")}
            >
              <Calendar size={18} />
              <span className="hidden sm:inline text-sm">Classes</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "subjects" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("subjects")}
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline text-sm">Subjects</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "events" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("events")}
            >
              <Calendar size={18} />
              <span className="hidden sm:inline text-sm">Events</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "settings" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("settings")}
            >
              <Settings size={18} />
              <span className="hidden sm:inline text-sm">Settings</span>
            </li>
            <li
              className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-3 sm:px-4 py-3 cursor-pointer ${
                currentView === "news" ? "bg-white rounded-l-full text-[#073B7F]" : "hover:bg-white/10"
              }`}
              onClick={() => handleNavigation("news")}
            >
              <Newspaper size={18} />
              <span className="hidden sm:inline text-sm">News & Updates</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* User & Logout */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3 mb-3">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-sm">Code Flex</p>
            <p className="text-xs opacity-75">Admin</p>
          </div>
        </div>
        <button className="flex items-center justify-center sm:justify-center gap-2 hover:bg-white border hover:text-[#073B7F] bg-[#073B7F] border-white text-white w-full py-1.5 rounded-full font-semibold text-sm">
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </aside>
  )
}