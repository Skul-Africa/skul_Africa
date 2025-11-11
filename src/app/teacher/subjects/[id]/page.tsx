"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export default function SubjectPage() {
  const { id } = useParams(); // subject ID from URL
  const router = useRouter();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("teacher_token");
    if (!token) return;

    const fetchSubject = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/teacher/subjects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch subject");

        const data = await res.json();
        setSubject(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading subject...</div>;
  if (!subject) return <div className="p-6 text-center text-red-500">Subject not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{subject.subjectName}</h1>
      <p className="text-gray-600 mb-4">Class: {subject.classroom?.className || "N/A"}</p>
      <p className="text-gray-600 mb-4">Level: {subject.classroom?.level || "N/A"}</p>
      <p className="text-gray-600 mb-4">School: {subject.school?.name || "N/A"}</p>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.push(`/teacher/subjects/classes/${subject.classroom?.id}`)}
      >
        View Classes →
      </button>
    </div>
  );
}
