import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import SearchDonors from './pages/public/SearchDonors';
import DonationRequests from './pages/public/DonationRequests';

// Dashboard Pages (we'll create these step by step)
import DashboardLayout from './pages/dashboard/DashboardLayout';

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
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;