import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const avatarUrl = await uploadImage(avatar);

      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: avatarUrl,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
      });

      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      login(loginRes.data.user, loginRes.data.token);
      Swal.fire({ title: 'Success!', text: 'Account created successfully!', icon: 'success' });
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center text-base-content mb-8">Join as a Donor</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full ring ring-error ring-offset-base-100 ring-offset-2 overflow-hidden">
                  {avatarPreview ? <img src={avatarPreview} alt="Preview" /> : <div className="flex items-center justify-center h-full text-4xl bg-base-200">📸</div>}
                </div>
              </div>
              <label className="btn btn-sm btn-outline btn-error">
                Upload Photo
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control"><label className="label"><span className="label-text font-medium">Full Name *</span></label><input type="text" name="name" onChange={handleChange} required className="input input-bordered w-full" /></div>
              <div className="form-control"><label className="label"><span className="label-text font-medium">Email *</span></label><input type="email" name="email" onChange={handleChange} required className="input input-bordered w-full" /></div>
              <div className="form-control"><label className="label"><span className="label-text font-medium">Blood Group *</span></label><select name="bloodGroup" onChange={handleChange} required className="select select-bordered w-full"><option value="">Select Group</option>{bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}</select></div>
              <div className="form-control"><label className="label"><span className="label-text font-medium">District *</span></label><input type="text" name="district" onChange={handleChange} required className="input input-bordered w-full" /></div>
              <div className="form-control"><label className="label"><span className="label-text font-medium">Upazila *</span></label><input type="text" name="upazila" onChange={handleChange} required className="input input-bordered w-full" /></div>
              <div className="form-control"><label className="label"><span className="label-text font-medium">Password *</span></label><input type="password" name="password" onChange={handleChange} required className="input input-bordered w-full" /></div>
              <div className="form-control"><label className="label"><span className="label-text font-medium">Confirm Password *</span></label><input type="password" name="confirmPassword" onChange={handleChange} required className="input input-bordered w-full" /></div>
            </div>
            <button type="submit" disabled={loading} className={`btn btn-error w-full text-white text-lg ${loading ? 'loading' : ''}`}>
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          <p className="text-center mt-6 text-base-content/70">Already have an account? <Link to="/login" className="text-error font-bold hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;