import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 
import { Home, User, PlusCircle, List, DollarSign, LogOut } from "lucide-react";

const Sidebar = () => {
  const auth = useAuth();
  const logout =
    auth?.logout || (() => console.error("Logout function not found"));

  const menuItems = [
    { path: "/dashboard", label: "Dashboard Home", icon: Home },
    { path: "/dashboard/profile", label: "My Profile", icon: User },
    {
      path: "/dashboard/create-donation-request",
      label: "Create Request",
      icon: PlusCircle,
    },
    {
      path: "/dashboard/my-donation-requests",
      label: "My Requests",
      icon: List,
    },
    { path: "/dashboard/funding", label: "Funding", icon: DollarSign },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 shadow-sm hidden md:block min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-2xl">
            🩸
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-800">BloodLink</h2>
            <p className="text-xs text-gray-500">Donor Dashboard</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-50 text-red-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-12">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
