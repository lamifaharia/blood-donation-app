import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          🩸 BloodLink
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/donation-requests" className="hover:underline">Donation Requests</Link>
          <Link to="/search" className="hover:underline">Search Donors</Link>
          
          <div className="flex gap-3">
            <Link to="/login" className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-red-600">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 bg-white text-red-600 rounded-full font-medium">
              Join as Donor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;