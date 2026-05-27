import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockData = [
        {
          id: 1,
          recipientName: "Rahim Khan",
          recipientDistrict: "Dhaka",
          recipientUpazila: "Mirpur",
          bloodGroup: "O+",
          donationDate: "2026-06-02",
          donationTime: "10:00 AM",
          status: "inprogress",
          hospitalName: "Dhaka Medical College Hospital"
        },
        {
          id: 2,
          recipientName: "Fatima Begum",
          recipientDistrict: "Chittagong",
          recipientUpazila: "Double Mooring",
          bloodGroup: "A-",
          donationDate: "2026-06-05",
          donationTime: "02:30 PM",
          status: "pending",
          hospitalName: "Chittagong Medical College"
        },
        {
          id: 3,
          recipientName: "Karim Ahmed",
          recipientDistrict: "Sylhet",
          recipientUpazila: "Zindabazar",
          bloodGroup: "B+",
          donationDate: "2026-06-10",
          donationTime: "09:00 AM",
          status: "done",
          hospitalName: "Sylhet MAG Osmani Medical"
        },
        {
          id: 4,
          recipientName: "Nadia Islam",
          recipientDistrict: "Dhaka",
          recipientUpazila: "Gulshan",
          bloodGroup: "AB-",
          donationDate: "2026-06-15",
          donationTime: "11:30 AM",
          status: "canceled",
          hospitalName: "Square Hospital"
        }
      ];
      setRequests(mockData);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(req => req.status === filter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter(req => req.id !== id));
        Swal.fire('Deleted!', 'Request has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">My Donation Requests</h2>
        <Link 
          to="/dashboard/create-donation-request"
          className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
        >
          + New Request
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition ${
              filter === status 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All Requests' : status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
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
            {paginatedRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
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
                  <span className={`px-4 py-1 rounded-full text-sm font-medium capitalize
                    ${req.status === 'done' ? 'bg-green-100 text-green-700' : 
                      req.status === 'inprogress' ? 'bg-yellow-100 text-yellow-700' : 
                      req.status === 'canceled' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <Link 
                      to={`/dashboard/request/${req.id}`}
                      className="bg-blue-600 text-white px-4 py-1 text-xs rounded-lg hover:bg-blue-700"
                    >
                      View
                    </Link>
                    <button 
                      onClick={() => handleDelete(req.id)}
                      className="bg-red-600 text-white px-4 py-1 text-xs rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl ${
                currentPage === page 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;