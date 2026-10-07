import React, { useState } from 'react';
import {
  Layers,
  Map as MapIcon,
  Maximize2,
  Navigation,
  Ruler,
  Plus,
  Minus,
  Eye,
  Check,
  Edit3,
  Trash2,
  Satellite,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BasemapType, LayerState } from '../../types/common';

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
  onToggleMeasure?: () => void;
  isMeasuring?: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleMeasure,
  isMeasuring = false
}) => {
  const { activeLayers, toggleLayer, basemap, setBasemap } = useApp();
  const [layersOpen, setLayersOpen] = useState<boolean>(false);
  const [basemapOpen, setBasemapOpen] = useState<boolean>(false);

  const layerItems: { key: keyof LayerState; label: string; color: string }[] = [
    { key: 'droneOrthomosaic', label: 'Drone Orthomosaic (2.1cm)', color: 'text-cyan-400' },
    { key: 'aiBuildings', label: 'AI Buildings (Footprints)', color: 'text-indigo-400' },
    { key: 'candidateParcels', label: 'Candidate Parcels (AI)', color: 'text-blue-400' },
    { key: 'verifiedParcels', label: 'Verified Parcels (Officer)', color: 'text-emerald-400' },
    { key: 'roads', label: 'Road Right-of-Way Buffer', color: 'text-amber-300' },
    { key: 'vegetation', label: 'Vegetation Canopy Mask', color: 'text-green-500' },
    { key: 'historicalParcels', label: 'Historical Parcels (2024)', color: 'text-purple-400' },
    { key: 'changeAreas', label: 'Detected Change Areas', color: 'text-rose-400' },
  ];

  const basemaps: { id: BasemapType; label: string; icon: any }[] = [
    { id: 'satellite', label: 'High-Res Drone Ortho', icon: Satellite },
    { id: 'streets', label: 'OpenStreetMap Streets', icon: MapIcon },
    { id: 'dark', label: 'CartoDB Dark Matter', icon: Compass }
  ];

  return (
    <div className="absolute top-4 left-4 z-[500] flex flex-col gap-2">
      {/* Zoom and Locate Panel */}
      <div className="bg-gis-card/95 border border-gis-border rounded-xl shadow-xl backdrop-blur-md p-1 flex flex-col gap-1">
        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="h-[1px] bg-gis-border my-0.5" />
        <button
          onClick={onResetView}
          title="Reset to Survey Extents"
          className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
        >
          <Navigation className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleMeasure}
          title="GIS Measurement Tool (Linear / Area)"
          className={`p-2 rounded-lg transition-colors ${
            isMeasuring
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Ruler className="w-4 h-4" />
        </button>
      </div>

      {/* Layer Control Dropdown Toggle */}
      <div className="relative">
        <button
          onClick={() => {
            setLayersOpen(!layersOpen);
            setBasemapOpen(false);
          }}
          className={`p-2.5 rounded-xl border shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold transition-all ${
            layersOpen
              ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
              : 'bg-gis-card/95 border-gis-border text-slate-200 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">GIS Layers</span>
        </button>

        {layersOpen && (
          <div className="absolute top-0 left-full ml-2 w-64 bg-gis-card/95 border border-gis-border rounded-xl shadow-2xl backdrop-blur-md p-3 z-50">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gis-border">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Active Map Layers
              </span>
              <span className="text-[10px] text-slate-400 font-mono">EPSG:32643</span>
            </div>

            <div className="space-y-1.5">
              {layerItems.map(item => {
                const active = activeLayers[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleLayer(item.key)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      active ? 'bg-gis-surface/80 text-slate-100' : 'text-slate-400 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`w-2 h-2 rounded-full ${active ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {active ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 opacity-30 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Basemap Switcher */}
      <div className="relative">
        <button
          onClick={() => {
            setBasemapOpen(!basemapOpen);
            setLayersOpen(false);
          }}
          className={`p-2.5 rounded-xl border shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold transition-all ${
            basemapOpen
              ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
              : 'bg-gis-card/95 border-gis-border text-slate-200 hover:text-white'
          }`}
        >
          <MapIcon className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Basemap</span>
        </button>

        {basemapOpen && (
          <div className="absolute top-0 left-full ml-2 w-52 bg-gis-card/95 border border-gis-border rounded-xl shadow-2xl backdrop-blur-md p-2 z-50">
            <div className="text-xs font-bold text-white uppercase tracking-wider px-2 py-1 mb-1">
              Basemap Style
            </div>
            <div className="space-y-1">
              {basemaps.map(bm => {
                const Icon = bm.icon;
                const isSelected = basemap === bm.id;
                return (
                  <button
                    key={bm.id}
                    onClick={() => {
                      setBasemap(bm.id);
                      setBasemapOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="flex-1 text-left">{bm.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
