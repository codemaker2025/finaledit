import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer


createRoot(document.getElementById("root")).render(
    <RecoilRoot>
      <ToastContainer />
      <App />
    </RecoilRoot>
);
