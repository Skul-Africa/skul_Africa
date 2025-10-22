import type React from "react"
import { Card } from "@/components/ui/card"

interface SubjectCardProps {
  name: string
  illustration: React.ReactNode
}

export function SubjectCard({ name, illustration }: SubjectCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden border-0 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col items-center p-6">
        <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-50">{illustration}</div>
        <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-700">{name}</h3>
      </div>
    </Card>
  )
}

export function ChemistryIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <ellipse cx="50" cy="80" rx="35" ry="8" fill="#e5e7eb" />
      <path d="M 40 50 L 35 70 Q 35 75 40 75 L 60 75 Q 65 75 65 70 L 60 50" fill="#10b981" opacity="0.6" />
      <rect x="38" y="45" width="24" height="8" rx="1" fill="#34d399" />
      <path d="M 45 45 L 42 30 L 58 30 L 55 45" fill="none" stroke="#6b7280" strokeWidth="2" />
      <circle cx="48" cy="60" r="3" fill="#34d399" opacity="0.8" />
      <circle cx="55" cy="65" r="2" fill="#34d399" opacity="0.8" />
    </svg>
  )
}

export function BiologyIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <ellipse cx="50" cy="85" rx="30" ry="6" fill="#e5e7eb" />
      <circle cx="50" cy="45" r="25" fill="#60a5fa" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="50" cy="45" r="18" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="35" y="65" width="8" height="25" rx="2" fill="#f59e0b" />
      <circle cx="39" cy="60" r="5" fill="#fbbf24" />
      <path d="M 39 55 L 39 40" stroke="#f59e0b" strokeWidth="2" />
      <rect x="57" y="70" width="8" height="20" rx="2" fill="#60a5fa" />
      <circle cx="61" cy="65" r="5" fill="#93c5fd" />
    </svg>
  )
}

export function PhysicsIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <ellipse cx="50" cy="85" rx="30" ry="6" fill="#e5e7eb" />
      <path d="M 30 50 Q 30 35 45 35 L 55 35 Q 70 35 70 50 Q 70 65 55 65 L 45 65 Q 30 65 30 50" fill="#ef4444" />
      <path d="M 30 50 Q 30 35 45 35 L 55 35 Q 70 35 70 50" fill="#f87171" />
      <rect x="48" y="30" width="4" height="10" fill="#6b7280" />
      <rect x="25" y="48" width="15" height="4" fill="#3b82f6" />
      <rect x="60" y="48" width="15" height="4" fill="#3b82f6" />
      <circle cx="35" cy="50" r="3" fill="#60a5fa" />
      <circle cx="65" cy="50" r="3" fill="#60a5fa" />
    </svg>
  )
}

export function GeographyIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <rect x="25" y="60" width="50" height="8" rx="2" fill="#f59e0b" />
      <rect x="28" y="68" width="44" height="6" rx="2" fill="#fbbf24" />
      <rect x="31" y="74" width="38" height="5" rx="2" fill="#f59e0b" />
      <circle cx="50" cy="40" r="20" fill="#60a5fa" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 45 30 Q 50 35 55 30" fill="#10b981" />
      <path d="M 40 45 Q 45 42 48 45" fill="#10b981" />
      <circle cx="50" cy="40" r="3" fill="#ef4444" />
      <path d="M 50 37 L 50 25" stroke="#6b7280" strokeWidth="1" />
    </svg>
  )
}

export function MathematicsIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <rect x="30" y="45" width="25" height="32" rx="2" fill="#3b82f6" />
      <rect x="32" y="47" width="21" height="8" fill="#60a5fa" />
      <rect x="32" y="57" width="21" height="2" fill="#93c5fd" />
      <rect x="32" y="61" width="21" height="2" fill="#93c5fd" />
      <rect x="32" y="65" width="21" height="2" fill="#93c5fd" />
      <rect x="60" y="35" width="18" height="24" rx="2" fill="#f59e0b" />
      <rect x="62" y="37" width="14" height="6" fill="#fbbf24" />
      <rect x="62" y="45" width="14" height="2" fill="#fcd34d" />
      <rect x="62" y="49" width="14" height="2" fill="#fcd34d" />
      <ellipse cx="50" cy="80" rx="30" ry="6" fill="#e5e7eb" />
    </svg>
  )
}

export function EnglishIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <rect x="30" y="50" width="22" height="28" rx="2" fill="#8b5cf6" />
      <rect x="32" y="52" width="18" height="8" fill="#a78bfa" />
      <rect x="48" y="45" width="22" height="28" rx="2" fill="#ec4899" />
      <rect x="50" y="47" width="18" height="8" fill="#f9a8d4" />
      <path d="M 40 35 L 35 50 L 45 50 Z" fill="#fbbf24" />
      <rect x="38" y="32" width="4" height="6" fill="#f59e0b" />
      <circle cx="40" cy="30" r="3" fill="#fbbf24" />
      <ellipse cx="50" cy="80" rx="30" ry="6" fill="#e5e7eb" />
    </svg>
  )
}

export function FineArtsIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <ellipse cx="50" cy="85" rx="30" ry="6" fill="#e5e7eb" />
      <path d="M 35 75 L 32 55 L 68 55 L 65 75 Z" fill="#f59e0b" />
      <rect x="30" y="75" width="40" height="3" fill="#d97706" />
      <rect x="48" y="55" width="4" height="35" fill="#92400e" />
      <rect x="35" y="35" width="30" height="22" rx="1" fill="#60a5fa" />
      <path d="M 40 45 Q 50 40 60 45" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="45" cy="50" r="2" fill="#ef4444" />
      <path d="M 55 48 L 58 52 L 52 52 Z" fill="#10b981" />
    </svg>
  )
}

export function HistoryIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <ellipse cx="50" cy="85" rx="30" ry="6" fill="#e5e7eb" />
      <rect x="35" y="50" width="30" height="25" rx="2" fill="#8b5cf6" />
      <rect x="37" y="52" width="26" height="6" fill="#a78bfa" />
      <rect x="37" y="60" width="26" height="2" fill="#c4b5fd" />
      <rect x="37" y="64" width="26" height="2" fill="#c4b5fd" />
      <rect x="37" y="68" width="26" height="2" fill="#c4b5fd" />
      <circle cx="50" cy="35" r="15" fill="#f59e0b" opacity="0.3" stroke="#d97706" strokeWidth="2" />
      <path d="M 45 25 L 50 35 L 55 25" fill="#fbbf24" />
      <circle cx="50" cy="35" r="3" fill="#ef4444" />
    </svg>
  )
}