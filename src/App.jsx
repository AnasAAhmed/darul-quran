import './App.css'
import ProtectedRoute from './components/protected-route'
import Login from './pages/auth/Login'
import AuthLayout from './components/layouts/AuthLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/react'
import AdminLayout from './components/layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import Home from './pages/Home'
import CourseManagement from './pages/admin/CourseManagement'

function App() {

  return (
    <HeroUIProvider>

      <BrowserRouter>
        <Routes>
          {/* ---------- Auth Layout (NO HEADER/FOOTER) ---------- */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <ProtectedRoute publicOnly isAuthenticated={false} redirect="/dashboard">
                  <Login />
                </ProtectedRoute>
              }
            />
             <Route
              path="/"
              element={
                <ProtectedRoute publicOnly isAuthenticated={false} redirect="/dashboard">
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* --- ----- Admin Layout (WITH HEADER/SIDEBAR) -------- */}
          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAuthenticated={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/courses-management"
              element={
                <ProtectedRoute isAuthenticated={true}>
                  <CourseManagement />
                </ProtectedRoute>
              }
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  )
}

export default App
