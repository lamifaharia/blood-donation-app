import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import SearchDonors from './pages/public/SearchDonors';
import DonationRequests from './pages/public/DonationRequests';

// Dashboard Core
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Profile from './pages/dashboard/Profile';
import CreateDonationRequest from './pages/dashboard/CreateDonationRequest';
import MyDonationRequests from './pages/dashboard/MyDonationRequests';
import Funding from './pages/dashboard/Funding';
import DonationRequestDetails from './pages/dashboard/DonationRequestDetails';

// Admin Pages
import AdminDashboardHome from './pages/dashboard/admin/AdminDashboardHome';
import AllUsers from './pages/dashboard/admin/AllUsers';
import AllBloodRequests from './pages/dashboard/admin/AllBloodRequests';
import DonorDashboard from './pages/dashboard/donor/DonorDashboard';
import VolunteerDashboard from './pages/dashboard/volunteer/VolunteerDashboard';

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
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="create-donation-request" element={<CreateDonationRequest />} />
              <Route path="my-donation-requests" element={<MyDonationRequests />} />
              <Route path="funding" element={<Funding />} />
              <Route path="request/:id" element={<DonationRequestDetails />} />

              {/* Admin Routes */}
              <Route path="admin" element={<AdminDashboardHome />} />
              <Route path="all-users" element={<AllUsers />} />
              <Route path="all-blood-requests" element={<AllBloodRequests />} />
              <Route path="donor" element={<DonorDashboard />} />
              <Route path="volunteer" element={<VolunteerDashboard />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;