// src/app/page.tsx
"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
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
  ChevronRight,
  ChevronLeft,
  Star,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function EduCentralLanding(): JSX.Element {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // center active slide index
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  // slides data
  const slides = [
    {
      key: "mission",
      title: "Our Mission",
      text:
        "Empowering African learners with quality, context-aware education — reaching students in remote and urban communities.",
      img:
        "one child.jpg",
    },
    {
      key: "vision",
      title: "Our Vision",
      text:
        "A future where every child in Africa learns without limits — supported by teachers, communities and lightweight tech.",
      img:
        "group-of-children.jpg",
    },
    {
      key: "achievements",
      title: "Achievements",
      text:
        "10k+ learners reached · 250+ partner schools · Hundreds of teachers trained.",
      img:
        "two kids.jpg",
    },
    {
      key: "commitment",
      title: "Our Commitment",
      text:
        "We partner with local educators & NGOs to deliver solutions that respect context and culture.",
      img:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
    },
    {
      key: "impact",
      title: "Real Impact",
      text: "Improved attendance, engaged teachers, and communities empowered through learning.",
      img:
        "a child.jpg",
    },
     {
      key: "join us",
      title: "join us in this journey",
      text: "join us in this jurney as we aim to transform education both online and offline for underserved schools",
      img:
        "girl writing.jpg",
    },
  ];

  // autoplay
  useEffect(() => {
    if (!isAutoPlay) return;
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(t);
  }, [isAutoPlay, slides.length]);

  // helpers
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrentIndex((i) => (i + 1) % slides.length);

  // set refs safely (callback returns void -> resolves TS type complaint)
  const setSlideRef = (index: number) => (el: HTMLDivElement | null): void => {
    slideRefs.current[index] = el;
  };

  // keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoHome = () => (window.location.href = "/"); // go home

  const images = {
    testimonial1: "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial2: "https://randomuser.me/api/portraits/men/43.jpg",
    testimonial3: "https://randomuser.me/api/portraits/women/56.jpg",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
      }`}
    >
      {/* Top Header + Logo + Desktop Nav */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          {/* Replace /icon.png in public with your logo */}
          <img
            src="/icon.png"
            alt="Skul Africa"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-md"
          />
          <div className="font-semibold text-lg">Skul Africa</div>
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
                className={`text-sm transition ${
                  active
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
            onClick={() => setIsDarkMode((v) => !v)}
            className={`p-2 rounded-full ${isDarkMode ? "bg-white/10" : "bg-blue-100"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => (window.location.href = "/login_select")}
              className={`px-3 py-2 rounded-full border text-sm ${
                isDarkMode ? "border-white/20 hover:bg-white/5" : "border-blue-200"
              }`}
            >
              <LogIn className="inline w-4 h-4 mr-2" /> Login
            </button>
            <button
              onClick={() => (window.location.href = "/signup_select")}
              className={`px-3 py-2 rounded-full text-sm font-semibold ${
                isDarkMode ? "bg-blue-400 text-blue-900" : "bg-blue-600 text-white"
              }`}
            >
              <UserPlus className="inline w-4 h-4 mr-2" /> Join
            </button>
          </div>
        </div>
      </header>

      {/* Slideshow area (square-ish cards row) */}
      <section className="w-full px-4 pt-6 flex justify-center">
        <div className="relative max-w-6xl w-full">
          {/* Prev / Next buttons */}
          <button
            onClick={() => {
              prev();
              setIsAutoPlay(false);
            }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/30 hover:bg-black/40 p-2"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => {
              next();
              setIsAutoPlay(false);
            }}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/30 hover:bg-black/40 p-2"
            title="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* horizontal scroll / carousel visible area */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{
                // center the active slide: shift by index * (card width + gap) with responsive calculations
                transform: `translateX(calc(50% - ${currentIndex * (220 + 16)}px - 110px))`,
                // above uses 220px card width + 16px gap, and centers 110px (half)
              }}
            >
              {slides.map((s, idx) => {
                const offset = idx - currentIndex;
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={s.key}
                    ref={setSlideRef(idx)}
                    className={`relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 cursor-pointer ${
                      isActive ? "scale-105 z-20" : "scale-95 z-10 opacity-80"
                    }`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsAutoPlay(false);
                    }}
                    title={s.title}
                    style={{
                      // slight translate based on offset for a layered feel
                      transform: isActive
                        ? "scale(1.06)"
                        : `scale(${offset === 0 ? 1 : 0.96}) translateX(${offset * 10}px)`,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{ willChange: "transform" }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                      <div className="text-white font-bold text-lg leading-tight">{s.title}</div>
                      <div className="text-xs text-white/90 mt-1 line-clamp-2">{s.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* indicators + autoplay toggle */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? "bg-white scale-125" : "bg-white/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}

            <button
              onClick={() => setIsAutoPlay((p) => !p)}
              className="ml-4 px-3 py-1 rounded-full border text-sm text-slate-200 bg-black/20"
              title="Toggle autoplay"
            >
              {isAutoPlay ? "Pause" : "Play"}
            </button>
          </div>

          {/* centered CTA under slides */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => (window.location.href = "/about")}
              className={`px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 ${
                isDarkMode ? "bg-white/10 text-white border border-white/20" : "bg-white text-slate-800 border border-blue-200"
              }`}
            >
              Learn More
            </button>
            <button
              onClick={() => (window.location.href = "/signup_select")}
              className="px-6 py-3 rounded-full font-semibold bg-blue-400 text-blue-900 shadow"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Top copy + collage */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-300">
              <Globe2 className="w-5 h-5" />
              Serving learners across Africa
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mt-3">
              Education that reaches every community — <span className="text-blue-400">practical</span>,{" "}
              <span className="text-blue-300">human</span>, and <span className="text-indigo-300">scalable</span>.
            </h1>
            <p className={`max-w-xl mt-4 ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
              Skul Africa partners with teachers, schools and organisations to bring quality learning to students in remote,
              peri-urban and urban communities. We combine teacher support, local context resources and lightweight technology.
            </p>

            <div className="flex gap-3 mt-6">
              <button onClick={() => (window.location.href = "/signup_select")} className="px-5 py-3 rounded-full font-semibold bg-blue-400 text-blue-900 shadow">Get Started</button>
              <button onClick={() => (window.location.href = "/login_select")} className={`px-5 py-3 rounded-full border ${isDarkMode ? "border-white/20 hover:bg-white/5" : "border-blue-200"}`}>Learn More</button>
            </div>

            <div className="flex gap-6 mt-6">
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
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Countries</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="row-span-2 rounded-2xl overflow-hidden shadow-lg">
              <img src={slides[0].img} alt="students" className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={slides[1].img} alt="teachers" className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={slides[2].img} alt="classroom" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        {/* Mission & Culture */}
        <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-3">Our Mission & Culture</h2>
            <p className={`${isDarkMode ? "text-blue-200" : "text-slate-700"} mb-4 max-w-xl`}>
              We believe learning is a right, not a privilege. Skul Africa's culture is built on inclusivity, teacher empowerment and contextual learning.
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
            <img src={slides[3].img} alt="school admin" className="object-cover w-full h-64" />
          </div>
        </section>

        {/* Who we serve */}
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
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Tools to measure learning progress with minimal overhead.</p>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <BookOpen className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Teachers & mentors</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Training, lesson plans and AI-assisted summaries to reduce prep time.</p>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="mt-12 py-8">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Partners & Organizations</h3>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
              We partner with NGOs, foundations and local education authorities to scale responsibly.
            </p>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                  <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="90" height="30" rx="6" fill={isDarkMode ? "#0ea5e9" : "#2563eb"} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">Stories from the Field</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Amina, Student — Nigeria",
                text: "I could access lessons even when my village had no stable internet. The teachers help me every day.",
                avatar: images.testimonial1,
              },
              {
                name: "David, Teacher — Kenya",
                text: "The lesson plans and AI summaries reduce my prep time and help me reach more students during class.",
                avatar: images.testimonial2,
              },
              {
                name: "Fatou, Admin — Senegal",
                text: "We partnered with Skul Africa to train teachers — attendance and performance improved within months.",
                avatar: images.testimonial3,
              },
            ].map((t, i) => (
              <article key={i} className={`p-5 rounded-lg shadow-lg ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
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
            <button onClick={() => (window.location.href = "/signup_select")} className="px-6 py-3 rounded-full bg-blue-400 text-blue-900 font-semibold">Get Started</button>
            <button onClick={() => (window.location.href = "/login_select")} className="px-6 py-3 rounded-full border">Learn More</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDarkMode ? "border-white/10" : "border-blue-100"}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isDarkMode ? "bg-blue-400" : "bg-blue-600"}`}>
              <GraduationCap className={`w-5 h-5 ${isDarkMode ? "text-blue-900" : "text-white"}`} />
            </div>
            <div>
              <div className="font-semibold">Skul Africa</div>
              <div className={`text-xs ${isDarkMode ? "text-blue-200" : "text-slate-500"}`}>Empowering learning across Africa</div>
            </div>
          </div>

          <div className="text-sm">© {new Date().getFullYear()} Skul Africa — Built with care for education.</div>
        </div>
      </footer>

      {/* Mobile bottom navbar (static) */}
      <nav className={`fixed bottom-0 left-0 w-full md:hidden flex justify-around items-center py-2 border-t z-50 backdrop-blur-md shadow-lg rounded-t-2xl ${isDarkMode ? "bg-slate-900/90 border-white/10 text-blue-200" : "bg-white/90 border-blue-100 text-blue-700"}`}>
        {[
          { name: "Home", href: "/", icon: GraduationCap },
          { name: "Courses", href: "/courses", icon: BookOpen },
          { name: "Community", href: "/community", icon: Users },
          { name: "About", href: "/about", icon: Globe2 },
          { name: "Login", href: "/login_select", icon: LogIn },
        ].map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={name} href={href} className={`flex flex-col items-center justify-center text-xs font-medium transition-all ${active ? (isDarkMode ? "text-blue-400" : "text-blue-600") : "opacity-80 hover:opacity-100"}`}>
              <Icon className="w-5 h-5 mb-1" />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* small styles for transitions */}
      <style jsx>{`
        /* ensure images animate smoothly */
        img {
          transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
