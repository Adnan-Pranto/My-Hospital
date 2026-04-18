import React, { useState, useEffect, useRef } from "react";
import "./Test.css";
import PopupModal from "../../../../PopupModal";
import Client from "../../../../Clients/Client";
export default function Test() {

    const [showPopup, setShowPopup] = useState(false);

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
    const [paid, setPaid] = useState(0);


    // refs (ENTER navigation)
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    useEffect(() => {
        setDoctors(JSON.parse(localStorage.getItem("doctors")) || []);
        setReferers(JSON.parse(localStorage.getItem("referers")) || []);
        setTestsList(JSON.parse(localStorage.getItem("testsList")) || []);
    }, []);

    useEffect(() => {
        localStorage.setItem("doctors", JSON.stringify(doctors));
        localStorage.setItem("referers", JSON.stringify(referers));
        localStorage.setItem("testsList", JSON.stringify(testsList));
    }, [doctors, referers, testsList]);

    const handleTitleChange = (value) => {
        setTitle(value);
        if (value === "Mr") setGender("Male");
        else if (value === "Mrs") setGender("Female");
        else if (value === "Md.") setGender("Male");
        else if (value === "Miss") setGender("Female");
        else setGender("Others");
    };

    const addDoctor = () => {
        const name = prompt("Doctor Name:");
        if (name) setDoctors([...doctors, name]);
    };

    const addReferer = () => {
        const name = prompt("Referer Name:");
        if (name) setReferers([...referers, name]);
    };

    const addTestName = () => {
        const name = prompt("Test Name:");
        const price = prompt("Test Price:");
        if (name && price) {
            setTestsList([...testsList, { name, price: Number(price) }]);
        }
    };

    const filteredDoctors = doctors.filter(d =>
        d.toLowerCase().includes(doctorSearch.toLowerCase())
    );

    const filteredReferers = referers.filter(r =>
        r.toLowerCase().includes(referSearch.toLowerCase())
    );

    const filteredTests = testsList.filter(t =>
        t.name.toLowerCase().includes(testSearch.toLowerCase())
    );

    const addTest = () => {
        if (!testName || !cost) return;

        setTests([
            ...tests,
            { name: testName, cost: Number(cost), comment },
        ]);

        setTestName("");
        setCost("");
        setComment("");
    };

    const removeTest = (i) => {
        setTests(tests.filter((_, index) => index !== i));
    };

    const total = tests.reduce((sum, t) => sum + t.cost, 0);
    const payable = total - discount;
    const finalPaid = paid || payable;
    const due = finalPaid > payable ? 0 : payable - finalPaid;
    const returnMoney = finalPaid > payable ? finalPaid - payable : 0;

    return (
       <>
       <Client/>
       <section id="Patient_information">
         <div className="container">
            <div className="card-box">

                <h2>Patient Information</h2>

                <div className="grid-4">
                    <select className="input-test" onChange={(e) => handleTitleChange(e.target.value)}>
                        <option>Title</option>
                        <option>Mr</option>
                        <option>Md.</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                        <option>Baby</option>
                    </select>

                    <input
                        className="input-test span-2"
                        placeholder="Patient Name"
                        ref={nameRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") phoneRef.current.focus();
                        }}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input className="input-test" value={gender} readOnly />
                </div>

                <div className="grid-4">
                    <input
                        className="input-test"
                        placeholder="Phone"
                        ref={phoneRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addressRef.current.focus();
                        }}
                        maxLength={11}
                        onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            if (v.length <= 11) setPhone(v);
                        }}
                    />

                    <input
                        className="input-test span-3"
                        placeholder="Address"
                        ref={addressRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                document.querySelector(".btn-primary").focus();
                            }
                        }}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Age */}
                <div className="age-row">
                    <span>Age</span>
                    <input className="age-input" placeholder="Y" onChange={(e) => setAgeY(e.target.value)} />
                    <input className="age-input" placeholder="M" onChange={(e) => setAgeM(e.target.value)} />
                    <input className="age-input" placeholder="D" onChange={(e) => setAgeD(e.target.value)} />
                    <span>Date</span> <input type="date" className="dob-input" />
                </div>


                {/* Doctor */}
                <h3>Doctor : </h3>
                <div className="flex-row">
                    <input
                        className="input-test search-input"
                        placeholder="Search Doctor"
                        onChange={(e) => setDoctorSearch(e.target.value)}
                    />

                    <select
                        className="input-test select-small"
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        {filteredDoctors.map((d, i) => (
                            <option key={i}>{d}</option>
                        ))}
                    </select>

                    <button className="btn" onClick={addDoctor}>+ Add</button>
                </div>

                {/* Referer */}
                <h3>Referer :</h3>
                <div className="flex-row">
                    <input
                        className="input-test  search-input"
                        placeholder="Search Referer"
                        onChange={(e) => setReferSearch(e.target.value)}
                    />

                    <select className="input-test select-small"
                        onChange={(e) => setSelectedReferer(e.target.value)}
                    >
                        {filteredReferers.map((r, i) => (
                            <option key={i}>{r}</option>
                        ))}
                    </select>

                    <button className="btn" onClick={addReferer}>+ Add</button>
                </div>

                {/* Test */}
                <h3>Add Test</h3>

                <div className="flex-row">
                    <input
                        className="input-test flex-1"
                        placeholder="Search Test"
                        onChange={(e) => setTestSearch(e.target.value)}
                    />

                    <select
                        className="input-test flex-1"
                        onChange={(e) => {
                            const selected = testsList.find(t => t.name === e.target.value);
                            if (selected) {
                                setTestName(selected.name);
                                setCost(selected.price);
                            }
                        }}
                    >
                        {filteredTests.map((t, i) => (
                            <option key={i}>{t.name}</option>
                        ))}
                    </select>

                    <input className="input-test small" value={cost} readOnly />

                    <input
                        className="input-test flex-1"
                        placeholder="Have any Comments"
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button className="btn" onClick={addTest}>Ok</button>
                    <button className="btn" onClick={addTestName}>Add New</button>
                </div>

                {/* Table */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id.</th>
                            <th>Test</th>
                            <th>Cost</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((t, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{t.name}</td>
                                <td>{t.cost}</td>
                                <td>{t.comment}</td>
                                <td>
                                    <button className="remove-btn" onClick={() => removeTest(i)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Calculation */}
                <div className="calc-grid">
                    <div className="box"><p>Total Amount</p><h3>{total}</h3></div>

                    <div className="box">
                        <p>Discount</p>
                        <input className="input-test" type="number" onChange={(e) => setDiscount(Number(e.target.value))} />
                    </div>

                    <div className="box">
                        <p>Paid Amount</p>
                        <input className="input-test" type="number" onChange={(e) => setPaid(Number(e.target.value))} />
                    </div>

                    <div className="box highlight"><p>Payable</p><h3>{payable}</h3></div>
                    <div className="box highlight"><p>Due</p><h3>{due}</h3></div>
                    <div className="box return"><p>Return</p><h3>{returnMoney}</h3></div>
                </div>

                <div className="right">
                    <button className="btn-primary"
                        onClick={() => setShowPopup(true)}>
                        Save & Print </button>
                    <PopupModal
                        open={showPopup}
                        onClose={() => setShowPopup(false)}
                        data={{
                            title,
                            name,
                            phone,
                            address,
                            gender,
                            age: `${ageY}Y ${ageM}M ${ageD}D`,
                 
                            doctor: selectedDoctor,
                            // referer: selectedReferer,
                            tests,
                            total,
                            discount,
                            paid,
                            payable,
                            due,
                            returnMoney,
                        }}
                    />
                </div>

            </div>
        </div>
        </section></>
    );
}