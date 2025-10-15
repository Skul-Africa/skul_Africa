"use client"

import React, { useState, useEffect } from 'react';
import { Star, BookOpen, GraduationCap, Users, Award, PlayCircle, Clock, Calendar, Moon, Sun, ChevronRight, Target, Lightbulb, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from 'next/link';

export default function EduCentralLanding() {
  const [currentStudents, setCurrentStudents] = useState(1247);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentStudents(prev => prev + Math.floor(Math.random() * 5));
      setTimeout(() => setIsAnimating(false), 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    window.location.href = '/login_select';
  };

  const handleSignUp = () => {
    window.location.href = '/signup_select';
  };

  const educationIcons = [
    { icon: BookOpen, name: 'Courses' },
    { icon: GraduationCap, name: 'Degrees' },
    { icon: Users, name: 'Community' },
    { icon: Award, name: 'Certificates' },
    { icon: Target, name: 'Goals' },
    { icon: Lightbulb, name: 'Innovation' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900'
    }`}>
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full blur-3xl ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-400 to-transparent' 
            : 'bg-gradient-to-r from-blue-300 to-transparent'
        }`}></div>
        <div className={`absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 rounded-full blur-3xl ${
          isDarkMode 
            ? 'bg-gradient-to-l from-indigo-400 to-transparent' 
            : 'bg-gradient-to-l from-indigo-300 to-transparent'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[600px] h-80 sm:h-[600px] rounded-full ${
          isDarkMode 
            ? 'bg-gradient-radial from-purple-500/20 to-transparent' 
            : 'bg-gradient-radial from-purple-400/10 to-transparent'
        }`}></div>
      </div>

      <header className="relative z-10 flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
          }`}>
            <GraduationCap className={`w-5 h-5 ${
              isDarkMode ? 'text-blue-900' : 'text-white'
            }`} />
          </div>
          <span className="text-lg sm:text-xl font-bold">skul Africa</span>
        </div>
        <nav className="hidden lg:flex space-x-8">
          {[
            { name: 'Courses', href: '/courses' },
            { name: 'Programs', href: '/programs' },
            { name: 'Resources', href: '/resources' },
            { name: 'Community', href: '/community' },
            { name: 'About', href: '/about' },
            { name: 'FAQ', href: '/faq' },
          ].map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-white text-slate-900 font-semibold'
                    : isDarkMode
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-blue-100 text-slate-700'
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20' 
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20' 
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden sm:flex items-center space-x-2">
            <button 
              onClick={handleLogin}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                isDarkMode 
                  ? 'text-white hover:bg-white/10 border border-white/20' 
                  : 'text-slate-700 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button 
              onClick={handleSignUp}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base flex items-center space-x-2 ${
                isDarkMode 
                  ? 'bg-blue-400 text-blue-900 hover:bg-blue-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-x-0 top-20 z-50 mx-4 rounded-2xl shadow-2xl backdrop-blur-lg ${
            isDarkMode
              ? 'bg-slate-900/90 border border-white/20'
              : 'bg-white/90 border border-blue-200'
          }`}
        >
          <nav className="flex flex-col p-6 space-y-4">
            {[
              { name: "Courses", href: "/courses" },
              { name: "Programs", href: "/programs" },
              { name: "Resources", href: "/resources" },
              { name: "Community", href: "/community" },
              { name: "About", href: "/about" },
              { name: "FAQ", href: "/faq" },
            ].map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 block ${
                    isActive
                      ? 'bg-white text-slate-900 font-semibold'
                      : isDarkMode
                      ? 'hover:bg-white/10 text-white'
                      : 'hover:bg-blue-100 text-slate-700'
                  }`}
                >
                  {name}
                </Link>
              );
            })}
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
              <button 
                onClick={() => {
                  handleLogin();
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isDarkMode 
                    ? 'text-white hover:bg-white/10 border border-white/20' 
                    : 'text-slate-700 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button 
                onClick={() => {
                  handleSignUp();
                  setIsMobileMenuOpen(false);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${
                  isDarkMode 
                    ? 'bg-blue-400 text-blue-900 hover:bg-blue-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-6 sm:py-12 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
          <div className={`flex items-center justify-center lg:justify-start space-x-2 ${
            isDarkMode ? 'text-blue-300' : 'text-blue-600'
          }`}>
            <BookOpen className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-xs sm:text-sm">How learning works</span>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Your Ultimate Guide
              <br />
              <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                to Educational Excellence
              </span>
            </h1>
            <p className={`text-base sm:text-lg max-w-md mx-auto lg:mx-0 ${
              isDarkMode ? 'text-blue-200' : 'text-slate-600'
            }`}>
              Comprehensive learning platform designed to elevate your educational journey 
              with expert-led courses and interactive learning experiences
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <button 
              onClick={handleLogin}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2 ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/30' 
                  : 'bg-white text-slate-700 hover:bg-gray-50 border border-blue-200 shadow-lg'
              }`}
            >
              <LogIn className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>Login</span>
            </button>
            <button 
              onClick={handleSignUp}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2 ${
                isDarkMode 
                  ? 'bg-blue-400 text-blue-900 hover:bg-blue-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <UserPlus className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>Get Started</span>
              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
          <div className={`flex items-center justify-center lg:justify-start space-x-4 backdrop-blur-sm rounded-2xl p-4 max-w-xs mx-auto lg:mx-0 ${
            isDarkMode 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-white/80 border border-blue-200 shadow-lg'
          }`}>
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
              ))}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">4.9</div>
              <div className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-blue-300' : 'text-slate-500'
              }`}>+8,547 reviews</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative px-4 sm:px-0">
          <div className={`backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl max-w-md mx-auto lg:max-w-none ${
            isDarkMode 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-white/90 border border-blue-200 shadow-xl'
          }`}>
            <div className="mb-4 sm:mb-6">
              <div className={`text-xs sm:text-sm mb-2 ${
                isDarkMode ? 'text-blue-300' : 'text-slate-500'
              }`}>Monthly Learning Goal</div>
              <div className="text-2xl sm:text-3xl font-bold">40 Hours</div>
              <div className={`w-full h-2 rounded-full mt-2 ${
                isDarkMode ? 'bg-white/20' : 'bg-blue-100'
              }`}>
                <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between ${
                isDarkMode ? 'bg-white/10' : 'bg-blue-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-green-400' : 'bg-green-500'
                  }`}>
                    <PlayCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Current Course</div>
                    <div className={`text-xs sm:text-sm ${
                      isDarkMode ? 'text-blue-300' : 'text-slate-500'
                    }`}>Advanced Mathematics</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm sm:text-base">75%</div>
                  <div className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-blue-300' : 'text-slate-500'
                  }`}>Progress</div>
                </div>
              </div>
              <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between ${
                isDarkMode ? 'bg-white/10' : 'bg-blue-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-orange-400' : 'bg-orange-500'
                  }`}>
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Next Session</div>
                    <div className={`text-xs sm:text-sm ${
                      isDarkMode ? 'text-blue-300' : 'text-slate-500'
                    }`}>Physics Lab - 2:00 PM</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm sm:text-base">Today</div>
                  <div className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-blue-300' : 'text-slate-500'
                  }`}>Room 301</div>
                </div>
              </div>
            </div>
            <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}>
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="text-white text-xs sm:text-sm">Student ID</div>
                <div className="text-white text-xs sm:text-sm">2024</div>
              </div>
              <div className="text-white font-mono text-base sm:text-lg">STU-2024-****</div>
              <div className="text-indigo-200 text-xs sm:text-sm mt-1 sm:mt-2">Active Student</div>
            </div>
          </div>
          <div className={`hidden md:block absolute -right-2 lg:-right-4 top-4 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl ${
            isDarkMode 
              ? 'bg-yellow-400 text-yellow-900' 
              : 'bg-yellow-500 text-white'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Achievement</span>
            </div>
            <div className="text-xs sm:text-sm">Top Performer</div>
          </div>
          <div className={`absolute -left-2 sm:-left-8 bottom-4 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl ${
            isDarkMode 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-white/90 border border-blue-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-green-400' : 'bg-green-500'
              }`}>
                <Users className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </div>
              <span className="font-semibold text-xs sm:text-base">Active Students</span>
            </div>
            <div className={`text-lg sm:text-2xl font-bold transition-all duration-500 ${
              isAnimating ? 'scale-110 text-blue-400' : ''
            }`}>
              {currentStudents.toLocaleString()}
            </div>
            <div className={`w-12 sm:w-20 h-4 sm:h-8 rounded opacity-60 mt-2 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-400 to-blue-400' 
                : 'bg-gradient-to-r from-green-500 to-blue-500'
            }`}></div>
          </div>
          <div className={`hidden xl:block absolute top-1/2 -right-12 backdrop-blur-lg rounded-2xl p-3 shadow-xl ${
            isDarkMode 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-white/90 border border-blue-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-sm">Today's Schedule</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Math</span>
                <span className={isDarkMode ? 'text-blue-300' : 'text-slate-500'}>9:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Physics</span>
                <span className={isDarkMode ? 'text-blue-300' : 'text-slate-500'}>2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Chemistry</span>
                <span className={isDarkMode ? 'text-blue-300' : 'text-slate-500'}>4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3 sm:space-x-6">
          {educationIcons.map((edu, index) => (
            <div
              key={index}
              className={`w-8 sm:w-12 h-8 sm:h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'bg-white/80 hover:bg-white shadow-lg'
              }`}
              title={edu.name}
            >
              <edu.icon className={`w-4 sm:w-6 h-4 sm:h-6 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`absolute top-1/4 right-1/4 w-1 sm:w-2 h-1 sm:h-2 rounded-full animate-pulse ${
        isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
      }`}></div>
      <div className={`absolute top-3/4 left-1/4 w-1 h-1 rounded-full animate-ping ${
        isDarkMode ? 'bg-indigo-300' : 'bg-indigo-400'
      }`}></div>
      <div className={`absolute top-1/2 right-1/3 w-2 sm:w-3 h-2 sm:h-3 rounded-full animate-bounce ${
        isDarkMode ? 'bg-purple-500' : 'bg-purple-600'
      }`} style={{animationDelay: '1s'}}></div>
      <div className="absolute top-20 right-10 sm:right-20 animate-pulse">
        <BookOpen className={`w-6 sm:w-8 h-6 sm:h-8 ${isDarkMode ? 'text-blue-300/30' : 'text-blue-400/30'}`} />
      </div>
      <div className="absolute bottom-32 left-10 sm:left-20 animate-pulse" style={{animationDelay: '2s'}}>
        <Lightbulb className={`w-5 sm:w-6 h-5 sm:h-6 ${isDarkMode ? 'text-yellow-300/30' : 'text-yellow-400/30'}`} />
      </div>
    </div>
  );
}