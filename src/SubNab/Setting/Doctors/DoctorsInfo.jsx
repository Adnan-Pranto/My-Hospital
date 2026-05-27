import React, { useState, useEffect } from "react";
import Client from "../../../Clients/Client";
import { useNavigate } from "react-router-dom";

export default function DoctorsInfo() {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [id, setId] = useState(1);
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [available, setAvailable] = useState("");
    const [feeNew, setFeeNew] = useState("");
    const [feeOld, setFeeOld] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    // LOAD DOCTORS
    const loadDoctors = () => {
        try {
            const saved = localStorage.getItem("doctors");
            setDoctors(saved ? JSON.parse(saved) : []);
        } catch (error) {
            console.error("Error loading doctors:", error);
            setDoctors([]);
        }
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    // AUTO ID
    useEffect(() => {
        if (doctors.length > 0) {
            const maxId = Math.max(...doctors.map((d) => Number(d.id || 0)));
            setId(maxId + 1);
        } else {
            setId(1);
        }
    }, [doctors]);

    const isAvailableSelected = available === "Yes" || available === "No";

    // SAVE
    const handleSave = () => {
        if (!name.trim()) {
            return alert("Doctor Name is required!");
        }
        const newDoctor = {
            id,
            name: name.trim(),
            designation: designation.trim(),
            phone,
            address: address.trim(),
            available,
            feeNew,
            feeOld
        };
        const updated = [...doctors, newDoctor];
        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));

        alert("Doctor Added Successfully!");
        clearForm();
        
        // 🔥 Test পেজে জানানোর জন্য
        window.dispatchEvent(new Event("doctorUpdated"));
    };

    // EDIT
    const handleEdit = () => {
        if (!selectedId) return alert("Please select a doctor first!");
        const updated = doctors.map((doc) =>
            Number(doc.id) === Number(selectedId)
                ? { ...doc, name, designation, phone, address, available, feeNew, feeOld }
                : doc
        );
        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
        window.dispatchEvent(new Event("doctorUpdated"));
    };

    // DELETE
    const handleDelete = () => {
        if (!selectedId) return alert("Please select a doctor first!");
        const updated = doctors.filter((doc) => Number(doc.id) !== Number(selectedId));
        setDoctors(updated);
        localStorage.setItem("doctors", JSON.stringify(updated));
        clearForm();
        window.dispatchEvent(new Event("doctorUpdated"));
    };

    const handleSelect = (doc) => {
        setSelectedId(doc.id);
        setId(doc.id);
        setName(doc.name || "");
        setDesignation(doc.designation || "");
        setPhone(doc.phone || "");
        setAddress(doc.address || "");
        setAvailable(doc.available || "");
        setFeeNew(doc.feeNew || "");
        setFeeOld(doc.feeOld || "");
    };

    const clearForm = () => {
        setSelectedId(null);
        setName("");
        setDesignation("");
        setPhone("");
        setAddress("");
        setAvailable("");
        setFeeNew("");
        setFeeOld("");

        if (doctors.length > 0) {
            const maxId = Math.max(...doctors.map((d) => Number(d.id || 0)));
            setId(maxId + 1);
        } else {
            setId(1);
        }
    };

    const filteredDoctors = doctors.filter((d) =>
        (d.name || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Client />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-[92vh] overflow-hidden bg-gradient-to-br from-cyan-100 via-blue-50 to-sky-100">
                {/* LEFT SIDE */}
                <div className="lg:col-span-1 border-2 border-cyan-400 rounded-xl p-5 flex flex-col shadow-[4px_4px_8px_grey] bg-white overflow-hidden">
                    <input
                        className="w-full p-2 border rounded mb-3 focus:outline-cyan-400"
                        placeholder="Search Doctor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <h4 className="text-2xl font-bold text-center mb-3 text-cyan-700">
                        Name of Doctor's List
                    </h4>
                    <ul className="space-y-1 overflow-y-auto flex-1 pr-2">
                        {filteredDoctors.length === 0 ? (
                            <li className="p-4 text-center text-gray-500">No doctor found</li>
                        ) : (
                            filteredDoctors.map((doc, i) => (
                                <li
                                    key={doc.id}
                                    onClick={() => handleSelect(doc)}
                                    className="p-3 cursor-pointer hover:bg-blue-200 rounded flex gap-3 transition-all hover:shadow"
                                >
                                    <span className="font-bold text-cyan-700 w-6">{i + 1}.</span>
                                    <span className="font-medium">{doc.name}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 border-2 border-cyan-400 rounded-xl p-6 flex flex-col shadow-[3px_4px_7px_black] bg-gray-50 overflow-hidden">
                    <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 gap-4">
                        <div>
                            <span className="font-semibold">ID :</span>
                            <input value={id} readOnly className="border p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <span className="font-semibold">Doctor Name :</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <span className="font-semibold">Designation :</span>
                            <input value={designation} onChange={(e) => setDesignation(e.target.value)} className="border p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <span className="font-semibold">Phone :</span>
                            <input value={phone} maxLength={11} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} className="border p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <span className="font-semibold">Dr. Address :</span>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <span className="font-semibold">Dr. Available :</span>
                            <select value={available} onChange={(e) => setAvailable(e.target.value)} className="border p-2 rounded w-full mt-1">
                                <option value="">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <span className="font-semibold">Doctor Visit: (New Patient)</span>
                            <input type="number" value={feeNew} onChange={(e) => setFeeNew(e.target.value)} className="border p-2 rounded w-full mt-1" />
                        </div>
                        <div>
                            <span className="font-semibold">Doctor Visit: (Old Patient)</span>
                            <input type="number" value={feeOld} onChange={(e) => setFeeOld(e.target.value)} className="border p-2 rounded w-full mt-1" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-4 border-t">
                        <button
                            onClick={handleSave}
                            disabled={!isAvailableSelected}
                            className={`p-3 rounded font-bold text-white cursor-pointer ${
                                available === "Yes"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : available === "No"
                                    ? "bg-black hover:bg-gray-800"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Save
                        </button>
                        <button
                            onClick={handleEdit}
                            className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded font-bold text-white cursor-pointer"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 p-3 rounded font-bold text-white cursor-pointer"
                        >
                            Delete
                        </button>
                        <button
                            onClick={clearForm}
                            className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-bold text-white cursor-pointer"
                        >
                            Add New
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 hover:bg-gray-600 p-3 rounded font-bold text-white cursor-pointer"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}