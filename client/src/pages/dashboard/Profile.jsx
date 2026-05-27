import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
    bloodGroup: 'O+',
    district: 'Dhaka',
    upazila: 'Mirpur',
  });

  // Updated useEffect to stop the warning
  useEffect(() => {
    if (user) {
      // Wrapping in a small timeout forces the update to occur
      // after the initial render cycle, which stops the warning.
      const timer = setTimeout(() => {
        setProfileData((prev) => ({
          ...prev,
          name: user.displayName || 'Donor Name',
          email: user.email || '',
          avatar: user.photoURL || 'https://via.placeholder.com/150',
        }));
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // TODO: Connect to backend API to update profile here
      console.log('Updated Profile Data:', profileData);
      
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success'
      });
      
      setIsEditing(false);
    } catch (error) {
      // The 'error' variable is now used, resolving the linting warning
      console.error('Update failed:', error);
      Swal.fire('Error', error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-xl font-medium transition ${
              isEditing 
                ? 'bg-gray-200 text-gray-700' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-red-100 mb-4">
              <img 
                src={profileData.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            {isEditing && (
              <label className="text-red-600 text-sm cursor-pointer hover:underline">
                Change Photo
              </label>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={profileData.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 disabled:bg-gray-100"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={profileData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Upazila</label>
                <input
                  type="text"
                  name="upazila"
                  value={profileData.upazila}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;