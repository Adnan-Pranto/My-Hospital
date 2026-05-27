import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import Client from "../../../Clients/Client";

const ExHeadAdd = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("expenseHeads");
        if (saved) {
            setExpenses(JSON.parse(saved));
        }
    }, []);

    const saveToLocalStorage = (updatedExpenses) => {
        localStorage.setItem("expenseHeads", JSON.stringify(updatedExpenses));
        setExpenses(updatedExpenses);
    };

    const handleAdd = () => {
        if (!newExpense.trim()) return;
        const newItem = { id: Date.now(), name: newExpense.trim() };
        saveToLocalStorage([...expenses, newItem]);
        setNewExpense("");
    };

    const handleEdit = () => {
        if (!selectedId || !newExpense.trim()) return;
        const updated = expenses.map(item =>
            item.id === selectedId ? { ...item, name: newExpense.trim() } : item
        );
        saveToLocalStorage(updated);
        setNewExpense("");
        setSelectedId(null);
    };

    const handleDelete = () => {
        if (!selectedId) return;
        const updated = expenses.filter(item => item.id !== selectedId);
        saveToLocalStorage(updated);
        setNewExpense("");
        setSelectedId(null);
    };

    const handleSelect = (item) => {
        setSelectedId(item.id);
        setNewExpense(item.name);
    };

    // 8 Different Professional Light Colors
    const rowColors = [
        "bg-white",
        "bg-blue-50",
        "bg-emerald-50",
        "bg-amber-50",
        "bg-purple-50",
        "bg-rose-50",
        "bg-cyan-50",
        "bg-indigo-50"
    ];

    return (
        <>
            <Client />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex  justify-center overflow-hidden">
                
                <div className="w-full max-w-[920px] h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200">
                    
                    {/* Top Banner - More Professional & Colorful */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-5 px-6 text-center shadow-md">
                        <h1 className="text-2xl font-bold tracking-wide">
                            Dream Hospital, Tangail
                        </h1>
                        <p className="text-blue-100 mt-1">Log in User: ABC</p>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col p-6 overflow-hidden">
                        
                        {/* Expense Name Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-3 text-2xl text-center">
                                Expenses Name
                            </label>
                            <input
                                type="text"
                                value={newExpense}
                                onChange={(e) => setNewExpense(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-xl px-6 py-5 text-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                                placeholder="Enter Expense Name"
                            />
                        </div>

                        {/* List of Expenses */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <h3 className="font-bold text-2xl mb-4 text-center text-gray-800">List of Expenses</h3>

                            <div className="border-2 border-gray-200 rounded-xl flex-1 overflow-hidden bg-white shadow-inner">
                                <div className="h-full overflow-y-auto">
                                    {expenses.length === 0 ? (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-xl py-20">
                                            No expenses added yet
                                        </div>
                                    ) : (
                                        <>
                                            {expenses.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSelect(item)}
                                                    className={`px-6 py-5 border-b cursor-pointer hover:bg-blue-100 transition-all text-xl flex items-center gap-5
                                                        ${selectedId === item.id ? 'bg-blue-100 font-medium' : rowColors[index % 8]}`}
                                                >
                                                    <span className="font-semibold text-gray-500 w-9">
                                                        {index + 1}.
                                                    </span>
                                                    <span className="flex-1">{item.name}</span>
                                                </div>
                                            ))}

                                            {/* Minimum 10 rows */}
                                            {Array.from({ length: Math.max(0, 10 - expenses.length) }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="px-6 py-5 border-b text-transparent select-none"
                                                >
                                                    -
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg transition"
                            >
                                <ArrowLeft size={24} />
                                Go Back
                            </button>

                            <button
                                onClick={handleAdd}
                                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
                            >
                                <Plus size={24} />
                                Add New
                            </button>

                            <button
                                onClick={handleEdit}
                                disabled={!selectedId}
                                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold text-lg transition"
                            >
                                <Edit2 size={24} />
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={!selectedId}
                                className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold text-lg transition"
                            >
                                <Trash2 size={24} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExHeadAdd;