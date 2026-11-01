import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Sparkles, Building2, Code2, Globe2, ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#030811] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#00D4FF]/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#6B6FFF]/6 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/25 rounded-full px-4 py-1.5 mb-5"
          >
            <Building2 className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">About The Company</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-5"
          >
            Built & Engineered by <br />
            <span className="gradient-text">ShriiTech Pvt Ltd</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center"
          >
            Pioneering cutting-edge automotive 3D web technologies, real-time spatial digital twins, and seamless peer-to-peer mobility software across India.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Cpu,
              title: '3D Spatial Engineering',
              desc: 'Architected with advanced WebGL & Three.js kinematic transforms for real-time automotive component separation, inspection, and telemetry.',
              tag: 'Proprietary Tech',
              color: 'from-[#00D4FF]/20 to-transparent',
              iconColor: 'text-[#00D4FF]',
            },
            {
              icon: Globe2,
              title: 'India-First Mobility Architecture',
              desc: 'Optimized for high concurrency and localized for Indian metros with instant UPI payments, DigiLocker Aadhaar KYC, and Fastag tolling integration.',
              tag: 'Scalable Platform',
              color: 'from-[#6B6FFF]/20 to-transparent',
              iconColor: 'text-[#6B6FFF]',
            },
            {
              icon: ShieldCheck,
              title: 'Enterprise Safety & Trust',
              desc: 'End-to-end encrypted vehicle telematics, real-time host trip tracking, and automated digital rental contracts built to institutional standards.',
              tag: 'Zero-Trust Security',
              color: 'from-[#00FF87]/20 to-transparent',
              iconColor: 'text-[#00FF87]',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i }}
              className="group relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-8 hover:border-[#00D4FF]/40 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.color} rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125`} />
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00D4FF]/30 transition-colors">
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  {card.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-['Outfit'] group-hover:text-[#00D4FF] transition-colors">
                {card.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Company Signature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-[#050A14] via-[#0A1628] to-[#050A14] border border-[#00D4FF]/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6B6FFF] flex items-center justify-center shrink-0 shadow-lg shadow-[#00D4FF]/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                ShriiTech Pvt Ltd
              </h4>
              <p className="text-white/40 text-xs sm:text-sm">
                Empowering next-generation web & automotive experiences with precision engineering.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/30 px-4 py-2 rounded-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official HourDrive Engineering Partner</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
