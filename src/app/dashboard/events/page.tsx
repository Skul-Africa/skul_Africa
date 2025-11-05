"use client"

import React, { useState } from 'react';
import { Bell, Settings, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
const EventCard = ({ title, date, location, image, isActive }: {
  title: string;
  date: string;
  location: string;
  image: string;
  isActive: boolean;
}) => (
  <div className="w-full sm:w-64 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition mx-auto sm:mx-0">
    <div
      className="w-full h-32 sm:h-48 bg-gray-200"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
    />
    <div className="p-3 sm:p-4">
      <p className="text-xs text-gray-800 font-poor mb-1">{date}</p>
      <h3 className="text-base sm:text-lg font-black text-black mb-2">{title}</h3>
      <p className="text-xs text-gray-400 mb-3">{location}</p>
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full font-poor ${
          isActive ? 'bg-white text-black' : 'bg-gray-100 text-gray-700'
        }`}>
          {isActive ? '● Active' : 'Pending'}
        </span>
        <div className="w-4 h-4 rounded-full bg-purple-400" />
      </div>
    </div>
  </div>
);


export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const events = [
    { title: 'Graduation', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: true },
    { title: 'School Picnic', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: true },
    { title: 'Inter-House Sport', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: true },
    { title: 'PTA Meeting', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: true },
    { title: 'Annual Prize Day', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: true },
    { title: 'Movie Night', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: false },
    { title: 'Science Fair', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: false },
    { title: 'Graduation', date: 'June 5 2029 - 3:10pm', location: 'Rocky Ridge Exhibit, Gidan Kwano', active: false },
  ];

  return (
    <div className="p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Events</h2>
        <div className="w-full sm:w-64 flex items-center bg-white rounded-full px-3 sm:px-4 py-2 shadow">
          <Search className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 ml-2 sm:ml-3 outline-none text-gray-500 text-sm"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 bg-white p-2 sm:p-4 rounded-full shadow">
        <button className="bg-blue-900 text-white px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm">
          UPCOMING (34)
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm">
          DRAFT (14)
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm">
          PAST (30)
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4 mb-4 sm:mb-6">
        {events.map((event, idx) => (
          <EventCard
            key={idx}
            title={event.title}
            date={event.date}
            location={event.location}
            image={`/api/placeholder/259/231`}
            isActive={event.active}
          />
        ))}
      </div>


     {/* Pagination */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
              <Button variant="outline" size="sm" disabled className="text-xs sm:text-sm">
                Previous
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                1
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                2
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                Next
              </Button>
            </div>

      {/* Add Event Button */}
      <button className="flex items-center justify-center gap-2 bg-blue-900 text-white px-4 sm:px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition text-xs sm:text-sm w-full sm:w-auto">
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        Add New Event
      </button>
    </div>
  );
}