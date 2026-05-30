import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';

const DashboardHome = () => {
  const { token, user } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/donations/my-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentRequests(sorted.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchRecentRequests();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/donations/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('Updated!', `Request marked as ${newStatus}`, 'success');
      window.location.reload(); 
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Hero Card*/}
      <div className="hero bg-error text-error-content rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Welcome back, {user?.name || 'Donor'}! 👋</h1>
          <p className="py-3 text-lg opacity-90">Thank you for being a hero. Your contribution saves lives.</p>
        </div>
        
        <div className="w-48 md:w-64">
          <img 
            src="/Dashboard.png" 
            alt="Dashboard" 
            className="w-full h-auto drop-shadow-lg" 
          />
        </div>
      </div>

      {/* Recent Requests Section */}
      <div className="card bg-base-100 border border-base-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Requests</h2>
          <Link to="/dashboard/my-donation-requests" className="btn btn-sm btn-ghost hover:text-error">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center p-10"><span className="loading loading-spinner text-error"></span></div>
        ) : recentRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Group</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id}>
                    <td className="font-semibold">{req.recipientName}</td>
                    <td className="text-base-content/70">{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td><span className="badge badge-error badge-outline font-bold">{req.bloodGroup}</span></td>
                    <td className="text-sm">
                      {req.donationDate}<br/>{req.donationTime}
                    </td>
                    <td>
                      <span className={`badge ${
                        req.status === 'done' ? 'badge-success' : 
                        req.status === 'inprogress' ? 'badge-info' : 'badge-ghost'
                      } badge-soft capitalize`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="text-center">
                      {req.status === 'inprogress' && (
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => handleStatusChange(req._id, 'done')} className="btn btn-xs btn-success text-white">Done</button>
                          <button onClick={() => handleStatusChange(req._id, 'canceled')} className="btn btn-xs btn-error text-white">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-base-content/50">No recent donation requests yet.</div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;