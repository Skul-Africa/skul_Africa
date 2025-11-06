"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import {
  Home,
  Users,
  User,
  BookOpen,
  Calendar,
  Settings,
  Newspaper,
  LogOut,
  WifiOff,
  MessageSquare,
} from "lucide-react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface DashboardSidebarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export default function DashboardSidebar({
  currentView = "students",
  onNavigate,
}: DashboardSidebarProps) {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("School Admin");
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let name: string | null = localStorage.getItem("school_name");

    if (!name) {
      const token = localStorage.getItem("school_token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          name =
            payload?.schoolName ||
            payload?.school ||
            payload?.name ||
            payload?.school_name ||
            "School Admin";
        } catch {
          name = "School Admin";
        }
      } else {
        name = "School Admin";
      }
    }

    setSchoolName(name || "School Admin");
    localStorage.setItem("school_name", name || "School Admin");

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };
  const [showMore, setShowMore] = useState(false);


  const handleNavigation = (view: string) => {
    if (onNavigate) onNavigate(view);
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "students", label: "Students", icon: Users },
    { key: "teachers", label: "Teachers", icon: User },
    { key: "classes", label: "Classes", icon: Calendar },
    { key: "subjects", label: "Subjects", icon: BookOpen },
    { key: "events", label: "Events", icon: Calendar },
    { key: "settings", label: "Settings", icon: Settings },
    { key: "news", label: "News", icon: Newspaper },
    { key: "feedback", label: "Feedback", icon: MessageSquare },
  ];

  return (
    <>
      {/* 📱 Bottom Navbar (Mobile Only) */}
    {/* 📱 Bottom Navbar (Mobile Only) */}
<nav className="sm:hidden fixed bottom-0 left-0 w-full bg-[#073B7F] text-white flex justify-around items-center h-14 shadow-lg z-50">
  {[
    { key: "dashboard", icon: Home },
    { key: "students", icon: Users },
    { key: "teachers", icon: User },
    { key: "classes", icon: Calendar },
  ].map(({ key, icon: Icon }) => (
    <button
      key={key}
      onClick={() => handleNavigation(key)}
      className={`flex flex-col items-center text-xs ${
        currentView === key ? "text-yellow-300" : "text-white"
      }`}
    >
      <Icon size={20} />
      <span className="text-[10px] capitalize">{key}</span>
    </button>
  ))}

  {/* ➕ More Button */}
  <button
    onClick={() => setShowMore((prev) => !prev)}
    className="flex flex-col items-center text-xs text-white"
  >
    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
      <span className="text-lg font-bold">+</span>
    </span>
    <span className="text-[10px]">More</span>
  </button>

  {/* Popup Menu */}
  {showMore && (
    <div className="absolute bottom-16 left-0 right-0 mx-auto w-[90%] bg-white text-[#073B7F] rounded-2xl shadow-lg py-2 animate-fade-in">
      {[
        { key: "subjects", label: "Subjects", icon: BookOpen },
        { key: "events", label: "Events", icon: Calendar },
        { key: "settings", label: "Settings", icon: Settings },
        { key: "news", label: "News", icon: Newspaper },
        { key: "feedback", label: "Feedback", icon: MessageSquare },
      ].map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => {
            handleNavigation(key);
            setShowMore(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-[#073B7F]/10"
        >
          <Icon size={18} />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  )}
</nav>


      {/* 💻 Sidebar (Desktop Only) */}
      <aside className="hidden sm:flex flex-col justify-between bg-[#073B7F] text-white w-48 h-screen fixed left-0 top-0 transition-all duration-300 z-40">
        {/* Logo */}
        <div>
          <h2
            className={`${poppins.className} flex items-center justify-center gap-3 text-2xl font-semibold py-6`}
          >
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
              <Image src="/logo.png" alt="Skul Africa Logo" width={28} height={28} priority />
            </div>
            <span>Skul Africa</span>
          </h2>

          {/* Menu */}
          <nav>
            <ul className="space-y-1">
              {menuItems.map(({ key, label, icon: Icon }) => (
                <li
                  key={key}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer ${
                    currentView === key
                      ? "bg-white rounded-l-full text-[#073B7F]"
                      : "hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation(key)}
                >
                  <Icon size={18} />
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* User + Offline + Logout */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3 relative">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {schoolName ? schoolName.charAt(0).toUpperCase() : "S"}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm truncate max-w-[120px]">{schoolName}</p>
              <p className="text-xs opacity-75">{isOffline ? "Offline" : "Admin"}</p>
            </div>

            {isOffline && (
              <div className="absolute right-0 top-0 flex items-center gap-1 text-xs bg-red-600 px-2 py-0.5 rounded-full">
                <WifiOff size={12} />
                <span>Offline</span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 hover:bg-white border hover:text-[#073B7F] bg-[#073B7F] border-white text-white w-full py-1.5 rounded-full font-semibold text-sm"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
