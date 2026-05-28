import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../../components/dashboard/Sidebar';

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading Dashboard...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user.role === 'admin' ? 'Admin Dashboard' : 
             user.role === 'volunteer' ? 'Volunteer Dashboard' : 'Donor Dashboard'}
          </h1>
          <div className="text-sm text-gray-600">
            {user.name || user.email}
          </div>
        </div>

        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;