"use client"

import React, { useState, useEffect } from 'react';
import { GraduationCap, Home, Search, BookOpen, ArrowLeft, Moon, Sun, AlertTriangle, Compass, MapPin, RefreshCw } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}
import { useRouter } from "next/navigation";
export default function EduCentral404() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Generate floating 404 elements
    const elements: FloatingElement[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 10 + 15,
    }));
    setFloatingElements(elements);
  }, []);
  const router = useRouter();
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = () => {
    // In a real app, this would redirect to search results
    console.log('Searching for:', searchQuery);
  };

  const goHome = () => router.push("/");
  const courses = () => router.push("/courses");
  const soon = () => router.push("/coming-soon");
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900'
      }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl ${isDarkMode
            ? 'bg-gradient-to-r from-red-400 to-transparent'
            : 'bg-gradient-to-r from-red-300 to-transparent'
          }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${isDarkMode
            ? 'bg-gradient-to-l from-orange-400 to-transparent'
            : 'bg-gradient-to-l from-orange-300 to-transparent'
          }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${isDarkMode
            ? 'bg-gradient-radial from-purple-500/20 to-transparent'
            : 'bg-gradient-radial from-purple-400/10 to-transparent'
          }`}></div>
      </div>

      {/* Floating 404 Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute pointer-events-none select-none ${isDarkMode ? 'text-white/10' : 'text-slate-400/20'
            }`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
            animation: `float ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.id * 2}s`,
          }}
        >
          404
        </div>
      ))}

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
            }`}>
            <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-blue-900' : 'text-white'
              }`} />
          </div>
          <span className="text-xl font-bold">skul Africa</span>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${isDarkMode
              ? 'bg-white/10 hover:bg-white/20'
              : 'bg-blue-100 hover:bg-blue-200'
            }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto text-center min-h-[calc(100vh-200px)]">

        {/* 404 Display */}
        <div className="mb-8 relative">
          <div className={`text-8xl md:text-9xl font-bold leading-none mb-4 ${isDarkMode
              ? 'bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent'
            }`}>
            404
          </div>

          {/* Animated Warning Icon */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'
            }`}>
            <AlertTriangle className="w-16 h-16 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Oops! This Page Went on a Study Break
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl ${isDarkMode ? 'text-blue-200' : 'text-slate-600'
            }`}>
            Looks like this page decided to skip class! Don't worry, even the best students
            sometimes take wrong turns in the hallway.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-8">
          <div className={`relative backdrop-blur-lg rounded-2xl p-2 shadow-xl ${isDarkMode
              ? 'bg-white/10 border border-white/20'
              : 'bg-white/90 border border-blue-200'
            }`}>
            <div className="flex items-center">
              <Search className={`w-5 h-5 ml-3 ${isDarkMode ? 'text-blue-300' : 'text-slate-500'
                }`} />
              <input
                type="text"
                placeholder="Search for courses, resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 px-3 py-2 bg-transparent border-none outline-none placeholder-gray-400 ${isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode
                    ? 'bg-blue-400 text-blue-900 hover:bg-blue-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <button
            onClick={goHome}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${isDarkMode
                ? 'bg-blue-400 text-blue-900 hover:bg-blue-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => window.history.back()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode
                ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                : 'bg-white hover:bg-gray-100 border border-blue-200 shadow-lg'
              }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>

          <button
            onClick={refreshPage}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode
                ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                : 'bg-white hover:bg-gray-100 border border-blue-200 shadow-lg'
              }`}
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl max-w-2xl w-full ${isDarkMode
            ? 'bg-white/10 border border-white/20'
            : 'bg-white/90 border border-blue-200'
          }`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-center space-x-2">
            <Compass className="w-5 h-5" />
            <span>Find Your Way</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-blue-50 hover:bg-blue-100'
              }`}>
              <div className="flex items-center space-x-3">
                <BookOpen className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <div onClick={courses} className="font-semibold">Browse Courses</div>
                  <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-slate-500'}`}>
                    Explore our catalog
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-blue-50 hover:bg-blue-100'
              }`}>
              <div className="flex items-center space-x-3">
                <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <div>
                  <div onClick={soon} className="font-semibold">Learning Paths</div>
                  <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-slate-500'}`}>
                    Structured programs
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-blue-50 hover:bg-blue-100'
              }`}>
              <div className="flex items-center space-x-3">
                <Search className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <div>
                  <div onClick={soon} className="font-semibold">Help Center</div>
                  <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-slate-500'}`}>
                    Get support
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-blue-50 hover:bg-blue-100'
              }`}>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <div>
                  <div onClick={soon} className="font-semibold">Site Map</div>
                  <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-slate-500'}`}>
                    All pages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className={`absolute top-1/4 right-1/4 w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-red-400' : 'bg-red-500'
        }`}></div>
      <div className={`absolute top-3/4 left-1/4 w-1 h-1 rounded-full animate-ping ${isDarkMode ? 'bg-orange-300' : 'bg-orange-400'
        }`}></div>
      <div className={`absolute top-1/2 right-1/3 w-3 h-3 rounded-full animate-bounce ${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600'
        }`} style={{ animationDelay: '1s' }}></div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
}