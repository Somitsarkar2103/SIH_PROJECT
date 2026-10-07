import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  Cpu,
  Plane,
  Layers,
  ArrowRight,
  HardDrive,
  Clock,
  Gauge,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProcessingSteps } from '../data/mockSurveys';

export const ProcessingPipeline: React.FC = () => {
  const { setCurrentTab, addToast } = useApp();
  const [pipelineProgress, setPipelineProgress] = useState<number>(68);

  useEffect(() => {
    const timer = setInterval(() => {
      setPipelineProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest max-w-5xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gis-border">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Photogrammetry & Parcel Pipeline
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Running Cadastra-SegNet v3.2 neural segmentation on Ward 112 orthomosaic
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('ai-extraction')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Open AI Extraction Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-gis-card/80 border border-gis-border">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Images Ingested</span>
          <div className="text-lg font-mono font-bold text-white mt-0.5">428 RAW</div>
          <span className="text-[10px] text-emerald-400">100% Nadir Coverage</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gis-card/80 border border-gis-border">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Ground Sampling (GSD)</span>
          <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5">2.1 cm/px</div>
          <span className="text-[10px] text-slate-400">Sub-centimeter accuracy</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gis-card/80 border border-gis-border">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Resolution</span>
          <div className="text-lg font-mono font-bold text-white mt-0.5">38,400 x 24,600</div>
          <span className="text-[10px] text-slate-400">RGB 16-bit GeoTIFF</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gis-card/80 border border-gis-border">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">GPU Compute</span>
          <div className="text-lg font-mono font-bold text-indigo-400 mt-0.5">NVIDIA A100</div>
          <span className="text-[10px] text-slate-400">14.8 / 80 GB VRAM</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gis-card/80 border border-gis-border">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Pipeline Elapsed</span>
          <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">02m 45s</div>
          <span className="text-[10px] text-emerald-400">Estimated ~15s left</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="p-4 rounded-xl bg-gis-card/90 border border-gis-border space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            Cadastra-SegNet v3.2 Neural Segmentation Engine
          </span>
          <span className="font-mono font-bold text-cyan-400">{pipelineProgress}%</span>
        </div>
        <div className="w-full bg-gis-darkest h-3 rounded-full overflow-hidden border border-gis-border/80 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-500 shadow-md shadow-cyan-500/50"
            style={{ width: `${pipelineProgress}%` }}
          />
        </div>
      </div>

      {/* Pipeline Stage Breakdown */}
      <div className="bg-gis-card/90 border border-gis-border rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Photogrammetric Pipeline Execution Stages
        </h3>

        <div className="space-y-3">
          {mockProcessingSteps.map(step => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in-progress';
            const isPending = step.status === 'pending';

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isCompleted
                    ? 'bg-emerald-950/15 border-emerald-800/40 text-slate-200'
                    : isInProgress
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-md shadow-cyan-950/30'
                    : 'bg-gis-darkest/40 border-gis-border/40 text-slate-500'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isInProgress ? (
                    <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-700 bg-slate-900" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${isInProgress ? 'text-cyan-300' : isCompleted ? 'text-white' : 'text-slate-400'}`}>
                      {step.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {step.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {step.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
