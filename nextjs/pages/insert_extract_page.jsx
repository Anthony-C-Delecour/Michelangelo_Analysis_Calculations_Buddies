import React, { useState } from "react";

export default function MacbForm() {
  const [date, setDate] = useState("");
  const [financialChoice, setFinancialChoice] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [perUnit, setPerUnit] = useState("");

  const handleImport = () => {
    console.log("Import:", {
      date,
      financialChoice,
      type,
      amount,
      perUnit,
    });
  };

  return (
    <div className="page-container">
      <style>{`
        /* Page layout */
        .page-container {
          font-family: "Roboto", sans-serif;
          background: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .header {
          background: #3A6A3B;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          font-size: 16px;
        }

        .nav-left span {
          margin-right: 20px;
          cursor: pointer;
        }

        .small-logo {
          height: 40px;
        }

        /* Form */
        .form-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
        }

        .logo-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .main-logo {
          height: 100px;
        }

        .logo-title h1 {
          font-size: 32px;
          font-weight: bold;
        }

        /* Form rows */
        .form-row {
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
          width: 300px;
        }

        .form-row label {
          margin-bottom: 6px;
          font-weight: 500;
          font-size: 14px;
        }

        .form-row input,
        .form-row select {
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
        }

        /* Button */
        .btn-import {
          margin-top: 20px;
          padding: 12px 28px;
          background: #3A6A3B;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          letter-spacing: 1px;
          transition: background 0.3s ease;
        }

        .btn-import:hover {
          background: #2d5230;
        }

        /* Footer */
        .footer {
          text-align: center;
          font-size: 12px;
          padding: 20px;
          color: #666;
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="nav-left">
          <span>Dashboard</span>
          <span>Manage</span>
        </div>
        <div className="nav-right">
          <img src="/images/MACB_Profile.png" alt="logo" className="small-logo" />
        </div>
      </header>

      {/* Main form */}
      <main className="form-container">
        <div className="logo-title">
          <img src="/images/MACB_logo.png" alt="logo" className="main-logo" />
          <h1>M.A.C.B.</h1>
        </div>

        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Financial Choice</label>
          <select
            value={financialChoice}
            onChange={(e) => setFinancialChoice(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="2-Bedroom Townhouse (Pattaya)">
              2-Bedroom Townhouse (Pattaya)
            </option>
          </select>
        </div>

        <div className="form-row">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Stock">Stock</option>
            <option value="Bond">Bond</option>
          </select>
        </div>

        <div className="form-row">
          <label>Amount (Baht)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="form-row">
          <label>Per (Unit)</label>
          <input
            type="text"
            value={perUnit}
            onChange={(e) => setPerUnit(e.target.value)}
            placeholder="Unit"
          />
        </div>

        <button className="btn-import" onClick={handleImport}>
          IMPORT
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 M.A.C.B., Inc. All Rights Reserved.
      </footer>
    </div>
  );
}
