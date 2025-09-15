"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Poppins } from "next/font/google"
import {
  Edit,
  Trash2,
  Eye,
  Search,
  X,
} from "lucide-react"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

interface Teacher {
  id: number
  fullName: string
  email: string
  phone: string
  accessCode: string
  profileCode: string
  role: string
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

interface CreateTeacherData {
  fullName: string
  email: string
  phone: string
  subject: string
}

const API_BASE_URL = "https://skul-africa.onrender.com"

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const possibleKeys = ["school_token", "token", "authToken", "access_token", "auth_token"]

    for (const key of possibleKeys) {
      const token = localStorage.getItem(key)
      if (token) {
        console.log("[v0] Found token with key:", key, "Length:", token.length)
        return token
      }
    }

    console.log("[v0] No token found in localStorage. Available keys:", Object.keys(localStorage))
    return null
  }
  return null
}

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const url = `${API_BASE_URL}${endpoint}`

  console.log("[v0] API Request:", { endpoint, hasToken: !!token, tokenLength: token?.length })

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    if (response.status === 401) {
      console.log("[v0] Authentication failed - token may be invalid or expired")
      // Clear expired token
      localStorage.removeItem("school_token")
      localStorage.removeItem("token")
      localStorage.removeItem("authToken")
      localStorage.removeItem("access_token")
      localStorage.removeItem("auth_token")

      // Show alert and redirect to login
      alert("Your session has expired. Please login again.")
      window.location.href = "/login_select"
      throw new Error(`Session expired. Please login again.`)
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

const createTeacher = async (teacherData: CreateTeacherData) => {
  return apiRequest("/api/v1/teacher/create", {
    method: "POST",
    body: JSON.stringify(teacherData),
  })
}

const fetchTeachers = async () => {
  return apiRequest("/api/v1/teacher")
}

const getTeacher = async (id: number) => {
  return apiRequest(`/api/v1/teacher/${id}`)
}

const updateTeacher = async (id: number, teacherData: Partial<CreateTeacherData>) => {
  return apiRequest(`/api/v1/teacher/${id}`, {
    method: "PATCH",
    body: JSON.stringify(teacherData),
  })
}

const deleteTeacher = async (id: number) => {
  return apiRequest(`/api/v1/teacher/${id}`, {
    method: "DELETE",
  })
}

const fetchSchool = async () => {
  return apiRequest("/api/v1/school/me")
}

// Offline data management functions
const saveTeachersToLocalStorage = (teachers: Teacher[], schoolId?: number) => {
  try {
    const dataToSave = {
      teachers,
      schoolId,
      lastUpdated: Date.now(),
      version: '1.0'
    }
    localStorage.setItem('school_teachers_data', JSON.stringify(dataToSave))
    console.log('[v0] Teachers data saved to localStorage:', teachers.length, 'teachers')
  } catch (error) {
    console.error('[v0] Error saving teachers to localStorage:', error)
  }
}

const loadTeachersFromLocalStorage = (): { teachers: Teacher[], schoolId?: number, lastUpdated?: number } | null => {
  try {
    const data = localStorage.getItem('school_teachers_data')
    if (data) {
      const parsedData = JSON.parse(data)
      console.log('[v0] Teachers data loaded from localStorage:', parsedData.teachers?.length || 0, 'teachers')
      return parsedData
    }
  } catch (error) {
    console.error('[v0] Error loading teachers from localStorage:', error)
  }
  return null
}

const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine
}

function AddTeacherModal({
  isOpen,
  onClose,
  onTeacherAdded,
}: {
  isOpen: boolean
  onClose: () => void
  onTeacherAdded: () => void
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await createTeacher(formData)
      setFormData({ fullName: "", email: "", phone: "", subject: "" })
      onTeacherAdded()
      onClose()
    } catch (err) {
      setError("Failed to create teacher. Please try again.")
      console.error("Error creating teacher:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Add New Teacher</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              placeholder="Enter subject"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#073B7F] text-white rounded-lg hover:bg-[#062f66] transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading ? "Creating..." : "Create Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ViewTeacherModal({
  isOpen,
  onClose,
  teacher,
}: {
  isOpen: boolean
  onClose: () => void
  teacher: Teacher | null
}) {
  if (!isOpen || !teacher) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Teacher Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{teacher.fullName}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{teacher.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{teacher.phone}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Access Code</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{teacher.accessCode}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">School</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{teacher.school.name}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#073B7F] text-white rounded-lg hover:bg-[#062f66] transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function EditTeacherModal({
  isOpen,
  onClose,
  teacher,
  onTeacherUpdated,
}: {
  isOpen: boolean
  onClose: () => void
  teacher: Teacher | null
  onTeacherUpdated: () => void
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen && teacher) {
      setFormData({
        fullName: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone,
        subject: "", // This would need to be fetched from teacher data
      })
    }
  }, [isOpen, teacher])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teacher) return

    setIsLoading(true)
    setError("")

    try {
      await updateTeacher(teacher.id, formData)
      onTeacherUpdated()
      onClose()
    } catch (err) {
      setError("Failed to update teacher. Please try again.")
      console.error("Error updating teacher:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen || !teacher) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Edit Teacher</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              placeholder="Enter subject"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#073B7F] text-white rounded-lg hover:bg-[#062f66] transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading ? "Updating..." : "Update Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentSchool, setCurrentSchool] = useState<{ id: number; name: string } | null>(null)

  const loadSchool = async () => {
    try {
      console.log("[v0] Loading school data...")
      const schoolData = await fetchSchool()
      console.log("[v0] School data loaded:", schoolData)
      setCurrentSchool({ id: schoolData.id, name: schoolData.name })
      return schoolData.id
    } catch (err) {
      console.error("[v0] Error fetching school:", err)
      if (err instanceof Error && err.message.includes("Authentication failed")) {
        console.log("[v0] Authentication failed - will show all teachers")
      }
      return null
    }
  }

  const loadTeachers = async () => {
    console.log("[Teachers] Starting loadTeachers function")

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log("[Teachers] Load timeout reached, forcing completion")
      setIsLoading(false)
      if (teachers.length === 0) {
        setError("Loading took too long. Please refresh the page or check your connection.")
      }
    }, 10000) // 10 second timeout

    try {
      setIsLoading(true)
      console.log("[Teachers] Starting to load teachers...")

      // First, try to load from localStorage
      const localData = loadTeachersFromLocalStorage()
      if (localData && localData.teachers) {
        console.log("[Teachers] Loading teachers from localStorage:", localData.teachers.length, "teachers")
        setTeachers(localData.teachers)
        setCurrentSchool(localData.schoolId ? { id: localData.schoolId, name: 'School' } : null)
        setError("")
      }

      // If online, try to fetch fresh data from API
      if (isOnline()) {
        console.log("[Teachers] Online - attempting to fetch fresh data from API...")
        try {
          const schoolId = await loadSchool()
          console.log("[Teachers] School ID obtained:", schoolId)

          const response = await fetchTeachers()
          console.log("[Teachers] API Response received:", response)

          const teachersData = Array.isArray(response) ? response : []
          console.log("[Teachers] Teachers data array:", teachersData.length, "items")

          let filteredTeachers: Teacher[] = []
          if (schoolId) {
            filteredTeachers = teachersData.filter((teacher) => teacher.school?.id === schoolId)
            console.log("[Teachers] Filtered teachers by school ID:", schoolId, "Count:", filteredTeachers.length)
          } else {
            filteredTeachers = teachersData
            console.log("[Teachers] No school filtering - showing all teachers:", teachersData.length)
          }

          // Update state with fresh data
          setTeachers(filteredTeachers)
          setCurrentSchool(schoolId ? { id: schoolId, name: 'School' } : null)

          // Save fresh data to localStorage
          saveTeachersToLocalStorage(filteredTeachers, schoolId)

          console.log("[Teachers] Teachers loaded successfully from API:", filteredTeachers.length)
          setError("")
        } catch (apiError) {
          console.error("[Teachers] API fetch failed, using localStorage data:", apiError)
          // Keep localStorage data if API fails
          if (!localData) {
            setTeachers([])
            if (apiError instanceof Error && apiError.message.includes("Authentication failed")) {
              setError("Authentication failed. Please login as a school administrator to access teacher data.")
            } else if (apiError instanceof Error && apiError.message.includes("Session expired")) {
              setError("Your session has expired. Please login again.")
            } else {
              setError("Failed to load teachers from server. Using cached data if available.")
            }
          }
        }
      } else {
        console.log("[Teachers] Offline - using localStorage data only")
        if (!localData) {
          setError("No internet connection and no cached data available. Please connect to the internet and try again.")
        }
      }
    } catch (err) {
      console.error("[Teachers] Error in loadTeachers:", err)
      setTeachers([])

      if (err instanceof Error && err.message.includes("Authentication failed")) {
        setError("Authentication failed. Please login as a school administrator to access teacher data.")
      } else if (err instanceof Error && err.message.includes("Session expired")) {
        setError("Your session has expired. Please login again.")
      } else {
        setError("Failed to load teachers. Please try again later.")
      }
    } finally {
      clearTimeout(timeout)
      setIsLoading(false)
      console.log("[Teachers] Loading completed")
    }
  }

  useEffect(() => {
    loadTeachers()
  }, [])

  const handleViewTeacher = async (id: number) => {
    try {
      const response = await getTeacher(id)
      const teacher = response.data || response
      setSelectedTeacher(teacher)
      setIsViewModalOpen(true)
    } catch (err) {
      console.error("Error fetching teacher:", err)
      // Fallback to local data if API fails
      const teacher = teachers.find((t) => t.id === id)
      if (teacher) {
        setSelectedTeacher(teacher)
        setIsViewModalOpen(true)
      } else {
        alert("Failed to load teacher details")
      }
    }
  }

  const handleEditTeacher = async (id: number) => {
    try {
      const response = await getTeacher(id)
      const teacher = response.data || response
      setSelectedTeacher(teacher)
      setIsEditModalOpen(true)
    } catch (err) {
      console.error("Error fetching teacher for edit:", err)
      // Fallback to local data if API fails
      const teacher = teachers.find((t) => t.id === id)
      if (teacher) {
        setSelectedTeacher(teacher)
        setIsEditModalOpen(true)
      } else {
        alert("Failed to load teacher for editing")
      }
    }
  }

  const handleDeleteTeacher = async (id: number) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        await deleteTeacher(id)
        alert("Teacher deleted successfully")
        loadTeachers() // Refresh the list
      } catch (err) {
        console.error("Error deleting teacher:", err)
        alert("Failed to delete teacher")
      }
    }
  }

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleTeacherAdded = () => {
    loadTeachers()
  }

  const handleTeacherUpdated = () => {
    loadTeachers()
  }

  // Function to clear cached data (useful for manual refresh)
  const clearCachedData = () => {
    try {
      localStorage.removeItem('school_teachers_data')
      console.log('[v0] Cached teacher data cleared')
    } catch (error) {
      console.error('[v0] Error clearing cached data:', error)
    }
  }

  if (isLoading) {
    return (
      <div className={`${poppins.className} flex items-center justify-center min-h-screen bg-[#DDE5FF]`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#073B7F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teachers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${poppins.className} bg-[#DDE5FF] min-h-screen`}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Your Teachers</h1>
          <div className="relative w-full sm:w-auto">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-sm placeholder-gray-400 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 mt-4 bg-white px-2 py-3 rounded-3xl w-full gap-3 sm:gap-0">
          <p className="text-xs text-gray-600">
            You have <span className="font-semibold text-[#073B7F]">{teachers.length} Teachers</span>
            {currentSchool && <span> at {currentSchool.name}</span>}...
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 bg-[#073B7F] text-white rounded-full text-xs font-medium hover:bg-[#062f66] transition-colors flex items-center gap-1 w-full sm:w-auto justify-center"
          >
            <span className="text-sm">+</span>
            Add New Teacher
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

      <div className="rounded-lg p-2 sm:p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <table className="w-full" style={{ borderSpacing: "4px", borderCollapse: "separate" }}>
            <thead>
              <tr>
                <th className="text-center text-xs sm:text-sm font-bold text-gray-700 px-2 sm:px-4 py-3 bg-white">
                  Full Name
                </th>
                <th className="text-center text-xs sm:text-sm font-bold text-gray-700 px-2 sm:px-4 py-3 bg-white">
                  Email
                </th>
                <th className="text-center text-xs sm:text-sm font-bold text-gray-700 px-2 sm:px-4 py-3 bg-white">
                  Phone
                </th>
                <th className="text-center text-xs sm:text-sm font-bold text-gray-700 px-2 sm:px-4 py-3 bg-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-2 sm:px-4 py-3 bg-white text-center">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">{teacher.fullName}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 bg-white text-center">
                    <span className="text-xs sm:text-sm text-gray-700">{teacher.email}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 bg-white text-center">
                    <span className="text-xs sm:text-sm text-gray-700">{teacher.phone}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 bg-white text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => handleViewTeacher(teacher.id)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        <Eye size={10} className="sm:hidden" />
                        <Eye size={12} className="hidden sm:block" />
                      </button>
                      <button
                        onClick={() => handleEditTeacher(teacher.id)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        <Edit size={10} className="sm:hidden" />
                        <Edit size={12} className="hidden sm:block" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={10} className="sm:hidden" />
                        <Trash2 size={12} className="hidden sm:block" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 sm:gap-0">
        <p className="text-xs sm:text-sm text-gray-600">
          Showing 1 to {filteredTeachers.length} of {teachers.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            Previous
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#073B7F] text-white text-xs sm:text-sm rounded hover:bg-[#062f66] transition-colors">
            1
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs sm:text-sm rounded transition-colors">
            2
          </button>
          <button className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            Next
          </button>
        </div>
      </div>

      <AddTeacherModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTeacherAdded={handleTeacherAdded} />
      <ViewTeacherModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} teacher={selectedTeacher} />
      <EditTeacherModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        teacher={selectedTeacher}
        onTeacherUpdated={handleTeacherUpdated}
      />
    </div>
  )
}