import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Plus, Calendar, DollarSign, Clock, CheckCircle, XCircle, User, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BOOKING_REQUESTS } from '../../data/mockData';

const OWNER_NAV = [
  { to: '/owner/dashboard', label: 'Dashboard', icon: Car },
  { to: '/owner/vehicles', label: 'My Vehicles', icon: Car },
  { to: '/owner/add-vehicle', label: 'Add New Vehicle', icon: Plus },
  { to: '/owner/requests', label: 'Booking Requests', icon: Calendar },
  { to: '/owner/earnings', label: 'Earnings', icon: DollarSign },
];

export default function OwnerRequestsPage() {
  const [requests, setRequests] = useState(MOCK_BOOKING_REQUESTS);

  const handleAction = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`Request ${id} marked as ${newStatus}.`);
  };

  return (
    <DashboardLayout navItems={OWNER_NAV} title="Booking Requests">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold font-['Outfit'] text-white">
            Booking <span className="gradient-text">Requests</span>
          </h2>
          <p className="text-white/50 text-sm">
            Review incoming customer rental requests and approve or decline with one click.
          </p>
        </div>

        <div className="space-y-4">
          {requests.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={r.avatar}
                  alt={r.customer}
                  className="w-12 h-12 rounded-full object-cover border border-[#00D4FF]/40 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-white font-bold text-sm font-['Outfit']">{r.customer}</h4>
                    <span className={`badge text-[10px] ${
                      r.status === 'approved'
                        ? 'badge-available'
                        : r.status === 'declined'
                        ? 'badge-busy'
                        : 'badge-pending'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs">
                    Requested <span className="text-white font-semibold">{r.car}</span> for {r.hours} Hours
                  </p>
                  <p className="text-white/40 text-[11px] mt-0.5">
                    Scheduled on {r.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="text-left md:text-right">
                  <p className="text-white/40 text-xs">Estimated Payout</p>
                  <p className="text-lg font-bold font-['Outfit'] text-emerald-400">₹{r.amount.toLocaleString('en-IN')}</p>
                </div>

                {r.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction(r.id, 'approved')}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(r.id, 'declined')}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition-all flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-white/50 italic">
                    Decision recorded
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
