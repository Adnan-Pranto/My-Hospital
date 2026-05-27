import React, { useState, useEffect, useRef } from "react";
import "./Test.css";
import PopupModal from "../../../../PopupModal";
import Client from "../../../../Clients/Client";
import { useNavigate } from "react-router-dom";

// ==================== CUSTOM ALERT MODAL ====================
const CustomAlertModal = ({ isOpen, onClose, title, message, type = "warning" }) => {
    if (!isOpen) return null;

    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };

    const colors = {
        success: "bg-green-500",
        error: "bg-yellow-500",
        warning: "bg-green-500",
        info: "bg-blue-500"
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className={`${colors[type]} text-white p-5 flex items-center gap-4`}>
                    <span className="text-4xl">{icons[type]}</span>
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>

                {/* Message */}
                <div className="p-8 text-center text-gray-700 text-[17px] leading-relaxed">
                    {message}
                </div>

                {/* Button */}
                <div className="p-5 border-t flex justify-center">
                    <button
                        onClick={onClose}
                        className={`px-10 py-3 text-white cursor-pointer font-semibold rounded-xl ${colors[type]} active:scale-95 transition-all`}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
// ============================================================

export default function Test() {
    const navigate = useNavigate();

    // ==================== STATES ====================
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [showPopup, setShowPopup] = useState(false);

    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "warning"
    });

    const [title, setTitle] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [ageY, setAgeY] = useState("");
    const [ageM, setAgeM] = useState("");
    const [ageD, setAgeD] = useState("");

    const [doctors, setDoctors] = useState([]);
    const [referers, setReferers] = useState([]);
    const [testsList, setTestsList] = useState([]);

    const [doctorSearch, setDoctorSearch] = useState("");
    const [referSearch, setReferSearch] = useState("");
    const [testSearch, setTestSearch] = useState("");

    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedReferer, setSelectedReferer] = useState("");

    const [testName, setTestName] = useState("");
    const [cost, setCost] = useState("");
    const [comment, setComment] = useState("");
    const [tests, setTests] = useState([]);

    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState("fixed");
    const [paid, setPaid] = useState(0);
    const [patientId, setPatientId] = useState("");
    const [ticketDateTime, setTicketDateTime] = useState("");

    // Refs
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const ageYRef = useRef();
    const ageMRef = useRef();
    const ageDRef = useRef();
    const doctorSearchRef = useRef();
    const referSearchRef = useRef();
    const testSearchRef = useRef();
    const discountRef = useRef();
    const paidRef = useRef();

    // ==================== AUTO CAPITALIZE HELPER ====================
    const autoCapitalize = (val) => {
        if (!val) return val;
        return val.replace(/\b\w/g, (c) => c.toUpperCase());
    };

    // ==================== PATIENT ID ====================
    const generatePatientId = () => {
        const now = new Date();
        const yy = String(now.getFullYear()).slice(-2);
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const saved = JSON.parse(localStorage.getItem("patients") || "[]");
        const prefix = `P.I-${yy}${mm}`;
        const count = saved.filter(p => String(p.patientId || "").startsWith(prefix)).length + 1;
        return `${prefix}${String(count).padStart(3, "0")}`;
    };

    useEffect(() => {
        setPatientId(generatePatientId());
    }, []);

    // ==================== LOAD DATA ====================
    const loadData = () => {
        const savedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
        setDoctors(Array.isArray(savedDoctors) ? savedDoctors : []);

        let savedReferers = JSON.parse(localStorage.getItem("referrersData") || "[]");
        if (!savedReferers.length) {
            savedReferers = JSON.parse(localStorage.getItem("referers") || "[]");
        }
        setReferers(Array.isArray(savedReferers) ? savedReferers : []);

        const savedTests = JSON.parse(localStorage.getItem("tests") || "[]");
        const defaultTests = savedTests.length
            ? savedTests.map(t => ({
                id: t.testId,
                name: t.testName,
                price: Number(t.cost)
            }))
            : [];
        setTestsList(defaultTests);
    };

    useEffect(() => { loadData(); }, []);
    useEffect(() => {
        const handleUpdate = () => loadData();
        window.addEventListener("doctorUpdated", handleUpdate);
        return () => window.removeEventListener("doctorUpdated", handleUpdate);
    }, []);

    // ==================== SEARCH HANDLERS ====================
    const handleDoctorSearch = (e) => setDoctorSearch(e.target.value);
    const handleRefererSearch = (e) => setReferSearch(e.target.value);

    // ==================== SHOW ALERT ====================
    const showAlert = (title, message, type = "warning") => {
        setAlertModal({ isOpen: true, title, message, type });
    };

    // ==================== PATIENT SEARCH ====================
    const handlePatientSearch = () => {
        if (!searchName.trim() && !searchPhone.trim() && !searchDate) {
            showAlert("Warning", "Please enter Name or Phone or select Date", "warning");
            return;
        }
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        let found = null;

        for (const p of patients) {
            const matchName = searchName.trim() && p.name?.toLowerCase().includes(searchName.toLowerCase());
            const matchPhone = searchPhone.trim() && p.phone === searchPhone;
            const matchDate = searchDate && new Date(p.date).toISOString().split("T")[0] === searchDate;

            if ((matchName || matchPhone) && (!searchDate || matchDate)) {
                found = p;
                break;
            }
        }

        if (found) {
            setName(found.name || "");
            setPhone(found.phone || "");
            setAddress(found.address || "");
            setAgeY(found.ageY || "");
            setAgeM(found.ageM || "");
            setAgeD(found.ageD || "");

            setTitle("");
            setGender("");
            setSelectedDoctor("");
            setSelectedReferer("");
            setTests([]);
            setDoctorSearch("");
            setReferSearch("");
            setTestSearch("");
            setTestName("");
            setCost("");
            setComment("");
            setDiscount(0);
            setPaid(0);
            setDiscountType("fixed");

            setSearchName("");
            setSearchPhone("");
            setSearchDate("");
        } else {
            showAlert("Not Found", "Patient not found!", "error");
        }
    };

    const handleTitleChange = (value) => {
        setTitle(value);
        if (value === "Mr." || value === "Md.") setGender("Male");
        else if (value === "Mrs." || value === "Miss" || value === "Ms.") setGender("Female");
        else setGender("Others");
    };

    const addDoctor = () => navigate("/Doctors-Details", { state: { from: "test" } });
    const addReferer = () => navigate("/refererinfo");
    const addTestName = () => navigate("/testName-Cost", { state: { from: "test" } });

    const addTest = () => {
        if (!testName || !cost) return;
        setTests(prev => [...prev, { name: testName, cost: Number(cost), comment }]);
        setTestName(""); setCost(""); setComment(""); setTestSearch("");
    };

    const removeTest = (i) => setTests(prev => prev.filter((_, idx) => idx !== i));

    const validateForm = () => {
        if (!title || title === "Title") {
            showAlert("Validation Error", "Select Title", "warning");
            return false;
        }
        if (!name.trim()) {
            showAlert("Validation Error", "Enter Patient Name", "warning");
            return false;
        }
        if (!phone || phone.length !== 11) {
            showAlert("Validation Error", "Enter valid Phone (11 digit)", "warning");
            return false;
        }
        if (!address.trim()) {
            showAlert("Validation Error", "Enter Address", "warning");
            return false;
        }
        return true;
    };

    // ==================== CALCULATIONS ====================
    const total = tests.reduce((sum, t) => sum + Number(t.cost || 0), 0);
    const discountAmount = discountType === "percent"
        ? Math.round(total * (discount / 100))
        : Number(discount) || 0;

    const payable = Math.max(0, total - discountAmount);
    const paidAmount = Number(paid) || 0;
    const due = Math.max(0, payable - paidAmount);
    const returnMoney = Math.max(0, paidAmount - payable);

    // ==================== SAVE ====================
    const handleSave = () => {
        if (!validateForm()) return;

        const now = new Date();
        const creationDateTime = now.toISOString();

        const payments = JSON.parse(localStorage.getItem("receivePaymentIndoor") || "[]");
        payments.push({
            id: Date.now(),
            narration: `Patient Bill - ${name || "Indoor Patient"}`,
            credit: payable,
            debit: 0
        });
        localStorage.setItem("receivePaymentIndoor", JSON.stringify(payments));

        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        patients.push({
            id: Date.now(),
            patientId,
            title,
            name,
            phone,
            address,
            gender,
            ageY, ageM, ageD,
            doctor: selectedDoctor,
            referer: selectedReferer,
            tests,
            total,
            discount: discountAmount,
            paid: paidAmount,
            payable,
            due,
            returnMoney,
            date: creationDateTime
        });
        localStorage.setItem("patients", JSON.stringify(patients));

        setTicketDateTime(creationDateTime);
        setShowPopup(true);
        setPatientId(generatePatientId());
    };

    const handleReload = () => window.location.reload();

    // ==================== FILTERS ====================
    const filteredDoctors = doctors.filter(d => {
        const docName = typeof d === "string" ? d : d?.name || "";
        return docName.toLowerCase().includes(doctorSearch.toLowerCase());
    });

    const filteredReferers = referers.filter(r => {
        const refName = typeof r === "string" ? r : r?.name || "";
        return refName.toLowerCase().includes(referSearch.toLowerCase());
    });

    const filteredTests = testsList.filter(t =>
        t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
        String(t.id || "").includes(testSearch)
    );

    return (
        <>
            <Client />


            <section className="card-box grid-fraction">

                <div className="Patient_Table" style={{ height: "99%", overflow: "hidden", display: "flex", flexDirection: "column" }}>

                    {/* Search Section */}
                    <div className="flex flex-col md:flex-row gap-4 my-4">
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Name</span>
                            <input type="text" placeholder="Enter Patient Name" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:bg-[#abfacf]"
                                value={searchName} onChange={(e) => setSearchName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()} />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Mobile No</span>
                            <input type="text" placeholder="Enter Patient Phone No." maxLength={11}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:bg-[#abfacf]"
                                value={searchPhone} onChange={(e) => setSearchPhone(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()} />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold block mb-1">Search by Date</span>
                            <input type="date" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:bg-[#abfacf]"
                                value={searchDate} onChange={(e) => setSearchDate(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()} />
                        </div>
                        <div className="flex items-end gap-2">
                            <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                                onClick={handlePatientSearch}>Search</button>
                            <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
                                onClick={handleReload}>Reload</button>
                        </div>
                    </div>

                    <h2 className="text-2xl text-center text-fuchsia-800 rounded-xl bg-gray-200 p-2 font-bold">Patient Information</h2>

                    {/* Form Rows */}
                    <div className="form-row">
                        <select className="input-test" value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && nameRef.current.focus()}>
                            <option>Title</option>
                            <option>Mr.</option>
                            <option>Md.</option>
                            <option>Mrs.</option>
                            <option>Miss</option>
                            <option>Ms.</option>
                            <option>Baby</option>
                        </select>
                        <span className="label">Patient Name:</span>
                        <input className="input-test flex-1 focus:bg-[#abfacf]" placeholder="Patient Name" ref={nameRef}
                            value={name}
                            onChange={(e) => setName(autoCapitalize(e.target.value))}
                            onKeyDown={(e) => e.key === "Enter" && phoneRef.current.focus()} />
                        <input className="input-test small w-20 text-center" value={patientId} readOnly />
                        <input className="input-test small" value={gender} readOnly />
                    </div>

                    <div className="form-row">
                        <span className="label">Phone:</span>
                        <input className="input-test focus:bg-[#abfacf]" value={phone} maxLength={11}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="Phone" ref={phoneRef}
                            onKeyDown={(e) => e.key === "Enter" && addressRef.current.focus()} />
                        <span className="label">Address:</span>
                        <input className="input-test flex-1 focus:bg-[#abfacf]" placeholder="Address" value={address}
                            onChange={(e) => setAddress(autoCapitalize(e.target.value))}
                            ref={addressRef}
                            onKeyDown={(e) => e.key === "Enter" && ageYRef.current.focus()} />
                        <div className="age-box">
                            <span className="label">Age :</span>
                            <input className="age-input focus:bg-[#abfacf]" placeholder="Y" value={ageY}
                                ref={ageYRef}
                                onChange={(e) => setAgeY(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && ageMRef.current.focus()} />
                            <input className="age-input focus:bg-[#abfacf]" placeholder="M" value={ageM}
                                ref={ageMRef}
                                onChange={(e) => setAgeM(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && ageDRef.current.focus()} />
                            <input className="age-input focus:bg-[#abfacf]" placeholder="D" value={ageD}
                                ref={ageDRef}
                                onChange={(e) => setAgeD(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && doctorSearchRef.current.focus()} />
                        </div>
                    </div>

                    {/* Doctor Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <h3 className="whitespace-nowrap font-semibold">Doctor :</h3>
                        <input
                            ref={doctorSearchRef}
                            className="flex-1 p-2 border rounded cursor-pointer focus:bg-[#abfacf]"
                            placeholder="Search Doctor"
                            value={doctorSearch}
                            onChange={handleDoctorSearch}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (filteredDoctors.length > 0) {
                                        const firstMatch = typeof filteredDoctors[0] === "string"
                                            ? filteredDoctors[0]
                                            : filteredDoctors[0]?.name || "";
                                        setSelectedDoctor(firstMatch);
                                    }
                                    setDoctorSearch("");
                                    referSearchRef.current.focus();
                                }
                            }}
                        />
                        <select
                            className="flex-1 p-2 border rounded"
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                        >
                            {doctorSearch.trim() === "" && <option value="">Select Doctor</option>}
                            {doctorSearch.trim() !== "" && filteredDoctors.length === 0 && (
                                <option value="">❌ No Doctor Found</option>
                            )}
                            {filteredDoctors.map((d, i) => {
                                const docName = typeof d === "string" ? d : d?.name || "";
                                return <option key={i} value={docName}>{docName}</option>;
                            })}
                        </select>
                        <button className="px-4 py-2 bg-[#7a56d5] text-white rounded hover:bg-[#2563eb] cursor-pointer"
                            style={{ width: "80px" }} onClick={addDoctor}>+ Add</button>
                    </div>

                    {/* Referer Section */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <h3 className="whitespace-nowrap font-semibold">Referer :</h3>
                        <input
                            ref={referSearchRef}
                            className="flex-1 p-2 border rounded cursor-pointer focus:bg-[#abfacf]"
                            placeholder="Search Referer"
                            value={referSearch}
                            onChange={handleRefererSearch}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (filteredReferers.length > 0) {
                                        const firstMatch = typeof filteredReferers[0] === "string"
                                            ? filteredReferers[0]
                                            : filteredReferers[0]?.name || "";
                                        setSelectedReferer(firstMatch);
                                    }
                                    setReferSearch("");
                                    testSearchRef.current.focus();
                                }
                            }}
                        />
                        <select
                            className="flex-1 p-2 border rounded"
                            value={selectedReferer}
                            onChange={(e) => setSelectedReferer(e.target.value)}
                        >
                            {referSearch.trim() === "" && <option value="">Select Referer</option>}
                            {referSearch.trim() !== "" && filteredReferers.length === 0 && (
                                <option value="">❌ No Referrer Found</option>
                            )}
                            {filteredReferers.map((r, i) => {
                                const refName = typeof r === "string" ? r : r?.name || "";
                                return <option key={i} value={refName}>{refName}</option>;
                            })}
                        </select>
                        <button className="px-4 py-2 bg-[#7a56d5] text-white rounded hover:bg-blue-600 cursor-pointer "
                            style={{ width: "80px" }} onClick={addReferer}>+ Add</button>
                    </div>

                    {/* Test Section */}
                    <h3>Add Test : </h3>
                    <div className="flex-row">
                        <input ref={testSearchRef} className="input-test flex-1 focus:bg-[#abfacf]" placeholder="Search Test By Name / ID" value={testSearch}
                            onChange={(e) => {
                                const val = e.target.value;
                                setTestSearch(val);
                                const found = testsList.find(t => t.name.toLowerCase().includes(val.toLowerCase()) || String(t.id).includes(val));
                                if (found) { setTestName(found.name); setCost(found.price); } else { setTestName(""); setCost(""); }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && addTest()}
                        />
                        <select className="input-test flex-1" value={testName} onChange={(e) => {
                            const sel = testsList.find(t => t.name === e.target.value);
                            if (sel) { setTestName(sel.name); setCost(sel.price); }
                        }} onKeyDown={(e) => e.key === "Enter" && addTest()}>
                            <option value="">Select Option</option>
                            {filteredTests.map((t, i) => <option key={i} value={t.name}>{t.id} - {t.name}</option>)}
                        </select>
                        <input className="input-test small" value={cost} readOnly />
                        <input className="input-test flex-1 focus:bg-[#abfacf]" placeholder="Have any Comments" value={comment}
                            onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTest()} />
                        <button className="btn " onClick={addTest}>Ok</button>
                        <button className="btn" onClick={addTestName}> Add New</button>
                    </div>

                    <div className="table-wrapper" style={{ flex: 1, overflow: "auto" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id.</th><th>Test</th><th>Cost</th><th>Comment</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.map((t, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{t.name}</td>
                                        <td>{t.cost}</td>
                                        <td>{t.comment}</td>
                                        <td><button className="remove-btn cursor-pointer" onClick={() => removeTest(i)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex gap-3 mt-3">
                        <button className="home-button flex-1 cursor-pointer bg-[#1ff41b] hover:bg-[#059003]"
                            onClick={() => navigate("/due-collection")}> 💰 Due Collection</button>
                        <button className="home-button flex-1 cursor-pointer bg-[#d84efb] hover:bg-[#990cbc]"
                            onClick={() => navigate("/SearchAndEdit/Test")}> 📜 Patient List</button>
                        <button className="home-button flex-1 cursor-pointer bg-[#c81b2fd3] hover:bg-[#f2031fed] "
                            onClick={() => navigate("/search-test")}> 🔍 Search Test</button>
                        <button className="home-button flex-1 cursor-pointer bg-[#f6b128] hover:bg-[#ab7404]"
                            onClick={() => navigate("/reports")}>Reports</button>
                    </div>
                </div>

                {/* BILL SECTION */}
                <div className="Amount_Table">
                    <h2 className="text-4xl text-center font-bold text-white bg-[#1a03c4] rounded-xl p-4">Bill Section</h2>
                    <div className="grid grid-cols-2 gap-3.5 text-2xl font-bold" >
                        <div className="box bg-[#f9fcaf]"><p className="mb-5">Total Amount</p><h3 className="text-blue-700 text-3xl">{total}</h3></div>

                        <div className="box">
                            {/* <p className="text-xl mb-3">Discount Type</p> */}

                            <input className="input-test w-full text-center text-grey-700" type="number" value={discount || ""} ref={discountRef}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                placeholder={discountType === "percent" ? "Percantage" : "Discount"}
                                onKeyDown={(e) => e.key === "Enter" && paidRef.current.focus()} />
                            <div className="flex gap-2 mb-2">
                                <button onClick={() => setDiscountType("fixed")}
                                    className={`flex-1 py-2 text-[15px] rounded-xl cursor-pointer ${discountType === "fixed" ? "bg-green-600 text-white" : "bg-gray-500"}`}>
                                    Amount
                                </button>
                                <button onClick={() => setDiscountType("percent")}
                                    className={`flex-1 py-2 rounded-xl text-[15px] cursor-pointer ${discountType === "percent" ? "bg-green-600 text-white" : "bg-gray-500"}`}>
                                    Percent %
                                </button>
                            </div>
                        </div>

                        <div className="box bg-[#e1fbff]">
                            <p className="text-2xl mb-5">Paid</p>
                            <input className="input-test text-green-700 text-center text-2xl" type="number"
                                value={paid || ""} ref={paidRef}
                                onChange={(e) => setPaid(Number(e.target.value))}
                                onKeyDown={(e) => e.key === "Enter" && handleSave()} />
                        </div>

                        <div className="box"><p className="mb-5">Payable</p><h3 className="text-3xl font-extrabold text-red-600">{payable}</h3></div>
                        <div className="box highlight"><p className="mb-5">Due</p><h3 className="text-3xl font-bold">{due}</h3></div>
                        <div className="box return"><p className="mb-5">Return</p><h3 className="text-3xl font-bold">{returnMoney}</h3></div>
                    </div>

                    <div className="right">
                        <button className="btn-primary cursor-pointer" onClick={handleSave}> 🖨️  Save & Print</button>
                        <div className="flex gap-3 mt-3">
                            <button className="home-button cursor-pointer bg-[#777575] hover:bg-[#403e3e]"
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        navigate(-1);
                                    } else {
                                        navigate("/diagnosis");
                                    }
                                }}>
                                ❌ Close
                            </button>
                            <button className="home-button flex-1 hover:bg-[#0797a7] bg-[#05bed2] cursor-pointer"
                                onClick={() => window.open("/test", "_blank")}> 📄 → New Page</button>
                        </div>

                        <div style={showPopup ? {
                            position: "fixed", top: 0, left: 0,
                            width: "100vw", height: "100vh",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            zIndex: 9999, background: "rgba(0,0,0,0.4)"
                        } : { display: "none" }}
                            onClick={() => setShowPopup(false)}>
                            <div onClick={(e) => e.stopPropagation()}>
                                <PopupModal
                                    open={showPopup}
                                    onClose={() => setShowPopup(false)}
                                    data={{
                                        patientId, title, name, phone, address, gender,
                                        age: `${ageY || 0}Y ${ageM || 0}M ${ageD || 0}D`,
                                        doctor: selectedDoctor, referer: selectedReferer,
                                        tests, total, discount: discountAmount, paid: paidAmount,
                                        payable, due, returnMoney, date: ticketDateTime
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Alert Modal */}
            <CustomAlertModal
                isOpen={alertModal.isOpen}
                onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />
        </>
    );
}