"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiFetch, API_BASE_URL } from "@/lib/api"; // from earlier
import TeacherSidebar from "./TeacherSidebar";
import PerformanceChart from "../../charts/PerformanceChart";

interface TeacherProfile {
  id: number;
  fullName: string;
  email: string;
  role: string;
  subject?: string;
  school?: {
    name: string;
    address?: string;
  };
}

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("teacher_token");

    if (!token) {
      router.push("/teacher/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/teacher/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setTeacher(data);
      } catch (err) {
        console.error("Error fetching teacher profile:", err);
        localStorage.removeItem("teacher_token");
        router.push("/teacher/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (!teacher) return null;

  return (
    <div className="flex min-h-screen bg-[#F5F7FF]">
      <TeacherSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {teacher.fullName}
            </h1>
            <p className="text-gray-500">{teacher.school?.name}</p>
          </div>
          <Image
            src="/default-teacher.png"
            alt="Teacher"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* <TeacherEducationList /> */}
          <PerformanceChart />
          {/* You can later add activity, classes, etc */}
        </div>
      </main>
    </div>
  );
}
