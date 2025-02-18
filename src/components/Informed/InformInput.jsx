import React from "react";
import { useField } from "informed";

const InformInput = ({
  label,
  type = "text",
  name,
  placeholder,
  validate,
  infoMessage,
  required = false,
  disabled = false,
  ...props
}) => {
  const { fieldState, fieldApi, render, ref, userProps } = useField({
    name,
    validate,
  });

  const { value, error, showError } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (type === "tel") {
      newValue = newValue.replace(/[^\d\+]/g, ""); // Example for telephone fields
    }

    setValue(newValue, e);

    if (validate) {
      const validationError = validate(newValue);
      if (validationError) {
        setError(validationError);
      } else {
        setError("");
      }
    }

    if (showError) {
      setError(""); // Clear any pre-existing error
    }
  };

  return render(
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <input
        {...props}
        id={name}
        ref={ref}
        type={type}
        value={!value && value !== 0 ? "" : value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: "0.5rem",
          border: showError || error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      {(showError || error) && (
        <small style={{ color: "red", fontSize: "0.8rem" }}>
          {error || showError}
        </small>
      )}
      {infoMessage && !error && (
        <small style={{ color: "#6c757d", fontSize: "0.8rem" }}>
          {infoMessage}
        </small>
      )}
    </div>
  );
};

export default InformInput;
