import React from "react";
import { Radio, RadioGroup } from "informed";

export default function GenderRadioGroup({ isSubmitting }) {
  return (
    <div className="mb-3">
      <label className="form-label">Gender</label>
      <RadioGroup field="gender" disabled={isSubmitting}>
        <label><Radio value="male" /> Male</label>
        <label><Radio value="female" /> Female</label>
        <label><Radio value="other" /> Other</label>
      </RadioGroup>
    </div>
  );
}
