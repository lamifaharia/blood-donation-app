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

    if (token) {
      fetchRecentRequests();
    }
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/donations/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire('Updated!', `Request marked as ${newStatus}`, 'success');
      
      // Re-fetch data
      window.location.reload(); 
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-red-600 to-red-700 text-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.name || 'Donor'}! 👋
        </h1>
        <p className="text-red-100 mt-3 text-lg">
          Thank you for being a hero. Your donations save lives.
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Donation Requests</h2>
          <Link to="/dashboard/my-donation-requests" className="text-red-600 hover:underline font-medium">
            View All →
          </Link>
        </div>

        {loading ? (
          <p>Loading recent requests...</p>
        ) : recentRequests.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Recipient</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Blood Group</th>
                  <th className="px-6 py-4 text-left">Date & Time</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{req.recipientName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {req.donationDate}<br />
                      <span className="text-sm">{req.donationTime}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                        ${req.status === 'done' ? 'bg-green-100 text-green-700' : 
                          req.status === 'inprogress' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-gray-100 text-gray-700'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {req.status === 'inprogress' && (
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => handleStatusChange(req._id, 'done')}
                            className="bg-green-600 text-white px-4 py-1 text-xs rounded-lg hover:bg-green-700"
                          >
                            Done
                          </button>
                          <button 
                            onClick={() => handleStatusChange(req._id, 'canceled')}
                            className="bg-red-600 text-white px-4 py-1 text-xs rounded-lg hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No recent donation requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;