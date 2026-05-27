import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../../../Clients/Client";
import { Link } from "react-router-dom";
export default function DiscountPercentPopup() {

    const navigate = useNavigate();

    // ✅ All Users Data
    const [users, setUsers] = useState([
        { name: "Rimon", discount: "" },
        { name: "D", discount: "" },
        { name: "Adnan", discount: "" }
    ]);

    // Selected User
    const [selectedUser, setSelectedUser] = useState("Rimon");

    // Current Discount Input
    const currentUser = users.find(u => u.name === selectedUser);

    // Change Discount
    const handleDiscountChange = (value) => {

        const updatedUsers = users.map((u) =>
            u.name === selectedUser
                ? { ...u, discount: value }
                : u
        );

        setUsers(updatedUsers);
    };

    // Save
    const handleSave = () => {

        alert(`${selectedUser} Discount Saved Successfully`);
        console.log(users);
    };

    return (
     <>
     <Client/>
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            {/* POPUP */}
            <div className="
                w-[500px]
                h-[650px]
                rounded-2xl
                shadow-[0px_10px_35px_rgba(0,0,0,0.45)]
                border-4
                border-cyan-200
                bg-gradient-to-br
                from-cyan-300
                via-sky-200
                to-blue-100
                p-8
            ">

                <div className="w-full h-full border-4 border-white rounded-xl p-8 bg-white/20">

                    {/* TITLE */}
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                        Discount Percent
                    </h2>

                    {/* USER */}
                    <div className="mb-6">

                        <span className="block mb-2 text-lg font-semibold text-gray-800">
                            User Name :
                        </span>

                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="
                                w-full
                                p-3
                                rounded-lg
                                border-2
                                border-cyan-400
                                bg-white
                                focus:outline-none
                            "
                        >
                            {users.map((u, i) => (
                                <option key={i} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* DISCOUNT */}
                    <div className="mb-10">

                        <span className="block mb-2 text-lg font-semibold text-gray-800">
                            Discount Percent :
                        </span>

                        <div className="relative">

                            <input
                                type="number"
                                value={currentUser.discount}
                                onChange={(e) =>
                                    handleDiscountChange(e.target.value)
                                }
                                placeholder="Enter Discount"
                                className="
                                    w-full
                                    p-3
                                    rounded-lg
                                    border-2
                                    border-cyan-400
                                    bg-white
                                    text-xl
                                    focus:outline-none
                                "
                            />

                            <span className="absolute right-4 top-3 text-2xl font-bold text-gray-600">
                                %
                            </span>

                        </div>

                    </div>

                    {/* SAVE */}
                    <button
                        onClick={handleSave}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            text-2xl
                            font-bold
                            py-4
                            rounded-xl
                            shadow-lg
                            transition
                            cursor-pointer
                        "
                    >
                        Save
                    </button>

                    {/* BACK */}
                    <button
                        onClick={() => navigate(-1)}
                        className="
                            w-full
                            mt-6
                            bg-gray-600
                            text-white
                            text-2xl
                            font-bold
                            py-4
                            hover:bg-red-600
                            rounded-xl
                            shadow-lg
                            transition
                            cursor-pointer
                        "
                    >
                        Go-Back
                    </button>

                </div>
            </div>
        </div>
     </>
    );
}