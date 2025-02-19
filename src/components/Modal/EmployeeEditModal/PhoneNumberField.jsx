import React from "react";
import PhoneNumber from '../../Informed/PhoneNumber'
export default function PhoneNumberField({ name, label, isSubmitting }) {
  return (
    <PhoneNumber id={name} name={name} label={label} placeholder="Enter your mobile number" formatter="+91##########" disabled={isSubmitting} />
  );
}
