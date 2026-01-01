import "./App.css";
import ProtectedRoute from "./components/protected-route";
import Login from "./pages/auth/Login";
import AuthLayout from "./components/layouts/AuthLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  HeroUIProvider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Spinner,
} from "@heroui/react";
import { lazy, use, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ChatLayout from "./components/layouts/ChatLayout";
import TeachersLayout from "./components/layouts/Teacherslayout";
import TeachersDashboard from "./pages/teacher/TeachersDashboard";
import MyCourses from "./pages/teacher/my-courses";
import UploadMaterial from "./pages/teacher/my-courses/uploadmaterial";
import StudentAttendance from "./pages/teacher/student-attendance";
import ClassSheduling from "./pages/teacher/class-sheduling";
import SheduleClass from "./pages/teacher/class-sheduling/shedule-class";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyLearning from "./pages/student/my-learning-joureny";
import StudentClassSheduling from "./pages/student/class-sheduling";
import BrowseCourses from "./pages/student/browse-courses";
import PaymentsInvoices from "./pages/student/payments-invoices";
import CourseDetails from "./pages/student/browse-courses/course-details";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import DownloadModal from "./components/dashboard-components/DownloadModal";
import AddUser from "./pages/admin/user-management/add-user";
import EditUser from "./pages/admin/user-management/add-user/edituser";

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Home = lazy(() => import("./pages/Home"));
const CourseManagement = lazy(() =>
  import("./pages/admin/course-management/index")
);
const LiveSession = lazy(() =>
  import("./pages/admin/course-management/LiveSession")
);
const Attendance = lazy(() =>
  import("./pages/admin/course-management/Attendance")
);
const UserManagement = lazy(() => import("./pages/admin/user-management"));
const UserDetails = lazy(() =>
  import("./pages/admin/user-management/users-details")
);
const Scheduling = lazy(() => import("./pages/admin/scheduling"));
const Announcements = lazy(() => import("./pages/admin/announcements"));
const PaymentsRefunds = lazy(() => import("./pages/admin/payment-refund"));
const SupportTickets = lazy(() => import("./pages/admin/support-ticket"));
const Analytics = lazy(() => import("./pages/admin/analytics"));

const CourseBuilder = lazy(() =>
  import("./pages/admin/course-management/course-builder")
);

const HelpMessages = lazy(() => import("./pages/admin/help"));
const TeacherAndStudentChat = lazy(() =>
  import("./pages/admin/help/TeacherAndStudent")
);
const Review = lazy(() => import("./pages/admin/help/review"));
const Faqs = lazy(() => import("./pages/admin/help/faqs"));

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch(import.meta.env.VITE_PUBLIC_SERVER_URL + `/api/auth/me`, {
          credentials: "include",
        });
        const { user, session } = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          if (session.role?.toLowerCase() === "admin") {
            setRedirect("/admin/dashboard");
          } else if (session.role?.toLowerCase() === "student") {
            setRedirect("/student/dashboard");
          } else if (session.role?.toLowerCase() === "teacher") {
            setRedirect("/teacher/dashboard");
          }
        }
      } catch (err) {
        setRedirect("/");
      } finally {
        const authroutes = ["/", "/auth/forget-password", "/auth/change-password"]
        const isAuthRoute = authroutes.includes(pathname);
        if (isAuthRoute) {
          navigate(redirect)
        }
        setLoading(false)
      }
    };

    checkAuth();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="lg" label="Loading..." labelColor="success" color="success" />
    </div>
  );

  return (
    <HeroUIProvider>
      <Toaster position="top-right" />
      <DownloadModal />
      <Routes>
        {/* <Route
          path="/"
          element={
            <Home redirect={redirect} />
          }
        /> */}
        {/* ---------- Auth/Public Layout (NO HEADER/FOOTER) ---------- */}
        <Route element={<AuthLayout isAuthenticated={isAuthenticated} redirect={redirect} />}>
          <Route
            path="/"
            element={
              <Login />
            }
          />
          <Route
            path="/auth/forget-password"
            element={
              <ForgetPassword />
            }
          />
          <Route
            path="/auth/change-password"
            element={
              <ChangePassword />
            }
          />
        </Route>
        {/* --- ----- Admin Layout (WITH HEADER/SIDEBAR) -------- */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses-management"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CourseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses-management/builder"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CourseBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses-management/live-sessions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LiveSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses-management/attendance"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-management"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-management/add-user"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-management/edit-user/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-management/users-details"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/scheduling"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Scheduling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentsRefunds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SupportTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/help/reviews"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/help/faqs"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Faqs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/help/messages"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HelpMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/help/chat"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TeacherAndStudentChat />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* <Route element={<ChatLayout />}>
          </Route> */}
        {/* teachers routes -------------*/}
        <Route element={<TeachersLayout />}>
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TeachersDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<TeachersLayout />}>
          <Route
            path="/teacher/courses/course-details"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/courses/upload-material"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UploadMaterial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/student-attendance"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StudentAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/class-scheduling"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ClassSheduling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/class-scheduling/sheduled-class"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SheduleClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/chat"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HelpMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/my-learning"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyLearning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/class-scheduling"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StudentClassSheduling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/browse-courses"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BrowseCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/browse-courses/course-details"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/help/messages"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HelpMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/payments"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentsInvoices />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </HeroUIProvider>
  );
}

export default App;
