"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import DashboardSidebar from "@/components/ui/dashboard-sidebar"
import DashboardRightPanel from "@/components/ui/dashboard-right-panel"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle token expiration
  const handleTokenExpiration = () => {
    // Clear all tokens
    localStorage.removeItem("school_token")
    localStorage.removeItem("token")
    localStorage.removeItem("authToken")
    localStorage.removeItem("access_token")
    localStorage.removeItem("auth_token")

    // Show alert and redirect
    alert("Your session has expired. Please login again.")
    router.push("/login_select")
  }

  // Authentication check - only allow school users
  useEffect(() => {
    const checkAuth = () => {
      console.log("[Dashboard] Starting authentication check...")

      if (typeof window !== "undefined") {
        // Prioritize school_token for school users
        const schoolToken = localStorage.getItem("school_token")
        console.log("[Dashboard] Checking school_token:", !!schoolToken)

        if (schoolToken) {
          console.log("[Dashboard] Found school token, allowing access")
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // Check other tokens but log warning
        const otherKeys = ["token", "authToken", "access_token", "auth_token"]
        for (const key of otherKeys) {
          const token = localStorage.getItem(key)
          if (token) {
            console.log("[Dashboard] Found non-school token with key:", key, "- redirecting to login")
            setIsAuthenticated(false)
            setIsLoading(false)
            router.push("/login_select")
            return
          }
        }

        console.log("[Dashboard] No authentication token found, redirecting to login")
        setIsAuthenticated(false)
        setIsLoading(false)
        router.push("/login_select")
      } else {
        console.log("[Dashboard] Window not available, setting loading to false")
        setIsLoading(false)
      }
    }

    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log("[Dashboard] Authentication check timeout, forcing completion")
      setIsLoading(false)
      if (!localStorage.getItem("school_token")) {
        router.push("/login_select")
      }
    }, 3000) // 3 second timeout

    checkAuth()

    return () => clearTimeout(timeout)
  }, [router])

  // Determine current view based on pathname
  const getCurrentView = () => {
    if (pathname.includes("/student")) return "students"
    if (pathname.includes("/teacher")) return "teachers"
    if (pathname.includes("/courses")) return "subjects"
    if (pathname.includes("/events")) return "events"
    if (pathname.includes("/school")) return "dashboard"
    return "dashboard"
  }

  const currentView = getCurrentView()

  const handleNavigate = (view: string) => {
    switch (view) {
      case "students":
        router.push("/dashboard/student")
        break
      case "teachers":
        router.push("/dashboard/teacher")
        break
      case "dashboard":
        router.push("/dashboard/school")
        break
      case "classes":
        // For now, redirect to dashboard
        router.push("/dashboard/school")
        break
      case "subjects":
        router.push("/dashboard/courses")
        break
      case "events":
        router.push("/dashboard/events")
        break
      case "settings":
        router.push("/dashboard/school")
        break
      case "news":
        router.push("/dashboard/school")
        break
      default:
        router.push("/dashboard/school")
    }
  }

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#073B7F] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated (redirect is handled in useEffect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row bg-gray-50 min-h-screen">
      <DashboardSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Mobile menu toggle button */}
      <button
        className="sm:hidden fixed left-2 top-2 z-30 p-2 bg-[#073B7F] text-white rounded-md"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main content area */}
      <main className="ml-0 sm:ml-48 flex-1 lg:mr-16 p-4 sm:p-6" style={{ backgroundColor: "#DDE5FF" }}>
        {children}
      </main>

      {/* Right Panel */}
      <DashboardRightPanel currentView={currentView} />
    </div>
  )
}