import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../../../Clients/Client";

export default function UserAccountCreate() {

    const navigate = useNavigate();

    // USER INFO
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [phone, setPhone] = useState("");
    const [reportName, setReportName] = useState("");

    const [users, setUsers] = useState([
        "Rimon",
        "D",
        "Adnan",
        "Pranto",
        "Masum"
    ]);

    const [newUser, setNewUser] = useState("");

    const isFormValid =
        userName.trim() !== "" &&
        userType.trim() !== "";

    // RESET FUNCTION (NEW FIX)
    const resetAll = () => {
        setUserName("");
        setUserType("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPhone("");
        setReportName("");
        setNewUser("");
    };

    const handleSave = () => {

        if (newPassword !== confirmPassword) {
            alert("Password Does Not Match");
            return;
        }

        if (newUser.trim() !== "" && !users.includes(newUser)) {
            setUsers([...users, newUser]);
            setUserName(newUser);
        }

        alert("User Account Added Successfully");

        // ✅ CLEAR ALL INPUTS AFTER SAVE
        resetAll();
    };

    return (
        <>
            <Client />

            {/* FIXED TOP POSITION (-15px EFFECT) */}
            <div className="min-h-screen w-full bg-black/40 flex justify-center items-center p-3 md:p-6 overflow-hidden relative top-[-15px]">

                <div className="w-full max-w-[650px] rounded-2xl shadow-[0px_12px_40px_rgba(0,0,0,0.45)] border-4 border-cyan-200 bg-gradient-to-br from-cyan-300 via-sky-200 to-blue-100 p-3 sm:p-5 md:p-7">

                    <div className="border-4 border-white rounded-xl bg-white/20 p-4 sm:p-6 md:p-8">

                        {/* TITLE */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                            User Account Create
                        </h2>

                        {/* USER NAME */}
                        <div className="mb-4 flex items-center gap-3">

                            <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                User Name :
                            </span>

                            <select
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                            >
                                <option value="">Select User</option>

                                {users.map((u, i) => (
                                    <option key={i}>{u}</option>
                                ))}

                                <option value="__new_input__">➕ Type Below</option>
                            </select>
                        </div>

                        {/* NEW USER INPUT */}
                        {userName === "__new_input__" && (
                            <div className="mb-4 flex items-center gap-3">

                                <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                    New User :
                                </span>

                                <input
                                    type="text"
                                    value={newUser}
                                    onChange={(e) => setNewUser(e.target.value)}
                                    className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                                />

                            </div>
                        )}

                        {/* USER TYPE */}
                        <div className="mb-4 flex items-center gap-3">

                            <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                User Type :
                            </span>

                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                            >
                                <option value="">Select Type</option>
                                <option>Chairman</option>
                                <option>M.D.</option>
                                <option>Director</option>
                                <option>Doctor</option>
                                <option>Operator</option>
                                <option>Manager</option>
                                <option>Receptionist</option>
                                <option>Admin-Authority</option>
                            </select>

                        </div>

                        {/* PASSWORD FIXED (NO AUTO FILL ISSUE FIX) */}
                        <div className="space-y-4 mb-4">

                            <div className="flex items-center gap-3">
                                <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                    Old Password :
                                </span>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                    New Password :
                                </span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                    Confirm Password :
                                </span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                                />
                            </div>

                        </div>

                        {/* PHONE */}
                        <div className="mb-4 flex items-center gap-3">
                            <span className="min-w-[170px] text-base sm:text-lg font-semibold text-gray-800">
                                Phone Number :
                            </span>

                            <input
                                type="text"
                                maxLength={11}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                className="flex-1 p-3 rounded-lg border-2 border-cyan-400 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
                            />
                        </div>

                        {/* REPORT */}
                        <div className="mb-6">
                            <span className="block mb-2 text-base sm:text-lg font-semibold text-gray-800">
                                Name & Designation For Diagnosis Report :
                            </span>

                            <textarea
                                value={reportName}
                                onChange={(e) => setReportName(e.target.value)}
                                className="w-full h-24 sm:h-28 p-3 rounded-lg border-2 border-cyan-400 bg-white resize-none focus:outline-none focus:ring-4 focus:ring-cyan-300"
                            />
                        </div>

                        {/* BUTTONS */}
                        <div className="grid grid-cols-2 gap-4">

                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-600 hover:bg-red-600 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-xl shadow-lg"
                            >
                                Go-Back
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={!isFormValid}
                                className={`text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-xl shadow-lg transition duration-300 
                                ${isFormValid
                                        ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                        : "bg-gray-400 cursor-not-allowed"}`}
                            >
                                Save
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}