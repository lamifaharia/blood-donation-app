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
import Funding from './pages/dashboard/Funding';

// Admin Pages
import AdminDashboardHome from './pages/dashboard/admin/AdminDashboardHome';
import AllUsers from './pages/dashboard/admin/AllUsers';
import AllBloodRequests from './pages/dashboard/admin/AllBloodRequests';

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
              {/* Common & Donor Routes */}
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="create-donation-request" element={<CreateDonationRequest />} />
              <Route path="my-donation-requests" element={<MyDonationRequests />} />
              <Route path="funding" element={<Funding />} />

              {/* Admin Routes */}
              <Route path="admin" element={<AdminDashboardHome />} />
              <Route path="all-users" element={<AllUsers />} />
              <Route path="all-blood-requests" element={<AllBloodRequests />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;