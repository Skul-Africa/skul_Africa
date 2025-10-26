"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Users, User, Calendar, Search, AlertTriangle, Moon, Sun } from "lucide-react";
import PerformanceChart from "@/components/charts/PerformanceChart";
import DashboardCalendar from "@/components/DashboardCalendar";
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
import StudentFinanceTable from "@/components/finance/StudentFinanceTable";

const getAuthToken = () => localStorage.getItem("school_token");

export default function DashboardPage() {
  // =======================
  // DARK MODE TOGGLE
  // =======================
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
function validateToken() {
  const token = getAuthToken();
  if (!token) return { valid: false, reason: "missing" };

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000; // seconds
    if (decoded.exp && decoded.exp < now) {
      return { valid: false, reason: "expired" };
    }
    return { valid: true, decoded };
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return { valid: false, reason: "invalid" };
  }
}

  // =======================
  // SCHOOL NAME (from JWT)
  // =======================
  const [schoolName, setSchoolName] = useState<string>("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setSchoolName("Unknown School");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      console.log("✅ Decoded token:", decoded);
      setSchoolName(decoded.name || "Unknown School");
    } catch (err) {
      console.error("❌ Error decoding token:", err);
      setSchoolName("Unknown School");
    }
  }, []);

  // =======================
  // COMMON FETCH FUNCTION
  // =======================
  async function safeFetch(url: string, key: string) {
    if (!navigator.onLine) {
      console.warn(`⚠️ Offline: loading cached ${key} data`);
      const cached = localStorage.getItem(key);
      return cached ? JSON.parse(cached) : [];
    }

    const token = getAuthToken();
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(`${key} response status:`, res.status);
    if (!res.ok) throw new Error(`Failed to fetch ${key}: ${res.status}`);

    const data = await res.json();
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
  useEffect(() => {
  async function fetchAll() {
    const tokenCheck = validateToken();

    if (!tokenCheck.valid) {
      console.warn(`⚠️ Token check failed (${tokenCheck.reason}). Redirecting or skipping fetch.`);
      setStudentError(true);
      setTeacherError(true);
      setClassError(true);

      // Optional: redirect to login
      // window.location.href = "/login";

      setStudentLoading(false);
      setTeacherLoading(false);
      setClassLoading(false);
      return;
    }

    try {
      const students = await safeFetch("https://skul-africa.onrender.com/api/v1/student", "students_cache");
      const teachers = await safeFetch("https://skul-africa.onrender.com/api/v1/teacher", "teachers_cache");
      const classes = await safeFetch("https://skul-africa.onrender.com/api/v1/classrooms", "classes_cache");

      setStudentCount(students?.students?.length || students?.length || 0);
      setTeacherCount(teachers?.teachers?.length || teachers?.length || 0);
      setClassCount(classes?.classrooms?.length || classes?.length || 0);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setStudentError(true);
      setTeacherError(true);
      setClassError(true);
    } finally {
      setStudentLoading(false);
      setTeacherLoading(false);
      setClassLoading(false);
    }
  }

  fetchAll();
}, []);


  // =======================
  // STUDENTS / TEACHERS / CLASSES
  // =======================
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [studentLoading, setStudentLoading] = useState(true);
  const [studentError, setStudentError] = useState(false);

  const [teacherCount, setTeacherCount] = useState<number | null>(null);
  const [teacherLoading, setTeacherLoading] = useState(true);
  const [teacherError, setTeacherError] = useState(false);

  const [classCount, setClassCount] = useState<number | null>(null);
  const [classLoading, setClassLoading] = useState(true);
  const [classError, setClassError] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const students = await safeFetch("https://skul-africa.onrender.com/api/v1/student", "students_cache");
        const teachers = await safeFetch("https://skul-africa.onrender.com/api/v1/teacher", "teachers_cache");
        const classes = await safeFetch("https://skul-africa.onrender.com/api/v1/classrooms", "classes_cache");

        setStudentCount(students?.students?.length || students?.length || 0);
        setTeacherCount(teachers?.teachers?.length || teachers?.length || 0);
        setClassCount(classes?.classrooms?.length || classes?.length || 0);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setStudentError(true);
        setTeacherError(true);
        setClassError(true);
      } finally {
        setStudentLoading(false);
        setTeacherLoading(false);
        setClassLoading(false);
      }
    }
    fetchAll();
  }, []);

  // =======================
  // RENDER
  // =======================
  return (
    
    <div className={`min-h-screen p-4 sm:p-6 transition-colors duration-500 ${darkMode ? "bg-blue-950 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 sm:mt-0">
          Welcome Back, {schoolName}
        </h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-44 sm:w-64">
            <input
              type="text"
              placeholder="Search here..."
              className={`w-full pl-10 pr-4 py-2 rounded-full border shadow focus:outline-none focus:border-blue-400 transition-colors ${darkMode ? "bg-blue-900 border-blue-800 text-gray-200 placeholder-gray-400" : "bg-white"
                }`}
            />
            <Search
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-500 ${darkMode ? "bg-blue-800 hover:bg-blue-700 text-yellow-300" : "bg-gray-200 hover:bg-gray-300 text-blue-800"
              }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatsCard
          title="Students"
          icon={<Users size={18} className="sm:w-6 sm:h-6" />}
          bgColor="bg-indigo-600"
          loading={studentLoading}
          error={studentError}
          count={studentCount}
          darkMode={darkMode}
        />
        <StatsCard
          title="Teachers"
          icon={<User size={18} className="sm:w-6 sm:h-6" />}
          bgColor="bg-red-400"
          loading={teacherLoading}
          error={teacherError}
          count={teacherCount}
          darkMode={darkMode}
        />
        <StatsCard
          title="Classes"
          icon={<Calendar size={18} className="sm:w-6 sm:h-6" />}
          bgColor="bg-yellow-400"
          loading={classLoading}
          error={classError}
          count={classCount}
          darkMode={darkMode}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className={`${darkMode ? "bg-blue-900" : "bg-white"} p-4 rounded-xl shadow`}>
          <PerformanceChart />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/3">
            <DashboardCalendar />
          </div>

          <div className={`${darkMode ? "bg-blue-900 text-gray-100" : "bg-white"} lg:w-2/3 p-4 text-md rounded-xl shadow`}>
            <h2 className="text-md font-semibold mb-4">School Finance</h2>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#E5E7EB"} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} stroke={darkMode ? "#cbd5e1" : "#374151"} />
                <YAxis axisLine={false} tickLine={false} ticks={[0, 20, 40, 60, 80, 100]} stroke={darkMode ? "#cbd5e1" : "#374151"} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
                <Bar dataKey="lastWeek" name="Last Week" fill="#3B82F6" barSize={20} radius={[10, 10, 0, 0]} />
                <Bar dataKey="thisWeek" name="This Week" fill="#FACC15" barSize={20} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

           

          </div>
        </div>
      </div>
       <div className="mt-8">
              <StudentFinanceTable darkMode={darkMode} />
            </div>
    </div>
  );
}

// =======================
// STATS CARD COMPONENT
// =======================
function StatsCard({
  title,
  icon,
  bgColor,
  loading,
  error,
  count,
  darkMode,
}: {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  loading: boolean;
  error: boolean;
  count: number | null;
  darkMode: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow transition-colors ${darkMode ? "bg-blue-900 text-gray-100" : "bg-white"
      }`}>
      <div className={`p-2 sm:p-3 rounded-full ${bgColor} text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm opacity-80">{title}</p>
        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : error ? (
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            <AlertTriangle size={16} /> <span>Unavailable</span>
          </div>
        ) : (
          <p className="text-lg sm:text-2xl font-bold">{count}</p>
        )}
      </div>
    </div>
  );
}
