import {
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  Play,
  Rotate3d,
  Box,
  Palette,
  Eye,
  Sliders,
} from 'lucide-react';
import { CAR_COMPONENTS, COLOR_VARIANTS, CAMERA_PRESETS } from './explodedData';

export default function StudioControls({
  explosionProgress,
  onSliderChange,
  onExplodeAll,
  onAssembleAll,
  onResetView,
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  isFullscreen,
  carColor,
  onChangeCarColor,
  xrayMode,
  onToggleXray,
  autoRotate,
  onToggleAutoRotate,
  activePresetName,
  onSelectPreset,
  selectedId,
  onSelectComponent,
}) {
  const percentage = Math.round(explosionProgress * 100);

  return (
    <div className="space-y-4 w-full">
      {/* ========================================================
          1. MAIN SLIDER & ASSEMBLE/EXPLODE BAR
         ======================================================== */}
      <div className="glass-strong rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Explode / Assemble Quick Toggles */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={onAssembleAll}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                percentage === 0
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              <Box className="w-3.5 h-3.5" /> Assemble
            </button>

            <button
              onClick={onExplodeAll}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                percentage === 100
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Exploded View
            </button>
          </div>

          {/* Scrubbing Animation Slider */}
          <div className="flex-1 w-full flex items-center gap-4">
            <span className="text-white/40 text-xs font-semibold uppercase tracking-wider hidden sm:inline whitespace-nowrap">
              Separation:
            </span>

            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={percentage}
                onChange={(e) => onSliderChange(Number(e.target.value) / 100)}
                aria-label="Exploded view progress slider"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-[#00D4FF] focus:outline-none"
              />
            </div>

            <div className="px-3 py-1 rounded-lg bg-black/50 border border-cyan-500/30 text-[#00D4FF] font-mono text-xs font-bold min-w-[58px] text-center">
              {percentage}%
            </div>
          </div>

          {/* Camera Manipulation Buttons (Rotate, Zoom, Fullscreen) */}
          <div className="flex items-center gap-1.5 self-end md:self-auto">
            <button
              onClick={onRotateLeft}
              title="Rotate Left"
              aria-label="Rotate Left"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onRotateRight}
              title="Rotate Right"
              aria-label="Rotate Right"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={onZoomIn}
              title="Zoom In"
              aria-label="Zoom In"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={onZoomOut}
              title="Zoom Out"
              aria-label="Zoom Out"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={onResetView}
              title="Reset View"
              aria-label="Reset View"
              className="px-3 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              Reset
            </button>

            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label="Toggle Fullscreen"
              className="w-9 h-9 rounded-xl bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. SECONDARY CONTROLS (CAMERAS, COLOR, XRAY, COMPONENT DOCK)
         ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Camera Angles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-white/40 font-semibold uppercase tracking-wider text-[11px] mr-1">
            Camera:
          </span>
          {CAMERA_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => onSelectPreset(p)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activePresetName === p.name
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
              }`}
            >
              {p.name}
            </button>
          ))}

          <button
            onClick={onToggleAutoRotate}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              autoRotate
                ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40'
                : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            {autoRotate ? 'Turntable Active' : 'Turntable'}
          </button>
        </div>

        {/* Livery / Color Switcher & X-Ray Blueprint */}
        <div className="flex items-center gap-3">
          {/* X-Ray Mode Toggle */}
          <button
            onClick={onToggleXray}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              xrayMode
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {xrayMode ? 'X-Ray Blueprint On' : 'X-Ray View'}
          </button>

          {/* Color Palettes */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
            {COLOR_VARIANTS.map((c) => (
              <button
                key={c.name}
                onClick={() => onChangeCarColor(c.hex)}
                title={c.name}
                aria-label={c.name}
                className={`w-6 h-6 rounded-lg transition-transform ${
                  carColor === c.hex ? 'scale-115 ring-2 ring-white shadow-lg' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          3. INTERACTIVE PARTS DOCK (CHIPS TO DIRECTLY SELECT PARTS)
         ======================================================== */}
      <div className="pt-2">
        <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-2">
          Select Component to Inspect:
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => onSelectComponent(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedId === null
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-white/5 hover:bg-white/10 text-white/50 border border-white/5'
            }`}
          >
            All Parts
          </button>

          {CAR_COMPONENTS.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectComponent(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedId === c.id
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#6B6FFF] text-white shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
              }`}
            >
              {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
