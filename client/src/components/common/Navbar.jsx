import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold flex items-center gap-2">
          🩸 BloodLink
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <Link to="/donation-requests" className="hover:text-red-200 transition">Donation Requests</Link>
          <Link to="/search" className="hover:text-red-200 transition">Search Donors</Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 hover:bg-red-700 px-4 py-2 rounded-full transition"
              >
                Dashboard
              </Link>
              
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 border border-white rounded-full hover:bg-white hover:text-red-600 transition font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="px-6 py-2.5 border border-white rounded-full hover:bg-white hover:text-red-600 transition font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-2.5 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition"
              >
                Join as Donor
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;