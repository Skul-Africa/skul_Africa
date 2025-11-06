// /lib/api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://skul-africa.onrender.com";

// Universal fetch helper
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}

// All API endpoints in one place
export const endpoints = {
  teacherProfile: "/api/v1/teacher/profile",
  teacherPerformance: "/api/v1/teacher-performance",
  // Add more as needed...
};
