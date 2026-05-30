import { Droplet, History, HeartHandshake, Award } from 'lucide-react';

const DonorDashboard = () => {
  const stats = [
    { title: "Total Donations", value: "12", icon: Droplet, color: "text-blue-500" },
    { title: "Lives Saved", value: "36", icon: HeartHandshake, color: "text-error" },
    { title: "Donor Level", value: "Gold", icon: Award, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content">Donor Dashboard</h1>
        <p className="text-base-content/60">Welcome back, here is your contribution summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body flex flex-row items-center gap-4">
              <div className={`p-3 rounded-full bg-base-200 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-error" />
            Recent Donation History
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/70">
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>May 15, 2026</td>
                  <td>Dhaka Central Hospital</td>
                  <td><span className="badge badge-success badge-sm text-white">Completed</span></td>
                </tr>
                <tr>
                  <td>Feb 10, 2026</td>
                  <td>Chittagong Blood Bank</td>
                  <td><span className="badge badge-success badge-sm text-white">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;