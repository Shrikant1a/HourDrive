import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerBookings from './pages/customer/CustomerBookings';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AddVehiclePage from './pages/owner/AddVehiclePage';
import OwnerVehiclesPage from './pages/owner/OwnerVehiclesPage';
import OwnerRequestsPage from './pages/owner/OwnerRequestsPage';
import AdminDashboard from './pages/admin/AdminDashboard';

// Placeholder for sub-pages not yet implemented
function ComingSoon({ page }) {
  return (
    <div className="min-h-screen bg-[#050A14] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚗</div>
        <h2 className="text-2xl font-bold font-['Outfit'] text-white mb-2">{page}</h2>
        <p className="text-white/40 mb-6">This section is being polished to perfection.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0A1628',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
            success: { iconTheme: { primary: '#00D4FF', secondary: '#ffffff' } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Customer routes */}
          <Route path="/customer/dashboard" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/customer/bookings" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerBookings />
            </ProtectedRoute>
          } />
          <Route path="/customer/profile" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ComingSoon page="My Profile" />
            </ProtectedRoute>
          } />
          <Route path="/customer/favourites" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ComingSoon page="Favourite Vehicles" />
            </ProtectedRoute>
          } />
          <Route path="/customer/payments" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ComingSoon page="Payment History" />
            </ProtectedRoute>
          } />
          <Route path="/customer/notifications" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ComingSoon page="Notifications" />
            </ProtectedRoute>
          } />
          <Route path="/customer/support" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ComingSoon page="Customer Support" />
            </ProtectedRoute>
          } />

          {/* Owner routes */}
          <Route path="/owner/dashboard" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/owner/vehicles" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerVehiclesPage />
            </ProtectedRoute>
          } />
          <Route path="/owner/add-vehicle" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <AddVehiclePage />
            </ProtectedRoute>
          } />
          <Route path="/owner/requests" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerRequestsPage />
            </ProtectedRoute>
          } />
          <Route path="/owner/earnings" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <ComingSoon page="Earnings" />
            </ProtectedRoute>
          } />
          <Route path="/owner/reviews" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <ComingSoon page="Customer Reviews" />
            </ProtectedRoute>
          } />
          <Route path="/owner/profile" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <ComingSoon page="Profile & Verification" />
            </ProtectedRoute>
          } />
          <Route path="/owner/active" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <ComingSoon page="Active Bookings" />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/vehicles" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/approvals" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ComingSoon page="Booking Management" />
            </ProtectedRoute>
          } />
          <Route path="/admin/payments" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ComingSoon page="Payment Management" />
            </ProtectedRoute>
          } />
          <Route path="/admin/complaints" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ComingSoon page="Complaints & Support" />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ComingSoon page="Platform Settings" />
            </ProtectedRoute>
          } />

          {/* Profile */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ComingSoon page="Profile Settings" />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen bg-[#050A14] flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-bold font-['Outfit'] gradient-text mb-4">404</div>
                <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
                <p className="text-white/50 mb-6">The road you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary">Back to HourDrive</a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
