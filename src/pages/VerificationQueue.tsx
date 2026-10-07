import React, { useState } from 'react';
import {
  CheckSquare,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  Eye,
  Check,
  Search,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ParcelFeature, ParcelStatus } from '../types/parcel';

export const VerificationQueue: React.FC = () => {
  const {
    parcels,
    verifyParcel,
    setSelectedParcel,
    setCurrentTab,
    addToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'review' | 'verified' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredParcels = parcels.filter(p => {
    const prop = p.properties;
    const matchesSearch =
      prop.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.source.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'high') return prop.boundaryConfidence >= 90;
    if (activeFilter === 'review') return prop.status === 'review' || prop.status === 'anomaly';
    if (activeFilter === 'verified') return prop.status === 'verified';
    if (activeFilter === 'rejected') return prop.status === 'anomaly';
    return true;
  });

  const highConfidencePending = parcels.filter(
    p => p.properties.status !== 'verified' && p.properties.boundaryConfidence >= 90
  );

  const handleBatchVerify = async () => {
    for (const p of highConfidencePending.slice(0, 15)) {
      await verifyParcel(p.properties.parcelId, 'Batch verified under automated high-confidence (>90%) threshold rule.');
    }
    addToast('success', 'Batch Verification Executed', `Verified ${Math.min(15, highConfidencePending.length)} high-confidence candidate boundaries.`);
  };

  const handleInspectOnMap = (parcel: ParcelFeature) => {
    setSelectedParcel(parcel);
    setCurrentTab('dashboard');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest space-y-6">
      {/* Header & Core GovTech Philosophy Banner */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white tracking-tight">
                Human-in-the-Loop Verification Queue
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Field Officer certification registry — Review AI candidate proposals prior to official cadastre gazetting
            </p>
          </div>

          {/* Batch Action */}
          {highConfidencePending.length > 0 && (
            <button
              onClick={handleBatchVerify}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Verify High-Confidence ({highConfidencePending.length} parcels)</span>
            </button>
          )}
        </div>

        {/* The Mandatory GovTech Pipeline Ribbon */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-emerald-950/60 border border-gis-border flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-300 font-bold">1. AI PROPOSES</span>
            <span className="text-slate-500">➔</span>
            <span className="font-mono text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/60">
              2. HUMAN VERIFIES
            </span>
            <span className="text-slate-500">➔</span>
            <span className="font-mono text-emerald-300 font-bold">3. SYSTEM PUBLISHES</span>
          </div>
          <span className="hidden md:inline text-[11px] text-slate-400">
            Compliant with ISO 19152 Land Administration Domain Model (LADM)
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gis-border">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Parcels ({parcels.length})
          </button>

          <button
            onClick={() => setActiveFilter('review')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'review'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🟡 Needs Review ({parcels.filter(p => p.properties.status === 'review' || p.properties.status === 'anomaly').length})
          </button>

          <button
            onClick={() => setActiveFilter('high')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'high'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🟢 High Confidence (&gt;90%)
          </button>

          <button
            onClick={() => setActiveFilter('verified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'verified'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified ({parcels.filter(p => p.properties.status === 'verified').length})
          </button>

          <button
            onClick={() => setActiveFilter('rejected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'rejected'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔴 Anomalies / Flagged
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search parcel ID..."
            className="pl-9 pr-3 py-1.5 bg-gis-card border border-gis-border rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* Verification Items Table */}
      <div className="bg-gis-card/90 border border-gis-border rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gis-darkest/90 border-b border-gis-border text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Parcel ID</th>
                <th className="py-3.5 px-4">Calculated Area</th>
                <th className="py-3.5 px-4">AI Boundary Confidence</th>
                <th className="py-3.5 px-4">Review Reason / Anomaly</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-right">Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gis-border/60">
              {filteredParcels.map(parcel => {
                const prop = parcel.properties;
                const isVerified = prop.status === 'verified';
                const isAnomaly = prop.status === 'anomaly';
                const isReview = prop.status === 'review';

                return (
                  <tr
                    key={prop.parcelId}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">{prop.parcelId}</span>
                        {prop.parcelId === 'P-1024' && (
                          <span className="px-1.5 py-0.2 bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-sans font-semibold rounded">
                            STAR DEMO
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-200">
                      {prop.area} m²
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 max-w-[180px]">
                        <span className="font-mono font-bold text-slate-200 w-10">
                          {prop.boundaryConfidence}%
                        </span>
                        <div className="flex-1 bg-gis-darkest h-2 rounded-full overflow-hidden border border-gis-border">
                          <div
                            className={`h-full rounded-full ${
                              prop.boundaryConfidence >= 90
                                ? 'bg-emerald-400'
                                : prop.boundaryConfidence >= 70
                                ? 'bg-amber-400'
                                : 'bg-rose-400'
                            }`}
                            style={{ width: `${prop.boundaryConfidence}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      {prop.flagReason ? (
                        <span className="text-amber-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{prop.flagReason}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">All edge checks concordant</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          isVerified
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : isReview
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                            : isAnomaly
                            ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                            : 'bg-blue-950/80 text-blue-300 border-blue-800'
                        }`}
                      >
                        {isVerified ? '🟢 Verified' : isReview ? '🟡 Requires Review' : isAnomaly ? '🔴 Mismatch' : '🔵 Candidate'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleInspectOnMap(parcel)}
                          className="p-1.5 rounded-lg bg-gis-surface hover:bg-gis-card border border-gis-border text-slate-300 hover:text-white transition-colors"
                          title="Inspect on GIS Map"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => verifyParcel(prop.parcelId)}
                          disabled={isVerified}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isVerified ? 'Verified' : 'Verify'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
