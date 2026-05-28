import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashboardHome = () => {
  const { user } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockRequests = [
        {
          id: 1,
          recipientName: "Rahim Khan",
          district: "Dhaka",
          upazila: "Mirpur",
          bloodGroup: "O+",
          donationDate: "2026-06-02",
          donationTime: "10:00 AM",
          status: "inprogress",
          donorInfo: { name: "You", email: user?.email }
        },
        {
          id: 2,
          recipientName: "Fatima Begum",
          district: "Chittagong",
          upazila: "Double Mooring",
          bloodGroup: "A-",
          donationDate: "2026-06-05",
          donationTime: "02:30 PM",
          status: "pending"
        },
        {
          id: 3,
          recipientName: "Karim Ahmed",
          district: "Sylhet",
          upazila: "Zindabazar",
          bloodGroup: "B+",
          donationDate: "2026-06-10",
          donationTime: "09:00 AM",
          status: "done"
        }
      ];
      setRecentRequests(mockRequests);
    }, 0);

    return () => clearTimeout(timer);
  }, [user]);

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: `Mark as ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Request ${id} marked as ${newStatus}`);
        Swal.fire('Updated!', `Donation request marked as ${newStatus}`, 'success');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-red-600 to-red-700 text-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.email?.split('@')[0] || 'Donor'}! 👋
        </h1>
        <p className="text-red-100 mt-3 text-lg">
          Thank you for being a hero. Your donations save lives.
        </p>
      </div>

      {/* Recent Donation Requests */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Donation Requests</h2>
          <Link 
            to="/dashboard/my-donation-requests"
            className="text-red-600 hover:underline font-medium flex items-center gap-2"
          >
            View All Requests →
          </Link>
        </div>

        {recentRequests.length > 0 ? (
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
                {recentRequests.slice(0, 3).map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{req.recipientName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {req.district}, {req.upazila}
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
                            onClick={() => handleStatusChange(req.id, 'done')}
                            className="bg-green-600 text-white px-4 py-1 text-xs rounded-lg hover:bg-green-700"
                          >
                            Done
                          </button>
                          <button 
                            onClick={() => handleStatusChange(req.id, 'canceled')}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dashboard/create-donation-request" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-red-100 hover:border-red-300">
          <div className="text-red-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Create New Request</h3>
          <p className="text-gray-600 text-sm mt-1">Need blood for someone? Post a request now.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;