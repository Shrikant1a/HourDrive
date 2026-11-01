import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ChevronRight, Play, ArrowRight } from 'lucide-react';
import { STATS } from '../../data/mockData';

// Particle component
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: Math.random() * 4 + 1 + 'px',
        height: Math.random() * 4 + 1 + 'px',
        background: Math.random() > 0.5 ? 'rgba(0,212,255,0.6)' : 'rgba(107,111,255,0.5)',
        ...style,
      }}
    />
  );
}

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  style: {
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animation: `drift ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`,
    opacity: Math.random() * 0.7 + 0.2,
  },
}));

export default function HeroSection() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Animated grid lines on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 60;
      ctx.strokeStyle = 'rgba(0,212,255,0.04)';
      ctx.lineWidth = 1;

      for (let x = (offset % spacing); x < canvas.width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = (offset % spacing); y < canvas.height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      offset += 0.15;
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050A14]">
      {/* Animated canvas grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-radial from-[#00D4FF]/8 to-transparent blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#6B6FFF]/10 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-radial from-[#00D4FF]/3 to-transparent blur-3xl" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => <Particle key={p.id} style={p.style} />)}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/25 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-[#00D4FF] text-sm font-medium">India's Premier Hourly Car Rental Platform 🇮🇳</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="section-title text-white mb-6"
            >
              Your Journey.{' '}
              <span className="gradient-text">Your Time.</span>{' '}
              Your Drive.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Discover and rent extraordinary cars by the hour across India. From iconic Indian SUVs like Thar, Scorpio & Safari to supercars — drive on your terms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <Link to="/explore" className="btn-primary text-base px-7 py-3.5">
                Explore Cars <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/register" className="btn-secondary text-base px-7 py-3.5">
                <Play className="w-4 h-4 fill-current" /> List Your Car
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold font-['Outfit'] gradient-text">{s.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Car Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="flex-1 relative max-w-xl w-full hidden lg:block"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#00D4FF]/20 to-transparent blur-3xl scale-110" />

            {/* Car image container */}
            <div className="relative animate-float">
              <div className="absolute inset-[-20px] rounded-3xl bg-gradient-to-br from-[#00D4FF]/10 to-[#6B6FFF]/10 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1621135802920-133df287f89c?w=900&q=90"
                alt="Premium Lamborghini — HourDrive Featured Car"
                className="relative z-10 w-full object-cover rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/5"
                style={{ aspectRatio: '4/3' }}
                loading="eager"
              />
              {/* Reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050A14] to-transparent rounded-b-3xl z-20" />

              {/* Floating info cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-6 top-6 glass rounded-xl p-3 shadow-2xl z-30 border border-white/10 max-w-[180px]"
              >
                <p className="text-xs text-white/40 mb-1">Featured Car</p>
                <p className="text-white font-semibold text-sm">Lamborghini Huracán</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                  <span className="text-white/40 text-xs">4.9</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-6 bottom-12 glass rounded-xl p-3 shadow-2xl z-30 border border-white/10"
              >
                <p className="text-xs text-white/40 mb-0.5">From</p>
                <p className="text-2xl font-bold font-['Outfit'] gradient-text">₹18,500</p>
                <p className="text-white/40 text-xs">/hour</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Booking Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-14 glass-strong rounded-2xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Quick Search</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Location */}
            <div className="lg:col-span-1">
              <label className="form-label">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
                <input
                  type="text"
                  placeholder="Mumbai, Delhi, Bengaluru..."
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div className="lg:col-span-1">
              <label className="form-label">Pickup Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
                <input
                  type="date"
                  className="form-input pl-10"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Start Time */}
            <div>
              <label className="form-label">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D4FF]" />
                <input
                  type="time"
                  className="form-input pl-10"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="form-label">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6FFF]" />
                <input
                  type="time"
                  className="form-input pl-10"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={() => navigate('/explore')}
                className="btn-primary w-full justify-center py-3.5"
              >
                <Search className="w-4 h-4" /> Search Cars
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-white/20 text-xs tracking-widest uppercase">Scroll to explore</p>
        <div className="w-5 h-9 border border-white/15 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
          />
        </div>
      </motion.div>
    </section>
  );
}
