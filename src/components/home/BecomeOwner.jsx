import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, Calendar, Shield, CheckCircle, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { OWNER_BENEFITS } from '../../data/mockData';

const ICON_MAP = { DollarSign, Calendar, Shield, CheckCircle, TrendingUp, Star };

export default function BecomeOwner() {
  return (
    <section id="become-owner" className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050A14] via-[#0A1220] to-[#050A14]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#00D4FF]/8 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#6B6FFF]/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image showcase */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden border border-white/8 relative">
                <img
                  src="https://images.unsplash.com/photo-1563720223809-b2a27e44f628?w=700&q=90"
                  alt="List your luxury car on HourDrive and earn"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/3' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/60 via-transparent to-transparent" />
              </div>

              {/* Earnings card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-5 border border-[#00D4FF]/20 shadow-2xl"
              >
                <p className="text-white/40 text-xs mb-1">Monthly Earnings</p>
                <p className="text-3xl font-bold font-['Outfit'] gradient-text">$4,280</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-semibold">+23% this month</span>
                </div>
              </motion.div>

              {/* Rating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-5 -left-5 glass-strong rounded-2xl p-4 border border-[#6B6FFF]/20 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center text-xs font-bold text-white">O</div>
                  <div>
                    <p className="text-white text-xs font-semibold">Omar K.</p>
                    <p className="text-white/30 text-xs">Car Owner</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/25 rounded-full px-4 py-2 mb-5"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="text-[#00D4FF] text-sm font-medium">For Vehicle Owners</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-white mb-4"
            >
              Your Car Can Earn{' '}
              <span className="gradient-text">While You Relax</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/55 text-base leading-relaxed mb-8"
            >
              List your vehicle on HourDrive and earn money whenever it's available. Join thousands of owners already earning consistent income from their cars.
            </motion.p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {OWNER_BENEFITS.map((benefit, i) => {
                const Icon = ICON_MAP[benefit.icon] || CheckCircle;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{benefit.title}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/register" className="btn-primary text-base px-8 py-3.5">
                Start Listing Your Car <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
