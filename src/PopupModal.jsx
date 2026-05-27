import React, { useRef } from "react";
import Barcode from "react-barcode";

export default function PopupModal({ open, onClose, data }) {
    const printRef = useRef();

    if (!open || !data) return null;

    const patientPhone = data.phone || "00000000000";
    const issueDateTime = data.date 
        ? new Date(data.date).toLocaleString('en-GB') 
        : new Date().toLocaleString('en-GB');

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const newWindow = window.open("", "", "width=1000,height=950");

        newWindow.document.write(`
            <html>
                <head>
                    <title>Dream Hospital - Money Receipt</title>
                    <style>
                        @page { size: A5; margin: 8mm; }
                        body { 
                            font-family: Arial, sans-serif; 
                            font-size: 14.5px; 
                            line-height: 1.15;   /* কমানো হয়েছে */
                            padding: 12px;
                        }
                        h2 { text-align: center; margin: 6px 0; font-size: 23px; }
                        .hospital-info { text-align: center; margin-bottom: 10px; font-size: 14px; }
                        .two-col { display: flex; justify-content: space-between; gap: 20px; margin: 12px 0; }
                        .left { flex: 1; }
                        .right { flex: 1; text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
                        th, td { border: 1px solid #ddd; padding: 6px 8px; }
                        th { background: #f8f9fa; }
                        .cost { text-align: right; }
                        .comment { text-align: center; }
                        .summary { display: flex; justify-content: space-between; margin-top: 15px; }
                        .summary-left { text-align: left; }
                        .summary-right { text-align: right; }
                        hr { border: 0; border-top: 1px dashed #666; margin: 10px 0; }
                    </style>
                </head>
                <body>
                    ${printContents}
                </body>
            </html>
        `);

        newWindow.document.close();
        setTimeout(() => {
            newWindow.print();
            setTimeout(() => newWindow.close(), 600);
        }, 700);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[10000] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[580px] max-h-[96vh] overflow-auto">

                <div ref={printRef} className="p-8 text-sm">
                    <h2>Money Receipt<br />Dream Hospital, Tangail</h2>

                    <div className="hospital-info">
                        <p><strong>Address:</strong> Sabaliya, Tangail &nbsp;&nbsp;&nbsp; <strong>Mobile:</strong> 01896036830</p>
                    </div>

                    <hr />

                    <div className="two-col">
                        <div className="left space-y-1">
                            <p><strong>Patient ID:</strong> {data.patientId}</p>
                            <p><strong>Name:</strong> {data.title} {data.name}</p>
                            <p><strong>Phone:</strong> {data.phone}</p>
                            <p><strong>Address:</strong> {data.address}</p>
                            <p><strong>Date:</strong> {issueDateTime}</p>
                            <p><strong>Referer:</strong> {data.referer || "N/A"}</p>
                        </div>

                        <div className="right">
                            <Barcode
                                value={patientPhone}
                                format="CODE128"
                                width={2.0}
                                height={70}
                                displayValue={true}
                                fontSize={13}
                                lineColor="#000"
                                background="#fff"
                            />
                            <div className="mt-3 text-sm">
                                <p><strong>Gender:</strong> {data.gender}</p>
                                <p><strong>Age:</strong> {data.age}</p>
                                <p><strong>Doctor:</strong> {data.doctor || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 className="font-semibold mt-4 mb-2">Tests</h3>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "45%" }}>Test Name</th>
                                <th className="comment" style={{ width: "30%" }}>Comment</th>
                                <th className="cost" style={{ width: "25%" }}>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.tests?.map((t, i) => (
                                <tr key={i}>
                                    <td>{t.name}</td>
                                    <td className="comment">{t.comment || "-"}</td>
                                    <td className="cost">৳ {t.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <hr />

                    {/* Summary - আপনার মার্ক করা অনুযায়ী */}
                    <div className="summary">
                        <div className="summary-left">
                            <h3>Paid: <strong>{data.paid} ৳</strong></h3>
                            <h3 style={{ color: "#d32f2f", fontWeight: "bold" }}>
                                Due: <strong>{data.due} ৳</strong>
                            </h3>
                        </div>

                        <div className="summary-right">
                            <p>Total Amount: <strong>{data.total} ৳</strong></p>
                            <p>Discount: <strong>{data.discount} ৳</strong></p>
                            <p>Payable: <strong>{data.payable} ৳</strong></p>
                        </div>
                    </div>

                    <hr />
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#444", fontSize: "13.5px" }}>
                        Thank You for Choosing Dream Hospital
                    </p>
                </div>

                {/* Buttons */}
                <div className="sticky bottom-0 bg-white border-t p-6 flex flex-col gap-3">
                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-white font-bold text-lg cursor-pointer transition"
                    >
                        🖨️ Print Receipt
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full bg-gray-600 hover:bg-gray-700 py-4 rounded-xl text-white font-bold text-lg cursor-pointer transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}