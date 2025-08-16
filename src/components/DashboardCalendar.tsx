"use client";

import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

// Clean, minimal calendar: custom slim header (no default arrows), system font, subtle dots for events.
export default function SimpleCalendar() {
  const today = useMemo(() => new Date(), []);
  const [date, setDate] = useState<Date>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  // Events (replace with your data source if needed)
  const events: Record<string, { type: string; title: string }[]> = {};
  const y = today.getFullYear();
  const m = today.getMonth() + 1; // 1-indexed month for keys
  events[`${y}-${m}-15`] = [{ type: 'meeting', title: 'Parent-Teacher Meeting' }];
  events[`${y}-${m}-20`] = [{ type: 'exam', title: 'Midterm Exams' }];
  events[`${y}-${m}-25`] = [{ type: 'holiday', title: 'School Holiday' }];

  const keyFromDate = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  const prevMonth = () => setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1));
  const nextMonth = () => setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1));

  const monthLabel = activeStartDate.toLocaleString(undefined, { month: 'long', year: 'numeric' });

  // Tile dot for event days
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    const key = keyFromDate(date);
    const list = events[key];
    if (!list || list.length === 0) return null;

    const type = list[0].type;
    const color = type === 'meeting' ? 'bg-blue-600' : type === 'exam' ? 'bg-red-600' : 'bg-green-600';

    return (
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <span className={`block w-2 h-2 rounded-full ${color}`} aria-hidden />
      </div>
    );
  };

  // Minimal tile styling — system font, subtle hover, no heavy outlines
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';
    const classes = ['relative', 'flex', 'items-center', 'justify-center', 'p-2', 'rounded-md', 'text-sm', 'font-sans', 'text-gray-800'];

    const todayKey = keyFromDate(new Date());
    if (keyFromDate(date) === todayKey) classes.push('bg-gray-50');

    // selected date subtle background
    if (keyFromDate(date) === keyFromDate(date) && keyFromDate(date) === keyFromDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))) {
      // intentionally no heavy rings
    }

    return classes.join(' ');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 border-none">
      {/* Slim custom header */}
      <div className="flex items-center justify-between mb-3">
        <button aria-label="Previous month" onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="text-sm font-medium text-gray-800">{monthLabel}</div>

        <button aria-label="Next month" onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <Calendar
        onChange={(d: Date) => setDate(d)}
        value={date}
        className="react-calendar w-full border-0 text-sm"
        showNavigation={false}
        showNeighboringMonth={false}
        tileContent={tileContent}
        tileClassName={tileClassName}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate: a }: any) => setActiveStartDate(a)}
      />

      {/* Quiet CSS overrides for react-calendar to remove heavy outlines and ugly defaults */}
      <style jsx global>{`
        .react-calendar {
          --rc-accent: transparent;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          border: none !important;
          box-shadow: none !important;
        }

        /* hide built-in navigation and its buttons (we provide our own) */
        .react-calendar__navigation { display: none !important; }

        /* weekday labels: slim uppercase */
        .react-calendar__month-view__weekdays__weekday {
          text-transform: uppercase;
          font-size: 11px;
          color: #6b7280; /* gray-500 */
          padding-bottom: 8px;
          border-bottom: none !important; /* remove line */
        }

        /* tiles: remove default focus outline, borders and background */
        .react-calendar__tile {
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        .react-calendar__tile:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        /* prevent the active built-in tile styles from showing */
        .react-calendar__tile--active {
          background: transparent !important;
        }

        /* subtle hover */
        .react-calendar__tile:hover {
          background: rgba(15, 23, 42, 0.03); /* gray-900 @ 3% */
          border-radius: 6px;
        }

        /* make the day numbers centered and clean */
        .react-calendar__tile > abbr {
          font-weight: 500;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
