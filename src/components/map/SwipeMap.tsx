import React, { useState, useRef, useEffect } from 'react';
import { Layers, ArrowLeftRight, Calendar, AlertCircle } from 'lucide-react';
import { mockChanges } from '../../data/mockChanges';

interface SwipeMapProps {
  onSelectAnomaly?: (anomalyId: string) => void;
  selectedAnomalyId?: string;
}

export const SwipeMap: React.FC<SwipeMapProps> = ({
  onSelectAnomaly,
  selectedAnomalyId
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-[450px] overflow-hidden select-none bg-slate-950"
    >
      {/* Historical Survey (Left / Base Layer) */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        {/* Simulated Historical 2024 Basemap with desaturated vintage look */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-75 opacity-70"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')`
          }}
        />

        {/* Historical 2024 Cadastral Overlay Grid (Muted Purple Lines) */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-40 border border-purple-500/40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-purple-500/40 p-2 flex items-start justify-between">
              <span className="text-[10px] font-mono text-purple-300">2024-CAD-{i + 100}</span>
            </div>
          ))}
        </div>

        {/* Top-Left Date Stamp */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-gis-border backdrop-blur-md flex items-center gap-2 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-semibold text-purple-300">Historical Survey:</span>
          <span className="font-mono">March 2024</span>
        </div>
      </div>

      {/* Current Survey (Right / Clipped Layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        {/* High-Resolution 2026 Drone Orthomosaic with full vibrant color */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-105 contrast-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=80')`
          }}
        />

        {/* 2026 AI Extraction Boundaries & Anomalies Overlay */}
        <div className="absolute inset-0">
          {/* Simulated Change Anomaly Highlights */}
          {mockChanges.map(change => {
            const isSelected = selectedAnomalyId === change.id;
            // Place pins at relative coordinates across screen
            const topPct = change.id === 'CH-028' ? 48 : change.id === 'CH-014' ? 32 : change.id === 'CH-003' ? 62 : 75;
            const leftPct = change.id === 'CH-028' ? 58 : change.id === 'CH-014' ? 68 : change.id === 'CH-003' ? 52 : 72;

            return (
              <div
                key={change.id}
                onClick={() => onSelectAnomaly && onSelectAnomaly(change.id)}
                style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-110 z-20 ${
                  isSelected ? 'scale-125' : ''
                }`}
              >
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl border-2 ${
                    change.changeType === 'Building Expansion'
                      ? 'bg-amber-500/90 border-white text-slate-950 animate-pulse'
                      : change.changeType === 'New Structure'
                      ? 'bg-rose-600/90 border-white text-white'
                      : 'bg-rose-500/90 border-white text-white'
                  }`}>
                    {change.changeType === 'Building Expansion' ? 'EXP' : 'NEW'}
                  </div>

                  {/* Pulsing beacon */}
                  <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-60 animate-ping -z-10" />

                  {/* Hover Tag */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-950/95 border border-gis-border whitespace-nowrap text-[10px] font-mono text-amber-300 font-bold shadow-lg">
                    {change.id} (+{change.estimatedAreaDelta} m²)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top-Right Date Stamp */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-cyan-300">Current Survey:</span>
          <span className="font-mono">August 2026 (2.1cm Ortho)</span>
        </div>
      </div>

      {/* Draggable Vertical Divider Handle */}
      <div
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] cursor-ew-resize z-30 flex items-center justify-center -ml-0.5"
      >
        <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-2xl flex items-center justify-center text-cyan-300 hover:scale-110 transition-transform">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Center Instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-gis-border backdrop-blur-md text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none">
        <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
        <span>Drag center divider to compare 2024 baseline against 2026 drone orthomosaic</span>
      </div>
    </div>
  );
};
