import useEmpValidation from "./useEmpValidation";

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
const inputFields = [
    {
      type: "text",
      label: "Name",
      name: "name",
      placeholder: "Enter name",
      validate: validateName,
      required: true
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      validate: validateEmail,
      required: true
    },
    {
      type: "number",
      label: "Salary",
      name: "salary",
      placeholder: "Enter salary",
      validate: validateSalary,
      required: false
    },
    {
      type: "text",
      label: "Address",
      name: "address",
      placeholder: "Enter address",
      validate: validateAddress,
      required: true
    },
    {
      type: "text",
      label: "City",
      name: "city",
      placeholder: "Enter city",
      validate: validateCity,
      required: true
    },
    {
      type: "text",
      label: "State",
      name: "state",
      placeholder: "Enter state",
      validate: validateState,
      required: true
    },
    {
      type: "text",
      label: "ZIP Code",
      name: "zip_code",
      placeholder: "Enter ZIP code",
      validate: validateZipCode,
      required: true
    },
    {
      type: "text",
      label: "Country",
      name: "country",
      placeholder: "Enter country",
      validate: validateCountry,
      required: true
    },
    {
      type: "text",
      label: "Bank Account Number",
      name: "bank_account_number",
      placeholder: "Enter bank account number",
      validate: validateBankAccount,
      required: false
    },
    {
      type: "text",
      label: "IFSC Code",
      name: "ifsc_code",
      placeholder: "Enter IFSC code",
      validate: validateIfscCode,
      required: true
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "date_of_birth",
      validate: validateDOB,
      required: true
    },
    {
      type: "text",
      label: "Employee Code",
      name: "employee_code",
      placeholder: "Enter employee code",
      validate: validateEmployeeCode,
      required: true
    },
    {
      type: "date",
      label: "Joining Date",
      name: "joining_date",
      validate: validateJoiningDate,
      required: true
    }
  ];

  export default inputFields