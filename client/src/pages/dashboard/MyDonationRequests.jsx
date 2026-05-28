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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(requests, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default MyDonationRequests;