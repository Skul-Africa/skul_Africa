"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://skul-africa.onrender.com';

// Types for API responses
interface SchoolSignupResponse {
  message: string;
  school: {
    id: number;
    email: string;
    accessCode: string;
    profileCode: string;
    token: string;
  };
}

interface SchoolSignupRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
}

const SchoolSignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // School registration function
  const handleSchoolSignup = async (signupData: SchoolSignupRequest): Promise<SchoolSignupResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/school/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `School registration failed: ${response.status}`);
    }

    return response.json();
  };

  // Function to save token to localStorage
  const saveToken = (token: string, schoolData: SchoolSignupResponse['school']) => {
    try {
      // Save token
      localStorage.setItem('school_token', token);
      
      // Save school data
      localStorage.setItem('school_data', JSON.stringify({
        id: schoolData.id,
        email: schoolData.email,
        accessCode: schoolData.accessCode,
        profileCode: schoolData.profileCode
      }));
      
      console.log('Token and school data saved successfully');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!name || !address || !email || !phone) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    try {
      const signupData: SchoolSignupRequest = {
        name: name.trim(),
        address: address.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      const response = await handleSchoolSignup(signupData);
      
      // Save token and school data
      saveToken(response.school.token, response.school);
      
      setSuccess(`${response.message} Access Code: ${response.school.accessCode}, Profile Code: ${response.school.profileCode}`);
      
      // Redirect to school dashboard after successful registration
      setTimeout(() => {
        router.push('/school/dashboard'); // Adjust route as needed
      }, 3000);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'School registration failed. Please try again.';
      setError(errorMessage);
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
              alt="School Registration Illustration"
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-sm mb-2">REGISTER YOUR SCHOOL</p>
              <h2 className="text-2xl font-bold text-gray-900">School Registration</h2>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm whitespace-pre-line">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              {/* School Name Input */}
              <div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                  placeholder="School Name"
                  required
                  disabled={isLoading}
                  autoComplete="organization"
                />
              </div>

              {/* Address Input */}
              <div>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors min-h-[100px] resize-vertical"
                  placeholder="School Address"
                  required
                  disabled={isLoading}
                  autoComplete="street-address"
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                  placeholder="School Email"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              {/* Phone Input */}
              <div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                  placeholder="School Phone Number (e.g., +2347011122323)"
                  required
                  disabled={isLoading}
                  autoComplete="tel"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white py-4 px-4 rounded-lg 
                         hover:bg-gray-800 focus:outline-none focus:ring-2 
                         focus:ring-gray-500 focus:ring-offset-2 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-colors font-semibold text-base"
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
                    REGISTERING SCHOOL...
                  </span>
                ) : (
                  'REGISTER SCHOOL'
                )}
              </button>
            </form>

            {/* Login Link - Moved to bottom */}
            <div className="mt-auto pt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have a school account?{' '}
                <a href="/school/login" className="text-gray-900 hover:text-gray-700 
                                     font-medium underline transition-colors">
                  LOGIN HERE
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Want to register as a user instead?{' '}
                <a href="/signup" className="text-gray-900 hover:text-gray-700 
                                     font-medium underline transition-colors">
                  USER SIGNUP
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Positioned Form */}
        <div className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 
                        translate-x-0 xl:translate-x-8 2xl:translate-x-16 p-0">
          <div className="w-[380px] xl:w-[400px]">
            {/* School Registration Form Container */}
            <div className="bg-white/95 backdrop-blur-sm rounded-t-xl shadow-lg 
                            p-6 border border-white/20 mb-0 
                            min-h-[35rem] xl:min-h-[38rem] flex flex-col overflow-y-auto max-h-[90vh]">
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
              <div className="text-center mb-4 mt-2">
                <p className="text-gray-600 text-xs mb-1">REGISTER YOUR SCHOOL</p>
                <h2 className="text-lg font-bold text-gray-900">School Registration</h2>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-xs whitespace-pre-line">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 flex-1">
                {/* School Name Input */}
                <div>
                  <input
                    id="name-desktop"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                    placeholder="School Name"
                    required
                    disabled={isLoading}
                    autoComplete="organization"
                  />
                </div>

                {/* Address Input */}
                <div>
                  <textarea
                    id="address-desktop"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors min-h-[80px] resize-vertical"
                    placeholder="School Address"
                    required
                    disabled={isLoading}
                    autoComplete="street-address"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    id="email-desktop"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                    placeholder="School Email"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <input
                    id="phone-desktop"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                    placeholder="Phone Number"
                    required
                    disabled={isLoading}
                    autoComplete="tel"
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg 
                           hover:bg-gray-800 focus:outline-none focus:ring-2 
                           focus:ring-gray-500 focus:ring-offset-2 
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-colors font-semibold text-sm"
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
                      REGISTERING...
                    </span>
                  ) : (
                    'REGISTER SCHOOL'
                  )}
                </button>
              </form>

              {/* Login Links - Moved to bottom */}
              <div className="mt-4 pt-4 text-center">
                <p className="text-xs text-gray-600">
                  Already have a school account?{' '}
                  <a href="/login/login_as_school" className="text-gray-900 hover:text-gray-700 
                                     font-medium underline transition-colors">
                    LOGIN HERE
                  </a>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Register as user instead?{' '}
                  <a href="/signup/user" className="text-gray-900 hover:text-gray-700 
                                     font-medium underline transition-colors">
                    USER SIGNUP
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

export default SchoolSignupPage;