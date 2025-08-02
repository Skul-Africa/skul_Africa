'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const roles = [
    {
      id: 'school',
      title: 'School',
      description: 'Manage accounts, users, and organizational settings'
    },
    {
      id: 'student',
      title: 'Student',
      description: 'Access courses, complete assignments, and track progress'
    },
    {
      id: 'user',
      title: 'User',
      description: 'Overview team performance and project progress'
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate based on selected role
      switch (selectedRole) {
        case 'school':
          router.push('/login_as_school');
          break;
        case 'student':
          router.push('/login_as_student');
          break;
        case 'user':
          router.push('/login_as_user');
          break;
        default:
          router.push('/dashboard');
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-[#F4F8FD]'
    } flex items-center justify-center p-4`} style={{
      backgroundColor: isDarkMode ? '' : '#F4F8FD'
    }}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          } shadow-md`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-[#F4F8FD]'
      } rounded-lg max-w-md w-full p-4 sm:p-6 md:p-8`}>
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Image
            src="/logo.png" // Image should be in public folder
            alt="Logo"
            width={90}
            height={140}
            className="w-24 h-auto sm:w-32 md:w-auto"
          />
        </div>

        {/* Title */}
        <h1 className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        } text-center mb-6 sm:mb-8`}>
          Choose your role
        </h1>

        {/* Role Options */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedRole === role.id 
                  ? isDarkMode 
                    ? 'bg-blue-900/20 border-blue-500' 
                    : 'bg-blue-50 border-blue-500'
                  : isDarkMode 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-[#C4ACE317] '
              } border rounded-lg p-3 sm:p-4`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 transition-colors duration-200 ${
                      isDarkMode 
                        ? 'border-gray-500 bg-gray-600' 
                        : 'border-gray-300 bg-white'
                    }`}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className={`text-sm font-medium mb-1 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {role.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
            selectedRole
              ? `bg-blue-600 hover:bg-blue-700 focus:ring-4 ${
                  isDarkMode ? 'focus:ring-blue-800' : 'focus:ring-blue-200'
                }`
              : isDarkMode 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}