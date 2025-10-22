"use client";

import {
  GraduationCap,
  Sun,
  Moon,
  Users,
  Briefcase,
  Lightbulb,
  BookOpen,
  Rocket,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Programs() {
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
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Intro */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Skul Africa <span className="text-blue-400">Programs</span>
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            Empowering schools, teachers, and students through transformative
            educational programs, digital literacy training, and real-world learning experiences.
          </p>
        </section>

        {/* Program Highlights */}
        <section className="grid sm:grid-cols-2 gap-8 mb-16">
          <div
            className={`p-8 rounded-2xl shadow-lg ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <BookOpen className="w-10 h-10 mb-4 text-blue-400" />
            <h2 className="text-2xl font-semibold mb-3">Digital Skills Program</h2>
            <p className="text-lg leading-relaxed">
              Aimed at bridging the digital divide, our Digital Skills Program trains
              students in essential tech tools, coding, and problem-solving — preparing
              them for the global digital economy.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow-lg ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <Lightbulb className="w-10 h-10 mb-4 text-blue-400" />
            <h2 className="text-2xl font-semibold mb-3">Innovation Labs</h2>
            <p className="text-lg leading-relaxed">
              We host innovation labs where students learn to design creative solutions
              to local and global problems using technology, teamwork, and design thinking.
            </p>
          </div>
        </section>

        {/* Seminars & Workshops */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <Calendar className="w-10 h-10 mb-4 text-blue-400" />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Seminars & Student Workshops
          </h2>
          <p className="text-lg leading-relaxed">
            Skul Africa regularly hosts seminars and workshops across different schools
            — helping students and teachers gain exposure to global education trends,
            leadership principles, mental health awareness, and digital transformation.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Our events have inspired thousands of learners to think beyond the classroom,
            build confidence, and pursue their passions with purpose.
          </p>
        </section>

        {/* Community Outreach */}
        <section className="grid sm:grid-cols-2 gap-8 mb-16">
          <div
            className={`p-8 rounded-2xl shadow-md ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <Users className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-3">Community Outreach</h3>
            <p className="text-lg leading-relaxed">
              We organize mentorship drives and volunteer programs that connect students
              with educators and professionals across Africa — strengthening the bond between schools and communities.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow-md ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <Briefcase className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-3">Career Readiness Programs</h3>
            <p className="text-lg leading-relaxed">
              Our career readiness initiatives guide students through professional
              development, CV writing, and internship matching — preparing them for
              success after graduation.
            </p>
          </div>
        </section>

        {/* Future Goals */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <Rocket className="w-10 h-10 mb-4 text-blue-400" />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            The Future of Skul Africa Programs
          </h2>
          <p className="text-lg leading-relaxed">
            We’re expanding our programs to reach more schools across Africa — integrating
            advanced STEM workshops, entrepreneurship bootcamps, and hybrid learning
            experiences designed to build Africa’s next generation of innovators.
          </p>
        </section>

        {/* Call to Action */}
        <section
          className={`text-center p-8 rounded-2xl shadow-lg ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-gray-50 border border-blue-100"
          }`}
        >
          <p className="max-w-2xl mx-auto text-lg mb-4">
            Want to bring a Skul Africa program to your school or community?
          </p>
          <button
            onClick={() => router.push("/contact")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isDarkMode
                ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Partner With Us
          </button>
        </section>
      </main>
    </div>
  );
}
