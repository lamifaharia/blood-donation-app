import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../../components/dashboard/Sidebar';

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <header className="bg-base-100 shadow-sm border-b border-base-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-base-content capitalize">
            {user.role} Dashboard
          </h1>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-base-content/70">
              {user.name || user.email?.split('@')[0]}
            </span>
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                <span className="text-xs">{(user.name || 'U').charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;