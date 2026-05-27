import React, { useEffect, useState } from "react";
import Client from "../../../Clients/Client";
import { useNavigate } from "react-router-dom";

export default function ReferrerInfo() {

  const navigate = useNavigate();

  const [referrers, setReferrers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Basic Info
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [status, setStatus] = useState("Active");

  // Percent Fields
  const [blood, setBlood] = useState("");
  const [urine, setUrine] = useState("");
  const [stool, setStool] = useState("");
  const [ultra, setUltra] = useState("");
  const [echo, setEcho] = useState("");
  const [ecg, setEcg] = useState("");
  const [xray, setXray] = useState("");
  const [hormon, setHormon] = useState("");
  const [histopa, setHistopa] = useState("");
  const [others, setOthers] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    const stored = localStorage.getItem("referrersData");

    if (stored) {
      const parsed = JSON.parse(stored);

      setReferrers(parsed);

      if (parsed.length > 0) {
        const nextId =
          Math.max(...parsed.map((r) => r.id || 12)) + 1;

        setId(nextId);
      }
    }
  }, []);

  // ================= FILTER =================
  const filtered = (referrers || []).filter((r) =>
    (r.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // ================= SELECT =================
  const handleSelect = (r) => {
    setSelectedId(r.id);

    setId(r.id || 1);
    setName(r.name || "");
    setDesignation(r.designation || "");
    setMobile(r.mobile || "");
    setEmail(r.email || "");
    setAddress(r.address || "");
    setFatherName(r.fatherName || "");
    setMotherName(r.motherName || "");
    setStatus(r.status || "Active");

    setBlood(r.blood || "");
    setUrine(r.urine || "");
    setStool(r.stool || "");
    setUltra(r.ultra || "");
    setEcho(r.echo || "");
    setEcg(r.ecg || "");
    setXray(r.xray || "");
    setHormon(r.hormon || "");
    setHistopa(r.histopa || "");
    setOthers(r.others || "");
  };

  // ================= CLEAR =================
  const clearForm = (nextId = 1) => {
    setSelectedId(null);

    setId(nextId);

    setName("");
    setDesignation("");
    setMobile("");
    setEmail("");
    setAddress("");
    setFatherName("");
    setMotherName("");
    setStatus("Active");

    setBlood("");
    setUrine("");
    setStool("");
    setUltra("");
    setEcho("");
    setEcg("");
    setXray("");
    setHormon("");
    setHistopa("");
    setOthers("");
  };

  // ================= SAVE =================
  const handleSave = () => {

    if (!name.trim()) return;

    const stored = localStorage.getItem("referrersData");

    const existing = stored ? JSON.parse(stored) : [];

    const nextId =
      existing.length > 0
        ? Math.max(...existing.map((r) => r.id ||0)) + 1
        : 1;

    const newData = {
      id: nextId,
      name,
      designation,
      mobile,
      email,
      address,
      fatherName,
      motherName,
      status,
      blood,
      urine,
      stool,
      ultra,
      echo,
      ecg,
      xray,
      hormon,
      histopa,
      others
    };

    // ADD TO BOTTOM
    const updatedList = [...existing, newData];

    setReferrers(updatedList);

    localStorage.setItem(
      "referrersData",
      JSON.stringify(updatedList)
    );

    clearForm(nextId + 1);
  };

  // ================= EDIT =================
  const handleEdit = () => {

    if (!selectedId) return;

    const updated = referrers.map((r) =>
      r.id === selectedId
        ? {
            ...r,
            name,
            designation,
            mobile,
            email,
            address,
            fatherName,
            motherName,
            status,
            blood,
            urine,
            stool,
            ultra,
            echo,
            ecg,
            xray,
            hormon,
            histopa,
            others
          }
        : r
    );

    setReferrers(updated);

    localStorage.setItem(
      "referrersData",
      JSON.stringify(updated)
    );

    const nextId =
      updated.length > 0
        ? Math.max(...updated.map((r) => r.id || 0)) + 1
        : 1;

    clearForm(nextId);
  };

  // ================= DELETE =================
  const handleDelete = () => {

    if (!selectedId) return;

    const updated = referrers.filter(
      (r) => r.id !== selectedId
    );

    setReferrers(updated);

    localStorage.setItem(
      "referrersData",
      JSON.stringify(updated)
    );

    const nextId =
      updated.length > 0
        ? Math.max(...updated.map((r) => r.id || 0)) + 1
        : 1;

    clearForm(nextId);
  };

  return (
    <>
      <Client />

      <div className="grid grid-cols-3 gap-4 p-4">

        {/* LEFT */}
        <div className="col-span-1 border p-4 max-h-[90vh] overflow-y-auto shadow-[5px_5px_3px_rgba(0,2,0,0.3)]">

          <input
            className="w-full p-2 border mb-3"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h3 className="text-center p-3 font-bold text-2xl mb-2">
            Referrer List
          </h3>

          {/* DATABASE LIST */}
          {filtered.map((r, i) => (
            <div
              key={r.id}
              onClick={() => handleSelect(r)}
              className="p-2 cursor-pointer text-xl hover:bg-red-200 rounded-md hover:font-bold flex gap-2"
            >
              <span>{i + 1}.</span>
              <span>{r.name}</span>
            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="col-span-2 border p-6">

          <div className="grid grid-cols-2 gap-3">

            <div>
              <span>ID :</span>

              <input
                value={id}
                readOnly
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Name :</span>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Designation :</span>

              <input
                value={designation}
                onChange={(e) =>
                  setDesignation(e.target.value)
                }
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Mobile :</span>

              <input
                value={mobile}
                maxLength={11}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Email :</span>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Address :</span>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Father Name :</span>

              <input
                value={fatherName}
                onChange={(e) =>
                  setFatherName(e.target.value)
                }
                className="border p-2 w-full"
              />
            </div>

            <div>
              <span>Mother Name :</span>

              <input
                value={motherName}
                onChange={(e) =>
                  setMotherName(e.target.value)
                }
                className="border p-2 w-full"
              />
            </div>

            <div className="col-span-2">
              <span>Status :</span>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border p-2 w-full"
              >
                <option>Active</option>
                <option>Deactive</option>
              </select>
            </div>

          </div>

          {/* TEST */}
          <div className="mt-5 border p-4">

            <h4 className="font-bold mb-2">
              Test Commission (%)
            </h4>

            <div className="grid grid-cols-4 gap-2">

              {[
                ["Blood", blood, setBlood],
                ["Urine", urine, setUrine],
                ["Stool", stool, setStool],
                ["Ultra", ultra, setUltra],
                ["Echo", echo, setEcho],
                ["ECG", ecg, setEcg],
                ["Xray", xray, setXray],
                ["Hormon", hormon, setHormon],
                ["Histopa", histopa, setHistopa],
                ["Others", others, setOthers]
              ].map(([label, value, setter], i) => (
                <div key={i}>

                  <span>{label} :</span>

                  <input
                    value={value}
                    onChange={(e) => {

                      const val = e.target.value;

                      if (
                        /^\d*\.?\d{0,2}$/.test(val)
                      ) {
                        setter(val);
                      }
                    }}
                    className="border p-2 w-full"
                    placeholder="0.00"
                  />

                </div>
              ))}

            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-4 gap-3 mt-6">

            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white p-2 cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 cursor-pointer"
            >
              Delete
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white p-2 cursor-pointer"
            >
              Back
            </button>

          </div>

        </div>
      </div>
    </>
  );
}