import { motion } from 'framer-motion';
import { LayoutDashboard, Car, Calendar, Heart, CreditCard, Bell, MessageCircle, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { MOCK_BOOKINGS, CARS } from '../../data/mockData';

const NAV_ITEMS = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customer/profile', label: 'My Profile', icon: User },
  { to: '/explore', label: 'Search Vehicles', icon: Search },
  { to: '/customer/bookings', label: 'My Bookings', icon: Calendar, badge: '2' },
  { to: '/customer/favourites', label: 'Favourites', icon: Heart },
  { to: '/customer/payments', label: 'Payment History', icon: CreditCard },
  { to: '/customer/notifications', label: 'Notifications', icon: Bell, badge: '3' },
  { to: '/customer/support', label: 'Support', icon: MessageCircle },
];

const STAT_CARDS = [
  { label: 'Total Bookings', value: '12', change: '+3 this month', color: '#00D4FF', icon: Car },
  { label: 'Hours Driven', value: '47h', change: '+8h this month', color: '#6B6FFF', icon: Calendar },
  { label: 'Amount Spent', value: '₹48,200', change: '₹14,500 this month', color: '#10B981', icon: CreditCard },
  { label: 'Favourite Cars', value: '8', change: '2 available now', color: '#FFD700', icon: Heart },
];

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout navItems={NAV_ITEMS} title="Customer Dashboard">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold font-['Outfit'] text-white mb-1">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 👋
        </h2>
        <p className="text-white/50 text-sm">Here's what's happening with your account today.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 border border-white/8 hover:border-[#00D4FF]/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white mb-0.5">{stat.value}</p>
            <p className="text-white/40 text-xs">{stat.label}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming bookings */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl border border-white/8 overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h3 className="font-semibold font-['Outfit'] text-white">Upcoming Bookings</h3>
              <Link to="/customer/bookings" className="text-[#00D4FF] text-xs hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Vehicle</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BOOKINGS.slice(0, 4).map((b) => (
                    <tr key={b.id}>
                      <td className="text-white font-medium text-xs">{b.id}</td>
                      <td className="text-white text-sm">{b.car}</td>
                      <td className="text-xs">{b.date}</td>
                      <td className="text-xs">{b.hours}h</td>
                      <td className="text-white font-semibold">₹{b.total.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`badge ${
                          b.status === 'completed' ? 'badge-approved' :
                          b.status === 'active' ? 'badge-available' :
                          'badge-pending'
                        }`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Quick search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-white/8 p-5"
        >
          <h3 className="font-semibold font-['Outfit'] text-white mb-4">Quick Search</h3>
          <div className="space-y-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
              <input type="text" placeholder="Car or location..." className="form-input pl-10 py-2.5 text-sm" />
            </div>
            <input type="date" className="form-input py-2.5 text-sm" style={{ colorScheme: 'dark' }} />
          </div>
          <Link to="/explore" className="btn-primary w-full justify-center text-sm py-2.5">
            <Search className="w-4 h-4" /> Search Cars
          </Link>

          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Featured Picks</p>
            {CARS.slice(0, 2).map(car => (
              <div key={car.id} className="flex items-center gap-3 mb-3 group cursor-pointer">
                <img src={car.image} alt={car.name} className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{car.name}</p>
                  <p className="text-[#00D4FF] text-xs font-medium">₹{car.pricePerHour.toLocaleString('en-IN')}/hr</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Profile quick view */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl border border-white/8 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold font-['Outfit'] text-white">Profile Details</h3>
          <Link to="/customer/profile" className="text-[#00D4FF] text-xs hover:underline">Edit profile</Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            {[
              { label: 'Full Name', value: user?.name },
              { label: 'Email', value: user?.email },
              { label: 'Phone', value: user?.phone || 'Not set' },
              { label: 'Member Since', value: new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
            ].map(field => (
              <div key={field.label}>
                <p className="text-white/30 text-xs mb-0.5">{field.label}</p>
                <p className="text-white text-sm font-medium truncate">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
