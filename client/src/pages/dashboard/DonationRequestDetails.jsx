import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const request = {
    id: parseInt(id),
    recipientName: "Rahim Khan",
    recipientDistrict: "Dhaka",
    recipientUpazila: "Mirpur",
    hospitalName: "Dhaka Medical College Hospital",
    fullAddress: "Zahir Raihan Rd, Dhaka",
    bloodGroup: "O+",
    donationDate: "2026-06-02",
    donationTime: "10:00 AM",
    requestMessage: "My father needs urgent blood transfusion after surgery. Any help would be appreciated.",
    status: "pending"
  };

  const handleDonate = () => {
    setIsModalOpen(true);
  };

  const confirmDonation = () => {
    Swal.fire({
      title: 'Donation Confirmed!',
      text: 'Status changed to In Progress. Thank you for being a hero!',
      icon: 'success',
    }).then(() => {
      setIsModalOpen(false);
      navigate('/dashboard/my-donation-requests');
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <button 
          onClick={() => navigate(-1)}
          className="text-red-600 mb-6 flex items-center gap-2 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Donation Request Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm">Recipient Name</p>
              <p className="text-xl font-semibold">{request.recipientName}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Blood Group Needed</p>
              <p className="text-3xl font-bold text-red-600">{request.bloodGroup}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium">{request.recipientDistrict}, {request.recipientUpazila}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hospital</p>
              <p className="font-medium">{request.hospitalName}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Full Address</p>
            <p className="font-medium">{request.fullAddress}</p>
            
            <div className="mt-6">
              <p className="text-gray-500 text-sm">Date & Time</p>
              <p className="font-medium">{request.donationDate} at {request.donationTime}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-2">Request Message</p>
          <p className="bg-gray-50 p-6 rounded-xl leading-relaxed">
            {request.requestMessage}
          </p>
        </div>

        {request.status === 'pending' && (
          <button
            onClick={handleDonate}
            className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl text-xl font-semibold transition"
          >
            I Want To Donate
          </button>
        )}
      </div>

      {/* Donate Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6">Confirm Your Donation</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-gray-600">Donor Name</p>
                <p className="font-medium">{user?.email?.split('@')[0]}</p>
              </div>
              <div>
                <p className="text-gray-600">Donor Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 border border-gray-300 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDonation}
                className="flex-1 py-4 bg-red-600 text-white rounded-xl font-semibold"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;