import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Testingper = () => {
  const navigate = useNavigate();

  const [tests] = useState(() => {
    const saved = localStorage.getItem("tests");
    return saved ? JSON.parse(saved) : [
      { testId: "1", testName: "ANA TEST" },
      { testId: "2", testName: "CBC" },
      { testId: "3", testName: "Blood Sugar" },
      { testId: "4", testName: "Lipid Profile" },
      { testId: "5", testName: "TSH" },
      { testId: "6", testName: "Serum Creatinine" },
      { testId: "7", testName: "Anti H. Pylori" },
    ];
  });

  const [selectedTest, setSelectedTest] = useState(null);
  const [search, setSearch] = useState("");

  const [parameters, setParameters] = useState(() => {
    const saved = localStorage.getItem("testParameters");
    return saved ? JSON.parse(saved) : {};
  });

  const currentParams = selectedTest ? parameters[selectedTest.testId] || [] : [];

  const [form, setForm] = useState({
    sl: "", partOfTest: "", result: "", unit: "", referenceValue: "", hormoneValue: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const filteredTests = useMemo(() => {
    return tests.filter(test =>
      test.testName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tests]);

  // Auto Save to localStorage
  useEffect(() => {
    localStorage.setItem("testParameters", JSON.stringify(parameters));
  }, [parameters]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!selectedTest || !form.partOfTest.trim()) {
      alert("Please select a test and fill Part of Test");
      return;
    }

    const newRow = {
      sl: form.sl || (currentParams.length + 1).toString(),
      partOfTest: form.partOfTest,
      result: form.result,
      unit: form.unit,
      referenceValue: form.referenceValue,
      hormoneValue: form.hormoneValue,
    };

    const testKey = selectedTest.testId;

    if (editingIndex !== null) {
      const updated = [...currentParams];
      updated[editingIndex] = newRow;
      setParameters(prev => ({ ...prev, [testKey]: updated }));
      setEditingIndex(null);
    } else {
      setParameters(prev => ({
        ...prev,
        [testKey]: [...(prev[testKey] || []), newRow]
      }));
    }

    setForm({ sl: "", partOfTest: "", result: "", unit: "", referenceValue: "", hormoneValue: "" });
  };

  const handleEditRow = (index) => {
    setForm(currentParams[index]);
    setEditingIndex(index);
  };

  const handleDeleteRow = (index) => {
    if (!selectedTest) return;
    const testKey = selectedTest.testId;
    const updated = currentParams.filter((_, i) => i !== index);
    setParameters(prev => ({ ...prev, [testKey]: updated }));
  };

  const handleClear = () => {
    setForm({ sl: "", partOfTest: "", result: "", unit: "", referenceValue: "", hormoneValue: "" });
    setEditingIndex(null);
  };

  const handleSaveAll = () => {
    if (!selectedTest) return;
    localStorage.setItem("testParameters", JSON.stringify(parameters));
    alert(`✅ ${selectedTest.testName} এর সকল প্যারামিটার সেভ হয়েছে!`);
  };

  const handlePrint = () => {
    if (!selectedTest || currentParams.length === 0) {
      alert("No data to print!");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedTest.testName}</title>
          <style>
            @page { size: A4 portrait; margin: 0.5in; }
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #1e40af; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #333; padding: 10px; text-align: left; }
            th { background-color: #1e40af; color: white; }
          </style>
        </head>
        <body>
          <h1>${selectedTest.testName}</h1>
          <p style="text-align:center;">Diagnostic Test Parameters Report</p>
          <table>
            <thead>
              <tr>
                <th>S.L No.</th>
                <th>Part of Test</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Reference Value</th>
                <th>R. Value of Hormone</th>
              </tr>
            </thead>
            <tbody>
              ${currentParams.map(row => `
                <tr>
                  <td>${row.sl}</td>
                  <td>${row.partOfTest}</td>
                  <td>${row.result || '-'}</td>
                  <td>${row.unit || '-'}</td>
                  <td>${row.referenceValue || '-'}</td>
                  <td>${row.hormoneValue || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-4 font-sans overflow-hidden">
      <div className="max-w-[98vw] mx-auto h-[98vh] flex flex-col overflow-hidden">

        <div className="flex-1 grid grid-cols-12 gap-4 h-full overflow-hidden">

          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-3 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/30">
            <div className="p-5 border-b bg-white">
              <input
                type="text"
                placeholder="🔍 Search Test Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredTests.map((test) => (
                <div
                  key={test.testId}
                  onClick={() => {
                    setSelectedTest(test);
                    setEditingIndex(null);
                    handleClear();
                  }}
                  className={`px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 font-medium text-lg ${
                    selectedTest?.testId === test.testId
                      ? "bg-blue-600 text-white shadow-lg"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {test.testName}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Same as before */}
          <div className="col-span-12 lg:col-span-9 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/30">
            {/* ... (আপনার আগের কোডের বাকি অংশ একদম অপরিবর্তিত) ... */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
              <h2 className="text-3xl font-bold">
                {selectedTest ? selectedTest.testName : "Select a Test from Left Side"}
              </h2>
              <p className="text-blue-100 mt-1">Manage Test Parameters</p>
            </div>

            <div className="p-6 border-b bg-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input type="text" name="sl" value={form.sl} onChange={handleInputChange} placeholder="S.L No." className="px-5 py-3 border rounded-2xl focus:outline-none focus:border-blue-500" />
              <input type="text" name="partOfTest" value={form.partOfTest} onChange={handleInputChange} placeholder="Part of Test *" className="px-5 py-3 border rounded-2xl focus:outline-none focus:border-blue-500" />
              <input type="text" name="result" value={form.result} onChange={handleInputChange} placeholder="Result" className="px-5 py-3 border rounded-2xl focus:outline-none focus:border-blue-500" />
              <input type="text" name="unit" value={form.unit} onChange={handleInputChange} placeholder="Unit" className="px-5 py-3 border rounded-2xl focus:outline-none focus:border-blue-500" />
              <input type="text" name="referenceValue" value={form.referenceValue} onChange={handleInputChange} placeholder="Reference Value" className="px-5 py-3 border rounded-2xl focus:outline-none focus:border-blue-500" />
              <input type="text" name="hormoneValue" value={form.hormoneValue} onChange={handleInputChange} placeholder="R. Value of Hormone" className="px-5 py-3 border rounded-2xl focus:outline-none focus:border-blue-500" />
            </div>

            <div className="px-6 py-5 bg-white border-b">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <button onClick={handleAddOrUpdate} className="bg-emerald-500 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-semibold transition-all active:scale-95 cursor-pointer">
                  {editingIndex !== null ? "Update Row" : "➕ Add Row"}
                </button>
                <button onClick={handleClear} className="bg-amber-500 hover:bg-amber-700 text-white py-3.5 rounded-2xl font-semibold transition-all active:scale-95 cursor-pointer">
                  Clear
                </button>
                <button onClick={handleSaveAll} className="bg-blue-500 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold transition-all active:scale-95 cursor-pointer">
                  💾 Save All
                </button>
                <button onClick={handlePrint} className="bg-violet-500 hover:bg-violet-700 text-white py-3.5 rounded-2xl font-semibold transition-all active:scale-95 cursor-pointer">
                  🖨️ Print
                </button>
                <button onClick={() => navigate(-1)} className="bg-red-500 hover:bg-red-700 text-white py-3.5 rounded-2xl font-semibold transition-all active:scale-95 cursor-pointer">
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-slate-800 text-white z-10">
                  <tr>
                    <th className="p-4 text-left">S.L No.</th>
                    <th className="p-4 text-left">Part of Test</th>
                    <th className="p-4 text-left">Result</th>
                    <th className="p-4 text-left">Unit</th>
                    <th className="p-4 text-left">Reference Value</th>
                    <th className="p-4 text-left">R. Value of Hormone</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentParams.length > 0 ? (
                    currentParams.map((row, index) => (
                      <tr key={index} className="hover:bg-blue-50">
                        <td className="p-4 font-medium">{row.sl}</td>
                        <td className="p-4">{row.partOfTest}</td>
                        <td className="p-4">{row.result}</td>
                        <td className="p-4">{row.unit}</td>
                        <td className="p-4 text-blue-700 font-medium">{row.referenceValue}</td>
                        <td className="p-4 text-purple-700">{row.hormoneValue}</td>
                        <td className="p-4 text-center space-x-3">
                          <button onClick={() => handleEditRow(index)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl font-medium cursor-pointer">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteRow(index)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-1.5 rounded-xl font-medium cursor-pointer">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-20 text-gray-400">
                        No parameters added yet.<br />Click "<strong>Add Row</strong>" button
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testingper;