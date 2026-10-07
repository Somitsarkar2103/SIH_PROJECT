import React, { useState } from 'react';
import {
  Cpu,
  Play,
  CheckCircle2,
  Layers,
  Sparkles,
  Building,
  Navigation,
  Compass,
  Trees,
  Maximize2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GisMap } from '../components/map/GisMap';
import { aiService } from '../services/aiService';

export const AiExtraction: React.FC = () => {
  const { setCurrentTab, addToast } = useApp();

  const [features, setFeatures] = useState({
    buildings: true,
    roads: true,
    boundaryIndicators: true,
    vegetation: false,
    openAreas: true
  });

  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(80);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<{
    buildings: number;
    roads: number;
    candidates: number;
    lowConfidence: number;
    hasRun: boolean;
  }>({
    buildings: 438,
    roads: 62,
    candidates: 521,
    lowConfidence: 31,
    hasRun: true
  });

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRunExtraction = async () => {
    setIsRunning(true);
    try {
      const res = await aiService.runFeatureExtraction({
        buildings: features.buildings,
        roads: features.roads,
        boundaryIndicators: features.boundaryIndicators,
        vegetation: features.vegetation,
        openAreas: features.openAreas,
        confidenceThreshold
      });

      setResults({
        buildings: res.buildingsCount,
        roads: res.roadSegmentsCount,
        candidates: res.boundaryCandidatesCount,
        lowConfidence: res.lowConfidenceRegionsCount,
        hasRun: true
      });

      addToast('success', 'AI Inference Completed', `Extracted ${res.buildingsCount} buildings and ${res.boundaryCandidatesCount} candidate boundaries.`);
    } catch (err: any) {
      addToast('error', 'Inference Error', err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-64px)] overflow-hidden bg-gis-darkest">
      {/* Left: Imagery & Map Preview */}
      <div className="flex-1 relative h-full">
        <GisMap />

        {/* Floating Drone Imagery Overlay Tag */}
        <div className="absolute top-4 left-20 z-[450] px-3 py-1.5 rounded-lg bg-slate-950/80 border border-gis-border backdrop-blur-md text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-cyan-300">Raw Drone Orthomosaic: 2.1cm/px RGB</span>
        </div>
      </div>

      {/* Right: AI Extraction Control Matrix */}
      <div className="w-96 max-w-full bg-gis-card/95 border-l border-gis-border flex flex-col h-full z-10 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gis-border bg-gis-darkest/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-sm">
                AI Feature Extraction Studio
              </h3>
              <p className="text-[10px] text-slate-400">Cadastra-SegNet v3.2 Model Pipeline</p>
            </div>
          </div>
        </div>

        {/* Feature Checkboxes & Parameters */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          {/* Feature Classes Checklist */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2 uppercase tracking-wider text-[11px]">
              Target Feature Classes for Extraction:
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-gis-darkest/70 border border-gis-border cursor-pointer hover:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-indigo-400" />
                  <span className="font-medium text-slate-200">Building Footprints</span>
                </div>
                <input
                  type="checkbox"
                  checked={features.buildings}
                  onChange={() => toggleFeature('buildings')}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-gis-darkest/70 border border-gis-border cursor-pointer hover:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span className="font-medium text-slate-200">Road Right-of-Way Buffer</span>
                </div>
                <input
                  type="checkbox"
                  checked={features.roads}
                  onChange={() => toggleFeature('roads')}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-gis-darkest/70 border border-gis-border cursor-pointer hover:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium text-slate-200">Cadastral Boundary Candidates</span>
                </div>
                <input
                  type="checkbox"
                  checked={features.boundaryIndicators}
                  onChange={() => toggleFeature('boundaryIndicators')}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-gis-darkest/70 border border-gis-border cursor-pointer hover:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-slate-200">Vegetation Canopy Mask</span>
                </div>
                <input
                  type="checkbox"
                  checked={features.vegetation}
                  onChange={() => toggleFeature('vegetation')}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-gis-darkest/70 border border-gis-border cursor-pointer hover:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-slate-200">Open Vacant Parcels</span>
                </div>
                <input
                  type="checkbox"
                  checked={features.openAreas}
                  onChange={() => toggleFeature('openAreas')}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
              </label>
            </div>
          </div>

          {/* Confidence Slider */}
          <div className="p-3.5 bg-gis-darkest/80 border border-gis-border rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                Acceptance Threshold:
              </span>
              <span className="font-mono text-cyan-400 font-bold">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={e => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>50% Permissive</span>
              <span>80% Default</span>
              <span>95% Strict</span>
            </div>
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunExtraction}
            disabled={isRunning}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>Running Inference...</span>
              </>
            ) : (
              <>
                <span>🚀 Run AI Feature Extraction</span>
              </>
            )}
          </button>

          {/* Results Summary Box */}
          {results.hasRun && (
            <div className="p-4 bg-gis-darkest/90 border border-gis-border rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gis-border">
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  Inference Results
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">100% Parsed</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-gis-card/60 border border-gis-border/60">
                  <span className="text-[10px] text-slate-400 block">Buildings detected</span>
                  <span className="font-mono font-bold text-white text-base">{results.buildings}</span>
                </div>

                <div className="p-2 rounded bg-gis-card/60 border border-gis-border/60">
                  <span className="text-[10px] text-slate-400 block">Road corridors</span>
                  <span className="font-mono font-bold text-amber-300 text-base">{results.roads}</span>
                </div>

                <div className="p-2 rounded bg-gis-card/60 border border-gis-border/60">
                  <span className="text-[10px] text-slate-400 block">Boundary candidates</span>
                  <span className="font-mono font-bold text-cyan-300 text-base">{results.candidates}</span>
                </div>

                <div className="p-2 rounded bg-gis-card/60 border border-gis-border/60">
                  <span className="text-[10px] text-slate-400 block">Low confidence (&lt;70%)</span>
                  <span className="font-mono font-bold text-rose-400 text-base">{results.lowConfidence}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Button to proceed to Parcel Mapping */}
        <div className="p-4 border-t border-gis-border bg-gis-darkest/90">
          <button
            onClick={() => setCurrentTab('parcel-mapping')}
            className="w-full py-2.5 px-4 rounded-lg bg-gis-surface hover:bg-slate-800 border border-gis-border text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Proceed to Parcel Mapping Workstation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
