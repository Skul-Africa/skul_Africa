"use client";

import React, { useState } from "react";
import { Sun, Moon, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

  const toggleTheme = () => setIsDarkMode((s) => !s);
  const goHome = () => router.push("/");

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
      }`}
    >
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 p-2 rounded-full ${
          isDarkMode ? "bg-white/10" : "bg-blue-100"
        }`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Logo */}
      <img
        src="/icon.png"
        alt="Skul Africa Logo"
        className="w-20 h-20 mb-6 object-contain"
      />

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
        🚀 Coming Soon
      </h1>

      <p
        className={`text-lg mb-8 text-center max-w-md ${
          isDarkMode ? "text-blue-200" : "text-slate-700"
        }`}
      >
        We’re working hard to bring you this exciting new feature. Stay tuned —
        learning just got more fun with <strong>Skul Africa</strong>!
      </p>

      {/* Go Home Button */}
      <button
        onClick={goHome}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${
          isDarkMode
            ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Go Home</span>
      </button>
    </div>
  );
}
