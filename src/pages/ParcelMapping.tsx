import React, { useState } from 'react';
import {
  Ruler,
  MousePointer,
  Edit3,
  Split,
  Merge,
  Trash2,
  Undo2,
  Redo2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building,
  Navigation,
  History,
  Layers,
  Sparkles,
  Save,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GisMap } from '../components/map/GisMap';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';
import { ParcelFeature } from '../types/parcel';

export const ParcelMapping: React.FC = () => {
  const {
    parcels,
    selectedParcel,
    setSelectedParcel,
    verifyParcel,
    updateParcelGeometry,
    addToast
  } = useApp();

  const [activeTool, setActiveTool] = useState<'select' | 'draw' | 'edit' | 'split' | 'merge' | 'measure'>('edit');
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const currentParcel = selectedParcel || parcels[0];
  const prop = currentParcel.properties;

  const handleApprove = async () => {
    await verifyParcel(prop.parcelId, 'Boundary approved in Parcel Mapping Workstation.');
  };

  const handleReject = () => {
    addToast('warning', 'Boundary Rejected', `Parcel candidate ${prop.parcelId} rejected. Tagged for photogrammetric re-triangulation.`);
  };

  const handleToolClick = (tool: any) => {
    setActiveTool(tool);
    if (tool === 'edit') {
      addToast('info', 'CAD Editing Active', 'Click and drag the circular white/cyan vertex nodes on the map to modify parcel boundary.');
    } else if (tool === 'split') {
      addToast('info', 'Parcel Split Mode', 'Draw a bisecting polyline across the selected parcel to partition.');
    } else if (tool === 'merge') {
      addToast('info', 'Parcel Merge Mode', 'Click adjacent candidate parcels to unite into a single cadastral polygon.');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gis-darkest">
      {/* Top GIS Toolbar */}
      <div className="h-14 px-4 border-b border-gis-border bg-gis-card/60 flex items-center justify-between gap-4 z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-gis-darkest/80 border border-gis-border rounded-xl">
            <button
              onClick={() => handleToolClick('select')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTool === 'select'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>Select</span>
            </button>

            <button
              onClick={() => handleToolClick('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTool === 'edit'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Vertices</span>
            </button>

            <button
              onClick={() => handleToolClick('draw')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTool === 'draw'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Draw Polygon</span>
            </button>

            <div className="h-4 w-[1px] bg-gis-border mx-1" />

            <button
              onClick={() => handleToolClick('split')}
              className={`p-2 rounded-lg text-xs transition-colors ${
                activeTool === 'split' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Split Parcel"
            >
              <Split className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleToolClick('merge')}
              className={`p-2 rounded-lg text-xs transition-colors ${
                activeTool === 'merge' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Merge Selected Parcels"
            >
              <Merge className="w-4 h-4" />
            </button>

            <button
              onClick={() => addToast('info', 'Polygon Deleted', 'Temporary polygon removed from workstation canvas.')}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 text-xs transition-colors"
              title="Delete Polygon"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1 p-1 bg-gis-darkest/80 border border-gis-border rounded-xl">
            <button
              onClick={() => addToast('info', 'Undo', 'Reverted vertex edit.')}
              className="p-1.5 rounded text-slate-400 hover:text-white transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => addToast('info', 'Redo', 'Reapplied vertex edit.')}
              className="p-1.5 rounded text-slate-400 hover:text-white transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 hidden sm:inline">Active Coordinate System:</span>
          <span className="font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
            EPSG:32643 UTM 43N
          </span>
        </div>
      </div>

      {/* Main Map + Right Candidate Inspector */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Large GIS Map */}
        <div className="flex-1 relative h-full">
          <GisMap
            isEditing={activeTool === 'edit'}
            onSelectParcel={p => setSelectedParcel(p)}
          />
        </div>

        {/* Right Candidate Parcel Inspector Panel */}
        <div className="w-96 max-w-full bg-gis-card/95 border-l border-gis-border flex flex-col h-full z-10 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gis-border bg-gis-darkest/70 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-bold text-white text-base">
                  Candidate Parcel {prop.parcelId}
                </h3>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-mono uppercase">
                  AI PROPOSED
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Orthomosaic Feature Segmentation</p>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Geometric Properties */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-gis-darkest/70 border border-gis-border">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Calculated Area</span>
                <div className="text-lg font-mono font-bold text-white mt-0.5">
                  {prop.area} <span className="text-xs text-slate-400 font-sans">m²</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gis-darkest/70 border border-gis-border">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Boundary Perimeter</span>
                <div className="text-lg font-mono font-bold text-white mt-0.5">
                  {prop.perimeter} <span className="text-xs text-slate-400 font-sans">m</span>
                </div>
              </div>
            </div>

            {/* Confidence Visualization */}
            <div className="p-3.5 bg-gis-darkest/80 border border-gis-border rounded-xl">
              <ConfidenceBadge score={prop.boundaryConfidence} label="Boundary Confidence" />
            </div>

            {/* Source Evidence Checklist (Specified in requirements!) */}
            <div className="bg-gis-darkest/70 border border-gis-border rounded-xl p-3.5 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Source Evidence & Cadastral Corroboration:
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-gis-card/60 border border-gis-border/40">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Building edge alignment</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">98%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-gis-card/60 border border-gis-border/40">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Road setback edge boundary</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">95%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-gis-card/60 border border-gis-border/40">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Historical parcel alignment (2024)</span>
                  </div>
                  <span className="font-mono text-cyan-300 font-semibold">88%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-gis-card/60 border border-gis-border/40">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Image gradient boundary contrast</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">92%</span>
                </div>
              </div>
            </div>

            {/* Officer Vertex Editing Help Notice */}
            <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/50 text-[11px] text-cyan-200 leading-relaxed">
              💡 <b>Surveyor Tip:</b> With &ldquo;Edit Vertices&rdquo; active, click and drag any corner marker on the map to modify legal boundary vertices.
            </div>
          </div>

          {/* Action Buttons: Approve / Edit / Reject */}
          <div className="p-4 border-t border-gis-border bg-gis-darkest/90 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleApprove}
                className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve</span>
              </button>

              <button
                onClick={() => handleToolClick('edit')}
                className="py-2.5 px-3 rounded-lg bg-gis-surface hover:bg-gis-card border border-gis-border text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={handleReject}
                className="py-2.5 px-3 rounded-lg bg-gis-surface hover:bg-rose-950/50 border border-gis-border hover:border-rose-800 text-rose-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-1">
              Actions committed with digital surveyor signature audit trail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
