"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sun,
  Moon,
  GraduationCap,
  Users,
  BookOpen,
  Target,
  Award,
  PlayCircle,
} from "lucide-react";

/** ✅ Replace with your own image URLs */
const HERO_IMAGE_URLS = [
  "/group-of-children.jpg",
  "/one child.jpg",
  "/girl writing.jpg",
  "/two kids.jpg",
];

const orbVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (i: number) => ({
    opacity: [0, 0.7, 0.5],
    y: [0, -12 - i * 4, 0],
    x: [0, i * 6, 0],
    transition: {
      duration: 6 + i * 0.6,
      repeat: Infinity,
      repeatType: "mirror" as const,
      delay: i * 0.5,
    },
  }),
};

export default function Page() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Rotate hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGE_URLS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduceMotion(Boolean(mq && mq.matches));
    }
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* ✨ Floating Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {!reduceMotion &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="show"
              variants={orbVariants}
              className={`absolute rounded-full ${
                i === 0
                  ? "w-56 h-56 left-6 top-10 bg-blue-400/20"
                  : i === 1
                  ? "w-72 h-72 right-8 bottom-12 bg-indigo-400/12"
                  : "w-64 h-64 left-1/2 top-1/3 -translate-x-1/2 bg-purple-500/10"
              }`}
              style={{ filter: "blur(36px)", willChange: "transform, opacity" }}
            />
          ))}
      </div>

      {/* 🌍 NAVBAR */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              dark
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-600 text-white shadow"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Skul Africa</div>
            <div className="text-xs opacity-70 -mt-0.5">
              Smarter school simplified 
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/community" className="hover:underline">
            community
          </Link>
          <Link href="/courses" className="hover:underline">
            courses
          </Link>
          <Link href="/faq" className="hover:underline">
           FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full focus-visible:outline focus-visible:outline-2"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
          <Link
            href="/login_select"
            className="sm:inline-block px-3 py-1 rounded-full border border-current/10 text-sm"
          >
            Login
          </Link>
          <Link
            href="/signup_select"
            className="inline-block px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 🧠 HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* LEFT: Text */}
        <section className="md:flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-white/10 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>How learning works</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Skul Africa — manage schools effortlessly,
              <span className="text-blue-400"> built for Africa.</span>
            </h1>

            <p className="text-base text-slate-700 dark:text-slate-300 mb-6">
              One dashboard for students, teachers and administrators. Fast
              sync, offline-first caching, and region-aware features so your
              school stays running even with spotty connectivity.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup_select"
                className="px-5 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-sm transform hover:-translate-y-0.5 transition"
              >
                Start Free
              </Link>
              <Link
                href="/login_select"
                className="px-4 py-3 rounded-full border border-white/10 text-sm"
              >
                Demo
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl p-3 bg-white/10">
                <div className="text-xs opacity-80">Monthly Goal</div>
                <div className="font-bold">40 hrs</div>
              </div>
              <div className="rounded-2xl p-3 bg-white/10">
                <div className="text-xs opacity-80">Next</div>
                <div className="font-bold">Physics Lab • 2:00 PM</div>
              </div>
              <div className="rounded-2xl p-3 bg-white/10">
                <div className="text-xs opacity-80">Top Performer</div>
                <div className="font-bold">Recognition</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* RIGHT: Rotating Images */}
        <section className="md:flex-1 flex items-center justify-center w-full">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative w-[320px] md:w-[420px] aspect-square"
          >
            <Image
              src={HERO_IMAGE_URLS[currentImage]}
              alt="School hero"
              fill
              sizes="(max-width: 768px) 320px, 420px"
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />

            {/* Floating Badge */}
            <motion.div
              whileHover={{ y: -4 }}
              className="absolute left-3 bottom-4 rounded-xl bg-white/90 dark:bg-black/70 px-3 py-2 shadow-md flex items-center gap-3 text-xs"
            >
              <PlayCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-semibold text-xs">Current Course</div>
                <div className="text-[11px] opacity-80">
                  Advanced Mathematics
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* 🌟 FEATURES */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FeatureCard
            icon={Users}
            title="Manage Users"
            desc="Students, teachers and staff — centralised profiles and roles."
            dark={dark}
          />
          <FeatureCard
            icon={Target}
            title="Automate Tasks"
            desc="Attendance, grading and reports with fewer clicks."
            dark={dark}
          />
          <FeatureCard
            icon={Award}
            title="Recognize Growth"
            desc="Badges, awards and performance tracking."
            dark={dark}
          />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">
            Ready to make school life simpler?
          </h3>
          <p className="opacity-90 mb-4">
            focuse more on educating, we handle the rest, experience a next level of academic perfomance today welcome onboard
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/signup_select"
              className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold"
            >
              Start Free
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/30 rounded-full"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 md:px-8 py-6 text-xs opacity-80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Skul Africa — All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ✅ Reusable Feature Card */
function FeatureCard({
  icon: Icon,
  title,
  desc,
  dark,
}: {
  icon: any;
  title: string;
  desc: string;
  dark: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm ${
        dark
          ? "bg-white/5 border border-white/10"
          : "bg-white border border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-sm opacity-80">{desc}</div>
    </div>
  );
}
