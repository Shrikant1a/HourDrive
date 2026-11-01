import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Eye,
  Crosshair,
  ChevronLeft,
  ChevronRight,
  X,
  Gauge,
  Layers,
  Scale,
  Zap,
} from 'lucide-react';
import { CAR_COMPONENTS } from './explodedData';

export default function ComponentInspector({
  selectedComponent,
  isolatedId,
  onToggleIsolate,
  onFocusCamera,
  onSelectComponent,
  onClose,
}) {
  if (!selectedComponent) {
    return (
      <div className="glass-strong rounded-2xl p-4 sm:p-5 border border-white/10 text-center max-w-sm w-full shadow-2xl backdrop-blur-xl">
        <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/25 flex items-center justify-center mx-auto mb-3 text-[#00D4FF]">
          <Crosshair className="w-5 h-5 animate-pulse" />
        </div>
        <h4 className="text-white font-bold text-sm font-['Outfit'] mb-1">
          Interactive Component Inspection
        </h4>
        <p className="text-white/50 text-xs leading-relaxed mb-3">
          Click any 3D car part in the viewport or use the parts dock below to examine engineering specs, materials, and telemetry.
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 text-[11px] text-[#00D4FF]">
          <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20">V10 Engine</span>
          <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20">Monocoque Tub</span>
          <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20">Carbon Brakes</span>
        </div>
      </div>
    );
  }

  // Find previous and next component for sequential inspection
  const currentIndex = CAR_COMPONENTS.findIndex((c) => c.id === selectedComponent.id);
  const prevComponent = CAR_COMPONENTS[(currentIndex - 1 + CAR_COMPONENTS.length) % CAR_COMPONENTS.length];
  const nextComponent = CAR_COMPONENTS[(currentIndex + 1) % CAR_COMPONENTS.length];
  const isIsolated = isolatedId === selectedComponent.id;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedComponent.id}
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-strong rounded-2xl p-5 border border-cyan-500/30 max-w-md w-full shadow-2xl backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30">
                {selectedComponent.badge}
              </span>
              <span className="text-white/40 text-[11px] font-mono">
                PART {String(currentIndex + 1).padStart(2, '0')}/{CAR_COMPONENTS.length}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg font-['Outfit'] leading-snug">
              {selectedComponent.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Close inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-white/70 text-xs leading-relaxed mb-4">
          {selectedComponent.description}
        </p>

        {/* Highlight Banner */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-[#00D4FF]/10 to-[#6B6FFF]/10 border border-[#00D4FF]/25 mb-4 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-white text-xs font-semibold">Engineering Metric</p>
            <p className="text-white/60 text-[11px]">{selectedComponent.performanceHighlight}</p>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {selectedComponent.specs.map((s) => (
            <div key={s.label} className="p-2.5 rounded-xl bg-white/3 border border-white/5">
              <span className="text-white/40 text-[10px] block uppercase tracking-wider">{s.label}</span>
              <span className="text-white text-xs font-semibold">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Material & Weight summary */}
        <div className="flex items-center justify-between py-2 border-t border-white/10 text-xs text-white/50 mb-4">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="truncate max-w-[170px]">{selectedComponent.materials}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Scale className="w-3.5 h-3.5 text-[#6B6FFF]" />
            <span>{selectedComponent.weight}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => onToggleIsolate(selectedComponent.id)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isIsolated
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {isIsolated ? 'Show All Parts' : 'Isolate Part'}
          </button>

          <button
            onClick={() => onFocusCamera(selectedComponent)}
            className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center gap-1.5 transition-all"
          >
            <Crosshair className="w-3.5 h-3.5" />
            Focus View
          </button>
        </div>

        {/* Sequential Next / Previous pagination */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-white/40">
          <button
            onClick={() => onSelectComponent(prevComponent.id)}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev: {prevComponent.name.split(' ')[0]}
          </button>
          <button
            onClick={() => onSelectComponent(nextComponent.id)}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            Next: {nextComponent.name.split(' ')[0]} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
