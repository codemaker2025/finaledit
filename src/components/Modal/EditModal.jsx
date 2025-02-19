import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import InformInput from "../Informed/InformInput";
import {
  Form as Inform,
  Radio,
  RadioGroup,
  Select,
} from "informed";
import useSWR from "swr";
import useEmpValidation from "../utils/useEmpValidation";
import { toast } from "react-toastify";
import PhoneNumber from "../Informed/PhoneNumber";
import inputFields from "../utils/inputFieldData.js";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function EditModal({ isOpen, setIsOpen, employee, mutate }) {
  if (!employee) return null;

  const genderReverseMap = { male: 1, female: 2, other: 3 };
  const genderMap = { 1: "male", 2: "female", 3: "other" };

  const { validatePhone } = useEmpValidation();

  const [file, setFile] = useState(null); // Start with null for new file uploads
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: departments } = useSWR("/api/v1/settings/departments", fetcher);
  const { data: designations } = useSWR(
    "/api/v1/settings/designations",
    fetcher
  );
  const { data: employmentTypes } = useSWR(
    "/api/v1/settings/employment-types",
    fetcher
  );

  const departmentOptions =
    departments?.data?.map((dept) => ({ value: dept.id, label: dept.name })) ||
    [];
  const designationOptions =
    designations?.data?.map((desg) => ({
      value: desg.id,
      label: desg.title,
    })) || [];
  const employmentTypesOptions =
    employmentTypes?.data?.map((emp) => ({
      value: emp.id,
      label: emp.title,
    })) || [];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      const allowedExtensions = /\.(jpg|jpeg|png|webp)$/i;

      if (
        !allowedTypes.includes(selectedFile.type) ||
        !allowedExtensions.test(selectedFile.name)
      ) {
        setFileError(
          "File wont be uploaded. Only JPG, PNG, and WEBP images are allowed."
        );
        setFile(null);
        return;
      }

      if (selectedFile.size > 2048 * 1024) {
        setFileError("The profile picture must not be greater than 2MB.");
        setFile(null);
        return;
      }

      // Ensure the file is an image before setting it to state
      if (!selectedFile.type.startsWith("image/")) {
        setFileError("Invalid file type. Only images are allowed.");
        setFile(null);
        return;
      }

      setFileError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (values) => {
    // Set loading state to true
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("id", employee.id);

    Object.entries(values.values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("gender", genderReverseMap[values.values.gender]);

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Only JPG, PNG, and WEBP images are allowed."
        );
        setIsSubmitting(false);
        return;
      }
      formData.append("profile_picture", file);
    }

    try {
      await axiosInstance.post("/api/v1/employee/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Successfully edited!");
      mutate();
      setIsOpen(false);
    } catch (error) {
      toast.error("Form Invalid!");
      console.error("Update failed:", error);
    } finally {
      // Reset loading state regardless of success or failure
      setIsSubmitting(false);
    }
  };

  console.log(employee.profile_picture);

  return (
    <Modal show={isOpen} onHide={() => !isSubmitting && setIsOpen(false)}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>Edit Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Inform
          onSubmit={handleSubmit}
          initialValues={{
            ...employee,
            gender: genderMap[employee.gender] || "",
          }}
          focusOnInvalid={true}
        >
          {() => (
            <>
              {/* Map through the input fields array */}
              {inputFields.map((field, index) => (
                <InformInput
                  key={index}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  validate={field.validate}
                  required={field.required}
                  disabled={isSubmitting}
                />
              ))}

              {/* Phone number field */}
              <PhoneNumber
                id="phoneNumber"
                name="phone"
                label="Phone"
                placeholder="Enter your mobile number"
                validatePhone={(value) => validatePhone(value) || undefined}
                formatter="+91##########"
                disabled={isSubmitting}
              />

              {/* Department Select field */}
              <div className="mb-3">
                <label className="form-label">Department</label>
                <Select
                  field="department_id"
                  options={departmentOptions}
                  className="form-select"
                  disabled={isSubmitting}
                />
              </div>

              {/* Designation Select field */}
              <div className="mb-3">
                <label className="form-label">Designation</label>
                <Select
                  field="designation_id"
                  options={designationOptions}
                  className="form-select"
                  disabled={isSubmitting}
                />
              </div>

              {/* Employment Type Select field */}
              <div className="mb-3">
                <label className="form-label">Employment Type</label>
                <Select
                  field="employment_type_id"
                  options={employmentTypesOptions}
                  className="form-select"
                  disabled={isSubmitting}
                />
              </div>

              {/* Emergency Contact field */}
              <PhoneNumber
                id="phoneNumber"
                name="emergency_contact"
                label="Emergency Contact"
                placeholder="Enter your mobile number"
                validatePhone={(value) => validatePhone(value) || undefined}
                formatter="+91##########"
                disabled={isSubmitting}
              />

              {/* File Upload field */}
              {employee.profile_picture && (
                <div className="mb-3">
                  <label className="form-label">Current Profile Picture</label>
                  <div>
                    <img
                      src={
                        typeof employee.profile_picture === "string"
                          ? employee.profile_picture
                          : URL.createObjectURL(employee.profile_picture)
                      }
                      alt="Current profile"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </div>
                </div>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Upload New Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="profile_picture"
                  onChange={handleFileChange}
                  accept="image/*"
                  isInvalid={!!fileError}
                  disabled={isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  {fileError}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Gender RadioGroup */}
              <RadioGroup field="gender" disabled={isSubmitting}>
                <label>
                  Male <Radio value="male" />
                </label>
                <label>
                  Female <Radio value="female" />
                </label>
                <label>
                  Other <Radio value="other" />
                </label>
              </RadioGroup>

              <Button
                type="submit"
                className="mt-3 w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          )}
        </Inform>
      </Modal.Body>
    </Modal>
  );
}
