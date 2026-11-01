import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Car, Plus, DollarSign, Calendar, Star, CheckCircle, Upload, MapPin,
  Fuel, Settings2, Users, Shield, ArrowRight, ArrowLeft, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const OWNER_NAV = [
  { to: '/owner/dashboard', label: 'Dashboard', icon: Car },
  { to: '/owner/vehicles', label: 'My Vehicles', icon: Car },
  { to: '/owner/add-vehicle', label: 'Add New Vehicle', icon: Plus },
  { to: '/owner/requests', label: 'Booking Requests', icon: Calendar },
  { to: '/owner/earnings', label: 'Earnings', icon: DollarSign },
];

const PRESET_IMAGES = [
  { name: 'Ferrari SF90', url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80' },
  { name: 'Aston Martin DB11', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80' },
  { name: 'Porsche Taycan', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80' },
  { name: 'Bentley Continental', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80' },
];

const LUXURY_FEATURES = [
  'GPS Navigation', 'Apple CarPlay / Android Auto', 'Leather Heated Seats',
  'Autopilot / Cruise Control', 'Sunroof / Panoramic Roof', 'Burmester Surround Sound',
  '360° Parking Camera', 'Sport Exhaust', 'Carbon Ceramic Brakes', 'Wireless Charging'
];

export default function AddVehiclePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Mahindra Thar Roxx',
    model: 'AX7L 4x4 5-Door',
    year: '2024',
    category: 'SUV',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    horsepower: '175 HP',
    pricePerHour: 1800,
    minRentalHours: 2,
    location: 'Cyber City, Gurugram, India',
    description: 'The sensational 5-door Thar Roxx. Blends extreme off-roading capability with first-class luxury cabin and commanding road presence across Delhi-NCR.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=800&q=80',
    selectedFeatures: ['Panoramic Skyroof', 'Harman Kardon Audio', 'Level 2 ADAS', 'Ventilated Front Seats', 'Fastag Enabled'],
    instantBooking: true,
  });

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter(f => f !== feature)
        : [...prev.selectedFeatures, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: Date.now(),
      name: formData.name,
      model: formData.model,
      category: formData.category,
      transmission: formData.transmission,
      fuel: formData.fuel,
      seats: formData.seats,
      location: formData.location,
      pricePerHour: Number(formData.pricePerHour),
      rating: 5.0,
      bookings: 0,
      earnings: 0,
      status: 'active',
      image: formData.image,
      features: formData.selectedFeatures,
      description: formData.description,
    };

    try {
      const stored = JSON.parse(localStorage.getItem('hourdrive_owner_vehicles') || '[]');
      localStorage.setItem('hourdrive_owner_vehicles', JSON.stringify([newVehicle, ...stored]));
    } catch (err) {
      console.error(err);
    }

    toast.success(`🎉 ${formData.name} is now listed and available for rent!`);
    setTimeout(() => {
      navigate('/owner/vehicles');
    }, 1200);
  };

  return (
    <DashboardLayout navItems={OWNER_NAV} title="List a Vehicle">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold font-['Outfit'] text-white">
            List Your <span className="gradient-text">Vehicle</span>
          </h2>
          <p className="text-white/50 text-sm">
            Earn premium hourly returns on your luxury car. Complete details to publish your listing.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: 1, title: 'Basics & Specs' },
            { num: 2, title: 'Pricing & Location' },
            { num: 3, title: 'Photos & Publish' },
          ].map(s => (
            <div
              key={s.num}
              className={`p-3 rounded-xl border transition-all ${
                step === s.num
                  ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-white'
                  : step > s.num
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/5 bg-white/3 text-white/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                  step === s.num ? 'bg-[#00D4FF] text-black' : step > s.num ? 'bg-emerald-400 text-black' : 'bg-white/10 text-white/50'
                }`}>
                  {s.num}
                </span>
                <span className="font-semibold text-xs">{s.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/10 space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Step 1: Vehicle Information</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Make & Model</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="input-field w-full text-sm"
                        placeholder="e.g. Ferrari SF90"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Trim / Edition</label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={e => setFormData({ ...formData, model: e.target.value })}
                        className="input-field w-full text-sm"
                        placeholder="e.g. Assetto Fiorano"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Year</label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                        className="input-field w-full text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="input-field w-full text-sm"
                      >
                        <option value="Sports">Sports</option>
                        <option value="Luxury">Luxury</option>
                        <option value="SUV">SUV</option>
                        <option value="Electric">Electric</option>
                        <option value="Sedan">Sedan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Seats</label>
                      <input
                        type="number"
                        value={formData.seats}
                        onChange={e => setFormData({ ...formData, seats: Number(e.target.value) })}
                        className="input-field w-full text-sm"
                        min="2"
                        max="8"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Transmission</label>
                      <input
                        type="text"
                        value={formData.transmission}
                        onChange={e => setFormData({ ...formData, transmission: e.target.value })}
                        className="input-field w-full text-sm"
                        placeholder="e.g. Dual-Clutch 8-Speed"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">Fuel / Powertrain</label>
                      <input
                        type="text"
                        value={formData.fuel}
                        onChange={e => setFormData({ ...formData, fuel: e.target.value })}
                        className="input-field w-full text-sm"
                        placeholder="e.g. Hybrid Petrol V8"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-primary text-xs py-2.5 px-5"
                    >
                      Next: Pricing & Location <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Step 2: Hourly Rate & Location</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">
                        Hourly Rental Rate (₹/hour)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.pricePerHour}
                          onChange={e => setFormData({ ...formData, pricePerHour: Number(e.target.value) })}
                          className="input-field w-full text-sm pl-8 font-bold text-[#00D4FF]"
                          min="300"
                          max="50000"
                          required
                        />
                        <span className="text-white/50 absolute left-3 top-2.5 font-bold text-sm">₹</span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-1">Recommended: ₹800–₹2,500/hr for this category.</p>
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1">
                        Min. Booking Duration
                      </label>
                      <select
                        value={formData.minRentalHours}
                        onChange={e => setFormData({ ...formData, minRentalHours: Number(e.target.value) })}
                        className="input-field w-full text-sm"
                      >
                        <option value="1">1 Hour</option>
                        <option value="2">2 Hours (Recommended)</option>
                        <option value="4">4 Hours</option>
                        <option value="8">8 Hours</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1">Pickup Location & City</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        className="input-field w-full text-sm pl-8"
                        placeholder="e.g. BKC Mumbai, Indiranagar Bengaluru, Cyber City Gurugram"
                        required
                      />
                      <MapPin className="w-4 h-4 text-[#00D4FF] absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1">Vehicle Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="input-field w-full text-xs h-24 resize-none"
                      placeholder="Tell renters what makes this car unforgettable to drive..."
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white border border-white/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1 inline" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-primary text-xs py-2.5 px-5"
                    >
                      Next: Photos & Publish <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Step 3: Photos & Features</h3>

                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1">Photo Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      className="input-field w-full text-xs"
                      required
                    />
                    <p className="text-[11px] text-white/40 mt-1 mb-2">Or select a high-resolution luxury preset:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PRESET_IMAGES.map(p => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: p.url, name: p.name })}
                          className={`p-2 rounded-lg border text-left text-xs transition-all ${
                            formData.image === p.url ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-white' : 'border-white/10 bg-white/3 text-white/60'
                          }`}
                        >
                          <img src={p.url} alt={p.name} className="w-full h-12 object-cover rounded mb-1" />
                          <span className="truncate block font-semibold">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Luxury Features Checklist */}
                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-2">Select Included Features</label>
                    <div className="grid grid-cols-2 gap-2">
                      {LUXURY_FEATURES.map(f => {
                        const checked = formData.selectedFeatures.includes(f);
                        return (
                          <div
                            key={f}
                            onClick={() => handleFeatureToggle(f)}
                            className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                              checked ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-white font-semibold' : 'border-white/5 bg-white/3 text-white/50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                              checked ? 'border-[#00D4FF] bg-[#00D4FF] text-black font-bold' : 'border-white/20'
                            }`}>
                              {checked && '✓'}
                            </span>
                            <span className="truncate">{f}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white border border-white/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1 inline" /> Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary text-xs py-2.5 px-6 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                    >
                      <Sparkles className="w-4 h-4 mr-1 inline" /> Publish Car to Fleet
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Live Preview Card */}
          <div>
            <div className="sticky top-24 space-y-3">
              <span className="text-xs text-white/50 font-semibold uppercase tracking-wider block">
                Live Listing Preview
              </span>
              <div className="glass rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl">
                <div className="relative h-44">
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'; }}
                  />
                  <span className="absolute top-3 left-3 badge badge-available text-xs">
                    Available Now
                  </span>
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[11px] text-[#00D4FF] border border-[#00D4FF]/20">
                    {formData.category}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-bold text-sm font-['Outfit']">{formData.name}</h4>
                      <p className="text-white/40 text-xs">{formData.model} · {formData.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold gradient-text font-['Outfit']">₹{Number(formData.pricePerHour).toLocaleString('en-IN')}</p>
                      <p className="text-white/40 text-[10px]">/hour</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <div className="bg-white/5 p-1.5 rounded text-white/60">
                      {formData.transmission.split(' ')[0]}
                    </div>
                    <div className="bg-white/5 p-1.5 rounded text-white/60">
                      {formData.fuel.split(' ')[0]}
                    </div>
                    <div className="bg-white/5 p-1.5 rounded text-white/60">
                      {formData.seats} Seats
                    </div>
                  </div>

                  <p className="text-white/40 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00D4FF]" /> {formData.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
