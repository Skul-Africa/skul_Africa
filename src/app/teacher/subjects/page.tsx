"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

interface Student {
  id: number;
  fullName: string;
  profilePicture: string | null;
}

interface Subject {
  id: number;
  subjectName: string;
  classroom?: {
    id: number;
    className: string;
    level: string;
  };
  school?: { name: string };
}

export default function SubjectsPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentsMap, setStudentsMap] = useState<Record<number, Student[]>>({});
  const [teacherName, setTeacherName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("teacher_token");
    if (!token) return;

    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/teacher/my-subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSubjects(data.data.subjects || []);
        setTeacherName(data.data.teacherName || "");

        // Fetch top 3 students per classroom
        const map: Record<number, Student[]> = {};
        for (const subject of data.data.subjects || []) {
          if (subject.classroom?.id) {
            const stuRes = await fetch(`${API_BASE_URL}/api/v1/teacher/classes/${subject.classroom.id}/students`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!stuRes.ok) continue;
            const stuData = await stuRes.json();
            map[subject.classroom.id] = stuData.data.students?.slice(0, 3) || [];
          }
        }
        setStudentsMap(map);

      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <p className="text-center text-gray-500 p-4">Loading...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#2E2E2E]">
          {teacherName ? `${teacherName}'s Subjects` : "My Subjects"}
        </h2>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full border border-gray-200 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subjects Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Subject Name</th>
              <th className="py-3 px-4 text-left">Class</th>
              <th className="py-3 px-4 text-left">Level</th>
              <th className="py-3 px-4 text-left">School</th>
              <th className="py-3 px-4 text-left">Students</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50 transition">
                <td
                  className="py-3 px-4 font-medium text-gray-800 cursor-pointer"
                  onClick={() =>
                    subject.classroom && router.push(`/teacher/subjects/classes/${subject.classroom.id}`)
                  }
                >
                  {subject.subjectName}
                </td>
                <td
                  className="py-3 px-4 text-gray-800 cursor-pointer"
                  onClick={() =>
                    subject.classroom && router.push(`/teacher/subjects/classes/${subject.classroom.id}`)
                  }
                >
                  {subject.classroom?.className || "N/A"}
                </td>
                <td
                  className="py-3 px-4 text-gray-800 cursor-pointer"
                  onClick={() =>
                    subject.classroom && router.push(`/teacher/subjects/classes/${subject.classroom.id}`)
                  }
                >
                  {subject.classroom?.level || "-"}
                </td>
                <td
                  className="py-3 px-4 text-gray-800 cursor-pointer"
                  onClick={() =>
                    subject.classroom && router.push(`/teacher/subjects/classes/${subject.classroom.id}`)
                  }
                >
                  {subject.school?.name || "—"}
                </td>

                {/* Students avatars */}
                <td className="py-3 px-4">
                  <div className="flex -space-x-3 items-center">
                    {studentsMap[subject.classroom?.id || 0]?.length ? (
                      studentsMap[subject.classroom!.id].map((student, idx) => (
                        <img
                          key={student.id}
                          src={student.profilePicture || "/default image.png"}
                          alt={student.fullName}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          style={{ zIndex: 10 - idx }}
                        />
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No Students</span>
                    )}
                  </div>
                </td>

                {/* Action */}
                <td className="py-3 px-4 text-center">
                  {subject.classroom ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        router.push(`/teacher/subjects/classes/${subject.classroom!.id}`)
                      }
                    >
                      View Classes →
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
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
