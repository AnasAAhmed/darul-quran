import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout({ isAuthenticated }) {

  if (!isAuthenticated) location.reload();

  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}
