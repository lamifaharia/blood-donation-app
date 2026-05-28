import { useState, useEffect } from 'react';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonationRequests: 0,
    totalFunds: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock data logic
        setStats({
          totalUsers: 124,
          totalDonationRequests: 47,
          totalFunds: 12500
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []); 

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="text-4xl font-bold text-red-600">{stats.totalUsers}</h3>
          <p className="text-gray-600 mt-1">Total Users</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-4xl mb-3">🩸</div>
          <h3 className="text-4xl font-bold text-red-600">{stats.totalDonationRequests}</h3>
          <p className="text-gray-600 mt-1">Total Requests</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-4xl font-bold text-red-600">৳{stats.totalFunds}</h3>
          <p className="text-gray-600 mt-1">Total Funds</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-6 border border-gray-200 rounded-2xl hover:bg-red-50 hover:border-red-200 transition text-left">
            <h3 className="font-semibold">Manage All Users</h3>
            <p className="text-sm text-gray-600 mt-2">Block / Unblock users and change roles</p>
          </button>
          <button className="p-6 border border-gray-200 rounded-2xl hover:bg-red-50 hover:border-red-200 transition text-left">
            <h3 className="font-semibold">View All Requests</h3>
            <p className="text-sm text-gray-600 mt-2">Manage all donation requests</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;