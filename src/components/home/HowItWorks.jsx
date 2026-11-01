import { motion } from 'framer-motion';
import { Search, CreditCard, Car } from 'lucide-react';
import { HOW_IT_WORKS } from '../../data/mockData';

const ICONS = { Search, CreditCard, Car };

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#050A14] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D4FF]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FF6B6B]/10 border border-[#FF6B6B]/25 rounded-full px-4 py-2 mb-4"
          >
            <span className="text-[#FF6B6B] text-sm font-medium">Simple Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            How <span className="gradient-text">HourDrive</span> Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            From discovery to driving in three simple steps. We've made premium car rental effortless.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-[#00D4FF]/30 via-[#6B6FFF]/50 to-[#FF6B6B]/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = ICONS[step.icon] || Search;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <div className="relative mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 border-2 transition-all duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${step.color}20 0%, ${step.color}05 100%)`,
                        borderColor: `${step.color}40`,
                        boxShadow: `0 0 30px ${step.color}20`,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold"
                      style={{
                        color: step.color,
                        borderColor: step.color,
                        background: '#050A14',
                      }}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass rounded-2xl p-6 border border-white/8 hover:border-[#00D4FF]/20 transition-all duration-300 card-hover w-full">
                    <h3 className="text-xl font-bold text-white font-['Outfit'] mb-3">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 p-8 glass-strong rounded-2xl border border-white/10 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">Ready to Start?</h3>
          <p className="text-white/50 text-sm mb-6">Join over 12,000 satisfied renters. Create your free account in under 2 minutes.</p>
          <a href="/register" className="btn-primary">
            Get Started Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
