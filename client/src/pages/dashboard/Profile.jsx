import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
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

  useEffect(() => {
    if (user) {
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
      console.log('Updated Profile Data:', profileData);
      
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success'
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card bg-base-100 border border-base-200 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">My Profile</h2>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn ${isEditing ? 'btn-ghost' : 'btn-error text-white'}`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col items-center">
            <div className="avatar mb-4">
              <div className="w-40 rounded-2xl ring ring-error ring-offset-base-100 ring-offset-2">
                <img src={profileData.avatar} alt="Profile" />
              </div>
            </div>
            {isEditing && (
              <label className="text-error text-sm cursor-pointer hover:underline font-medium">
                Change Photo
              </label>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Full Name</span></label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input input-bordered w-full disabled:bg-base-200"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Email Address</span></label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Blood Group</span></label>
                <select
                  name="bloodGroup"
                  value={profileData.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="select select-bordered w-full disabled:bg-base-200"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">District</span></label>
                <input
                  type="text"
                  name="district"
                  value={profileData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input input-bordered w-full disabled:bg-base-200"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Upazila</span></label>
                <input
                  type="text"
                  name="upazila"
                  value={profileData.upazila}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input input-bordered w-full disabled:bg-base-200"
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn btn-success text-white w-full text-lg"
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