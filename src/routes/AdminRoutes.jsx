import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../admin/auth/AdminLogin";
import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Customers from "../admin/pages/Customers";
import Approvals from "../admin/pages/Approvals";
import Transactions from "../admin/pages/Transactions";
import RequireAdminAuth from "./RequireAdminAuth";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <AdminLayout />
          </RequireAdminAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
}
