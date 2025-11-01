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
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[#303972] font-bold text-4xl">Your Classes</h1>

          {/* Search Bar */}
          <div className="bg-white rounded-[40px] px-8 py-3 flex items-center gap-4 shadow-sm">
            <Search className="w-8 h-8 text-[#4D44B5]" />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none text-[#A098AE] text-lg w-[200px]"
            />
          </div>
        </div>

        {/* Add New Class Card */}
        <div className="bg-white border border-[#C5C5C5] rounded-[30px] p-8 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-[#636363] font-bold text-xl mb-2">Limited Access (Max 50)</h2>
            <button className="bg-[#4D44B5] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#3d3691] transition-colors">
              + Add New Class
            </button>
          </div>
          <div className="w-[200px] h-[150px] bg-contain bg-no-repeat bg-center opacity-50">
            📚
          </div>
        </div>

        {/* Class List Header */}
        <div className="bg-white border border-[#C5C5C5] rounded-t-[10px] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-[#2F2F2F] font-semibold text-2xl mb-1">Class List</h2>
            <p className="text-[#2F2F2F] text-base">Total Classes: {classes.length}</p>
          </div>
          <button className="flex items-center gap-2 border border-[#A5A5A5] rounded-lg px-6 py-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-base">Filter By</span>
          </button>
        </div>

        {/* Table Header */}
        <div className="bg-[#F3F3F3] border-x border-t border-[#C5C5C5] p-6 grid grid-cols-6 gap-4">
          <div className="text-[#8C8C8C] text-base">NAME OF GRADE</div>
          <div className="text-[#8C8C8C] text-base">FACULTY</div>
          <div className="text-[#8C8C8C] text-base">TOTAL ENROLLED</div>
          <div className="text-[#8C8C8C] text-base">CLASSROOM</div>
          <div className="text-[#8C8C8C] text-base">TEACHER'S ASSIGNED</div>
          <div className="text-[#8C8C8C] text-base">ACTIONS</div>
        </div>

        {/* Table Rows */}
        <div className="bg-white border border-[#C5C5C5]">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="border-b border-[#C5C5C5] p-6 grid grid-cols-6 gap-4 items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-[55px] h-[55px] bg-[#686868] rounded-full flex items-center justify-center text-white font-bold">
                  {classItem.id}
                </div>
                <span className="text-[#2F2F2F] text-xl font-normal">{classItem.grade}</span>
              </div>

              <div className="text-[#2F2F2F] text-lg">{classItem.faculty}</div>

              <div className="text-[#2F2F2F] text-lg">{classItem.enrolled} Students</div>

              <div className="text-[#2F2F2F] text-lg">{classItem.classroom}</div>

              <div className="flex items-center -space-x-2">
                {teacherAvatars.slice(0, Math.min(3, classItem.teachers)).map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-[50px] h-[50px] rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-200"
                  >
                    <img src={avatar} alt={`Teacher ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {classItem.teachers > 3 && (
                  <div className="w-[50px] h-[50px] bg-[#3E047C] rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm">
                    +{classItem.teachers - 3}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                  ✏️
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
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