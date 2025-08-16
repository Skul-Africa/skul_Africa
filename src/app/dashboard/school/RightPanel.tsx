"use client";
import {
  CheckSquare,
  BookOpen,
  Pencil,
  Plus,
  Calendar as CalendarIcon,
  Settings,
  Bell,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RightPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const activities = [
    {
      icon: <CheckSquare className="text-green-500 w-4 h-4 mt-0.5" />,
      text: "2 new students enrolled in Grade 9",
      status: "Successful",
      time: "12:45 PM",
    },
    {
      icon: <BookOpen className="text-blue-500 w-4 h-4 mt-0.5" />,
      text: "Biology added to SS2 subjects",
      status: "Pending",
      time: "10:34 AM",
    },
    {
      icon: <Pencil className="text-yellow-500 w-4 h-4 mt-0.5" />,
      text: "Mr. James reassigned to Grade 10",
      status: "Successful",
      time: "5:45 PM",
    },
    {
      icon: <Pencil className="text-yellow-500 w-4 h-4 mt-0.5" />,
      text: "Further Maths added to SS3 subjects",
      status: "Successful",
      time: "2:45 PM",
    },
  ];

  const events = [
    {
      imgSrc: "/graduation-illustration.svg",
      alt: "Graduation Ceremony Illustration",
      title: "Graduation Ceremony",
      date: "25th January 2026",
    },
    {
      imgSrc: "/pta-meeting-illustration.svg",
      alt: "Annual PTA Meeting Illustration",
      title: "Annual PTA Meeting",
      date: "15th August 2026",
    },
    {
      imgSrc: "/food-festival-illustration.svg",
      alt: "Food Festival Illustration",
      title: "Food Festival",
      date: "Lorem ipsum dolor sit amet...",
    },
  ];

  return (
    <>
      {/* Toggle button (mobile only) */}
      <button
        className="fixed bottom-4 right-4 z-50 p-3 bg-[#073B7F] text-white rounded-full shadow-lg sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={18} /> : <Settings size={18} />}
      </button>

      {/* Side Panel */}
      <aside
        className={`fixed bottom-0 right-0 w-full h-[65vh] sm:h-screen sm:w-72 bg-[#f9f9ff] p-4 border-t sm:border-l border-gray-200 flex flex-col transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } sm:translate-y-0 sm:translate-x-0 sm:top-0`}
      >
        {/* Close button for mobile */}
        <button
          className="sm:hidden absolute top-3 right-3 p-1"
          onClick={() => setIsOpen(false)}
        >
          <X size={18} />
        </button>

    {/* Top Bar */}
<div className="flex items-center justify-center mb-4 gap-2">
  <div className="flex items-center gap-2 bg-white shadow rounded-full px-2.5 py-1.5">
    <button className="relative">
      <Bell size={20} className="text-[#2a2a2a]" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-[4px] rounded-full">
        3
      </span>
    </button>
  </div>
  <div className="flex items-center px-2.5 py-1.5 gap-2 bg-white shadow rounded-full">
    <button>
      <Settings size={20} className="text-black rounded-full p-0.5" />
    </button>
  </div>
</div>

        {/* Quick Action Panel */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-bold text-[#2a2a2a]">Quick Action Panel</h3>
            <p className="text-[11px] text-gray-500">You have 0 students</p>
          </div>
          <div className="w-6 h-6 flex items-center justify-center bg-[#5a4fcf] rounded-full text-white">
            <Plus size={12} />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {["Add Teacher", "Add Class", "Add Subject"].map((label) => (
            <button
              key={label}
              className="flex items-center gap-2 text-[#2a2a2a] text-[12px] font-medium"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-[#5a4fcf] rounded-full text-white">
                <Plus size={12} />
              </div>
              {label}
            </button>
          ))}
        </div>

        {/* Enroll & Schedule */}
        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-[#2a2a2a] rounded-full py-2 text-[12px] font-semibold mb-2">
          <img src="/globe.svg" alt="Enroll Icon" width={14} height={14} /> Enroll Student
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-[#5a4fcf] text-white rounded-full py-2 text-[12px] font-semibold">
          <CalendarIcon size={12} /> Schedule Exam
        </button>

        {/* Recent Activities */}
        <div className="flex-1 overflow-y-auto mt-4">
          <h3 className="text-sm font-bold text-[#2a2a2a] mb-3">Recent Activities</h3>
          <ul className="space-y-3">
            {activities.map((act, i) => (
              <li key={i}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    {act.icon}
                    <div>
                      <p className="font-medium text-[11px] text-[#2a2a2a] leading-tight">{act.text}</p>
                      <p className="text-[10px] text-gray-500">Status: {act.status}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500">{act.time}</span>
                </div>
                {i !== activities.length - 1 && <hr className="mt-1 border-gray-200" />}
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full bg-[#10086d18] text-[#4a3aff] px-2 font-semibold rounded-full py-3 text-[11px] hover:bg-[#e7e6fd] transition">
            View More
          </button>

          {/* Upcoming Events */}
          <div className="mt-6 overflow-x-hidden">
            <h3 className="text-sm font-bold text-[#2a2a2a] mb-3">Upcoming Events</h3>
            <div className="space-y-5">
              {events.map((ev, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all p-2 hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="w-full h-24 rounded-lg overflow-hidden mb-1 bg-white">
                    <Image
                      src={ev.imgSrc}
                      alt={ev.alt}
                      width={290}
                      height={100}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>
                  <p className="font-semibold text-[12px] text-[#2a2a2a] leading-tight">{ev.title}</p>
                  <p className="text-[10px] text-gray-500">{ev.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
