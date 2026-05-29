import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { uploadImage } from '../../utils/imageUpload';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match!', 'error');
      return;
    }

    if (!avatar) {
      Swal.fire('Error', 'Please upload an avatar!', 'error');
      return;
    }

    setLoading(true);

    try {
      // 1. Create user in Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // 2. Upload avatar
      const avatarUrl = await uploadImage(avatar);

      // 3. Register in Backend
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: avatarUrl,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
      });

      // 4. Auto Login
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      login(loginRes.data.user, loginRes.data.token);

      Swal.fire({
        title: 'Success!',
        text: 'Account created and logged in successfully!',
        icon: 'success'
      });

      navigate('/dashboard');

    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-8">Join as a Donor</h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 border-2 border-dashed border-red-300 rounded-full overflow-hidden mb-4">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">📸</div>
              )}
            </div>
            <label className="cursor-pointer bg-red-100 text-red-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-red-200">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Blood Group *</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">District *</label>
              <input type="text" name="district" value={formData.district} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500" placeholder="e.g. Dhaka" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upazila *</label>
              <input type="text" name="upazila" value={formData.upazila} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500" placeholder="e.g. Mirpur" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password *</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Register & Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-red-600 font-medium hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;