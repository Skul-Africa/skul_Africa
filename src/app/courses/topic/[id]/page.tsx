'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  ListChecks,
  Link as LinkIcon,
} from 'lucide-react';

export default function TopicPage() {
  const { id } = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(
          `https://skul-africa.onrender.com/api/v1/learning/topic/${id}`,
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('Failed to fetch topic');
        const data = await res.json();
        setTopic(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load topic');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTopic();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading topic details...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading topic: {error}
      </p>
    );
  if (!topic)
    return (
      <p className="text-center mt-10 text-slate-500">
        No topic details found.
      </p>
    );

  const summary = topic.ai_summary || topic.summary;
  const resources = Array.isArray(topic.resources)
    ? topic.resources
    : topic.resources
    ? [topic.resources]
    : [];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900'
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
              className={`w-5 h-5 ${
                isDarkMode ? 'text-blue-900' : 'text-white'
              }`}
            />
          </div>
          <span className="text-lg sm:text-xl font-bold">Skul Africa</span>
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

      {/* Topic Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => router.back()}
          className={`flex items-center space-x-2 mb-6 ${
            isDarkMode
              ? 'text-blue-300 hover:text-blue-200'
              : 'text-blue-600 hover:underline'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Topics</span>
        </button>

        <section
          className={`p-8 rounded-2xl shadow-sm border ${
            isDarkMode
              ? 'bg-white/10 border-white/20 text-blue-100'
              : 'bg-white border-blue-100 text-slate-800'
          }`}
        >
          {/* Title */}
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen
              className={`w-6 h-6 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            />
            <h1 className="text-3xl font-bold">{topic.title}</h1>
          </div>

          {/* Summary */}
          <p
            className={`leading-relaxed whitespace-pre-line ${
              isDarkMode ? 'text-blue-100' : 'text-slate-700'
            }`}
          >
            {summary?.trim() ||
              '🤖 No AI-generated summary available yet. This will be automatically created soon!'}
          </p>

          {/* Key Points */}
          {topic.ai_content?.keyPoints?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <ListChecks className="w-5 h-5 mr-2 text-blue-400" />
                Key Points
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {topic.ai_content.keyPoints.map(
                  (point: string, index: number) => (
                    <li key={index}>{point}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Exercises */}
          {topic.ai_exercises?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                Practice Questions
              </h2>
              <div className="space-y-4">
                {topic.ai_exercises.map((exercise: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      isDarkMode
                        ? 'border-white/10 bg-white/5'
                        : 'border-blue-100 bg-blue-50'
                    }`}
                  >
                    <p className="font-medium mb-1">
                      Q{index + 1}: {exercise.question}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-blue-200' : 'text-slate-600'
                      }`}
                    >
                      Answer: {exercise.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {resources.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <LinkIcon className="w-5 h-5 mr-2 text-purple-400" />
                Recommended Learning Resources
              </h2>
              <ul className="space-y-3">
                {resources.map((res: any, index: number) => (
                  <li
                    key={index}
                    className={`p-4 rounded-xl border transition-colors ${
                      isDarkMode
                        ? 'border-white/10 bg-white/5 hover:bg-white/10'
                        : 'border-blue-100 bg-blue-50 hover:bg-blue-100'
                    }`}
                  >
                    <a
                      href={res.url || res}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-medium underline ${
                        isDarkMode
                          ? 'text-blue-300 hover:text-blue-200'
                          : 'text-blue-700 hover:text-blue-600'
                      }`}
                    >
                      {res.title || res.url || 'Resource Link'}
                    </a>
                    {res.type && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          isDarkMode
                            ? 'bg-blue-400/20 text-blue-200'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {res.type}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
