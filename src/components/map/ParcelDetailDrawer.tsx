import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Edit3,
  AlertTriangle,
  FileText,
  Building,
  Maximize2,
  Calendar,
  Layers,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { ExplainabilityPanel } from '../common/ExplainabilityPanel';
import { ParcelFeature } from '../../types/parcel';

interface ParcelDetailDrawerProps {
  parcel: ParcelFeature | null;
  onClose: () => void;
  onStartEdit?: () => void;
}

export const ParcelDetailDrawer: React.FC<ParcelDetailDrawerProps> = ({
  parcel,
  onClose,
  onStartEdit
}) => {
  const { verifyParcel, setIsReportModalOpen, setCurrentTab, addToast } = useApp();
  const [officerNotes, setOfficerNotes] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!parcel) return null;

  const prop = parcel.properties;

  const handleVerify = async () => {
    setIsVerifying(true);
    await verifyParcel(prop.parcelId, officerNotes || 'Verified as conforming to drone orthomosaic boundary.');
    setIsVerifying(false);
  };

  const handleFlagIssue = () => {
    addToast('warning', 'Issue Flagged', `Parcel ${prop.parcelId} has been flagged for field inspection dispatch.`);
  };

  const handleEditBoundary = () => {
    if (onStartEdit) {
      onStartEdit();
    } else {
      setCurrentTab('parcel-mapping');
    }
  };

  return (
    <div className="w-96 max-w-full bg-gis-card/95 border-l border-gis-border flex flex-col h-full z-[600] shadow-2xl backdrop-blur-md overflow-hidden animate-in slide-in-from-right-5 duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gis-border bg-gis-darkest/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
            GIS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono font-bold text-white text-base">
                Parcel {prop.parcelId}
              </h3>
              <span
                className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                  prop.status === 'verified'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : prop.status === 'review'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : prop.status === 'anomaly'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                }`}
              >
                {prop.status === 'verified' ? '🟢 Verified' : prop.status === 'review' ? '🟡 Requires Review' : prop.status === 'anomaly' ? '🔴 Mismatch Anomaly' : '🔵 AI Candidate'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{prop.source}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Metric Highlights */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-gis-darkest/70 border border-gis-border rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Calculated Area</span>
            <div className="text-lg font-mono font-bold text-white mt-0.5">
              {prop.area} <span className="text-xs text-slate-400 font-sans">m²</span>
            </div>
          </div>
          <div className="p-3 bg-gis-darkest/70 border border-gis-border rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Boundary Perimeter</span>
            <div className="text-lg font-mono font-bold text-white mt-0.5">
              {prop.perimeter} <span className="text-xs text-slate-400 font-sans">m</span>
            </div>
          </div>
        </div>

        {/* AI Confidence Visualizer */}
        <div className="p-3.5 bg-gis-darkest/80 border border-gis-border rounded-xl">
          <ConfidenceBadge score={prop.boundaryConfidence} label="AI Boundary Confidence" />
        </div>

        {/* AI Analysis Grid */}
        <div className="bg-gis-darkest/70 border border-gis-border rounded-xl p-3.5 space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Feature Synthesis</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-gis-card/60 border border-gis-border/50">
              <span className="text-[10px] text-slate-400 block">Building Detected</span>
              <span className="font-mono font-bold text-white">
                {prop.buildingDetected ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="p-2 rounded bg-gis-card/60 border border-gis-border/50">
              <span className="text-[10px] text-slate-400 block">Building Conf.</span>
              <span className="font-mono font-bold text-emerald-400">
                {prop.buildingConfidence}%
              </span>
            </div>

            <div className="p-2 rounded bg-gis-card/60 border border-gis-border/50">
              <span className="text-[10px] text-slate-400 block">Change Detected</span>
              <span className={`font-mono font-bold ${prop.changeDetected ? 'text-amber-400' : 'text-slate-300'}`}>
                {prop.changeDetected ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="p-2 rounded bg-gis-card/60 border border-gis-border/50">
              <span className="text-[10px] text-slate-400 block">CRS Alignment</span>
              <span className="font-mono font-semibold text-cyan-300 text-[11px] truncate block">
                UTM 43N
              </span>
            </div>
          </div>

          {prop.changeDetected && (
            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Temporal Change Flag:</span> Structure expansion detected against 2024 cadastral baseline deed.
              </div>
            </div>
          )}
        </div>

        {/* Explainability Breakdown */}
        <ExplainabilityPanel
          factors={prop.explainability}
          overallConfidence={prop.overallConfidence}
        />

        {/* Cadastral Coordinates Metadata */}
        <div className="p-3 bg-gis-darkest/60 border border-gis-border rounded-xl space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Centroid:
            </span>
            <span className="font-mono text-slate-200">
              {prop.centroid[0].toFixed(5)}° N, {prop.centroid[1].toFixed(5)}° E
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Survey Date:
            </span>
            <span className="font-mono text-slate-200">{prop.surveyDate}</span>
          </div>

          {prop.verifiedBy && (
            <div className="pt-2 mt-2 border-t border-gis-border/60">
              <span className="text-[10px] text-slate-400 block">Verified Sign-off:</span>
              <p className="font-mono text-[11px] text-emerald-400">{prop.verifiedBy}</p>
              <p className="font-mono text-[10px] text-slate-400">{prop.verifiedAt}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-4 border-t border-gis-border bg-gis-darkest/90 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleVerify}
            disabled={isVerifying || prop.status === 'verified'}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-950/50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{prop.status === 'verified' ? 'Verified' : 'Verify'}</span>
          </button>

          <button
            onClick={handleEditBoundary}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gis-surface hover:bg-gis-card border border-gis-border text-slate-200 hover:text-white text-xs font-semibold transition-colors"
          >
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span>Edit Boundary</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleFlagIssue}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gis-surface hover:bg-rose-950/40 border border-gis-border hover:border-rose-800/60 text-slate-300 hover:text-rose-300 text-xs transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Flag Issue</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gis-surface hover:bg-gis-card border border-gis-border text-slate-300 hover:text-white text-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Draft Report</span>
          </button>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[10px] text-slate-400 text-center pt-1">
          Candidate boundary requires field officer verification before legal publishing.
        </p>
      </div>
    </div>
  );
};
