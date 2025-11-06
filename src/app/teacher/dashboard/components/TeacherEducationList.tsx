"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export default function TeacherEducationList() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("teacher_token");
    if (!token) return;

    async function fetchEducation() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/teacher-education`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch education list");

        const data = await res.json();
        setEducation(data);
      } catch (err) {
        console.error("Error fetching teacher education:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  if (loading)
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm text-gray-500">
        Loading education...
      </div>
    );

  if (!education.length)
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm text-gray-500">
        No education records found.
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3">Education Background</h2>
      <ul className="space-y-3">
        {education.map((item) => (
          <li key={item.id} className="border-l-4 border-blue-500 pl-3">
            <p className="font-medium text-gray-800">{item.degree}</p>
            <p className="text-sm text-gray-600">{item.institution}</p>
            <p className="text-xs text-gray-500">
              {item.startDate} → {item.endDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
