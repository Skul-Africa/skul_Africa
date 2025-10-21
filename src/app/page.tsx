"use client";

import React, { useEffect, useRef, useState } from "react";
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
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

console.log("EduCentralLanding (slideshow) loaded");

export default function EduCentralLanding() {
  // core UI state (kept from your version)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideContainerRef = useRef<HTMLElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  // sample images (unsplash / realistic) — replace with your own in /public if you like
  const slides = [
    {
      key: "mission",
      title: "Our Mission",
      description:
        "Empowering African learners with quality, context-aware education — reaching students in remote and urban communities.",
      img:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    },
    {
      key: "vision",
      title: "Our Vision",
      description:
        "A future where every child in Africa learns without limits — supported by teachers, communities and lightweight technology.",
      img:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop",
    },
    {
      key: "achievements",
      title: "Our Achievements",
      description:
        "10k+ learners reached, 250+ partner schools, and hundreds of teachers trained in practical classroom methods.",
      img:
        "https://images.unsplash.com/photo-1533089860892-a7b8c3f6d0a7?q=80&w=1600&auto=format&fit=crop",
    },
    {
      key: "commitment",
      title: "Our Commitment",
      description:
        "We partner with local educators and organizations to deliver sustainable learning solutions that respect context and culture.",
      img:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  // auto-slide interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 7000); // 7s per slide
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // IntersectionObserver: if a slide becomes mostly in view, slightly scale it (inView zoom)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          const el = ent.target as HTMLDivElement;
          if (ent.isIntersecting && ent.intersectionRatio > 0.5) {
            el.classList.add("in-view-scale");
          } else {
            el.classList.remove("in-view-scale");
          }
        });
      },
      {
        threshold: [0.5],
      }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      slideRefs.current.forEach((el) => {
        if (el) observer.unobserve(el!);
      });
      observer.disconnect();
    };
  }, [slides.length]);

  // helpers
  const toggleTheme = () => setIsDarkMode((s) => !s);
  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const handleLogin = () => (window.location.href = "/login_select");
  const handleSignUp = () => (window.location.href = "/signup_select");

  // images used throughout the page (demo)
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
      className={`min-h-screen transition-colors duration-500 ${isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900"
        }`}
    >

          {/* --------------------
          NAV / HEADER (moved below slideshow as requested)
          Kept original nav items and behaviors
          --------------------- */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/icon.png"
            alt="Skul Africa Logo"
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
                className={`text-sm transition ${active ? (isDarkMode ? "text-blue-300 font-semibold" : "text-blue-700 font-semibold") : isDarkMode ? "hover:text-blue-200" : "hover:text-blue-700"
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
            className={`p-2 rounded-full ${isDarkMode ? "bg-white/10" : "bg-blue-100"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={handleLogin} className={`px-3 py-2 rounded-full border text-sm ${isDarkMode ? "border-white/20 hover:bg-white/5" : "border-blue-200"}`}>
              <LogIn className="inline w-4 h-4 mr-2" /> Login
            </button>
            <button onClick={handleSignUp} className={`px-3 py-2 rounded-full text-sm font-semibold ${isDarkMode ? "bg-blue-400 text-blue-900" : "bg-blue-600 text-white"}`}>
              <UserPlus className="inline w-4 h-4 mr-2" /> Join
            </button>
          </div>

          <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-full bg-white/10">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {/* --------------------
          SLIDESHOW (FIRST / TOP)
          Square-ish container (responsive) with rounded edges.
          --------------------- */}
      <section
        ref={slideContainerRef}
        className="w-full flex justify-center pt-6 px-4"
        aria-label="Skul Africa slideshow"
      >
        <div
          className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* square wrapper using padding-top to keep square ratio on wide screens */}
          <div
            className="relative w-full"
            style={{
              paddingTop: "80%", // makes it tall square-ish; tweak as needed (80% of width)
            }}
          >
            {slides.map((slide, index) => {
              const active = index === currentSlide;
              return (
                <div
                  key={slide.key}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform-gpu ${active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                >

                  {/* background image */}
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out 
                      transform-gpu
                      hover:scale-105
                      ${active ? "scale-100" : "scale-100"}
                    `}
                    loading="lazy"
                    // when user hovers, the parent has onMouseEnter which pauses autoplay and hover scale applies
                    style={{ willChange: "transform" }}
                  />

                  {/* overlay content */}
                  <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center px-6 text-center">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
                      {slide.title}
                    </h3>
                    <p className="max-w-3xl mt-4 text-sm sm:text-lg text-blue-100 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-white scale-125" : "bg-white/40"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Learn More / Sign Up (centered) */}
      <div className="w-full flex justify-center mt-6 px-4">
        <div className="max-w-5xl w-full flex items-center justify-center gap-4">
          <button
            onClick={() => (window.location.href = "/about")}
            className={`px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 ${isDarkMode
                ? "bg-white/10 text-white border border-white/20"
                : "bg-white text-slate-800 border border-blue-200"
              }`}
          >
            Learn More
          </button>
          <button
            onClick={handleSignUp}
            className="px-6 py-3 rounded-full font-semibold bg-blue-400 text-blue-900 shadow"
          >
            Sign Up
          </button>
        </div>
      </div>

  

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden bg-white/5 px-4 py-4 border-t ${isDarkMode ? "border-white/10" : "border-blue-100"}`}>
          <div className="flex flex-col gap-3">
            <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
            <Link href="/programs" onClick={() => setIsMobileMenuOpen(false)}>Programs</Link>
            <Link href="/community" onClick={() => setIsMobileMenuOpen(false)}>Community</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <div className="flex gap-2 mt-3">
              <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="px-3 py-2 rounded-full border w-full">Login</button>
              <button onClick={() => { handleSignUp(); setIsMobileMenuOpen(false); }} className="px-3 py-2 rounded-full font-semibold w-full bg-blue-500 text-white">Join</button>
            </div>
          </div>
        </div>
      )}

      {/* --- rest of page content (keeps your sections) --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO copy & collage */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
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
              <button onClick={handleSignUp} className="px-5 py-3 rounded-full font-semibold bg-blue-400 text-blue-900 shadow">Get Started</button>
              <button onClick={handleLogin} className={`px-5 py-3 rounded-full border ${isDarkMode ? "border-white/20 hover:bg-white/5" : "border-blue-200"}`}>Learn More</button>
            </div>

            <div className="flex gap-6 mt-4 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold">200</div>
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Students reached</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">250</div>
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Partner schools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Countries connected</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="row-span-2 rounded-2xl overflow-hidden shadow-lg">
              <img src={images.heroStudents} alt="Group of students learning together" className="object-cover w-full h-full" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={images.teacherGroup} alt="Teachers collaborating in a training" className="object-cover w-full h-full" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={images.classroomUrban} alt="Urban classroom setting with students" className="object-cover w-full h-full" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Mission & Culture */}
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
            <img src={images.schoolAdmin} alt="School management meeting" className="object-cover w-full h-64" loading="lazy" />
          </div>
        </section>

        {/* Who we serve */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">Who We Serve</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <Users className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Students in underserved regions</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Lightweight, accessible lessons for low-bandwidth and offline use.</p>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <School className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Schools & administrators</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Tools to measure learning progress and support teachers with minimal overhead.</p>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
              <BookOpen className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`} />
              <h4 className="font-semibold mb-1">Teachers & mentors</h4>
              <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>Practical training, lesson plans and AI-assisted summaries to reduce prep time.</p>
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
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="90" height="30" rx="6" fill={isDarkMode ? "#0ea5e9" : "#2563eb"} /></svg>
              </div>
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="90" height="30" rx="6" fill={isDarkMode ? "#8b5cf6" : "#7c3aed"} /></svg>
              </div>
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="90" height="30" rx="6" fill={isDarkMode ? "#f59e0b" : "#f97316"} /></svg>
              </div>
              <div className={`p-3 rounded-md ${isDarkMode ? "bg-white/6" : "bg-white/90"}`}>
                <svg width="90" height="30" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="90" height="30" rx="6" fill={isDarkMode ? "#34d399" : "#10b981"} /></svg>
              </div>
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
            <button onClick={handleSignUp} className="px-6 py-3 rounded-full bg-blue-400 text-blue-900 font-semibold">Get Started</button>
            <button onClick={handleLogin} className="px-6 py-3 rounded-full border">Learn More</button>
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

      {/* Inline styles to enable the in-view scale class */
      /* When IntersectionObserver finds a slide mostly in view, it gets `in-view-scale` class. */}
      <style jsx>{`
        /* subtle scale when a slide is in viewport (used with IntersectionObserver) */
        .in-view-scale img {
          transform: scale(1.03);
        }
        /* ensure hover scale for images inside slides */
        img:hover {
          transform: scale(1.05);
        }
        /* keep transform transitions smooth */
        img {
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
