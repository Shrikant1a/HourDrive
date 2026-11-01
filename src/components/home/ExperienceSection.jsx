import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  Gauge,
  Wind,
  Shield,
  ArrowRight,
  Box,
  Camera,
  MapPin,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import Car3DViewer from '../cars/Car3DViewer';
import { SHOWCASE_CARS } from '../../data/showcaseCars';

const ICON_MAP = {
  Zap,
  Gauge,
  Wind,
  Shield,
};

export default function ExperienceSection() {
  const [selectedCarId, setSelectedCarId] = useState(SHOWCASE_CARS[0].id);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeCar = SHOWCASE_CARS.find((c) => c.id === selectedCarId) || SHOWCASE_CARS[0];
  const activePhoto = activeCar.realWorldImages[activeImageIndex] || activeCar.realWorldImages[0];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const handleCarSelect = (carId) => {
    setSelectedCarId(carId);
    setActiveImageIndex(0);
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050A14] via-[#0A1628] to-[#050A14]">
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-gradient-radial from-[#00D4FF]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/25 rounded-full px-4 py-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-[#00D4FF] text-sm font-medium">Interactive Fleet Studio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Experience the Drive <br />
            <span className="gradient-text">Before You Book</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            Switch between iconic vehicles from our Indian fleet. Rotate in real-time 3D, listen to synthesized engine revs, and view real-world on-road photography.
          </motion.p>
        </div>

        {/* Car Selector Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-white/50 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00D4FF]" />
              Select Vehicle to Inspect:
            </span>
            <span className="text-xs text-white/40 hidden sm:inline">
              Showing {SHOWCASE_CARS.length} featured vehicles
            </span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x focus:outline-none">
            {SHOWCASE_CARS.map((car) => {
              const isSelected = car.id === selectedCarId;
              return (
                <button
                  key={car.id}
                  onClick={() => handleCarSelect(car.id)}
                  className={`flex-shrink-0 snap-start text-left px-4 py-3 rounded-2xl transition-all duration-300 border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00D4FF]/20 via-[#6B6FFF]/15 to-[#00D4FF]/10 border-[#00D4FF] shadow-[0_0_24px_rgba(0,212,255,0.35)] scale-[1.02]'
                      : 'bg-white/5 border-white/8 hover:bg-white/10 hover:border-white/20 text-white/70'
                  }`}
                  style={{ minWidth: '185px' }}
                >
                  {/* Subtle top indicator bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] via-[#6B6FFF] to-[#00D4FF]" />
                  )}

                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#00D4FF]/25 text-[#00D4FF]'
                          : 'bg-white/8 text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {car.category}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
                    )}
                  </div>

                  <p className={`font-semibold text-sm truncate ${isSelected ? 'text-white' : 'text-white/85'}`}>
                    {car.name}
                  </p>

                  <p className="text-xs text-[#00D4FF] font-medium mt-1">
                    ₹{car.pricePerHour.toLocaleString('en-IN')}
                    <span className="text-white/40 text-[10px] font-normal">/hr</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Grid: Visualizer Left + Specs Panel Right */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Car visual container */}
          <div className="relative">
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    viewMode === '3d'
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  Interactive 3D Studio
                </button>
                <button
                  onClick={() => setViewMode('photo')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    viewMode === 'photo'
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  Real-World Photography
                  <span className="px-1.5 py-0.2 rounded-full bg-white/15 text-[10px] text-white/90">
                    {activeCar.realWorldImages.length}
                  </span>
                </button>
              </div>

              {/* Active Car indicator pill */}
              <span className="text-xs text-white/50 font-medium hidden sm:inline truncate max-w-[150px]">
                {activeCar.brand}
              </span>
            </div>

            {viewMode === '3d' ? (
              <Car3DViewer
                key={activeCar.id}
                selectedCar={activeCar}
                onSwitchToPhoto={() => setViewMode('photo')}
              />
            ) : (
              <motion.div
                style={{ y, scale }}
                className="relative rounded-2xl overflow-hidden glass border border-white/10 bg-[#0A1628]/80 shadow-2xl"
              >
                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00D4FF]/15 to-[#6B6FFF]/10 blur-2xl scale-105 pointer-events-none" />

                {/* Photography Stage */}
                <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeCar.id}-${activeImageIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      src={activePhoto.url}
                      alt={`${activeCar.name} - ${activePhoto.title}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </AnimatePresence>

                  {/* Gradient vignettes for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/30 to-black/50 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 p-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/90">
                      <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
                      <span className="truncate max-w-[220px] sm:max-w-[300px]">
                        {activePhoto.subtitle || activeCar.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Verified Fleet</span>
                    </div>
                  </div>

                  {/* Bottom Controls: Caption + Angle Selector Tabs */}
                  <div className="relative z-10 p-4 sm:p-5">
                    {/* Caption */}
                    <div className="mb-3">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#00D4FF] bg-[#00D4FF]/15 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                        {activePhoto.tag}
                      </span>
                      <h4 className="text-white font-bold text-lg font-['Outfit'] drop-shadow-md">
                        {activePhoto.title}
                      </h4>
                      <p className="text-white/60 text-xs mt-0.5">
                        {activePhoto.subtitle}
                      </p>
                    </div>

                    {/* Angle Switcher Thumbnails / Buttons */}
                    <div className="flex items-center justify-between gap-2 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                        {activeCar.realWorldImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                              activeImageIndex === idx
                                ? 'bg-[#00D4FF] text-black font-semibold shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                            }`}
                          >
                            <Camera className="w-3 h-3" />
                            <span>Angle {idx + 1}: {img.tag}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setViewMode('3d')}
                        className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
                        title="Switch back to interactive 3D model"
                      >
                        <Box className="w-3.5 h-3.5 text-[#00D4FF]" />
                        <span>3D Studio</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Dynamic Specs Panel Right */}
          <div className="space-y-6">
            <motion.div
              key={activeCar.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/25 px-2.5 py-0.5 rounded-full">
                  {activeCar.brand}
                </span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/50 text-xs">{activeCar.category}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-amber-400 text-xs font-medium">★ {activeCar.rating}</span>
              </div>

              <h3 className="text-white font-bold text-3xl font-['Outfit'] mb-2.5">
                {activeCar.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {activeCar.tagline}
              </p>
            </motion.div>

            {/* Spec cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {activeCar.specs.map((spec, i) => {
                const IconComponent = ICON_MAP[spec.icon] || Zap;
                return (
                  <motion.div
                    key={spec.label + activeCar.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass rounded-xl p-4 border border-white/8 hover:border-[#00D4FF]/30 transition-all duration-300 group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg mb-2.5 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${spec.color}18` }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: spec.color }} />
                    </div>
                    <p className="text-white/40 text-xs mb-0.5">{spec.label}</p>
                    <p className="text-white font-bold text-xl font-['Outfit']" style={{ color: spec.color }}>
                      {spec.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Dynamic Performance score bars */}
            <div className="space-y-3.5 pt-1">
              {activeCar.scores.map((item, i) => (
                <div key={item.label + activeCar.id}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/70 font-medium">{item.label}</span>
                    <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      key={activeCar.id + item.label}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing & Booking Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <p className="text-white/40 text-xs mb-0.5">HourDrive Rental Tariff</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-white font-['Outfit']">
                    ₹{activeCar.pricePerHour.toLocaleString('en-IN')}
                  </span>
                  <span className="text-white/50 text-xs">/ hour</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="#exploded-view"
                  className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center"
                >
                  3D Exploded Engine
                </a>

                <Link
                  to={`/explore?car=${activeCar.id}`}
                  className="btn-primary py-2.5 px-5 text-sm flex items-center justify-center gap-2"
                >
                  <span>Book {activeCar.brand}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

