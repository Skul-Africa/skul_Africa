'use client';

import React, { useEffect, useState } from 'react';
import { Search, Printer, RefreshCw } from 'lucide-react';
import StudentFinanceRow from './ StudentFinanceRow';
import { useStudentFinance } from '@/app/context/StudentFinanceContext';


type TermOption = 'FIRST_TERM' | 'SECOND_TERM' | 'THIRD_TERM' | '';

type StudentSummary = {
  id: number;
  name: string;
  profileImage?: string;
  className?: string;
  totalPaid?: number;
  totalDue?: number;
};

export default function StudentFinanceTable({ darkMode }: { darkMode: boolean }) {
  const [term, setTerm] = useState<TermOption>('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [classroomMap, setClassroomMap] = useState<Record<number, string>>({});

  const { summaries, setSummary } = useStudentFinance();

  const API_BASE = 'https://skul-africa.onrender.com';
  const getAuthToken = () => localStorage.getItem('school_token');

  // ✅ Fetch classrooms (with offline cache)
  async function fetchClassrooms() {
    try {
      const cached = localStorage.getItem('cached_classrooms');
      if (cached) setClassroomMap(JSON.parse(cached));

      const token = getAuthToken();
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/v1/classroom`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      if (Array.isArray(data)) {
        const map: Record<number, string> = {};
        data.forEach((c: any) => (map[c.id] = c.name));
        setClassroomMap(map);
        localStorage.setItem('cached_classrooms', JSON.stringify(map));
      }
    } catch {
      console.warn('⚠️ Failed to fetch classrooms — offline mode');
    }
  }

  // ✅ Fetch all students
  async function fetchStudents(force = false) {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) throw new Error('No token found');

      // 1️⃣ Fetch student list
      const res = await fetch(
        `${API_BASE}/api/v1/student?page=${page}&limit=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();

      const studentList = Array.isArray(data)
        ? data
        : data.students || data.data?.students || [];

      // 2️⃣ Fetch finance summaries for each student
      const updatedStudents = await Promise.all(
        studentList.map(async (s: any) => {
          let totalPaid = 0;
          let totalDue = 0;

          try {
            const financeRes = await fetch(
              `${API_BASE}/api/v1/finance/student/${s.id}/summary`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (financeRes.ok) {
              const financeData = await financeRes.json();
              totalPaid = financeData.totalPaid ?? 0;
              totalDue = financeData.totalDue ?? 0;

              // ✅ Store it in context
              setSummary(s.id, { totalPaid, totalDue });
            }
          } catch (err) {
            console.warn(`⚠️ Failed to fetch finance for student ${s.id}`);
          }

          return {
            id: s.id,
            name: s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim(),
            profileImage: s.profilePicture || '/images/baby-astronaut.png',
            className:
              s.classroom?.name ||
              classroomMap[s.classroomId] ||
              s.pendingClassName ||
              '—',
            totalPaid,
            totalDue,
          };
        })
      );

      setStudents(updatedStudents);
      setTotal(updatedStudents.length);
    } catch (err: any) {
      console.error('⚠️ Fetch failed:', err.message);
      setError('Offline mode or fetch error — showing cached data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClassrooms();
    fetchStudents(true);
  }, [page, term]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div
      className={`rounded-xl shadow ${darkMode ? 'bg-blue-900 text-gray-100' : 'bg-white text-gray-800'
        }`}
    >
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-base sm:text-lg">Student Finance</h3>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${darkMode ? 'bg-blue-800' : 'bg-gray-100'
              }`}
          >
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPage(1);
                  fetchStudents(true);
                }
              }}
              placeholder="Search students..."
              className={`bg-transparent focus:outline-none w-32 sm:w-44 ${darkMode ? 'placeholder-gray-300' : 'placeholder-gray-500'
                }`}
            />
          </div>

          {/* Term Filter */}
          {[
            { label: 'First', value: 'FIRST_TERM' },
            { label: 'Second', value: 'SECOND_TERM' },
            { label: 'Third', value: 'THIRD_TERM' },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                setTerm(value as TermOption);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm transition ${term === value
                ? 'bg-indigo-600 text-white'
                : darkMode
                  ? 'bg-blue-800 text-gray-200'
                  : 'bg-gray-100 text-gray-700'
                }`}
            >
              {label} Term
            </button>
          ))}

          <button
            onClick={() => {
              setTerm('');
              setPage(1);
            }}
            className="px-3 py-1 rounded-md text-xs sm:text-sm bg-gray-200"
          >
            Clear
          </button>

          {/* Refresh + Print */}
          <button
            onClick={() => fetchStudents(true)}
            title="Refresh list"
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <RefreshCw size={16} />
          </button>

          <button className="p-2 rounded-md bg-gray-100" title="Print list">
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-3 sm:p-4 overflow-x-auto">
        {loading ? (
          <div className="text-center py-20">
            Loading {term ? `${term.replace('_', ' ').toLowerCase()}` : 'students'}...
          </div>
        ) : error ? (
          <div className="text-center text-amber-500 py-8">{error}</div>
        ) : students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No records found {term ? `for ${term.toLowerCase()}` : ''}.
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="py-2">Student</th>
                <th className="py-2">Paid</th>
                <th className="py-2">Due</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
                .map((s) => (
                  <StudentFinanceRow key={s.id} student={s} darkMode={darkMode} />
                ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {students.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-xs sm:text-sm">
            <div className="text-gray-400 mb-2 sm:mb-0">
              Showing {students.length} of {total} students{' '}
              {term && `(${term.replace('_', ' ').toLowerCase()})`}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border"
              >
                Prev
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
