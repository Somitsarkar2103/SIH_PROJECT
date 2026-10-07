import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { mockAnalyticsData } from '../data/mockAnalytics';

export const Analytics: React.FC = () => {
  const data = mockAnalyticsData;

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gis-border">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Cadastral AI Telemetry & Benchmark Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cadastra-SegNet v3.2 model accuracy, parcel verification velocity, and workflow efficiency audit
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
            Model: Cadastra-SegNet v3.2
          </span>
        </div>
      </div>

      {/* Model Benchmark Scores (IoU, F1, Precision, Recall) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gis-card/90 border border-gis-border shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Intersection over Union (IoU)</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-cyan-400">{data.iou}%</span>
            <span className="text-xs text-emerald-400 font-medium">Cadastral Poly</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Overlaps ground-truth compound boundary</p>
        </div>

        <div className="p-4 rounded-xl bg-gis-card/90 border border-gis-border shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Model Precision</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-emerald-400">{data.precision}%</span>
            <span className="text-xs text-slate-400">True Positive</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Correctly identified legal parcel edges</p>
        </div>

        <div className="p-4 rounded-xl bg-gis-card/90 border border-gis-border shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Model Recall</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-blue-400">{data.recall}%</span>
            <span className="text-xs text-slate-400">Completeness</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Minimal missing or unsegmented parcels</p>
        </div>

        <div className="p-4 rounded-xl bg-gis-card/90 border border-gis-border shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Harmonic F1-Score</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-indigo-300">{data.f1}%</span>
            <span className="text-xs text-slate-400">Balanced</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Composite segmentation reliability</p>
        </div>
      </div>

      {/* Two Column Layout: Confidence Distribution & Time Saved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <div className="p-6 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Parcel Confidence Score Distribution
            </h3>
            <span className="font-mono text-xs text-slate-400">1,248 Total Parcels</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Distribution of model probability scores across Ward 112 orthomosaic candidate polygons:
          </p>

          <div className="space-y-4 pt-2">
            {data.confidenceBuckets.map((bucket, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-slate-200">{bucket.range}</span>
                  <span className="font-mono text-slate-400">
                    {bucket.count} parcels ({bucket.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gis-darkest h-3 rounded-full overflow-hidden border border-gis-border p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${bucket.percentage}%`,
                      backgroundColor: bucket.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gis-border/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              &gt;90% High (Auto-eligible)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              70-90% Moderate (Officer Review)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              &lt;70% Low (Field Dispatch)
            </span>
          </div>
        </div>

        {/* Time Saved & Productivity Card */}
        <div className="p-6 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Surveyor Velocity & Productivity Gain</span>
              </h3>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] uppercase font-bold">
                DEMO / ESTIMATED METRIC
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Comparison of traditional total station ground survey vs. CadastraAI drone photogrammetry and assisted verification:
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-gis-darkest/80 border border-gis-border">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Manual Ground Survey</span>
                <div className="text-2xl font-mono font-bold text-slate-300 mt-1">~42 hours</div>
                <span className="text-[11px] text-slate-500 block mt-1">Tape & total station traverses</span>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/50">
                <span className="text-[10px] text-cyan-300 uppercase font-semibold block">AI-Assisted CadastraAI</span>
                <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">~11 hours</div>
                <span className="text-[11px] text-cyan-300/80 block mt-1">Drone flight + HITL verification</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                  Estimated Turnaround Reduction
                </span>
                <span className="text-3xl font-mono font-black text-emerald-400">74% FASTER</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-xl font-black font-mono">
                3.8x
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gis-border/60 text-[11px] text-slate-400 italic flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Benchmark derived from 12.4 hectare urban pilot test in Bengaluru Ward 112.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
