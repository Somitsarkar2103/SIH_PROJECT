import React from 'react';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  X,
  Target
} from 'lucide-react';

export interface TourStep {
  step: number;
  title: string;
  description: string;
  actionLabel: string;
  targetView: string;
  parcelToSelect?: string;
  enableEdit?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: 'Step 1 — Open Dashboard',
    description: 'Inspect the GIS workstation overview, live summary metrics, and spatial sector map.',
    actionLabel: 'Go to Dashboard',
    targetView: 'dashboard'
  },
  {
    step: 2,
    title: 'Step 2 — Select Survey Project',
    description: 'Navigate to Bengaluru Urban Survey (12.4 ha, 1,248 parcels, high-res UAV capture).',
    actionLabel: 'Open Survey Projects',
    targetView: 'projects'
  },
  {
    step: 3,
    title: 'Step 3 — Inspect Drone Orthomosaic',
    description: 'View the 1.8cm GSD true-color raster orthomosaic and spectral band indicators.',
    actionLabel: 'View Drone Imagery',
    targetView: 'drone-imagery'
  },
  {
    step: 4,
    title: 'Step 4 — Launch AI Extraction',
    description: 'Trigger the deep learning segmentation engine for rooflines, roads, and boundary cues.',
    actionLabel: 'Run AI Extraction',
    targetView: 'ai-extraction'
  },
  {
    step: 5,
    title: 'Step 5 — Review Detected Parcels & Buildings',
    description: 'Inspect 1,196 candidate parcels topologically generated with confidence scores.',
    actionLabel: 'View Parcel Mapping',
    targetView: 'parcel-mapping'
  },
  {
    step: 6,
    title: 'Step 6 — Select Low-Confidence Parcel',
    description: 'Select parcel P-1025 with tree occlusion requiring human-in-the-loop review.',
    actionLabel: 'Select P-1025',
    targetView: 'dashboard',
    parcelToSelect: 'P-1025'
  },
  {
    step: 7,
    title: 'Step 7 — Inspect Boundary Reasoning',
    description: 'Check AI explainability panel showing 64% confidence and vegetation interference.',
    actionLabel: 'Inspect P-1025 Details',
    targetView: 'dashboard',
    parcelToSelect: 'P-1025'
  },
  {
    step: 8,
    title: 'Step 8 — Enter Boundary Edit Mode',
    description: 'Activate the interactive CAD vertex editor on the GIS map.',
    actionLabel: 'Edit Boundary',
    targetView: 'dashboard',
    parcelToSelect: 'P-1025',
    enableEdit: true
  },
  {
    step: 9,
    title: 'Step 9 — Move Polygon Vertex',
    description: 'Adjust the north-eastern vertex handle around tree canopy to rectify boundary.',
    actionLabel: 'Simulate Vertex Snap',
    targetView: 'dashboard',
    parcelToSelect: 'P-1025',
    enableEdit: true
  },
  {
    step: 10,
    title: 'Step 10 — Officer Verification',
    description: 'Click Verify to approve candidate boundary; status transitions to 🟢 Verified (94%).',
    actionLabel: 'Verify P-1025',
    targetView: 'dashboard',
    parcelToSelect: 'P-1025'
  },
  {
    step: 11,
    title: 'Step 11 — Open Change Detection',
    description: 'Swipe comparison reveals 28 changes against 2024 baseline including CH-028.',
    actionLabel: 'Open Change Detection',
    targetView: 'change-detection'
  },
  {
    step: 12,
    title: 'Step 12 — Export GIS-Ready Data & Report',
    description: 'Export vector GeoJSON, Shapefile, CSV and generate official Cadastral Draft Report.',
    actionLabel: 'Open Export Center',
    targetView: 'exports'
  }
];

interface DemoTourGuideProps {
  currentStepIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJumpToStep: (stepIndex: number) => void;
}

export const DemoTourGuide: React.FC<DemoTourGuideProps> = ({
  currentStepIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onJumpToStep
}) => {
  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const progressPct = ((currentStepIndex + 1) / TOUR_STEPS.length) * 100;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9900] w-full max-w-2xl px-4 animate-slide-up">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-4 shadow-2xl shadow-cyan-950/40 text-slate-100">
        {/* Top bar with progress */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">
              Hackathon Demo Tour ({currentStepIndex + 1} of {TOUR_STEPS.length})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400">
              {Math.round(progressPct)}% Completed
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-1 rounded-full my-2 overflow-hidden border border-slate-800">
          <div
            className="bg-cyan-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step details */}
        <div className="my-2">
          <h4 className="font-semibold text-sm text-white flex items-center gap-2">
            {step.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 mt-3">
          <button
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentStepIndex === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {/* Quick jump pills */}
          <div className="hidden sm:flex items-center gap-1">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => onJumpToStep(idx)}
                className={`w-5 h-5 rounded text-[10px] font-mono font-semibold transition-all ${
                  idx === currentStepIndex
                    ? 'bg-cyan-500 text-slate-950 scale-110'
                    : idx < currentStepIndex
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {s.step}
              </button>
            ))}
          </div>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/30 transition-all active:scale-95"
          >
            <span>{step.actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
