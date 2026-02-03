import { Navigate } from "react-router-dom";

export default function RequireAdminAuth({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "Admin") {
    return <Navigate to="/role-selection" replace />;
  }

  return children;
}
