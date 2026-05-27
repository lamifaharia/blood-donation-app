import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import SearchDonors from './pages/public/SearchDonors';
import DonationRequests from './pages/public/DonationRequests';

// Dashboard
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Profile from './pages/dashboard/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchDonors />} />
            <Route path="/donation-requests" element={<DonationRequests />} />

            {/* Private Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<div>Dashboard Home - Coming Soon</div>} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;