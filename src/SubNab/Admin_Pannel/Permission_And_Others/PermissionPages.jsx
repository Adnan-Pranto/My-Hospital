import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function PermissionPages() {

    const navigate = useNavigate();

    // USERS
    const users = ["Rimon", "D", "Adnan", "Pranto", "Masum"];

    // SELECTED USER
    const [userName, setUserName] = useState("");

    // TOTAL PAGE
    const totalPermissions = 60;

    // ✅ USER WISE PERMISSION STORAGE
    const [userPermissions, setUserPermissions] = useState({

        Rimon: Array(totalPermissions).fill(false),
        D: Array(totalPermissions).fill(false),
        Adnan: Array(totalPermissions).fill(false),
        Pranto: Array(totalPermissions).fill(false),
        Masum: Array(totalPermissions).fill(false),

    });

    // CURRENT USER PERMISSION
    const permissions =
        userPermissions[userName] || Array(totalPermissions).fill(false);

    // SINGLE CHECKBOX
    const handleCheckbox = (index) => {

        if (!userName) {
            alert("Please Select User First");
            return;
        }

        const updatedPermissions = [...permissions];

        updatedPermissions[index] = !updatedPermissions[index];

        setUserPermissions({
            ...userPermissions,
            [userName]: updatedPermissions
        });
    };

    // SELECT ALL
    const handleSelectAll = () => {

        if (!userName) {
            alert("Please Select User First");
            return;
        }

        setUserPermissions({
            ...userPermissions,
            [userName]: Array(totalPermissions).fill(true)
        });
    };

    // DESELECT ALL
    const handleDeselectAll = () => {

        if (!userName) {
            alert("Please Select User First");
            return;
        }

        setUserPermissions({
            ...userPermissions,
            [userName]: Array(totalPermissions).fill(false)
        });
    };

    // SAVE
    const handleSave = () => {

        if (!userName) {
            alert("Please Select User");
            return;
        }

        console.log(userPermissions);

        alert(`${userName} Permission Saved Successfully`);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-3">

            {/* POPUP */}
            <div
                className="
                w-full
                max-w-[830px]
                h-[95vh]
                rounded-2xl
                shadow-[0px_12px_40px_rgba(0,0,0,0.45)]
                border-4
                border-cyan-200
                bg-gradient-to-br
                from-cyan-300
                via-sky-200
                to-blue-100
                p-4
                overflow-hidden
                "
            >

                {/* INNER */}
                <div className="
                    w-full
                    h-full
                    border-4
                    border-white
                    rounded-xl
                    bg-white/20
                    backdrop-blur-sm
                    p-5
                    flex
                    flex-col
                ">

                    {/* TITLE */}
                    <h2 className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        text-center
                        text-gray-800
                        mb-5
                    ">
                        Permission Pages
                    </h2>

                    {/* USER */}
                    <div className="mb-4">

                        <span className="
                            block
                            mb-2
                            text-lg
                            font-semibold
                            text-gray-800
                        ">
                            User Name :
                        </span>

                        <select
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="
                                w-full
                                p-3
                                rounded-lg
                                border-2
                                border-cyan-400
                                bg-white
                                focus:outline-none
                                focus:ring-4
                                focus:ring-cyan-300
                            "
                        >
                            <option value="">Select User</option>

                            {users.map((user, index) => (
                                <option key={index}>
                                    {user}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* CHECKBOX AREA */}
                    <div className="flex-1 overflow-hidden">

                        <span className="
                            block
                            mb-3
                            text-lg
                            font-semibold
                            text-gray-800
                        ">
                            Permission Of Pages :
                        </span>

                        {/* SCROLL */}
                        <div className="
                            h-full
                            overflow-y-auto
                            border-2
                            border-cyan-300
                            rounded-xl
                            bg-white/60
                            p-4
                        ">

                            {/* ✅ GRID-2 */}
                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-3
                            ">

                                {permissions.map((item, index) => (

                                    <label
                                        key={index}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            bg-white
                                            rounded-lg
                                            p-3
                                            shadow-sm
                                            hover:bg-cyan-100
                                            transition
                                            cursor-pointer
                                            break-words
                                        "
                                    >

                                        <input
                                            type="checkbox"
                                            checked={item}
                                            onChange={() => handleCheckbox(index)}
                                            className="
                                                min-w-[16px]
                                                h-4
                                                cursor-pointer
                                            "
                                        />

                                        <span className="
                                            font-medium
                                            text-gray-700
                                            text-sm
                                        ">
                                            Permission {index + 1}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>

                    {/* BUTTON AREA */}
                    <div className="mt-5 space-y-3">

                        {/* SELECT / DESELECT */}
                        <div className="flex gap-3">

                            <button
                                onClick={handleSelectAll}
                                className="
                                    flex-1
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    py-3
                                    rounded-xl
                                    shadow-lg
                                    transition
                                    font-bold
                                    cursor-pointer
                                "
                            >
                                Select All
                            </button>

                            <button
                                onClick={handleDeselectAll}
                                className="
                                    flex-1
                                    bg-orange-500
                                    hover:bg-orange-600
                                    text-white
                                    py-3
                                    rounded-xl
                                    shadow-lg
                                    transition
                                    font-bold
                                    cursor-pointer
                                "
                            >
                                Deselect All
                            </button>

                        </div>

                        {/* SAVE / BACK */}
                        <div className="flex gap-3">

                            <button
                                onClick={handleSave}
                                className="
                                    flex-1
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    py-3
                                    rounded-xl
                                    shadow-lg
                                    transition
                                    font-bold
                                    cursor-pointer
                                "
                            >
                                Save
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="
                                    flex-1
                                    bg-gray-600
                                    hover:bg-red-600
                                    text-white
                                    py-3
                                    rounded-xl
                                    shadow-lg
                                    transition
                                    font-bold
                                    cursor-pointer
                                "
                            >
                                Go-Back
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}