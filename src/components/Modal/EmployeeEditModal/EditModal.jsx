import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import axiosInstance from "../../../api/axiosInstance.js";
import { toast } from "react-toastify";
import useSWR from "swr";
import EmployeeForm from "./EmployeeForm.jsx";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function EditModal({ isOpen, setIsOpen, employee, mutate }) {
  if (!employee) return null;

  const [file, setFile] = useState(null);
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
  const genderReverseMap = { male: 1, female: 2, other: 3 };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("id", employee.id);

    Object.entries(values.values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("gender", genderReverseMap[values.values.gender]);

    if (file) {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={() => !isSubmitting && setIsOpen(false)}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>Edit Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeForm
          employee={employee}
          isSubmitting={isSubmitting}
          departments={departments}
          designations={designations}
          employmentTypes={employmentTypes}
          onSubmit={handleSubmit}
          setFile={setFile}
        />
      </Modal.Body>
    </Modal>
  );
}
