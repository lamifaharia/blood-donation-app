import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from '../../hooks/useAuth';

const MyDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMyRequests = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/donations/my-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        Swal.fire("Error", "Failed to load your requests", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-base-content">My Donation Requests</h2>
      </div>

      {requests.length === 0 ? (
        <div className="card bg-base-100 border border-base-200 shadow-sm p-10 text-center">
          <p className="text-lg text-base-content/60">You haven't created any requests yet.</p>
        </div>
      ) : (
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Blood Group</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="font-semibold">{req.recipientName}</td>
                  <td className="text-base-content/70">{req.recipientDistrict}, {req.recipientUpazila}</td>
                  <td>
                    <span className="badge badge-error badge-outline font-bold">{req.bloodGroup}</span>
                  </td>
                  <td className="text-base-content/70">{req.donationDate}</td>
                  <td>
                    <span className={`badge ${
                      req.status === 'done' ? 'badge-success' : 
                      req.status === 'inprogress' ? 'badge-info' : 'badge-warning'
                    } badge-soft capitalize`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* TODO: Add a button to create a new request if the list is empty:
          <Link to="/dashboard/create-donation-request" className="btn btn-error text-white">Create New Request</Link> 
      */}
    </div>
  );
};

export default MyDonationRequests;