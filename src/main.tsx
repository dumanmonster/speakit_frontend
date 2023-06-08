import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import MasterProvider from "./providers/MasterProvider";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthProvider>
        <MasterProvider>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </MasterProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
