import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import InformInput from "../Informed/InformInput";
import {
  Form as Inform,
  Radio,
  RadioGroup,
  Select,
  useFormApi,
} from "informed";
import useSWR from "swr";
import useEmpValidation from "../../hooks/useEmpValidation";
import { toast } from "react-toastify";
import PhoneNumber from "../Informed/PhoneNumber";
const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function EditModal({ isOpen, setIsOpen, employee, mutate }) {
  if (!employee) return null;

  const genderReverseMap = { male: 1, female: 2, other: 3 };
  const genderMap = { 1: "male", 2: "female", 3: "other" };

  const {
    validateName,
    validateEmail,
    validatePhone,
    validateAddress,
    validateCity,
    validateState,
    validateZipCode,
    validateCountry,
    validateBankAccount,
    validateIfscCode,
    validateEmergencyContact,
    validateDOB,
    validateEmployeeCode,
    validateJoiningDate,
    validateSalary,
  } = useEmpValidation();

  const formApi = useFormApi();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

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
    }
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
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
              <InformInput
                type="text"
                label="Name"
                name="name"
                placeholder="Enter name"
                validate={validateName}
                required
              />
              <InformInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter email"
                validate={validateEmail}
                required
              />
             
              <PhoneNumber
                id="phoneNumber"
                name="phone"
                label="Phone"
                placeholder="Enter your mobile number"
                validatePhone={(value) => validatePhone(value) || undefined}
                formatter="+91##########"
              />

              <InformInput
                type="number"
                label="Salary"
                name="salary"
                placeholder="Enter salary"
                validate={validateSalary}
              />
              <div className="mb-3">
                <label className="form-label">Department</label>
                <Select
                  field="department_id"
                  options={departmentOptions}
                  className="form-select"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Designation</label>
                <Select
                  field="designation_id"
                  options={designationOptions}
                  className="form-select"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Employment Type</label>
                <Select
                  field="employment_type_id"
                  options={employmentTypesOptions}
                  className="form-select"
                />
              </div>
              <InformInput
                type="text"
                label="Address"
                name="address"
                placeholder="Enter address"
                validate={validateAddress}
                required
              />
              <InformInput
                type="text"
                label="City"
                name="city"
                placeholder="Enter city"
                validate={validateCity}
                required
              />
              <InformInput
                type="text"
                label="State"
                name="state"
                placeholder="Enter state"
                validate={validateState}
                required
              />
              <InformInput
                type="text"
                label="ZIP Code"
                name="zip_code"
                placeholder="Enter ZIP code"
                validate={validateZipCode}
                required
              />
              <InformInput
                type="text"
                label="Country"
                name="country"
                placeholder="Enter country"
                validate={validateCountry}
                required
              />
              <InformInput
                type="text"
                label="Bank Account Number"
                name="bank_account_number"
                placeholder="Enter bank account number"
                validate={validateBankAccount}
              />
              <InformInput
                type="text"
                label="IFSC Code"
                name="ifsc_code"
                placeholder="Enter IFSC code"
                validate={validateIfscCode}
                required
              />
              {/* <InformInput
                type="text"
                label="Emergency Contact"
                name="emergency_contact"
                placeholder="Enter emergency contact"
                validate={validateEmergencyContact}
                required
              /> */}
              <PhoneNumber
                id="phoneNumber"
                name="emergency_contact"
                label="Emergency Contact"
                placeholder="Enter your mobile number"
                validatePhone={(value) => validatePhone(value) || undefined}
                formatter="+91##########"
              />
              <InformInput
                type="date"
                label="Date of Birth"
                name="date_of_birth"
                validate={validateDOB}
                required
              />
              <InformInput
                type="text"
                label="Employee Code"
                name="employee_code"
                placeholder="Enter employee code"
                validate={validateEmployeeCode}
                required
              />
              <Form.Group className="mb-3">
                <Form.Label>Upload Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="profile_picture"
                  onChange={handleFileChange}
                  accept="image/*"
                  isInvalid={!!fileError}
                />
                <Form.Control.Feedback type="invalid">
                  {fileError}
                </Form.Control.Feedback>
              </Form.Group>

              <InformInput
                type="date"
                label="Joining Date"
                name="joining_date"
                validate={validateJoiningDate}
                required
              />
              <RadioGroup field="gender">
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

              <Button type="submit" className="mt-3 w-100">
                Save Changes
              </Button>
            </>
          )}
        </Inform>
      </Modal.Body>
    </Modal>
  );
}
