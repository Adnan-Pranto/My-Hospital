import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TestNameDetails() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    // 🔥 CUSTOM POPUP
    const [popup, setPopup] = useState({
        show: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    const openPopup = (title, message, onConfirm) => {
        setPopup({ show: true, title, message, onConfirm });
    };

    const closePopup = () => {
        setPopup({ show: false, title: "", message: "", onConfirm: null });
    };

    // 🔥 TEST LIST with localStorage
    const [tests, setTests] = useState([]);

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("tests");
            if (saved) {
                const parsedTests = JSON.parse(saved);
                if (Array.isArray(parsedTests)) {
                    setTests(parsedTests);
                }
            }
        } catch (e) {
            console.error("Load Error:", e);
            localStorage.removeItem("tests");
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem("tests", JSON.stringify(tests));
        } catch (e) {
            console.error("Save Error:", e);
        }
    }, [tests]);

    // 🔥 IMPROVED ID GENERATOR
    const generateNextId = () => {
        if (tests.length === 0) return "1";

        let maxId = 0;
        tests.forEach(item => {
            const id = Number(item?.testId);
            if (!isNaN(id) && id > maxId) {
                maxId = id;
            }
        });

        return String(maxId + 1);
    };

    // 🔥 FORM DATA
    const [formData, setFormData] = useState({
        testId: "1",
        testName: "",
        category: "",
        subCategory: "",
        group: "",
        specimen: "",
        printFormat: "",
        cost: "",
        referenceCost: "",
        discount: "",
        roomNo: "",
    });

    const isSaveEnabled = formData.testName.trim() !== "" && formData.cost.trim() !== "";

    // 🔥 SEARCH
    const filteredTests = useMemo(() => {
        return tests.filter(item =>
            item?.testName?.toLowerCase().includes(search.toLowerCase()) ||
            item?.testId?.toString().includes(search)
        );
    }, [search, tests]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔥 NEW
    const handleNew = () => {
        const newId = generateNextId();
        setFormData({
            testId: newId,
            testName: "",
            category: "",
            subCategory: "",
            group: "",
            specimen: "",
            printFormat: "",
            cost: "",
            referenceCost: "",
            discount: "",
            roomNo: "",
        });
    };

    // 🔥 SAVE
    const handleSave = () => {
        if (!formData.testName.trim() || !formData.cost.trim()) {
            alert("Please Fill Required Fields (Test Name + Cost)");
            return;
        }

        openPopup("Save Test", `Do you want to save "${formData.testName}" ?`, () => {
            setTests(prev => [...prev, { ...formData }]);
            handleNew();
            closePopup();
        });
    };

    // 🔥 EDIT
    const handleEdit = () => {
        openPopup("Update Test", `Do you want to update "${formData.testName}" ?`, () => {
            setTests(prev =>
                prev.map(item =>
                    String(item.testId) === String(formData.testId) ? { ...formData } : item
                )
            );
            closePopup();
        });
    };

    // 🔥 DELETE
    const handleDelete = () => {
        openPopup("Delete Test", `Do you want to delete "${formData.testName}" ?`, () => {
            setTests(prev => prev.filter(item => String(item.testId) !== String(formData.testId)));
            handleNew();
            closePopup();
        });
    };

    // 🔥 SELECT TEST
    const handleSelectTest = (item) => {
        setFormData({ ...item });
    };

    // Print Function (আগের মতোই আছে)
    const handlePrint = () => {
        const printWindow = window.open("", "", "width=900,height=900");
        printWindow.document.write(`
            <html><head><title>Test Details</title>
            <style>
                body { font-family: Arial; padding:20px; }
                h2 { text-align:center; }
                table { width:100%; border-collapse:collapse; }
                th,td { border:1px solid #ccc; padding:10px; }
                th { background:#f0f0f0; }
            </style>
            </head><body>
            <h2>Diagnosis Test Details</h2>
            <table>
                <tr><th>ID Of Test</th><td>${formData.testId}</td></tr>
                <tr><th>Name Of Test</th><td>${formData.testName}</td></tr>
                <tr><th>Category</th><td>${formData.category}</td></tr>
                <tr><th>Sub Category</th><td>${formData.subCategory}</td></tr>
                <tr><th>Group</th><td>${formData.group}</td></tr>
                <tr><th>Specimen</th><td>${formData.specimen}</td></tr>
                <tr><th>Printing Format</th><td>${formData.printFormat}</td></tr>
                <tr><th>Cost</th><td>${formData.cost}</td></tr>
                <tr><th>Reference Cost</th><td>${formData.referenceCost}</td></tr>
                <tr><th>Discount</th><td>${formData.discount}</td></tr>
                <tr><th>Room No</th><td>${formData.roomNo}</td></tr>
            </table>
            </body></html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
            {/* POPUP */}
            {popup.show && (
                <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-slate-700 mb-3">{popup.title}</h2>
                        <p className="text-slate-600 text-[16px] mb-6">{popup.message}</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={closePopup} className="px-5 py-2 rounded-xl bg-slate-400 hover:bg-red-600 font-semibold">
                                Cancel
                            </button>
                            <button onClick={popup.onConfirm} className="px-5 py-2 rounded-xl bg-cyan-700 text-white hover:bg-green-600 font-semibold">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="w-full h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-indigo-100">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full p-4 overflow-hidden">

                    {/* LEFT FORM - আগের মতো */}
                    <div className="lg:col-span-2 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-2xl p-4 flex flex-col h-full overflow-hidden min-h-0">
                        <div className="space-y-3 overflow-y-auto pr-2 flex-1 min-h-0">
                            {[
                                { label: "Id Of Test :", name: "testId", type: "text", color: "bg-yellow-200" },
                                { label: "Name Of Test :", name: "testName", type: "text", color: "bg-green-200" },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row md:items-center gap-3">
                                    <span className={`md:w-[250px] w-full ${item.color} px-4 py-3 rounded-xl font-bold text-[16px] whitespace-nowrap shadow-sm`}>
                                        {item.label}
                                    </span>
                                    <input
                                        type={item.type}
                                        name={item.name}
                                        value={formData[item.name] || ""}
                                        onChange={handleChange}
                                        readOnly={item.name === "testId"}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-green-100 text-[15px]"
                                    />
                                </div>
                            ))}

                            {/* Select Fields & Number Fields আগের মতোই আছে */}
                            {[
                                { label: "Category Of Test :", name: "category", color: "bg-slate-200", options: ["Imaging/Radiology", "Pathology", "Urine"] },
                                { label: "Sub Category :", name: "subCategory", color: "bg-yellow-200", options: ["Blood", "Urine", "Stool", "Ultra", "Echo", "ECG", "X-Ray", "Hormone", "Histopathology", "CT/Others"] },
                                { label: "Group Of Test :", name: "group", color: "bg-pink-300", options: ["Haematology", "Biochemistry", "Serology", "Endoscopy", "Hormone Test", "Ultrasonogram", "Microbiology", "ECG", "X-Ray", "CT-Scan", "EEG", "ETT", "Urine Examination", "Semen Analysis"] },
                                { label: "Specimen Of Test :", name: "specimen", color: "bg-cyan-200", options: ["As Required", "Blood", "ECG", "Echo", "Histopathology", "Semen", "Serum", "Skin", "Stool", "Urine", "USG", "X-Ray"] },
                                { label: "Printing Format :", name: "printFormat", color: "bg-indigo-300", options: ["0", "1", "2", "3", "4", "5", "6"] },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row md:items-center gap-3">
                                    <span className={`md:w-[250px] w-full ${item.color} px-4 py-3 rounded-xl font-bold text-[16px] whitespace-nowrap shadow-sm`}>
                                        {item.label}
                                    </span>
                                    <select
                                        name={item.name}
                                        value={formData[item.name] || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-green-100 text-[15px]"
                                    >
                                        <option value="">Select</option>
                                        {item.options.map((option, i) => (
                                            <option key={i} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {[
                                { label: "Cost Of Test :", name: "cost", color: "bg-yellow-200" },
                                { label: "Reference Cost :", name: "referenceCost", color: "bg-orange-200" },
                                { label: "Discount :", name: "discount", color: "bg-pink-300" },
                                { label: "Room No :", name: "roomNo", color: "bg-lime-200" },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row md:items-center gap-3">
                                    <span className={`md:w-[250px] w-full ${item.color} px-4 py-3 rounded-xl font-bold text-[16px] whitespace-nowrap shadow-sm`}>
                                        {item.label}
                                    </span>
                                    <input
                                        type="number"
                                        name={item.name}
                                        value={formData[item.name] || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-green-100 text-[15px]"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            <button className="bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-700" onClick={() => navigate(-1)}>Go Back</button>
                            <button onClick={handleSave} disabled={!isSaveEnabled} className={`py-3 rounded-xl font-bold ${isSaveEnabled ? "bg-emerald-500 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"}`}>Save</button>
                            <button onClick={handleEdit} className="bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Edit</button>
                            <button onClick={handleNew} className="bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-700">New</button>
                            <button onClick={handlePrint} className="bg-violet-500 text-white py-3 rounded-xl font-bold hover:bg-violet-700">Print</button>
                            <button onClick={handleDelete} className="bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-700">Delete</button>
                        </div>
                    </div>

                    {/* RIGHT LIST */}
                    <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-2xl p-4 flex flex-col h-full overflow-hidden min-h-0">
                        <input 
                            type="text" 
                            placeholder="Search By ID / Test Name" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4" 
                        />
                        <div className="bg-gradient-to-b from-slate-50 to-cyan-50 rounded-xl flex-1 overflow-y-auto p-2 space-y-2 min-h-0">
                            {filteredTests.map((item, index) => (
                                <div 
                                    key={`${item.testId}-${index}`} 
                                    onClick={() => handleSelectTest(item)}
                                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer bg-white hover:bg-cyan-700 hover:text-white duration-300 shadow"
                                >
                                    <span className="font-bold text-[16px]">{item.testId}</span>
                                    <p className="font-semibold text-[15px]">{item.testName}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NOTES */}
                    <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-2xl p-4 flex flex-col h-full overflow-hidden min-h-0">
                        <div className="bg-gradient-to-br from-pink-50 to-cyan-50 rounded-xl p-4 flex-1 overflow-y-auto min-h-0">
                            <h2 className="font-bold text-xl text-slate-700 mb-3">Reagent / Notes</h2>
                            <textarea placeholder="Write Notes Here..." className="w-full h-full rounded-xl border border-slate-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-700">Save</button>
                            <button className="bg-yellow-400 py-3 rounded-xl font-bold hover:bg-yellow-600 hover:text-white">Edit</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TestNameDetails;