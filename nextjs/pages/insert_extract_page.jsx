import React, { useState } from "react";
import "../styles/insert_extract.module.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DescriptionIcon from "@mui/icons-material/Description";

export default function InsertExtractNew() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleInsert = () => {
    console.log("Insert:", { date, amount, description });
  };

  const handleExtract = () => {
    console.log("Extract:", { date, amount, description });
  };

  return (
    <div className="container-new">
      {/* Date Field with Icon */}
      <div className="field-container-new">
        <DateRangeIcon className="icon" />
        <input
          className="input-field-new"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label className="label-new">Date</label>
      </div>

      {/* Amount Field */}
      <div className="field-container-new">
        <input
          className="input-field-new"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label className="label-new">Amount</label>
      </div>

      {/* Description Field with Icon */}
      <div className="field-container-new">
        <DescriptionIcon className="icon" />
        <input
          className="input-field-new"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="label-new">Description</label>
      </div>

      {/* Action Buttons */}
      <div className="button-group-new">
        <button className="btn-insert-new" onClick={handleInsert}>
          Insert
        </button>
        <button className="btn-extract-new" onClick={handleExtract}>
          Extract
        </button>
      </div>
    </div>
  );
}