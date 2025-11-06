"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import TeacherSidebar from "./dashboard/components/TeacherSidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Optional: scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-[#F5F7FF]">
      {/* Sidebar */}
      <TeacherSidebar />

      {/* Main content */}
      <main
        className="
          flex-1 
          p-4 sm:p-6 md:p-8 
          overflow-y-auto 
          transition-all duration-300 
          md:ml-56
        "
      >
        {children}
      </main>
    </div>
  );
}
