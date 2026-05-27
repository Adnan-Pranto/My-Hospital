import React, { useState, useEffect } from "react";
import Client from "../../../Clients/Client";

const TotalDateWise = () => {
    const [startDate, setStartDate] = useState("2025-07-27");
    const [endDate, setEndDate] = useState("2026-05-23");
    const [allExpenses, setAllExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("expensesPaid");
        if (saved) {
            const parsed = JSON.parse(saved);
            setAllExpenses(parsed);
            setFilteredExpenses(parsed);
        }
    }, []);

    // Auto show Today's data
    useEffect(() => {
        if (allExpenses.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            setStartDate(today);
            setEndDate(today);

            const filtered = allExpenses.filter(exp => {
                const expDate = new Date(exp.date);
                const sDate = new Date(today);
                const eDate = new Date(today);
                return expDate >= sDate && expDate <= eDate;
            });

            const grouped = filtered.reduce((acc, exp) => {
                const dateKey = exp.displayDate || exp.date;
                if (!acc[dateKey]) {
                    acc[dateKey] = { date: dateKey, amount: 0 };
                }
                acc[dateKey].amount += Number(exp.amount || 0);
                return acc;
            }, {});

            const groupedArray = Object.values(grouped).sort((a, b) =>
                new Date(a.date) - new Date(b.date)
            );

            setFilteredExpenses(groupedArray);
        }
    }, [allExpenses]);

    const handleShow = () => {
        let filtered = allExpenses.filter(exp => {
            const expDate = new Date(exp.date);
            const sDate = new Date(startDate);
            const eDate = new Date(endDate);
            return expDate >= sDate && expDate <= eDate;
        });

        const grouped = filtered.reduce((acc, exp) => {
            const dateKey = exp.displayDate || exp.date;
            if (!acc[dateKey]) {
                acc[dateKey] = { date: dateKey, amount: 0 };
            }
            acc[dateKey].amount += Number(exp.amount || 0);
            return acc;
        }, {});

        const groupedArray = Object.values(grouped).sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

        setFilteredExpenses(groupedArray);
    };

    const totalAmount = filteredExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const handlePrint = () => {
        window.print();
    };

    // 8 Different Soft Colors for Screen
    const getRowColor = (index) => {
        const colors = [
            'bg-white', 'bg-blue-50', 'bg-emerald-50', 'bg-amber-50',
            'bg-violet-50', 'bg-rose-50', 'bg-cyan-50', 'bg-orange-50'
        ];
        return colors[index % 8];
    };

    return (
        <>
            <div className="print:hidden">
             <Client/>
            </div>
            <div className="min-h-screen bg-slate-50 flex justify-center overflow-hidden w-full">

                {/* ==================== MAIN SCREEN UI ==================== */}
                <div className="w-full max-w-[1300px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 h-[95vh] flex flex-col print:hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-4 text-center">
                        <h1 className="text-3xl font-bold tracking-wide">Total Expenses Day Wise</h1>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 py-5 px-8">
                        <div className="grid grid-cols-8 gap-5 items-center">
                            <div className="col-span-3 flex items-center gap-3">
                                <span className="text-white font-semibold text-lg whitespace-nowrap">Start Date :</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-2xl border border-white/30 bg-white/95 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                                />
                            </div>

                            <div className="col-span-2">
                                <button
                                    onClick={handleShow}
                                    className="w-full bg-black text-blue-700 hover:bg-green-700 font-bold text-2xl py-3.5 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-3"
                                >
                                    🔍 Show
                                </button>
                            </div>

                            <div className="col-span-3 flex items-center gap-3">
                                <span className="text-white font-semibold text-lg whitespace-nowrap">End Date :</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-2xl border border-white/30 bg-white/95 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="flex-1 flex flex-col overflow-hidden p-2 bg-white">
                        <div className="flex-1 overflow-hidden border border-slate-200 rounded-2xl shadow-inner">
                            <div className="h-full overflow-auto">
                                <table className="w-full text-left min-w-[750px]">
                                    <thead className="sticky top-0 z-10 bg-gradient-to-r from-slate-700 to-blue-800 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-lg font-bold w-32 text-center">SL No.</th>
                                            <th className="px-5 py-4 text-lg font-bold">Date</th>
                                            <th className="px-5 py-4 text-lg font-bold text-right">Day Wise Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-gray-700">
                                        {filteredExpenses.length > 0 ? (
                                            filteredExpenses.map((exp, index) => (
                                                <tr key={index} className={`transition-all hover:bg-blue-100 ${getRowColor(index)}`}>
                                                    <td className="px-6 py-4 text-center font-semibold">{index + 1}</td>
                                                    <td className="px-5 py-4 font-medium">{exp.date}</td>
                                                    <td className="px-5 py-4 text-right font-bold text-emerald-700 text-lg">
                                                        {Number(exp.amount).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-20 text-red-700 text-xl font-semibold">
                                                    No Data Found.!!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-slate-800 to-blue-900 py-4 px-8">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">
                                <button onClick={() => window.history.back()} className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-2xl text-lg font-semibold transition-all cursor-pointer">
                                    ← Go Back
                                </button>
                            </div>
                            <div className="col-span-6 flex justify-center">
                                <div className="flex items-center gap-4 text-2xl font-bold text-white">
                                    <span>Total Cost :</span>
                                    <div className="bg-white text-blue-800 px-10 py-3 rounded-2xl font-mono text-3xl shadow-inner">
                                        {totalAmount.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <button onClick={handlePrint} className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-2xl text-lg font-semibold transition-all cursor-pointer">
                                    🖨️ Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ==================== PRINT VERSION (A4 Friendly) ==================== */}
                <div className="hidden print:block w-full max-w-[1000px] mx-auto p-4 bg-white">
                    {/* Hospital Header */}
                    <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Your Hospital Name</h1>
                        <p className="text-gray-600 mt-1">Address: Your Full Hospital Address, City, Country</p>
                        <p className="text-gray-600">Phone: +880 XXXXXXXXX | Email: info@yourhospital.com</p>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Total Expenses Day Wise</h2>
                        <div className="text-right">
                            <p><strong>Start Date:</strong> {startDate}</p>
                            <p><strong>End Date:</strong> {endDate}</p>
                        </div>
                    </div>

                    {/* Print Table */}
                    <table className="w-full border-collapse border border-gray-700">
                        <thead>
                            <tr className="bg-gray-800 text-red-700">
                                <th className="border border-black px-4 py-3 text-left">SL No.</th>
                                <th className="border border-black px-4 py-3 text-left">Date</th>
                                <th className="border border-black px-4 py-3 text-right">Day Wise Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((exp, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-black px-4 py-3 text-center">{index + 1}</td>
                                        <td className="border border-gray-800 px-4 py-3">{exp.date}</td>
                                        <td className="border border-gray-800 px-4 py-3 text-right font-bold">
                                            {Number(exp.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-10 text-red-600">No Data Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Print Total */}
                    <div className="mt-8 flex justify-end">
                        <div className="text-2xl font-bold border-t-2 border-gray-800 pt-4">
                            Total Cost : <span className="text-emerald-700">{totalAmount.toLocaleString()}</span>
                        </div>

                    </div>
                    <footer className="text-center text-sm text-gray-700 mt-10">

                        Generated on: {new Date().toLocaleString()}

                    </footer>

                </div>

            </div>

        </>
    );
};

export default TotalDateWise;