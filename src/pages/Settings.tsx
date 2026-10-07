import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Cpu,
  Map as MapIcon,
  ShieldCheck,
  Save,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { addToast } = useApp();

  const [modelName, setModelName] = useState<string>('Cadastra-SegNet v3.2 (ResNet-101 FPN)');
  const [modelConfidenceThreshold, setModelConfidenceThreshold] = useState<number>(80);
  const [crs, setCrs] = useState<string>('EPSG:32643');
  const [areaUnit, setAreaUnit] = useState<'sqm' | 'ha' | 'sqft'>('sqm');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState<number>(95);
  const [manualReviewThreshold, setManualReviewThreshold] = useState<number>(70);

  const handleSaveSettings = () => {
    addToast('success', 'Configuration Saved', 'System parameters, model thresholds, and spatial reference settings updated.');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gis-darkest space-y-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gis-border">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Platform & Spatial Engine Settings
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure AI segmentation thresholds, geodetic projections, and automated surveyor verification rules
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6 text-xs">
        {/* AI Model Parameters */}
        <div className="p-6 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gis-border">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              1. AI Model & Inference Pipeline
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Segmentation Backbone Model
              </label>
              <input
                type="text"
                value={modelName}
                readOnly
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-cyan-300 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Trained on 45,000+ certified urban cadastral boundaries across Indian metropolitan zones.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider">
                  Confidence Threshold for Boundary Proposal
                </label>
                <span className="font-mono text-cyan-400 font-bold text-sm">
                  {modelConfidenceThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={modelConfidenceThreshold}
                onChange={e => setModelConfidenceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>50% Permissive</span>
                <span>80% Recommended</span>
                <span>95% Strict</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spatial Reference & Mapping */}
        <div className="p-6 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gis-border">
            <MapIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              2. Coordinate Reference System & Units
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Project Coordinate Reference System (CRS)
              </label>
              <select
                value={crs}
                onChange={e => setCrs(e.target.value)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono"
              >
                <option value="EPSG:32643">EPSG:32643 (WGS 84 / UTM zone 43N)</option>
                <option value="EPSG:4326">EPSG:4326 (WGS 84 Geographic)</option>
                <option value="EPSG:3857">EPSG:3857 (Web Mercator)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Primary Cadastral Area Unit
              </label>
              <select
                value={areaUnit}
                onChange={e => setAreaUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-gis-darkest/90 border border-gis-border rounded-lg text-slate-200 font-mono"
              >
                <option value="sqm">Square Meters (m²)</option>
                <option value="ha">Hectares (ha)</option>
                <option value="sqft">Square Feet (sq ft)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verification & HITL Rules */}
        <div className="p-6 rounded-xl bg-gis-card/90 border border-gis-border shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gis-border">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white uppercase tracking-wider">
              3. Verification & Governance Safeguards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Auto-Approve Recommendation Threshold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="85"
                  max="99"
                  value={autoApproveThreshold}
                  onChange={e => setAutoApproveThreshold(Number(e.target.value))}
                  className="w-24 px-3 py-2 bg-gis-darkest/90 border border-gis-border rounded-lg text-emerald-400 font-mono font-bold"
                />
                <span className="text-slate-400">% boundary IoU concordance</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                Mandatory Field Inspection Threshold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="40"
                  max="80"
                  value={manualReviewThreshold}
                  onChange={e => setManualReviewThreshold(Number(e.target.value))}
                  className="w-24 px-3 py-2 bg-gis-darkest/90 border border-gis-border rounded-lg text-rose-400 font-mono font-bold"
                />
                <span className="text-slate-400">% (parcels below this are flagged)</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200/90 leading-relaxed">
            <b>Statutory Policy Reminder:</b> Automated approvals still require formal electronic sign-off by the licensed survey officer before entry into the state land cadastre.
          </div>
        </div>
      </div>
    </div>
  );
};
