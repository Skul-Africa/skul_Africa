'use client';

import React from 'react';
import { MoreHorizontal, Printer, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

type StudentSummary = {
  id: number;
  name: string;
  profileImage?: string;
  className?: string;
  totalPaid?: number;
  totalDue?: number;
};

export default function StudentFinanceRow({
  student,
  darkMode,
}: {
  student: StudentSummary;
  darkMode: boolean;
}) {
  const router = useRouter();

  const handleViewRecord = () => {
    // Save the selected student locally (offline ready)
    localStorage.setItem('selected_student', JSON.stringify(student));

    // Navigate to student finance details page
    router.push(`/dashboard/finance/student/${student.id}`);
  };

  return (
    <tr
      className={`border-b ${
        darkMode ? 'border-blue-800 hover:bg-blue-800/50' : 'border-gray-100 hover:bg-gray-50'
      } transition-colors`}
    >
      <td className="py-3 flex items-center gap-3">
        <img
          src={student.profileImage || '/default image.png'}
          onError={(e) => (e.currentTarget.src = '/default image.png')}
          alt={student.name}
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300"
        />
        <div>
          <div
            className={`font-medium text-sm truncate ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {student.name}
          </div>
          <div
            className={`text-xs truncate ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {student.className || '—'}
          </div>
        </div>
      </td>

      <td
        className={`py-3 font-semibold ${
          darkMode ? 'text-emerald-400' : 'text-green-600'
        }`}
      >
        ₦{(student.totalPaid || 0).toLocaleString()}
      </td>

      <td
        className={`py-3 font-semibold ${
          darkMode ? 'text-rose-400' : 'text-red-500'
        }`}
      >
        ₦{(student.totalDue || 0).toLocaleString()}
      </td>

      <td className="py-3 text-right">
        <div className="flex justify-end gap-2">
          {/* Add Record */}
          <button
            title="View student finance record"
            onClick={handleViewRecord}
            className={`p-2 rounded-full transition font-medium ${
              darkMode
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-400'
                : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
            }`}
          >
            <Plus size={14} />
          </button>

          {/* Print */}
          <button
            className={`p-2 rounded-md transition ${
              darkMode
                ? 'bg-blue-800 text-gray-100 hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Print record"
          >
            <Printer size={16} />
          </button>

          {/* More */}
          <button
            className={`p-2 rounded-md transition ${
              darkMode
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            title="More"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
