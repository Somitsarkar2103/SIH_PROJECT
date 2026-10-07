import React, { useState } from 'react';
import {
  GitCompare,
  Calendar,
  Layers,
  AlertTriangle,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SwipeMap } from '../components/map/SwipeMap';
import { mockChanges } from '../data/mockChanges';
import { ChangeAnomaly } from '../types/change';

export const ChangeDetection: React.FC = () => {
  const { setCurrentTab, setSelectedParcel, parcels, addToast } = useApp();
  const [prevSurveyYear, setPrevSurveyYear] = useState<string>('2024');
  const [currSurveyYear, setCurrSurveyYear] = useState<string>('2026');
  const [selectedAnomaly, setSelectedAnomaly] = useState<ChangeAnomaly>(mockChanges[0]);

  const handleReviewChange = (change: ChangeAnomaly) => {
    const matchedParcel = parcels.find(p => p.properties.parcelId === change.parcelId);
    if (matchedParcel) {
      setSelectedParcel(matchedParcel);
    }
    addToast('info', `Reviewing Change ${change.id}`, `Zooming into Parcel ${change.parcelId} for structural expansion audit.`);
    setCurrentTab('parcel-mapping');
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gis-darkest">
      {/* Top Header & Survey Date Pickers */}
      <div className="px-6 py-3 border-b border-gis-border bg-gis-card/40 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Historical vs Current Survey Change Detection
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Temporal photogrammetric diffing — Identify structural encroachments, unlicensed constructions & boundary shifts
          </p>
        </div>

        {/* Survey Date Selectors */}
        <div className="flex items-center gap-3 bg-gis-darkest/90 border border-gis-border p-1.5 rounded-xl text-xs">
          <div className="flex items-center gap-2 px-2">
            <span className="text-slate-400">Previous:</span>
            <select
              value={prevSurveyYear}
              onChange={e => setPrevSurveyYear(e.target.value)}
              className="bg-gis-card border border-gis-border rounded px-2 py-1 text-white font-mono"
            >
              <option value="2024">March 2024 (Baseline Deed)</option>
              <option value="2021">January 2021 (SVAMITVA)</option>
              <option value="2018">November 2018 (Legacy)</option>
            </select>
          </div>

          <span className="text-slate-500">vs</span>

          <div className="flex items-center gap-2 px-2">
            <span className="text-slate-400">Current:</span>
            <select
              value={currSurveyYear}
              onChange={e => setCurrSurveyYear(e.target.value)}
              className="bg-gis-card border border-cyan-500/60 rounded px-2 py-1 text-cyan-300 font-mono"
            >
              <option value="2026">August 2026 (Drone 2.1cm Ortho)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Swipe Map + Anomaly Inspector */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left: Draggable Interactive Swipe Map */}
        <div className="flex-1 relative h-full">
          <SwipeMap
            selectedAnomalyId={selectedAnomaly?.id}
            onSelectAnomaly={id => {
              const found = mockChanges.find(c => c.id === id);
              if (found) setSelectedAnomaly(found);
            }}
          />
        </div>

        {/* Right: Change Detection Registry & Selected Detail */}
        <div className="w-96 max-w-full bg-gis-card/95 border-l border-gis-border flex flex-col h-full z-10 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gis-border bg-gis-darkest/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Detected Change Anomalies
              </span>
              <span className="font-mono text-rose-400 font-bold text-xs bg-rose-950/80 border border-rose-800/80 px-2 py-0.5 rounded">
                28 Flagged
              </span>
            </div>

            {/* Summary breakdown pills */}
            <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px]">
              <div className="p-1.5 rounded bg-slate-900/60 border border-gis-border flex justify-between">
                <span className="text-slate-400">New structures:</span>
                <span className="font-mono font-bold text-white">14</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/60 border border-gis-border flex justify-between">
                <span className="text-slate-400">Expansions:</span>
                <span className="font-mono font-bold text-amber-400">7</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/60 border border-gis-border flex justify-between">
                <span className="text-slate-400">Boundary shifts:</span>
                <span className="font-mono font-bold text-rose-400">4</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/60 border border-gis-border flex justify-between">
                <span className="text-slate-400">Demolitions:</span>
                <span className="font-mono font-bold text-slate-300">3</span>
              </div>
            </div>
          </div>

          {/* Body: Selected Anomaly Detail Card */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {selectedAnomaly ? (
              <div className="bg-gis-darkest/80 border border-gis-border rounded-xl p-4 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-gis-border">
                  <div>
                    <span className="font-mono text-cyan-400 font-bold text-sm">
                      Change #{selectedAnomaly.id}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Target Parcel: <b className="text-white font-mono">{selectedAnomaly.parcelId}</b>
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                    selectedAnomaly.severity === 'high'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {selectedAnomaly.severity} Severity
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Change classification:</span>
                    <span className="font-bold text-amber-300">{selectedAnomaly.changeType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated affected area:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      +{selectedAnomaly.estimatedAreaDelta} m²
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Model confidence:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {selectedAnomaly.confidence}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Temporal comparison:</span>
                    <span className="font-mono text-slate-300">
                      {selectedAnomaly.historicalSurveyDate} → {selectedAnomaly.currentSurveyDate}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-gis-border text-slate-300 leading-relaxed text-[11px]">
                  {selectedAnomaly.description}
                </div>

                <button
                  onClick={() => handleReviewChange(selectedAnomaly)}
                  className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>Review Change on Map</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            {/* Anomaly Quick Selector List */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                All Detected Anomalies ({mockChanges.length})
              </span>

              {mockChanges.map(c => {
                const isSelected = selectedAnomaly?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedAnomaly(c)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                        : 'bg-gis-darkest/50 border-gis-border hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-300">{c.id}</span>
                        <span className="font-mono text-slate-400">({c.parcelId})</span>
                      </div>
                      <span className="font-mono text-amber-300 font-semibold">
                        +{c.estimatedAreaDelta} m²
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 truncate">
                      {c.changeType} — {c.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
