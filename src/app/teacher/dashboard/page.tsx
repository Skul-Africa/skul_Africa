"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";
import { GraduationCap, School, Mail, BookOpen, Calendar as CalendarIcon, Sun, Moon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import PerformanceChart from "../charts/PerformanceChart";

interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  credentialUrl?: string;
}

interface School {
  id: number;
  name: string;
  address?: string;
}

interface TeacherProfile {
  id: number;
  fullName: string;
  email: string;
  role: string;
  subject?: string;
  phone?: string;
  school?: School;
  subjects?: { name: string }[];
  educationBackgrounds?: Education[];
}

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const fetchProfile = async (forceRefresh = false) => {
    const token = localStorage.getItem("teacher_token");
    if (!token) {
      router.push("/teacher/login");
      return;
    }

    try {
      if (!forceRefresh) {
        const cached = localStorage.getItem("teacher_profile");
        const cachedTime = localStorage.getItem("teacher_profile_timestamp");
        if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 1000 * 60 * 30) {
          setTeacher(JSON.parse(cached));
          setLoading(false);
          return;
        }
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/teacher/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      const teacherData = data?.data?.data;
      localStorage.setItem("teacher_profile", JSON.stringify(teacherData));
      localStorage.setItem("teacher_profile_timestamp", Date.now().toString());
      setTeacher(teacherData);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("teacher_token");
      router.push("/teacher/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const handleOffline = () => {
      const cached = localStorage.getItem("teacher_profile");
      if (cached) setTeacher(JSON.parse(cached));
    };
    const handleOnline = () => fetchProfile(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => fetchProfile(true), 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? "border-white" : "border-blue-600"} mx-auto mb-4`}></div>
          <p className={`${darkMode ? "text-white" : "text-gray-600"} font-medium`}>Loading your dashboard...</p>
        </div>
      </div>
    );

  if (!teacher) return null;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col items-center px-4 py-4`}>
      {/* Dark Mode Toggle */}
      <div className="w-full max-w-md flex justify-end mb-2">
        <button
          className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Header */}
      <div className={`w-full max-w-md flex flex-col sm:flex-row items-center justify-between shadow-md border rounded-xl p-4 mb-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-semibold">
            Welcome, <span className="text-blue-400 font-bold">{teacher.fullName}</span>
          </h1>
          <p className="flex items-center gap-1 mt-1">
            <School size={16} /> {teacher.school?.name || "No school"}
          </p>
          <p className="text-sm flex items-center gap-1 mt-1">
            <Mail size={14} /> {teacher.email}
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Image
            src="/default image.png"
            alt="Teacher"
            width={80}
            height={80}
            className="rounded-full border-2 border-blue-500 shadow-md"
          />
        </div>
      </div>

      {/* Calendar + Performance */}
      <div className={`w-full max-w-md shadow-md rounded-xl p-4 mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
        <h2 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-2">
          <CalendarIcon size={18} /> My Teaching Schedule
        </h2>
        <Calendar
          mode="single"
          showOutsideDays
          className={`rounded-md w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-200"}`}
        />
        <div className="mt-4">
          <PerformanceChart darkMode={darkMode} />
        </div>
      </div>

      {/* Personal Info */}
      <div className={`w-full max-w-md shadow-md rounded-xl p-4 mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
        <h2 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-3">
          <BookOpen size={18} /> Personal Information
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <InfoCard label="Full Name" value={teacher.fullName} darkMode={darkMode} />
          <InfoCard label="Email" value={teacher.email} darkMode={darkMode} />
          <InfoCard label="Phone" value={teacher.phone || "N/A"} darkMode={darkMode} />
          <InfoCard label="Subjects" value={teacher.subjects?.map((s) => s.name).join(", ") || teacher.subject || "N/A"} darkMode={darkMode} />
          <InfoCard label="School" value={teacher.school?.name || "N/A"} darkMode={darkMode} />
          <InfoCard label="Address" value={teacher.school?.address || "N/A"} darkMode={darkMode} />
        </div>
      </div>

      {/* Education */}
      <div className={`w-full max-w-md shadow-md rounded-xl p-4 mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
        <h2 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-3">
          <GraduationCap size={18} /> Education
        </h2>
        {teacher.educationBackgrounds?.length ? (
          <ul className="space-y-3">
            {teacher.educationBackgrounds.map((edu) => (
              <li key={edu.id} className={`p-3 border rounded-xl ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                <p className="font-semibold text-blue-400">{edu.degree}</p>
                <p className={darkMode ? "text-gray-200 text-sm" : "text-gray-700 text-sm"}>{edu.institution}</p>
                <p className={darkMode ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
                  {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                </p>
                {edu.credentialUrl && (
                  <a
                    href={edu.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full shadow-sm hover:bg-blue-700"
                  >
                    View Credential
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">No education records.</p>
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value, darkMode }: { label: string; value?: string | null; darkMode?: boolean }) {
  return (
    <div className={`p-2 rounded-xl border shadow-sm ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-medium truncate">{value}</p>
    </div>
  );
}
