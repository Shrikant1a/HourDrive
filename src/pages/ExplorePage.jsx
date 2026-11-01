import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, Star, Users, Fuel, Settings2, Heart, ChevronRight, X, Calendar } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookingModal from '../components/cars/BookingModal';
import { CARS, CATEGORIES } from '../data/mockData';

const FALLBACK_CAR_IMG = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80';

function CarDetailModal({ car, onClose, onBookCar }) {
  if (!car) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-[#0A1628] border border-white/10 rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="relative">
          <img
            src={car.image}
            alt={car.name}
            onError={(e) => { e.target.src = FALLBACK_CAR_IMG; }}
            className="w-full object-cover"
            style={{ aspectRatio: '16/9' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`badge ${car.available ? 'badge-available' : 'badge-busy'} mb-2`}>
              {car.available ? 'Available Now' : 'Currently Booked'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold font-['Outfit'] text-white">{car.name}</h2>
              <p className="text-white/50">{car.model} · {car.year} · {car.color}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold gradient-text font-['Outfit']">₹{car.pricePerHour.toLocaleString('en-IN')}</p>
              <p className="text-white/40 text-sm">/hour</p>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-5">{car.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Transmission', value: car.transmission, icon: Settings2 },
              { label: 'Fuel Type', value: car.fuel, icon: Fuel },
              { label: 'Seating', value: `${car.seats} Seats`, icon: Users },
            ].map(spec => (
              <div key={spec.label} className="bg-white/3 rounded-xl p-3 text-center">
                <spec.icon className="w-4 h-4 text-[#00D4FF] mx-auto mb-1" />
                <p className="text-white/40 text-xs">{spec.label}</p>
                <p className="text-white text-sm font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Features</p>
            <div className="flex flex-wrap gap-2">
              {car.features.map(f => (
                <span key={f} className="px-3 py-1 bg-white/5 border border-white/8 rounded-full text-xs text-white/60">{f}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-white/5 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center text-xs font-bold text-white">
                {car.owner[0]}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{car.owner}</p>
                <p className="text-white/40 text-xs">Vehicle Owner · {car.mileage} driven</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold text-sm">{car.rating}</span>
              <span className="text-white/40 text-xs">({car.reviewCount})</span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onBookCar) onBookCar(car);
            }}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              car.available
                ? 'btn-primary justify-center cursor-pointer shadow-[0_0_20px_rgba(0,212,255,0.35)]'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
            disabled={!car.available}
          >
            {car.available ? 'Book This Car Now' : 'Not Available'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState(30000);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingCar, setBookingCar] = useState(null);
  const [liked, setLiked] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (window.location.hash) {
      const carId = Number(window.location.hash.replace('#car-', ''));
      const target = CARS.find(c => c.id === carId);
      if (target) {
        setSelectedCar(target);
        setTimeout(() => {
          const el = document.getElementById(`car-${carId}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, []);

  const filtered = CARS.filter(car => {
    const q = search.toLowerCase();
    const matchSearch = search === '' ||
      car.name.toLowerCase().includes(q) ||
      car.model.toLowerCase().includes(q) ||
      (car.brand && car.brand.toLowerCase().includes(q)) ||
      car.location.toLowerCase().includes(q);
    const matchCat = activeCategory === 'all' || car.category === activeCategory;
    const matchCity = selectedCity === 'all' || car.location.toLowerCase().includes(selectedCity.toLowerCase());
    const matchPrice = car.pricePerHour <= priceRange;
    return matchSearch && matchCat && matchCity && matchPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerHour - b.pricePerHour;
    if (sortBy === 'price-desc') return b.pricePerHour - a.pricePerHour;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  return (
    <div className="min-h-screen bg-[#050A14]">
      <Navbar />
      <div className="pt-24 pb-16">
        {/* Hero bar */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#050A14] border-b border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold font-['Outfit'] text-white mb-2">Explore <span className="gradient-text">Premium Cars</span></h1>
              <p className="text-white/50 text-sm">{filtered.length} vehicles available for hourly rental</p>
            </motion.div>

            <div className="flex flex-wrap gap-3 mt-5">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by car name or location..."
                  className="form-input pl-11 py-3" />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="form-input py-3 w-auto min-w-[160px] cursor-pointer" style={{ colorScheme: 'dark' }}>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <button onClick={() => setFilterOpen(!filterOpen)}
                className="btn-secondary py-3 px-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>

            {/* Filter panel */}
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 glass rounded-xl p-5 border border-white/8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="form-label">Max Price: ₹{priceRange.toLocaleString('en-IN')}/hr</label>
                    <input type="range" min="400" max="30000" step="200" value={priceRange}
                      onChange={e => setPriceRange(Number(e.target.value))}
                      className="w-full accent-[#00D4FF]" />
                    <div className="flex justify-between text-xs text-white/30 mt-1">
                      <span>₹400/hr</span><span>₹30,000/hr</span>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">City in India</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
                      <select
                        value={selectedCity}
                        onChange={e => setSelectedCity(e.target.value)}
                        className="form-input pl-10 py-2.5 text-sm"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="all">All Indian Cities</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Gurugram">Delhi NCR / Gurugram</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Goa">Goa</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Quick Brand Filter</label>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Mahindra', 'Tata', 'Toyota', 'Maruti', 'All'].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSearch(b === 'All' ? '' : b)}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-[#00D4FF]/20 text-white/70 hover:text-white border border-white/10"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white'
                      : 'glass border border-white/10 text-white/60 hover:text-white'
                  }`}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cars grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-white text-xl font-semibold mb-2">No vehicles found</h3>
              <p className="text-white/40">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((car, idx) => (
                <motion.div
                  key={car.id}
                  id={`car-${car.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="group glass rounded-2xl overflow-hidden border border-white/8 hover:border-[#00D4FF]/30 card-hover"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      onError={(e) => { e.target.src = FALLBACK_CAR_IMG; }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button onClick={() => setLiked(l => ({ ...l, [car.id]: !l[car.id] }))}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <Heart className={`w-4 h-4 ${liked[car.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                    <div className={`absolute top-3 left-3 badge ${car.available ? 'badge-available' : 'badge-busy'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${car.available ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      {car.available ? 'Available' : 'Booked'}
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-[#00D4FF] border border-[#00D4FF]/20">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-white text-sm font-['Outfit']">{car.name}</h3>
                        <p className="text-white/40 text-xs">{car.model}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold gradient-text font-['Outfit']">₹{car.pricePerHour.toLocaleString('en-IN')}</p>
                        <p className="text-white/30 text-xs">/hr</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{car.location}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{car.rating}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setSelectedCar(car)}
                        className="py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors">
                        Details
                      </button>
                      <button
                        onClick={() => car.available && setBookingCar(car)}
                        disabled={!car.available}
                        className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-300 ${
                          car.available
                            ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white hover:shadow-[0_4px_15px_rgba(0,212,255,0.4)] cursor-pointer'
                            : 'bg-white/5 text-white/30 cursor-not-allowed'
                        }`}>
                        {car.available ? 'Book Now' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Detail modal */}
      {selectedCar && (
        <CarDetailModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onBookCar={(car) => setBookingCar(car)}
        />
      )}

      {/* Booking Modal */}
      <BookingModal
        car={bookingCar}
        isOpen={!!bookingCar}
        onClose={() => setBookingCar(null)}
      />
    </div>
  );
}
