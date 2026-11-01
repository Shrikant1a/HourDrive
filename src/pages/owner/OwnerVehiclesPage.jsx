import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Plus, Star, DollarSign, Calendar, Edit3, CheckCircle, PauseCircle, Wrench, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_OWNER_VEHICLES } from '../../data/mockData';

const OWNER_NAV = [
  { to: '/owner/dashboard', label: 'Dashboard', icon: Car },
  { to: '/owner/vehicles', label: 'My Vehicles', icon: Car },
  { to: '/owner/add-vehicle', label: 'Add New Vehicle', icon: Plus },
  { to: '/owner/requests', label: 'Booking Requests', icon: Calendar },
  { to: '/owner/earnings', label: 'Earnings', icon: DollarSign },
];

export default function OwnerVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('hourdrive_owner_vehicles') || '[]');
      const initial = MOCK_OWNER_VEHICLES.map(v => ({
        ...v,
        pricePerHour: v.name.includes('Thar') ? 1200 : v.name.includes('Safari') ? 1600 : 2800,
        location: v.location || 'BKC, Mumbai',
      }));
      setVehicles([...stored, ...initial]);
    } catch {
      setVehicles(MOCK_OWNER_VEHICLES);
    }
  }, []);

  const handleToggleStatus = (id) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'active' ? 'paused' : 'active';
        toast.success(`${v.name} status updated to ${nextStatus}.`);
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  const handleUpdatePrice = (id, newPrice) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, pricePerHour: Number(newPrice) } : v));
    toast.success('Hourly pricing updated successfully.');
  };

  return (
    <DashboardLayout navItems={OWNER_NAV} title="My Vehicles">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-['Outfit'] text-white">
              My Vehicle <span className="gradient-text">Fleet</span>
            </h2>
            <p className="text-white/50 text-sm">
              Manage availability, track total earnings, and adjust hourly pricing for your cars.
            </p>
          </div>
          <Link to="/owner/add-vehicle" className="btn-primary text-xs py-2.5 px-4 self-start">
            <Plus className="w-4 h-4" /> Add New Vehicle
          </Link>
        </div>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col"
            >
              <div className="relative h-48">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'; }}
                />
                <span className={`absolute top-3 left-3 badge text-xs ${
                  v.status === 'active' ? 'badge-available' : 'badge-busy'
                }`}>
                  {v.status === 'active' ? 'Available for Rent' : 'Listing Paused'}
                </span>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-bold">{v.rating || 5.0}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">{v.name}</h3>
                  <p className="text-white/40 text-xs">{v.location || 'Indiranagar, Bengaluru'}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-white/3 rounded-xl p-3 text-center text-xs">
                  <div>
                    <p className="text-white/40">Total Trips</p>
                    <p className="font-bold text-white text-sm">{v.bookings || 0}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Earnings</p>
                    <p className="font-bold text-emerald-400 text-sm">₹{(v.earnings || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Hourly Rate</p>
                    <p className="font-bold text-cyan-400 text-sm">₹{(v.pricePerHour || 1200).toLocaleString('en-IN')}/hr</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleToggleStatus(v.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      v.status === 'active'
                        ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                    }`}
                  >
                    {v.status === 'active' ? (
                      <><PauseCircle className="w-3.5 h-3.5" /> Pause Listing</>
                    ) : (
                      <><CheckCircle className="w-3.5 h-3.5" /> Activate Listing</>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const newPrice = prompt('Enter new hourly rate (₹/hr):', v.pricePerHour || 1200);
                      if (newPrice && !isNaN(newPrice)) handleUpdatePrice(v.id, newPrice);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Rate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
