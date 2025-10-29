"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("School Admin");

  useEffect(() => {
    const name = localStorage.getItem("school_name") || "School Admin";
    setSchoolName(name);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Profile Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <p className="text-sm opacity-70 mb-1">Easily manage your activities in one place </p>
          <h2 className="font-semibold">{schoolName}</h2>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all w-full sm:w-auto font-semibold"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
