import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import ProtectedRoutes from "./ProtectedRoutes";
// Lazy load public components
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Homepage = lazy(() => import("../pages/auth/Homepage"));

function AppRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/register" />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />

        {/* Root redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Protected Routes */}
        {isAuthenticated && <Route path="/*" element={<ProtectedRoutes />} />}

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
