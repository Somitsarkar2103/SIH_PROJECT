import React, { useState } from 'react';
import { ParcelFeature } from '../../types';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { 
  X, 
  CheckCircle2, 
  Edit3, 
  AlertTriangle, 
  FileText, 
  Layers, 
  MapPin, 
  Calendar, 
  Maximize, 
  ShieldCheck, 
  Sparkles,
  Building2,
  GitCompare,
  Info
} from 'lucide-react';

interface ParcelDetailDrawerProps {
  parcel: ParcelFeature | null;
  onClose: () => void;
  onVerify: (parcelId: string) => void;
  onStartEdit: (parcelId: string) => void;
  onFlag: (parcelId: string, reason: string) => void;
  onGenerateReport: (parcel: ParcelFeature) => void;
  isEditing?: boolean;
}

export const ParcelDetailDrawer: React.FC<ParcelDetailDrawerProps> = ({
  parcel,
  onClose,
  onVerify,
  onStartEdit,
  onFlag,
  onGenerateReport,
  isEditing = false
}) => {
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagReason, setFlagReason] = useState('');

  if (!parcel) return null;

  const handleFlagSubmit = () => {
    if (!flagReason.trim()) return;
    onFlag(parcel.parcelId, flagReason);
    setShowFlagModal(false);
    setFlagReason('');
  };

  const statusConfig = {
    verified: {
      label: 'Verified by Survey Officer',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
    },
    review: {
      label: 'Requires Review',
      badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
    },
    mismatch: {
      label: 'Significant Mismatch / Anomaly',
      badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
    },
    ai_candidate: {
      label: 'AI Candidate Parcel',
      badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" />
    },
    rejected: {
      label: 'Demarcation Rejected',
      badgeClass: 'bg-slate-700/40 text-slate-400 border-slate-600',
      icon: <X className="w-3.5 h-3.5 text-slate-400" />
    }
  }[parcel.status];

  return (
    <aside className="w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 flex flex-col h-full shadow-2xl z-20 animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-base text-white tracking-tight flex items-center gap-2">
              Parcel {parcel.parcelId}
            </h3>
            <span className="text-[11px] text-slate-400">{parcel.landUse} • Sector 4</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Verification Status Pill */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Verification Status</span>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold ${statusConfig.badgeClass}`}>
            {statusConfig.icon}
            <span>{statusConfig.label}</span>
          </div>
          {parcel.surveyOfficer && (
            <p className="text-[10px] text-slate-400 italic">
              Assigned: {parcel.surveyOfficer} {parcel.verifiedAt && `• ${parcel.verifiedAt}`}
            </p>
          )}
          {parcel.flagReason && (
            <div className="mt-1 p-2 rounded bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300">
              <span className="font-semibold text-rose-400">Flagged Issue:</span> {parcel.flagReason}
            </div>
          )}
        </div>

        {/* Parcel Information Section (Section 9) */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Parcel Information
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 text-[10px] block">Area</span>
              <span className="font-mono font-bold text-white text-sm">{parcel.area} m²</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 text-[10px] block">Perimeter</span>
              <span className="font-mono font-bold text-white text-sm">{parcel.perimeter} m</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 text-[10px] block">Latitude</span>
              <span className="font-mono text-slate-200 text-xs">{parcel.center[0].toFixed(5)}° N</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 text-[10px] block">Longitude</span>
              <span className="font-mono text-slate-200 text-xs">{parcel.center[1].toFixed(5)}° E</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/60 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Survey Date:</span>
              <span className="text-slate-200 font-mono">{parcel.surveyDate}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Sensor Source:</span>
              <span className="text-slate-200 truncate ml-2 text-right">{parcel.source}</span>
            </div>
          </div>
        </div>

        {/* AI Analysis Section (Section 9) */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3.5 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> AI Feature Extraction
          </h4>

          {/* AI Confidence Card (Section 10) */}
          <ConfidenceBadge score={parcel.boundaryConfidence} label="Boundary Confidence" />

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                <Building2 className="w-3 h-3 text-cyan-400" /> Building Detected
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-white">{parcel.buildingDetected ? 'YES' : 'NO'}</span>
                {parcel.buildingDetected && (
                  <span className="text-[11px] font-mono text-cyan-400">{parcel.buildingConfidence}% conf</span>
                )}
              </div>
            </div>

            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
              <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-0.5">
                <GitCompare className="w-3 h-3 text-amber-400" /> Change Detected
              </div>
              <div className="flex items-baseline justify-between">
                <span className={`font-bold ${parcel.changeDetected ? 'text-amber-400' : 'text-slate-300'}`}>
                  {parcel.changeDetected ? 'YES' : 'NO'}
                </span>
                {parcel.changeDetected && (
                  <span className="text-[10px] text-amber-300">vs 2024</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Explainability Section (Section 34: "Why this boundary?") */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> AI Boundary Reasoning
            </h4>
            <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">
              Explainable AI
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                parcel.evidence.buildingEdge ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>✓</span>
              <span>Building edge detected</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                parcel.evidence.roadBoundary ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>✓</span>
              <span>Road boundary detected</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                parcel.evidence.historicalAlignment ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>✓</span>
              <span>Historical boundary alignment</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                parcel.evidence.strongImageEdge ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>✓</span>
              <span>Strong image edge</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                parcel.evidence.noMajorOcclusion ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}>✓</span>
              <span>No major vegetation occlusion</span>
            </div>
          </div>

          {parcel.evidence.notes && (
            <div className="mt-2 p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Spatial Context:</span> {parcel.evidence.notes}
            </div>
          )}
        </div>

        {/* Important Domain Rule Disclaimer (Section 33) */}
        <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-[11px] text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <span className="text-cyan-300 font-semibold">Government Cadastre Notice:</span> Suggested candidate boundaries are AI-assisted demarcation proposals. Boundaries require human verification by a certified survey officer before formal gazettal.
          </p>
        </div>
      </div>

      {/* Action Buttons (Section 9) */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onVerify(parcel.parcelId)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" /> Verify
          </button>

          <button
            onClick={() => onStartEdit(parcel.parcelId)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
              isEditing
                ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Edit3 className="w-4 h-4" /> {isEditing ? 'Editing Vertices' : 'Edit Boundary'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowFlagModal(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-rose-300 hover:text-rose-200 border border-rose-900/50 text-xs font-medium transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Flag Issue
          </button>

          <button
            onClick={() => onGenerateReport(parcel)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" /> Draft Report
          </button>
        </div>
      </div>

      {/* Flag Issue Modal */}
      {showFlagModal && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-50 p-6 flex flex-col justify-center animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3 shadow-2xl">
            <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Flag Discrepancy for Parcel {parcel.parcelId}
            </h4>
            <p className="text-xs text-slate-400">
              Record a field note or cadastral conflict for supervisory survey re-inspection.
            </p>
            <textarea
              value={flagReason}
              onChange={e => setFlagReason(e.target.value)}
              placeholder="e.g. Encroachment onto road right-of-way, disputed boundary corner, vegetative occlusion..."
              className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowFlagModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleFlagSubmit}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white"
              >
                Submit Flag
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
