import { Button, Alert } from "react-bootstrap";
import { Form as Inform } from "informed";
import InformInput from "../Informed/InformInput";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = ({ onLogin, loading, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = ({ values }) => {
    const { username, password } = values || {};
    
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <Inform onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow-lg w-50 mx-auto">
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <div className="mb-3">
        <label className="text-white">Username</label>
        <InformInput
          field="username"
          name="username"
          type="text"
          placeholder="Enter username"
          className="bg-secondary text-white form-control"
          validate={(value) => value ? undefined : "Username is required"}
        />
      </div>

      <div className="mb-3">
        <label className="text-white">Password</label>
        <div className="input-group">
          <InformInput
            field="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            validate={(value) => value ? undefined : "Password is required"}
            className="bg-secondary text-white form-control"
          />
          <span className="input-group-text bg-secondary border-0" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff color="white" /> : <FiEye color="white" />}
          </span>
        </div>
      </div>

      <Button variant="primary" type="submit" className="w-100" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Inform>
  );
};

export default LoginForm;
