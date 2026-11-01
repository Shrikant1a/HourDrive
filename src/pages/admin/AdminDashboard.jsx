import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Car, Calendar, DollarSign, ShieldCheck,
  MessageSquare, Settings, Search, Eye, Check, X, TrendingUp, AlertTriangle, ChevronDown
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ADMIN_STATS, CARS } from '../../data/mockData';

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/users', label: 'User Management', icon: Users },
  { to: '/admin/vehicles', label: 'Vehicle Management', icon: Car },
  { to: '/admin/approvals', label: 'Pending Approvals', icon: ShieldCheck, badge: '47' },
  { to: '/admin/bookings', label: 'Booking Management', icon: Calendar },
  { to: '/admin/payments', label: 'Payment Management', icon: DollarSign },
  { to: '/admin/complaints', label: 'Complaints & Support', icon: MessageSquare },
  { to: '/admin/settings', label: 'Platform Settings', icon: Settings },
];

const OVERVIEW_STATS = [
  { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString(), icon: Users, color: '#00D4FF', sub: `${ADMIN_STATS.totalCustomers.toLocaleString()} customers, ${ADMIN_STATS.totalOwners.toLocaleString()} owners` },
  { label: 'Total Vehicles', value: ADMIN_STATS.totalVehicles.toLocaleString(), icon: Car, color: '#6B6FFF', sub: `${ADMIN_STATS.pendingApprovals} pending approval` },
  { label: 'Total Bookings', value: ADMIN_STATS.totalBookings.toLocaleString(), icon: Calendar, color: '#10B981', sub: `${ADMIN_STATS.activeBookings} active now` },
  { label: 'Total Revenue', value: `$${(ADMIN_STATS.totalRevenue / 1000000).toFixed(2)}M`, icon: DollarSign, color: '#FFD700', sub: '+18% this month' },
];

const MOCK_USERS = [
  { id: 'U001', name: 'Alexander Chen', email: 'alex@example.com', role: 'customer', status: 'active', joined: '2026-01-15', bookings: 12 },
  { id: 'U002', name: 'Sarah Williams', email: 'sarah@example.com', role: 'owner', status: 'active', joined: '2026-02-20', vehicles: 2 },
  { id: 'U003', name: 'Raj Malhotra', email: 'raj@example.com', role: 'customer', status: 'suspended', joined: '2026-03-10', bookings: 5 },
  { id: 'U004', name: 'Marco Ferrari', email: 'marco@example.com', role: 'owner', status: 'active', joined: '2025-12-05', vehicles: 3 },
  { id: 'U005', name: 'Emma Thompson', email: 'emma@example.com', role: 'customer', status: 'active', joined: '2026-04-22', bookings: 3 },
];

const PENDING_APPROVALS = [
  { id: 'V001', car: 'Ferrari 488 GTB', owner: 'John Smith', submitted: '2026-10-28', docs: 'Complete', insurance: 'Valid' },
  { id: 'V002', car: 'BMW 7 Series', owner: 'Anna Müller', submitted: '2026-10-29', docs: 'Pending', insurance: 'Valid' },
  { id: 'V003', car: 'Aston Martin DB11', owner: 'James Bond', submitted: '2026-10-30', docs: 'Complete', insurance: 'Expired' },
];

export default function AdminDashboard() {
  const [userSearch, setUserSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredUsers = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <DashboardLayout navItems={NAV_ITEMS} title="Admin Dashboard">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#00D4FF] animate-pulse" />
          <h2 className="text-2xl font-bold font-['Outfit'] text-white">Platform Administration</h2>
        </div>
        <p className="text-white/50 text-sm">Complete oversight of HourDrive — real-time platform monitoring.</p>
      </motion.div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {OVERVIEW_STATS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 border border-white/8 hover:border-[#00D4FF]/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-['Outfit'] text-white">{stat.value}</p>
            <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            <p className="text-xs mt-1.5" style={{ color: stat.color }}>{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Secondary stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Customers', value: ADMIN_STATS.totalCustomers.toLocaleString(), color: '#00D4FF' },
          { label: 'Car Owners', value: ADMIN_STATS.totalOwners.toLocaleString(), color: '#6B6FFF' },
          { label: 'Active Now', value: ADMIN_STATS.activeBookings, color: '#10B981' },
          { label: 'Pending Approvals', value: ADMIN_STATS.pendingApprovals, color: '#F59E0B' },
          { label: 'This Month Revenue', value: '$284K', color: '#FFD700' },
          { label: 'Avg. Rating', value: '4.8★', color: '#FF6B6B' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
            className="glass rounded-xl p-4 border border-white/8 text-center">
            <p className="text-xl font-bold font-['Outfit']" style={{ color: s.color }}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['overview', 'users', 'vehicles', 'approvals'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}>{tab === 'approvals' ? 'Pending Approvals' : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'users' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5 gap-3 flex-wrap">
            <h3 className="font-semibold font-['Outfit'] text-white">User Management</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
              <input type="text" value={userSearch} onChange={e => setUserSearch(e.target.value)}
                placeholder="Search users..." className="form-input pl-10 py-2 text-sm w-64" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead><tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td className="text-white/50 text-xs">{u.id}</td>
                    <td className="text-white font-medium">{u.name}</td>
                    <td className="text-white/50 text-xs">{u.email}</td>
                    <td><span className={`badge ${u.role === 'owner' ? 'badge-pending' : 'badge-approved'}`}>{u.role}</span></td>
                    <td><span className={`badge ${u.status === 'active' ? 'badge-available' : 'badge-busy'}`}>{u.status}</span></td>
                    <td className="text-xs">{u.joined}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="w-7 h-7 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center hover:bg-[#00D4FF]/20 transition-colors" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/20 transition-colors" title="Activate"><Check className="w-3.5 h-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors" title="Suspend"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'vehicles' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="font-semibold font-['Outfit'] text-white">Vehicle Management</h3>
            <span className="text-white/40 text-sm">{CARS.length} vehicles total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead><tr>
                <th>Vehicle</th><th>Owner</th><th>Category</th><th>Price/hr</th><th>Rating</th><th>Status</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {CARS.map(car => (
                  <tr key={car.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={car.image} alt={car.name} className="w-12 h-9 rounded-lg object-cover" />
                        <div>
                          <p className="text-white font-semibold text-sm">{car.name}</p>
                          <p className="text-white/40 text-xs">{car.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-xs">{car.owner}</td>
                    <td><span className="badge badge-pending text-xs">{car.category}</span></td>
                    <td className="text-[#00D4FF] font-semibold">₹{car.pricePerHour.toLocaleString('en-IN')}/hr</td>
                    <td className="text-yellow-400 font-semibold">{car.rating}★</td>
                    <td><span className={`badge ${car.available ? 'badge-available' : 'badge-busy'}`}>{car.available ? 'Active' : 'Rented'}</span></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="w-7 h-7 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center hover:bg-[#00D4FF]/20 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'approvals' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="font-semibold font-['Outfit'] text-white">Pending Vehicle Approvals</h3>
            <span className="badge badge-pending">{PENDING_APPROVALS.length} pending</span>
          </div>
          <div className="p-4 space-y-4">
            {PENDING_APPROVALS.map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-white/3 border border-white/5">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white/30 text-xs">{v.id}</span>
                      <span className="badge badge-pending text-xs">Pending Review</span>
                    </div>
                    <p className="text-white font-bold">{v.car}</p>
                    <p className="text-white/50 text-xs">Owner: {v.owner} · Submitted {v.submitted}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold hover:bg-emerald-500/20 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs">Documents:</span>
                    <span className={`badge text-xs ${v.docs === 'Complete' ? 'badge-approved' : 'badge-pending'}`}>{v.docs}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs">Insurance:</span>
                    <span className={`badge text-xs ${v.insurance === 'Valid' ? 'badge-approved' : 'badge-busy'}`}>
                      {v.insurance !== 'Valid' && <AlertTriangle className="w-3 h-3" />}
                      {v.insurance}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass rounded-2xl border border-white/8 p-6">
            <h3 className="font-semibold font-['Outfit'] text-white mb-5">Monthly Revenue</h3>
            <div className="flex items-end gap-1.5 h-32 mb-3">
              {[60,75,55,88,70,95,80,100,72,88,65,90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t" style={{ height: `${h}%`, background: `linear-gradient(180deg, #00D4FF80, #6B6FFF80)` }} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-white/30">
              {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => <span key={m}>{m}</span>)}
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 flex gap-6">
              <div><p className="text-white/40 text-xs">Total 2026</p><p className="text-xl font-bold gradient-text font-['Outfit']">$2.84M</p></div>
              <div><p className="text-white/40 text-xs">Growth</p><p className="text-emerald-400 font-bold">+34%</p></div>
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass rounded-2xl border border-white/8 p-6">
            <h3 className="font-semibold font-['Outfit'] text-white mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { event: 'New vehicle submitted for approval', time: '2 min ago', type: 'info', icon: Car },
                { event: 'New customer registered: Emma T.', time: '15 min ago', type: 'success', icon: Users },
                { event: 'Booking completed — Lamborghini Huracán', time: '1h ago', type: 'success', icon: Calendar },
                { event: 'Insurance document expired for V003', time: '2h ago', type: 'warning', icon: AlertTriangle },
                { event: 'Payout processed — $4,280 to Omar K.', time: '3h ago', type: 'info', icon: DollarSign },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    a.type === 'success' ? 'bg-emerald-500/15 text-emerald-400' :
                    a.type === 'warning' ? 'bg-yellow-500/15 text-yellow-400' :
                    'bg-[#00D4FF]/15 text-[#00D4FF]'
                  }`}>
                    <a.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{a.event}</p>
                    <p className="text-white/30 text-xs">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
