import React from "react";
import { Button } from "react-bootstrap";
import { Form as Inform, Radio, RadioGroup } from "informed";
import inputFields from "../../utils/inputFieldData.js";
import InformInput from "../../Informed/InformInput.jsx";
import SelectField from "./SelectField.jsx";
import GenderRadioGroup from "./GenderRadioGroup.jsx";
import FileUpload from "./FileUpload.jsx";
import PhoneNumberField from "./PhoneNumberField.jsx";

const genderMap = { 1: "male", 2: "female", 3: "other" };
const genderReverseMap = { male: 1, female: 2, other: 3 };

export default function EmployeeForm({
  employee,
  isSubmitting,
  departments,
  designations,
  employmentTypes,
  onSubmit,
  setFile,
}) {
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

  return (
    <Inform
      onSubmit={onSubmit}
      initialValues={{ ...employee, gender: genderMap[employee.gender] || "" }}
      focusOnInvalid
    >
      {() => (
        <>
          {inputFields.map((field, index) => (
            <InformInput key={index} {...field} disabled={isSubmitting} />
          ))}

          <PhoneNumberField
            name="phone"
            label="Phone"
            isSubmitting={isSubmitting}
          />
          <PhoneNumberField
            name="emergency_contact"
            label="Emergency Contact"
            isSubmitting={isSubmitting}
          />

          <SelectField
            name="department_id"
            label="Department"
            options={departmentOptions}
            isSubmitting={isSubmitting}
          />
          <SelectField
            name="designation_id"
            label="Designation"
            options={designationOptions}
            isSubmitting={isSubmitting}
          />
          <SelectField
            name="employment_type_id"
            label="Employment Type"
            options={employmentTypesOptions}
            isSubmitting={isSubmitting}
          />

          <FileUpload url={employee.profile_picture} setFile={setFile} isSubmitting={isSubmitting} />
          <GenderRadioGroup disabled={isSubmitting} />
          <Button type="submit" className="mt-3 w-100" disabled={isSubmitting}>
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </>
      )}
    </Inform>
  );
}
