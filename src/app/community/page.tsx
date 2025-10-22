"use client";

import {
  GraduationCap,
  Sun,
  Moon,
  Users,
  HeartHandshake,
  MessageCircle,
  Globe,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Community() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-blue-400" : "bg-blue-600"
            }`}
          >
            <GraduationCap
              className={`w-5 h-5 ${isDarkMode ? "text-blue-900" : "text-white"}`}
            />
          </div>
          <span className="text-lg sm:text-xl font-bold">skul Africa</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-blue-100 hover:bg-blue-200"
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Intro Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            The <span className="text-blue-400">Skul Africa Community</span>
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            A vibrant network of schools, teachers, students, and innovators working
            together to redefine education in Africa — one connection at a time.
          </p>
        </section>

        {/* Our Community */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <Users className="w-10 h-10 mb-4 text-blue-400" />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Building a Connected Education Ecosystem
          </h2>
          <p className="text-lg leading-relaxed">
            The Skul Africa Community was born from a simple idea — that schools across
            Africa can do more when they learn, grow, and build together. Today, we’re
            proud to host a thriving ecosystem of educators, administrators, and learners
            who share knowledge, support one another, and drive positive change in
            education technology across the continent.
          </p>
        </section>

        {/* What We’ve Built */}
        <section className="grid sm:grid-cols-2 gap-8 mb-16">
          <div
            className={`p-8 rounded-2xl shadow-md ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <HeartHandshake className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-3">A Network of Collaboration</h3>
            <p className="text-lg leading-relaxed">
              Our platform connects over <strong>hundreds of schools</strong> and{" "}
              <strong>thousands of teachers and students</strong> who share ideas,
              experiences, and strategies that drive academic success.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow-md ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <MessageCircle className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-3">A Space for Growth</h3>
            <p className="text-lg leading-relaxed">
              Through mentorship programs, webinars, and digital meetups, the Skul Africa
              Community helps teachers and students unlock new skills and grow together.
            </p>
          </div>
        </section>

        {/* Vision for the Future */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <Globe className="w-10 h-10 mb-4 text-blue-400" />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Our Vision for the Skul Africa Community
          </h2>
          <p className="text-lg leading-relaxed">
            We envision a pan-African learning network where collaboration transcends
            classrooms. From coding clubs in Lagos to science fairs in Nairobi, the Skul
            Africa Community is building the foundation for a connected, tech-driven
            generation of African learners.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Our community is open, inclusive, and dedicated to one goal — making quality
            education accessible and impactful for every child on the continent.
          </p>
        </section>

        {/* How to Join */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <Sparkles className="w-10 h-10 mb-4 text-blue-400" />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Join the Movement
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Whether you’re a teacher eager to inspire, a student hungry to learn, or a
            school looking to innovate — there’s a place for you in the Skul Africa
            Community. Join us to connect, collaborate, and shape the future of
            education in Africa.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isDarkMode
                ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Join Our Community
          </button>
        </section>

        {/* Closing Section */}
        <section
          className={`text-center p-8 rounded-2xl shadow-lg ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-gray-50 border border-blue-100"
          }`}
        >
          <p
            className={`max-w-2xl mx-auto text-lg ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            Together, we’re building a connected, innovative, and inspiring education
            community — powered by technology, driven by passion, and united by purpose.
          </p>
        </section>
      </main>
    </div>
  );
}
