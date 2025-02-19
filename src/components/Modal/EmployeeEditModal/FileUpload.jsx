import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";

export default function FileUpload({ url, setFile, isSubmitting }) {
  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only JPG, PNG, and WEBP images are allowed.");
        setFile(null);
        setSelectedFile(null);
        return;
      }
      if (file.size > 2048 * 1024) {
        setFileError("The profile picture must not be greater than 2MB.");
        setFile(null);
        setSelectedFile(null);
        return;
      }
      setFileError("");
      setFile(file);
      setSelectedFile(file);
    }
  };

  const preview = selectedFile ? URL.createObjectURL(selectedFile) : url;

  return (
    <Form.Group className="mb-3">
      <Form.Label>Upload Profile Picture</Form.Label>
      {preview && (
        <div className="mb-2">
          <Image src={preview} alt="Profile Preview" thumbnail width={100} height={100} />
        </div>
      )}
      <Form.Control type="file" onChange={handleFileChange} accept="image/*" isInvalid={!!fileError} disabled={isSubmitting} />
      <Form.Control.Feedback type="invalid">{fileError}</Form.Control.Feedback>
    </Form.Group>
  );
}
