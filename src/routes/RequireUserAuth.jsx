import { Navigate } from "react-router-dom";

export default function RequireUserAuth({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/user-login" replace />;
  }

  if (role !== "Customer") {
    return <Navigate to="/role-selection" replace />;
  }

  return children;
}
