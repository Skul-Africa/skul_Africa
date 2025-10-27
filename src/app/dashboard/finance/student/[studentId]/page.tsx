'use client';

import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X, Printer, DollarSign, CheckCircle, AlertTriangle, RefreshCw, Sun, Moon } from 'lucide-react';

type TermOption = 'FIRST_TERM' | 'SECOND_TERM' | 'THIRD_TERM';

type PaymentRecord = {
  id?: number;
  amountPaid: number;
  paymentDate: string;
  term: string;
  note?: string;
  createdAt?: string;
  pending?: boolean;
};

type Student = {
  id: number;
  fullName?: string;
  profilePicture?: string | null;
  className?: string | null;
  totalDue?: number;
  totalPaid?: number;
};

const API_BASE = 'https://skul-africa.onrender.com';

export default function StudentFinanceDetails() {
  const [term, setTerm] = useState<TermOption>('FIRST_TERM');
  const [blueMode, setBlueMode] = useState<boolean>(false);

  const params = useParams() as { studentId?: string } | undefined;
  const searchParams = useSearchParams();
  const router = useRouter();

  const studentId = params?.studentId || searchParams?.get('studentId') || '';
  const [showDueModal, setShowDueModal] = useState(false);
  const [totalDueInput, setTotalDueInput] = useState<number | ''>('');
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const [student, setStudent] = useState<Student | null>(null);
  const [records, setRecords] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Controlled form state
  const [amountPaid, setAmountPaid] = useState<number | ''>('');
  const [note, setNote] = useState('');
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().slice(0, 10));

  const totalPaid = useMemo(() => records.reduce((s, r) => s + (Number(r.amountPaid) || 0), 0), [records]);
  const totalDue = student?.totalDue ?? 0;
  const balance = totalDue - totalPaid;

  const recordsCacheKey = `student_records_${studentId}_${term}`;
  const pendingQueueKey = `pending_payments_${studentId}_${term}`;
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  const formatCurrency = (n: number) => '₦' + n.toLocaleString();
  const formatDisplayDate = (iso: string) => new Date(iso).toLocaleDateString();

  // Load blueMode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blue_mode');
    if (saved) setBlueMode(saved === 'true');
  }, []);

  const toggleBlueMode = () => {
    setBlueMode((prev) => {
      localStorage.setItem('blue_mode', String(!prev));
      return !prev;
    });
  };

  async function fetchStudent() {
    if (!studentId) return;
    const defaultImage = '/default image.png';

    try {
      const selected = localStorage.getItem('selected_student');
      if (selected) {
        const parsed = JSON.parse(selected);
        if (parsed && Number(parsed.id) === Number(studentId)) {
          setStudent({
            id: parsed.id,
            fullName: parsed.name || parsed.fullName || 'Unnamed',
            profilePicture: parsed.profileImage?.trim() || defaultImage,
            className: parsed.className || null,
            totalDue: parsed.totalDue ?? 0,
          });
        }
      }

      const token = localStorage.getItem('school_token');
      const res = await fetch(`${API_BASE}/api/v1/student/${studentId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) return;

      const data = await res.json();
      const resolved = Array.isArray(data) ? data[0] : data;

      const mapped: Student = {
        id: resolved.id,
        fullName:
          resolved.fullName ||
          resolved.name ||
          `${resolved.firstName || ''} ${resolved.lastName || ''}`.trim(),
        profilePicture: resolved.profilePicture?.trim() || resolved.profileImage?.trim() || defaultImage,
        className: resolved.classroom?.name ?? resolved.className ?? null,
        totalDue: resolved.totalDue ?? 0,
      };
      setStudent(mapped);
      localStorage.setItem(`student_${studentId}`, JSON.stringify(mapped));
    } catch (err) {
      console.warn('fetchStudent error', err);
    }
  }
  window.addEventListener('online', async () => {
    const pending = JSON.parse(localStorage.getItem('pending_dues') || '[]');
    if (pending.length === 0) return;

    const token = localStorage.getItem('school_token');
    if (!token) return;

    for (const item of pending) {
      try {
        await fetch(item.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item.payload),
        });
      } catch (e) {
        console.warn('Retry failed for', item);
      }
    }

    localStorage.removeItem('pending_dues');
    console.log('✅ Pending dues synced successfully.');
  });


  async function handleSetTotalDue(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId || totalDueInput === '') return alert('Enter amount');

    const token = localStorage.getItem('school_token');
    if (!token) return alert('Login required.');

    const payload = {
      totalDue: Number(totalDueInput),
      term,
    };

    const url = `${API_BASE}/api/v1/students/${studentId}/finance/set-total-due`;

    try {
      // ✅ If offline, save to localStorage for later sync
      if (!navigator.onLine) {
        const pending = JSON.parse(localStorage.getItem('pending_dues') || '[]');
        pending.push({ url, payload, studentId, timestamp: Date.now() });
        localStorage.setItem('pending_dues', JSON.stringify(pending));

        alert('You are offline. Change saved locally and will sync later.');
        return;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.warn('Backend responded with error', data);
        throw new Error(`Failed (${res.status})`);
      }

      // ✅ Update UI
      setStudent((prev) =>
        prev ? { ...prev, totalDue: data?.totalDue ?? payload.totalDue } : prev
      );

      setShowDueModal(false);
      setTotalDueInput('');
      fetchRecords(true);
    } catch (err) {
      console.warn('Failed to set total due', err);
      alert('Failed to update total due (saved locally for retry)');

      // ✅ Save failed request for retry
      const pending = JSON.parse(localStorage.getItem('pending_dues') || '[]');
      pending.push({ url, payload, studentId, timestamp: Date.now() });
      localStorage.setItem('pending_dues', JSON.stringify(pending));
    }
  }


  async function fetchRecords(force = false) {
    if (!studentId) return;
    setLoading(true);
    setError(null);

    try {
      if (!force) {
        const cached = localStorage.getItem(recordsCacheKey);
        if (cached) setRecords(JSON.parse(cached));
      }

      const token = localStorage.getItem('school_token');
      const res = await fetch(
        `${API_BASE}/api/v1/students/${studentId}/finance?term=${term}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();
      const arr: any[] = Array.isArray(data) ? data : data.records || [];

      const normalized = arr.map((r) => ({
        id: r.id,
        amountPaid: Number(r.amountPaid),
        paymentDate: r.paymentDate,
        term: r.term,
        note: r.note,
      }));

      const pendingRaw = localStorage.getItem(pendingQueueKey);
      const pending: PaymentRecord[] = pendingRaw ? JSON.parse(pendingRaw) : [];
      setRecords([...normalized, ...pending.map((p) => ({ ...p, pending: true }))]);
      localStorage.setItem(recordsCacheKey, JSON.stringify(normalized));
    } catch (err) {
      console.warn('fetchRecords error', err);
      setError('Offline or failed to fetch — showing cached data.');
      const cached = localStorage.getItem(recordsCacheKey);
      if (cached) setRecords(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!amountPaid || !studentId) return alert('Please enter amount.');

    const token = localStorage.getItem('school_token');
    if (!token) return alert('Login required.');

    const payload = {
      amountPaid: Number(amountPaid),
      paymentDate: paymentDate || new Date().toISOString().split('T')[0],
      term,
      note,
    };

    try {
      const res = await fetch(
        `${API_BASE}/api/v1/students/${studentId}/finance/record`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const saved = await res.json();
      setRecords((prev) => [saved, ...prev]);
      localStorage.setItem(recordsCacheKey, JSON.stringify([saved, ...records]));

      setAmountPaid('');
      setNote('');
      setShowAddModal(false);
      fetchRecords(true);
    } catch (err) {
      console.warn('handleAddPayment error', err);
      alert('Failed to save payment');
    }
  }

  useEffect(() => {
    if (studentId) {
      fetchStudent();
      fetchRecords();
    }
  }, [studentId, term]);

  useEffect(() => {
    const pendingRaw = localStorage.getItem(pendingQueueKey);
    if (!pendingRaw) return;
    const pending: PaymentRecord[] = JSON.parse(pendingRaw);
    if (pending.length === 0) return;

    const syncPending = async () => {
      setSyncing(true);
      setSyncError(false);
      const token = localStorage.getItem('school_token');
      if (!token) return;

      try {
        for (const record of pending) {
          await fetch(`${API_BASE}/api/v1/students/${studentId}/finance/record`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(record),
          });
        }
        localStorage.removeItem(pendingQueueKey);
        await fetchRecords(true);
      } catch (err) {
        console.warn('Sync failed', err);
        setSyncError(true);
      } finally {
        setSyncing(false);
      }
    };

    if (isOnline) syncPending();
  }, [isOnline, studentId, term]);

  const goBack = () => router.back();

  // Tailwind class helpers
  const bg = blueMode ? 'bg-blue-950 text-gray-100' : 'bg-gray-50 text-gray-900';
  const cardBg = blueMode ? 'bg-blue-900' : 'bg-white';
  const hoverBg = blueMode ? 'hover:bg-blue-800/40' : 'hover:bg-gray-50';
  const btnPrimary = blueMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700';
  const btnSecondary = blueMode ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700';
  const inputBg = blueMode ? 'bg-blue-900 border-blue-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800';

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${bg}`}>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className={`p-2 rounded-md ${btnSecondary} shadow`}
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={student?.profilePicture || '/default image.png'}
                onError={(e) => (e.currentTarget.src = '/default image.png')}
                alt={student?.fullName || 'Student'}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div>
                <div className="text-lg font-semibold">{student?.fullName || 'Student'}</div>
                <div className="text-xs text-gray-400">
                  {student?.className ? student.className + ' • ' : ''}{term.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* Top Right Controls */}
          <div className="flex flex-wrap gap-2 items-center justify-end mt-2 sm:mt-0">
            <button onClick={toggleBlueMode} className={`p-2 rounded-md ${btnSecondary}`}>
              {blueMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Payment History & Term */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-semibold">Payment History</h3>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value as TermOption)}
            className={`text-xs border rounded-md px-2 py-1 ${inputBg}`}
          >
            <option value="FIRST_TERM">First Term</option>
            <option value="SECOND_TERM">Second Term</option>
            <option value="THIRD_TERM">Third Term</option>
          </select>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-xl ${cardBg} shadow`}>
            <div className="text-xs text-gray-400">Total Due</div>
            <div className="text-lg font-semibold">{formatCurrency(totalDue)}</div>
          </div>
          <div className={`p-4 rounded-xl ${cardBg} shadow`}>
            <div className="text-xs text-gray-400">Total Paid</div>
            <div className="text-lg font-semibold text-emerald-400">{formatCurrency(totalPaid)}</div>
          </div>
          <div className={`p-4 rounded-xl ${cardBg} shadow`}>
            <div className="text-xs text-gray-400">Balance</div>
            <div className={`text-lg font-semibold ${balance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {formatCurrency(balance)}
            </div>
          </div>
        </div>

        {/* History List */}
        <div className={`rounded-xl ${cardBg} p-3 sm:p-4 shadow`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400">{records.length} records</span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm">Loading...</div>
          ) : records.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">No payments yet</div>
          ) : (
            <div className="space-y-2">
              {records.map((r, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-md ${hoverBg}`}
                >
                  <div>
                    <div className="font-medium">
                      {formatCurrency(r.amountPaid)}
                      {r.pending && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-600 text-white">Pending</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{r.note || '—'}</div>
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-1 sm:mt-0">
                    <div>{formatDisplayDate(r.paymentDate)}</div>
                    <div>{r.term}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {syncing ? (
            <RefreshCw className="animate-spin text-blue-500" size={18} />
          ) : syncError ? (
            <AlertTriangle className="text-yellow-500" size={18} />
          ) : (
            <CheckCircle className="text-emerald-500" size={18} />
          )}

          <button
            onClick={() => setShowDueModal(true)}
            className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm ${btnPrimary}`}
          >
            <DollarSign size={14} /> Set Total Due
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium ${btnPrimary}`}
          >
            <Plus size={14} /> Add Payment
          </button>

          <button
            onClick={() => window.print()}
            className={`p-2 rounded-md ${btnSecondary} shadow`}
          >
            <Printer size={16} />
          </button>
        </div>

        {/* Add Payment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddModal(false)} />
            <form
              onSubmit={handleAddPayment}
              className={`relative w-full max-w-md rounded-lg p-4 ${cardBg} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Add Payment</h4>
                <button type="button" onClick={() => setShowAddModal(false)} className="p-1 rounded-md">
                  <X size={18} />
                </button>
              </div>

              <label className="block text-xs mb-1">Amount</label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) =>
                  setAmountPaid(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full mb-3 rounded-md p-2 border focus:outline-none"
                placeholder="Amount (e.g. 2000)"
                required
              />

              <label className="block text-xs mb-1">Term</label>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value as TermOption)}
                className={`w-full mb-3 p-2 rounded-md border ${inputBg}`}
              >
                <option value="FIRST_TERM">First Term</option>
                <option value="SECOND_TERM">Second Term</option>
                <option value="THIRD_TERM">Third Term</option>
              </select>

              <label className="block text-xs mb-1">Note (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full mb-3 rounded-md p-2 border focus:outline-none"
                placeholder="Optional note"
                rows={3}
              />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className={`px-3 py-2 rounded-md ${btnSecondary}`}>
                  Cancel
                </button>
                <button type="submit" className={`px-4 py-2 rounded-md text-white ${btnPrimary}`}>
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Set Total Due Modal */}
        {showDueModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowDueModal(false)} />
            <form
              onSubmit={async (e) => {
                await handleSetTotalDue(e);
                await fetchStudent();
              }}
              className={`relative w-full max-w-md rounded-lg p-4 ${cardBg} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Set Total Due</h4>
                <button type="button" onClick={() => setShowDueModal(false)} className="p-1 rounded-md">
                  <X size={18} />
                </button>
              </div>

              <label className="block text-xs mb-1">Amount (₦)</label>
              <input
                type="number"
                value={totalDueInput}
                onChange={(e) =>
                  setTotalDueInput(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full mb-4 rounded-md p-2 border focus:outline-none"
                placeholder="Enter total due"
                required
              />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowDueModal(false)} className={`px-3 py-2 rounded-md ${btnSecondary}`}>
                  Cancel
                </button>
                <button type="submit" className={`px-4 py-2 rounded-md text-white ${btnPrimary}`}>
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
