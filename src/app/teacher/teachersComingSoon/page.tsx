"use client";

import React, { useState } from "react";
import { Sun, Moon, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeacherComingSoonPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

  const toggleTheme = () => setIsDarkMode((s) => !s);
  const goHome = () => router.push("/");

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
      }`}
    >
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 p-2 rounded-full shadow-lg ${
          isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-blue-100 hover:bg-blue-200"
        } transition`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Logo */}
      <img
        src="/icon.png"
        alt="Skul Africa Logo"
        className="w-24 h-24 mb-6 object-contain"
      />

      {/* Welcoming SVG Illustration */}
      <div className="mb-6 w-full max-w-lg">
        <img
          src="/teacher.svg"
          alt="Teacher Coming Soon"
          className="w-full h-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
        👩‍🏫 Coming Soon
      </h1>

      <p
        className={`text-lg sm:text-xl mb-8 text-center max-w-lg ${
          isDarkMode ? "text-blue-200" : "text-slate-700"
        }`}
      >
        Hello Teachers! This feature is under development. Soon, you’ll be able to manage your classes, take attendance, and track student performance—all in one place with <strong>Skul Africa</strong>.
      </p>

      {/* Go Home Button */}
      {/* <button
        onClick={goHome}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${
          isDarkMode
            ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Go Home</span>
      </button> */}
    </div>
  );
}
