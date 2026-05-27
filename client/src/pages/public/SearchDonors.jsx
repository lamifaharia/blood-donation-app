import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Using a timer to keep the state update clean and warning-free
    const timer = setTimeout(() => {
      const mockRequests = [
        {
          id: 101,
          recipientName: "Rahim Khan",
          location: "Dhaka, Mirpur",
          bloodGroup: "O+",
          date: "2026-06-02",
          time: "10:00 AM",
          message: "Father needs urgent blood after surgery."
        },
        {
          id: 102,
          recipientName: "Fatima Begum",
          location: "Chittagong, Double Mooring",
          bloodGroup: "A-",
          date: "2026-06-03",
          time: "03:00 PM",
          message: "Emergency blood needed for mother."
        },
        {
          id: 103,
          recipientName: "Karim Ahmed",
          location: "Sylhet, Zindabazar",
          bloodGroup: "B+",
          date: "2026-06-04",
          time: "11:30 AM",
          message: "Accident victim needs blood urgently."
        }
      ];
      setRequests(mockRequests);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Blood Donation Requests</h1>
        <p className="text-gray-600 text-lg">Help someone in need. All requests shown below are <strong>pending</strong>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-red-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-red-600 font-bold text-3xl">{req.bloodGroup}</p>
                <p className="text-gray-500 text-sm mt-1">{req.date} • {req.time}</p>
              </div>
              <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">Pending</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">{req.recipientName}</h3>
            <p className="text-gray-600 mb-4">{req.location}</p>
            
            <p className="text-gray-700 text-sm line-clamp-3 mb-6">
              {req.message}
            </p>

            <Link
              to={`/dashboard/request/${req.id}`}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
            >
              View Details & Donate
            </Link>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <p className="text-center text-gray-500 py-20 text-xl">No pending requests at the moment.</p>
      )}
    </div>
  );
};

export default DonationRequests;