"use client";

import React, { useState } from 'react';
import { Search, Settings, Plus, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const [permissions, setPermissions] = useState({
    founder: { student: true, staff: true, financial: true },
    assistant: { student: false, staff: false, financial: false }
  });

  const settingsCategories = [
    { id: 'general', label: 'General Settings', icon: '⚙️' },
    { id: 'users', label: 'User & Role Management', icon: '👤' },
    { id: 'academic', label: 'Academic Settings', icon: '📚' },
    { id: 'student-staff', label: 'Student & Staff Management', icon: '👥' },
    { id: 'financial', label: 'Financial Settings', icon: '💵' },
    { id: 'privacy', label: 'Data & Privacy', icon: '🔒', active: true }
  ];

  const togglePermission = (role: string, category: string) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role as keyof typeof prev],
        [category]: !prev[role as keyof typeof prev][category as keyof typeof prev[keyof typeof prev]]
      }
    }));
  };

  return (
    <div className="bg-[#DDE5FF] min-h-screen p-2 sm:p-4">
      {/* Header */}
      <div className="mb-2 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="w-full sm:w-auto">
          <h1 className="text-[#303972] font-bold text-lg sm:text-2xl mb-1">Settings</h1>
          <div className="flex items-center gap-2 bg-white rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-md w-full sm:w-[175px]">
            <Search className="text-[#4D44B5] w-3 h-3" />
            <input
              type="text"
              placeholder="Search here..."
              className="flex-1 outline-none text-[#A098AE] placeholder:text-[#A098AE] text-sm"
            />
          </div>
        </div>
      </div>

      {/* Settings Header Card */}
      <div className="bg-white rounded-[15px] sm:rounded-[25px] p-2 sm:p-4 shadow-md mb-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-medium text-gray-800">Settings</h2>
            <p className="text-[#636363] font-bold text-sm sm:text-base">
              Personalize your account and manage preference securely...
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Container */}
      <div className="bg-white rounded-[3px] sm:rounded-[5px] shadow-md p-2 sm:p-4">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-[240px] space-y-1 sm:space-y-2">
            {settingsCategories.map((category) => (
              <button
                key={category.id}
                className={`w-full flex items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg transition-all ${
                  category.active
                    ? 'bg-[#DDE9E9]'
                    : 'bg-[#F5F8F7] hover:bg-[#DDE9E9]'
                }`}
              >
                <span className="text-sm sm:text-lg">{category.icon}</span>
                <span className="text-[#636363] text-sm sm:text-lg font-normal flex-1 text-left">
                  {category.label}
                </span>
                <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Right Content - Data & Privacy */}
          <div className="flex-1 border border-[#E4E4E4] rounded-lg p-2 sm:p-4">
            <div className="mb-2 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-light mb-2 sm:mb-3">Data & Privacy</h2>
              <div className="border-t-2 border-[#F8F8F8] mb-2 sm:mb-3"></div>
              <h3 className="text-base sm:text-lg font-normal text-[#2C2C2C] mb-1">
                Data Access Permissions
              </h3>
              <p className="text-[#262626] font-light text-sm sm:text-base">
                Set Permissions to other admins in your school
              </p>
            </div>

            {/* Permissions Table */}
            <div className="space-y-0 border border-[#EAEAEA] rounded-lg overflow-hidden">
              {/* Header Row */}
              <div className="bg-[#F5F8F7] border-b border-[#E7E7E7] p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-24">
                  <p className="text-base sm:text-lg font-medium text-[#2C2C2C]">Login Alerts</p>
                  <p className="text-[#262626] font-light text-sm">Founder</p>
                </div>
                <div className="flex-1 flex items-center gap-1 sm:gap-2 justify-end w-full sm:w-auto">
                  <div className="flex gap-1 sm:gap-2">
                    <PermissionCheckbox
                      checked={permissions.founder.student}
                      onChange={() => togglePermission('founder', 'student')}
                    />
                    <PermissionCheckbox
                      checked={permissions.founder.staff}
                      onChange={() => togglePermission('founder', 'staff')}
                    />
                    <PermissionCheckbox
                      checked={permissions.founder.financial}
                      onChange={() => togglePermission('founder', 'financial')}
                    />
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="bg-white border-b border-[#E7E7E7] p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-24">
                  <p className="text-base sm:text-lg font-medium text-[#2C2C2C]">Login Alerts</p>
                  <p className="text-[#262626] font-light text-sm">Assistant</p>
                </div>
                <div className="flex-1 flex items-center gap-1 sm:gap-2 justify-end w-full sm:w-auto">
                  <div className="w-20 sm:w-30 border border-[#D4D4D4] rounded-lg p-1 sm:p-2">
                    <p className="font-semibold text-[#262626] text-xs sm:text-sm">Full Access</p>
                  </div>
                  <div className="w-20 sm:w-30 border border-[#D4D4D4] rounded-lg p-1 sm:p-2">
                    <p className="font-semibold text-[#262626] text-xs sm:text-sm">Only View</p>
                  </div>
                </div>
              </div>

              {/* Third Row - Expanded */}
              <div className="bg-[#F5F8F7] border-b border-[#E7E7E7] p-2 sm:p-3">
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-0 mb-2 sm:mb-3">
                  <div className="w-full sm:w-24">
                    <p className="text-base sm:text-lg font-medium text-[#2C2C2C]">Login Alerts</p>
                    <p className="text-[#262626] font-light text-sm">Assistant</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1 sm:gap-2 justify-end w-full sm:w-auto">
                    <PermissionCheckbox
                      checked={permissions.assistant.student}
                      onChange={() => togglePermission('assistant', 'student')}
                    />
                    <div className="w-20 sm:w-30 border border-[#D4D4D4] rounded-lg p-1 sm:p-2 bg-white">
                      <p className="font-semibold text-[#262626] text-xs sm:text-sm">Only View</p>
                    </div>
                  </div>
                </div>

                {/* Vertical Dividers */}
                <div className="relative h-8 sm:h-16 mb-2 sm:mb-3">
                  <div className="absolute left-1/3 top-0 h-full w-0.5 bg-[#E1E2E2]"></div>
                  <div className="absolute left-2/3 top-0 h-full w-0.5 bg-[#E1E2E2]"></div>
                </div>

                {/* Permission Icons */}
                <div className="flex gap-2 sm:gap-4 justify-center mb-2 sm:mb-3">
                  <div className="text-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded mb-1 mx-auto"></div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded mb-1 mx-auto"></div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded mb-1 mx-auto"></div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded mb-1 mx-auto"></div>
                  </div>
                </div>

                {/* Add Member Button */}
                <div className="flex justify-center">
                  <button className="border border-[#D4D4D4] rounded-lg px-2 sm:px-3 py-1 sm:py-2 bg-white flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors">
                    <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-[#262626]" />
                    <span className="font-semibold text-[#262626] text-sm">Add Member</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-[30px] h-[29px] border rounded-lg flex items-center justify-center transition-all ${
        checked
          ? 'bg-[#4D44B5] border-[#4D44B5]'
          : 'bg-white border-[#D4D4D4] hover:border-[#4D44B5]'
      }`}
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}
