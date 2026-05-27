import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
  const { user } = useAuth();
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
    setLoading(true);

    try {
      const requestData = {
        ...formData,
        requesterName: user?.displayName || user?.email?.split('@')[0],
        requesterEmail: user?.email,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      console.log('Donation Request Created:', requestData);

      Swal.fire({
        title: 'Success!',
        text: 'Donation request created successfully!',
        icon: 'success',
        confirmButtonColor: '#dc2626'
      });

      // Reset form
      setFormData({
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

      navigate('/dashboard');

    } catch (error) {
      // Fixed: 'error' is now used, resolving the ESLint warning
      console.error('Failed to create request:', error);
      Swal.fire('Error', error.message || 'Failed to create request', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Create Blood Donation Request</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requester Info (Read Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Requester Name</label>
              <input
                type="text"
                value={user?.email?.split('@')[0] || 'User'}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Requester Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Recipient Name *</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Blood Group Needed *</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Recipient District *</label>
              <input
                type="text"
                name="recipientDistrict"
                value={formData.recipientDistrict}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
                placeholder="e.g. Dhaka"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Recipient Upazila *</label>
              <input
                type="text"
                name="recipientUpazila"
                value={formData.recipientUpazila}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
                placeholder="e.g. Mirpur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
                placeholder="e.g. Dhaka Medical College Hospital"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Donation Date *</label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Donation Time *</label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Address</label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="House No, Road No, Area..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Request Message (Why needed?)</label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Explain the situation in detail..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition disabled:opacity-70"
          >
            {loading ? 'Creating Request...' : 'Create Donation Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;