"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardSidebar from "@/components/ui/dashboard-sidebar";
import DashboardRightPanel from "@/components/ui/dashboard-right-panel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleTokenExpiration = () => {
    localStorage.removeItem("school_token");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_token");
    alert("Your session has expired. Please login again.");
    router.push("/login_select");
  };

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const schoolToken = localStorage.getItem("school_token");
        if (schoolToken) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        const otherKeys = ["token", "authToken", "access_token", "auth_token"];
        for (const key of otherKeys) {
          if (localStorage.getItem(key)) {
            setIsAuthenticated(false);
            setIsLoading(false);
            router.push("/login_select");
            return;
          }
        }

        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/login_select");
      }
    };

    const timeout = setTimeout(() => {
      setIsLoading(false);
      if (!localStorage.getItem("school_token")) router.push("/login_select");
    }, 3000);

    checkAuth();
    return () => clearTimeout(timeout);
  }, [router]);

  const getCurrentView = () => {
    if (pathname.includes("/student")) return "students";
    if (pathname.includes("/teacher")) return "teachers";
    if (pathname.includes("/courses")) return "subjects";
    if (pathname.includes("/events")) return "events";
    if (pathname.includes("/school")) return "dashboard";
    return "dashboard";
  };

  const currentView = getCurrentView();

  const handleNavigate = (view: string) => {
    switch (view) {
      case "students":
        router.push("/dashboard/student");
        break;
      case "teachers":
        router.push("/dashboard/teacher");
        break;
      case "dashboard":
        router.push("/dashboard/school");
        break;
      case "classes":
        router.push("/dashboard/school");
        break;
      case "subjects":
        router.push("/dashboard/courses");
        break;
      case "events":
        router.push("/dashboard/events");
        break;
      case "settings":
        router.push("/dashboard/settings");
        break;
      case "news":
        router.push("/dashboard/school");
        break;
      case "feedback":
        router.push("/dashboard/feedback");
        break;
      default:
        router.push("/dashboard/school");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#073B7F] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col sm:flex-row bg-gray-50 min-h-screen">
      <DashboardSidebar currentView={currentView} onNavigate={handleNavigate} />

      {/* 🧩 Main Content */}
      <main
        className="ml-0 sm:ml-48 flex-1 lg:mr-16 p-4 sm:p-6"
        style={{ backgroundColor: "#DDE5FF" }}
      >
        {children}
      </main>

      <DashboardRightPanel currentView={currentView} />
    </div>
  );
}
