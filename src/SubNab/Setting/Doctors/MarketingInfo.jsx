import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../../../Clients/Client";

export default function MarketingInfo() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const [id, setId] = useState(1);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [nid, setNid] = useState("");

    const [market, setMarket] = useState("");

    // 🔥 ADD THIS STATE
    const [search, setSearch] = useState("");


    // 🔥 ADD THIS FILTER
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // Auto ID
    useEffect(() => {
        setId(data.length + 1);
    }, [data]);

    // ✅ Required Field
    const isFormValid =
        name.trim() !== "" &&
        phone.trim() !== "" &&
        nid.trim() !== "";

    // Save
    const handleSave = () => {

        if (!isFormValid) return;

        const confirmSave = window.confirm("Do you want to save this?");
        if (!confirmSave) return;

        const newItem = {
            id,
            name,
            phone,
            email,
            fatherName,
            motherName,
            nid,
            market
        };

        setData([...data, newItem]);

        clearForm();
    };

    // Select
    const handleSelect = (item) => {

        setSelectedId(item.id);

        setId(item.id);

        setName(item.name);
        setPhone(item.phone);
        setEmail(item.email);
        setFatherName(item.fatherName);
        setMotherName(item.motherName);
        setNid(item.nid);

        setMarket(item.market);
    };

    // Clear
    const clearForm = () => {

        setSelectedId(null);

        setName("");
        setPhone("");
        setEmail("");
        setFatherName("");
        setMotherName("");
        setNid("");

        setMarket("");
    };

    // Edit
    const handleEdit = () => {

        if (!selectedId) {
            alert("Please select a record first!");
            return;
        }

        const updated = data.map((item) =>
            item.id === selectedId
                ? {
                    id,
                    name,
                    phone,
                    email,
                    fatherName,
                    motherName,
                    nid,
                    market
                }
                : item
        );

        setData(updated);

        clearForm();
    };

    // Delete
    const handleDelete = () => {

        if (!selectedId) {
            alert("Please select a record first!");
            return;
        }

        const confirmDelete = window.confirm("Are you sure to delete?");
        if (!confirmDelete) return;

        const updated = data.filter((item) => item.id !== selectedId);

        setData(updated);

        clearForm();
    };

    // Print
    const handlePrint = () => {

        if (!selectedId) {
            alert("Please select a record first!");
            return;
        }

        const selectedData = data.find(d => d.id === selectedId);

        const printWindow = window.open("", "", "width=900,height=700");

        printWindow.document.write(`
    <html>
    <head>
      <title>Print</title>

      <style>

        @page {
          size: A4;
          margin-top: 2in;
          margin-left: 0.5in;
          margin-right: 0.5in;
          margin-bottom: 0.5in;
        }

        body {
          font-family: Arial;
          padding: 20px;
        }

        .header {
          position: fixed;
          top: -1.5in;
          width: 100%;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        table, th, td {
          border: 1px solid black;
        }

        th, td {
          padding: 8px;
        }

      </style>

    </head>

    <body>

      <div class="header">
        <h2>Comfort Hospital</h2>
        <p>Address: Your Hospital Address</p>
      </div>

      <h3 style="text-align:center;">Marketing Officer Info</h3>

      <table>

        <tr>
          <th>ID</th>
          <td>${selectedData.id}</td>
        </tr>

        <tr>
          <th>Name</th>
          <td>${selectedData.name}</td>
        </tr>

        <tr>
          <th>Phone</th>
          <td>${selectedData.phone}</td>
        </tr>

        <tr>
          <th>Email</th>
          <td>${selectedData.email}</td>
        </tr>

        <tr>
          <th>Father Name</th>
          <td>${selectedData.fatherName}</td>
        </tr>

        <tr>
          <th>Mother Name</th>
          <td>${selectedData.motherName}</td>
        </tr>

        <tr>
          <th>NID Number</th>
          <td>${selectedData.nid}</td>
        </tr>

        <tr>
          <th>Market</th>
          <td>${selectedData.market}</td>
        </tr>

      </table>

      <script>
        window.print();
      </script>

    </body>
    </html>
  `);

        printWindow.document.close();
    };

    return (
        <>
            <Client />

            {/* MAIN */}
            <div className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
                p-4
                bg-gradient-to-br
                from-blue-50
                to-cyan-100
                h-[94vh]
                overflow-hidden
            ">
                {/* LEFT Grid colum */}

                <div className="
                    border
                    rounded-xl
                    shadow-md
                    p-4
                    bg-white
                    flex
                    flex-col
                    overflow-hidden
                ">

                    <h3 className="
                        font-extrabold
                        text-2xl
                        mb-2
                        text-gray-700
                    ">
                        Marketing Officer's Name:
                    </h3>

                    {/* 🔥 SEARCH BOX */}
                    <input
                        type="text"
                        placeholder="Search Marketing Officer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
            border
            p-2
            rounded-lg
            mb-3
            focus:outline-blue-400
        "
                    />
                    <div className="
        border
        rounded
        flex-1
        overflow-y-auto
        p-2
    ">
                        {filteredData.map((d, i) => (

                            <div
                                key={d.id}
                                onClick={() => handleSelect(d)}
                                className="
                                    cursor-pointer
                                    hover:bg-green-100
                                    hover:font-bold
                                    p-1
                                    text-blue-800
                                    text-xl
                                    rounded
                                    transition
                                "
                            >
                                {i + 1}. {d.name}
                            </div>

                        ))}

                    </div>
                    {/* BUTTONS */}
                    <button
                        onClick={handlePrint}
                        className="
                            w-full
                            mt-4
                            p-2
                            rounded-lg
                            bg-purple-500
                            hover:bg-purple-600
                            cursor-pointer
                            text-white
                            transition
                        "
                    >
                        Print
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="
                            w-full
                            mt-2
                            p-2
                            rounded-lg
                            bg-red-500
                            hover:bg-red-600
                            cursor-pointer
                            text-white
                            transition
                        "
                    >
                        Go Back
                    </button>

                </div>

                {/* RIGHT */}
                <div className="
                    border
                    rounded-xl
                    shadow-md
                    p-4
                    bg-white
                    overflow-y-auto
                ">

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-1
                        gap-3
                    ">

                        {/* ID */}
                        <div>
                            <span className="text-sm font-medium">
                                Marketing Officer Id :
                            </span>

                            <input
                                value={id}
                                readOnly
                                className="
                                    border
                                    w-full
                                    p-2
                                    rounded
                                    mt-1
                                "
                            />
                        </div>

                        {/* NAME */}
                        <div>
                            <span className="text-sm font-medium">
                                Marketing Officer Name :
                            </span>

                            <input
                                value={name}
                                placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)}
                                className="
                                    border
                                    w-full
                                    p-2
                                    rounded
                                    mt-1
                                    focus:outline-blue-400
                                "
                            />
                        </div>

                        {/* PHONE */}
                        <div>
                            <span className="text-sm font-medium">
                                Phone Number :
                            </span>

                            <input
                                value={phone}
                                maxLength={11}
                                placeholder="01XXXXXXXXX"
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                className="
                                    border
                                    w-full
                                    p-2
                                    rounded
                                    mt-1
                                    focus:outline-blue-400
                                "
                            />
                        </div>

                        {/* NID */}
                        <div>
                            <span className="text-sm font-medium">
                                NID Number :
                            </span>

                            <input
                                type="number"
                                value={nid}
                                placeholder="Enter NID Number"
                                onChange={(e) => setNid(e.target.value)}
                                className="
                                    border
                                    w-full
                                    p-2
                                    rounded
                                    mt-1
                                    focus:outline-blue-400
                                "
                            />
                        </div>

                        {/* FATHER */}
                        <div>
                            <span className="text-sm font-medium">
                                Father Name :
                            </span>

                            <input
                                value={fatherName}
                                placeholder="Father Name"
                                onChange={(e) => setFatherName(e.target.value)}
                                className="
                                    border
                                    w-full
                                    p-2
                                    rounded
                                    mt-1
                                    focus:outline-blue-400
                                "
                            />
                        </div>

                        {/* MOTHER */}
                        <div>
                            <span className="text-sm font-medium">
                                Mother Name :
                            </span>

                            <input
                                value={motherName}
                                placeholder="Mother Name"
                                onChange={(e) => setMotherName(e.target.value)}
                                className="
                                    border
                                    w-full
                                    p-2
                                    rounded
                                    mt-1
                                    focus:outline-blue-400
                                "
                            />
                        </div>

                    </div>

                    {/* MARKET */}
                    <div className="mt-3">

                        <span className="text-sm font-medium">
                            Market Details :
                        </span>

                        <textarea
                            value={market}
                            placeholder="Enter Market Details"
                            onChange={(e) => setMarket(e.target.value)}
                            className="
                                border
                                w-full
                                p-2
                                h-24
                                rounded
                                mt-1
                                focus:outline-blue-400
                            "
                        />

                    </div>

                    {/* BUTTONS */}
                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        mt-6
                    ">

                        <button
                            onClick={handleSave}
                            disabled={!isFormValid}
                            className={`
                                p-3
                                rounded-lg
                                transition
                                cursor-pointer
                                ${isFormValid
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }
                            `}
                        >
                            Save
                        </button>

                        <button
                            onClick={handleEdit}
                            className="
                                p-3
                                rounded-lg
                                bg-yellow-500
                                hover:bg-yellow-600
                                text-white
                                transition
                                cursor-pointer
                            "
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="
                                p-3
                                rounded-lg
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                transition
                                cursor-pointer
                            "
                        >
                            Delete
                        </button>

                        <button
                            onClick={clearForm}
                            className="
                                p-3
                                rounded-lg
                                bg-orange-500
                                hover:bg-orange-600
                                text-white
                                transition
                                cursor-pointer
                            "
                        >
                            New
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}