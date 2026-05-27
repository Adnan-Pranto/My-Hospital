import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const TestAccount = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [payable, setPayable] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const savedPayable = localStorage.getItem('payable') || 0;
    setPayable(parseFloat(savedPayable));

    // Sample transactions (you can replace with real data)
    const sampleTransactions = [
      { id: 1, date: '2026-05-01', narration: 'Patient Bill - Mr. Rahim', credit: 4500, debit: 0 },
      { id: 2, date: '2026-05-02', narration: 'Cash Received from Patient', credit: 0, debit: 2000 },
      { id: 3, date: '2026-05-03', narration: 'Medicine Supply Payment', credit: 0, debit: 1200 },
      { id: 4, date: '2026-05-05', narration: 'Patient Bill - Mrs. Fatima', credit: 7800, debit: 0 },
      { id: 5, date: '2026-05-07', narration: 'Doctor Fee Payment', credit: 0, debit: 3500 },
      { id: 6, date: '2026-05-10', narration: 'Patient Bill - Mr. Karim', credit: 3200, debit: 0 },
    ];
    setTransactions(sampleTransactions);
  }, []);

  // Function to add payable (called from patient billing)
  const addPayable = (amount) => {
    const newPayable = payable + parseFloat(amount);
    setPayable(newPayable);
    localStorage.setItem('payable', newPayable);
  };

  // Filter transactions based on date range
  const filteredTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    const sDate = startDate ? new Date(startDate) : null;
    const eDate = endDate ? new Date(endDate) : null;
    
    if (sDate && tDate < sDate) return false;
    if (eDate && tDate > eDate) return false;
    return true;
  });

  const totalCredit = filteredTransactions.reduce((sum, t) => sum + (t.credit || 0), 0) + payable;
  const totalDebit = filteredTransactions.reduce((sum, t) => sum + (t.debit || 0), 0);
  const closingBalance = totalCredit - totalDebit;

  const handleShow = () => {
    // Just re-filter (already reactive)
  };

  const handlePrint = () => {
    window.print();
  };

  // Row colors - repeating every 6 rows
  const getRowColor = (index) => {
    const colors = [
      'bg-blue-50',
      'bg-emerald-50',
      'bg-violet-50',
      'bg-amber-50',
      'bg-rose-50',
      'bg-cyan-50'
    ];
    return colors[index % 6];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden" style={{ height: '100vh', maxHeight: '100vh' }}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">
          <h1 className="text-3xl font-bold text-center">Receive & Payment Book for Indoor</h1>
          <p className="text-center mt-1 opacity-90">Hospital Accounts Management</p>
        </div>

        {/* Date Filter */}
        <div className="p-6 border-b bg-white flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleShow}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-medium transition-all active:scale-95"
          >
            Show / Preview
          </button>
        </div>

        {/* Payable Box */}
        <div className="px-6 pt-4 pb-2">
          <div className="box inline-block bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-md">
            <p className="text-sm opacity-90 mb-1">Payable (Credit)</p>
            <h3 className="text-3xl font-bold">৳ {payable.toLocaleString('en-BD')}</h3>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 overflow-auto" style={{ height: 'calc(100vh - 380px)' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white sticky top-0">
                <th className="py-4 px-6 text-left font-semibold w-12">SL No.</th>
                <th className="py-4 px-6 text-left font-semibold">Narration</th>
                <th className="py-4 px-6 text-right font-semibold">Credit (Taka)</th>
                <th className="py-4 px-6 text-right font-semibold">Debit (Taka)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, index) => (
                  <tr key={t.id} className={`${getRowColor(index)} border-b hover:bg-gray-100 transition-colors`}>
                    <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>
                    <td className="py-4 px-6 text-gray-700">{t.narration}</td>
                    <td className="py-4 px-6 text-right font-medium text-emerald-600">
                      {t.credit > 0 ? `৳ ${t.credit.toLocaleString('en-BD')}` : ''}
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-red-600">
                      {t.debit > 0 ? `৳ ${t.debit.toLocaleString('en-BD')}` : ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-gray-400">
                    No transactions found in selected date range
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 border-t p-6 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Total Credit</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">৳ {totalCredit.toLocaleString('en-BD')}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Total Debit</p>
              <p className="text-2xl font-bold text-red-600 mt-1">৳ {totalDebit.toLocaleString('en-BD')}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow text-center border-2 border-indigo-500">
              <p className="text-sm text-gray-500">Closing Balance</p>
              <p className={`text-2xl font-bold mt-1 ${closingBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ৳ {closingBalance.toLocaleString('en-BD')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <button
            onClick={handlePrint}
            className="bg-black hover:bg-gray-800 text-white px-10 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            🖨️ Print
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-200 hover:bg-gray-300 px-10 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestAccount;