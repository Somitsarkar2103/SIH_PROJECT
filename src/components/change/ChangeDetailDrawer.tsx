import React from 'react';
import { ChangeRecord } from '../../types';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { 
  X, 
  GitCompare, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Maximize2, 
  ShieldAlert,
  MapPin
} from 'lucide-react';

interface ChangeDetailDrawerProps {
  change: ChangeRecord | null;
  onClose: () => void;
  onApprove: (changeId: string) => void;
  onFlag: (changeId: string) => void;
}

export const ChangeDetailDrawer: React.FC<ChangeDetailDrawerProps> = ({
  change,
  onClose,
  onApprove,
  onFlag
}) => {
  if (!change) return null;

  const severityBadge = {
    high: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }[change.severity];

  return (
    <aside className="w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 flex flex-col h-full shadow-2xl z-20 animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <GitCompare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-base text-white tracking-tight">
              Change #{change.id}
            </h3>
            <span className="text-[11px] text-slate-400">Temporal Diff: 2024 → 2026</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Severity & Status */}
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${severityBadge}`}>
            {change.severity.toUpperCase()} PRIORITY
          </span>
          <span className="text-xs font-medium text-slate-400">
            Status: <b className="text-white">{change.status}</b>
          </span>
        </div>

        {/* Parcel Association */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Associated Parcel</span>
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-cyan-400 text-base">{change.parcelId}</span>
            <span className="text-xs text-slate-300">Sector 4, Bengaluru</span>
          </div>
        </div>

        {/* Change Attributes (Section 17) */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Change Metrics</span>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Change Type</span>
              <span className="font-semibold text-white text-sm">{change.changeType}</span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Estimated Affected Area</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{change.affectedArea} m²</span>
            </div>
          </div>

          <ConfidenceBadge score={change.confidence} label="AI Change Confidence" />
        </div>

        {/* Detailed Narrative */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Cadastral Anomaly Description
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            {change.description}
          </p>
        </div>

        {/* Survey Timeline Comparison */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Historical Baseline:</span>
            <span className="text-purple-400 font-semibold">{change.previousSurveyYear} Survey Ortho</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Current UAV Flight:</span>
            <span className="text-cyan-400 font-semibold">{change.currentSurveyYear} Orthomosaic</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 grid grid-cols-2 gap-2">
        <button
          onClick={() => onApprove(change.id)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/30 transition-all active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" /> Approve Change
        </button>

        <button
          onClick={() => onFlag(change.id)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
        >
          <AlertTriangle className="w-4 h-4" /> Flag Violation
        </button>
      </div>
    </aside>
  );
};
