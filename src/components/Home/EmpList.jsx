import  { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import useEmployeeSWR from "../../SWRhelpers/useEmployeeSWR";
import EditModal from "../Modal/EmployeeEditModal/EditModal";
import BackButton from "../navigation/BackButton";

export default function EmpList() {
  const { id } = useParams();
  const { employee, isLoading, isError, mutate } = useEmployeeSWR(id);
  const [isOpen, setIsOpen] = useState(false);

  if (isError) return <div className="text-danger">Error loading employee details.</div>;
  if (isLoading) return <Spinner animation="border" role="status" />;
  console.log(employee,"employee data");
  
  return (
    <Container className="mt-4">
      <BackButton/>
      <Card className="p-4 shadow-sm">
        <Row>
          <Col md={3} className="text-center">
            <img
              src={employee?.profile_picture}
              alt={employee?.name}
              className="rounded-circle border border-secondary"
              width="100"
              height="100"
            />
          </Col>
          <Col md={9}>
            <h3>Employee Details</h3>
            <p><strong>Employee Code:</strong> {employee?.employee_code}</p>
            <p><strong>Name:</strong> {employee?.name}</p>
            <p><strong>Email:</strong> {employee?.email}</p>
            <p><strong>Phone:</strong> {employee?.phone}</p>
            <p><strong>Salary:</strong> ₹{employee?.salary}</p>
            <p><strong>Address:</strong> {employee?.address}</p>
            <p><strong>City:</strong> {employee?.city}</p>
            <p><strong>State:</strong> {employee?.state}</p>
            <p><strong>ZIP Code:</strong> {employee?.zip_code}</p>
            <p><strong>Country:</strong> {employee?.country}</p>
            <p><strong>Bank Account:</strong> {employee?.bank_account_number}</p>
            <p><strong>IFSC Code:</strong> {employee?.ifsc_code}</p>
            <p><strong>Emergency Contact:</strong> {employee?.emergency_contact}</p>
            <p><strong>Date of Birth:</strong> {employee?.date_of_birth}</p>
            <p><strong>Joining Date:</strong> {employee?.joining_date}</p>
            <p><strong>Gender:</strong> {employee?.gender_text}</p>
            <p><strong>Department:</strong> {employee?.department?.name}</p>
            <p><strong>Designation:</strong> {employee?.designation?.title}</p>
          </Col>
        </Row>
        <Button className="mt-3" variant="primary" onClick={() => setIsOpen(true)}>
          Edit
        </Button>
      </Card>

      {/* Edit Modal */}
      <EditModal mutate={mutate} employee={employee} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
}
