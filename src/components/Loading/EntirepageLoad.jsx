import React from "react";
import { Spinner } from "react-bootstrap"; // Import Spinner from React Bootstrap

export default function EntirepageLoad() {
  return (
    <div
      className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 1000,
      }}
    >
      <div className="text-center">
        <Spinner animation="border" role="status" className="mb-2">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="text-muted">Loading data...</p>
      </div>
    </div>
  );
}
