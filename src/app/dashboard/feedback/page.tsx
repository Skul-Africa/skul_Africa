"use client"

import { useState } from "react"
import { Send, WifiOff } from "lucide-react"

export default function FeedbackPage() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [status, setStatus] = useState("")

  // 🌐 Track network changes
  if (typeof window !== "undefined") {
    window.addEventListener("offline", () => setIsOffline(true))
    window.addEventListener("online", () => setIsOffline(false))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      setStatus("Please write your feedback.")
      return
    }

    if (isOffline) {
      setStatus("You're offline. Feedback will be sent when back online.")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
        }),
      })

      if (res.ok) {
        setMessage("")
        setEmail("")
        setStatus("✅ Feedback sent successfully!")
      } else {
        setStatus("❌ Failed to send feedback.")
      }
    } catch {
      setStatus("❌ Error sending feedback.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      <h1 className="text-2xl font-bold text-[#073B7F] mb-6">Send Feedback</h1>

      {isOffline && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4">
          <WifiOff size={16} /> You are currently offline.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none text-black focus:ring-2 focus:ring-[#073B7F]"
            placeholder="Your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tell us how we can make your experience better</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none  text-black focus:ring-2 focus:ring-[#073B7F] min-h-[120px]"
            placeholder="Write your thoughts..."
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className="flex items-center justify-center gap-2 bg-[#073B7F] text-white py-2 px-4 rounded-full hover:bg-[#0a4b9a] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          Send Feedback
        </button>

        {status && <p className="text-center text-sm mt-2 text-gray-700">{status}</p>}
      </form>
    </div>
  )
}
