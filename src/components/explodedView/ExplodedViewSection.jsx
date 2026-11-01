import { useState, useRef, useEffect, useCallback, Component } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Shield,
  Zap,
  Wind,
  Cpu,
  AlertTriangle,
} from 'lucide-react';
import ExplodedCarCanvas from './ExplodedCarCanvas';
import ComponentInspector from './ComponentInspector';
import StudioControls from './StudioControls';
import { CAR_COMPONENTS, CAMERA_PRESETS } from './explodedData';

/**
 * Robust WebGL Error Boundary to prevent crashes if WebGL context is lost
 */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Automotive Viewer WebGL Exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center h-[500px] glass rounded-3xl border border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-white text-xl font-bold font-['Outfit'] mb-2">
            3D Studio Fallback
          </h3>
          <p className="text-white/60 text-sm max-w-md mb-6 leading-relaxed">
            Hardware acceleration or WebGL is not available in your browser session. You can still review the vehicle engineering specs below.
          </p>
          <img
            src="https://images.unsplash.com/photo-1621135802920-133df287f89c?w=900&q=80"
            alt="HourDrive Supercar Engineering"
            className="w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl object-cover h-48"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ExplodedViewSection() {
  const [explosionProgress, setExplosionProgress] = useState(0); // Start with complete original car fully assembled
  const [selectedId, setSelectedId] = useState('engine');
  const [hoveredId, setHoveredId] = useState(null);
  const [isolatedId, setIsolatedId] = useState(null);
  const [carColor, setCarColor] = useState('#00D4FF');
  const [xrayMode, setXrayMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activePreset, setActivePreset] = useState(CAMERA_PRESETS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Synchronize reduced motion preference changes
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Smooth animation helper between two progress values
  const animateToProgress = useCallback((targetValue, duration = 800) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    if (prefersReducedMotion) {
      setExplosionProgress(targetValue);
      return;
    }

    const startValue = explosionProgress;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth cubic ease-in-out
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = startValue + (targetValue - startValue) * ease;
      setExplosionProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [explosionProgress, prefersReducedMotion]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Handlers for controls
  const handleExplodeAll = () => animateToProgress(1.0, 900);
  const handleAssembleAll = () => animateToProgress(0.0, 900);

  const handleResetView = () => {
    animateToProgress(0.0, 600);
    setSelectedId(null);
    setIsolatedId(null);
    setXrayMode(false);
    setAutoRotate(false);
    setActivePreset(CAMERA_PRESETS[0]);
    if (canvasRef.current) canvasRef.current.resetCamera();
  };

  const handleSelectComponent = (id) => {
    setSelectedId(id);
    if (!id) setIsolatedId(null);
  };

  const handleToggleIsolate = (id) => {
    setIsolatedId(isolatedId === id ? null : id);
  };

  const handleFocusCamera = (component) => {
    if (component?.cameraFocus) {
      setActivePreset({
        name: `Focus: ${component.name}`,
        ...component.cameraFocus,
      });
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const selectedComponent = CAR_COMPONENTS.find((c) => c.id === selectedId) || null;

  return (
    <section
      id="exploded-view"
      className="py-24 relative overflow-hidden bg-[#050A14] border-t border-b border-white/5"
    >
      {/* Background Lighting & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full bg-gradient-radial from-[#00D4FF]/8 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[600px] h-[500px] rounded-full bg-gradient-radial from-[#6B6FFF]/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            HEADER
           ======================================================== */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/25 rounded-full px-4 py-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#00D4FF] animate-pulse" />
            <span className="text-[#00D4FF] text-sm font-semibold tracking-wide">
              Automotive Engineering Studio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Explore <span className="gradient-text">Every Detail</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center max-w-2xl text-white/60 text-base"
          >
            Discover the engineering, design, and details behind every drive.
            Interact with our 3D exploded view to inspect individual parts, telemetry, and modular architecture.
          </motion.p>
        </div>

        {/* ========================================================
            3D STUDIO VIEWPORT CONTAINER
           ======================================================== */}
        <div
          ref={containerRef}
          className={`relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0A1628]/95 via-[#050A14] to-[#0A1628]/95 shadow-[0_30px_90px_rgba(0,0,0,0.85)] transition-all ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px] sm:h-[680px] lg:h-[720px]'
          }`}
        >
          {/* Top HUD Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
            <div className="glass px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
              <span className="text-white text-xs font-semibold font-['Outfit']">
                3D Real-time Kinematics
              </span>
            </div>

            <div className="glass px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white/60 hidden sm:flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>11 Modular Assemblies</span>
            </div>
          </div>

          {/* Top Right Component Inspector Drawer (Overlaid inside Viewport) */}
          <div className="absolute top-4 right-4 z-20 max-w-sm sm:max-w-md pointer-events-auto">
            <ComponentInspector
              selectedComponent={selectedComponent}
              isolatedId={isolatedId}
              onToggleIsolate={handleToggleIsolate}
              onFocusCamera={handleFocusCamera}
              onSelectComponent={handleSelectComponent}
              onClose={() => setSelectedId(null)}
            />
          </div>

          {/* Quick HUD Specs Banner (Bottom Left inside 3D Viewport) */}
          <div className="absolute bottom-6 left-6 z-20 hidden lg:flex items-center gap-4 pointer-events-none">
            <div className="glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#00D4FF]" />
              <div>
                <span className="text-[10px] text-white/40 block leading-none">OUTPUT</span>
                <span className="text-white text-xs font-bold font-['Outfit']">850 BHP V10 Hybrid</span>
              </div>
            </div>

            <div className="glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#6B6FFF]" />
              <div>
                <span className="text-[10px] text-white/40 block leading-none">CHASSIS</span>
                <span className="text-white text-xs font-bold font-['Outfit']">Carbon Monocoque</span>
              </div>
            </div>

            <div className="glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-[#38BDF8]" />
              <div>
                <span className="text-[10px] text-white/40 block leading-none">DOWNFORCE</span>
                <span className="text-white text-xs font-bold font-['Outfit']">185 kg @ 200 km/h</span>
              </div>
            </div>
          </div>

          {/* The WebGL Canvas */}
          <div className="w-full h-full">
            <WebGLErrorBoundary>
              <ExplodedCarCanvas
                ref={canvasRef}
                carColor={carColor}
                explosionProgress={explosionProgress}
                selectedId={selectedId}
                hoveredId={hoveredId}
                isolatedId={isolatedId}
                xrayMode={xrayMode}
                autoRotate={autoRotate}
                activePreset={activePreset}
                onSelectComponent={handleSelectComponent}
                onHoverComponent={setHoveredId}
              />
            </WebGLErrorBoundary>
          </div>
        </div>

        {/* ========================================================
            CONTROLS CONSOLE (BELOW 3D VIEWPORT)
           ======================================================== */}
        <div className="mt-6">
          <StudioControls
            explosionProgress={explosionProgress}
            onSliderChange={setExplosionProgress}
            onExplodeAll={handleExplodeAll}
            onAssembleAll={handleAssembleAll}
            onResetView={handleResetView}
            onRotateLeft={() => canvasRef.current?.rotateLeft()}
            onRotateRight={() => canvasRef.current?.rotateRight()}
            onZoomIn={() => canvasRef.current?.zoomIn()}
            onZoomOut={() => canvasRef.current?.zoomOut()}
            onToggleFullscreen={handleToggleFullscreen}
            isFullscreen={isFullscreen}
            carColor={carColor}
            onChangeCarColor={setCarColor}
            xrayMode={xrayMode}
            onToggleXray={() => setXrayMode(!xrayMode)}
            autoRotate={autoRotate}
            onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
            activePresetName={activePreset?.name}
            onSelectPreset={setActivePreset}
            selectedId={selectedId}
            onSelectComponent={handleSelectComponent}
          />
        </div>
      </div>
    </section>
  );
}
