import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { User } from "lucide-react";
import authSlice from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";

// Lazy load protected components
const Layout = lazy(() => import("../layout/Layout"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const UserDashboard = lazy(() => import("../pages/user/Dashboard"));

//admin import
const AdminReport = lazy(() => import("../pages/admin/Report"));
const UploadData = lazy(() => import("../pages/admin/UploadData"));
const ProposalForm = lazy(() => import("../pages/admin/ProposalForm"));

//user import
// const UserReport = lazy(() => import("../pages/user/Report"));

function ProtectedRoutes() {
  const { user, role: roleFromState } = useSelector((s) => s.auth);
  const role = typeof user === "string" ? user : user?.role || roleFromState;
  const dispatch = useDispatch();

  const getDashboardComponent = () => {
    switch (role) {
      case "Secretary-Login":
        return AdminDashboard;
      case "user-login":
        return UserDashboard;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!role) dispatch(logout());
  }, [role, dispatch]);

  if (!role) return <Navigate to="/login" replace />;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" Component={getDashboardComponent()} />
          //admin routes
          <Route path="admin/report" element={<AdminReport />} />
          <Route path="admin/upload-data" element={<UploadData />} />
          <Route path="admin/proposal-form" element={<ProposalForm />} />
          //user routes
          {/*<Route path="user/report" element={<UserReport />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ProtectedRoutes;
