import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '', 
    requestMessage: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const requestData = {
        requesterName: user.name || user.email?.split('@')[0],
        requesterEmail: user.email,
        ...formData,
      };
      await axios.post('http://localhost:5000/api/donations', requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({ title: 'Success!', text: 'Donation request created successfully!', icon: 'success' });
      navigate('/dashboard/my-donation-requests');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to create request', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card bg-base-100 border border-base-200 shadow-sm p-8">
        <img 
          src="/donation_req.png" 
          alt="Create blood donation request" 
          className="w-full h-64 object-cover rounded-2xl mb-8 shadow-md" 
        />

        <h2 className="text-3xl font-bold text-base-content mb-8">Create Blood Donation Request</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Requester Name</span></label>
              <input type="text" value={user?.name || user?.email?.split('@')[0]} disabled className="input input-bordered w-full bg-base-200" />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Requester Email</span></label>
              <input type="email" value={user?.email} disabled className="input input-bordered w-full bg-base-200" />
            </div>
          </div>

          <div className="divider">Request Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Recipient Name *</span></label>
              <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} required className="input input-bordered w-full focus:input-error" />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Blood Group Needed *</span></label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="select select-bordered w-full focus:select-error">
                <option value="">Select Group</option>
                {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">District *</span></label>
              <input type="text" name="recipientDistrict" value={formData.recipientDistrict} onChange={handleChange} required className="input input-bordered w-full focus:input-error" />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Upazila *</span></label>
              <input type="text" name="recipientUpazila" value={formData.recipientUpazila} onChange={handleChange} required className="input input-bordered w-full focus:input-error" />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Hospital Name</span></label>
              <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="input input-bordered w-full focus:input-error" />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Donation Date *</span></label>
              <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} required className="input input-bordered w-full focus:input-error" />
            </div>

            {/* Added Donation Time input */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Donation Time *</span></label>
              <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange} required className="input input-bordered w-full focus:input-error" />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium">Full Address</span></label>
            <textarea name="fullAddress" value={formData.fullAddress} onChange={handleChange} className="textarea textarea-bordered h-20 focus:textarea-error" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium">Request Message *</span></label>
            <textarea name="requestMessage" value={formData.requestMessage} onChange={handleChange} required className="textarea textarea-bordered h-32 focus:textarea-error" placeholder="Explain why blood is needed..." />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-error text-white w-full text-lg"
          >
            {loading ? 'Creating...' : 'Create Donation Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;