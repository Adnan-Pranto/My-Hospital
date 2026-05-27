import React, { useState, useEffect } from "react";
import { ArrowLeft, Printer, Calendar, Search } from "lucide-react";

const DayWisePaid = () => {
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

    const handleShow = () => {
        const filtered = allExpenses.filter(exp => {
            const expDate = new Date(exp.date);
            const sDate = new Date(startDate);
            const eDate = new Date(endDate);
            return expDate >= sDate && expDate <= eDate;
        });
        setFilteredExpenses(filtered);
    };

    const totalAmount = filteredExpenses.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
    );

    const handlePrint = () => {
        window.print();
    };

    // 6 Different Soft Colors for Rows
    const rowColors = [
        "bg-white", "bg-blue-50", "bg-emerald-50", "bg-amber-50",
        "bg-purple-50", "bg-rose-50"
    ];

    return (
        <>
            {/* Screen Version */}
            <div className="min-h-[98vh] w-full bg-gray-50 flex items-center justify-center p-2 print:hidden">
                <div className="w-full max-w-[1280px] h-[98vh] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-7 px-8">
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Calendar size={32} />
                            Day Wise Expenses
                        </h1>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white border-b border-gray-200 px-8 py-5 grid grid-cols-5 items-center gap-5">
                        <div className="col-span-2 flex items-center gap-3">
                            <span className="font-medium text-lg">From</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-3 rounded-xl border w-full"
                            />
                        </div>

                        <div className="col-span-1 flex justify-center">
                            <button
                                onClick={handleShow}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl px-8 py-3 rounded-xl flex items-center gap-2 w-full justify-center cursor-pointer"
                            >
                                <Search size={22} />
                                Show
                            </button>
                        </div>

                        <div className="col-span-2 flex items-center gap-3">
                            <span className="font-medium text-lg">To</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-3 rounded-xl border w-full"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-gray-100 border-b">
                                <tr>
                                    <th className="px-6 py-4">SL No</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Expense Head</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.length > 0 ? (
                                    filteredExpenses.map((exp, index) => (
                                        <tr
                                            key={index}
                                            className={`${rowColors[index % 6]} hover:bg-blue-50 transition`}
                                        >
                                            <td className="px-6 py-3 font-bold">{index + 1}</td>
                                            <td className="px-6 py-3">{exp.displayDate || exp.date}</td>
                                            <td className="px-6 py-3 font-semibold">{exp.expenseName}</td>
                                            <td className="px-6 py-3 text-gray-600">
                                                {exp.description || "—"}
                                            </td>
                                            <td className="px-6 py-3 text-right font-bold text-emerald-600">
                                                {Number(exp.amount).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20 text-gray-400">
                                            No expenses found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-9 items-center border-t px-6 py-5 gap-4">
                        <div className="col-span-2">
                            <button
                                onClick={() => window.history.back()}
                                className="bg-gray-700 hover:bg-gray-900 text-white font-bold text-xl rounded-xl px-6 py-4 flex items-center gap-2 w-full justify-center cursor-pointer"
                            >
                                <ArrowLeft size={24} />
                                Go Back
                            </button>
                        </div>

                        <div className="col-span-5 flex items-center justify-center gap-4">
                            <span className="font-bold text-2xl">Total Cost :</span>
                            <div className="bg-emerald-50 text-emerald-700 px-8 py-4 rounded-2xl font-bold text-3xl border border-emerald-200">
                                ৳ {totalAmount.toLocaleString()}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button
                                onClick={handlePrint}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-xl px-6 py-4 flex items-center gap-2 w-full justify-center cursor-pointer"
                            >
                                <Printer size={24} />
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== PRINT VERSION (Same as TotalDateWise Style) ==================== */}
            <div className="hidden print:block w-full max-w-[1000px] mx-auto p-6 bg-white">
                {/* Hospital Header */}
                <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Dream Hospital, Tangail</h1>
                    <p className="text-gray-600 mt-2 text-lg">Address: Tangail, Bangladesh</p>
                    <p className="text-gray-600">Phone: +880 XXXXXXXXX | Email: info@dreamhospital.com</p>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <h2 className="text-3xl font-bold">Day Wise Expenses Report</h2>
                    <div className="text-right">
                        <p><strong>From:</strong> {startDate}</p>
                        <p><strong>To:</strong> {endDate}</p>
                    </div>
                </div>

                {/* Print Table */}
                <table className="w-full border-collapse border border-gray-700 mb-8">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border border-gray-600 px-5 py-4 text-left">SL No</th>
                            <th className="border border-gray-600 px-5 py-4 text-left">Date</th>
                            <th className="border border-gray-600 px-5 py-4 text-left">Expense Head</th>
                            <th className="border border-gray-600 px-5 py-4 text-left">Description</th>
                            <th className="border border-gray-600 px-5 py-4 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((exp, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-600 px-5 py-4 text-center font-medium">{index + 1}</td>
                                    <td className="border border-gray-600 px-5 py-4">{exp.displayDate || exp.date}</td>
                                    <td className="border border-gray-600 px-5 py-4 font-medium">{exp.expenseName}</td>
                                    <td className="border border-gray-600 px-5 py-4 text-gray-600">
                                        {exp.description || "—"}
                                    </td>
                                    <td className="border border-gray-600 px-5 py-4 text-right font-bold text-emerald-700">
                                        {Number(exp.amount).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-12 text-red-600 font-semibold">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Print Total */}
                <div className="flex justify-end">
                    <div className="text-3xl font-bold border-t-4 border-gray-800 pt-6">
                        Total Cost : <span className="text-emerald-700">৳ {totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                <footer className="text-center text-sm text-gray-600 mt-12">
                    Generated on: {new Date().toLocaleString()}
                </footer>
            </div>
        </>
    );
};

export default DayWisePaid;