import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "../../../../PopupModal";   // ← Import করা হয়েছে

export default function SearchofTest() {

    const navigate = useNavigate();

    // ==================== STATES ====================
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        ageY: "",
        ageM: "",
        ageD: "",
        gender: "",
        phone: "",
        address: "",
        doctor: "",
        referer: ""
    });

    // TESTS
    const [tests, setTests] = useState([]);
    const [allTestsList, setAllTestsList] = useState([]);
    const [testSearch, setTestSearch] = useState("");
    const [selectedTest, setSelectedTest] = useState(null);

    // DOCTOR / REFERER
    const [doctors, setDoctors] = useState([]);
    const [referers, setReferers] = useState([]);
    const [doctorSearch, setDoctorSearch] = useState("");
    const [referSearch, setReferSearch] = useState("");

    // BILLING
    const [discount, setDiscount] = useState(0);
    const [paid, setPaid] = useState(0);
    const [discountType, setDiscountType] = useState("fixed");

    // POPUP
    const [showPopup, setShowPopup] = useState(false);

    // MESSAGE
    const [message, setMessage] = useState({
        show: false,
        type: "",
        text: ""
    });

    // ==================== LOAD ====================
    useEffect(() => {
        const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const savedTests = JSON.parse(localStorage.getItem("tests") || "[]");
        const savedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
        const savedReferers = JSON.parse(localStorage.getItem("referrersData") || "[]");

        setPatients(savedPatients);
        setFilteredPatients(savedPatients);
        setAllTestsList(savedTests);
        setDoctors(savedDoctors);
        setReferers(savedReferers);
    }, []);

    // ==================== SEARCH ====================
    useEffect(() => {
        let filtered = [...patients];

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(p.patientId || p.id || "").includes(searchTerm)
            );
        }

        if (startDate && endDate) {
            filtered = filtered.filter(p => {
                const patientDate = new Date(p.date).toISOString().split("T")[0];
                return patientDate >= startDate && patientDate <= endDate;
            });
        }

        setFilteredPatients(filtered);
    }, [searchTerm, patients, startDate, endDate]);

    // ==================== SELECT PATIENT ====================
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);

        setFormData({
            id: patient.patientId || patient.id || "",
            name: patient.name || "",
            ageY: patient.ageY || "",
            ageM: patient.ageM || "",
            ageD: patient.ageD || "",
            gender: patient.gender || "",
            phone: patient.phone || "",
            address: patient.address || "",
            doctor: patient.doctor || "",
            referer: patient.referer || ""
        });

        setTests(patient.tests || []);
        setDiscount(patient.discount || 0);
        setPaid(patient.paid || 0);
        setDiscountType("fixed");
    };

    // ==================== CALCULATIONS ====================
    const totalAmount = tests.reduce((sum, t) => sum + Number(t.cost || 0), 0);

    const discountAmount = discountType === "percent" 
        ? Math.round(totalAmount * (discount / 100)) 
        : Number(discount) || 0;

    const payable = Math.max(0, totalAmount - discountAmount);
    const due = Math.max(0, payable - paid);
    const returnMoney = Math.max(0, paid - payable);

    const amountInWords = payable > 0 ? `${payable} Taka Only` : "Zero Taka Only";

    // ==================== MESSAGE ====================
    const showMessage = (text, type = "success") => {
        setMessage({ show: true, type, text });
        setTimeout(() => setMessage({ show: false, type: "", text: "" }), 2500);
    };

    // ==================== PRINT - PopupModal Open ====================
    const handlePrint = () => {
        if (!formData.name) {
            showMessage("Please select a patient first!", "error");
            return;
        }
        setShowPopup(true);
    };

    // ==================== SAVE ====================
    const handleSave = () => {
        if (!formData.name) {
            showMessage("Patient name required!", "error");
            return;
        }

        const updatedPatient = {
            ...formData,
            tests,
            total: totalAmount,
            discount: discountAmount,
            paid,
            payable,
            due,
            returnMoney,
            date: new Date().toISOString()
        };

        let allPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const index = allPatients.findIndex(p => p.patientId === formData.id || p.id === formData.id);

        if (index !== -1) {
            allPatients[index] = updatedPatient;
        } else {
            allPatients.push(updatedPatient);
        }

        localStorage.setItem("patients", JSON.stringify(allPatients));
        setPatients(allPatients);
        showMessage("Saved Successfully");
    };

    // ==================== TEST FUNCTIONS ====================
    const addTest = () => {
        if (!selectedTest) return;
        setTests([...tests, { ...selectedTest, comment: "" }]);
        setSelectedTest(null);
        setTestSearch("");
        showMessage("Test Added");
    };

    const removeTest = (index) => {
        if (window.confirm("Delete this test?")) {
            setTests(tests.filter((_, i) => i !== index));
            showMessage("Test Deleted", "error");
        }
    };

    const updateTestComment = (index, comment) => {
        const updated = [...tests];
        updated[index].comment = comment;
        setTests(updated);
    };

    // ==================== FILTERS ====================
    const filteredDoctors = doctors.filter(d => {
        const doctorName = typeof d === "string" ? d : d.name || "";
        return doctorName.toLowerCase().includes(doctorSearch.toLowerCase());
    });

    const filteredReferers = referers.filter(r => {
        const name = r.name || r;
        return name.toLowerCase().includes(referSearch.toLowerCase());
    });

    return (
        <>
            <div className="h-[98vh] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-3">

                <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-4 px-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Total Patient = {patients.length}</h1>
                        <div className="flex gap-3">
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 rounded-xl text-black cursor-pointer" />
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-2 rounded-xl text-black cursor-pointer" />
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid gap-4 p-4 h-[calc(98vh-90px)]" style={{ gridTemplateColumns: "1fr 4fr 2fr" }}>

                        {/* LEFT COLUMN */}
                        <div className="bg-white rounded-3xl shadow-xl border p-4 flex flex-col overflow-hidden">
                            <input 
                                type="text" 
                                placeholder="Search by ID or Name..." 
                                className="w-full p-3 border rounded-2xl mb-3 focus:outline-none"
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                            />

                            <div className="flex-1 overflow-auto pr-1 space-y-2">
                                {filteredPatients.map((p, index) => (
                                    <div 
                                        key={p.id} 
                                        onClick={() => handleSelectPatient(p)}
                                        className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                                            selectedPatient?.id === p.id 
                                                ? "bg-indigo-600 text-white border-indigo-600" 
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <span className="font-bold">{index + 1}.</span> {p.name}
                                    </div>
                                ))}
                            </div>

                            <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-bold transition-all cursor-pointer">
                                🔍 Show
                            </button>
                        </div>

                        {/* MIDDLE COLUMN - আগের মতোই রাখা হয়েছে */}
                        <div className="bg-white rounded-3xl shadow-xl border p-4 flex flex-col overflow-hidden">

                            <div className="grid grid-cols-3 items-center mb-3 gap-2">
                                <h2 className="text-xl font-bold col-span-2 self-center">Patient Information</h2>
                                <div className="flex justify-end">
                                    <button 
                                        onClick={handleSave} 
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold cursor-pointer"
                                    >
                                        {selectedPatient ? "Save" : "Edit"}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <input className="p-3 border rounded-xl" placeholder="Patient ID" value={formData.id} readOnly />
                                <input className="p-3 border rounded-xl" placeholder="Patient Name" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                <input className="p-3 border rounded-xl" placeholder="Phone" value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-9 gap-3 mt-3">
                                <div className="col-span-4">
                                    <input className="w-full p-3 border rounded-xl" placeholder="Address" value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                                <input className="col-span-1 p-3 border rounded-xl text-center" placeholder="D" value={formData.ageD}
                                    onChange={(e) => setFormData({ ...formData, ageD: e.target.value })} />
                                <input className="col-span-1 p-3 border rounded-xl text-center" placeholder="M" value={formData.ageM}
                                    onChange={(e) => setFormData({ ...formData, ageM: e.target.value })} />
                                <input className="col-span-1 p-3 border rounded-xl text-center" placeholder="Y" value={formData.ageY}
                                    onChange={(e) => setFormData({ ...formData, ageY: e.target.value })} />
                                <input className="col-span-2 p-3 border rounded-xl" placeholder="Gender" value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                            </div>

                            <div className="space-y-3 mt-4">
                                <div className="flex gap-3 items-center">
                                    <span className="font-semibold w-20">Doctor :</span>
                                    <input className="flex-1 p-2 border rounded-xl" placeholder="Search Doctor" value={doctorSearch} onChange={(e) => setDoctorSearch(e.target.value)} />
                                    <select className="flex-1 p-2 border rounded-xl" value={formData.doctor} onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}>
                                        <option value="">Select Doctor</option>
                                        {filteredDoctors.map((d, i) => {
                                            const doctorName = typeof d === "string" ? d : d.name;
                                            return <option key={i} value={doctorName}>{doctorName}</option>;
                                        })}
                                    </select>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <span className="font-semibold w-20">Referer :</span>
                                    <input className="flex-1 p-2 border rounded-xl" placeholder="Search Referer" value={referSearch} onChange={(e) => setReferSearch(e.target.value)} />
                                    <select className="flex-1 p-2 border rounded-xl" value={formData.referer} onChange={(e) => setFormData({ ...formData, referer: e.target.value })}>
                                        <option value="">Select Referer</option>
                                        {filteredReferers.map((r, i) => (
                                            <option key={i} value={r.name || r}>{r.name || r}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold mb-2">Add Test</h3>
                                <div className="flex gap-2">
                                    <input className="flex-1 p-3 border rounded-xl" placeholder="Search Test" value={testSearch}
                                        onChange={(e) => {
                                            setTestSearch(e.target.value);
                                            const found = allTestsList.find(t => t.testName?.toLowerCase().includes(e.target.value.toLowerCase()));
                                            if (found) setSelectedTest({ name: found.testName, cost: found.cost });
                                        }}
                                    />
                                    <select className="p-3 border rounded-xl min-w-[180px]" onChange={(e) => {
                                        const found = allTestsList.find(t => t.testName === e.target.value);
                                        if (found) setSelectedTest({ name: found.testName, cost: found.cost });
                                    }}>
                                        <option value="">Select Test</option>
                                        {allTestsList.map((t, i) => (
                                            <option key={i} value={t.testName}>{t.testId} - {t.testName}</option>
                                        ))}
                                    </select>
                                    <button onClick={addTest} className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-bold cursor-pointer">Add</button>
                                </div>
                            </div>

                            <div className="flex-1 mt-3 overflow-hidden flex flex-col">
                                <h3 className="font-bold mb-2">Selected Tests</h3>
                                <div className="flex-1 overflow-auto border rounded-2xl min-h-[220px]">
                                    <table className="w-full">
                                        <thead className="bg-gray-100 sticky top-0">
                                            <tr>
                                                <th className="p-3 text-left">Test</th>
                                                <th className="p-3 text-right">Cost</th>
                                                <th className="p-3">Comment</th>
                                                <th className="p-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tests.map((test, i) => (
                                                <tr key={i} className="border-t hover:bg-red-50">
                                                    <td className="p-3">{test.name}</td>
                                                    <td className="p-3 text-right font-bold">{test.cost}</td>
                                                    <td className="p-3">
                                                        <input type="text" value={test.comment || ""} onChange={(e) => updateTestComment(i, e.target.value)} className="w-full p-2 border rounded-lg" />
                                                    </td>
                                                    <td className="p-3">
                                                        <button onClick={() => removeTest(i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm cursor-pointer">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Bill Summary */}
                        <div className="bg-white rounded-3xl shadow-xl border p-4 flex flex-col overflow-hidden">
                            <h2 className="text-2xl font-bold text-center mb-4">Bill Summary</h2>
                            <div className="space-y-4 flex-1 overflow-auto">
                                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                    <p>Total Amount</p>
                                    <p className="text-4xl font-bold text-blue-700">{totalAmount}</p>
                                </div>

                                <div className="flex gap-2 mb-3">
                                    <button onClick={() => setDiscountType("fixed")} className={`flex-1 py-2 rounded-xl font-semibold cursor-pointer ${discountType === "fixed" ? "bg-green-600 text-white" : "bg-gray-200"}`}>Discount Amount</button>
                                    <button onClick={() => setDiscountType("percent")} className={`flex-1 py-2 rounded-xl font-semibold cursor-pointer ${discountType === "percent" ? "bg-green-600 text-white" : "bg-gray-200"}`}>Discount Percentage</button>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="mb-1 font-semibold text-2xl text-center">Paid</p>
                                        <input type="number" value={paid} onChange={(e) => setPaid(Number(e.target.value))} className="w-full p-3 border font-bold bg-lime-100 text-3xl text-violet-800 text-center rounded-xl" />
                                    </div>
                                    <div>
                                        <p className="mb-1 font-semibold bg-rose-200 rounded-md text-xl text-center">Discount {discountType === "percent" ? "(%)" : "Amount"}</p>
                                        <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full p-3 border rounded-xl font-bold text-center text-2xl" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-emerald-50 p-4 rounded-2xl text-center">
                                        <p className="font-semibold text-emerald-700">Payable</p>
                                        <p className="text-3xl font-bold text-emerald-600">{payable}</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-2xl text-center">
                                        <p className="font-semibold text-red-700">Due</p>
                                        <p className="text-3xl font-bold text-red-600">{due}</p>
                                    </div>
                                </div>

                                <div className="bg-amber-50 p-4 rounded-2xl text-center">
                                    <p className="font-semibold">Return</p>
                                    <p className="text-3xl font-bold">{returnMoney}</p>
                                </div>

                                <div className="bg-indigo-50 p-4 rounded-2xl">
                                    <p className="font-semibold">Amount in Words</p>
                                    <p className="text-lg">{amountInWords}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <button onClick={() => navigate(-1)} className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-2xl font-bold cursor-pointer">← Back</button>
                                <button 
                                    onClick={handlePrint} 
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-bold cursor-pointer"
                                >
                                    🖨️ Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== POPUP MODAL ==================== */}
            <PopupModal
                open={showPopup}
                onClose={() => setShowPopup(false)}
                data={{
                    patientId: formData.id,
                    title: "",
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    gender: formData.gender,
                    age: `${formData.ageY || 0}Y ${formData.ageM || 0}M ${formData.ageD || 0}D`,
                    doctor: formData.doctor,
                    referer: formData.referer,
                    tests: tests,
                    total: totalAmount,
                    discount: discountAmount,
                    paid: paid,
                    payable: payable,
                    due: due,
                    returnMoney: returnMoney,
                    date: new Date().toISOString()
                }}
            />

            {/* MESSAGE */}
            {message.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                    <div className={`px-8 py-5 rounded-2xl text-white text-lg font-semibold shadow-2xl ${message.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
                        {message.text}
                    </div>
                </div>
            )}
        </>
    );
}