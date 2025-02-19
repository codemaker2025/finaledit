import React from "react";
import { Select } from "informed";

export default function SelectField({ name, label, options, isSubmitting }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Select field={name} options={options} className="form-select" disabled={isSubmitting} />
    </div>
  );
}
