import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../hooks/useAuth';

const AllBloodRequests = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        setLoading(true);
        // Mock data
        const mockRequests = [
          {
            _id: 101,
            recipientName: "Rahim Khan",
            recipientDistrict: "Dhaka",
            recipientUpazila: "Mirpur",
            bloodGroup: "O+",
            donationDate: "2026-06-02",
            status: "pending",
            requesterName: "Asif"
          },
          {
            _id: 102,
            recipientName: "Fatima Begum",
            recipientDistrict: "Chittagong",
            recipientUpazila: "Double Mooring",
            bloodGroup: "A-",
            donationDate: "2026-06-03",
            status: "inprogress",
            requesterName: "Nadia"
          }
        ];
        setRequests(mockRequests);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRequests();
  }, [token]); 

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: `Mark as ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.map(req => 
          req._id === id ? { ...req, status: newStatus } : req
        ));
        Swal.fire('Updated!', `Request marked as ${newStatus}`, 'success');
      }
    });
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(req => req.status === filter);

  if (loading) return <div className="text-center py-20 text-xl">Loading requests...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">All Blood Donation Requests</h2>

      <div className="flex gap-3">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-xl text-sm font-medium capitalize ${
              filter === status ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Recipient</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Blood Group</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRequests.map(req => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{req.recipientName}</td>
                <td className="px-6 py-4 text-gray-600">{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td className="px-6 py-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">{req.bloodGroup}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{req.donationDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                    req.status === 'inprogress' ? 'bg-blue-100 text-blue-700' : 
                    req.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {req.status === 'pending' && (
                    <button 
                      onClick={() => handleStatusChange(req._id, 'inprogress')}
                      className="bg-blue-600 text-white px-4 py-1 text-xs rounded-lg hover:bg-blue-700"
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodRequests;