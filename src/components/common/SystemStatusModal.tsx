import React from 'react';
import { 
  X, 
  Cpu, 
  Radio, 
  HardDrive, 
  Plane, 
  CheckCircle2, 
  Activity,
  Zap,
  Globe
} from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9995] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl p-6 space-y-5 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Cadastral System Diagnostics</h3>
              <p className="text-xs text-slate-400">Operational readiness and hardware telemetry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* RTK GNSS */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-400" /> RTK Base Station Link
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                FIXED (99.8%)
              </span>
            </div>
            <div className="space-y-1 text-slate-400 text-[11px]">
              <div className="flex justify-between"><span>Satellites Tracked:</span><span className="text-white font-mono">18 / 24 (GPS+GLONASS)</span></div>
              <div className="flex justify-between"><span>Positional Horizontal RMS:</span><span className="text-emerald-400 font-mono">0.008 m</span></div>
              <div className="flex justify-between"><span>Vertical RMS:</span><span className="text-emerald-400 font-mono">0.012 m</span></div>
            </div>
          </div>

          {/* GPU Compute */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" /> Deep Learning Inference
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                A100 ACTIVE
              </span>
            </div>
            <div className="space-y-1 text-slate-400 text-[11px]">
              <div className="flex justify-between"><span>Model Accelerator:</span><span className="text-white">NVIDIA A100 80GB SXM4</span></div>
              <div className="flex justify-between"><span>GPU Core Temp / Load:</span><span className="text-cyan-400 font-mono">42°C • 34% Load</span></div>
              <div className="flex justify-between"><span>VRAM Allocation:</span><span className="text-white font-mono">24.2 GB / 80 GB</span></div>
            </div>
          </div>

          {/* Coordinate Reference System */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-purple-400" /> Spatial Reference (CRS)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                SYNCHRONIZED
              </span>
            </div>
            <div className="space-y-1 text-slate-400 text-[11px]">
              <div className="flex justify-between"><span>Projected Datum:</span><span className="text-white font-mono">EPSG:32643 (UTM 43N)</span></div>
              <div className="flex justify-between"><span>Geographic Baseline:</span><span className="text-white font-mono">WGS 84 (EPSG:4326)</span></div>
              <div className="flex justify-between"><span>Cadastral Spheroid:</span><span className="text-white font-mono">GRS 1980 Spheroid</span></div>
            </div>
          </div>

          {/* UAV Drone Link */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-blue-400" /> Sensor & Imagery Payload
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                READY
              </span>
            </div>
            <div className="space-y-1 text-slate-400 text-[11px]">
              <div className="flex justify-between"><span>Sensor:</span><span className="text-white">Zenmuse P1 (45 MP Full-Frame)</span></div>
              <div className="flex justify-between"><span>Effective GSD:</span><span className="text-cyan-400 font-mono">1.8 cm / pixel</span></div>
              <div className="flex justify-between"><span>Survey Flight Altitude:</span><span className="text-white font-mono">120 m AGL</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
