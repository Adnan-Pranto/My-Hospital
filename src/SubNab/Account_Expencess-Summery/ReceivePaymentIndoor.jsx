import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReceivePaymentIndoor() {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [allAccounts, setAllAccounts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Load Data
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("receivePaymentIndoor")) || [];
        
        if (stored.length === 0) {
            const defaultData = [{ id: 1, narration: "Indoor Patient Bill Collection", credit: 0, debit: 0, date: "2026-01-06" }];
            localStorage.setItem("receivePaymentIndoor", JSON.stringify(defaultData));
            setAllAccounts(defaultData);
        } else {
            setAllAccounts(stored);
        }
    }, []);

    // Handle Show Button - Aggregate All Bills into ONE Row
    const handleShow = () => {
        if (!startDate || !endDate) {
            alert("Please select both Start and End Date");
            return;
        }

        setHasSearched(true);

        const start = new Date(startDate);
        const end = new Date(endDate);

        const filtered = allAccounts.filter(item => {
            if (!item.date) return true;
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end;
        });

        // === AGGREGATE ALL PATIENT BILLS INTO ONE ROW ===
        const totalCredit = filtered.reduce((sum, item) => sum + Number(item.credit || 0), 0);
        const totalDebit = filtered.reduce((sum, item) => sum + Number(item.debit || 0), 0);

        const aggregatedData = [{
            id: 1,
            narration: "Indoor Patient Bill Collection",
            credit: totalCredit,
            debit: totalDebit,
        }];

        setFilteredData(aggregatedData);
    };

    const totalCredit = useMemo(() => filteredData[0]?.credit || 0, [filteredData]);
    const totalDebit = useMemo(() => filteredData[0]?.debit || 0, [filteredData]);
    const closingBalance = totalCredit - totalDebit;

    const handlePrint = () => {
        if (!hasSearched) {
            alert("Please click 'Show' first");
            return;
        }
        window.print();
    };

    const rowColors = [
        "bg-blue-50", "bg-emerald-50", "bg-violet-50", "bg-amber-50",
        "bg-rose-50", "bg-cyan-50", "bg-purple-50"
    ];

    return (
        <>
            <section className="min-h-screen bg-slate-100 py-6 px-4">
                <div className="w-[95%] max-w-[1200px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5">
                        <h1 className="text-3xl font-bold text-center">
                            Receive And Payment Book For Indoor
                        </h1>
                    </div>

                    {/* Filter */}
                    <div className="p-6 border-b bg-gray-50">
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[220px]">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date Of Start</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="flex-1 min-w-[220px]">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date Of End</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleShow}
                                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center gap-2 transition-all"
                                >
                                    🔍 Show
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center gap-2 transition-all"
                                >
                                    🖨️ Print
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg-slate-700 hover:bg-slate-800 cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center gap-2 transition-all"
                                >
                                    ← Go Back
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Table Area - Fixed Height */}
                    <div className="p-6" style={{ height: "55vh", minHeight: "400px" }}>
                        <div className="overflow-auto h-full border border-gray-300 rounded-xl">
                            <table className="w-full border-collapse min-w-full" id="printTable">
                                <thead className="sticky top-0 bg-black text-white z-10">
                                    <tr>
                                        <th className="border border-gray-400 p-4 text-left w-20">SL No.</th>
                                        <th className="border border-gray-400 p-4 text-left">Particular</th>
                                        <th className="border border-gray-400 p-4 text-right">Credit (Tk.)</th>
                                        <th className="border border-gray-400 p-4 text-right">Debit (Tk.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hasSearched ? (
                                        filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr key={index} className={`${rowColors[index % 7]} hover:bg-gray-100`}>
                                                    <td className="border border-gray-300 p-4 text-center font-semibold">1</td>
                                                    <td className="border border-gray-300 p-4 font-medium">
                                                        Indoor Patient Bill Collection
                                                    </td>
                                                    <td className="border border-gray-300 p-4 text-right font-bold text-emerald-700 text-lg">
                                                        {Number(item.credit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="border border-gray-300 p-4 text-right font-bold text-red-700 text-lg">
                                                        {Number(item.debit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-20 text-gray-500 text-lg">
                                                    No Data Found
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-20 text-gray-400">
                                                Select date range and click <strong>Show</strong>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="bg-gray-50 p-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-center shadow">
                            <p className="text-gray-600 font-semibold">Total Credit</p>
                            <p className="text-4xl font-bold text-emerald-700 mt-3">
                                ৳ {totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="bg-white border border-red-200 rounded-2xl p-6 text-center shadow">
                            <p className="text-gray-600 font-semibold">Total Debit</p>
                            <p className="text-4xl font-bold text-red-700 mt-3">
                                ৳ {totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="bg-white border border-blue-200 rounded-2xl p-6 text-center shadow">
                            <p className="text-gray-600 font-semibold">Closing Balance</p>
                            <p className={`text-4xl font-bold mt-3 ${closingBalance >= 0 ? 'text-blue-700' : 'text-red-600'}`}>
                                ৳ {closingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Print Styles */}
            <style jsx>{`
                @media print {
                    body * { visibility: hidden; }
                    #printTable, #printTable * { visibility: visible; }
                    .w-\\[95\\%\\] { width: 100% !important; margin: 0 !important; }
                    @page { 
                        size: A4 portrait; 
                        margin: 10mm; 
                    }
                    thead { background-color: black !important; color: white !important; }
                    th, td { padding: 12px !important; }
                }
            `}</style>
        </>
    );
}