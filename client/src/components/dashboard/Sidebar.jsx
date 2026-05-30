import { NavLink } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth"; 
import { Home, User, PlusCircle, List, Users, HandHeart, DollarSign, LogOut, Shield } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard Home', icon: Home },
    { path: '/dashboard/profile', label: 'My Profile', icon: User },
    { path: '/dashboard/admin', label: 'Admin Home', icon: Shield },
    { path: '/dashboard/all-users', label: 'All Users', icon: Users },
    { path: '/dashboard/all-blood-requests', label: 'All Requests', icon: HandHeart },
    { path: '/dashboard/donor', label: 'Donor Dashboard', icon: User },
    { path: '/dashboard/volunteer', label: 'Volunteer Dashboard', icon: Users },
    { path: '/dashboard/create-donation-request', label: 'Create Request', icon: PlusCircle },
    { path: '/dashboard/my-donation-requests', label: 'My Requests', icon: List },
    { path: '/dashboard/funding', label: 'Funding', icon: DollarSign },
  ];

  return (
    <div className="w-72 bg-base-100 border-r border-base-200 min-h-screen flex flex-col shrink-0">
      <div className="p-6 flex flex-col grow">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-10 h-10 bg-error rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-error/20">
            🩸
          </div>
          <div>
            <h2 className="font-bold text-xl text-base-content">BloodLink</h2>
            <p className="text-xs text-base-content/60 capitalize font-medium">
              {user?.role || 'Donor'} Dashboard
            </p>
          </div>
        </div>

        <nav className="space-y-2 grow">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-error text-white shadow-md shadow-error/20' 
                    : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-base-200">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-error ring-offset-2">
                <img src={user?.avatar || '/placeholder-user.png'} alt="Profile" />
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-error hover:bg-error/10 rounded-lg text-sm font-bold transition-all"
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