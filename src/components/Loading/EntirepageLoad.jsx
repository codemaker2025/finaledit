import React from 'react';
import { Spinner } from 'react-bootstrap'; // Import Spinner from React Bootstrap

export default function EntirepageLoad() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
