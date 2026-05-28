import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import SearchDonors from './pages/public/SearchDonors';
import DonationRequests from './pages/public/DonationRequests';

// Dashboard Pages
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Profile from './pages/dashboard/Profile';
import CreateDonationRequest from './pages/dashboard/CreateDonationRequest';
import MyDonationRequests from './pages/dashboard/MyDonationRequests';

// Admin Pages
import AdminDashboardHome from './pages/dashboard/admin/AdminDashboardHome';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            {/* ==================== PUBLIC ROUTES ==================== */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchDonors />} />
            <Route path="/donation-requests" element={<DonationRequests />} />

            {/* ==================== PRIVATE DASHBOARD ROUTES ==================== */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Donor Routes */}
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="create-donation-request" element={<CreateDonationRequest />} />
              <Route path="my-donation-requests" element={<MyDonationRequests />} />

              {/* Admin Routes */}
              <Route path="admin" element={<AdminDashboardHome />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;