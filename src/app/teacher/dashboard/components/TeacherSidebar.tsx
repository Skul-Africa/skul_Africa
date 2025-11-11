"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  CheckSquare
} from "lucide-react";

export default function TeacherSidebar() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "subjects", label: "Subjects", icon: BookOpen },
    { key: "attendance", label: "attendance", icon: CheckSquare },
    { key: "teachersComingSoon", label: "My Classes", icon: Calendar },
    { key: "staffSettings", label: "Settings", icon: Settings },

  ];

  const handleNavigate = (key: string) => {
    setActive(key);
    router.push(`/teacher/${key}`);
  };

  const handleLogout = () => {
    if (confirm("Logout from dashboard?")) {
      localStorage.clear();
      router.push("/teacher/login");
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden md:flex flex-col justify-between 
          w-60 h-screen fixed left-0 top-0 z-40 
          bg-[#073B7F]/90 backdrop-blur-xl 
          shadow-2xl border-r border-white/10
          animate-slideIn
        "
      >
        {/* Logo */}
        <div>
          <h2 className="text-center text-2xl font-bold py-8 text-white tracking-wide drop-shadow-md">
            Teacher
          </h2>

          {/* Menu Items */}
          <ul className="space-y-2 px-3">
            {menuItems.map(({ key, label, icon: Icon }) => {
              const isActive = active === key;

              return (
                <li
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className={`
                    group flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer
                    transition-all duration-300
                    relative overflow-hidden
                    ${isActive ? "bg-white text-[#073B7F] shadow-lg" : "text-white/90 hover:bg-white/10"}
                  `}
                >
                  {/* Ripple background */}
                  <span
                    className={`
                      absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 
                      bg-white transition duration-300
                    `}
                  ></span>

                  {/* Active bubble indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-white rounded-r-full"></span>
                  )}

                  <Icon size={22} className="relative z-10" />
                  <span className="relative z-10 font-medium text-sm">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-5">
          <button
            onClick={handleLogout}
            className="
              w-full py-2 flex items-center justify-center gap-2 
              border border-white/30 rounded-full 
              text-white font-medium
              hover:bg-white hover:text-[#073B7F]
              transition-all duration-300 shadow-lg
              backdrop-blur-lg
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE NAVBAR (BOTTOM) */}
      <nav
        className="
          md:hidden fixed bottom-0 left-0 w-full
          bg-[#073B7F]/80 backdrop-blur-xl text-white 
          flex justify-around items-center py-2
          border-t border-white/10 z-50
        "
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {menuItems.map(({ key, icon: Icon, label }) => {
          const isActive = active === key;

          return (
            <button
              key={key}
              onClick={() => handleNavigate(key)}
              className="
                flex flex-col items-center justify-center gap-0.5 px-3 py-1
                transition-all duration-300
              "
            >
              <div
                className={`
                  p-2 rounded-full transition-all duration-300
                  ${isActive ? "bg-white text-[#073B7F] shadow-lg" : "text-white/80"}
                `}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-[10px] transition ${isActive ? "text-white" : "text-white/70"
                  }`}
              >
                {label}
              </span>
            </button>
          );
        })}

        {/* Mobile Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-0.5 text-red-300 hover:text-white transition"
        >
          <LogOut size={20} />
          <span className="text-[10px]">Logout</span>
        </button>
      </nav>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
