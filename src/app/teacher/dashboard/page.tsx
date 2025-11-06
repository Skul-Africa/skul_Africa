"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";
import { GraduationCap, School, Mail, BookOpen,Calendar as CalendarIcon  } from "lucide-react";
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
  const router = useRouter();

  // ✅ Fetch Teacher Profile
  const fetchProfile = async (forceRefresh = false) => {
    const token = localStorage.getItem("teacher_token");
    if (!token) {
      router.push("/teacher/login");
      return;
    }

    try {
      // Load cached data first if available
      if (!forceRefresh) {
        const cached = localStorage.getItem("teacher_profile");
        const cachedTime = localStorage.getItem("teacher_profile_timestamp");

        if (cached && cachedTime) {
          const age = Date.now() - parseInt(cachedTime, 10);
          const maxAge = 1000 * 60 * 30; // 30 mins

          if (age < maxAge) {
            setTeacher(JSON.parse(cached));
            setLoading(false);
            console.log("✅ Loaded teacher profile from cache");
            return;
          }
        }
      }

      // Fetch new data
      const res = await fetch(`${API_BASE_URL}/api/v1/teacher/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`);

      const responseData = await res.json();
      const teacherData = responseData?.data?.data;

      // Cache it
      localStorage.setItem("teacher_profile", JSON.stringify(teacherData));
      localStorage.setItem("teacher_profile_timestamp", Date.now().toString());

      setTeacher(teacherData);
      console.log("🌐 Fetched teacher data from API");
    } catch (err) {
      console.error("Error fetching teacher profile:", err);
      localStorage.removeItem("teacher_token");
      router.push("/teacher/login");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchProfile();

    const handleOffline = () => {
      console.warn("⚠️ Offline mode — loading cached data");
      const cached = localStorage.getItem("teacher_profile");
      if (cached) setTeacher(JSON.parse(cached));
    };

    const handleOnline = () => {
      console.log("🔄 Back online — refreshing data");
      fetchProfile(true);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [router]);

  // ✅ Optional: auto-refresh every 10 mins
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("⏰ Auto refreshing teacher profile...");
      fetchProfile(true);
    }, 1000 * 60 * 10); // every 10 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (!teacher) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/80 backdrop-blur-xl shadow-lg border border-blue-100 rounded-2xl p-6">
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome,{" "}
              <span className="text-blue-700 font-bold">
                {teacher.fullName}
              </span>
            </h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
              <School size={16} />
              {teacher.school?.name || "No school"}
            </p>
            <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2">
              <Mail size={14} /> {teacher.email}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Image
              src="/default image.png"
              alt="Teacher"
              width={90}
              height={90}
              className="rounded-full border-4 border-blue-500 shadow-md hover:scale-105 transition-transform"
            />
          </div>
        </div>
<section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 transition hover:shadow-lg">
  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
    <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
      <CalendarIcon className="text-blue-600" size={20} />
      My Teaching Schedule
    </h2>
  </div>

  {/* Responsive layout: calendar + chart */}
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left: Calendar */}
    <div className="flex justify-center md:justify-start">
      <div className="overflow-x-auto rounded-xl border shadow-sm bg-gradient-to-br from-white to-blue-50 p-4">
        <Calendar
          mode="single"
          showOutsideDays
          className="rounded-md border-0 min-w-[300px]"
        />
      </div>
    </div>

    {/* Right: Performance Chart */}
    <PerformanceChart />
  </div>
</section>


    
        {/* Personal Info */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 transition hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-5 text-blue-800 flex items-center gap-2">
            <BookOpen size={20} /> Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <InfoCard label="Full Name" value={teacher.fullName} />
            <InfoCard label="Email" value={teacher.email} />
            <InfoCard label="Phone" value={teacher.phone || "N/A"} />
            <InfoCard
              label="Subject"
              value={
                teacher.subjects?.map((s) => s.name).join(", ") ||
                teacher.subject ||
                "N/A"
              }
            />
            <InfoCard label="School" value={teacher.school?.name} />
            <InfoCard label="Address" value={teacher.school?.address || "N/A"} />
          </div>
        </section>

        {/* Education */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 transition hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-5 text-blue-800 flex items-center gap-2">
            <GraduationCap size={20} /> Educational Background
          </h2>

          {teacher.educationBackgrounds?.length ? (
            <ul className="space-y-4">
              {teacher.educationBackgrounds.map((edu) => (
                <li
                  key={edu.id}
                  className="p-4 border rounded-xl hover:shadow-md transition bg-gradient-to-r from-blue-50 to-blue-100"
                >
                  <p className="font-semibold text-blue-800">{edu.degree}</p>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).getFullYear()} -{" "}
                    {new Date(edu.endDate).getFullYear()}
                  </p>

                  {edu.credentialUrl && (
                    <a
                      href={edu.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                    >
                      <BookOpen size={16} />
                      View Credential
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No education records found.
            </p>
          )}

        </section>
      </div>
    </div>
  );
}

/* Small Info Box */
function InfoCard({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="font-semibold text-gray-800 truncate">{value}</p>
    </div>
  );
}
