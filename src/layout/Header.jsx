import { useDispatch, useSelector } from "react-redux";
import { Menu, LogOut, User } from "lucide-react";
import { logout } from "../store/slice/authSlice";

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const { user, role: roleFromState } = useSelector((s) => s.auth);
  const role = typeof user === "string" ? user : user?.role || roleFromState;

  const handleLogout = () => {
    dispatch(logout());
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Secretary-Login":
        return "text-blue-600 bg-blue-100";
      case "user-login":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img
            src={
              role === "user-login"
                ? "https://university-hrms.thecodebucket.com/images/gov1.png"
                : "https://i.ibb.co/R2y2KNf/image.png"
            }
            className="h-12 w-auto"
            alt="Government Logo"
          />
          <div className="flex flex-col">
            {/* <h1 className="text-lg font-bold">
              {role === "user-login" ? "Welcome to User Portal" : "बिहार सरकार"}
            </h1> */}
            <h2 className="text-lg font-bold">
              {role === "user-login"
                ? "User Dashboard"
                : "शिक्षा विभाग ,बिहार सरकार"}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <span
                className={`inline-block px-1  py-1 rounded-full text-xs  font-medium capitalize ${getRoleColor(
                  role
                )}`}
              >
                {role || "—"}
              </span>
            </div>
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-md text-red -600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
