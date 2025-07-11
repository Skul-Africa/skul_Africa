"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [token, setToken] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // Basic validation
        if (!name || !email || !address || !token || !phone) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock account creation logic
            setSuccess('Account created successfully!');
            setTimeout(() => {
                console.log('Account created, redirecting...');
                // window.location.href = '/dashboard';
            }, 1000);
        } catch (err) {
            setError('Account creation failed. Please try again.');
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
                            alt="Login Illustration"
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
                                        src="/Logo.png"
                                        alt="Background"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-center mb-8">
                            <p className="text-gray-600 text-sm mb-2">LET'S GET YOU STARTED</p>
                            <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
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
                            {/* Name Input */}
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
                                    placeholder="Your Name"
                                    required
                                    disabled={isLoading}
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
                                    placeholder="Email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Address Input */}
                            <div>
                                <input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                                    placeholder="Address"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Token Input */}
                            <div>
                                <input
                                    id="token"
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent bg-white placeholder-gray-500 
                           text-base transition-colors"
                                    placeholder="Token"
                                    required
                                    disabled={isLoading}
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
                                    placeholder="Phone"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Continue Button */}
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
                                        GET STARTED
                                    </span>
                                ) : (
                                    'GET STARTED'
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link - Moved to bottom */}
                        <div className="mt-auto pt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="#" className="text-gray-900 hover:text-gray-700 
                                     font-medium underline transition-colors">
                                    LOGIN HERE
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
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.11 3.89 21 5 21H11V19H5V3H13V9H21Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <div className="text-center mb-4 mt-4">
                                <p className="text-gray-600 text-xs mb-1">LET'S GET YOU STARTED</p>
                                <h2 className="text-lg font-bold text-gray-900">Create an Account</h2>
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
                                {/* Name Input */}
                                <div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                                        placeholder="Your Name"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                                        placeholder="Email"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Address Input */}
                                <div>
                                    <input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                                        placeholder="Address"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Token Input */}
                                <div>
                                    <input
                                        id="token"
                                        type="text"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                                        placeholder="Token"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Phone Input */}
                                <div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent bg-white/90 placeholder-gray-500 
                             text-sm transition-colors"
                                        placeholder="Phone"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Continue Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg 
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
                                            GET STARTED
                                        </span>
                                    ) : (
                                        'GET STARTED'
                                    )}
                                </button>
                            </form>

                            {/* Sign Up Link - Moved to bottom */}
                            <div className="mt-auto pt-4 text-center">
                                <p className="text-xs text-gray-600">
                                    Already have an account?{' '}
                                    <a href="#" className="text-gray-900 hover:text-gray-700 
                                       font-medium underline transition-colors">
                                        LOGIN HERE
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

export default LoginPage;