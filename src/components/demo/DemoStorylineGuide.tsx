import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoStorylineGuide: React.FC = () => {
  const {
    demoStep,
    setDemoStep,
    setCurrentTab,
    setSelectedParcel,
    parcels,
    verifyParcel,
    setIsReportModalOpen,
    resetDemoData
  } = useApp();

  const [minimized, setMinimized] = useState<boolean>(false);

  const steps = [
    {
      step: 1,
      title: 'Open Dashboard',
      actionText: 'Go to Dashboard',
      desc: 'View GIS dashboard with KPI summary cards & live urban parcel polygons.',
      run: () => {
        setCurrentTab('dashboard');
      }
    },
    {
      step: 2,
      title: 'Select Survey Project',
      actionText: 'View Survey Projects',
      desc: 'Browse municipal projects, inspecting Bengaluru Urban Survey (12.4 ha).',
      run: () => {
        setCurrentTab('projects');
      }
    },
    {
      step: 3,
      title: 'Drone Orthomosaic Map',
      actionText: 'Inspect Drone Layer',
      desc: 'Examine raw 2.1 cm/px GSD orthomosaic imagery captured by survey drone.',
      run: () => {
        setCurrentTab('dashboard');
      }
    },
    {
      step: 4,
      title: 'AI Feature Extraction',
      actionText: 'Run AI Extraction',
      desc: 'Launch Cadastra-SegNet v3.2 inference for building footprints & road setbacks.',
      run: () => {
        setCurrentTab('ai-extraction');
      }
    },
    {
      step: 5,
      title: 'Candidate Parcels Generated',
      actionText: 'View Candidate Parcels',
      desc: 'Explore 1,196 AI-synthesized cadastral polygons with confidence rankings.',
      run: () => {
        setCurrentTab('parcel-mapping');
      }
    },
    {
      step: 6,
      title: 'Select Low-Confidence Parcel',
      actionText: 'Inspect Parcel P-1025',
      desc: 'Flag parcel P-1025 with boundary ambiguity requiring human surveyor review.',
      run: () => {
        const p1025 = parcels.find(p => p.properties.parcelId === 'P-1025');
        if (p1025) setSelectedParcel(p1025);
        setCurrentTab('dashboard');
      }
    },
    {
      step: 7,
      title: 'Inspect Confidence (64%)',
      actionText: 'Show Explainability',
      desc: 'Review "Why this boundary?" panel detailing historical road setback mismatch.',
      run: () => {
        const p1025 = parcels.find(p => p.properties.parcelId === 'P-1025');
        if (p1025) setSelectedParcel(p1025);
        setCurrentTab('dashboard');
      }
    },
    {
      step: 8,
      title: 'Enter GIS Editing Mode',
      actionText: 'Open Vertex Editor',
      desc: 'Access the CAD/GIS polygon editor toolbar to adjust boundary nodes.',
      run: () => {
        const p1025 = parcels.find(p => p.properties.parcelId === 'P-1025');
        if (p1025) setSelectedParcel(p1025);
        setCurrentTab('parcel-mapping');
      }
    },
    {
      step: 9,
      title: 'Refine Boundary Vertices',
      actionText: 'Snap to Compound Wall',
      desc: 'Adjust vertex coordinates to align perfectly with drone-visible compound wall.',
      run: () => {
        const p1025 = parcels.find(p => p.properties.parcelId === 'P-1025');
        if (p1025) {
          // Adjust coordinates slightly to represent snapped vertex
          setSelectedParcel(p1025);
        }
        setCurrentTab('parcel-mapping');
      }
    },
    {
      step: 10,
      title: 'Officer Verification',
      actionText: 'Verify Parcel P-1025',
      desc: 'Survey Officer clicks Verify; boundary turns Emerald Green with signed audit trail.',
      run: () => {
        verifyParcel('P-1025', 'Boundary snapped to physical masonry compound wall by Officer Sharma.');
        setCurrentTab('verification');
      }
    },
    {
      step: 11,
      title: 'Temporal Change Detection',
      actionText: 'Inspect 2024 vs 2026',
      desc: 'Use interactive Swipe comparison to detect new structures & building expansions.',
      run: () => {
        setCurrentTab('change-detection');
      }
    },
    {
      step: 12,
      title: 'Export GeoJSON & Draft Report',
      actionText: 'Open Export Center',
      desc: 'Export GIS-ready GeoJSON FeatureCollection and preview official Draft Report.',
      run: () => {
        setCurrentTab('exports');
        setIsReportModalOpen(true);
      }
    }
  ];

  const current = steps[demoStep - 1] || steps[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92%] sm:w-auto">
      <div className="bg-gis-card/95 border border-cyan-500/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-200">
        {/* Header bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-cyan-950/40 border-b border-cyan-800/40 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-semibold text-cyan-200">
              CadastraAI Hackathon Evaluator Tour
            </span>
            <span className="font-mono text-[11px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Step {demoStep} of 12
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={resetDemoData}
              title="Reset Demo Dataset"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMinimized(!minimized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!minimized && (
          <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-xs">
                  #{current.step}.
                </span>
                <h4 className="text-xs font-bold text-white truncate">
                  {current.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-300/90 mt-0.5 leading-snug">
                {current.desc}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                disabled={demoStep === 1}
                onClick={() => {
                  const prev = Math.max(1, demoStep - 1);
                  setDemoStep(prev);
                  steps[prev - 1].run();
                }}
                className="p-1.5 rounded-lg border border-gis-border bg-gis-surface text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  current.run();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
              >
                <span>{current.actionText}</span>
              </button>

              <button
                disabled={demoStep === 12}
                onClick={() => {
                  const next = Math.min(12, demoStep + 1);
                  setDemoStep(next);
                  steps[next - 1].run();
                }}
                className="p-1.5 rounded-lg border border-gis-border bg-gis-surface text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
