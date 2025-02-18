export default function useEmpValidation() {
    const containsNumber = (value) => /\d/.test(value);

    const validateName = (value) => {
        if (!value) return "Name is required";
        if (containsNumber(value)) return "Name should not contain numbers";
        if (value.length > 255) return "Maximum length is 255 characters";
        return undefined;
    };

    const validateEmail = (value) => 
        !value ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : undefined;

    const validatePhone = (value) =>
        !value
            ? "Phone number is required"
            : !/^\+91[6-9]\d{9}$/.test(value)
                ? "Invalid phone number format. It should start with +91 followed by a valid 10-digit number."
                : undefined;

    const validateSalary = (value) => 
        !value ? "Salary is required" : isNaN(value) || value < 0 ? "Salary must be a positive number" : undefined;

    const validateStringField = (value, fieldName, maxLength) => {
        if (!value) return `${fieldName} is required`;
        if (containsNumber(value)) return `${fieldName} should not contain numbers`;
        if (value.length > maxLength) return `Maximum length is ${maxLength} characters`;
        return undefined;
    };

    const validateAddress = (value) => (!value ? "Address is required" : value.length > 255 ? "Maximum length is 255 characters" : undefined);
    const validateCity = (value) => validateStringField(value, "City", 100);
    const validateState = (value) => validateStringField(value, "State", 100);
    const validateCountry = (value) => validateStringField(value, "Country", 100);

    const validateZipCode = (value) => 
        !value ? "ZIP Code is required" : !/^\d{6}$/.test(value) ? "ZIP Code must be exactly 6 digits" : undefined;

    const validateBankAccount = (value) => 
        !value ? "Bank account number is required" : !/^\d{9,18}$/.test(value) ? "Bank account number must be between 9 and 18 digits" : undefined;
    
    const validateIfscCode = (value) => (!value ? "IFSC Code is required" : undefined);

    const validateEmergencyContact = (value) => 
        !value ? "Emergency contact is required" : !/^\+?91?[6-9]\d{9}$/.test(value) ? "Invalid emergency contact number" : undefined;

    const validateDOB = (value) => {
        if (!value) return "Date of Birth is required";
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Invalid date format (YYYY-MM-DD)";
        
        const dob = new Date(value);
        const today = new Date();
        
        if (dob > today) return "Date of Birth cannot be in the future";
        
        return undefined;
    };
    

    const validateEmployeeCode = (value) => (!value ? "Employee code is required" : undefined);
    const validateEmploymentTypeId = (value) => (!value ? "Employment Type ID is required" : undefined);
    
    const validateJoiningDate = (value) => {
        if (!value) return "Joining date is required";
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Invalid date format (YYYY-MM-DD)";
        
        const joiningDate = new Date(value);
        const today = new Date();
        
        if (joiningDate > today) return "Joining date cannot be in the future";
        
        return undefined;
    };
    
    const validateGender = (value) => 
        !value ? "Gender is required" : !["1", "2", "3"].includes(value) ? "Invalid gender selection" : undefined;

    const validateDesignationId = (value) => (!value ? "Designation is required" : undefined);
    const validateDepartmentId = (value) => (!value ? "Department is required" : undefined);

    return {
        validateName,
        validateEmail,
        validatePhone,
        validateSalary,
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
        validateEmploymentTypeId,
        validateJoiningDate,
        validateGender,
        validateDesignationId,
        validateDepartmentId,
    };
}
