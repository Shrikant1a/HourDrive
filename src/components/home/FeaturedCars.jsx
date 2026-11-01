import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Fuel, Settings2, Clock, ChevronRight, Heart } from 'lucide-react';
import { CARS, CATEGORIES } from '../../data/mockData';

function CarCard({ car, index }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative glass rounded-2xl overflow-hidden border border-white/8 hover:border-[#00D4FF]/30 card-hover cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={car.image}
          alt={`${car.name} - ${car.category} available for hourly rental`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Availability badge */}
        <div className={`absolute top-3 left-3 badge ${car.available ? 'badge-available' : 'badge-busy'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${car.available ? 'bg-emerald-400' : 'bg-red-400'}`} />
          {car.available ? 'Available' : 'Booked'}
        </div>

        {/* Category */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-[#00D4FF] border border-[#00D4FF]/20">
          {car.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-white text-base font-['Outfit'] leading-tight">{car.name}</h3>
            <p className="text-white/40 text-sm">{car.model}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-['Outfit'] gradient-text">₹{car.pricePerHour.toLocaleString('en-IN')}</p>
            <p className="text-white/30 text-xs">/hour</p>
          </div>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="flex flex-col items-center gap-1 bg-white/3 rounded-lg p-2">
            <Settings2 className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="text-white/50 text-xs">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/3 rounded-lg p-2">
            <Fuel className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="text-white/50 text-xs">{car.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/3 rounded-lg p-2">
            <Users className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="text-white/50 text-xs">{car.seats} Seats</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/35 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {car.location}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white/60 font-medium">{car.rating}</span>
            <span>({car.reviewCount})</span>
          </div>
        </div>

        <Link
          to={`/explore#car-${car.id}`}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            car.available
              ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white hover:shadow-[0_8px_25px_rgba(0,212,255,0.35)] hover:-translate-y-0.5'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          {car.available ? <>View Details <ChevronRight className="w-4 h-4" /></> : 'Currently Unavailable'}
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedCars() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? CARS
    : CARS.filter(c => c.category === activeCategory);

  return (
    <section id="explore" className="py-24 bg-[#050A14] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B6FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#6B6FFF]/10 border border-[#6B6FFF]/25 rounded-full px-4 py-2 mb-4"
          >
            <span className="text-[#6B6FFF] text-sm font-medium">Premium Fleet</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Find Your <span className="gradient-text">Perfect Drive</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            Choose from our handpicked selection of premium vehicles. Every car is verified, insured, and ready for your next adventure.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_4px_20px_rgba(0,212,255,0.3)]'
                  : 'glass border border-white/10 text-white/60 hover:text-white hover:border-[#00D4FF]/30'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((car, idx) => (
            <CarCard key={car.id} car={car} index={idx} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/explore" className="btn-secondary text-base px-8 py-3.5">
            View All Vehicles <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
