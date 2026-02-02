import { Navigate } from "react-router-dom";

export default function RequireUserAuth({ children }) {
  const token = localStorage.getItem("userToken");
  
  console.log("RequireUserAuth - Token:", token);
  console.log("RequireUserAuth - LocalStorage:", localStorage);

  if (!token) {
    console.log("No token found, redirecting to /user-login");
    return <Navigate to="/user-login" replace />;
  }

  console.log("Token found, allowing access");
  return children;
}