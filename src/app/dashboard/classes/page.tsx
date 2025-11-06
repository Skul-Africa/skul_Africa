"use client"

import React, { useState } from 'react';
import { Search, Bell, Settings, Plus, Filter } from 'lucide-react';

const ClassesPage = () => {
  const [classes] = useState([
    { id: 1, grade: 'GRADE 1', faculty: 'Science', enrolled: 30, classroom: 'B1001', teachers: 3 },
    { id: 2, grade: 'GRADE 2', faculty: 'Science', enrolled: 20, classroom: 'B1001', teachers: 3 },
    { id: 3, grade: 'GRADE 3', faculty: 'Science', enrolled: 30, classroom: 'B1001', teachers: 5 },
    { id: 4, grade: 'GRADE 4', faculty: 'Science', enrolled: 30, classroom: 'B1001', teachers: 2 },
    { id: 5, grade: 'GRADE 5', faculty: 'Science', enrolled: 30, classroom: 'B1001', teachers: 5 },
    { id: 6, grade: 'GRADE 6', faculty: 'Science', enrolled: 30, classroom: 'B1001', teachers: 5 },
    { id: 7, grade: 'GRADE 7', faculty: 'Science', enrolled: 30, classroom: 'B1001', teachers: 5 },
  ]);

  const teacherAvatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  ];

  const menuItems = [
    { name: 'Students', icon: '👥', active: false },
    { name: 'Teachers', icon: '👨‍🏫', active: false },
    { name: 'Events', icon: '📅', active: false },
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Finance', icon: '💰', active: false },
    { name: 'Food', icon: '🍔', active: false },
    { name: 'Settings', icon: '⚙️', active: false },
    { name: 'Latest Activity', icon: '💬', active: false },
    { name: 'Activity', icon: '📈', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4FF]">
      {/* Main Content */}
      <div className="flex-1 p-2 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2 sm:gap-0">
          <h1 className="text-[#303972] font-bold text-lg sm:text-2xl">Your Classes</h1>

          {/* Search Bar */}
          <div className="bg-white rounded-[20px] px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-sm w-full sm:w-auto">
            <Search className="w-3 h-3 sm:w-4 sm:h-4 text-[#4D44B5]" />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none text-[#A098AE] text-xs sm:text-sm w-full sm:w-[100px]"
            />
          </div>
        </div>

        {/* Add New Class Card */}
        <div className="bg-white border border-[#C5C5C5] rounded-[15px] p-2 sm:p-4 mb-2 sm:mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <h2 className="text-[#636363] font-bold text-base sm:text-lg mb-1">Limited Access (Max 50)</h2>
            <button className="bg-[#4D44B5] text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-[#3d3691] transition-colors text-sm sm:text-base">
              + Add New Class
            </button>
          </div>
          <div className="w-[75px] sm:w-[100px] h-[56px] sm:h-[75px] bg-contain bg-no-repeat bg-center opacity-50">
            📚
          </div>
        </div>

        {/* Class List Header */}
        <div className="bg-white border border-[#C5C5C5] rounded-t-[5px] p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <h2 className="text-[#2F2F2F] font-semibold text-base sm:text-lg mb-1">Class List</h2>
            <p className="text-[#2F2F2F] text-xs sm:text-sm">Total Classes: {classes.length}</p>
          </div>
          <button className="flex items-center gap-1 border border-[#A5A5A5] rounded-lg px-2 sm:px-3 py-1 hover:bg-gray-50 transition-colors">
            <Filter className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="text-xs sm:text-sm">Filter By</span>
          </button>
        </div>

        {/* Table Header */}
        <div className="bg-[#F3F3F3] border-x border-t border-[#C5C5C5] p-2 sm:p-3 hidden sm:grid grid-cols-6 gap-2">
          <div className="text-[#8C8C8C] text-xs sm:text-sm">NAME OF GRADE</div>
          <div className="text-[#8C8C8C] text-xs sm:text-sm">FACULTY</div>
          <div className="text-[#8C8C8C] text-xs sm:text-sm">TOTAL ENROLLED</div>
          <div className="text-[#8C8C8C] text-xs sm:text-sm">CLASSROOM</div>
          <div className="text-[#8C8C8C] text-xs sm:text-sm">TEACHER'S ASSIGNED</div>
          <div className="text-[#8C8C8C] text-xs sm:text-sm">ACTIONS</div>
        </div>

        {/* Table Rows */}
        <div className="bg-white border border-[#C5C5C5]">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="border-b border-[#C5C5C5] p-2 sm:p-3 grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-2 items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 col-span-1 sm:col-span-1">
                <div className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px] bg-[#686868] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  {classItem.id}
                </div>
                <span className="text-[#2F2F2F] text-base sm:text-lg font-normal">{classItem.grade}</span>
              </div>

              <div className="text-[#2F2F2F] text-sm sm:text-base col-span-1 sm:col-span-1">{classItem.faculty}</div>

              <div className="text-[#2F2F2F] text-sm sm:text-base col-span-1 sm:col-span-1">{classItem.enrolled} Students</div>

              <div className="text-[#2F2F2F] text-sm sm:text-base col-span-1 sm:col-span-1">{classItem.classroom}</div>

              <div className="flex items-center -space-x-1 col-span-1 sm:col-span-1">
                {teacherAvatars.slice(0, Math.min(3, classItem.teachers)).map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-200"
                  >
                    <img src={avatar} alt={`Teacher ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {classItem.teachers > 3 && (
                  <div className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] bg-[#3E047C] rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">
                    +{classItem.teachers - 3}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 col-span-1 sm:col-span-1">
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                  ✏️
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;