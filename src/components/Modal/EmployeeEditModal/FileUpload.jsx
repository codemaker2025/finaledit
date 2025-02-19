import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function FileUpload({ setFile, isSubmitting }) {
  const [fileError, setFileError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setFileError("Only JPG, PNG, and WEBP images are allowed.");
        setFile(null);
        return;
      }
      if (selectedFile.size > 2048 * 1024) {
        setFileError("The profile picture must not be greater than 2MB.");
        setFile(null);
        return;
      }
      setFileError("");
      setFile(selectedFile);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Upload Profile Picture</Form.Label>
      <Form.Control type="file" onChange={handleFileChange} accept="image/*" isInvalid={!!fileError} disabled={isSubmitting} />
      <Form.Control.Feedback type="invalid">{fileError}</Form.Control.Feedback>
    </Form.Group>
  );
}
