import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import "./index.css";
import CustomerDetails from "./pages/customerDetail/CustomerDetails";
import Layout from "./shared/components/Layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/customer-details" element={<CustomerDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
  </React.StrictMode>
);
