import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, Key, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DURATION_PRESETS = [
  { hours: 2, label: '2 Hours', discount: 0, tag: 'Quick Drive' },
  { hours: 4, label: '4 Hours', discount: 0, tag: 'Half Day' },
  { hours: 8, label: '8 Hours', discount: 5, tag: 'Full Day (-5%)' },
  { hours: 24, label: '24 Hours', discount: 12, tag: 'Weekend (-12%)' },
];

export default function BookingModal({ car, isOpen, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [hours, setHours] = useState(4);
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('14:00');
  const [coveragePlan, setCoveragePlan] = useState('full'); // 'basic' | 'full'
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [driverName, setDriverName] = useState(user?.name || 'Arjun Sharma');
  const [driverPhone, setDriverPhone] = useState('+91 98765 43210');
  const [licenseNumber, setLicenseNumber] = useState('MH-02-2023-0098765');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  if (!isOpen || !car) return null;

  // Cost calculation
  const hourlyRate = car.pricePerHour;
  const currentPreset = DURATION_PRESETS.find(p => p.hours === hours);
  const discountPercent = currentPreset ? currentPreset.discount : (hours >= 24 ? 12 : hours >= 8 ? 5 : 0);

  const baseRental = hourlyRate * hours;
  const discountAmount = Math.round((baseRental * discountPercent) / 100);
  const discountedRental = baseRental - discountAmount;
  const insurancePerHour = coveragePlan === 'full' ? 199 : 0;
  const insuranceTotal = insurancePerHour * hours;
  const platformFee = Math.round(discountedRental * 0.05);
  const securityDeposit = 2500; // Refundable
  const totalDueNow = discountedRental + insuranceTotal + platformFee;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const bookingData = {
        id: `HD-${Math.floor(100000 + Math.random() * 900000)}`,
        carName: car.name,
        carModel: car.model,
        carImage: car.image,
        carCategory: car.category,
        location: car.location,
        pickupDate,
        pickupTime,
        hours,
        totalAmount: totalDueNow,
        coveragePlan,
        digitalKeyPin: Math.floor(1000 + Math.random() * 9000),
        status: 'active',
        bookedAt: new Date().toISOString(),
      };

      // Store in localStorage for customer bookings persistence
      try {
        const existing = JSON.parse(localStorage.getItem('hourdrive_customer_bookings') || '[]');
        localStorage.setItem('hourdrive_customer_bookings', JSON.stringify([bookingData, ...existing]));
      } catch (err) {
        console.error(err);
      }

      setBookingConfirmed(bookingData);
      toast.success(`Booking confirmed for ${car.name}!`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-2xl bg-[#0A1628] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/8 flex items-center justify-between">
          <div>
            <span className="text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">
              {bookingConfirmed ? 'Reservation Complete' : 'Instant Hourly Booking'}
            </span>
            <h2 className="text-xl font-bold font-['Outfit'] text-white">
              {bookingConfirmed ? 'You’re Ready to Drive!' : car.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {bookingConfirmed ? (
            /* Booking Confirmed State */
            <div className="text-center py-4 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-1">
                  Reservation Confirmed!
                </h3>
                <p className="text-white/60 text-sm">
                  Your reservation code is <span className="font-mono font-bold text-[#00D4FF]">{bookingConfirmed.id}</span>
                </p>
              </div>

              {/* Digital Car Key Card */}
              <div className="glass rounded-xl p-5 border border-cyan-500/30 text-left bg-gradient-to-br from-[#00D4FF]/10 to-transparent">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#00D4FF]" />
                    <span className="text-white font-semibold text-sm">Digital Car Key Access</span>
                  </div>
                  <span className="badge badge-available text-xs">Active</span>
                </div>
                <p className="text-white/50 text-xs mb-3">
                  Use this 4-digit PIN code at the vehicle door handle keypad or unlock directly via your customer dashboard.
                </p>
                <div className="flex items-center justify-between bg-black/40 rounded-lg p-3 border border-white/5">
                  <span className="text-xs text-white/40">DIGITAL KEY PIN:</span>
                  <span className="text-2xl font-mono font-bold text-white tracking-widest">{bookingConfirmed.digitalKeyPin}</span>
                </div>
              </div>

              {/* Booking Summary Card */}
              <div className="glass rounded-xl p-4 border border-white/5 text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Vehicle:</span>
                  <span className="text-white font-medium">{bookingConfirmed.carName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Pickup Location:</span>
                  <span className="text-white font-medium">{bookingConfirmed.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Date & Start Time:</span>
                  <span className="text-white font-medium">{bookingConfirmed.pickupDate} at {bookingConfirmed.pickupTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Duration:</span>
                  <span className="text-white font-medium">{bookingConfirmed.hours} Hours</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Total Paid:</span>
                  <span className="text-emerald-400 font-bold text-sm">₹{bookingConfirmed.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/customer/bookings');
                  }}
                  className="btn-primary flex-1 justify-center py-3 text-sm"
                >
                  View My Bookings <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              {/* Car Snapshot */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                <img src={car.image} alt={car.name} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm truncate">{car.name}</h4>
                  <p className="text-white/40 text-xs">{car.model} · {car.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold font-['Outfit'] gradient-text">₹{car.pricePerHour.toLocaleString('en-IN')}</p>
                  <p className="text-white/40 text-xs">/hour</p>
                </div>
              </div>

              {/* Duration Presets */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Select Rental Duration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DURATION_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.hours}
                      onClick={() => setHours(p.hours)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                        hours === p.hours
                          ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                          : 'border-white/10 bg-white/3 text-white/60 hover:bg-white/5'
                      }`}
                    >
                      <p className="font-bold text-sm text-white">{p.label}</p>
                      <p className="text-[11px] text-[#00D4FF]">{p.tag}</p>
                    </button>
                  ))}
                </div>

                {/* Custom Hours Slider */}
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-white/40 whitespace-nowrap">Custom Duration:</span>
                  <input
                    type="range"
                    min="1"
                    max="48"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full accent-[#00D4FF] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-white whitespace-nowrap">{hours} hrs</span>
                </div>
              </div>

              {/* Pickup Date & Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-xs font-semibold mb-1">Pickup Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="input-field w-full text-sm pl-10"
                      required
                    />
                    <Calendar className="w-4 h-4 text-[#00D4FF] absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-semibold mb-1">Pickup Time</label>
                  <div className="relative">
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="input-field w-full text-sm pl-10"
                      required
                    />
                    <Clock className="w-4 h-4 text-[#00D4FF] absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Protection & Insurance Tier */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Driver Protection Plan
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setCoveragePlan('basic')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      coveragePlan === 'basic'
                        ? 'border-[#00D4FF] bg-[#00D4FF]/10'
                        : 'border-white/10 bg-white/3 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">Standard Protection</span>
                      <span className="text-xs text-emerald-400 font-bold">Included</span>
                    </div>
                    <p className="text-xs text-white/40">Third-party liability under Motor Vehicles Act.</p>
                  </div>

                  <div
                    onClick={() => setCoveragePlan('full')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      coveragePlan === 'full'
                        ? 'border-[#00D4FF] bg-[#00D4FF]/10'
                        : 'border-white/10 bg-white/3 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">Zero Deductible Peace of Mind</span>
                      <span className="text-xs text-[#00D4FF] font-bold">+₹199/hr</span>
                    </div>
                    <p className="text-xs text-white/40">Full bumper-to-bumper damage waiver with ₹0 liability.</p>
                  </div>
                </div>
              </div>

              {/* Driver Details */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Driver Verification (DigiLocker / Indian DL)
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="input-field w-full text-xs"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone (+91)"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="input-field w-full text-xs"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Driving License #"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      className="input-field w-full text-xs"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Live Cost Breakdown */}
              <div className="glass rounded-xl p-4 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Rental ({hours} hrs @ ₹{hourlyRate.toLocaleString('en-IN')}/hr):</span>
                  <span>₹{baseRental.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Duration Discount ({discountPercent}%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {insuranceTotal > 0 && (
                  <div className="flex justify-between text-white/60">
                    <span>Comprehensive Insurance (₹{insurancePerHour}/hr):</span>
                    <span>+₹{insuranceTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Platform & Processing Fee (5%):</span>
                  <span>+₹{platformFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white/40 border-b border-white/5 pb-2">
                  <span>Refundable Security Hold:</span>
                  <span>₹{securityDeposit.toLocaleString('en-IN')} (hold only)</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-1">
                  <span>Total Amount Due:</span>
                  <span className="gradient-text font-['Outfit'] text-lg">₹{totalDueNow.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary justify-center py-3.5 text-base font-semibold shadow-[0_0_25px_rgba(0,212,255,0.4)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Confirming Reservation...
                  </span>
                ) : (
                  `Reserve ${car.name} · $${totalDueNow}`
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
