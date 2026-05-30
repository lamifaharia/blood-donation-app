import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        // Mock request
        setRequest({
          _id: id,
          recipientName: "Rahim Khan",
          recipientDistrict: "Dhaka",
          recipientUpazila: "Mirpur",
          hospitalName: "Dhaka Medical College Hospital",
          fullAddress: "Zahir Raihan Rd, Dhaka",
          bloodGroup: "O+",
          donationDate: "2026-06-02",
          donationTime: "10:00 AM",
          requestMessage: "My father needs urgent blood transfusion after surgery.",
          status: "pending",
          requesterName: "Asif Rahman"
        });
      } catch {
        Swal.fire('Error', 'Failed to load request details', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDetails();
  }, [id]);

  const confirmDonation = () => {
    Swal.fire({
      title: 'Donation Confirmed!',
      text: 'Thank you for being a hero!',
      icon: 'success'
    }).then(() => {
      document.getElementById('donation_modal').close();
      navigate('/dashboard/my-donation-requests');
    });
  };

  if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-error"></span></div>;
  if (!request) return <div className="text-center py-20">Request not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-6">
        ← Back to Requests
      </button>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-bold mb-6">Donation Request Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Recipient</p>
                <p className="text-lg font-bold">{request.recipientName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Blood Group</p>
                <div className="badge badge-error badge-lg font-bold text-white mt-1">{request.bloodGroup}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Location</p>
                <p className="font-medium">{request.recipientDistrict}, {request.recipientUpazila}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-base-content/60 font-semibold">Hospital</p>
                <p className="font-medium">{request.hospitalName}</p>
              </div>
            </div>
          </div>

          <div className="divider my-6"></div>

          <div>
            <p className="text-xs uppercase tracking-wider text-base-content/60 font-semibold mb-2">Request Message</p>
            <p className="bg-base-200 p-6 rounded-xl italic text-base-content/80">
              "{request.requestMessage}"
            </p>
          </div>

          {request.status === 'pending' && (
            <button
              onClick={() => document.getElementById('donation_modal').showModal()}
              className="btn btn-error btn-block text-white mt-8 text-lg"
            >
              I Want To Donate Blood
            </button>
          )}
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">Confirm Your Donation</h3>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm text-base-content/60">Donor Name</p>
              <p className="font-semibold">{user?.name || "Donor"}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Donor Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2 w-full">
              <button className="btn flex-1">Cancel</button>
              <button onClick={confirmDonation} className="btn btn-error text-white flex-1">Confirm</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;