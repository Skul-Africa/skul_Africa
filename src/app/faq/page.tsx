"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { GraduationCap, Sun, Moon, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Faq() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const faqData = [
    {
      category: "Students",
      items: [
        {
          title: "How do I log in as a student?",
          content:
            "Students can log in using their profile code and access code provided by the school. If you can’t find your codes, contact your class teacher.",
        },
        {
          title: "Can I see my grades online?",
          content:
            "Yes! Once your teacher uploads your results, you can view them in your student dashboard.",
        },
      ],
    },
    {
      category: "Teachers",
      items: [
        {
          title: "How do I register as a teacher?",
          content:
            "Teachers are added by the school’s admin. Once added, your login credentials will be sent to your email automatically.",
        },
        {
          title: "Can I manage multiple classes?",
          content:
            "Absolutely! Teachers can manage multiple classrooms and subjects as assigned by their school.",
        },
      ],
    },
    {
      category: "Admins / Proprietors",
      items: [
        {
          title: "How do I register my school?",
          content:
            "Visit the school registration page, fill in your details, and your access credentials will be emailed to you instantly.",
        },
        {
          title: "Can I add more teachers or students later?",
          content:
            "Yes, once logged in as a school admin, you can add, update, or remove teachers and students anytime through your dashboard.",
        },
      ],
    },
  ];

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
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
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

          <button
            onClick={() => router.push("/login")}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isDarkMode
                ? "text-white hover:bg-white/10 border border-white/20"
                : "text-slate-700 hover:bg-blue-50 border border-blue-200"
            }`}
          >
            <LogIn className="inline w-4 h-4 mr-2" />
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg ${
              isDarkMode
                ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <UserPlus className="inline w-4 h-4 mr-2" />
            Sign Up
          </button>
        </div>
      </header>

      {/* FAQ Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p
            className={`mt-2 ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            Find quick answers to common questions about Skul Africa.
          </p>
        </section>

        <div className="space-y-12">
          {faqData.map((section, i) => (
            <div key={i}>
              <h2
                className={`text-2xl font-semibold mb-4 ${
                  isDarkMode ? "text-blue-300" : "text-blue-600"
                }`}
              >
                {section.category}
              </h2>
              <Accordion variant="bordered" selectionMode="multiple">
                {section.items.map((item, j) => (
                  <AccordionItem
                    key={`${i}-${j}`}
                    aria-label={item.title}
                    title={item.title}
                    className={`rounded-xl shadow-sm ${
                      isDarkMode
                        ? "bg-white/10 border border-white/20 text-blue-100"
                        : "bg-white border border-blue-100 text-slate-700"
                    }`}
                  >
                    <p className="leading-relaxed">{item.content}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <section
          className={`text-center mt-16 p-8 rounded-2xl shadow-sm ${
            isDarkMode
              ? "bg-white/10 border border-white/20"
              : "bg-gray-50 border border-blue-100"
          }`}
        >
          <p className="mb-3">
            Didn’t find your answer? Reach out to our support team.
          </p>
          <button
            onClick={() => router.push("/contact")}
            className={`px-6 py-2 rounded-lg transition-all ${
              isDarkMode
                ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Contact Support
          </button>
        </section>
      </main>
    </div>
  );
}
