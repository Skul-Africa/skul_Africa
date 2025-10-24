// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  LogIn,
  UserPlus,
  BookOpen,
  Users,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EduCentralLandingLite() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);
  const [index, setIndex] = useState(0);

  const slides = [
    {
      title: "Our Mission",
      text: "Empowering African learners with quality, context-aware education.",
      img: "one child.jpg",
    },
    {
      title: "Our Vision",
      text: "A future where every child in Africa learns without limits.",
      img: "group-of-children.jpg",
    },
    {
      title: "Achievements",
      text: "10k+ learners reached · 250+ partner schools.",
      img: "two kids.jpg",
    },
    {
      title: "Our Commitment",
      text: "Partnering with educators & NGOs to respect context & culture.",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const activeSlide = slides[index];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
      }`}
    >
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/icon.png"
            alt="Skul Africa"
            className="w-10 h-10 rounded-md"
            loading="lazy"
          />
          <span className="font-semibold text-lg">Skul Africa</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/community" className="hover:text-blue-400">Community</Link>
          <Link href="/courses" className="hover:text-blue-400">Courses</Link>
          <Link href="/programs" className="hover:text-blue-400">Programs</Link>
          <Link href="/faq" className="hover:text-blue-400">FAQ</Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full bg-white/10"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            href="/login_select"
            className="hidden sm:block px-3 py-2 text-sm border rounded-full hover:bg-white/10"
          >
            <LogIn className="inline w-4 h-4 mr-1" /> Login
          </Link>
          <Link
            href="/signup_select"
            className="hidden sm:block px-3 py-2 text-sm font-semibold rounded-full bg-blue-400 text-blue-900 hover:bg-blue-300"
          >
            <UserPlus className="inline w-4 h-4 mr-1" /> Join
          </Link>
        </div>
      </header>

      {/* HERO / SLIDE */}
      <section className="relative flex flex-col items-center text-center py-10">
        <div className="relative w-[90%] max-w-xl h-[260px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={activeSlide.img}
            alt={activeSlide.title}
            className="w-full h-full object-cover transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
            <h2 className="font-bold text-lg">{activeSlide.title}</h2>
            <p className="text-xs text-white/90 mt-1">{activeSlide.text}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-black/30 hover:bg-black/40"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-black/30 hover:bg-black/40"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Link
            href="/about"
            className="px-5 py-2 rounded-full border border-white/30 hover:bg-white/10"
          >
            Learn More
          </Link>
          <Link
            href="/signup_select"
            className="px-5 py-2 rounded-full bg-blue-400 text-blue-900 font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="max-w-4xl mx-auto px-6 grid grid-cols-3 text-center mt-10">
        {[
          ["10k+", "Students"],
          ["250+", "Schools"],
          ["12", "Countries"],
        ].map(([num, label]) => (
          <div key={label}>
            <div className="text-2xl font-bold">{num}</div>
            <div className="text-sm opacity-80">{label}</div>
          </div>
        ))}
      </section>

      {/* WHO WE SERVE */}
      <section className="max-w-5xl mx-auto px-6 mt-12">
        <h3 className="text-center text-xl font-bold mb-6">Who We Serve</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Users, title: "Students", text: "Accessible lessons for low-bandwidth use." },
            { icon: BookOpen, title: "Schools", text: "Simple tools for measuring progress." },
            { icon: Globe2, title: "Teachers", text: "Training & AI lesson summaries." },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className={`p-5 rounded-xl shadow ${
                dark ? "bg-white/5" : "bg-white"
              }`}
            >
              <Icon
                className={`w-6 h-6 mb-2 mx-auto ${
                  dark ? "text-blue-300" : "text-blue-600"
                }`}
              />
              <h4 className="font-semibold">{title}</h4>
              <p className="text-xs opacity-80 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-12 py-10">
        <h3 className="text-xl font-bold mb-3">Be Part of the Change</h3>
        <p className="max-w-md mx-auto mb-5 opacity-80 text-sm">
          Join students, teachers, and partners shaping the future of education.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/signup_select"
            className="px-5 py-2 rounded-full bg-blue-400 text-blue-900 font-semibold"
          >
            Get Started
          </Link>
          <Link href="/login_select" className="px-5 py-2 rounded-full border">
            Learn More
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm opacity-80 border-t border-white/10">
        <div className="flex justify-center gap-5 mb-3">
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/community" className="hover:text-blue-400">Community</Link>
          <Link href="/courses" className="hover:text-blue-400">Courses</Link>
          <Link href="/programs" className="hover:text-blue-400">Programs</Link>
          <Link href="/faq" className="hover:text-blue-400">FAQ</Link>
        </div>
        © {new Date().getFullYear()} Skul Africa — Empowering Learning Across Africa.
      </footer>
    </div>
  );
}
