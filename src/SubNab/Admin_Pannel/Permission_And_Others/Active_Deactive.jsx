import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Client from "../../../Clients/Client";
import General from "../../../General/General";
export default function Active_Deactive() {

    const navigate = useNavigate();

    // REAL USERS DATA
    const [users, setUsers] = useState([
        { name: "Rimon", status: "Active" },
        { name: "D", status: "Active" },
        { name: "Adnan", status: "Deactive" },
        { name: "Pranto", status: "Active" },
        { name: "Masum", status: "Deactive" },
    ]);

    // SELECTED USER
    const [selectedUser, setSelectedUser] = useState("");

    // EDITABLE STATUS
    const [status, setStatus] = useState("Active");

    // যখন user change হবে তখন তার real status load হবে
    useEffect(() => {
        const user = users.find(u => u.name === selectedUser);
        if (user) {
            setStatus(user.status);
        } else {
            setStatus("Active");
        }
    }, [selectedUser, users]);

    const isFormValid = selectedUser.trim() !== "";

    // SAVE (only selected user update)
    const handleSave = () => {
        setUsers(prev =>
            prev.map(u =>
                u.name === selectedUser
                    ? { ...u, status }
                    : u
            )
        );

        alert(`${selectedUser} is now ${status}`);
    };

    // selected user data
    const currentUser = users.find(u => u.name === selectedUser);

    return (
       <>
       <Client/>
       <General/>
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="
                w-[450px]
                rounded-2xl
                shadow-[0px_12px_40px_rgba(0,0,0,0.45)]
                border-4
                border-cyan-200
                bg-gradient-to-br
                from-cyan-300
                via-sky-200
                to-blue-100
                p-7
            ">

                <div className="border-4 border-white rounded-xl bg-white/20 p-8">

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Active / Deactive
                    </h2>

                    {/* USER */}
                    <div className="mb-5">

                        <span className="block mb-2 text-lg font-semibold text-gray-800">
                            User Name :
                        </span>

                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="
                                w-full p-3 rounded-lg border-2
                                border-cyan-400 bg-white
                                focus:outline-none focus:ring-4 focus:ring-cyan-300
                            "
                        >
                            <option value="">Select User</option>
                            {users.map((u, i) => (
                                <option key={i}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* STATUS */}
                    <div className="mb-8">

                        <span className="block mb-2 text-lg font-semibold text-gray-800">
                            User Status :
                        </span>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="
                                w-full p-3 rounded-lg border-2
                                border-cyan-400 bg-white
                                focus:outline-none focus:ring-4 focus:ring-cyan-300
                            "
                        >
                            <option>Active</option>
                            <option>Deactive</option>
                        </select>
                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-2 gap-4">

                        <button
                            onClick={() => navigate(-1)}
                            className="
                                bg-gray-600 hover:bg-red-600
                                text-white text-xl font-bold
                                py-4 rounded-xl shadow-lg
                                cursor-pointer
                            "
                        >
                            Go-Back
                        </button>

                        {/* SAVE BUTTON COLOR FIX */}
                        <button
                            onClick={handleSave}
                            disabled={!isFormValid}
                            className={`
                                text-white text-xl font-bold py-4 rounded-xl shadow-lg transition

                                ${
                                    currentUser?.status === "Active"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-gray-500 hover:bg-gray-600"
                                }

                                ${!isFormValid ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                            `}
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