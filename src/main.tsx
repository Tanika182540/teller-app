import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import "./index.css";
import CustomerDetails from "./pages/customerDetail/CustomerDetails";
import { AuthProvider, useAuth } from "./routes/AuthContext";
import { Toaster } from "react-hot-toast";
import Layout from "./shared/components/Layout";
import CustomerDataList from "./pages/customerList/CustomerDataList";

const App = () => {
  const user = useAuth()?.user;
  const isAuthenticated = !!user;

  return (
    <Routes>
      {/* Protected Routes (Require Authentication) */}
      {isAuthenticated ? (
        <Route element={<Layout />}>
          <Route path="/" element={<CustomerDataList />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
    </Routes>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
