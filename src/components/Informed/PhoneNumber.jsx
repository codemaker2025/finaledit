import React from "react";
import NumberInput from "../Informed/NumberInput";

export default function PhoneNumber({
  id = "phoneNumber",
  name = "phone",
  label = "Phone",
  placeholder = "Enter your number",
  validatePhone,
  formatter = "+91##########",
  defaultValue = "",
}) {
  return (
    <div className="form-group">
      <div style={{ display: "flex", alignItems: "center" }}>
        <NumberInput
          id={id}
          validateOn="change"
          type="text"
          label={label}
          name={name}
          placeholder={placeholder}
          validate={validatePhone}  // ✅ Ensure validation is passed
          showErrorIfError
          formatter={formatter}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
