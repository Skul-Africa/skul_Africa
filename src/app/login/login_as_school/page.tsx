"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://skul-africa.onrender.com';

// Types for API responses
interface LoginResponse {
  message: string;
  token: string;
}

interface LoginRequest {
  accessCode: string;
  profileCode: string;
}

const schoolAccessPage = () => {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [profileCode, setProfileCode] = useState('');
  const [showProfileCode, setShowProfileCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Token management functions
  const saveTokens = (token: string) => {
    try {
      // Save to localStorage for persistence across browser sessions
      localStorage.setItem('school_token', token);
      localStorage.setItem('school_token_timestamp', Date.now().toString());
      
      // Also save to sessionStorage as backup
      sessionStorage.setItem('school_token', token);
      
      console.log('Tokens saved successfully');
    } catch (error) {
      console.error('Error saving tokens:', error);
      // Fallback to sessionStorage only if localStorage fails
      sessionStorage.setItem('school_token', token);
    }
  };

  const clearTokens = () => {
    try {
      localStorage.removeItem('school_token');
      localStorage.removeItem('school_token_timestamp');
      sessionStorage.removeItem('school_token');
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  };

  const handleLogin = async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/school/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed: ${response.status}`);
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const loginData: LoginRequest = {
        accessCode: accessCode.trim().toUpperCase(),
        profileCode: profileCode.trim().toUpperCase(),
      };

      const response = await handleLogin(loginData);
      
      // Save tokens securely
      saveTokens(response.token);
      
      setSuccess(response.message || 'Login successful! Redirecting...');
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
      
      // Clear any existing tokens on failed login
      clearTokens();
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
              src="/schoolimage.png"
              alt="Welcome Illustration"
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
              <p className="text-gray-600 text-xs mb-1">Welcome</p>
              <h2 className="text-lg font-bold text-gray-900">Log in to Your Account</h2>
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
                  placeholder="Access Code"
                  required
                  disabled={isLoading}
                  autoComplete="username"
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
                  placeholder="Profile Code"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
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

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
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
                  Forgot Profile Code?
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
                New school?{' '}
                <a href="#" className="text-gray-900 hover:text-gray-700 
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
                <p className="text-gray-600 text-xs mb-1">Welcome</p>
                <h2 className="text-base font-bold text-gray-900">Log in to Your Account</h2>
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
                    id="accessCode-desktop"
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
                    autoComplete="username"
                  />
                </div>

                {/* Profile Code Input */}
                <div className="relative">
                  <input
                    id="profileCode-desktop"
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
                    autoComplete="current-password"
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

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-desktop"
                      type="checkbox"
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 
                               border-gray-300 rounded"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember-desktop" className="ml-2 block text-xs text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-800 
                                       transition-colors">
                    Forgot Profile Code?
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
                  New school?{' '}
                  <a href="/signup/school" className="text-gray-900 hover:text-gray-700 
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

export default schoolAccessPage;