"use client"

import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SubjectCard,
  ChemistryIllustration,
  BiologyIllustration,
  PhysicsIllustration,
  GeographyIllustration,
  MathematicsIllustration,
  EnglishIllustration,
  FineArtsIllustration,
  HistoryIllustration,
} from "@/components/subjects"

const subjects = [
  { name: "Chemistry", illustration: <ChemistryIllustration /> },
  { name: "Biology", illustration: <BiologyIllustration /> },
  { name: "Physics", illustration: <PhysicsIllustration /> },
  { name: "Geography", illustration: <GeographyIllustration /> },
  { name: "Mathematics", illustration: <MathematicsIllustration /> },
  { name: "English", illustration: <EnglishIllustration /> },
  { name: "Fine Arts", illustration: <FineArtsIllustration /> },
  { name: "History", illustration: <HistoryIllustration /> },
]

export default function CoursesPage() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Your Courses</h1>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Search here..." className="w-64 pl-10" />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
              <span className="text-sm font-medium text-white">A</span>
            </div>
          </div>
        </div>

        {/* Loading Banner */}
        <div className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            <span className="text-sm text-gray-600">
              Loading <span className="font-medium">Curriculum & Subjects</span> for Grade 1-9
            </span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Subject
          </Button>
        </div>

        {/* Subject Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject, index) => (
            <SubjectCard key={`${subject.name}-${index}`} name={subject.name} illustration={subject.illustration} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </main>
  )
}