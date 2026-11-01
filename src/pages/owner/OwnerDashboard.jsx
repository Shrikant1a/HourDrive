import { motion } from 'framer-motion';
import { LayoutDashboard, Car, Calendar, Star, DollarSign, Settings, Plus, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { MOCK_OWNER_VEHICLES, MOCK_BOOKING_REQUESTS } from '../../data/mockData';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: '/owner/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/owner/vehicles', label: 'My Vehicles', icon: Car },
  { to: '/owner/add-vehicle', label: 'Add New Vehicle', icon: Plus },
  { to: '/owner/requests', label: 'Booking Requests', icon: Calendar, badge: '2' },
  { to: '/owner/active', label: 'Active Bookings', icon: CheckCircle },
  { to: '/owner/earnings', label: 'Earnings', icon: DollarSign },
  { to: '/owner/reviews', label: 'Customer Reviews', icon: Star },
  { to: '/owner/profile', label: 'Profile & Verification', icon: Settings },
];

const OWNER_STATS = [
  { label: 'Total Vehicles', value: '3', icon: Car, color: '#00D4FF', change: '+1 this month' },
  { label: 'Total Bookings', value: '114', icon: Calendar, color: '#6B6FFF', change: '+18 this month' },
  { label: 'Monthly Earnings', value: '₹84,500', icon: DollarSign, color: '#10B981', change: '+23% vs last month' },
  { label: 'Pending Requests', value: '2', icon: Clock, color: '#F59E0B', change: 'Action needed' },
];

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(MOCK_BOOKING_REQUESTS);

  const handleRequest = (id, action) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  return (
    <DashboardLayout navItems={NAV_ITEMS} title="Owner Dashboard">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-2xl font-bold font-['Outfit'] text-white mb-1">
          Owner Dashboard — <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
        </h2>
        <p className="text-white/50 text-sm">Manage your vehicles, bookings, and earnings from one place.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {OWNER_STATS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 border border-white/8">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white mb-0.5">{stat.value}</p>
            <p className="text-white/40 text-xs">{stat.label}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Vehicles + Requests */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* My Vehicles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="font-semibold font-['Outfit'] text-white">My Vehicles</h3>
            <Link to="/owner/add-vehicle" className="btn-primary text-xs py-2 px-4">
              <Plus className="w-3.5 h-3.5" /> Add Vehicle
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {MOCK_OWNER_VEHICLES.map(v => (
              <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                <img src={v.image} alt={v.name} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{v.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`badge text-xs ${v.status === 'active' ? 'badge-available' : 'badge-pending'}`}>
                      {v.status}
                    </span>
                    <span className="text-white/40 text-xs">{v.bookings} bookings</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-sm">₹{v.earnings.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-0.5 justify-end mt-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-white/50 text-xs">{v.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Booking Requests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="font-semibold font-['Outfit'] text-white">Booking Requests</h3>
            <span className="badge badge-pending">{requests.filter(r => r.status === 'pending').length} pending</span>
          </div>
          <div className="p-4 space-y-4">
            {requests.map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-white/3 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={req.avatar} alt={req.customer} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{req.customer}</p>
                    <p className="text-white/40 text-xs">{req.car} · {req.hours}h · {req.date}</p>
                  </div>
                  <p className="text-emerald-400 font-bold text-sm">₹{req.amount.toLocaleString('en-IN')}</p>
                </div>
                {req.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleRequest(req.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button onClick={() => handleRequest(req.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                ) : (
                  <span className={`badge ${req.status === 'approved' ? 'badge-approved' : 'badge-rejected'}`}>
                    {req.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Earnings chart placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-2xl border border-white/8 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold font-['Outfit'] text-white">Earnings Overview</h3>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60" style={{ colorScheme: 'dark' }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all duration-500"
                style={{ height: `${h}%`, background: `linear-gradient(180deg, #00D4FF, #6B6FFF)`, opacity: 0.7 + i * 0.04 }} />
              <span className="text-white/30 text-xs">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div>
            <p className="text-white/40 text-xs">This Week</p>
            <p className="text-2xl font-bold gradient-text font-['Outfit']">₹32,400</p>
          </div>
          <div>
            <p className="text-white/40 text-xs">Best Day</p>
            <p className="text-white font-bold">Saturday — ₹12,800</p>
          </div>
          <div>
            <p className="text-white/40 text-xs">UPI Payout Due</p>
            <p className="text-emerald-400 font-bold">₹18,500</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
