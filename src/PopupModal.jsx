import React, { useRef } from "react";

export default function PopupModal({ open, onClose, data }) {
  const printRef = useRef();

  if (!open) return null;

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=800,height=900");

    newWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            body {
              font-family: Arial;
              padding: 20px;
            }
            h2 {
              text-align: center;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border-bottom: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .summary p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>

        {/* 🔥 PRINT AREA */}
        <div ref={printRef}>
          <h2>Money Receipt <br /> Dream Hospital, Tangail.</h2>
          <p>Mobile: 01896036830</p>
          <hr />

          {/* Patient Info */}
          <div style={styles.info}>
            <p><b>Name:</b> {data.title} {data.name}</p>
            <p><b>Phone:</b> {data.phone}</p>
            <p><b>Address:</b> {data.address}</p>
            <p><b>Gender:</b> {data.gender}</p>
            <p><b>Age:</b> {data.age}</p>
            <p><b>Referer:</b> {data.referer}</p>
          </div>

          <hr />

          <h3>Tests</h3>

          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Cost</th>
                <th>Comment</th>
              </tr>
            </thead>

            <tbody>
              {data.tests.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>৳ {t.cost}</td>
                  <td>{t.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          <div className="summary">
            <p>Total: ৳ {data.total}</p>
            <p>Discount: ৳ {data.discount}</p>
            <p>Payable: ৳ {data.payable}</p>
            <p>Paid: ৳ {data.paid}</p>
            <p>Due: ৳ {data.due}</p>
            <p>Return: ৳ {data.returnMoney}</p>
          </div>
        </div>

        {/* 🔘 BUTTONS */}
        <button onClick={handlePrint} style={styles.printBtn}>
          🖨️ Print
        </button>

        <button onClick={onClose} style={styles.btn}>
          Close
        </button>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "480px",
    maxHeight: "85vh",
    overflowY: "auto",
  },

  info: {
    lineHeight: "1.8",
  },

  printBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  btn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    background: "green",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};