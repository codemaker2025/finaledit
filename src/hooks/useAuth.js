import { useRecoilState } from "recoil";
import { authState } from "../Recoil/atoms/authState";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const customLogout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/api/v1/settings/logout');
      setAuth(null);
      setError(""); 
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const customLogin = async (username, password) => {
    setLoading(true);
    setError(""); 
    console.log("username","password",username,password);
    
    console.log("Logging in with:", { username, password });
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", {
        username,
        password,
      });
      console.log(res);
      
      const { token } = res.data.data;
      if (res.success) {
        console.log(res.data);
      }
      setAuth(token);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return {
    auth,
    loading,
    customLogout,
    customLogin,
    error,
  };
}
