"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  credentialUrl?: string;
}

export interface School {
  id: number;
  name: string;
  address?: string;
}

export interface TeacherProfile {
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

export function useTeacherProfile() {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("teacher_token");
    if (!token) {
      router.push("/teacher/login");
      return;
    }

    const cachedData = localStorage.getItem("teacher_profile");
    const cachedTime = localStorage.getItem("teacher_profile_cachedAt");
    const now = Date.now();

    // If cached data exists and is fresh (< 10 minutes old)
    if (cachedData && cachedTime && now - parseInt(cachedTime) < 10 * 60 * 1000) {
      setTeacher(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/teacher/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`);

        const responseData = await res.json();
        const teacherData = responseData?.data?.data;

        setTeacher(teacherData);
        localStorage.setItem("teacher_profile", JSON.stringify(teacherData));
        localStorage.setItem("teacher_profile_cachedAt", Date.now().toString());
      } catch (err) {
        console.error("Error fetching teacher profile:", err);
        localStorage.removeItem("teacher_token");
        router.push("/teacher/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Re-fetch when the user comes back online
    window.addEventListener("online", fetchProfile);
    return () => window.removeEventListener("online", fetchProfile);
  }, [router]);

  return { teacher, loading };
}
