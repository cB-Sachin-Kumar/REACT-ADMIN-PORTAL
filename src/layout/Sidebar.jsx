import { useSelector } from "react-redux";
import { useState } from "react";

import { NavLink } from "react-router-dom";

import {
  Home,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  X,
  Briefcase,
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const { user, role: roleFromState } = useSelector((state) => state.auth);
  const role = typeof user === "string" ? user : user?.role || roleFromState;

  // State for hover functionality
  const [isHovered, setIsHovered] = useState(false);

  // Determine if sidebar should be expanded (either toggled open OR hovered when closed)
  const isExpanded = isOpen || (!isOpen && isHovered);

  const getNavigationItems = (role) => {
    const baseItems = [{ path: "/dashboard", icon: Home, label: "Dashboard" }];

    const roleBasedItems = {
      "Secretary-Login": [
        { path: "/users/create", icon: Users, label: "Create User" },
        {
          path: "/form-submission-report",
          icon: BarChart3,
          label: "Form Submission Report",
        },
        {
          path: "/admin/upload-data",
          icon: UserPlus,
          label: "Upload Data",
        },
        { path: "/users/list", icon: Users, label: "User Management" },
        { path: "/admin/report", icon: BarChart3, label: "Reports" },
        { path: "/settings", icon: Settings, label: "Settings" },
        {
          path: "/admin/proposal-form",
          icon: Briefcase,
          label: "Proposal Form",
        },
      ],
      "user-login": [
        { path: "/settings", icon: Settings, label: "Settings" },
        {
          path: "/application-status",
          icon: Briefcase,
          label: "Application Status",
        },
        {
          path: "/print-application",
          icon: Briefcase,
          label: "Print Application",
        },
      ],
    };

    return [...baseItems, ...(roleBasedItems[role] || [])];
  };

  const getRoleTheme = (role) => {
    switch (role) {
      case "Secretary-Login":
        return {
          background: "from-gray-600 to-gray-800",
          accent: "bg-gray-500",
          hover: "hover:bg-gray-700",
        };
      case "user-login":
        return {
          background: "from-gray-600 to-gray-800",
          accent: "bg-gray-500",
          hover: "hover:bg-gray-700",
        };
      default:
        return {
          background: "from-gray-600 to-gray-800",
          accent: "bg-gray-500",
          hover: "hover:bg-gray-700",
        };
    }
  };

  const theme = getRoleTheme(role);
  const navigationItems = getNavigationItems(role); // ✅ pass role here

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-16 left-0 h-full bg-gradient-to-b ${
            theme.background
          } text-white
          transition-all duration-300 ease-in-out z-30
          ${isExpanded ? "w-64" : "w-16"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-3">
          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center rounded-lg transition-colors duration-200 px-3 py-2 no-underline
                  ${
                    isActive
                      ? "bg-white/20 text-white font-semibold"
                      : `text-white/80 ${theme.hover} hover:text-white`
                  }
                `}
              >
                {/* ✅ Check type of icon */}
                {typeof item.icon === "string" ? (
                  <i className={`${item.icon} text-xl flex-shrink-0`}></i>
                ) : (
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                )}

                <span
                  className={`ml-3 whitespace-nowrap transition-all duration-300 ${
                    isExpanded
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
