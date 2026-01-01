import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout({ isAuthenticated, redirect }) {

if(isAuthenticated) return <Navigate to={redirect} />

  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}
