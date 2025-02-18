import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <Button variant="secondary" onClick={handleGoBack}>
      Go Back
    </Button>
  );
}
