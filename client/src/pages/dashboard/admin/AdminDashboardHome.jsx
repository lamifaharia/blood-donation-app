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
      <h1 className="text-3xl font-bold text-base-content">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100 border border-base-200">
        <div className="stat">
          <div className="stat-figure text-error text-3xl">👥</div>
          <div className="stat-title font-semibold">Total Users</div>
          <div className="stat-value text-error">{stats.totalUsers}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-error text-3xl">🩸</div>
          <div className="stat-title font-semibold">Total Requests</div>
          <div className="stat-value text-error">{stats.totalDonationRequests}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-error text-3xl">💰</div>
          <div className="stat-title font-semibold">Total Funds</div>
          <div className="stat-value text-error">৳{stats.totalFunds}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="card border border-base-200 p-6 hover:bg-error/10 hover:border-error transition text-left">
              <h3 className="font-semibold">Manage All Users</h3>
              <p className="text-sm text-base-content/70 mt-2">Block / Unblock users and change roles</p>
            </button>
            <button className="card border border-base-200 p-6 hover:bg-error/10 hover:border-error transition text-left">
              <h3 className="font-semibold">View All Requests</h3>
              <p className="text-sm text-base-content/70 mt-2">Manage all donation requests</p>
            </button>
          </div>
          {/* TODO: Add your dashboard banner image here: 
              <img src="/dashboard-hero.jpg" alt="Admin Panel" className="rounded-xl mt-6 w-full h-40 object-cover" /> 
          */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;