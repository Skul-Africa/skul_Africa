"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  totalDue?: number | null;
  profilePicture?: string | null;
}

interface CachedData {
  timestamp: number;
  students: Student[];
  className: string;
}

const CACHE_KEY_PREFIX = "class_students_";
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

export default function ClassStudentsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [className, setClassName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("teacher_token");
    if (!token) return;

    const fetchStudents = async () => {
      try {
        const classId = id?.toString().trim();
        const cacheKey = `${CACHE_KEY_PREFIX}${classId}`;

        // Check cache
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const cached: CachedData = JSON.parse(cachedRaw);
          const now = Date.now();
          if (now - cached.timestamp < CACHE_EXPIRATION) {
            setStudents(cached.students);
            setClassName(cached.className);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const res = await fetch(`${API_BASE_URL}/api/v1/teacher/classes/${classId}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();

        const studentsData: Student[] = data.data.students || [];
        const classNameData: string = data.data.className || "Unknown Class";

        setStudents(studentsData);
        setClassName(classNameData);

        // Save to cache
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), students: studentsData, className: classNameData })
        );
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading student list...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Back Button + Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h2 className="text-2xl font-semibold text-[#2E2E2E]">{className} — Students</h2>
        <div className="text-sm text-gray-500">Total Students: {students.length}</div>
      </div>

      {/* Student Table (responsive) */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-800 flex items-center gap-2">
                  <img
                    src={student.profilePicture || "/default image.png"}
                    alt={student.fullName}
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  {student.fullName}
                </td>
                <td className="py-3 px-4 text-gray-600 break-all">{student.email}</td>
                <td className="py-3 px-4 text-gray-600">{student.phone}</td>
                <td className="py-3 px-4 text-center">
                  {student.totalDue ? (
                    <span className="text-red-500 text-xs font-medium">Pending Fees</span>
                  ) : (
                    <span className="text-green-600 text-xs font-medium">Cleared</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
