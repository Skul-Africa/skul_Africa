"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!name || !email || !phone || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess('Account created successfully!');
            setTimeout(() => {
                console.log('Account created, redirecting...');
            }, 1000);
        } catch (err) {
            setError('Account creation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderInput = (label: string, type: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>, placeholder: string, showToggle = false) => (
        <div className="relative">
            <input
                type={showToggle && !showPassword ? 'password' : type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder-gray-500 text-base transition-colors"
                placeholder={placeholder}
                required
                disabled={isLoading}
            />
            {showToggle && (
                <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen relative">
            {/* Background image for large screens */}
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
                    

            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                            <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
                        </div>
                        <p className="text-gray-600 text-sm">LET'S GET YOU STARTED</p>
                        <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
                    </div>

                    {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}
                    {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">{success}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {renderInput('Name', 'text', name, setName, 'Your Name')}
                        {renderInput('Email', 'email', email, setEmail, 'Email')}
                        {renderInput('Phone', 'tel', phone, setPhone, 'Phone Number')}
                        {renderInput('Password', 'password', password, setPassword, 'Password', true)}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    GET STARTED
                                </span>
                            ) : (
                                'GET STARTED'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-gray-900 hover:text-gray-700 font-medium underline transition-colors">LOGIN HERE</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;
