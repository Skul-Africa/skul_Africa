"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

// Configure API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://skul-africa.onrender.com';

const StudentAccessPage = () => {
  const [accessCode, setAccessCode] = useState('');
  const [profileCode, setProfileCode] = useState('');
  const [showProfileCode, setShowProfileCode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to save token to localStorage
  const saveToken = (token: string, remember = false) => {
    if (typeof window !== 'undefined') {
      if (remember) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('authToken', token);
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!accessCode || !profileCode) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (accessCode.length < 3) {
      setError('Please enter a valid Access Code');
      setIsLoading(false);
      return;
    }

    try {
      // API call to login endpoint using fetch
      const response = await fetch(`${API_BASE_URL}/api/v1/student/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessCode: accessCode.trim(),
          profileCode: profileCode.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token based on remember me preference
        saveToken(data.token, rememberMe);
        
        // Save student data
        if (typeof window !== 'undefined') {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('studentData', JSON.stringify(data.student));
        }

        setSuccess('Access granted! Loading dashboard...');
        
        setTimeout(() => {
          // Redirect to dashboard
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        // Handle server error response
        const errorMessage = data.message || 'Invalid Access Code or Profile Code';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);

      // Handle network or other errors
      if (
        typeof err === 'object' &&
        err !== null &&
        'name' in err &&
        'message' in err &&
        typeof (err as { name: unknown }).name === 'string' &&
        typeof (err as { message: unknown }).message === 'string'
      ) {
        const errorObj = err as { name: string; message: string };
        if (errorObj.name === 'TypeError' && errorObj.message.includes('fetch')) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError('Access failed. Please try again.');
        }
      } else {
        setError('Access failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Desktop only */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image
          src="/Loginasuser.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Left Side - Illustration - Desktop only */}
        <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 p-8 lg:p-12">
          <div className="w-500 max-w-lg lg:max-w-xl">
            <Image
              src="/login-illustration.png"
              alt="Student Access Illustration"
              width={660}
              height={460}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Mobile: Full Screen Form */}
        <div className="lg:hidden w-full h-full min-h-screen">
          <div className="bg-white w-full h-full min-h-screen p-6 flex flex-col">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-left mb-6">
              <p className="text-gray-600 text-xs mb-1">STUDENT ACCESS</p>
              <h2 className="text-lg font-bold text-gray-900">Enter Your Credentials</h2>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              {/* Access Code Input */}
              <div>
                <input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                  placeholder="Access Code (e.g., AC-26-4939)"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Profile Code Input */}
              <div className="relative">
                <input
                  id="profileCode"
                  type={showProfileCode ? "text" : "password"}
                  value={profileCode}
                  onChange={(e) => setProfileCode(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                  placeholder="Profile Code (e.g., MJD-7474)"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowProfileCode(!showProfileCode)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {showProfileCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember Me and Forgot Profile Code */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                             border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-800 
                                     transition-colors">
                  Forgot Credentials?
                </a>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg 
                         hover:bg-gray-900 focus:outline-none focus:ring-2 
                         focus:ring-gray-500 focus:ring-offset-2 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-colors font-medium text-base"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" 
                              stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ACCESSING...
                  </span>
                ) : (
                  'CONTINUE'
                )}
              </button>
            </form>

            {/* Sign Up Link - Moved to bottom */}
            <div className="mt-auto pt-6 text-center">
              <p className="text-sm text-gray-600">
                New Student?{' '}
                <a href="/signup/student" className="text-gray-900 hover:text-gray-700 
                                     font-medium underline transition-colors">
                  REGISTER HERE
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Positioned Form */}
        <div className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 
                        translate-x-0 xl:translate-x-8 2xl:translate-x-16 p-0">
          <div className="w-[380px] xl:w-[400px]">
            {/* Login Form Container */}
            <div className="bg-white/95 backdrop-blur-sm rounded-t-xl shadow-lg 
                            p-6 border border-white/20 mb-0 
                            min-h-[30rem] xl:min-h-[32rem] flex flex-col">
              {/* Logo */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-3">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="text-left mb-4 mt-6">
                <p className="text-gray-600 text-xs mb-1">STUDENT ACCESS</p>
                <h2 className="text-base font-bold text-gray-900">Enter Your Credentials</h2>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 flex-1">
                {/* Access Code Input */}
                <div>
                  <input
                    id="accessCode"
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                    placeholder="Access Code"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Profile Code Input */}
                <div className="relative">
                  <input
                    id="profileCode"
                    type={showProfileCode ? "text" : "password"}
                    value={profileCode}
                    onChange={(e) => setProfileCode(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                    placeholder="Profile Code"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowProfileCode(!showProfileCode)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 
                             text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showProfileCode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Remember Me and Forgot Profile Code */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 
                               border-gray-300 rounded"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember" className="ml-2 block text-xs text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-800 
                                       transition-colors">
                    Forgot Credentials?
                  </a>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg 
                           hover:bg-gray-900 focus:outline-none focus:ring-2 
                           focus:ring-gray-500 focus:ring-offset-2 
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-colors font-medium text-sm"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" 
                                stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" 
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      ACCESSING...
                    </span>
                  ) : (
                    'CONTINUE'
                  )}
                </button>
              </form>

              {/* Sign Up Link - Moved to bottom */}
              <div className="mt-auto pt-4 text-center">
                <p className="text-xs text-gray-600">
                  New Student?{' '}
                  <a href="/signup/student" className="text-gray-900 hover:text-gray-700 
                                       font-medium underline transition-colors">
                    REGISTER HERE
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAccessPage;