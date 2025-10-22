"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Poppins } from "next/font/google"
import {
  Home,
  Users,
  User,
  BookOpen,
  Calendar,
  Settings,
  Newspaper,
  LogOut,
  Menu,
  Bell,
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

interface Classroom {
  id: number
  className: string
  academicYear: string
  classOf: string | null
  level: string
  createdAt: string
  updatedAt: string
  formTeacher: string | null
}

interface CreateStudentData {
  fullName: string
  email: string
  phone: string
  className: string
}


const API_BASE_URL = "https://skul-africa.onrender.com"

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const possibleKeys = ["school_token", "token", "authToken", "access_token", "auth_token"]

    for (const key of possibleKeys) {
      const token = localStorage.getItem(key)
      if (token) {
        console.log("Found token with key:", key, "Length:", token.length)
        return token
      }
    }

    console.log("No token found in localStorage. Available keys:", Object.keys(localStorage))
    return null
  }
  return null
}

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const url = `${API_BASE_URL}${endpoint}`

  console.log("API Request:", { endpoint, hasToken: !!token, tokenLength: token?.length })
  if (options.body) {
    try {
      console.log("Request Body:", JSON.parse(options.body as string))
    } catch {
      console.log("Request Body (raw):", options.body)
    }
  }

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
    // Try to log the error body from backend
    let errorBody: any
    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }
    console.error("API Error Response Body:", errorBody)

    if (response.status === 401) {
      console.log("Authentication failed - token may be invalid or expired")
      localStorage.removeItem("school_token")
      localStorage.removeItem("token")
      localStorage.removeItem("authToken")
      localStorage.removeItem("access_token")
      localStorage.removeItem("auth_token")
      alert("Your session has expired. Please login again.")
      window.location.href = "/login_select"
      throw new Error(`Session expired. Please login again.`)
    }

    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}


const createStudent = async (studentData: CreateStudentData) => {
  return apiRequest("/api/v1/student/create", {
    method: "POST",
    body: JSON.stringify(studentData),
  })
}

const fetchStudents = async () => {
  return apiRequest("/api/v1/student")
}

const fetchClassrooms = async () => {
  return apiRequest("/api/v1/classrooms")
}

const getStudent = async (id: number) => {
  return apiRequest(`/api/v1/student/${id}`)
}

const updateStudent = async (id: number, studentData: Partial<CreateStudentData>) => {
  return apiRequest(`/api/v1/student/${id}`, {
    method: "PATCH",
    body: JSON.stringify(studentData),
  })
}

const deleteStudent = async (id: number) => {
  return apiRequest(`/api/v1/student/${id}`, {
    method: "DELETE",
  })
}

const fetchSchool = async () => {
  return apiRequest("/api/v1/school/me")
}

// Offline data management functions
const saveStudentsToLocalStorage = (students: Student[], schoolId?: number) => {
  try {
    const dataToSave = {
      students,
      schoolId,
      lastUpdated: Date.now(),
      version: '1.0'
    }
    localStorage.setItem('school_students_data', JSON.stringify(dataToSave))
    console.log('Students data saved to localStorage:', students.length, 'students')
  } catch (error) {
    console.error('Error saving students to localStorage:', error)
  }
}

const loadStudentsFromLocalStorage = (): { students: Student[], schoolId?: number, lastUpdated?: number } | null => {
  try {
    const data = localStorage.getItem('school_students_data')
    if (data) {
      const parsedData = JSON.parse(data)
      console.log('Students data loaded from localStorage:', parsedData.students?.length || 0, 'students')
      return parsedData
    }
  } catch (error) {
    console.error('Error loading students from localStorage:', error)
  }
  return null
}

const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine
}

function AddStudentModal({
  isOpen,
  onClose,
  onStudentAdded,
}: {
  isOpen: boolean
  onClose: () => void
  onStudentAdded: () => void
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    className: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [classroomsLoading, setClassroomsLoading] = useState(false)


  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      loadClassrooms()
    }
  }, [isOpen])

  const loadClassrooms = async () => {
    try {
      setClassroomsLoading(true)
      const response = await fetchClassrooms()
      setClassrooms(response.data || [])
    } catch (err) {
      console.error("Error fetching classrooms:", err)
      if (err instanceof Error && err.message.includes("Authentication failed")) {
        setError("Authentication failed. Please login again.")
      }
      // Fallback to hardcoded options if API fails
      setClassrooms([])
    } finally {
      setClassroomsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await createStudent(formData)
      setFormData({ fullName: "", email: "", phone: "", className: "" })
      onStudentAdded()
      onClose()
    } catch (err) {
      setError("Failed to create student. Please try again.")
      console.error("Error creating student:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Add New Student</h2>
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
            <label className="block text-sm font-semibold text-gray-900 mb-1">Class</label>
            <select
              required
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              disabled={classroomsLoading}
            >
              <option value="">{classroomsLoading ? "Loading classes..." : "Select class"}</option>
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.className}>
                  {classroom.className}
                </option>
              ))}
              {/* Fallback options if API fails */}
              {classrooms.length === 0 && !classroomsLoading && (
                <>
                  <option value="jss1">JSS 1</option>
                  <option value="jss2">JSS 2</option>
                  <option value="jss3">JSS 3</option>
                  <option value="ss1">SS 1</option>
                  <option value="ss2">SS 2</option>
                  <option value="ss3">SS 3</option>
                </>
              )}
            </select>
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
              {isLoading ? "Creating..." : "Create Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ViewStudentModal({
  isOpen,
  onClose,
  student,
}: {
  isOpen: boolean
  onClose: () => void
  student: Student | null
}) {
  if (!isOpen || !student) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Student Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{student.fullName}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{student.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{student.phone}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Class</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
              {student.pendingClassName || (student.classroomId ? "Assigned" : "Not Assigned")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
            <span
              className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold ${student.classroomId ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}
            >
              {student.classroomId ? "ENROLLED" : "PENDING"}
            </span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Access Code</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{student.accessCode}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">School</label>
            <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{student.school.name}</p>
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

function EditStudentModal({
  isOpen,
  onClose,
  student,
  onStudentUpdated,
}: {
  isOpen: boolean
  onClose: () => void
  student: Student | null
  onStudentUpdated: () => void
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    className: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [classroomsLoading, setClassroomsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && student) {
      setFormData({
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
        className: student.pendingClassName || "",
      })
      loadClassrooms()
    }
  }, [isOpen, student])

  const loadClassrooms = async () => {
    try {
      setClassroomsLoading(true)
      const response = await fetchClassrooms()
      setClassrooms(response.data || [])
    } catch (err) {
      console.error("Error fetching classrooms:", err)
      setClassrooms([])
    } finally {
      setClassroomsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return

    setIsLoading(true)
    setError("")

    try {
      await updateStudent(student.id, formData)
      onStudentUpdated()
      onClose()
    } catch (err) {
      setError("Failed to update student. Please try again.")
      console.error("Error updating student:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen || !student) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Edit Student</h2>
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
            <label className="block text-sm font-semibold text-gray-900 mb-1">Class</label>
            <select
              required
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#073B7F] focus:ring-1 focus:ring-[#073B7F] text-gray-900"
              disabled={classroomsLoading}
            >
              <option value="">{classroomsLoading ? "Loading classes..." : "Select class"}</option>
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.className}>
                  {classroom.className}
                </option>
              ))}
              {classrooms.length === 0 && !classroomsLoading && (
                <>
                  <option value="jss1">JSS 1</option>
                  <option value="jss2">JSS 2</option>
                  <option value="jss3">JSS 3</option>
                  <option value="ss1">SS 1</option>
                  <option value="ss2">SS 2</option>
                  <option value="ss3">SS 3</option>
                </>
              )}
            </select>
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
              {isLoading ? "Updating..." : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentSchool, setCurrentSchool] = useState<{ id: number; name: string } | null>(null)

  const loadSchool = async () => {
    try {
      console.log("Loading school data...")
      const schoolData = await fetchSchool()
      console.log("School data loaded:", schoolData)
      setCurrentSchool({ id: schoolData.id, name: schoolData.name })
      return schoolData.id
    } catch (err) {
      console.error("Error fetching school:", err)
      if (err instanceof Error && err.message.includes("Authentication failed")) {
        console.log("Authentication failed - will show all students")
      }
      return null
    }
  }

  const loadStudents = async () => {
    console.log("[Students] Starting loadStudents function")

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log("[Students] Load timeout reached, forcing completion")
      setIsLoading(false)
      if (students.length === 0) {
        setError("Loading took too long. Please refresh the page or check your connection.")
      }
    }, 10000) // 10 second timeout

    try {
      setIsLoading(true)
      console.log("[Students] Starting to load students...")

      // First, try to load from localStorage
      const localData = loadStudentsFromLocalStorage()
      if (localData && localData.students) {
        console.log("[Students] Loading students from localStorage:", localData.students.length, "students")
        setStudents(localData.students)
        setCurrentSchool(localData.schoolId ? { id: localData.schoolId, name: 'School' } : null)
        setError("")
      }

      // If online, try to fetch fresh data from API
      if (isOnline()) {
        console.log("[Students] Online - attempting to fetch fresh data from API...")
        try {
          const schoolId = await loadSchool()
          console.log("[Students] School ID obtained:", schoolId)

          const response = await fetchStudents()
          console.log("[Students] API Response received:", response)

          const studentsData = Array.isArray(response) ? response : []
          console.log("[Students] Students data array:", studentsData.length, "items")

          let filteredStudents: Student[] = []
          if (schoolId) {
            filteredStudents = studentsData.filter((student) => student.school?.id === schoolId)
            console.log("[Students] Filtered students by school ID:", schoolId, "Count:", filteredStudents.length)
          } else {
            filteredStudents = studentsData
            console.log("[Students] No school filtering - showing all students:", studentsData.length)
          }

          // Update state with fresh data
          setStudents(filteredStudents)
          setCurrentSchool(schoolId ? { id: schoolId, name: 'School' } : null)

          // Save fresh data to localStorage
          saveStudentsToLocalStorage(filteredStudents, schoolId)

          console.log("[Students] Students loaded successfully from API:", filteredStudents.length)
          setError("")
        } catch (apiError) {
          console.error("[Students] API fetch failed, using localStorage data:", apiError)
          // Keep localStorage data if API fails
          if (!localData) {
            setStudents([])
            if (apiError instanceof Error && apiError.message.includes("Authentication failed")) {
              setError("Authentication failed. Please login as a school administrator to access student data.")
            } else if (apiError instanceof Error && apiError.message.includes("Session expired")) {
              setError("Your session has expired. Please login again.")
            } else {
              setError("Failed to load students from server. Using cached data if available.")
            }
          }
        }
      } else {
        console.log("[Students] Offline - using localStorage data only")
        if (!localData) {
          setError("No internet connection and no cached data available. Please connect to the internet and try again.")
        }
      }
    } catch (err) {
      console.error("[Students] Error in loadStudents:", err)
      setStudents([])

      if (err instanceof Error && err.message.includes("Authentication failed")) {
        setError("Authentication failed. Please login as a school administrator to access student data.")
      } else if (err instanceof Error && err.message.includes("Session expired")) {
        setError("Your session has expired. Please login again.")
      } else {
        setError("Failed to load students. Please try again later.")
      }
    } finally {
      clearTimeout(timeout)
      setIsLoading(false)
      console.log("[Students] Loading completed")
    }
  }

  useEffect(() => {
    console.log("[Students] Component mounted, calling loadStudents")
    loadStudents()
  }, [])

  const handleViewStudent = async (id: number) => {
    try {
      const response = await getStudent(id)
      const student = response.data || response
      setSelectedStudent(student)
      setIsViewModalOpen(true)
    } catch (err) {
      console.error("Error fetching student:", err)
      // Fallback to local data if API fails
      const student = students.find((s) => s.id === id)
      if (student) {
        setSelectedStudent(student)
        setIsViewModalOpen(true)
      } else {
        alert("Failed to load student details")
      }
    }
  }

  const handleEditStudent = async (id: number) => {
    try {
      const response = await getStudent(id)
      const student = response.data || response
      setSelectedStudent(student)
      setIsEditModalOpen(true)
    } catch (err) {
      console.error("Error fetching student for edit:", err)
      // Fallback to local data if API fails
      const student = students.find((s) => s.id === id)
      if (student) {
        setSelectedStudent(student)
        setIsEditModalOpen(true)
      } else {
        alert("Failed to load student for editing")
      }
    }
  }

  const handleDeleteStudent = async (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id)
        alert("Student deleted successfully")
        loadStudents() // Refresh the list
      } catch (err) {
        console.error("Error deleting student:", err)
        alert("Failed to delete student")
      }
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.pendingClassName && student.pendingClassName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleStudentAdded = () => {
    loadStudents()
  }

  const handleStudentUpdated = () => {
    loadStudents()
  }

  // Function to clear cached data (useful for manual refresh)
  const clearCachedData = () => {
    try {
      localStorage.removeItem('school_students_data')
      console.log('Cached student data cleared')
    } catch (error) {
      console.error('Error clearing cached data:', error)
    }
  }

  if (isLoading) {
    return (
      <div className={`${poppins.className} flex items-center justify-center min-h-screen bg-[#DDE5FF]`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#073B7F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
          <p className="text-xs text-gray-500 mt-2">If this takes too long, try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${poppins.className} bg-[#DDE5FF] dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100`}>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Your Students</h1>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
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

              {/* 🌙 / ☀️ Toggle */}
              <button
                onClick={() => {
                  const html = document.documentElement
                  const isDark = html.classList.toggle("dark")
                  localStorage.setItem("theme", isDark ? "dark" : "light")
                }}
                className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
                title="Toggle Dark Mode"
              >
                <span className="block dark:hidden">🌙</span>
                <span className="hidden dark:block">☀️</span>
              </button>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 mt-4 bg-white px-2 py-3 rounded-3xl w-full gap-3 sm:gap-0">
            <p className="text-xs text-gray-600">
              You have <span className="font-semibold text-[#073B7F]">{students.length} Students</span>
              {currentSchool && <span> at {currentSchool.name}</span>}...
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 bg-[#073B7F] text-white rounded-full text-xs font-medium hover:bg-[#062f66] transition-colors flex items-center gap-1 w-full sm:w-auto justify-center"
            >
              <span className="text-sm">+</span>
              Add New Student
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
                    Class
                  </th>
                  <th className="text-center text-xs sm:text-sm font-bold text-gray-700 px-2 sm:px-4 py-3 bg-white">
                    Status
                  </th>
                  <th className="text-center text-xs sm:text-sm font-bold text-gray-700 px-2 sm:px-4 py-3 bg-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-2 sm:px-4 py-3 bg-white text-center">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{student.fullName}</span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 bg-white text-center">
                      <span className="text-xs sm:text-sm text-gray-700">
                        {student.pendingClassName || (student.classroomId ? "Assigned" : "Not Assigned")}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 bg-white text-center">
                      <span
                        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded text-xs font-bold ${student.classroomId ? "bg-green-600 text-white" : "bg-red-600 text-white"
                          }`}
                      >
                        {student.classroomId ? "ENROLLED" : "PENDING"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 bg-white text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleViewStudent(student.id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <Eye size={10} className="sm:hidden" />
                          <Eye size={12} className="hidden sm:block" />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student.id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                          <Edit size={10} className="sm:hidden" />
                          <Edit size={12} className="hidden sm:block" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
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
            Showing 1 to {filteredStudents.length} of {students.length} entries
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
      </div>

      <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onStudentAdded={handleStudentAdded} />
      <ViewStudentModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} student={selectedStudent} />
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={selectedStudent}
        onStudentUpdated={handleStudentUpdated}
      />
    </div>
  )
}
