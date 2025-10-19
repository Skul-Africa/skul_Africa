'use client';

import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import { GraduationCap, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CoursesClient() {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    console.log("✅ useEffect fired (client component confirmed)");
    const fetchClasses = async () => {
      try {
        console.log("🌐 Fetching from API...");
        const res = await fetch('https://skul-africa.onrender.com/api/v1/learning', { cache: 'no-store' });
        const data = await res.json();
        console.log("✅ Got data:", data);

        if (Array.isArray(data)) setClasses(data);
        else if (Array.isArray(data.data)) setClasses(data.data);
        else if (Array.isArray(data.results)) setClasses(data.results);
        else console.warn("⚠️ Unexpected format:", data);
      } catch (err) {
        console.error("❌ Failed to fetch", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading classes...</p>;
  if (!Array.isArray(classes) || classes.length === 0)
    return <p className="text-center mt-10 text-slate-500">No classes found.</p>;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-black'
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
            }`}
          >
            <GraduationCap
              className={`w-5 h-5 ${isDarkMode ? 'text-blue-900' : 'text-white'}`}
            />
          </div>
          <span className="text-lg sm:text-xl font-bold">skul Africa</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => router.push('/login_select')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isDarkMode
                ? 'text-white hover:bg-white/10 border border-white/20'
                : 'text-slate-700 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            <LogIn className="inline w-4 h-4 mr-2" />
            Login
          </button>
          <button
            onClick={() => router.push('/signup_select')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg ${
              isDarkMode
                ? 'bg-blue-400 text-blue-900 hover:bg-blue-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <UserPlus className="inline w-4 h-4 mr-2" />
            Sign Up
          </button>
        </div>
      </header>

      {/* Courses Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold">Available Classes & Courses</h1>
          <p
            className={`mt-2 ${
              isDarkMode ? 'text-blue-200' : 'text-slate-700'
            }`}
          >
            Browse through all classes, subjects, and available learning topics.
          </p>
        </section>

        {classes.map((cls) => (
          <div key={cls.id} className="mb-10">
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              {cls.name}
            </h2>
            {cls.subjects?.length ? (
              <Accordion variant="bordered" selectionMode="multiple">
                {cls.subjects.map((subj: any) => (
                  <AccordionItem
                    key={subj.id}
                    title={subj.name}
                    className={`rounded-xl shadow-sm ${
                      isDarkMode
                        ? 'bg-white/10 border border-white/20 text-blue-100'
                        : 'bg-white border border-blue-100 text-black'
                    }`}
                  >
                    {subj.courses?.length ? (
                      <Accordion variant="bordered" selectionMode="multiple">
                        {subj.courses.map((course: any) => (
                          <AccordionItem
                            key={course.id}
                            title={course.title}
                            className={`rounded-xl ${
                              isDarkMode
                                ? 'bg-white/10 border border-white/20 text-blue-100'
                                : 'bg-white border border-blue-100 text-black'
                            }`}
                          >
                            <ul className="list-disc pl-5">
                              {course.topics?.length ? (
                                course.topics.map((topic: any) => (
                                  <li
                                    key={topic.id}
                                    className={`cursor-pointer ${
                                      isDarkMode
                                        ? 'text-blue-300 hover:underline'
                                        : 'text-blue-600 hover:underline'
                                    }`}
                                    onClick={() =>
                                      router.push(`/courses/topic/${topic.id}`)
                                    }
                                  >
                                    {topic.title}
                                  </li>
                                ))
                              ) : (
                                <li className="text-slate-500">
                                  No topics available.
                                </li>
                              )}
                            </ul>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-sm text-slate-500">
                        No courses available.
                      </p>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-sm text-slate-500">No subjects available.</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
