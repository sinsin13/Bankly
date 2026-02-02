import { Navigate } from "react-router-dom";

export default function RequireUserAuth({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/user-login" replace />;
  }

  return children;
}