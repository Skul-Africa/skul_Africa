"use client"

import Image from "next/image"
import { Settings, Bell } from "lucide-react"

interface Student {
  id: number
  fullName: string
  email: string
  phone: string
  accessCode: string
  profileCode: string
  pendingClassName: string | null
  role: string
  classroomId: number | null
  school: {
    id: number
    name: string
    address: string
    role: string
    email: string
    phone: string
    website: string | null
    isActive: boolean
    accessCode: string
    profileCode: string
    profilePicture: string | null
    coverPicture: string | null
  }
  user: any
}

interface DashboardRightPanelProps {
  students?: Student[]
  teachers?: any[] // Will be defined when teacher data is available
  currentView?: string
}

export default function DashboardRightPanel({
  students = [],
  teachers = [],
  currentView = "students"
}: DashboardRightPanelProps) {
  // Extract school profile picture from first student's school data
  const schoolProfilePicture = students.length > 0 ? students[0].school?.profilePicture : null

  return (
    <aside className="hidden lg:flex fixed right-0 top-0 w-16 h-screen bg-white border-l border-gray-200 flex-col items-center py-6 gap-6">
      {/* Profile Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
        {schoolProfilePicture ? (
          <img
            src={schoolProfilePicture || "/placeholder.svg"}
            alt="School Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {students.length > 0 && students[0].school?.name ? students[0].school.name.charAt(0).toUpperCase() : "S"}
            </span>
          </div>
        )}
      </div>

      {/* Settings Icon */}
      <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
        <Settings size={20} className="text-gray-600" />
      </button>

      {/* Notification Bell */}
      <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
        <Bell size={20} className="text-gray-600" />
      </button>
    </aside>
  )
}