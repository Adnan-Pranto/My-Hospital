import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportForTwo() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState("2026-05-25");

  const [investigations, setInvestigations] = useState([]);
  const [testResults, setTestResults] = useState({});

  const [doctorName, setDoctorName] = useState("Tangail Medical College Hospital");
  const [techName, setTechName] = useState("Rubel Ahamed");

  // Load Patients
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(saved);
  }, []);

  const filteredPatients = useMemo(() => {
    let result = patients;

    if (searchTerm) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(p.patientId || p.id || "").includes(searchTerm)
      );
    }

    if (fromDate && toDate) {
      result = result.filter(patient => {
        const patientDate = patient.date || patient.sampleDate || patient.entryDate;
        if (!patientDate) return false;
        const pDate = new Date(patientDate);
        const start = new Date(fromDate);
        const end = new Date(toDate);
        return pDate >= start && pDate <= end;
      });
    }

    return result;
  }, [patients, searchTerm, fromDate, toDate]);

  // ================= FIXED DATA LOADING =================
 // ================= FIXED DATA LOADING =================
useEffect(() => {
  if (!selectedPatient?.tests) {
    setInvestigations([]);
    setTestResults({});
    return;
  }

  const patientTests = selectedPatient.tests.map((test, index) => ({
    id: index + 1,
    name: test.name || test.testName,
    testId: test.testId || test.id,
    selected: true,
  }));

  setInvestigations(patientTests);

  const savedParams = JSON.parse(localStorage.getItem("testParameters") || "{}");
  const savedTests = JSON.parse(localStorage.getItem("tests") || "[]");

  const loadedResults = {};

  patientTests.forEach((test) => {

    // ================= FIRST PRIORITY : MATCH BY TEST ID =================
    if (test.testId && savedParams[test.testId]) {
      loadedResults[test.id] = savedParams[test.testId];
    }

    // ================= SECOND PRIORITY : MATCH BY TEST NAME =================
    else {
      Object.keys(savedParams).forEach((key) => {
        const params = savedParams[key];

        // Find original test from tests list
        const matchedTest = savedTests.find(
          (t) => String(t.testId) === String(key)
        );

        const savedTestName = matchedTest?.testName || "";

        if (
          savedTestName.toLowerCase().trim() ===
          test.name?.toLowerCase().trim()
        ) {
          loadedResults[test.id] = params;
        }
      });
    }
  });

  setTestResults(loadedResults);

}, [selectedPatient]);

  const toggleInvestigation = (id) => {
    setInvestigations(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAll = () => setInvestigations(prev => prev.map(item => ({ ...item, selected: true })));
  const deselectAll = () => setInvestigations(prev => prev.map(item => ({ ...item, selected: false })));

  const updateResult = (testId, index, field, value) => {
    setTestResults(prev => {
      const testData = prev[testId] || [];
      const updated = [...testData];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, [testId]: updated };
    });
  };

  const handleShow = () => {
    if (filteredPatients.length > 0) {
      setSelectedPatient(filteredPatients[0]);
    }
  };

  const handlePrint = () => {
    const selectedTests = investigations.filter(t => t.selected);

    if (!selectedPatient || selectedTests.length === 0) {
      return alert("Please select patient and tests");
    }

    let printContent = `
      <html>
        <head>
          <title>Pathology Report</title>
          <style>
            @page { size: A4; margin: 0.5in; }
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1e40af; padding-bottom: 20px; }
            .patient-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; margin: 25px 0; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin: 25px 0; }
            th, td { border: 1px solid #333; padding: 10px; text-align: left; }
            th { background-color: #1e40af; color: white; }
            .test-title { font-size: 20px; font-weight: bold; color: #1e40af; text-align: center; margin: 40px 0 15px; }
            .footer { margin-top: 60px; display: flex; justify-content: space-between; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Medplus Hospital & Hormone Center</h1>
            <p>Tangail Medical College Hospital, Tangail</p>
          </div>
    `;

    printContent += `
      <div class="patient-info">
        <div><strong>ID No.:</strong> ${selectedPatient.patientId || selectedPatient.id}</div>
        <div><strong>Sample Received:</strong> ${selectedPatient.date || fromDate}</div>
        <div><strong>Patient Name:</strong> ${selectedPatient.name}</div>
        <div><strong>Age:</strong> ${selectedPatient.ageY}</div>
        <div><strong>Gender:</strong> ${selectedPatient.gender}</div>
        <div><strong>Referred By:</strong> ${doctorName}</div>
      </div>
    `;

    selectedTests.forEach(test => {
      const results = testResults[test.id] || [];
      if (results.length > 0) {
        printContent += `
          <div class="test-title">Report for ${test.name}</div>
          <table>
            <thead>
              <tr>
                <th>Test / Part of Test Name</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Reference Value</th>
              </tr>
            </thead>
            <tbody>
        `;

        results.forEach(row => {
          printContent += `
            <tr>
              <td>${row.partOfTest}</td>
              <td>${row.result || '-'}</td>
              <td>${row.unit || '-'}</td>
              <td>${row.referenceValue || '-'}</td>
            </tr>
          `;
        });

        printContent += `</tbody></table>`;
      }
    });

    printContent += `
          <div class="footer">
            <div><strong>${techName}</strong><br>Medical Technologist (Lab)</div>
            <div><strong>Prof. Dr. Mohammad Ali Khan</strong><br>MBBS, BCS(Health), M.Phil<br>Ex. Principal Tangail Medical College</div>
          </div>
        </body>
      </html>
    `;

    const printWin = window.open("", "_blank");
    printWin.document.write(printContent);
    printWin.document.close();
    setTimeout(() => printWin.print(), 600);
  };

  const currentSelected = investigations.filter(t => t.selected);

  return (
    <div className="min-h-screen bg-slate-50 p-3 font-sans">
      <div className="max-w-[98vw] mx-auto h-[98vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">

        {/* Top Bar - Unchanged */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-2">
          <div className="grid grid-cols-12 gap-6 items-center">

            <div className="col-span-6 flex items-center gap-6">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-white font-semibold text-lg whitespace-nowrap">Report From :</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl border border-white/30 bg-white/95 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                onClick={handleShow}
                className="bg-black text-blue-700 hover:bg-green-700 font-bold text-2xl py-3.5 px-0 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-3"
              >
                🔍 Show
              </button>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-white font-semibold text-lg whitespace-nowrap">And End :</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl border border-white/30 bg-white/95 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div className="col-span-4 flex items-center justify-end gap-6">
              <h1 className="text-4xl font-bold tracking-wide">Pathology Report</h1>
            </div>
          </div>
        </div>

        {/* Rest of your original UI */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT PANEL - Unchanged */}
          <div className="w-[320px] border-r border-red-500 flex flex-col bg-slate-50">
            {selectedPatient && (
              <div className="p-5 bg-white border-b">
                <h3 className="font-semibold text-xl mb-5">Patient Information</h3>
                <div className="grid grid-cols-2 gap-x-0 gap-y-1 text-base">
                  <div className="font-medium text-slate-700">ID:</div>
                  <div className="font-semibold">{selectedPatient.patientId || selectedPatient.id}</div>
                  <div className="font-medium text-slate-700">Name:</div>
                  <div className="font-semibold text-lg">{selectedPatient.name}</div>
                  <div className="font-medium text-slate-700">Age:</div>
                  <div className="font-semibold">{selectedPatient.ageY}</div>
                  <div className="font-medium text-slate-700">Gender:</div>
                  <div className="font-semibold">{selectedPatient.gender}</div>
                  <div className="font-medium text-slate-700">Mobile:</div>
                  <div className="font-semibold">{selectedPatient.phone}</div>
                  <div className="font-medium text-slate-700">Doctor:</div>
                  <input value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="border-b focus:outline-none text-base font-medium" />
                </div>
              </div>
            )}

            <div className="p-4 border-b bg-white">
              <input type="text" placeholder="Search by Name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:border-blue-500 focus:outline-none" />
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <div key={patient.id} onClick={() => setSelectedPatient(patient)} className={`px-5 py-4 border-b cursor-pointer transition-all hover:bg-blue-50 ${selectedPatient?.id === patient.id ? 'bg-blue-100 border-l-4 border-blue-600' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-medium w-6">SL. {index + 1}</span>
                      <div>
                        <div className="font-semibold text-slate-800">{patient.patientId || patient.id} - {patient.name}</div>
                        <div className="text-xs text-slate-500">{patient.age} • {patient.gender} • {patient.date || patient.sampleDate}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-red-600 font-medium">No patients found in selected date range.</div>
              )}
            </div>
          </div>

          {/* MIDDLE - Investigations */}
          <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
            <div className="p-5 border-b">
              <h3 className="font-semibold text-xl mb-4">Investigations</h3>
              <div className="flex gap-3">
                <button onClick={selectAll} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer transition">Select All</button>
                <button onClick={deselectAll} className="flex-1 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-xl cursor-pointer transition">Deselect</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {investigations.map((inv) => (
                <label key={inv.id} className={`flex items-center gap-3 px-4 py-4 rounded-2xl cursor-pointer transition-all border ${inv.selected ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'hover:bg-slate-100 border-transparent'}`}>
                  <input type="checkbox" checked={inv.selected} onChange={() => toggleInvestigation(inv.id)} className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                  <span className="font-medium">{inv.name}</span>
                </label>
              ))}
            </div>

            <div className="p-4 border-t text-center text-sm text-slate-500">
              Selected: <strong>{currentSelected.length}</strong> test(s)
            </div>
          </div>

          {/* RIGHT - Results Editor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-slate-800 to-slate-900 text-white">
              <h2 className="text-2xl font-semibold">
                {selectedPatient ? selectedPatient.name : "Select a Patient"}
              </h2>
              <p className="text-slate-400">Enter / Modify Test Results</p>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-10">
              {currentSelected.length === 0 ? (
                <div className="h-full flex items-center justify-center text-2xl text-slate-300">
                  No test selected
                </div>
              ) : (
                currentSelected.map((test) => {
                  const results = testResults[test.id] || [];
                  return (
                    <div key={test.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-slate-800 text-white px-6 py-4 font-semibold text-lg">
                        {test.name}
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="p-4 w-12 text-left">SL</th>
                            <th className="p-4 text-left">Test / Part of Test Name</th>
                            <th className="p-4 text-left">Result</th>
                            <th className="p-4 text-left">Unit</th>
                            <th className="p-4 text-left">Reference Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {results.length > 0 ? (
                            results.map((row, idx) => (
                              <tr key={idx} className="hover:bg-blue-50 transition">
                                <td className="p-4 text-center font-medium">{idx + 1}</td>
                                <td className="p-4 font-medium">{row.partOfTest}</td>
                                <td className="p-4">
                                  <input value={row.result || ""} onChange={(e) => updateResult(test.id, idx, "result", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                                </td>
                                <td className="p-4">
                                  <input value={row.unit || ""} onChange={(e) => updateResult(test.id, idx, "unit", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                                </td>
                                <td className="p-4">
                                  <input value={row.referenceValue || ""} onChange={(e) => updateResult(test.id, idx, "referenceValue", e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center py-12 text-red-500">
                                No parameters found for <strong>{test.name}</strong><br/>
                                Please save parameters first in TestParameterDetails
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  );
                })
              )}
            </div>

            <div className="grid grid-cols-7 gap-4 items-center p-4 border-t">
              <button onClick={handlePrint} className="col-span-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-2xl hover:brightness-110 cursor-pointer transition-all flex items-center justify-center gap-2 shadow">
                🖨️ Preview & Print Report
              </button>
              <button className="col-span-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 cursor-pointer transition">
                Save / Edit
              </button>
              <div className="col-span-1"></div>
              <button onClick={() => navigate(-1)} className="col-span-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-2xl hover:bg-slate-800 cursor-pointer transition">
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 