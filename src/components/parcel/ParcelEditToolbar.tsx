import React from 'react';
import { 
  MousePointer, 
  PenTool, 
  Move, 
  Scissors, 
  Combine, 
  Trash2, 
  Undo2, 
  Redo2,
  Magnet,
  Grid
} from 'lucide-react';

export type ToolMode = 'select' | 'draw' | 'edit' | 'split' | 'merge';

interface ParcelEditToolbarProps {
  activeTool: ToolMode;
  onChangeTool: (tool: ToolMode) => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  hasSelection?: boolean;
}

export const ParcelEditToolbar: React.FC<ParcelEditToolbarProps> = ({
  activeTool,
  onChangeTool,
  onUndo,
  onRedo,
  onDelete,
  canUndo = false,
  canRedo = false,
  hasSelection = false
}) => {
  const tools = [
    { id: 'select', label: 'Select Parcel', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'draw', label: 'Draw Boundary', icon: <PenTool className="w-4 h-4" /> },
    { id: 'edit', label: 'Edit Vertices', icon: <Move className="w-4 h-4" /> },
    { id: 'split', label: 'Split Parcel', icon: <Scissors className="w-4 h-4" /> },
    { id: 'merge', label: 'Merge Parcels', icon: <Combine className="w-4 h-4" /> }
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-2xl">
      {/* Tool items */}
      <div className="flex items-center gap-1">
        {tools.map(tool => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onChangeTool(tool.id as ToolMode)}
              title={tool.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tool.icon}
              <span className="hidden sm:inline">{tool.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-5 w-px bg-slate-800 mx-1.5" />

      {/* Action buttons: Delete, Undo, Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={onDelete}
          disabled={!hasSelection}
          title="Delete Selected Parcel"
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            hasSelection ? 'text-rose-400 hover:bg-rose-950/40' : 'text-slate-600 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            canUndo ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-600 cursor-not-allowed'
          }`}
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            canRedo ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-600 cursor-not-allowed'
          }`}
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-slate-800 mx-1.5" />

      {/* Snapping & Geometry Helpers */}
      <div className="flex items-center gap-1">
        <button
          title="Snapping to Orthomosaic Edges (Active)"
          className="p-1.5 rounded-lg text-xs bg-cyan-950/40 text-cyan-400 border border-cyan-800/50"
        >
          <Magnet className="w-3.5 h-3.5" />
        </button>
        <button
          title="Toggle Cadastral Cadre Grid"
          className="p-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
