import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-[#030811] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#00D4FF]/20 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/25 rounded-full px-4 py-2 mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
            <span className="text-[#FFD700] text-sm font-medium">Customer Stories</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            What Our <span className="gradient-text">Community</span> Says
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className="glass-strong rounded-3xl p-8 md:p-10 border border-white/10 relative">
                  {/* Quote icon */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-16 h-16 text-[#00D4FF]" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                    "{TESTIMONIALS[current].text}"
                  </p>

                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <img
                      src={TESTIMONIALS[current].avatar}
                      alt={`${TESTIMONIALS[current].name} - HourDrive customer review`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#00D4FF]/30"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-white font-semibold font-['Outfit']">{TESTIMONIALS[current].name}</p>
                      <p className="text-white/40 text-sm">{TESTIMONIALS[current].role}</p>
                      <p className="text-[#00D4FF]/60 text-xs mt-0.5">{TESTIMONIALS[current].location}</p>
                    </div>
                  </div>

                  {/* Demo notice */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <p className="text-white/15 text-xs italic">* These are sample testimonials for demonstration purposes.</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#00D4FF]/30 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 h-2 bg-[#00D4FF]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#00D4FF]/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini cards - visible on large screens */}
        <div className="hidden xl:grid grid-cols-5 gap-4 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass rounded-xl p-4 border text-left transition-all duration-300 ${
                i === current ? 'border-[#00D4FF]/40 bg-[#00D4FF]/5' : 'border-white/8 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-white text-xs font-semibold">{t.name.split(' ')[0]}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-xs line-clamp-2">{t.text.slice(0, 60)}...</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
