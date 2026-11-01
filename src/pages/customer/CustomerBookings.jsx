import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, MapPin, Key, Lock, Unlock, Volume2, ShieldCheck,
  ChevronRight, AlertCircle, CheckCircle, Download, FileText, ArrowRight, Car
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_BOOKINGS } from '../../data/mockData';

const CUSTOMER_NAV = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: Car },
  { to: '/customer/bookings', label: 'My Bookings', icon: Calendar },
  { to: '/customer/favourites', label: 'Favourites', icon: Key },
  { to: '/customer/payments', label: 'Payment History', icon: FileText },
  { to: '/customer/profile', label: 'Profile Settings', icon: ShieldCheck },
];

export default function CustomerBookings() {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [digitalKeyUnlocked, setDigitalKeyUnlocked] = useState(false);
  const [hornActive, setHornActive] = useState(false);

  useEffect(() => {
    // Load persisted bookings from localStorage or fallback to default mock bookings
    try {
      const stored = JSON.parse(localStorage.getItem('hourdrive_customer_bookings') || '[]');
      const defaultBookings = MOCK_BOOKINGS.map(b => ({
        id: b.id,
        carName: b.car,
        carModel: 'Indian Edition',
        carImage: b.car.includes('Thar')
          ? 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80'
          : b.car.includes('Safari')
          ? 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80'
          : b.car.includes('Fortuner')
          ? 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=600&q=80'
          : 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600&q=80',
        location: 'BKC, Bandra West, Mumbai, India',
        pickupDate: b.date,
        pickupTime: b.time?.split(' - ')[0] || '10:00',
        hours: b.hours,
        totalAmount: b.total,
        status: b.status,
        digitalKeyPin: 4821,
      }));
      setBookings([...stored, ...defaultBookings]);
    } catch {
      setBookings([]);
    }
  }, []);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const activeTrip = bookings.find(b => b.status === 'active');

  const handleToggleDoorLock = () => {
    setDigitalKeyUnlocked(!digitalKeyUnlocked);
    toast.success(digitalKeyUnlocked ? 'Vehicle doors securely locked.' : 'Vehicle doors unlocked! Welcome aboard.');
  };

  const handleSoundHorn = () => {
    setHornActive(true);
    toast('Beep beep! Headlights flashed and horn sounded.', { icon: '🚨' });
    setTimeout(() => setHornActive(false), 2000);
  };

  return (
    <DashboardLayout navItems={CUSTOMER_NAV} title="My Bookings">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-['Outfit'] text-white">
              My Rental <span className="gradient-text">Bookings</span>
            </h2>
            <p className="text-white/50 text-sm">
              Manage your active reservations, digital vehicle access keys, and past invoices.
            </p>
          </div>
          <Link to="/explore" className="btn-primary self-start text-xs py-2.5 px-4">
            <Car className="w-3.5 h-3.5" /> Book Another Car
          </Link>
        </div>

        {/* Live Active Trip Showcase */}
        {activeTrip && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-r from-[#00D4FF]/10 via-[#0A1628] to-[#6B6FFF]/10 shadow-[0_0_30px_rgba(0,212,255,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  Active Rental In Progress
                </span>
              </div>
              <span className="text-xs text-white/50">Reservation {activeTrip.id}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 items-center">
              {/* Car Info */}
              <div className="flex items-center gap-4">
                <img
                  src={activeTrip.carImage}
                  alt={activeTrip.carName}
                  className="w-24 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">{activeTrip.carName}</h3>
                  <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#00D4FF]" /> {activeTrip.location}
                  </p>
                  <p className="text-xs text-cyan-400 mt-1 font-semibold">
                    Return due in 1 hr 45 min
                  </p>
                </div>
              </div>

              {/* Digital Car Key Controls */}
              <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60 font-semibold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#00D4FF]" /> Digital Access Key
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/40 text-white font-bold border border-white/10">
                    PIN: {activeTrip.digitalKeyPin || 4920}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleToggleDoorLock}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      digitalKeyUnlocked
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {digitalKeyUnlocked ? (
                      <><Unlock className="w-3.5 h-3.5" /> Doors Unlocked</>
                    ) : (
                      <><Lock className="w-3.5 h-3.5" /> Doors Locked</>
                    )}
                  </button>

                  <button
                    onClick={handleSoundHorn}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      hornActive
                        ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#00D4FF]" />
                    {hornActive ? 'Sounding...' : 'Honk / Lights'}
                  </button>
                </div>
              </div>

              {/* Trip stats */}
              <div className="text-right space-y-1">
                <p className="text-xs text-white/40">Total Paid</p>
                <p className="text-2xl font-bold font-['Outfit'] gradient-text">₹{activeTrip.totalAmount.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-white/50">{activeTrip.hours} Hours · Zero Deductible</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab Filter */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          {[
            { id: 'all', label: 'All Trips' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                  : 'bg-white/3 text-white/50 hover:bg-white/8 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 glass rounded-2xl border border-white/5">
              <Car className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white font-semibold">No bookings found in this category.</p>
              <p className="text-white/40 text-xs mt-1 mb-4">Ready to hit the road in a luxury sports car?</p>
              <Link to="/explore" className="btn-primary text-xs py-2 px-4">
                Explore Cars Now
              </Link>
            </div>
          ) : (
            filteredBookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5 border border-white/8 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={b.carImage}
                    alt={b.carName}
                    className="w-20 h-14 rounded-lg object-cover flex-shrink-0 border border-white/5"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-bold text-sm font-['Outfit']">{b.carName}</h4>
                      <span className={`badge text-[10px] ${
                        b.status === 'active'
                          ? 'badge-available'
                          : b.status === 'upcoming'
                          ? 'badge-pending'
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#00D4FF]" /> {b.pickupDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#00D4FF]" /> {b.pickupTime} ({b.hours} hrs)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {b.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div className="text-left md:text-right">
                    <p className="text-white/40 text-xs">Total Amount</p>
                    <p className="text-lg font-bold font-['Outfit'] text-white">₹{b.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => toast.success(`Receipt for ${b.id} downloaded.`)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Receipt
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
