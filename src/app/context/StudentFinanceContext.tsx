'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

type Summary = {
  totalPaid: number;
  totalDue: number;
};

type ContextType = {
  summaries: Record<number, Summary>;
  setSummary: (studentId: number, summary: Summary) => void;
};


const StudentFinanceContext = createContext<ContextType | null>(null);

export const StudentFinanceProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const saved = localStorage.getItem('student_summaries');
    if (saved) setSummaries(JSON.parse(saved));
  }, []);

  const [summaries, setSummaries] = useState<Record<number, Summary>>({});

  const setSummary = (studentId: number, summary: Summary) => {
    setSummaries((prev) => ({ ...prev, [studentId]: summary }));
    localStorage.setItem('student_summaries', JSON.stringify({ ...summaries, [studentId]: summary }));
  };

  return (
    <StudentFinanceContext.Provider value={{ summaries, setSummary }}>
      {children}
    </StudentFinanceContext.Provider>
  );
};

export const useStudentFinance = () => {
  const ctx = useContext(StudentFinanceContext);
  if (!ctx) throw new Error('useStudentFinance must be used within StudentFinanceProvider');
  return ctx;
};
