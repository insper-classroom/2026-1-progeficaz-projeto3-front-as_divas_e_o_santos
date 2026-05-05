import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { isCurrentUserAdmin } from "../../../data/user";

export default function RequireAdmin() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isCurrentUserAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}