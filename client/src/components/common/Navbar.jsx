import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar bg-base-100/90 backdrop-blur-sm sticky top-0 z-50 px-4 md:px-12 border-b border-base-200 shadow-sm">
      
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow-xl bg-base-100 rounded-2xl w-52 font-medium">
            <li><Link to="/donation-requests">Donation Requests</Link></li>
            <li><Link to="/search">Search Donors</Link></li>
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold text-error flex items-center gap-2 transition-transform hover:scale-105">
          🩸 BloodLink
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
          <li>
            <Link to="/donation-requests" className="rounded-xl px-4 py-2 hover:bg-error/10 hover:text-error transition-all">
              Donation Requests
            </Link>
          </li>
          <li>
            <Link to="/search" className="rounded-xl px-4 py-2 hover:bg-error/10 hover:text-error transition-all">
              Search Donors
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            <Link 
              to={user.role === 'volunteer' ? "/dashboard/volunteer" : "/dashboard"} 
              className="btn btn-sm btn-outline btn-error rounded-xl px-5"
            >
              {user.role === 'volunteer' ? "Volunteer Dashboard" : "Dashboard"}
            </Link>

            <button 
              onClick={logout} 
              className="btn btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl px-5"
            >
              Logout
            </button>
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">
                <img src={user.avatar || '/default-avatar.png'} alt="Profile" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm btn-ghost rounded-xl px-6 hover:bg-base-200">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-error text-white rounded-xl px-6 shadow-md shadow-error/20 hover:shadow-error/40 transition-all hover:scale-105">
              Join as Donor
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;