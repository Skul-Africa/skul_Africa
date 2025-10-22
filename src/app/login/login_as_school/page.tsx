"use client";

import React, { useState, useEffect } from "react";
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
}

const SchoolAccessPage = () => {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [profileCode, setProfileCode] = useState("");
  const [showProfileCode, setShowProfileCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Check if already logged in (token exists)
  useEffect(() => {
    const storedToken =
      localStorage.getItem("school_token") ||
      sessionStorage.getItem("school_token");
    if (storedToken) {
      console.log("✅ Existing token found, redirecting to dashboard...");
      router.push("/dashboard/school");
    }
  }, [router]);

  // ✅ Token helpers
  const saveTokens = (token: string) => {
    try {
      localStorage.setItem("school_token", token);
      localStorage.setItem("school_token_timestamp", Date.now().toString());
      sessionStorage.setItem("school_token", token);
      console.log("✅ Token saved successfully");
    } catch (err) {
      console.error("Error saving tokens:", err);
      sessionStorage.setItem("school_token", token);
    }
  };

  const clearTokens = () => {
    localStorage.removeItem("school_token");
    localStorage.removeItem("school_token_timestamp");
    sessionStorage.removeItem("school_token");
  };

  // ✅ Login logic
  const handleLogin = async (loginData: LoginRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/school/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Login failed: ${response.status}`);
      }

      const data: LoginResponse = await response.json();

      if (data.token) {
        saveTokens(data.token);
        setSuccess(data.message || "Login successful! Redirecting...");

        // Redirect after short delay
        setTimeout(() => {
          router.push("/dashboard/school");
        }, 1000);
      } else {
        throw new Error("No token received from server");
      }
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!accessCode || !profileCode) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    handleLogin({
      accessCode: accessCode.trim().toUpperCase(),
      profileCode: profileCode.trim().toUpperCase(),
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
        {/* Illustration (Desktop only) */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Image
            src="/schoolimage.png"
            alt="Welcome Illustration"
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
              Log in to Your Account
            </h2>
          </div>

          {/* Error/Success */}
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

          {/* Login Form */}
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
              className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            >
              {isLoading ? "ACCESSING..." : "CONTINUE"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              New school?{" "}
              <a
                href="/signup/school"
                className="text-gray-900 underline hover:text-gray-700"
              >
                REGISTER HERE
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAccessPage;
