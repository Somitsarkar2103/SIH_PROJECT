import React from 'react';
import { X, HelpCircle, BookOpen, ShieldCheck, Plane, Layers, Terminal } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9995] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl p-6 overflow-y-auto space-y-5 animate-scale-up text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-base">CadastraAI Standard Operating Manual</h3>
              <p className="text-[11px] text-slate-400">GovTech Drone-Assisted Demarcation Procedures</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-300 text-sm mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> 1. Human-in-the-Loop Demarcation Authority
            </h4>
            <p>
              In accordance with municipal cadastral demarcation protocols, AI models act solely as candidate boundary proposal tools. A licensed Survey Officer must inspect and ratify candidate vertices prior to official registry synchronization.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-300 text-sm mb-1 flex items-center gap-2">
              <Plane className="w-4 h-4" /> 2. Ground Sampling Distance (GSD) Standards
            </h4>
            <p>
              For legal urban cadastre demarcations, UAV orthomosaics must maintain a minimum GSD of 2.0 cm/pixel or finer. Ground Control Points (GCPs) and RTK base station links ensure sub-centimeter geodetic absolute accuracy.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-300 text-sm mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4" /> 3. Keyboard & Map Navigation Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-1 text-slate-400">
              <div><b className="text-white">Ctrl + Scroll:</b> Zoom Map</div>
              <div><b className="text-white">Click Polygon:</b> Open Ledger Drawer</div>
              <div><b className="text-white">Drag Handle:</b> Shift Vertex Node</div>
              <div><b className="text-white">Esc:</b> Exit Active Tool</div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
