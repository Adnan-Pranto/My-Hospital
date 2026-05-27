import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import { ToWords } from 'to-words';
import Client from "../../../Clients/Client";

const ExPaid = () => {
    const [allExpenses, setAllExpenses] = useState([]); 
    const [expenseHeads, setExpenseHeads] = useState([]);

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        expenseName: "Hospital",
        subExpense: "",
        description: "",
        amount: "",
        inWords: ""
    });
    const [selectedId, setSelectedId] = useState(null);

    // Initialize ToWords
    const toWords = new ToWords({
        localeCode: 'en-BD',
        converterOptions: {
            currency: true,
            ignoreDecimal: true,
        }
    });

    // Load Data
    useEffect(() => {
        const savedExpenses = localStorage.getItem("expensesPaid");
        if (savedExpenses) {
            setAllExpenses(JSON.parse(savedExpenses));
        }

        const savedHeads = localStorage.getItem("expenseHeads");
        if (savedHeads) {
            const heads = JSON.parse(savedHeads);
            setExpenseHeads(heads);
            if (heads.length > 0) {
                setFormData(prev => ({ ...prev, expenseName: heads[0].name }));
            }
        }
    }, []);

    // Filter expenses by selected date
    const filteredExpenses = allExpenses.filter(exp => 
        exp.date === formData.date
    );

    const saveToLocalStorage = (updated) => {
        localStorage.setItem("expensesPaid", JSON.stringify(updated));
        setAllExpenses(updated);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            
            if (name === "amount") {
                if (value && parseInt(value) > 0) {
                    try {
                        let words = toWords.convert(parseInt(value));
                        // Clean up and add "Taka Only"
                        words = words.replace("", "").trim();
                        updated.inWords = words ;
                    } catch (err) {
                        updated.inWords = "";
                    }
                } else {
                    updated.inWords = "";
                }
            }
            return updated;
        });
    };

    const handleSave = () => {
        if (!formData.amount || !formData.subExpense.trim()) {
            alert("Please fill Amount and Sub Expense Name");
            return;
        }

        const newExpense = {
            id: Date.now(),
            ...formData,
            displayDate: new Date(formData.date).toLocaleDateString('en-GB', {
                day: 'numeric', 
                month: 'short', 
                year: 'numeric'
            })
        };

        let updated;
        if (selectedId) {
            updated = allExpenses.map(item => item.id === selectedId ? newExpense : item);
            setSelectedId(null);
        } else {
            updated = [newExpense, ...allExpenses];
        }

        saveToLocalStorage(updated);
        handleNew();
    };

    const handleNew = () => {
        setFormData({
            date: new Date().toISOString().split('T')[0],
            expenseName: expenseHeads.length > 0 ? expenseHeads[0].name : "Hospital",
            subExpense: "",
            description: "",
            amount: "",
            inWords: ""
        });
        setSelectedId(null);
    };

    const handleSelect = (exp) => {
        setSelectedId(exp.id);
        setFormData({
            date: exp.date,
            expenseName: exp.expenseName,
            subExpense: exp.subExpense,
            description: exp.description,
            amount: exp.amount,
            inWords: exp.inWords
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
    };
console.log(formData)
    return (
        <>
            <Client/>
            <div className="h-screen bg-gray-100 overflow-hidden flex justify-center p-4">
                <div className="w-full h-full bg-white shadow-2xl overflow-hidden flex flex-col">

                    {/* Top Banner */}
                    <div className="bg-[#05738b] text-white py-4 px-8 text-center font-bold text-2xl">
                        Dream Hospital, Tangail - Log in User: ABC
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        
                        {/* Left Panel */}
                        <div className="w-[420px] border-r border-gray-300 flex flex-col">
                            <div className="bg-blue-600 text-white py-5 px-6 text-center font-bold text-2xl">
                                Expenses of {new Date(formData.date).toLocaleDateString('en-GB', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric' 
                                })}
                            </div>
                            
                            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                                {filteredExpenses.length === 0 ? (
                                    <p className="text-center text-gray-500 py-20 text-xl">
                                        No expenses found on this date
                                    </p>
                                ) : (
                                    filteredExpenses.map((exp, index) => (
                                        <div
                                            key={exp.id}
                                            onClick={() => handleSelect(exp)}
                                            className={`px-6 py-5 mb-3 rounded-xl cursor-pointer transition-all text-xl flex items-center gap-4
                                                ${selectedId === exp.id ? 'bg-[#ffe787] border-l-4 border-blue-600' : 'hover:bg-[#c0c0c0] hover:border-l-4 hover:border-black'}`}
                                        >
                                            <span className="font-bold text-blue-600 w-8">{index + 1}.</span>
                                            <div className="flex-1">
                                                <div className="font-semibold">{exp.subExpense}</div>
                                                <div className="text-sm text-gray-500">{exp.expenseName}</div>
                                            </div>
                                            <div className="text-right font-bold text-green-600">
                                                ৳{exp.amount}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t bg-white">
                                <button 
                                    onClick={() => {
                                        const allDates = [...new Set(allExpenses.map(e => e.date))];
                                        if (allDates.length > 0) {
                                            setFormData(prev => ({ ...prev, date: allDates[0] }));
                                        }
                                    }}
                                    className="w-full py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-medium cursor-pointer"
                                >
                                    Show All Dates
                                </button>
                            </div>
                        </div>

                        {/* Right Panel - Form */}
                        <div className="flex-1 p-10 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-2xl font-bold mb-3 text-pink-600">Date Of Expense :</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange}
                                            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-2xl" />
                                    </div>

                                    <div>
                                        <label className="block text-2xl font-bold mb-3 text-pink-600">Expense Name :</label>
                                        <select name="expenseName" value={formData.expenseName} onChange={handleInputChange}
                                            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-2xl">
                                            {expenseHeads.length > 0 ? (
                                                expenseHeads.map(head => (
                                                    <option key={head.id} value={head.name}>{head.name}</option>
                                                ))
                                            ) : (
                                                <>
                                                    
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-2xl font-bold mb-3 text-pink-600">Sub Expense Name :</label>
                                        <input type="text" name="subExpense" value={formData.subExpense} onChange={handleInputChange}
                                            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-2xl"
                                            placeholder="Enter Sub Expense Name" />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-2xl font-bold mb-3 text-pink-600">Description :</label>
                                        <input type="text" name="description" value={formData.description} onChange={handleInputChange}
                                            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-2xl bg-yellow-50"
                                            placeholder="Enter description" />
                                    </div>

                                    <div>
                                        <label className="block text-2xl font-bold mb-3 text-pink-600">Amount :</label>
                                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-2xl"
                                            placeholder="Enter amount" />
                                    </div>

                                    <div>
                                        <label className="block text-2xl font-bold mb-3 text-blue-600">Expenses In Words</label>
                                        <input type="text" value={formData.inWords} readOnly
                                            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-2xl bg-green-50 font-semibold" />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 mt-12">
                                <button onClick={() => window.history.back()} className="flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white px-10 py-6 rounded-2xl font-bold text-xl cursor-pointer">
                                    <ArrowLeft size={26} /> Go Back
                                </button>

                                <button onClick={handleNew} className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-2xl font-bold text-xl cursor-pointer">
                                    <Plus size={26} /> New
                                </button>

                                <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-2xl font-bold text-2xl cursor-pointer">
                                    Save
                                </button>

                                <button onClick={handleSave} disabled={!selectedId} className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-10 py-6 rounded-2xl font-bold text-xl cursor-pointer">
                                    <Edit2 size={26} className="inline mr-2" /> Edit
                                </button>

                                <button onClick={() => {
                                    if (!selectedId) return;
                                    if (window.confirm("Are you sure you want to delete this expense?")) {
                                        const updated = allExpenses.filter(item => item.id !== selectedId);
                                        saveToLocalStorage(updated);
                                        handleNew();
                                    }
                                }} disabled={!selectedId} className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-10 py-6 rounded-2xl font-bold text-xl cursor-pointer">
                                    <Trash2 size={26} className="inline mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExPaid;