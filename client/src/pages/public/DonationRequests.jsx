import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockRequests = [
        { id: 101, recipientName: "Rahim Khan", location: "Dhaka, Mirpur", bloodGroup: "O+", date: "2026-06-02", time: "10:00 AM", message: "Father needs urgent blood after surgery." },
        { id: 102, recipientName: "Fatima Begum", location: "Chittagong, Double Mooring", bloodGroup: "A-", date: "2026-06-03", time: "03:00 PM", message: "Emergency blood needed for mother." },
        { id: 103, recipientName: "Karim Ahmed", location: "Sylhet, Zindabazar", bloodGroup: "B+", date: "2026-06-04", time: "11:30 AM", message: "Accident victim needs blood urgently." },
        { id: 104, recipientName: "Nadia Islam", location: "Dhaka, Gulshan", bloodGroup: "AB-", date: "2026-06-05", time: "09:15 AM", message: "Child needs blood for thalassemia treatment." },
        { id: 105, recipientName: "Sohel Rana", location: "Rajshahi, Motihar", bloodGroup: "A+", date: "2026-06-06", time: "02:45 PM", message: "Wife had a major operation and needs blood." },
        { id: 106, recipientName: "Tania Akter", location: "Khulna, Daulatpur", bloodGroup: "B-", date: "2026-06-07", time: "08:00 AM", message: "Mother needs blood after delivery." },
        { id: 107, recipientName: "Imran Hossain", location: "Barisal, Sadar", bloodGroup: "O-", date: "2026-06-08", time: "01:20 PM", message: "Urgent need for heart surgery patient." },
        { id: 108, recipientName: "Mim Akter", location: "Dhaka, Uttara", bloodGroup: "AB+", date: "2026-06-09", time: "10:30 AM", message: "Brother met with a road accident." },
        { id: 109, recipientName: "Hasan Mahmud", location: "Comilla, Sadar", bloodGroup: "A-", date: "2026-06-10", time: "04:00 PM", message: "Cancer patient needs regular blood transfusion." }
      ];
      setRequests(mockRequests);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-base-content mb-4">Blood Donation Requests</h1>
        <p className="text-base-content/70 text-lg">Help someone in need. Every request is a life waiting for a hero.</p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((req) => (
          <div key={req.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="card-body">
              <div className="flex justify-between items-start mb-2">
                <div className="badge badge-error badge-lg text-white font-bold px-4">{req.bloodGroup}</div>
                <span className="badge badge-warning badge-soft font-medium">Pending</span>
              </div>

              <h2 className="card-title text-xl mt-2">{req.recipientName}</h2>
              <p className="text-sm text-base-content/60 font-medium">{req.location}</p>
              
              <div className="py-4 text-base-content/80 text-sm italic">
                "{req.message}"
              </div>

              <div className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-4">
                {req.date} at {req.time}
              </div>

              <div className="card-actions justify-end mt-auto">
                <Link
                  to={`/dashboard/request/${req.id}`}
                  className="btn btn-error btn-block text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;