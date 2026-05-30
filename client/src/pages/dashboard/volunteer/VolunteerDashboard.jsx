import { ClipboardList, CheckCircle, Clock, Users } from 'lucide-react';

const VolunteerDashboard = () => {
  const stats = [
    { title: "Pending Requests", value: "8", icon: Clock, color: "text-amber-500" },
    { title: "Requests Approved", value: "24", icon: CheckCircle, color: "text-green-500" },
    { title: "Total Volunteers", value: "15", icon: Users, color: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content">Volunteer Portal</h1>
        <p className="text-base-content/60">Manage and coordinate ongoing donation requests.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body flex flex-row items-center gap-4">
              <div className={`p-3 rounded-full bg-base-200 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-base-content/60 font-medium">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Section */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-error" />
            Urgent Requests for Action
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-base-content/70">
                  <th>Requester</th>
                  <th>Blood Group</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-base-50">
                  <td>John Doe</td>
                  <td><div className="badge badge-error text-white">O+</div></td>
                  <td>Dhaka Medical</td>
                  <td><button className="btn btn-sm btn-outline btn-error">Details</button></td>
                </tr>
                <tr className="hover:bg-base-50">
                  <td>Sarah Smith</td>
                  <td><div className="badge badge-error text-white">B-</div></td>
                  <td>Chittagong General</td>
                  <td><button className="btn btn-sm btn-outline btn-error">Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;