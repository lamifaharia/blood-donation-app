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
        const mockRequests = [
          { _id: 101, recipientName: "Rahim Khan", recipientDistrict: "Dhaka", recipientUpazila: "Mirpur", bloodGroup: "O+", donationDate: "2026-06-02", status: "pending", requesterName: "Asif" },
          { _id: 102, recipientName: "Fatima Begum", recipientDistrict: "Chittagong", recipientUpazila: "Double Mooring", bloodGroup: "A-", donationDate: "2026-06-03", status: "inprogress", requesterName: "Nadia" }
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
      confirmButtonColor: '#e11d48', // Updated to match your brand red
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.map(req => req._id === id ? { ...req, status: newStatus } : req));
        Swal.fire('Updated!', `Request marked as ${newStatus}`, 'success');
      }
    });
  };

  const filteredRequests = filter === 'all' ? requests : requests.filter(req => req.status === filter);

  if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-error"></span></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-base-content">All Blood Donation Requests</h2>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`tab capitalize ${filter === status ? 'tab-active bg-error text-white' : ''}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="text-base">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => (
              <tr key={req._id}>
                <td className="font-semibold">{req.recipientName}</td>
                <td className="text-base-content/70">{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td>
                  <span className="badge badge-error badge-outline font-bold">{req.bloodGroup}</span>
                </td>
                <td className="text-base-content/70">{req.donationDate}</td>
                <td>
                  <span className={`badge ${
                    req.status === 'pending' ? 'badge-warning' : 
                    req.status === 'inprogress' ? 'badge-info' : 
                    req.status === 'done' ? 'badge-success' : 'badge-error'
                  } badge-soft capitalize`}>
                    {req.status}
                  </span>
                </td>
                <td className="text-center">
                  {req.status === 'pending' && (
                    <button 
                      onClick={() => handleStatusChange(req._id, 'inprogress')}
                      className="btn btn-sm btn-error text-white rounded-lg"
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: Add a placeholder empty state if filteredRequests.length === 0:
            <div className="p-10 text-center text-base-content/50">No requests found for this status.</div>
        */}
      </div>
    </div>
  );
};

export default AllBloodRequests;