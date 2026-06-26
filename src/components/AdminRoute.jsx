import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth.js";

export default function AdminRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
