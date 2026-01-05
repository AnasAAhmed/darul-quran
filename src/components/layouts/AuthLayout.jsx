import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { user, loading,isAuthenticated } = useSelector((s) => s?.user);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (isAuthenticated && user) {
    const role = user.role?.toLowerCase();
    
    switch (role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "teacher":
        return <Navigate to="/teacher/dashboard" replace />;
      case "student":
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}