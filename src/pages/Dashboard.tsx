import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Plane,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { GisMap } from '../components/map/GisMap';
import { ParcelDetailDrawer } from '../components/map/ParcelDetailDrawer';

export const Dashboard: React.FC = () => {
  const {
    parcels,
    selectedParcel,
    setSelectedParcel,
    selectedProject,
    setCurrentTab
  } = useApp();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  const totalCount = 1248;
  const aiExtractedCount = 1196;
  const pendingVerificationCount = 37;
  const highConfidencePct = '94.2%';
  const changesDetectedCount = 28;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gis-darkest">
      {/* Top Header & Context Bar */}
      <div className="px-6 py-3 border-b border-gis-border bg-gis-card/30 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Good afternoon, Survey Officer
            </h1>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-mono font-semibold">
              ACTIVE SURVEY RUN
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {selectedProject.name} — {selectedProject.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Flown: {selectedProject.surveyDate}
            </span>
            <span>•</span>
            <span className="font-mono text-cyan-300">GSD: 2.1 cm/px</span>
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('ai-extraction')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Extraction Studio</span>
          </button>

          <button
            onClick={() => setCurrentTab('verification')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-semibold transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Verify Queue ({pendingVerificationCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="px-6 py-3.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 shrink-0 bg-gis-darkest border-b border-gis-border/60">
        <StatCard
          label="Total Parcels"
          value={totalCount}
          subtitle="Municipal Ward 112 Extent"
          icon={Layers}
          variant="default"
          trend="+100% drone cov."
        />
        <StatCard
          label="AI Extracted"
          value={aiExtractedCount}
          subtitle="Cadastra-SegNet v3.2 proposals"
          icon={Cpu}
          variant="ai"
          trend="95.8% automated"
        />
        <StatCard
          label="Pending Verification"
          value={pendingVerificationCount}
          subtitle="Human officer sign-off queue"
          icon={Clock}
          variant="review"
          trend="Needs Review"
          onClick={() => setCurrentTab('verification')}
        />
        <StatCard
          label="High Confidence"
          value={highConfidencePct}
          subtitle="Above 90% boundary IoU"
          icon={ShieldCheck}
          variant="verified"
          trend="Target >90%"
        />
        <StatCard
          label="Changes Detected"
          value={changesDetectedCount}
          subtitle="Expansions & mismatches vs 2024"
          icon={AlertTriangle}
          variant="anomaly"
          trend="28 Anomaly Flags"
          onClick={() => setCurrentTab('change-detection')}
        />
      </div>

      {/* Main Map + Right Detail Drawer Container */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Interactive Map (60-70% width) */}
        <div className="flex-1 relative h-full">
          <GisMap
            onSelectParcel={p => {
              setSelectedParcel(p);
              setDrawerOpen(true);
            }}
          />
        </div>

        {/* Right Side Parcel Detail Drawer */}
        {drawerOpen && selectedParcel && (
          <ParcelDetailDrawer
            parcel={selectedParcel}
            onClose={() => setDrawerOpen(false)}
            onStartEdit={() => setCurrentTab('parcel-mapping')}
          />
        )}
      </div>
    </div>
  );
};
