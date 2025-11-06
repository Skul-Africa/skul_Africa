"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://skul-africa.onrender.com";

interface LoginRequest {
  accessCode: string;
  profileCode: string;
}

interface LoginResponse {
  message: string;
  token: string;
  teacher?: {
    id: number;
    fullName: string;
    email: string;
    role: string;
    subject?: string;
  };
}

const TeacherLoginPage = () => {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [profileCode, setProfileCode] = useState("");
  const [showProfileCode, setShowProfileCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveTeacherData = (token: string, teacher: any) => {
    try {
      localStorage.setItem("teacher_token", token);
      localStorage.setItem("teacher_data", JSON.stringify(teacher));
      localStorage.setItem("teacher_token_timestamp", Date.now().toString());
      console.log("✅ Teacher login data saved");
    } catch (err) {
      console.error("Error saving teacher data:", err);
      sessionStorage.setItem("teacher_token", token);
      sessionStorage.setItem("teacher_data", JSON.stringify(teacher));
    }
  };

  const clearTeacherData = () => {
    localStorage.removeItem("teacher_token");
    localStorage.removeItem("teacher_data");
    localStorage.removeItem("teacher_token_timestamp");
    sessionStorage.removeItem("teacher_token");
    sessionStorage.removeItem("teacher_data");
  };

  const handleLogin = async (loginData: LoginRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/teacher/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      if (data.token) {
        saveTeacherData(data.token, data.teacher);
        setSuccess(data.message || "Login successful!");
        setError("");

        setTimeout(() => {
          router.push("/teacher/dashboard");
        }, 1200);
      } else {
        throw new Error("No token received from server.");
      }
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
      setSuccess("");
      clearTeacherData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!accessCode.trim() || !profileCode.trim()) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    handleLogin({
      accessCode: accessCode.trim().toUpperCase(),
      profileCode: profileCode.trim(),
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image
          src="/Loginasuser.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Image
            src="/teacher.svg"
            alt="Teacher Illustration"
            width={660}
            height={460}
            className="w-full h-auto max-w-lg"
            priority
          />
        </div>

        {/* Login Form */}
        <div className="flex-1 bg-white p-6 lg:p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-1">Welcome</p>
            <h2 className="text-xl font-bold text-gray-900">
              Teacher Login Portal
            </h2>
          </div>

          {/* Error / Success messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Access Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              required
            />

            <div className="relative">
              <input
                type={showProfileCode ? "text" : "password"}
                value={profileCode}
                onChange={(e) => setProfileCode(e.target.value)}
                placeholder="Profile Code"
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowProfileCode(!showProfileCode)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showProfileCode ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              {isLoading ? "ACCESSING..." : "CONTINUE"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Not a teacher?{" "}
              <a
                href="/"
                className="text-blue-700 underline hover:text-blue-900"
              >
                Go back
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLoginPage;
