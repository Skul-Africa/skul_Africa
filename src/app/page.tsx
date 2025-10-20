"use client";

import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  Globe2,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  School,
  Heart,
  Handshake,
  Star,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

console.log("EduCentralLanding (final) loaded");

export default function EduCentralLanding() {
  // KEEP ALL FUNCTIONALITY (theme toggle, mobile menu, login/signup behavior)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => setIsDarkMode((s) => !s);
  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const handleLogin = () => (window.location.href = "/login_select");
  const handleSignUp = () => (window.location.href = "/signup_select");

  // Unsplash image URLs (good for demos; swap later for your assets)
  const images = {
    heroStudents:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop",
    teacherGroup:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1400&auto=format&fit=crop",
    classroomUrban:
      "https://images.unsplash.com/photo-1533089860892-a7b8c3f6d0a7?q=80&w=1400&auto=format&fit=crop",
    schoolAdmin:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
    testimonial1:
      "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial2:
      "https://randomuser.me/api/portraits/men/43.jpg",
    testimonial3:
      "https://randomuser.me/api/portraits/women/56.jpg",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 text-slate-900 ${isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
        }`}
    >
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <img
            src="/icon.png" // Place your logo inside the public folder
            alt="Skul Africa Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: "Courses", href: "/courses" },
            { name: "Programs", href: "/programs" },
            { name: "Community", href: "/community" },
            { name: "About", href: "/about" },
            { name: "FAQ", href: "/faq" },
          ].map(({ name, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`text-sm transition ${active
                    ? isDarkMode
                      ? "text-blue-300 font-semibold"
                      : "text-blue-700 font-semibold"
                    : isDarkMode
                      ? "hover:text-blue-200"
                      : "hover:text-blue-700"
                  }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full transition ${isDarkMode ? "bg-white/10" : "bg-blue-100"
              }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleLogin}
              className={`px-3 py-2 rounded-full border text-sm ${isDarkMode ? "border-white/20 hover:bg-white/5" : "border-blue-200"
                }`}
            >
              <LogIn className="inline w-4 h-4 mr-2" /> Login
            </button>
            <button
              onClick={handleSignUp}
              className={`px-3 py-2 rounded-full text-sm font-semibold shadow ${isDarkMode ? "bg-blue-400 text-blue-900" : "bg-blue-600 text-white"
                }`}
            >
              <UserPlus className="inline w-4 h-4 mr-2" /> Join
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full bg-white/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <BookOpen />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden bg-white/5 px-4 py-4 border-t ${isDarkMode ? "border-white/10" : "border-blue-100"
            }`}
        >
          <div className="flex flex-col gap-3">
            <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>
              Courses
            </Link>
            <Link href="/programs" onClick={() => setIsMobileMenuOpen(false)}>
              Programs
            </Link>
            <Link href="/community" onClick={() => setIsMobileMenuOpen(false)}>
              Community
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  handleLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-full border text-sm w-full"
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleSignUp();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-full text-sm font-semibold w-full bg-blue-500 text-white"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-300">
              <Globe2 className="w-5 h-5" />
              Serving learners across Africa
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Education that reaches every community — <span className="text-blue-400">practical</span>,{" "}
              <span className="text-blue-300">human</span>, and <span className="text-indigo-300">scalable</span>.
            </h1>

            <p className={`max-w-xl ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
              Skul Africa partners with teachers, schools and organisations to bring quality learning to students in remote,
              peri-urban and urban communities. We combine teacher support, local context resources and lightweight technology.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleSignUp}
                className="px-5 py-3 rounded-full font-semibold bg-blue-400 text-blue-900 shadow"
              >
                Get Started
              </button>
              <button
                onClick={handleLogin}
                className={`px-5 py-3 rounded-full border ${isDarkMode ? "border-white/20 hover:bg-white/5" : "border-blue-200"
                  }`}
              >
                Learn More
              </button>
            </div>

            {/* Quick impact stats */}
            <div className="flex gap-6 mt-4 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold">10k+</div>
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Students reached</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">250+</div>
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Partner schools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Countries connected</div>
              </div>
            </div>
          </div>

          {/* Right: image collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="row-span-2 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images.heroStudents}
                alt="Group of students learning together"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images.teacherGroup}
                alt="Teachers collaborating in a training"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images.classroomUrban}
                alt="Urban classroom setting with students"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* MISSION & CULTURE */}
        <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-3">Our Mission & Culture</h2>
            <p className={`${isDarkMode ? "text-blue-200" : "text-slate-700"} mb-4 max-w-xl`}>
              We believe learning is a right, not a privilege. Skul Africa's culture is built on inclusivity,
              teacher empowerment and contextual learning — supporting teachers with practical resources,
              and students with lessons that reflect their realities.
            </p>

            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <Heart className="w-5 h-5 text-pink-500 mt-1" />
                <div>
                  <div className="font-semibold">Learner-first</div>
                  <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                    Lessons and materials built around learners' context and language where possible.
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <School className="w-5 h-5 text-indigo-400 mt-1" />
                <div>
                  <div className="font-semibold">School partnerships</div>
                  <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                    Work with school admins to integrate our content within existing timetables.
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Handshake className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold">Community-driven</div>
                  <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                    Local mentors, NGOs and teachers co-create initiatives that scale sustainably.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={images.schoolAdmin}
              alt="School management meeting"
              className="object-cover w-full h-64"
              loading="lazy"
            />
          </div>
        </section>

        {/* WHO WE SERVE */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">Who We Serve</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <Users className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Students in underserved regions</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                Lightweight, accessible lessons for low-bandwidth and offline use.
              </p>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <School className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Schools & administrators</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                Tools to measure learning progress and support teachers with minimal overhead.
              </p>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <BookOpen className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Teachers & mentors</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                Practical training, lesson plans and AI-assisted summaries to reduce prep time.
              </p>
            </div>
          </div>
        </section>

        {/* PARTNERS & ORGANIZATIONS */}
        <section className="mt-12 py-8">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Partners & Organizations</h3>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
              We partner with NGOs, foundations and local education authorities to scale responsibly.
            </p>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
              {/* placeholder logos (SVG shapes) */}
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="90" height="30" rx="6" fill={isDarkMode ? "#0ea5e9" : "#2563eb"} />
                </svg>
              </div>
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="90" height="30" rx="6" fill={isDarkMode ? "#8b5cf6" : "#7c3aed"} />
                </svg>
              </div>
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="90" height="30" rx="6" fill={isDarkMode ? "#f59e0b" : "#f97316"} />
                </svg>
              </div>
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="90" height="30" rx="6" fill={isDarkMode ? "#34d399" : "#10b981"} />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">Stories from the Field</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Amina, Student — Nigeria",
                text:
                  "I could access lessons even when my village had no stable internet. The teachers help me every day.",
                avatar: images.testimonial1,
              },
              {
                name: "David, Teacher — Kenya",
                text:
                  "The lesson plans and AI summaries reduce my prep time and help me reach more students during class.",
                avatar: images.testimonial2,
              },
              {
                name: "Fatou, Admin — Senegal",
                text:
                  "We partnered with Skul Africa to train teachers — attendance and performance improved within months.",
                avatar: images.testimonial3,
              },
            ].map((t, i) => (
              <article
                key={i}
                className={`p-5 rounded-lg shadow-lg ${isDarkMode ? "bg-white/5" : "bg-white"
                  }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className={`text-xs ${isDarkMode ? "text-blue-200" : "text-slate-500"}`}>Community</div>
                  </div>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>“{t.text}”</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center py-12">
          <h3 className="text-2xl font-bold mb-3">Be part of the change</h3>
          <p className={`max-w-2xl mx-auto mb-6 ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
            Students, teachers and partners all play a role. Whether you want to learn, teach or sponsor — join us.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleSignUp} className="px-6 py-3 rounded-full bg-blue-400 text-blue-900 font-semibold">
              Get Started
            </button>
            <button onClick={handleLogin} className="px-6 py-3 rounded-full border">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDarkMode ? "border-white/10" : "border-blue-100"}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${isDarkMode ? "bg-blue-400" : "bg-blue-600"
                }`}
            >
              <GraduationCap className={`w-5 h-5 ${isDarkMode ? "text-blue-900" : "text-white"}`} />
            </div>
            <div>
              <div className="font-semibold">Skul Africa</div>
              <div className={`text-xs ${isDarkMode ? "text-blue-200" : "text-slate-500"}`}>
                Empowering learning across Africa
              </div>
            </div>
          </div>

          <div className="text-sm">
            © {new Date().getFullYear()} Skul Africa — Built with care for education.
          </div>
        </div>
      </footer>
    </div>
  );
}
