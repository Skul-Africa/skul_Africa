"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar as CalendarIcon } from "lucide-react";

interface Student {
  id: number;
  fullName: string;
  email: string;
  profilePicture?: string | null;
  phone?: string;
}

interface AttendanceRecord {
  studentId: number;
  status: "present" | "absent" | "late" | null;
  remark?: string;
}

interface ClassAttendance {
  classId: number;
  className: string;
  students: Student[];
  date: string;
}

export default function AttendancePage() {
  const router = useRouter();
  const [attendanceData, setAttendanceData] = useState<ClassAttendance | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    // Load cached attendance if available
    const cached = localStorage.getItem(`attendance_${today}`);
    if (cached) {
      const parsed: ClassAttendance = JSON.parse(cached);
      setAttendanceData(parsed);
      setRecords(parsed.students.map(s => ({ studentId: s.id, status: null })));
      setLoading(false);
      return;
    }

    // Mock initial data (replace with backend fetch tomorrow)
    const mockData: ClassAttendance = {
      classId: 456,
      className: "SS3",
      date: today,
      students: [
        { id: 19, fullName: "Mr. John Doe", email: "john.doe@school.edu", profilePicture: null, phone: "+2348012345678" },
        { id: 20, fullName: "Micheal Felix", email: "michealfelix@gmail.com", profilePicture: null, phone: "+2349131161483" },
        { id: 21, fullName: "Jane Smith", email: "jane.smith@school.edu", profilePicture: null, phone: "+2348098765432" },
      ],
    };
    setAttendanceData(mockData);
    setRecords(mockData.students.map(s => ({ studentId: s.id, status: null })));
    setLoading(false);
  }, []);

  const updateStatus = (studentId: number, status: "present" | "absent" | "late") => {
    setRecords(prev =>
      prev.map(r => (r.studentId === studentId ? { ...r, status } : r))
    );
  };

  const handleSubmit = () => {
    // Cache data offline (simulate submission)
    localStorage.setItem(`attendance_${today}`, JSON.stringify(attendanceData));
    alert("Attendance saved locally! Backend integration coming tomorrow.");
  };

  if (loading || !attendanceData) return <p className="text-center p-6">Loading attendance...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back
          </button>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Attendance — {attendanceData.className} ({today})
          </h2>
        </div>

        {/* Profile pics summary */}
        <div className="flex -space-x-4 overflow-hidden">
          {attendanceData.students.slice(0, 5).map((s, idx) => (
            <Image
              key={s.id}
              src={s.profilePicture || "/avatar.png"}
              alt={s.fullName}
              width={40}
              height={40}
              className="rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
            />
          ))}
          {attendanceData.students.length > 5 && (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-700 dark:text-gray-200 font-medium">
              +{attendanceData.students.length - 5}
            </div>
          )}
        </div>

        {/* Students List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-4">
          {attendanceData.students.map(student => {
            const record = records.find(r => r.studentId === student.id);
            return (
              <div
                key={student.id}
                className="flex items-center justify-between gap-2 p-2 border-b border-gray-200 dark:border-gray-700 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={student.profilePicture || "/avatar.png"}
                    alt={student.fullName}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{student.fullName}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{student.email}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {["present", "absent", "late"].map(status => (
                    <button
                      key={status}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        record?.status === status
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
                      }`}
                      onClick={() => updateStatus(student.id, status as any)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}
