"use client";

import { GraduationCap, Sun, Moon, Users, Layers, Globe, Rocket } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function About() {
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
            About <span className="text-blue-400">Skul Africa</span>
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            Skul Africa is a modern, all-in-one digital school management platform built
            to empower African schools, teachers, and students with the tools they need
            to connect, learn, and grow in the digital age.
          </p>
        </section>

        {/* Mission Section */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Our Mission
          </h2>
          <p className="leading-relaxed text-lg">
            Our mission at Skul Africa is simple — to bridge the gap between traditional
            education and modern technology across Africa. We believe every school,
            whether rural or urban, deserves access to smart, reliable, and affordable
            digital tools. Our goal is to simplify school operations, streamline student
            management, and promote transparency between schools, teachers, parents, and
            learners.
          </p>
        </section>

        {/* Vision & Values */}
        <section className="grid sm:grid-cols-2 gap-8 mb-16">
          <div
            className={`p-8 rounded-2xl shadow-md ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <Globe className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-lg leading-relaxed">
              To become Africa’s leading education technology platform — enabling every
              school to operate digitally, every teacher to teach efficiently, and every
              student to learn without limits.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow-md ${
              isDarkMode
                ? "bg-white/10 border border-white/20"
                : "bg-white border border-blue-100"
            }`}
          >
            <Users className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-3">Our Core Values</h3>
            <ul className="space-y-2 text-lg">
              <li>🌍 Accessibility for all schools</li>
              <li>⚙️ Innovation and scalability</li>
              <li>🤝 Collaboration and community</li>
              <li>💡 Simplicity and transparency</li>
              <li>🎓 Excellence in education</li>
            </ul>
          </div>
        </section>

        {/* Platform Overview */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            What Makes Skul Africa Unique
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Skul Africa is not just a management tool — it’s a digital ecosystem designed
            around real African schools. Whether it’s a small private school or a large
            institution, our platform adapts to their needs with robust features like:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Automated student registration and classroom management</li>
            <li>Teacher onboarding with subject and class assignment tools</li>
            <li>Performance tracking and reporting dashboards</li>
            <li>Integrated parent communication and notifications</li>
            <li>Secure authentication and cloud-based data management</li>
          </ul>
        </section>

        {/* Innovation Section */}
        <section
          className={`rounded-2xl shadow-lg p-8 mb-16 ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white border border-blue-100"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Driving Innovation Across African Schools
          </h2>
          <p className="text-lg leading-relaxed">
            From Lagos to Nairobi, Accra to Johannesburg — schools across Africa face
            similar challenges: lack of resources, manual record-keeping, and fragmented
            communication. Skul Africa was built to change that narrative. By combining
            intuitive design with powerful backend automation, we’re helping schools go
            digital faster, cheaper, and smarter.
          </p>
        </section>

        {/* CTA Section */}
        <section
          className={`text-center mt-20 p-8 rounded-2xl shadow-lg ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-gray-50 border border-blue-100"
          }`}
        >
          <Rocket className="w-10 h-10 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-semibold mb-2">Join the Digital Education Movement</h2>
          <p
            className={`max-w-2xl mx-auto mb-6 ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            Thousands of schools across Africa are embracing the future of education.
            Start your digital journey with Skul Africa today and empower your teachers,
            students, and community to achieve more.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isDarkMode
                ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
}
